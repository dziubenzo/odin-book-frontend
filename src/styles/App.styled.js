import styled from 'styled-components';

export const StyledHeader = styled.header``;

export const StyledFooter = styled.footer``;

export const StyledError = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  text-align: center;

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
  flex-direction: column;
  gap: 48px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
