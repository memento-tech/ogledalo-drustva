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
import { useRef, useState } from "react";
import generatePDF from "react-to-pdf";
import DocumentInformationEditor from "./components/DocumentInformationEditor";
import { CustomImages } from "./components/ImagesComponent";

const dummySavedDocument = {
  content:
    "<h2>Previously saved document</h2><p>This is your saved content.</p>",
  info: {
    title: "Saved Document Title",
    description: "Some description for the saved document",
  },
};

const TipTapEditor = () => {
  const [documentInfo, setDocumentInfo] = useState();

  const loadSavedDocument = () => {
    if (!editor) return;
    editor.commands.setContent(dummySavedDocument.content);
    setDocumentInfo(dummySavedDocument.info);
  };

  const saveDocument = () => {
    let editorContent = editor.getHTML();
    let jsonContent = editor.getJSON();
    let textContent = editor.getText();

    console.log(editorContent);
    console.log(jsonContent);
    console.log(textContent);
  };

  const [infoOpen, setInfoOpen] = useState(true);

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
    content: "<p>Let's be creative...</p>",
  });

  const targetRef = useRef();

  const handleDownloadPDF = async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    generatePDF(targetRef, {
      filename: "page.pdf",
      page: {
        margin: 20,
      },
    });
  };

  return (
    <EditorWrapper>
      <DocumentInformationEditor
        infoOpen={infoOpen}
        setInfoOpen={setInfoOpen}
        documentInfo={documentInfo}
        onDocumentInfoChange={setDocumentInfo}
      />
      <TipTapEditorToolbar
        editor={editor}
        onDownloadPDF={handleDownloadPDF}
        onClick={() => setInfoOpen(false)}
      />
      <EditorContentWrapper
        $infoOpen={infoOpen}
        onClick={() => setInfoOpen(false)}
      >
        <StyledEditorContent editor={editor} ref={targetRef} />
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
