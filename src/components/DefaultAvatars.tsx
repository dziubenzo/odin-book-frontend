import { defaultAvatars } from '../constants';
import { useUserAndTheme } from '../hooks';
import { StyledDefaultAvatars } from '../styles/ProfilePage.styled';

type DefaultAvatarsProps = {
  selectedAvatar: string;
  uploadedAvatar: File | null;
  setSelectedAvatar: React.Dispatch<React.SetStateAction<string>>;
};

function DefaultAvatars({
  selectedAvatar,
  uploadedAvatar,
  setSelectedAvatar,
}: DefaultAvatarsProps) {
  const { user } = useUserAndTheme();
  const { avatar: currentUserAvatar } = user;

  function renderDefaultAvatars() {
    return defaultAvatars.map((avatarURL, index) => {
      return (
        <img
          className={
            selectedAvatar === avatarURL
              ? 'selected'
              : currentUserAvatar === avatarURL
                ? 'current'
                : undefined
          }
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

export default DefaultAvatars;
