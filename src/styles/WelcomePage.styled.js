import styled from 'styled-components';

export const StyledWelcomePage = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .welcome-page-wrapper {
    display: flex;
    flex-direction: column;
    gap: 48px;
    text-align: center;

    h1 {
      font-size: 4rem;
    }

    .app-name {
      color: ${(props) => props.theme.colours.secondary};
    }
  }

  .welcome-page-buttons {
    display: flex;
    justify-content: center;
    gap: 64px;
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    .welcome-page-buttons {
      gap: 32px;
    }
  }
`;

export const StyledButton = styled.button`
  width: 200px;
  padding: 0.75em;
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: 600;
  background-color: ${(props) => props.theme.colours.background};
  border: 2px solid ${(props) => props.theme.colours.primary};
  border-radius: 32px;
  cursor: pointer;

  @media (hover: hover) {
    transition:
      color,
      background-color 0.15s ease-in;

    &:hover {
      color: ${(props) => props.theme.colours.background};
      background-color: ${(props) => props.theme.colours.primary};
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    width: 125px;
    font-size: ${(props) => props.theme.fontSizes.medium};
  }
`;
