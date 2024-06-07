import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaRegCommentAlt } from 'react-icons/fa';
import { LuDot } from 'react-icons/lu';
import { format, formatDistanceToNow } from 'date-fns';

function PostInfo({ post, StyledComponent }) {
  const { author, created_at, category, comments } = post;

  return (
    <StyledComponent>
      <Link to={`/users/${author.username}`} className="user-link">
        {author.username}
      </Link>
      <LuDot />
      <span
        className="post-date"
        title={format(created_at, 'HH:mm, dd/MM/yyyy')}
      >
        {formatDistanceToNow(created_at, { addSuffix: true })}{' '}
      </span>
      <LuDot />
      <Link to={`/categories/${category.slug}`} className="category-link">
        {category.name}
      </Link>
      <LuDot />
      <div className="post-comments">
        <p className="comments-count" data-testid="comments-count">
          {comments.length}
        </p>
        <FaRegCommentAlt />
      </div>
    </StyledComponent>
  );
}

PostInfo.propTypes = {
  StyledComponent: PropTypes.object,
  post: PropTypes.object,
};

export default PostInfo;
