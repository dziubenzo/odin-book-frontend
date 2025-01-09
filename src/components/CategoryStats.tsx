import { FaUsers } from 'react-icons/fa';
import { LuLink } from 'react-icons/lu';
import { StyledCategoryStats } from '../styles/PostsPage.styled';
import type { DetailedCategory } from '../types';
import Stat from './Stat';

type CategoryStatsProps = {
  category: DetailedCategory;
};

function CategoryStats({ category }: CategoryStatsProps) {
  const { postsCount, followersCount } = category;

  return (
    <StyledCategoryStats>
      <Stat IconComponent={LuLink} description={'Posts'} count={postsCount} />
      <Stat
        IconComponent={FaUsers}
        description={'Followers'}
        count={followersCount}
      />
    </StyledCategoryStats>
  );
}

export default CategoryStats;
