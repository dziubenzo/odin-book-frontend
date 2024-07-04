import styled from 'styled-components';

export const StyledError = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  text-align: center;
  align-self: center;
  justify-self: center;

  h1 {
    color: ${(props) => props.theme.colours.primary};
  }

  svg {
    height: 64px;
    width: 64px;
  }

  p {
    margin-top: 2em;
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    h1 {
      font-size: ${(props) => props.theme.fontSizes.large};
    }
  }
`;

export const StyledLoading = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 48px;
  align-items: center;
  justify-content: center;
  text-align: center;
  align-self: center;
  justify-self: center;

  @media (max-width: ${(props) => props.theme.mobile}) {
    h1 {
      font-size: ${(props) => props.theme.fontSizes.large};
    }
  }
`;

export const StyledAvatar = styled.div`
  display: flex;

  img {
    height: ${(props) => props.$size || 50}px;
  }
`;
