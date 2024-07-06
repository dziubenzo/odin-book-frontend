import PropTypes from 'prop-types';
import { StyledStat } from '../styles/PostsPage.styled';

function Stat({ IconComponent, description, count }) {
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
