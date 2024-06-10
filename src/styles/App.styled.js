import styled from 'styled-components';

export const StyledError = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  text-align: center;

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
`;

export const StyledLoading = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 48px;
  align-items: center;
  justify-content: center;
  text-align: center;

  h1 {
    color: ${(props) => props.theme.colours.primary};
  }
`;
