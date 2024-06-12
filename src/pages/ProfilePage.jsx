import { useOutletContext } from 'react-router-dom';
import { StyledProfilePage } from '../styles/ProfilePage.styled';
import { MAX_BIO_LENGTH } from '../helpers';
import { useState } from 'react';
import UserInfo from '../components/UserInfo';
import AvatarUploader from '../components/AvatarUploader';
import DefaultAvatars from '../components/DefaultAvatars';
import BioInput from '../components/BioInput';

export default function ProfilePage() {
  const [user, setUser] = useOutletContext();
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [bioLength, setBioLength] = useState(MAX_BIO_LENGTH - user.bio.length);
  const [uploadedAvatar, setUploadedAvatar] = useState('');
  const [uploadedAvatarPreview, setUploadedAvatarPreview] = useState('');

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
      <BioInput user={user} bioLength={bioLength} setBioLength={setBioLength} />
    </StyledProfilePage>
  );
}
