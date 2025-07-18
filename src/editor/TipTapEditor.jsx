import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import TextStyle from "@tiptap/extension-text-style";
import styled from "styled-components";
import TipTapEditorToolbar from "./TipTapEditorToolbar";
import TipTapFontSize from "./components/TipTapFontSize";
import { useEffect, useState } from "react";
import DocumentInformationEditor from "./components/DocumentInformationEditor";
import { CustomImages } from "./components/ImagesComponent";
import { getDocumentForId, saveDocument } from "../adapters/DocumentAdapter";
import { usePopups } from "../popup/PopupContext";
import DocumentSaveSuccessPopup from "../popup/popups/DocumentSaveSuccessPopup";
import { useNavigate, useSearchParams } from "react-router-dom";

const initEditorHTML = "<br/><br/><p>Let's be creative...</p>";

const TipTapEditor = () => {
  const { addPopup } = usePopups();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [resetCounter, setResetCounter] = useState(0);
  const [documentInfo, setDocumentInfo] = useState(undefined);
  const [infoOpen, setInfoOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3] }),
      Image,
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      TipTapFontSize,
      CustomImages,
    ],
    content: initEditorHTML,
  });

  useEffect(() => {
    if (!editor) return;

    let documentId = searchParams.get("documentId");

    if (documentId) {
      getDocumentForId(documentId).then((result) => {
        if (!result) {
          alert("Document with id [" + documentId + "] not found!");
          navigate("/admin", { replace: true });
        } else {
          fetch(result.contentPath)
            .then((response) => response.text())
            .then((text) => {
              editor.commands.clearContent();
              editor.commands.setContent(text, true);
            });
          setDocumentInfo(result);
          setResetCounter((c) => c + 1);
        }
      });
    }
  }, [editor]);

  function wrapWithRoot(html) {
    return `<div>${html}</div>`;
  }

  function makeHtmlXhtmlCompliant(html) {
    return html
      .replace(/<img([^>]*)>/gi, "<img$1 />")
      .replace(/<br([^>]*)>/gi, "<br$1 />")
      .replace(/<hr([^>]*)>/gi, "<hr$1 />")
      .replace(/&(?!amp;|lt;|gt;|quot;|apos;)/g, "&amp;");
  }

  const onSaveDocument = (event) => {
    event.stopPropagation();
    if (!editor) return;

    var error = validateDocumentInformation();

    if (error) {
      console.log(error);
      setErrorMessage(error);
      setResetCounter((c) => c + 1);
      return;
    }

    var documentData = {
      id: documentInfo.id,
      documentType: documentInfo.documentType,
      title: documentInfo.title,
      description: documentInfo.description,
      subDescription: documentInfo.subDescription,
      publishStatus: documentInfo.publishStatus,
      topContent: documentInfo.isTopNews,
      topImageId: documentInfo.topImage?.id,
      publishDate: documentInfo.publishDate,
      documentContent: wrapWithRoot(makeHtmlXhtmlCompliant(editor.getHTML())),
    };

    saveDocument(documentData).then((documentId) => {
      if (documentId) {
        addPopup((key, zIndex, closePopup) => (
          <DocumentSaveSuccessPopup
            key={key}
            zIndex={zIndex}
            closePopup={closePopup}
            documentId={documentId}
            documentTitle={documentData.title}
          />
        ));

        navigate("/admin?documentId=" + documentId);
      }
    });
  };

  const validateDocumentInformation = () => {
    if (!documentInfo.title) {
      return "Each document has to have title";
    }

    if (!documentInfo.description) {
      return "Each document has to have description";
    }

    if (documentInfo.documentType === "NEWS" && !documentInfo.topImage) {
      return "Each news document has to have top image";
    }

    if (
      documentInfo.publishStatus === "PUBLISH_ON_DATE" &&
      !documentInfo.publishDate
    ) {
      return "Please add publish date or change publish status";
    }
  };

  const onClearContent = (event) => {
    event.stopPropagation();
    setDocumentInfo(undefined);
    setResetCounter((c) => c + 1);
    editor.commands.clearContent();
    editor.commands.setContent(initEditorHTML, true);

    navigate("/admin", { replace: true });
  };

  return (
    <EditorWrapper>
      <DocumentInformationEditor
        infoOpen={infoOpen}
        setInfoOpen={setInfoOpen}
        documentInfo={documentInfo}
        onDocumentInfoChange={setDocumentInfo}
        resetSignal={resetCounter}
        error={errorMessage}
      />

      <TipTapEditorToolbar
        editor={editor}
        onSaveDocument={onSaveDocument}
        onClearContent={onClearContent}
        onClick={() => setInfoOpen(false)}
      />

      <EditorContentWrapper
        $infoOpen={infoOpen}
        onClick={() => setInfoOpen(false)}
      >
        <StyledEditorContent editor={editor} />
      </EditorContentWrapper>
    </EditorWrapper>
  );
};

export default TipTapEditor;

const EditorWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background: white;
`;

const EditorContentWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin-left: 60px;
  margin-right: 20px;
  padding-top: 1rem;
  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    margin-left: 40px;
    margin-right: 0;
  }
`;

const StyledEditorContent = styled(EditorContent)`
  height: 100%;
  .ProseMirror {
    min-height: 100%;
    box-sizing: border-box;
    padding: 1rem;
  }
`;
