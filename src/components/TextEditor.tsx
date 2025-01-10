import Editor from 'react-simple-wysiwyg';
import sanitize from 'sanitize-html';
import { StyledTextEditor } from '../styles/NewPostPage.styled';

type TextEditorProps = {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
};

function TextEditor({ content, setContent }: TextEditorProps) {
  // Remove almost all attributes of any pasted content to get rid of formatting
  // Remove unsupported tags
  function handlePastedContent() {
    setTimeout(() => {
      const contentEditableDiv = document.querySelector<HTMLDivElement>(
        "div[class='rsw-ce']",
      );
      if (!contentEditableDiv) return;
      const cleaned = sanitize(contentEditableDiv.innerHTML, {
        allowedTags: [
          'b',
          'i',
          'u',
          'strike',
          'ol',
          'ul',
          'li',
          'a',
          'div',
          'h1',
          'h2',
          'pre',
        ],
        allowedAttributes: {
          a: ['href'],
        },
      });
      setContent(cleaned);
    }, 0);
  }

  return (
    <StyledTextEditor $contentLength={content.length}>
      <Editor
        value={content}
        data-testid={'text-editor'}
        onChange={(event) => setContent(event.target.value)}
        onPaste={handlePastedContent}
      />
    </StyledTextEditor>
  );
}

export default TextEditor;
