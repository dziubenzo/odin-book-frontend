import PropTypes from 'prop-types';
import { StyledUserStats } from '../styles/UserPage.styled';
import { TbUserStar, TbFileLike, TbFileDislike } from 'react-icons/tb';
import { FaUsers, FaRegCommentAlt } from 'react-icons/fa';
import { MdOutlineCategory } from 'react-icons/md';
import { LuLink } from 'react-icons/lu';
import { BiCommentAdd, BiCommentMinus } from 'react-icons/bi';
import UserStat from './UserStat';

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
        <UserStat
          IconComponent={TbUserStar}
          description={'Following'}
          count={followed_users.length}
        />
        <UserStat
          IconComponent={FaUsers}
          description={'Followers'}
          count={followersCount}
        />
        <UserStat
          IconComponent={MdOutlineCategory}
          description={'Followed Categories'}
          count={followed_categories.length}
        />
        <UserStat
          IconComponent={LuLink}
          description={'Posts'}
          count={postsCount}
        />
        <UserStat
          IconComponent={TbFileLike}
          description={'Post Likes'}
          count={postLikesCount}
        />
        <UserStat
          IconComponent={TbFileDislike}
          description={'Post Dislikes'}
          count={postDislikesCount}
        />
        <UserStat
          IconComponent={FaRegCommentAlt}
          description={'Comments'}
          count={commentsCount}
        />
        <UserStat
          IconComponent={BiCommentAdd}
          description={'Comment Likes'}
          count={commentLikesCount}
        />
        <UserStat
          IconComponent={BiCommentMinus}
          description={'Comment Dislikes'}
          count={commentDislikesCount}
        />
      </div>
    </StyledUserStats>
  );
}

UserStats.propTypes = {
  user: PropTypes.object,
};

export default UserStats;
