import { Link, useOutletContext } from 'react-router-dom';
import { StyledProfilePage } from '../styles/ProfilePage.styled';
import { MAX_BIO_LENGTH, defaultAvatars } from '../helpers';
import { useState } from 'react';
import { format } from 'date-fns';
import { StyledButton } from '../styles/WelcomePage.styled';

export default function ProfilePage() {
  const [user, setUser] = useOutletContext();
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [bioLength, setBioLength] = useState(MAX_BIO_LENGTH - user.bio.length);
  const [uploadedAvatar, setUploadedAvatar] = useState('');
  const [uploadedAvatarPreview, setUploadedAvatarPreview] = useState('');

  return (
    <StyledProfilePage>
      <div className="user-info">
        <div className="top-line">
          {user.avatar && <img className="user-avatar" src={user.avatar} />}
          <h1>
            <Link to={`/users/${user.username}`}>{user.username}</Link>
          </h1>
        </div>
        <h2>
          member since <span>{format(user.registered_at, 'dd MMMM yyyy')}</span>
        </h2>
        <Link className="previous-page-link" to={-1}>
          Back To
          <br />
          Previous Page
        </Link>
      </div>
      {!uploadedAvatar && (
        <div className="default-avatars">
          <h2>Choose Avatar</h2>
          <div className="default-avatars-images">
            {defaultAvatars.map((avatar, index) => {
              return (
                <img
                  className={selectedAvatar === avatar && 'selected'}
                  key={avatar}
                  src={avatar}
                  alt={`Default Avatar ${index + 1}`}
                  onClick={() => {
                    if (selectedAvatar === avatar) {
                      return setSelectedAvatar('');
                    }
                    setSelectedAvatar(avatar);
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
      {!uploadedAvatar && (
        <div className="avatar-uploader">
          <label className="avatar-picker" htmlFor="avatar" tabIndex={0}>
            Upload Your Own Avatar
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            onChange={(event) => {
              if (event.target.files[0]) {
                setUploadedAvatar(event.target.files[0]);
                setUploadedAvatarPreview(
                  URL.createObjectURL(event.target.files[0]),
                );
                setSelectedAvatar('');
              }
            }}
          />
        </div>
      )}
      {uploadedAvatar && (
        <div className="avatar-preview">
          <div className="avatar-preview-left-side">
            <h2>Avatar Preview</h2>
            <img className="avatar-preview" src={uploadedAvatarPreview} />
          </div>
          <StyledButton
            className="clear-avatar-button"
            onClick={() => {
              setUploadedAvatar('');
              setUploadedAvatarPreview('');
            }}
          >
            Clear Uploaded Avatar
          </StyledButton>
        </div>
      )}
      <div className="bio">
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
        >
          {user.bio}
        </textarea>
        <StyledButton className="update-profile-button">
          Update Profile
        </StyledButton>
      </div>
    </StyledProfilePage>
  );
}
