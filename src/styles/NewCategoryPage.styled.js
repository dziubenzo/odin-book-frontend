import styled from 'styled-components';

export const StyledNewCategoryPage = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 2em 0;
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

    &:focus-visible {
      outline: 2px solid ${(props) => props.theme.colours.secondary};
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
        width: 75px;
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
    outline: none;
    margin-top: 1em;

    &:focus-visible {
      border: 2px solid ${(props) => props.theme.colours.secondary};
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
    }

    .create-category-button {
      width: 100%;
      font-size: ${(props) => props.theme.fontSizes.medium};
    }
  }
`;
