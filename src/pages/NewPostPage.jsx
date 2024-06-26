import API_URL from '../API';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { StyledNewPostPage } from '../styles/NewPostPage.styled';
import PostTypeSelector from '../components/PostTypeSelector';
import { useState } from 'react';
import {
  MAX_POST_TITLE_LENGTH,
  MIN_POST_TITLE_LENGTH,
  createPost,
} from '../helpers';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useFetchPageData, usePreserveState } from '../hooks';
import CategoryPicker from '../components/CategoryPicker';

import { StyledButton } from '../styles/WelcomePage.styled';
import { MdOutlineErrorOutline } from 'react-icons/md';
import SuccessPage from './SuccessPage';
import TextEditor from '../components/TextEditor';

function NewPostPage() {
  const navigate = useNavigate();
  const [user] = useOutletContext();
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

  usePreserveState(
    loading,
    postType,
    title,
    category,
    content,
    setPostType,
    setTitle,
    setCategory,
    setContent,
  );

  async function handleSubmitButtonClick() {
    await createPost(
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
  }

  if (postPublished) return <SuccessPage resourceCreated={'post'} />;

  return (
    <StyledNewPostPage>
      {loading && <Loading />}
      {error && <Error errorMessage={error} />}
      {categories && (
        <>
          <h1 className="top-header">New Post</h1>
          <label htmlFor="title">Post Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            className={
              title.length < MIN_POST_TITLE_LENGTH ? 'short-title' : undefined
            }
            maxLength={MAX_POST_TITLE_LENGTH}
            defaultValue={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <CategoryPicker
            categories={categories}
            category={category}
            setCategory={setCategory}
          />
          <PostTypeSelector postType={postType} setPostType={setPostType} />
          {postType === 'text' && (
            <TextEditor content={content} setContent={setContent} />
          )}
          <div className="publish-post-wrapper">
            {errorMessage && (
              <div className="error-message-wrapper">
                <MdOutlineErrorOutline />
                <p>{errorMessage}</p>
              </div>
            )}
            <StyledButton
              className="publish-post-button"
              onClick={handleSubmitButtonClick}
            >
              {inProgress ? 'Publishing...' : 'Publish'}
            </StyledButton>
          </div>
        </>
      )}
    </StyledNewPostPage>
  );
}

export default NewPostPage;
