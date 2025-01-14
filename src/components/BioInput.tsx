import { MAX_BIO_LENGTH } from '../constants';
import { disableEnter } from '../helpers';
import { StyledBioInput } from '../styles/ProfilePage.styled';
import { StyledButton } from '../styles/WelcomePage.styled';
import type { User } from '../types';

type BioInputProps = {
  bio: User['bio'];
  bioLength: number;
  inProgress: boolean;
  feedback: string;
  setBio: React.Dispatch<React.SetStateAction<string>>;
  setBioLength: React.Dispatch<React.SetStateAction<number>>;
  handleUpdateProfileClick: () => Promise<void>;
};

function BioInput({
  bio,
  bioLength,
  setBio,
  setBioLength,
  handleUpdateProfileClick,
  inProgress,
  feedback,
}: BioInputProps) {
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
          setBio(event.currentTarget.value);
          setBioLength(MAX_BIO_LENGTH - event.currentTarget.value.length);
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

export default BioInput;
