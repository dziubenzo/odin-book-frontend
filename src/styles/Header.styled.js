import styled from 'styled-components';

export const StyledHeader = styled.header`
  padding-top: 1em;

  * {
    color: ${(props) => props.theme.colours.secondary};
  }

  *:focus-visible {
    border: none;
    outline: 2px solid ${(props) => props.theme.colours.secondary};
  }

  hr {
    margin: 0.75em 0;
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    hr {
      margin: 0.5em 0;
    }
  }
`;

export const StyledTopHeaderBar = styled.div`
  display: flex;
  gap: 32px;

  a {
    font-size: ${(props) => props.theme.fontSizes.medium};
    text-decoration-color: ${(props) => props.theme.colours.primary};
    text-underline-offset: 0.2em;

    &.active {
      font-weight: 600;
    }
  }

  svg {
    height: 26px;
    width: 26px;
  }

  .link {
    display: flex;
    align-items: center;
    gap: 8px;
    text-align: center;
    padding: 0.5em;
    cursor: pointer;
  }

  @media (hover: hover) {
    .link {
      &:hover {
        border-radius: 32px;
        background-color: ${(props) => props.theme.colours.tertiary};
      }
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    gap: 8px;

    a {
      font-size: ${(props) => props.theme.fontSizes.small};
    }

    svg {
      height: 22px;
      width: 22px;
    }

    .link {
      flex-direction: column;
      padding: 0;
    }
  }
`;

export const StyledBottomHeaderBar = styled(StyledTopHeaderBar)`
  justify-content: space-around;
`;
