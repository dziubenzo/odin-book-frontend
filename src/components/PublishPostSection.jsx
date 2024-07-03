import PropTypes from 'prop-types';
import { StyledPublishPostSection } from '../styles/NewPostPage.styled';
import { StyledButton } from '../styles/WelcomePage.styled';
import { MdOutlineErrorOutline } from 'react-icons/md';

function PublishPostSection({
  errorMessage,
  inProgress,
  handleSubmitButtonClick,
}) {
  return (
    <StyledPublishPostSection>
      {errorMessage && (
        <div className="error-message-wrapper">
          <MdOutlineErrorOutline />
          <p>{errorMessage}</p>
        </div>
      )}
      <StyledButton
        className="publish-post-button"
        onClick={handleSubmitButtonClick}
      >
        {inProgress ? 'Publishing...' : 'Publish'}
      </StyledButton>
    </StyledPublishPostSection>
  );
}

PublishPostSection.propTypes = {
  errorMessage: PropTypes.string,
  inProgress: PropTypes.bool,
  handleSubmitButtonClick: PropTypes.func,
};

export default PublishPostSection;
