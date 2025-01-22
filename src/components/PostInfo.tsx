import { format, formatDistanceToNow } from 'date-fns';
import { useRef, useState } from 'react';
import { FaRegCommentAlt } from 'react-icons/fa';
import { LuDot } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { handlePopoverHiding, handlePopoverShowing } from '../helpers';
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
  const [isUserPopoverClosing, setIsUserPopoverClosing] = useState(false);
  const [userPopoverX, setUserPopoverX] = useState(0);
  const [userPopoverY, setUserPopoverY] = useState(0);
  const userTimeoutRef = useRef<NodeJS.Timeout>(undefined);

  const [showCategoryPopover, setShowCategoryPopover] = useState(false);
  const [isCategoryPopoverClosing, setIsCategoryPopoverClosing] =
    useState(false);
  const [categoryPopoverX, setCategoryPopoverX] = useState(0);
  const [categoryPopoverY, setCategoryPopoverY] = useState(0);
  const categoryTimeoutRef = useRef<NodeJS.Timeout>(undefined);

  const info = (
    <>
      <div
        className="post-author"
        onMouseEnter={(event) => {
          handlePopoverShowing(
            event,
            isUserPopoverClosing,
            setUserPopoverX,
            setUserPopoverY,
            userTimeoutRef,
            setShowUserPopover,
          );
        }}
        onMouseLeave={() => {
          handlePopoverHiding(
            userTimeoutRef,
            showUserPopover,
            setIsUserPopoverClosing,
          );
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
            isClosing={isUserPopoverClosing}
            setIsClosing={setIsUserPopoverClosing}
            setShowPopover={setShowUserPopover}
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
          handlePopoverShowing(
            event,
            isCategoryPopoverClosing,
            setCategoryPopoverX,
            setCategoryPopoverY,
            categoryTimeoutRef,
            setShowCategoryPopover,
          );
        }}
        onMouseLeave={() => {
          handlePopoverHiding(
            categoryTimeoutRef,
            showCategoryPopover,
            setIsCategoryPopoverClosing,
          );
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
            isClosing={isCategoryPopoverClosing}
            setIsClosing={setIsCategoryPopoverClosing}
            setShowPopover={setShowCategoryPopover}
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
