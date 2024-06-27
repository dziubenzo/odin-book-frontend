import styled from 'styled-components';

export const StyledNewPostPage = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: start;
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

  label {
    font-size: ${(props) => props.theme.fontSizes.medium};
    cursor: pointer;
  }

  input {
    background: transparent;
    border: none;
    outline: 2px solid ${(props) => props.theme.colours.primary};
    border-radius: 16px;
    padding: 0.75em;
    font-size: ${(props) => props.theme.fontSizes.medium};
  }
`;

export const StyledPostTypeSelector = styled.div`
  display: flex;

  button {
    height: max-content;
    width: max-content;
    padding: 0.5em;
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

export const StyledCategoryPicker = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  select {
    background-color: ${(props) => props.theme.colours.background};
    border: none;
    outline: 2px solid ${(props) => props.theme.colours.tertiary};
    border-radius: 4px;
    font-size: ${(props) => props.theme.fontSizes.standard};
    padding: 0.5em;
    cursor: pointer;
  }

  label[for='followed-categories'] {
    margin-left: auto;
  }

  input[type='checkbox'] {
    width: 24px;
    height: 24px;
    accent-color: ${(props) => props.theme.colours.primary};
    outline: none;
    cursor: pointer;

    &:focus-visible {
      border: none;
      outline: 2px solid ${(props) => props.theme.colours.secondary};
    }
  }
`;
