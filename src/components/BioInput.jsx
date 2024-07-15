import PropTypes from 'prop-types';
import { StyledBioInput } from '../styles/ProfilePage.styled';
import { StyledButton } from '../styles/WelcomePage.styled';
import { disableEnter, MAX_BIO_LENGTH } from '../helpers';

function BioInput({
  bio,
  bioLength,
  setBio,
  setBioLength,
  handleUpdateProfileClick,
  inProgress,
  feedback,
}) {
  return (
    <StyledBioInput>
      <label htmlFor="bio">
        Bio (
        {bioLength !== 1
          ? `${bioLength} characters `
          : `${bioLength} character `}
        left):
      </label>
      <textarea
        id="bio"
        name="bio"
        rows={6}
        placeholder="Fill out your bio here!"
        maxLength={MAX_BIO_LENGTH}
        onInput={(event) => {
          setBio(event.target.value);
          setBioLength(MAX_BIO_LENGTH - event.target.value.length);
        }}
        onKeyDown={disableEnter}
        defaultValue={bio}
      />
      <div className="update-profile-wrapper">
        <StyledButton
          className="update-profile-button"
          onClick={handleUpdateProfileClick}
        >
          {inProgress ? 'Updating...' : 'Update Profile'}
        </StyledButton>
        {feedback && <p className="feedback-message">{feedback}</p>}
      </div>
    </StyledBioInput>
  );
}

BioInput.propTypes = {
  bio: PropTypes.string,
  bioLength: PropTypes.number,
  setBio: PropTypes.func,
  setBioLength: PropTypes.func,
  handleUpdateProfileClick: PropTypes.func,
  inProgress: PropTypes.bool,
  feedback: PropTypes.string,
};

export default BioInput;
