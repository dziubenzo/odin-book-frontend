import PropTypes from 'prop-types';
import type { IconType } from 'react-icons';
import { StyledStat } from '../styles/PostsPage.styled';

type StatProps = {
  IconComponent: IconType;
  description: string;
  count: number;
};

function Stat({ IconComponent, description, count }: StatProps) {
  return (
    <StyledStat>
      <IconComponent title={`${description} Icon`} />
      <p className="stat-title">{description}</p>
      <p className="count">{count}</p>
    </StyledStat>
  );
}

Stat.propTypes = {
  IconComponent: PropTypes.elementType,
  description: PropTypes.string,
  count: PropTypes.number,
};

export default Stat;
