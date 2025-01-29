import styled from 'styled-components';
import { MIN_POST_CONTENT_LENGTH } from '../constants';

type StyledTextEditorProps = {
  $contentLength: number;
};

export const StyledNewPostPage = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 100%;
  width: 100%;
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

export const StyledPostTitleInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

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

  @media (max-width: ${(props) => props.theme.mobile}) {
    input {
      font-size: ${(props) => props.theme.fontSizes.standard};
    }
  }
`;

export const StyledPostTypeSelector = styled.div`
  margin-top: 1em;
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
      background-color: ${(props) => props.theme.colours.secondary};
      color: ${(props) => props.theme.colours.background};
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
    width: 36ch;
    background-color: ${(props) => props.theme.colours.background};
    border: none;
    outline: 2px solid ${(props) => props.theme.colours.tertiary};
    border-radius: 4px;
    font-size: ${(props) => props.theme.fontSizes.standard};
    padding: 0.5em;
    cursor: pointer;
  }

  label {
    font-size: ${(props) => props.theme.fontSizes.medium};
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

    select {
      width: 100%;
    }

    label[for='followed-categories'] {
      margin-left: revert;
    }
  }
`;

export const StyledTextEditor = styled.div<StyledTextEditorProps>`
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
    line-height: 1.75;
    color: ${(props) =>
      props.$contentLength < MIN_POST_CONTENT_LENGTH
        ? props.theme.colours.lightRed
        : 'inherit'};

    b {
      color: inherit;
      font-weight: 600;
    }

    i {
      color: inherit;
      font-style: italic;
    }

    strike {
      color: inherit;
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

export const StyledImageEditor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin-top: 1em;

  .image-preview-wrapper {
    h2 {
      margin-bottom: 1em;
    }

    img {
      max-width: 100%;
      max-height: 600px;
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    gap: 32px;
  }
`;

export const StyledLinkInput = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  label {
    width: 160px;
    font-size: ${(props) => props.theme.fontSizes.medium};
    cursor: pointer;
  }

  input {
    background: transparent;
    border: none;
    outline: 2px solid ${(props) => props.theme.colours.primary};
    border-radius: 16px;
    padding: 0.75em;
    width: 100%;
    font-size: ${(props) => props.theme.fontSizes.standard};

    &.invalid-link {
      color: ${(props) => props.theme.colours.lightRed};
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    label {
      font-size: ${(props) => props.theme.fontSizes.standard};
      width: min-content;
    }
  }
`;

export const StyledImageUploader = styled.div`
  .image-uploader {
    .image-picker {
      outline: 2px solid ${(props) => props.theme.colours.primary};
      font-size: ${(props) => props.theme.fontSizes.standard};
      padding: 0.75em;
      border-radius: 16px;
      font-weight: 600;
      cursor: pointer;

      &:focus-visible {
        border: none;
        outline: 2px solid ${(props) => props.theme.colours.secondary};
      }
    }

    input {
      display: none;
    }
  }

  .clear-image-button-wrapper {
    display: flex;
    justify-content: flex-start;
    text-align: center;

    .clear-image-button {
      height: max-content;
      width: max-content;
      font-size: ${(props) => props.theme.fontSizes.standard};
      align-self: center;

      &:focus-visible {
        border: 2px solid ${(props) => props.theme.colours.secondary};
      }
    }
  }

  @media (hover: hover) {
    .image-uploader {
      .image-picker {
        transition:
          color,
          background-color 0.15s ease-in;

        &:hover {
          color: ${(props) => props.theme.colours.background};
          background-color: ${(props) => props.theme.colours.primary};
        }
      }
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    width: 100%;
  }
`;

export const StyledVideoEditor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin-top: 1em;

  .video-preview-wrapper {
    h2 {
      margin-bottom: 1em;
    }

    iframe {
      width: 80%;
      aspect-ratio: 16/9;
      border-radius: 16px;
      box-shadow: ${(props) => props.theme.colours.boxShadow};
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    .video-preview-wrapper {
      iframe {
        width: 100%;
      }
    }
  }
`;

export const StyledPublishPostSection = styled.div`
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

  @media (max-width: ${(props) => props.theme.mobile}) {
    .publish-post-button {
      width: max-content;
    }
  }
`;
