import styled from 'styled-components';

export const StyledHeader = styled.header`
  width: 100%;
  padding-top: 1em;
  position: sticky;
  top: 0;
  background: inherit;

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
    padding-top: 0.5em;
    
    hr {
      margin: 0.5em 0;
    }
  }
`;

export const StyledHeaderTopBar = styled.div`
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
    cursor: pointer;
  }

  a {
    font-size: ${(props) => props.theme.fontSizes.medium};
    text-decoration: none;

    &.active {
      p {
        font-weight: 600;
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

export const StyledHeaderBottomBar = styled(StyledHeaderTopBar)`
  grid-template-columns: repeat(3, 1fr);
  padding-bottom: 0.5em;
`;
