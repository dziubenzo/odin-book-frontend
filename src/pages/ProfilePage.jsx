import { useOutletContext } from 'react-router-dom';
import { StyledProfilePage } from '../styles/ProfilePage.styled';
import { MAX_BIO_LENGTH, updateUserProfile } from '../helpers';
import { useState } from 'react';
import UserInfo from '../components/UserInfo';
import AvatarUploader from '../components/AvatarUploader';
import DefaultAvatars from '../components/DefaultAvatars';
import BioInput from '../components/BioInput';
import ThemeSwitch from '../components/ThemeSwitch';
import { useChangeTitle } from '../hooks';

export default function ProfilePage() {
  const { user, setUser } = useOutletContext();
  const [bio, setBio] = useState(user.bio);
  const [bioLength, setBioLength] = useState(MAX_BIO_LENGTH - user.bio.length);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [uploadedAvatar, setUploadedAvatar] = useState('');
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
      <UserInfo user={user} />
      <DefaultAvatars
        selectedAvatar={selectedAvatar}
        uploadedAvatar={uploadedAvatar}
        setSelectedAvatar={setSelectedAvatar}
      />
      <AvatarUploader
        uploadedAvatar={uploadedAvatar}
        uploadedAvatarPreview={uploadedAvatarPreview}
        setUploadedAvatar={setUploadedAvatar}
        setUploadedAvatarPreview={setUploadedAvatarPreview}
        setSelectedAvatar={setSelectedAvatar}
      />
      <BioInput
        bio={bio}
        bioLength={bioLength}
        setBio={setBio}
        setBioLength={setBioLength}
        handleUpdateProfileClick={handleUpdateProfileClick}
        inProgress={inProgress}
        feedback={feedback}
      />
      <ThemeSwitch />
    </StyledProfilePage>
  );
}
