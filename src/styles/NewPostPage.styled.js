import styled from 'styled-components';
import { MIN_POST_CONTENT_LENGTH } from '../helpers';

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

    &.short-title {
      color: ${(props) => props.theme.colours.lightRed};
    }
  }

  .publish-post-wrapper {
    margin-top: 1em;
    display: flex;
    align-items: center;
    width: 100%;

    .error-message-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;

      p,
      svg {
        fill: ${(props) => props.theme.colours.lightRed};
        color: ${(props) => props.theme.colours.lightRed};
      }
    }

    .publish-post-button {
      margin-left: auto;
    }
  }
  
  @media (max-width: ${(props) => props.theme.mobile}) {
    .publish-post-wrapper {
      .publish-post-button {
        width: max-content;
      }
    }
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

  @media (max-width: ${(props) => props.theme.mobile}) {
    margin-left: 0.2em;
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

  @media (max-width: ${(props) => props.theme.mobile}) {
    flex-direction: column;
    align-items: revert;

    label[for='followed-categories'] {
      margin-left: revert;
    }
  }
`;

export const StyledEditor = styled.div`
  margin-top: 1em;

  .rsw-editor {
    border: none;
    outline: 2px solid ${(props) => props.theme.colours.primary};
  }

  .rsw-ce {
    min-height: 150px;
    border: none;
    outline: 2px solid ${(props) => props.theme.colours.primary};
    word-break: break-all;
    color: ${(props) =>
      props.$contentLength < MIN_POST_CONTENT_LENGTH
        ? props.theme.colours.lightRed
        : 'inherit'};

    b {
      font-weight: 600;
    }

    i {
      font-style: italic;
    }

    ul,
    ol {
      list-style-position: inside;
    }

    a {
      color: ${(props) => props.theme.colours.secondary};
      text-underline-offset: 0.3em;
    }

    pre {
      font-family: monospace;
    }
  }

  .rsw-toolbar {
    background-color: ${(props) => props.theme.colours.background};

    .rsw-btn {
      color: ${(props) => props.theme.colours.primary};
      fill: ${(props) => props.theme.colours.primary};
      stroke: ${(props) => props.theme.colours.primary};
      font-size: ${(props) => props.theme.fontSizes.medium};

      &:hover {
        background-color: ${(props) => props.theme.colours.primary};
        color: ${(props) => props.theme.colours.background};
        fill: ${(props) => props.theme.colours.background};
        stroke: ${(props) => props.theme.colours.background};

        & > span,
        & > s {
          color: inherit;
          fill: inherit;
          stroke: inherit;
        }
      }
    }

    .rsw-btn[data-active='true'] {
      background-color: ${(props) => props.theme.colours.primary};
      color: ${(props) => props.theme.colours.background};
      fill: ${(props) => props.theme.colours.background};
      stroke: ${(props) => props.theme.colours.background};

      & > span,
      & > s {
        color: inherit;
        fill: inherit;
        stroke: inherit;
      }
    }

    .rsw-separator {
      border: none;
      outline: 1px solid ${(props) => props.theme.colours.primary};
      margin: 0;
    }

    .rsw-dd {
      background-color: ${(props) => props.theme.colours.background};
      border: none;
      border-radius: 4px;
      font-size: ${(props) => props.theme.fontSizes.standard};
      padding: 0.5em;
      cursor: pointer;
    }
  }

  @media (hover: hover) {
    .rsw-toolbar {
      background-color: ${(props) => props.theme.colours.background};

      .rsw-btn:hover {
        background-color: ${(props) => props.theme.colours.primary};
        color: ${(props) => props.theme.colours.background};
        fill: ${(props) => props.theme.colours.background};
        stroke: ${(props) => props.theme.colours.background};

        & > span,
        & > s {
          color: inherit;
          fill: inherit;
          stroke: inherit;
        }
      }
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    .rsw-toolbar {
      justify-content: space-evenly;
      flex-wrap: wrap;

      .rsw-btn {
        font-size: ${(props) => props.theme.fontSizes.standard};
      }

      .rsw-separator {
        display: none;
      }
    }
  }
`;
