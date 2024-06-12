import PropTypes from 'prop-types';
import { StyledBioInput } from '../styles/ProfilePage.styled';
import { StyledButton } from '../styles/WelcomePage.styled';
import { MAX_BIO_LENGTH } from '../helpers';

function BioInput({ user, bioLength, setBioLength }) {
  return (
    <StyledBioInput>
      <label htmlFor="bio">Bio ({bioLength} characters left)</label>
      <textarea
        id="bio"
        name="bio"
        rows={6}
        placeholder="Fill out your bio here!"
        maxLength={MAX_BIO_LENGTH}
        onInput={(event) =>
          setBioLength(MAX_BIO_LENGTH - event.target.value.length)
        }
        defaultValue={user.bio || undefined}
      />
      <StyledButton className="update-profile-button">
        Update Profile
      </StyledButton>
    </StyledBioInput>
  );
}

BioInput.propTypes = {
  user: PropTypes.object,
  bioLength: PropTypes.number,
  setBioLength: PropTypes.func,
};

export default BioInput;
