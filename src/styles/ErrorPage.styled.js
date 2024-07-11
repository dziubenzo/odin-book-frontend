import styled from 'styled-components';

export const StyledErrorPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  text-align: center;
  height: 100%;

  &.whole-page {
    height: 100vh;
  }

  a {
    text-decoration: none;
    font-size: ${(props) => props.theme.fontSizes.standard};
  }

  @media (hover: hover) {
    a {
      height: 22px;
      width: 160px;

      &:hover {
        border-radius: 8px;
        background-color: ${(props) => props.theme.colours.tertiary};
      }
    }
  }
`;
