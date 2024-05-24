import styled from 'styled-components';

export const StyledHeader = styled.header`
  * {
    color: ${(props) => props.theme.colours.secondary};
  }
`;

export const StyledTopHeaderBar = styled.div`
  display: flex;
  gap: 32px;

  a {
    font-size: ${props => props.theme.fontSizes.medium};
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
  }
`;
