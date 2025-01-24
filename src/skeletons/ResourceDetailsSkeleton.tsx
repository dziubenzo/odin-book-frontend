import { BiCommentAdd, BiCommentMinus } from 'react-icons/bi';
import { FaRegCommentAlt, FaUsers } from 'react-icons/fa';
import { LuLink } from 'react-icons/lu';
import { MdOutlineCategory } from 'react-icons/md';
import { TbFileDislike, TbFileLike, TbUserStar } from 'react-icons/tb';
import {
  StyledCategoryStats,
  StyledResourceDetails,
  StyledResourceDetailsTop,
  StyledStat,
  StyledUserStats,
} from '../styles/PostsPage.styled';
import { StyledAvatarSkeleton } from '../styles/Skeletons.styled';

type ResourceDetailsSkeletonProps = {
  type: 'category' | 'user';
};

function ResourceDetailsSkeleton({ type }: ResourceDetailsSkeletonProps) {
  if (type === 'category') {
    return (
      <StyledResourceDetails>
        <StyledResourceDetailsTop>
          <StyledAvatarSkeleton $size={100} />
          <h1 className="name skeleton">Category</h1>
          <div className="date-wrapper">
            <p className="date skeleton align-center">created</p>
            <span className="skeleton">29 August 2011</span>
          </div>
        </StyledResourceDetailsTop>
        <p className="description skeleton align-center">
          Some fancy category description, yay!
        </p>
        <StyledCategoryStats>
          <StyledStat>
            <LuLink />
            <p className="stat-title">Posts</p>
            <p className="count skeleton">99</p>
          </StyledStat>
          <StyledStat>
            <FaUsers />
            <p className="stat-title">Followers</p>
            <p className="count skeleton">99</p>
          </StyledStat>
        </StyledCategoryStats>
      </StyledResourceDetails>
    );
  }

  if (type === 'user') {
    return (
      <StyledResourceDetails>
        <StyledResourceDetailsTop>
          <StyledAvatarSkeleton $size={100} />
          <h1 className="name skeleton">Username</h1>
          <div className="date-wrapper">
            <p className="date skeleton align-center">member since</p>
            <span className='skeleton'>29 August 2011</span>
          </div>
        </StyledResourceDetailsTop>
        <p className="description skeleton align-center">
          Some fancy user bio, yay!
        </p>
        <StyledUserStats>
          <StyledStat>
            <TbUserStar />
            <p className="stat-title">Posts</p>
            <p className="count skeleton">99</p>
          </StyledStat>
          <StyledStat>
            <FaUsers />
            <p className="stat-title">Followers</p>
            <p className="count skeleton">99</p>
          </StyledStat>
          <StyledStat>
            <MdOutlineCategory />
            <p className="stat-title">Followed Categories</p>
            <p className="count skeleton">99</p>
          </StyledStat>
          <StyledStat>
            <LuLink />
            <p className="stat-title">Posts</p>
            <p className="count skeleton">99</p>
          </StyledStat>
          <StyledStat>
            <TbFileLike />
            <p className="stat-title">Post Likes</p>
            <p className="count skeleton">99</p>
          </StyledStat>
          <StyledStat>
            <TbFileDislike />
            <p className="stat-title">Post Dislikes</p>
            <p className="count skeleton">99</p>
          </StyledStat>
          <StyledStat>
            <FaRegCommentAlt />
            <p className="stat-title">Comments</p>
            <p className="count skeleton">99</p>
          </StyledStat>
          <StyledStat>
            <BiCommentAdd />
            <p className="stat-title">Comment Likes</p>
            <p className="count skeleton">99</p>
          </StyledStat>
          <StyledStat>
            <BiCommentMinus />
            <p className="stat-title">Comment Dislikes</p>
            <p className="count skeleton">99</p>
          </StyledStat>
        </StyledUserStats>
      </StyledResourceDetails>
    );
  }
}

export default ResourceDetailsSkeleton;
