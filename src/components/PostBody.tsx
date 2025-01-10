import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { StyledPostBody } from '../styles/PostsPage.styled';
import type { Post } from '../types';
import PostInfo from './PostInfo';

type PostBodyProps = {
  post: Post;
};

function PostBody({ post }: PostBodyProps) {
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
      <PostInfo post={post} isPostInfoPostDetails={false} />
    </StyledPostBody>
  );
}

export default PostBody;
