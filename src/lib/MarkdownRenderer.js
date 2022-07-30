import Markdown from "marked-react";
export const MarkdownRenderer = ({ children }) => {
  return <Markdown>{children}</Markdown>;
};
