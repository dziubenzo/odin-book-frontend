import PropTypes from 'prop-types';

function UserStat({ IconComponent, description, count }) {
  return (
    <div>
      <IconComponent title={`${description} Icon`} />
      <p className="stat-title">{description}</p>
      <p className="count">{count}</p>
    </div>
  );
}

UserStat.propTypes = {
  IconComponent: PropTypes.elementType,
  description: PropTypes.string,
  count: PropTypes.number,
};

export default UserStat;
