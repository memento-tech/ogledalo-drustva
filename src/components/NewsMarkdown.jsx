import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NewsMarkdown = ({ markdownText }) => {
  const reactMarkdown = (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        img: ({ src, alt, width, ...props }) => (
          <img
            src={src}
            alt={alt}
            style={{
              maxWidth: "80%",
              width: width,
            }}
          />
        ),
        h2: ({ node, ...props }) => {
          var title = "";

          if (
            node.children[0].tagName &&
            node.children[0].tagName === "strong"
          ) {
            title = node.children[0].children[0].value;
          } else {
            title = node.children[0].value;
          }

          return (
            <h2 id={title.toLowerCase().replace(/ /g, "-")}>
              <b>{title}</b>
            </h2>
          );
        },
        h3: ({ node, ...props }) => {
          var title = "";

          if (
            node.children[0].tagName &&
            node.children[0].tagName === "strong"
          ) {
            title = node.children[0].children[0].value;
          } else {
            title = node.children[0].value;
          }

          return (
            <h3 id={title.toLowerCase().replace(/ /g, "-")}>
              <b>{title}</b>
            </h3>
          );
        },
        h4: ({ children }) => {
          return <p>{children}</p>;
        },
        h5: ({ children }) => {
          return <p>{children}</p>;
        },
        a: ({ href, children }) => {
          if (href && href.startsWith("#")) {
            return (
              <Link
                to={href.substring(1)}
                duration={500}
                smooth={true}
                spy={true}
                containerId="markdown-body"
              >
                {children}
              </Link>
            );
          }
          return <a href={href}>{children}</a>;
        },
        table: ({ children }) => {
          return (
            <TableContainer>
              <table>{children}</table>
            </TableContainer>
          );
        },
      }}
    >
      {markdownText}
    </ReactMarkdown>
  );

  return <MarkdownBody id="markdown-body">{reactMarkdown}</MarkdownBody>;
};

export default NewsMarkdown;

const MarkdownBody = styled.div`
  width: 100%;
  height: 100%;

  a {
    text-decoration: underline;
    color: inherit;
  }

  ul {
    @media screen and (max-width: 600px) {
      padding-left: 20px;
    }
  }

  pre {
    div {
      background: inherit !important;
    }

    @media screen and (max-width: 600px) {
      max-width: 100%;
      overflow: scroll;
    }
  }
`;

const TableContainer = styled.div`
  @media screen and (max-width: 600px) {
    max-width: 100%;
    overflow: scroll;
  }

  table {
    margin-top: 1rem;
    margin-left: 20px;

    width: calc(100% - 20px);
    border: 1px solid white;
    border-collapse: collapse;

    @media screen and (max-width: 600px) {
      max-width: 100vw;
      overflow-x: scroll;

      word-break: normal;
      white-space: nowrap;

      text-align: justify;

      margin-left: 0;
    }

    td,
    th {
      border: 1px solid white;
      padding: 5px 10px;
    }

    td:first-child,
    th:first-child {
      border-left: none;
    }
  }
`;
