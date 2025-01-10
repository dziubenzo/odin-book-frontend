import { BiCommentAdd, BiCommentMinus } from 'react-icons/bi';
import { FaRegCommentAlt, FaUsers } from 'react-icons/fa';
import { LuLink } from 'react-icons/lu';
import { MdOutlineCategory } from 'react-icons/md';
import { TbFileDislike, TbFileLike, TbUserStar } from 'react-icons/tb';
import { StyledUserStats } from '../styles/PostsPage.styled';
import type { DetailedUser } from '../types';
import Stat from './Stat';

type UserStats = {
  renderedUser: DetailedUser;
};

function UserStats({ renderedUser }: UserStats) {
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
  } = renderedUser;

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

export default UserStats;
