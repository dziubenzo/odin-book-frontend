import PropTypes from 'prop-types';
import { StyledPost } from '../styles/AllPostsPage.styled';
import { Link } from 'react-router-dom';
import { FaArrowUp, FaRegCommentAlt } from 'react-icons/fa';
import { LuDot } from 'react-icons/lu';
import { format, formatDistanceToNow } from 'date-fns';

function Post({ post, user }) {
  const {
    author,
    category,
    comments,
    content,
    created_at,
    likes,
    slug,
    title,
  } = post;

  return (
    <StyledPost>
      <div className="post-likes">
        <div className="like-icon-wrapper">
          <FaArrowUp
            className={
              likes.includes(user._id) ? 'like-icon liked' : 'like-icon'
            }
          />
        </div>
        <p className="likes-count">{likes.length}</p>
      </div>
      <div className="post-body">
        <Link to={`/posts/${slug}`}>
          <p className="post-title">{title}</p>
          <p className="post-content">{content}</p>
        </Link>
        <div className="post-info">
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
          <span className="post-comments">
            {comments.length} <FaRegCommentAlt />
          </span>
        </div>
      </div>
    </StyledPost>
  );
}

Post.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
};

export default Post;
