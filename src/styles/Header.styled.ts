import styled from 'styled-components';

export const StyledHeader = styled.header`
  width: 100%;
  position: sticky;
  top: 0;
  background: inherit;
  z-index: 1;

  &.smaller {
    hr {
      margin: 0.1em 0;
    }

    nav {
      gap: 0px;
    }

    p {
      display: none;
    }
  }

  * {
    color: ${(props) => props.theme.colours.secondary};
  }

  *:focus-visible {
    border: none;
    outline: 2px solid ${(props) => props.theme.colours.secondary};
  }

  hr {
    margin: 0.5em 0;
    transition: 0.15s ease-in;
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    hr {
      margin: 0.5em 0;
    }

    nav {
      gap: 0px;
    }

    p {
      display: none;
    }

    &.smaller {
      hr {
        margin: 0.5em 0;
      }
    }
  }
`;

export const StyledHeaderTopBar = styled.nav`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  gap: 32px;

  .link {
    display: flex;
    align-items: center;
    gap: 8px;
    text-align: center;
    padding: 0.5em;
    font-size: ${(props) => props.theme.fontSizes.medium};
    text-decoration: none;
    cursor: pointer;

    &.active {
      p {
        text-decoration: underline;
        text-underline-offset: 8px;
      }
    }
  }

  svg {
    height: 26px;
    width: 26px;
  }

  @media (hover: hover) {
    .link {
      &:hover {
        border-radius: 32px;
        background-color: ${(props) => props.theme.colours.tertiary};
      }
    }
  }

  @media (min-width: ${(props) => props.theme.tabletMin}) and (max-width: ${(
      props,
    ) => props.theme.tabletMax}) {
    gap: 16px;
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    gap: 8px;

    .link {
      font-size: ${(props) => props.theme.fontSizes.small};
      padding: 0.25em;
      border-radius: 50%;
      transition:
        background-color 0.3s ease-in-out,
        transform 0.3s ease-in-out;

      &.active {
        background-color: ${(props) => props.theme.colours.tertiary};
        transform: scale(1.1);
      }
    }
  }
`;

export const StyledHeaderBottomBar = styled(StyledHeaderTopBar)`
  grid-template-columns: repeat(3, 1fr);
`;
