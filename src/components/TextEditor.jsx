import PropTypes from 'prop-types';
import Editor from 'react-simple-wysiwyg';
import { StyledTextEditor } from '../styles/NewPostPage.styled';
import sanitize from 'sanitize-html';

function TextEditor({ content, setContent }) {
  // Remove almost all attributes of any pasted content to get rid of formatting
  // Remove unsupported tags
  function handlePastedContent() {
    setTimeout(() => {
      const contentEditableDiv = document.querySelector("div[class='rsw-ce']");
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
        onChange={(event) => setContent(event.target.value)}
        onPaste={handlePastedContent}
      />
    </StyledTextEditor>
  );
}

TextEditor.propTypes = {
  content: PropTypes.string,
  setContent: PropTypes.func,
};

export default TextEditor;
