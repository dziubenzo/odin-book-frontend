import styled from 'styled-components';
import { lightTheme } from '../constants';

export const StyledNewCategoryPage = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 16px;

  .icon-wrapper {
    display: flex;
    width: 100%;
    gap: 32px;

    .default-icon-wrapper {
      display: flex;
      flex-direction: column;
      gap: 16px;
      text-align: center;

      img {
        align-self: center;
        width: 100px;
        box-shadow: ${(props) =>
          props.theme.colours.background === lightTheme.colours.background
            ? props.theme.colours.popoverBoxShadow
            : undefined};
        border-radius: ${(props) =>
          props.theme.colours.background === lightTheme.colours.background
            ? '50%'
            : undefined};
      }
    }

    .avatar-uploader-wrapper {
      align-self: center;
    }
  }

  .create-category-button {
    height: max-content;
    width: max-content;
    font-size: ${(props) => props.theme.fontSizes.standard};
    margin-top: 1em;
  }

  .error-message-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;

    p,
    svg {
      fill: ${(props) => props.theme.colours.red};
      color: ${(props) => props.theme.colours.red};
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    .icon-wrapper {
      width: 100%;
      gap: 16px;

      .default-icon-wrapper {
        width: max-content;

        .default-icon-heading {
          width: max-content;
          text-align: center;
        }
      }
    }

    .avatar-uploader-wrapper {
      width: 100%;

      .avatar-uploader {
        display: flex;
        justify-content: center;
        text-align: center;

        .avatar-picker {
          padding: 0.75em;
          width: 75%;
        }
      }
    }

    .create-category-button {
      width: 100%;
      font-size: ${(props) => props.theme.fontSizes.medium};
    }
  }
`;

export const StyledNewCategoryForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .top-header {
    color: ${(props) => props.theme.colours.secondary};
    margin-bottom: 0.5em;
  }

  input[id='name'],
  textarea[id='description'] {
    width: 100%;
    background: transparent;
    resize: vertical;
    border: none;
    outline: 2px solid ${(props) => props.theme.colours.primary};
    border-radius: 16px;
    padding: 0.75em;
    font-size: ${(props) => props.theme.fontSizes.medium};

    &.short-warning {
      color: ${(props) => props.theme.colours.red};
    }

    &::placeholder {
      color: ${(props) => props.theme.colours.secondary};
      opacity: 75%;
    }
  }

  & > label {
    font-size: ${(props) => props.theme.fontSizes.medium};
    cursor: pointer;
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    input[id='name'],
    textarea[id='description'] {
      font-size: ${(props) => props.theme.fontSizes.standard};
    }
  }
`;
