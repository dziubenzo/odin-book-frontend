import PropTypes from 'prop-types';
import { StyledCategoryStats } from '../styles/PostsPage.styled';
import Stat from './Stat';
import { LuLink } from 'react-icons/lu';
import { FaUsers } from 'react-icons/fa';

function CategoryStats({ category }) {
  const { categoryPosts, categoryFollowers } = category;

  return (
    <StyledCategoryStats>
      <Stat
        IconComponent={LuLink}
        description={'Posts'}
        count={categoryPosts}
      />
      <Stat
        IconComponent={FaUsers}
        description={'Followers'}
        count={categoryFollowers}
      />
    </StyledCategoryStats>
  );
}

CategoryStats.propTypes = {
  category: PropTypes.object,
};

export default CategoryStats;
