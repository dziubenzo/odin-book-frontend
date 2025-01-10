import { MdOutlineErrorOutline } from 'react-icons/md';
import { StyledPublishPostSection } from '../styles/NewPostPage.styled';
import { StyledButton } from '../styles/WelcomePage.styled';

type PublishPostSectionProps = {
  errorMessage: string;
  inProgress: boolean;
  handleSubmitButtonClick: () => Promise<void>;
};

function PublishPostSection({
  errorMessage,
  inProgress,
  handleSubmitButtonClick,
}: PublishPostSectionProps) {
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

export default PublishPostSection;
