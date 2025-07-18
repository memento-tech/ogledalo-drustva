import styled from "styled-components";
import { useEffect, useState } from "react";
import { CenterAlign, LeftAlign, RightAligh } from "../icons/TextAlignIcons";
import OrderedListIcon from "../icons/OrderedListIcon";
import BulletListIcon from "../icons/BulletListIcon";
import LinkIcon from "../icons/LinkIcon";
import SaveIcon from "../icons/SaveIcon";
import ToolbarButtonWithTooltip from "./components/ToolbarButtonWithLabel";
import FontSizeSelector from "./components/FontSizeSelector";
import CarouselImagesIcon from "../icons/CarouselImagesIcon";
import { usePopups } from "../popup/PopupContext";
import UploadImagesPopup from "../popup/popups/UploadImagesPopup";
import ImageUploadIcon from "../icons/ImageUploadIcon";
import ClearIcon from "../icons/ClearIcon";

const textAlignTypes = [
  {
    icon: <LeftAlign height={18} />,
    label: "left",
  },
  {
    icon: <CenterAlign height={18} />,
    label: "center",
  },
  {
    icon: <RightAligh height={18} />,
    label: "right",
  },
];

const TipTapEditorToolbar = ({
  editor,
  onSaveDocument,
  onClearContent,
  onClick,
}) => {
  const { addPopup } = usePopups();

  const [textAlignIndex, setTextAlignIndex] = useState(0);
  const textAlignIconData = textAlignTypes[textAlignIndex];

  const [boldActive, setBoldActive] = useState(false);
  const [italicActive, setItalicActive] = useState(false);
  const [underlineActive, setUnderlineActive] = useState(false);
  const [levelOneHeadingActive, setLevelOneHeadingActive] = useState(false);
  const [levelTwoHeadingActive, setLevelTwoHeadingActive] = useState(false);
  const [levelThreeHeadingActive, setLevelThreeHeadingActive] = useState(false);

  const openImagesUploadPopup = (oneImageOnly) => {
    addPopup((key, zIndex, closePopup) => (
      <UploadImagesPopup
        key={key}
        onSubmit={(data) => {
          if (!data) return;
          editor
            .chain()
            .focus()
            .insertContent({ type: "images", attrs: { images: data } })
            .run();
        }}
        zIndex={zIndex}
        closePopup={closePopup}
        oneImageOnly={oneImageOnly}
        presetImages={undefined}
      />
    ));
  };

  const handleImageUpdatePopup = (
    existingImages = [],
    updateAttributes,
    oneImageOnly = false
  ) => {
    addPopup((key, zIndex, closePopup) => (
      <UploadImagesPopup
        key={key}
        zIndex={zIndex}
        closePopup={closePopup}
        oneImageOnly={oneImageOnly}
        onSubmit={(newImages) => {
          if (newImages && newImages.length > 0) {
            updateAttributes({ images: newImages });
          }
        }}
        presetImages={existingImages}
      />
    ));
  };

  useEffect(() => {
    window.__handleImageUpdatePopup = handleImageUpdatePopup;
    return () => {
      window.__handleImageUpdatePopup = null;
    };
  }, []);

  useEffect(() => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .setTextAlign(textAlignIconData.label)
      .updateAttributes("images", { textAlign: textAlignIconData.label })
      .run();
  }, [textAlignIndex]);

  useEffect(() => {
    if (!editor) return;

    const updateToolbarStates = () => {
      setBoldActive(editor.isActive("bold"));
      setUnderlineActive(editor.isActive("underline"));
      setItalicActive(editor.isActive("italic"));
      setLevelOneHeadingActive(editor.isActive("heading", { level: 1 }));
      setLevelTwoHeadingActive(editor.isActive("heading", { level: 2 }));
      setLevelThreeHeadingActive(editor.isActive("heading", { level: 3 }));

      const currentTextAlign = editor.isActive({ textAlign: "left" })
        ? "left"
        : editor.isActive({ textAlign: "center" })
        ? "center"
        : editor.isActive({ textAlign: "right" })
        ? "right"
        : "left";

      const currentTextAlignIndex = textAlignTypes.findIndex(
        (data) => data.label === currentTextAlign
      );

      setTextAlignIndex((prev) =>
        currentTextAlignIndex !== -1 && currentTextAlignIndex !== prev
          ? currentTextAlignIndex
          : prev
      );
    };

    updateToolbarStates();

    editor.on("transaction", updateToolbarStates);

    return () => {
      editor.off("transaction", updateToolbarStates);
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <ToolbarWrapper onClick={onClick}>
      <ToolbarButtonWithTooltip
        label={"Save content"}
        withBorder={false}
        onClick={onSaveDocument}
      >
        <SaveIcon height={20} />
      </ToolbarButtonWithTooltip>

      <ToolbarButtonWithTooltip
        label={"Clear content"}
        withBorder={false}
        onClick={onClearContent}
      >
        <ClearIcon height={20} />
      </ToolbarButtonWithTooltip>

      <hr
        style={{
          width: "100%",
          height: "1px",
          border: "none",
          borderTop: "1px solid black",
          margin: 0,
        }}
      />

      <FontSizeSelector editor={editor} />

      <ToolbarButtonWithTooltip
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={levelOneHeadingActive ? "active" : ""}
        label={"Heading 1"}
      >
        <b>H1</b>
      </ToolbarButtonWithTooltip>

      <ToolbarButtonWithTooltip
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={levelTwoHeadingActive ? "active" : ""}
        label={"Heading 2"}
      >
        <b>H2</b>
      </ToolbarButtonWithTooltip>

      <ToolbarButtonWithTooltip
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={levelThreeHeadingActive ? "active" : ""}
        label={"Heading 3"}
      >
        <b>H3</b>
      </ToolbarButtonWithTooltip>

      <ToolbarButtonWithTooltip
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={boldActive ? "active" : ""}
        label={"Bolded text"}
      >
        <b>B</b>
      </ToolbarButtonWithTooltip>

      <ToolbarButtonWithTooltip
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={italicActive ? "active" : ""}
        label={"Italic text"}
      >
        <i>I</i>
      </ToolbarButtonWithTooltip>

      <ToolbarButtonWithTooltip
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={underlineActive ? "active" : ""}
        label={"Underlined text"}
      >
        <span style={{ textDecoration: "underline" }}>U</span>
      </ToolbarButtonWithTooltip>

      <ToolbarButtonWithTooltip
        onClick={() =>
          setTextAlignIndex((prev) => (prev + 1) % textAlignTypes.length)
        }
        label={"Align text"}
        withBorder={false}
      >
        {textAlignIconData.icon}
      </ToolbarButtonWithTooltip>

      <ToolbarButtonWithTooltip
        withBorder={false}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        label={"Insert bulet list"}
      >
        <BulletListIcon height={20} />
      </ToolbarButtonWithTooltip>

      <ToolbarButtonWithTooltip
        withBorder={false}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        label={"Insert ordered list"}
      >
        <OrderedListIcon height={20} />
      </ToolbarButtonWithTooltip>

      <ToolbarButtonWithTooltip
        withBorder={false}
        onClick={() => openImagesUploadPopup(true)}
        label={"Insert image"}
      >
        <ImageUploadIcon height={18} />
      </ToolbarButtonWithTooltip>

      <ToolbarButtonWithTooltip
        withBorder={false}
        onClick={() => openImagesUploadPopup(false)}
        label={"Insert image carousel"}
      >
        <CarouselImagesIcon height={20} />
      </ToolbarButtonWithTooltip>

      <ToolbarButtonWithTooltip
        withBorder={false}
        onClick={() => {
          const url = prompt("Enter URL");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}
        label={"Insert link"}
      >
        <LinkIcon height={20} />
      </ToolbarButtonWithTooltip>
    </ToolbarWrapper>
  );
};

export default TipTapEditorToolbar;

const ToolbarWrapper = styled.div`
  position: absolute;
  box-sizing: border-box;
  top: 0;
  height: 100%;
  width: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  overflow-y: auto;
  padding: 2rem 0;
  background-color: white;
  z-index: 99;
  border-right: 1px solid black;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .active {
    border: 2px solid green;
  }
`;
