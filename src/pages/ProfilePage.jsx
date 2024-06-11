import { Link, useOutletContext } from 'react-router-dom';
import { StyledProfilePage } from '../styles/ProfilePage.styled';
import { MAX_BIO_LENGTH, defaultAvatars } from '../helpers';
import { useState } from 'react';
import { format } from 'date-fns';
import { StyledSubmitButton } from '../styles/PostDetailsPage.styled';

export default function ProfilePage() {
  const [user, setUser] = useOutletContext();
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [bioLength, setBioLength] = useState(MAX_BIO_LENGTH - user.bio.length);

  return (
    <StyledProfilePage>
      <div className="user-info">
        {user.avatar && <img src={user.avatar} />}
        <h1>
          <Link to={`/users/${user.username}`}>{user.username}</Link>
        </h1>
        <h2>
          member since <span>{format(user.registered_at, 'dd MMMM yyyy')}</span>
        </h2>
        <Link className="previous-page-link" to={-1}>
          Back To
          <br />
          Previous Page
        </Link>
      </div>
      <div className="bio">
        <label htmlFor="bio">Bio ({bioLength} characters left)</label>
        <textarea
          id="bio"
          name="bio"
          rows={8}
          placeholder="Fill out your bio here!"
          maxLength={MAX_BIO_LENGTH}
          onInput={(event) =>
            setBioLength(MAX_BIO_LENGTH - event.target.value.length)
          }
        >
          {user.bio}
        </textarea>
      </div>
      <div className="default-avatars">
        <h2>Default Avatars (Click To Choose)</h2>
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
      <StyledSubmitButton>Update Profile</StyledSubmitButton>
    </StyledProfilePage>
  );
}
