import { format, formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { FaRegCommentAlt } from 'react-icons/fa';
import { LuDot } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { calculatePopoverPosition } from '../helpers';
import { StyledPostInfoPostDetails } from '../styles/PostDetailsPage.styled';
import { StyledPostInfo } from '../styles/PostsPage.styled';
import type { DetailedPost, Post } from '../types';
import Avatar from './Avatar';
import Popover from './Popover';

type PostInfoProps = {
  post: Post | DetailedPost;
  isPostInfoPostDetails: boolean;
};

function PostInfo({ post, isPostInfoPostDetails }: PostInfoProps) {
  const { author, created_at, category, comments } = post;

  const [showUserPopover, setShowUserPopover] = useState(false);
  const [userPopoverX, setUserPopoverX] = useState(0);
  const [userPopoverY, setUserPopoverY] = useState(0);

  const [showCategoryPopover, setShowCategoryPopover] = useState(false);
  const [categoryPopoverX, setCategoryPopoverX] = useState(0);
  const [categoryPopoverY, setCategoryPopoverY] = useState(0);

  const info = (
    <>
      <div
        className="post-author"
        onMouseEnter={(event) => {
          setShowUserPopover(true);
          calculatePopoverPosition(event, setUserPopoverX, setUserPopoverY);
        }}
        onMouseLeave={() => {
          setTimeout(() => setShowUserPopover(false), 500);
        }}
      >
        <Avatar object={author} size={14.4} type="user" />
        <Link to={`/users/${author.username}`} className="user-link">
          {author.username}
        </Link>
        {showUserPopover && (
          <Popover
            type="user"
            query={`/users/${author.username}`}
            positionX={userPopoverX}
            positionY={userPopoverY}
          />
        )}
      </div>
      <LuDot />
      <span
        className="post-date"
        title={format(created_at, 'HH:mm, dd/MM/yyyy')}
      >
        {formatDistanceToNow(created_at, { addSuffix: true })}{' '}
      </span>
      <LuDot />
      <div
        onMouseEnter={(event) => {
          setShowCategoryPopover(true);
          calculatePopoverPosition(
            event,
            setCategoryPopoverX,
            setCategoryPopoverY,
          );
        }}
        onMouseLeave={() => {
          setTimeout(() => setShowCategoryPopover(false), 500);
        }}
      >
        <Link to={`/categories/${category.slug}`} className="category-link">
          {category.name}
        </Link>
        {showCategoryPopover && (
          <Popover
            type="category"
            query={`/categories/${category.slug}`}
            positionX={categoryPopoverX}
            positionY={categoryPopoverY}
          />
        )}
      </div>
      <LuDot />
      <div className="post-comments">
        <p className="comments-count" data-testid="comments-count">
          {comments.length}
        </p>
        <FaRegCommentAlt />
      </div>
    </>
  );

  if (isPostInfoPostDetails) {
    return <StyledPostInfoPostDetails>{info}</StyledPostInfoPostDetails>;
  }

  return <StyledPostInfo>{info}</StyledPostInfo>;
}

export default PostInfo;
