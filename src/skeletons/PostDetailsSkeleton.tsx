import { FaArrowDown, FaArrowUp, FaRegCommentAlt } from 'react-icons/fa';
import { LuDot } from 'react-icons/lu';
import { isMobile } from '../helpers';
import {
  StyledComment,
  StyledCommentBody,
  StyledCommentInput,
  StyledCommentInputBottom,
  StyledCommentInputTop,
  StyledCommentLikes,
  StyledComments,
  StyledPostDetails,
  StyledPostInfoPostDetails,
  StyledSubmitButton,
} from '../styles/PostDetailsPage.styled';
import { StyledPostLikes } from '../styles/PostsPage.styled';
import { StyledAvatarSkeleton } from '../styles/Skeletons.styled';

type PostDetailsSkeleton = {
  commentsLength: number;
};

function PostDetailsSkeleton({ commentsLength }: PostDetailsSkeleton) {
  return (
    <>
      <StyledPostDetails>
        <div className="post-body">
          <div className="post-top-bar">
            <h2 className="post-title skeleton">Fancy post title!</h2>
            <StyledPostLikes>
              <button className="like-icon no-hover">
                <FaArrowUp />
              </button>
              <p className="likes-count skeleton">9</p>
              <button className="dislike-icon no-hover">
                <FaArrowDown />
              </button>
            </StyledPostLikes>
          </div>
          <div className="post-content skeleton">
            Some post content. Some post content. Some post content. Some post
            content. Some post content. Some post content. Some post content.
            Some post content. Some post content. Some post content. Some post
            content. Some post content. Some post content. Some post content.
            Some post content. Some post content. Some post content. Some post
            content. Some post content. Some post content. Some post content.
            Some post content. Some post content. Some post content. Some post
            content. Some post content. Some post content. Some post content.
            Some post content. Some post content. Some post content. Some post
            content. Some post content. Some post content. Some post content.
            Some post content. Some post content. Some post content. Some post
            content. Some post content. Some post content. Some post content.
            Some post content. Some post content. Some post content. Some post
            content. Some post content. Some post content. Some post content.
            Some post content. Some post content. Some post content. Some post
            content. Some post content. Some post content. Some post content.
            Some post content. Some post content. Some post content. Some post
            content. Some post content. Some post content.{' '}
          </div>
        </div>
        <StyledPostInfoPostDetails>
          <>
            <div className="post-author">
              <StyledAvatarSkeleton $size={14.4} />
              <a className="user-link skeleton">Name</a>
            </div>
            <LuDot />
            <span className="post-date skeleton">2 days ago</span>
            <LuDot />
            <a className="category-link skeleton">Category</a>
            <LuDot />
            <div className="post-comments">
              <p className="comments-count skeleton">299</p>
              <FaRegCommentAlt />
            </div>
          </>
        </StyledPostInfoPostDetails>
      </StyledPostDetails>
      <hr />
      <StyledCommentInput>
        <h2>New Comment</h2>
        <StyledCommentInputTop $contentLength={320}>
          <StyledAvatarSkeleton $size={36} />
          <textarea
            rows={isMobile() ? 6 : 4}
            className="comment-input-field skeleton"
          ></textarea>
          <p className="comment-length skeleton">320</p>
        </StyledCommentInputTop>
        <StyledCommentInputBottom>
          <StyledSubmitButton className="skeleton">Button</StyledSubmitButton>
        </StyledCommentInputBottom>
        <hr />
      </StyledCommentInput>
      <StyledComments>
        <h2>Comments ({commentsLength})</h2>
        {Array(commentsLength)
          .fill(null)
          .map((_v, index) => {
            return (
              <StyledComment key={index}>
                <StyledAvatarSkeleton $size={36} />
                <StyledCommentBody>
                  <div className="top-bar">
                    <a className="user-link skeleton">Username</a>
                    <LuDot />
                    <span className="date skeleton">69 days ago</span>
                  </div>
                  <p className="content skeleton">
                    Some fancy comment by Username, cool!
                  </p>
                </StyledCommentBody>
                <StyledCommentLikes>
                  <button className="like-icon no-hover">
                    <FaArrowUp />
                  </button>
                  <p className="likes-count skeleton">9</p>
                  <button className="dislike-icon no-hover">
                    <FaArrowDown />
                  </button>
                </StyledCommentLikes>
              </StyledComment>
            );
          })}
      </StyledComments>
    </>
  );
}
export default PostDetailsSkeleton;
