import styled from 'styled-components';

export const StyledSuccessPage = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  svg {
    height: 96px;
    width: 96px;
  }

  p {
    font-size: ${(props) => props.theme.fontSizes.large};
    text-align: center;
  }
`;
