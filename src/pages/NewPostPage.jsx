import API_URL from '../API';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { StyledNewPostPage } from '../styles/NewPostPage.styled';
import PostTypeSelector from '../components/PostTypeSelector';
import { useState } from 'react';
import { createImagePost, createTextPost, createVideoPost } from '../helpers';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useFetchPageData, usePreserveState } from '../hooks';
import PostTitleInput from '../components/PostTitleInput';
import CategoryPicker from '../components/CategoryPicker';
import SuccessPage from './SuccessPage';
import TextEditor from '../components/TextEditor';
import ImageEditor from '../components/ImageEditor';
import VideoEditor from '../components/VideoEditor';
import PublishPostSection from '../components/PublishPostSection';

function NewPostPage() {
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const {
    data: categories,
    loading,
    error,
  } = useFetchPageData(`${API_URL}/categories`);

  const [inProgress, setInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [postPublished, setPostPublished] = useState(false);

  const [postType, setPostType] = useState('text');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [videoURL, setVideoURL] = useState('');

  usePreserveState(
    loading,
    postType,
    title,
    category,
    content,
    imageURL,
    videoURL,
    setPostType,
    setTitle,
    setCategory,
    setContent,
    setImageURL,
    setVideoURL,
  );

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

  if (postPublished) return <SuccessPage resourceCreated={'post'} />;

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
