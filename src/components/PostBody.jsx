import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PostInfo from './PostInfo';
import parse from 'html-react-parser';

import { StyledPostBody, StyledPostInfo } from '../styles/PostsPage.styled';

function PostBody({ post }) {
  const { slug, title, content } = post;
  let noWarningContent;

  // Avoid '<a> is a descendant of <a>' warnings by getting rid of <a> tags
  if (content.includes('</a>')) {
    noWarningContent = content.replaceAll('<a', '<div');
    noWarningContent = noWarningContent.replaceAll('</a>', '</div>');
  }

  return (
    <StyledPostBody>
      <Link to={`/posts/${slug}`}>
        <p className="post-title">{title}</p>
        <div className="post-content">{parse(noWarningContent || content)}</div>
      </Link>
      <PostInfo post={post} StyledComponent={StyledPostInfo} />
    </StyledPostBody>
  );
}

PostBody.propTypes = {
  post: PropTypes.object,
};

export default PostBody;
