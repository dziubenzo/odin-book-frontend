import styled from 'styled-components';

export const StyledFooter = styled.footer`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  width: 100%;
  column-gap: 16px;
  position: sticky;
  bottom: 0;
  background: ${(props) => props.theme.colours.background};
  z-index: 1;

  @media (max-width: ${(props) => props.theme.mobile}) {
    column-gap: 4px;
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
    gap: 8px;

    a {
      font-size: ${(props) => props.theme.fontSizes.standard};

      p {
        display: none;
      }

      svg {
        height: 36px;
        width: 36px;
      }
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
  justify-content: center;
  align-items: center;
  gap: 16px;

  .user-info-footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;

    .username {
      font-size: ${(props) => props.theme.fontSizes.medium};
      font-weight: 600;
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    gap: 12px;

    .user-info-footer {
      .username {
        display: none;
      }
    }
  }
`;

export const StyledThemeSwitch = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  aspect-ratio: 1/1;
  cursor: pointer;
  border-radius: 50%;
  background: transparent;
  border: none;
  padding: 0.5em;

  svg {
    width: 100%;
    height: 100%;
  }

  @media (hover: hover) {
    transition: background-color 0.3s;

    &:hover {
      background-color: ${(props) => props.theme.colours.tertiary};
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    width: 40px;
    padding: 0;
  }
`;
