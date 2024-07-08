import { GiFinishLine } from 'react-icons/gi';
import { StyledEndInfiniteScroll } from '../styles/PostsPage.styled';

function EndInfiniteScroll() {
  return (
    <StyledEndInfiniteScroll>
      <GiFinishLine />
      <p>You&apos;ve seen it all!</p>
    </StyledEndInfiniteScroll>
  );
}

export default EndInfiniteScroll;
