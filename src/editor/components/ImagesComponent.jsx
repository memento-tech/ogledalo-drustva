import { Node } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { useState } from "react";
import styled from "styled-components";
import EditIcon from "../../icons/EditIcon";
import ResizableWrapper from "./ResizableWrapper";

export const CustomImages = Node.create({
  name: "images",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      images: {
        default: [],
      },
      textAlign: {
        default: "center",
      },
      width: {
        default: "400px",
      },
      height: {
        default: "300px",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div.carousel",
        getAttrs: (dom) => {
          const dataImages = dom.getAttribute("data-images");
          const textAlign = dom.style.textAlign || "center";
          const imgTag = dom.getElementsByTagName("img")[0];
          const width = imgTag.style.width || "400px";
          const height = imgTag.style.height || "300px";

          return {
            images: dataImages ? JSON.parse(dataImages) : [],
            textAlign,
            width,
            height,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { images = [], textAlign, width, height } = HTMLAttributes;

    return [
      "div",
      {
        class: "carousel",
        "data-images": JSON.stringify(images),
        style: `text-align: ${textAlign}; width: 100%; height: auto`,
      },
      ...images.map((img) => [
        "img",
        {
          src: img.src,
          alt: img.alt,
          style: `width: ${width}; height: ${height}; object-fit: cover; border-radius: 10px;`,
        },
      ]),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImagesComponentWrapper);
  },
});

const ImagesComponentWrapper = (props) => {
  return (
    <ImagesComponent
      {...props}
      handleImageUpdatePopup={(...args) =>
        window.__handleImageUpdatePopup?.(...args)
      }
    />
  );
};

const ImagesComponent = ({
  node,
  updateAttributes,
  handleImageUpdatePopup,
}) => {
  const images = node.attrs.images || [];
  const [index, setIndex] = useState(0);

  const { width, height, textAlign } = node.attrs;

  const handleDotClick = (i) => setIndex(i);

  return (
    <NodeViewWrapper
      as={AlignWrapper}
      style={{
        justifyContent:
          textAlign === "left"
            ? "flex-start"
            : textAlign === "right"
            ? "flex-end"
            : "center",
      }}
    >
      <ResizableWrapper node={node} updateAttributes={updateAttributes}>
        <ResizableBox className="res" style={{ width, height }}>
          <ImageWrapper>
            {images[index] && (
              <CarouselImage src={images[index].src} alt={images[index].alt} />
            )}
            <EditButton
              onClick={() =>
                handleImageUpdatePopup(
                  images,
                  updateAttributes,
                  images.length === 1
                )
              }
            >
              <EditIcon height={20} />
            </EditButton>
          </ImageWrapper>
          {images.length > 1 && (
            <DotsContainer>
              {images.map((_, i) => (
                <Dot
                  key={i}
                  $active={i === index}
                  onClick={() => handleDotClick(i)}
                />
              ))}
            </DotsContainer>
          )}
        </ResizableBox>
      </ResizableWrapper>
    </NodeViewWrapper>
  );
};

export default ImagesComponent;

const AlignWrapper = styled.div`
  display: flex;
`;

const ResizableBox = styled.div`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const EditButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  padding: 2px 6px;
  font-size: 12px;
  &:hover {
    background: #eee;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) => (props.$active ? "black" : "#ccc")};
  cursor: pointer;
`;
