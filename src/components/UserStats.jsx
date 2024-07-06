import PropTypes from 'prop-types';
import { StyledUserStats } from '../styles/PostsPage.styled';
import { TbUserStar, TbFileLike, TbFileDislike } from 'react-icons/tb';
import { FaUsers, FaRegCommentAlt } from 'react-icons/fa';
import { MdOutlineCategory } from 'react-icons/md';
import { LuLink } from 'react-icons/lu';
import { BiCommentAdd, BiCommentMinus } from 'react-icons/bi';
import Stat from './Stat';

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
      <Stat
        IconComponent={TbUserStar}
        description={'Following'}
        count={followed_users.length}
      />
      <Stat
        IconComponent={FaUsers}
        description={'Followers'}
        count={followersCount}
      />
      <Stat
        IconComponent={MdOutlineCategory}
        description={'Followed Categories'}
        count={followed_categories.length}
      />
      <Stat IconComponent={LuLink} description={'Posts'} count={postsCount} />
      <Stat
        IconComponent={TbFileLike}
        description={'Post Likes'}
        count={postLikesCount}
      />
      <Stat
        IconComponent={TbFileDislike}
        description={'Post Dislikes'}
        count={postDislikesCount}
      />
      <Stat
        IconComponent={FaRegCommentAlt}
        description={'Comments'}
        count={commentsCount}
      />
      <Stat
        IconComponent={BiCommentAdd}
        description={'Comment Likes'}
        count={commentLikesCount}
      />
      <Stat
        IconComponent={BiCommentMinus}
        description={'Comment Dislikes'}
        count={commentDislikesCount}
      />
    </StyledUserStats>
  );
}

UserStats.propTypes = {
  user: PropTypes.object,
};

export default UserStats;
