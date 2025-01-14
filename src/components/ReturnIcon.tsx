import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { StyledStickyIcon } from '../styles/App.styled';

function ReturnIcon() {
  const navigate = useNavigate();

  return (
    <StyledStickyIcon
      className="return-icon"
      aria-label="Back To Previous Page Icon"
      title={'Back To Previous Page'}
      onClick={() => navigate(-1)}
    >
      <IoChevronBack />
    </StyledStickyIcon>
  );
}

export default ReturnIcon;
