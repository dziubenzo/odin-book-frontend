import styled from 'styled-components';

export const StyledFooter = styled.footer`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  width: 100%;
  column-gap: 16px;
  padding-bottom: 0.5em;
  padding-top: 0.5em;
  position: sticky;
  bottom: 0;
  background: inherit;

  *:focus-visible {
    border: none;
    outline: 2px solid ${(props) => props.theme.colours.secondary};
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    column-gap: 8px;
  }
`;

export const StyledFooterLeft = styled.div`
  display: flex;

  .link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    text-align: center;
    padding: 0.5em;
    cursor: pointer;
  }

  a {
    font-size: ${(props) => props.theme.fontSizes.medium};
    text-decoration: none;
  }

  svg {
    height: 26px;
    width: 26px;
  }

  @media (hover: hover) {
    .link {
      &:hover {
        border-radius: 24px;
        background-color: ${(props) => props.theme.colours.tertiary};
      }
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    a {
      font-size: ${(props) => props.theme.fontSizes.standard};
    }
  }
`;

export const StyledFooterCentre = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .dev-name {
    font-size: ${(props) => props.theme.fontSizes.medium};
    font-weight: 600;
  }

  svg {
    fill: ${(props) => props.theme.colours.gitHubLogo};
    height: 48px;
    width: 48px;
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    .dev-name {
      font-size: ${(props) => props.theme.fontSizes.standard};
    }
  }

  svg {
    height: 36px;
    width: 36px;
  }
`;

export const StyledFooterRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;

  .username {
    font-size: ${(props) => props.theme.fontSizes.medium};
    font-weight: 600;
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    .username {
      font-size: ${(props) => props.theme.fontSizes.standard};
    }
  }
`;
