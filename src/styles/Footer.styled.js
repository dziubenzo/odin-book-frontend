import styled from 'styled-components';

export const StyledFooter = styled.footer`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  width: 100%;
  column-gap: 16px;
  padding-bottom: 1em;

  *:focus-visible {
    border: none;
    outline: 2px solid ${(props) => props.theme.colours.secondary};
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
    fill: white;
    height: 48px;
    width: 48px;
  }
`;

export const StyledFooterRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .avatar {
    border: 2px solid ${(props) => props.theme.colours.primary};
    padding: 1em;
    border-radius: 50%;
  }

  .username {
    font-size: ${(props) => props.theme.fontSizes.medium};
    font-weight: 600;
  }
`;
