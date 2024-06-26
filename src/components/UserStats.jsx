import PropTypes from 'prop-types';
import { StyledUserStats } from '../styles/UserPage.styled';
import { TbUserStar, TbFileLike, TbFileDislike } from 'react-icons/tb';
import { FaUsers, FaRegCommentAlt } from 'react-icons/fa';
import { MdOutlineCategory } from 'react-icons/md';
import { LuLink } from 'react-icons/lu';
import { BiCommentAdd, BiCommentMinus } from 'react-icons/bi';

function UserStats({ user }) {
  const {
    followed_users,
    followed_categories,
    postsCount,
    postLikesCount,
    postDislikesCount,
    commentsCount,
    commentLikesCount,
    commentDislikesCount,
    followersCount,
  } = user;

  return (
    <StyledUserStats>
      <h1 className="user-stats-heading">User Stats</h1>
      <div className="user-stats-wrapper">
        <div>
          <TbUserStar />
          <p className="stat-title">Following</p>
          <p className="count">{followed_users.length}</p>
        </div>
        <div>
          <FaUsers />
          <p className="stat-title">Followers</p>
          <p className="count">{followersCount}</p>
        </div>
        <div>
          <MdOutlineCategory />
          <p className="stat-title">Followed Categories</p>
          <p className="count">{followed_categories.length}</p>
        </div>
        <div>
          <LuLink />
          <p className="stat-title">Posts</p>
          <p className="count">{postsCount}</p>
        </div>
        <div>
          <TbFileLike />
          <p className="stat-title">Post Likes</p>
          <p className="count">{postLikesCount}</p>
        </div>
        <div>
          <TbFileDislike />
          <p className="stat-title">Post Dislikes</p>
          <p className="count">{postDislikesCount}</p>
        </div>
        <div>
          <FaRegCommentAlt />
          <p className="stat-title">Comments</p>
          <p className="count">{commentsCount}</p>
        </div>
        <div>
          <BiCommentAdd />
          <p className="stat-title">Comment Likes</p>
          <p className="count">{commentLikesCount}</p>
        </div>
        <div>
          <BiCommentMinus />
          <p className="stat-title">Comment Dislikes</p>
          <p className="count">{commentDislikesCount}</p>
        </div>
      </div>
    </StyledUserStats>
  );
}

UserStats.propTypes = {
  user: PropTypes.object,
};

export default UserStats;
