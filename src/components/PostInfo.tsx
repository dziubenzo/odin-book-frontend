import { format, formatDistanceToNowStrict } from 'date-fns';
import { FaRegCommentAlt } from 'react-icons/fa';
import { LuDot } from 'react-icons/lu';
import { StyledPostInfoPostDetails } from '../styles/PostDetailsPage.styled';
import { StyledPostInfo } from '../styles/PostsPage.styled';
import type { DetailedPost, Post } from '../types';
import Avatar from './Avatar';
import DetailsLink from './DetailsLink';

type PostInfoProps = {
  post: Post | DetailedPost;
  isPostInfoPostDetails: boolean;
};

function PostInfo({ post, isPostInfoPostDetails }: PostInfoProps) {
  const { author, created_at, category, comments } = post;

  const info = (
    <>
      <div className="post-author">
        <Avatar object={author} size={14.4} type="user" />
        <DetailsLink type="user" username={author.username} />
      </div>
      <LuDot />
      <span
        className="post-date"
        title={format(created_at, 'HH:mm, dd/MM/yyyy')}
      >
        {formatDistanceToNowStrict(created_at, { addSuffix: true })}
      </span>
      <LuDot />
      <DetailsLink type="category" name={category.name} slug={category.slug} />
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
