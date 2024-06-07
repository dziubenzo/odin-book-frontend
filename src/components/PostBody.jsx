import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PostInfo from './PostInfo';

import { StyledPostBody } from '../styles/AllPostsPage.styled';
import { StyledPostInfo } from '../styles/AllPostsPage.styled';

function PostBody({ post }) {
  const { slug, title, content } = post;

  return (
    <StyledPostBody>
      <Link to={`/posts/${slug}`}>
        <p className="post-title">{title}</p>
        <p className="post-content">{content}</p>
      </Link>
      <PostInfo post={post} StyledComponent={StyledPostInfo} />
    </StyledPostBody>
  );
}

PostBody.propTypes = {
  post: PropTypes.object,
};

export default PostBody;
