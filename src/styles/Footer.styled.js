import styled from 'styled-components';

export const StyledFooter = styled.footer`
  padding-bottom: 1em;

  *:focus-visible {
    border: none;
    outline: 2px solid ${(props) => props.theme.colours.secondary};
  }
`;

export const StyledFooterLeft = styled.div`
  display: flex;
  flex-direction: column;

  .link {
    display: flex;
    flex-direction: column;
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
`;
