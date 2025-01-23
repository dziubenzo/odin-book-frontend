import { FaArrowDown, FaArrowUp, FaRegCommentAlt } from 'react-icons/fa';
import { LuDot } from 'react-icons/lu';
import {
  StyledMonthIndicator,
  StyledPost,
  StyledPostBody,
  StyledPostInfo,
  StyledPostLikes,
  StyledPostSorter,
} from '../styles/PostsPage.styled';
import { StyledAvatarSkeleton } from '../styles/Skeletons.styled';

type PostsSkeletonProps = {
  length: number;
};

function PostsSkeleton({ length }: PostsSkeletonProps) {
  return (
    <>
      <StyledPostSorter>
        <p>Sort By:</p>
        <div className="sort-buttons">
          <button className="skeleton">Newest</button>
          <button className="skeleton">Oldest</button>
          <button className="skeleton">Likes</button>
          <button className="skeleton">Comments</button>
        </div>
      </StyledPostSorter>
      <StyledMonthIndicator className="month-indicator">
        <div className="skeleton inline">This Month</div>
      </StyledMonthIndicator>
      <div className="infinite-scroll-component__outerdiv">
        <div
          className="infinite-scroll-component posts-wrapper"
          style={{ height: 'auto', overflow: 'hidden' }}
        >
          {Array(length)
            .fill(null)
            .map((_v, index) => {
              return (
                <>
                  <StyledPost key={index}>
                    <StyledPostLikes>
                      <button className="like-icon no-hover">
                        <FaArrowUp />
                      </button>
                      <p className="likes-count skeleton">9</p>
                      <button className="dislike-icon no-hover">
                        <FaArrowDown />
                      </button>
                    </StyledPostLikes>
                    <StyledPostBody>
                      <a className="post-link no-hover">
                        <p className="post-title skeleton inline mw-40">
                          Title!
                        </p>
                        <div className="post-content skeleton">
                          Fancy content! Fancy content! Fancy content! Fancy
                          content! Fancy content! Fancy content! Fancy content!
                          Fancy content! Fancy content! Fancy content! Fancy
                          content! Fancy content! Fancy content! Fancy content!
                          Fancy content! Fancy content! Fancy content! Fancy
                          content! Fancy content! Fancy content!
                        </div>
                      </a>
                      <StyledPostInfo>
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
                      </StyledPostInfo>
                    </StyledPostBody>
                  </StyledPost>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default PostsSkeleton;
