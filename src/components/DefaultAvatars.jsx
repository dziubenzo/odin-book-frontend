import PropTypes from 'prop-types';
import { StyledDefaultAvatars } from '../styles/ProfilePage.styled';
import { defaultAvatars } from '../helpers';

function DefaultAvatars({ selectedAvatar, uploadedAvatar, setSelectedAvatar }) {
  function renderDefaultAvatars() {
    return defaultAvatars.map((avatarURL, index) => {
      return (
        <img
          className={selectedAvatar === avatarURL ? 'selected' : undefined}
          key={avatarURL}
          src={avatarURL}
          alt={`Default Avatar ${index + 1}`}
          onClick={() => {
            if (selectedAvatar === avatarURL) {
              return setSelectedAvatar('');
            }
            setSelectedAvatar(avatarURL);
          }}
        />
      );
    });
  }

  return (
    !uploadedAvatar && (
      <StyledDefaultAvatars>
        <h2>Choose Your Avatar</h2>
        <div className="default-avatars-images">{renderDefaultAvatars()}</div>
      </StyledDefaultAvatars>
    )
  );
}

DefaultAvatars.propTypes = {
  selectedAvatar: PropTypes.string,
  uploadedAvatar: PropTypes.any,
  setSelectedAvatar: PropTypes.func,
};

export default DefaultAvatars;
