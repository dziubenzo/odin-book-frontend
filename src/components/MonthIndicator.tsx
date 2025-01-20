import { differenceInMonths, formatDate, isSameMonth } from 'date-fns';
import { StyledMonthIndicator } from '../styles/PostsPage.styled';

type MonthIndicatorProps = {
  date: Date;
};

function MonthIndicator({ date }: MonthIndicatorProps) {
  function renderMonth() {
    if (differenceInMonths(new Date(), date) === 1) {
      return 'Last Month';
    } else if (isSameMonth(new Date(), date)) {
      return 'This Month';
    } else {
      return `${formatDate(date, 'MMMM yyyy')}`;
    }
  }
  return (
    <StyledMonthIndicator className="month-indicator">
      {renderMonth()}
    </StyledMonthIndicator>
  );
}
export default MonthIndicator;
