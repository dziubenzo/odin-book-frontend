import PropTypes from 'prop-types';
import { StyledCategoryStats } from '../styles/PostsPage.styled';
import Stat from './Stat';
import { LuLink } from 'react-icons/lu';
import { FaUsers } from 'react-icons/fa';

function CategoryStats({ category }) {
  const { postsCount, followersCount } = category;

  return (
    <StyledCategoryStats>
      <Stat
        IconComponent={LuLink}
        description={'Posts'}
        count={postsCount}
      />
      <Stat
        IconComponent={FaUsers}
        description={'Followers'}
        count={followersCount}
      />
    </StyledCategoryStats>
  );
}

CategoryStats.propTypes = {
  category: PropTypes.object,
};

export default CategoryStats;
