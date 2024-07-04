import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PostInfo from './PostInfo';
import parse from 'html-react-parser';

import { StyledPostBody, StyledPostInfo } from '../styles/PostsPage.styled';

function PostBody({ post }) {
  const { slug, title, content } = post;

  return (
    <StyledPostBody>
      <Link to={`/posts/${slug}`}>
        <p className="post-title">{title}</p>
        <div className="post-content">{parse(content)}</div>
      </Link>
      <PostInfo post={post} StyledComponent={StyledPostInfo} />
    </StyledPostBody>
  );
}

PostBody.propTypes = {
  post: PropTypes.object,
};

export default PostBody;
