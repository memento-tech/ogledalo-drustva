// extensions/FontSize.js
import { Mark, mergeAttributes } from "@tiptap/core";

const TipTapFontSize = Mark.create({
  name: "fontSize",

  addAttributes() {
    return {
      size: {
        default: "16px",
        parseHTML: (element) => element.style.fontSize || "16px",
        renderHTML: (attributes) => {
          return {
            style: `font-size: ${attributes.size}`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        style: "font-size",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setFontSize:
        (size) =>
        ({ commands }) => {
          return commands.setMark(this.name, { size });
        },
    };
  },
});

export default TipTapFontSize;
