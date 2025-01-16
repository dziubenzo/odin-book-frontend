import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryPicker from '../components/CategoryPicker';
import Error from '../components/Error';
import ImageEditor from '../components/ImageEditor';
import Loading from '../components/Loading';
import PostTitleInput from '../components/PostTitleInput';
import PostTypeSelector from '../components/PostTypeSelector';
import PublishPostSection from '../components/PublishPostSection';
import TextEditor from '../components/TextEditor';
import VideoEditor from '../components/VideoEditor';
import { createImagePost, createTextPost, createVideoPost } from '../helpers';
import {
  useChangeTitle,
  useFetchPageData,
  usePreserveState,
  useUserAndTheme,
} from '../hooks';
import { StyledNewPostPage } from '../styles/NewPostPage.styled';
import type { Category } from '../types';
import SuccessPage from './SuccessPage';

function NewPostPage() {
  const navigate = useNavigate();
  const { user } = useUserAndTheme();
  const {
    data: categories,
    loading,
    error,
  } = useFetchPageData<Category[]>(`/categories`);

  const [inProgress, setInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [postPublished, setPostPublished] = useState(false);

  const {
    postType,
    setPostType,
    title,
    setTitle,
    category,
    setCategory,
    content,
    setContent,
    imageURL,
    setImageURL,
    imageFile,
    setImageFile,
    videoURL,
    setVideoURL,
  } = usePreserveState(loading);

  useChangeTitle('New Post');

  async function handleSubmitButtonClick() {
    if (postType === 'text') {
      await createTextPost(
        inProgress,
        user._id,
        title,
        content,
        category,
        setInProgress,
        setErrorMessage,
        setPostPublished,
        navigate,
      );
    } else if (postType === 'image') {
      await createImagePost(
        inProgress,
        user._id,
        title,
        imageURL,
        imageFile,
        category,
        setInProgress,
        setErrorMessage,
        setPostPublished,
        navigate,
      );
    } else if (postType === 'video') {
      await createVideoPost(
        inProgress,
        user._id,
        title,
        videoURL,
        category,
        setInProgress,
        setErrorMessage,
        setPostPublished,
        navigate,
      );
    }
  }

  if (postPublished) return <SuccessPage resourceCreated="post" />;

  return (
    <StyledNewPostPage>
      {loading && <Loading />}
      {error && <Error errorMessage={error} />}
      {categories && (
        <>
          <h1 className="top-header">New Post</h1>
          <PostTitleInput title={title} setTitle={setTitle} />
          <CategoryPicker
            categories={categories}
            category={category}
            setCategory={setCategory}
          />
          <PostTypeSelector postType={postType} setPostType={setPostType} />
          {postType === 'text' && (
            <TextEditor content={content} setContent={setContent} />
          )}
          {postType === 'image' && (
            <ImageEditor
              imageURL={imageURL}
              imageFile={imageFile}
              setImageURL={setImageURL}
              setImageFile={setImageFile}
            />
          )}
          {postType === 'video' && (
            <VideoEditor videoURL={videoURL} setVideoURL={setVideoURL} />
          )}
          <PublishPostSection
            errorMessage={errorMessage}
            inProgress={inProgress}
            handleSubmitButtonClick={handleSubmitButtonClick}
          />
        </>
      )}
    </StyledNewPostPage>
  );
}

export default NewPostPage;
