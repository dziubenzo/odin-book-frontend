import styled from 'styled-components';

export const StyledNewPostPage = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 2em 0.1em;
  gap: 16px;

  *:focus-visible {
    border: none;
    outline: 2px solid ${(props) => props.theme.colours.secondary};
  }

  .top-header {
    color: ${(props) => props.theme.colours.secondary};
    margin-bottom: 0.5em;
  }
`;

export const StyledPostTypeSelector = styled.div`
  display: flex;

  button {
    height: max-content;
    width: max-content;
    padding: 1em;
    background-color: ${(props) => props.theme.colours.primary};
    color: ${(props) => props.theme.colours.background};
    font-size: ${(props) => props.theme.fontSizes.standard};
    outline: none;
    border: none;
    cursor: pointer;

    &.left {
      border-radius: 16px 0 0 16px;
    }

    &.right {
      border-radius: 0 16px 16px 0;
    }

    &.selected {
      background-color: ${(props) => props.theme.colours.background};
      color: ${(props) => props.theme.colours.primary};
      transform: scale(1.2);
    }
  }
`;
