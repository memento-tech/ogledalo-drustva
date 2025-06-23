import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import EditIcon from "../../icons/EditIcon";

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
        parseHTML: (el) => el.style.textAlign || "center",
        renderHTML: ({ textAlign }) => ({
          style: `text-align: ${textAlign}`,
        }),
      },
      width: {
        default: "400px",
        parseHTML: (el) => el.style.width || "400px",
        renderHTML: ({ width }) => ({
          style: `width: ${width}`,
        }),
      },
      height: {
        default: "300px",
        parseHTML: (el) => el.style.height || "300px",
        renderHTML: ({ height }) => ({
          style: `height: ${height}`,
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "carousel-block" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["carousel-block", mergeAttributes(HTMLAttributes)];
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
  const intervalRef = useRef(null);

  const { width, height, textAlign } = node.attrs;

  useEffect(() => {
    if (images.length > 1) {
      startAutoplay();
      return () => clearInterval(intervalRef.current);
    }
  }, []);

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
  };

  const handleDotClick = (i) => setIndex(i);

  const startResize = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = parseInt(width);
    const startHeight = parseInt(height);

    const doDrag = (moveEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      const newHeight = startHeight + (moveEvent.clientY - startY);
      updateAttributes({ width: `${newWidth}px`, height: `${newHeight}px` });
    };

    const stopDrag = () => {
      window.removeEventListener("mousemove", doDrag);
      window.removeEventListener("mouseup", stopDrag);
    };

    window.addEventListener("mousemove", doDrag);
    window.addEventListener("mouseup", stopDrag);
  };

  return (
    <NodeViewWrapper as={AlignWrapper} $align={textAlign}>
      <ResizableBox style={{ width, height }}>
        <ImageWrapper
          onMouseEnter={() => clearInterval(intervalRef.current)}
          onMouseLeave={startAutoplay}
        >
          <CarouselImage src={images[index].src} />
          <EditButton
            onClick={() =>
              handleImageUpdatePopup(
                node.attrs.images,
                updateAttributes,
                images.length === 1
              )
            }
          >
            <EditIcon height={20} />
          </EditButton>
          <ResizeHandle onMouseDown={startResize} />
        </ImageWrapper>
        {images.length > 1 && (
          <DotsContainer>
            {images.map((_, i) => (
              <Dot
                key={i}
                active={i === index}
                onClick={() => handleDotClick(i)}
              />
            ))}
          </DotsContainer>
        )}
      </ResizableBox>
    </NodeViewWrapper>
  );
};

export default ImagesComponent;

const AlignWrapper = styled.div`
  display: flex;
  justify-content: ${({ $align }) => {
    if ($align === "left") return "flex-start";
    if ($align === "right") return "flex-end";
    return "center";
  }};
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
  transition: opacity 0.5s ease;
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

const ResizeHandle = styled.div`
  position: absolute;
  right: -6px;
  bottom: -6px;
  width: 12px;
  height: 12px;
  background: gray;
  border-radius: 4px;
  cursor: nwse-resize;
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
  background: ${({ active }) => (active ? "black" : "#ccc")};
  cursor: pointer;
`;
