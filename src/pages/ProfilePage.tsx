import { useState } from 'react';
import AvatarUploader from '../components/AvatarUploader';
import BioInput from '../components/BioInput';
import DefaultAvatars from '../components/DefaultAvatars';
import ThemeSwitch from '../components/ThemeSwitch';
import UserInfo from '../components/UserInfo';
import { MAX_BIO_LENGTH } from '../constants';
import { updateUserProfile } from '../helpers';
import { useChangeTitle, useUserAndTheme } from '../hooks';
import { StyledProfilePage } from '../styles/ProfilePage.styled';

export default function ProfilePage() {
  const { user, setUser } = useUserAndTheme();
  const [bio, setBio] = useState(user.bio);
  const [bioLength, setBioLength] = useState(MAX_BIO_LENGTH - user.bio.length);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [uploadedAvatar, setUploadedAvatar] = useState<File | null>(null);
  const [uploadedAvatarPreview, setUploadedAvatarPreview] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [feedback, setFeedback] = useState('');

  useChangeTitle('My Profile');

  async function handleUpdateProfileClick() {
    await updateUserProfile(
      user,
      inProgress,
      bio,
      selectedAvatar,
      uploadedAvatar,
      setInProgress,
      setFeedback,
      setUser,
      setSelectedAvatar,
      setUploadedAvatar,
      setUploadedAvatarPreview,
    );
  }

  return (
    <StyledProfilePage>
      <UserInfo />
      <DefaultAvatars
        selectedAvatar={selectedAvatar}
        uploadedAvatar={uploadedAvatar}
        setSelectedAvatar={setSelectedAvatar}
      />
      <AvatarUploader
        type="Avatar"
        uploadedAvatar={uploadedAvatar}
        uploadedAvatarPreview={uploadedAvatarPreview}
        setUploadedAvatar={setUploadedAvatar}
        setUploadedAvatarPreview={setUploadedAvatarPreview}
        setSelectedAvatar={setSelectedAvatar}
      />
      <BioInput
        bio={bio}
        bioLength={bioLength}
        inProgress={inProgress}
        feedback={feedback}
        setBio={setBio}
        setBioLength={setBioLength}
        handleUpdateProfileClick={handleUpdateProfileClick}
      />
      <ThemeSwitch />
    </StyledProfilePage>
  );
}
