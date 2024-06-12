import styled from 'styled-components';

export const StyledProfilePage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 100%;
  width: 100%;
  padding: 4em 0.5em;
  gap: 64px;

  *:focus-visible {
    border: none;
    outline: 2px solid ${(props) => props.theme.colours.secondary};
  }

  .user-info {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;

    .top-line {
      display: flex;
      align-items: center;
      gap: 24px;

      .user-avatar {
        width: 100px;
      }
    }

    a {
      text-decoration: none;
      color: ${(props) => props.theme.colours.secondary};
    }

    span {
      font-weight: 700;
    }

    .previous-page-link {
      position: absolute;
      top: 1em;
      right: 0;
      text-align: center;
    }
  }

  .bio {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;

    label {
      font-size: ${(props) => props.theme.fontSizes.large};
      cursor: pointer;
    }

    textarea {
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
  }

  .default-avatars {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .default-avatars-images {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      justify-content: space-evenly;

      img {
        width: 75px;
        aspect-ratio: 1/1;
        cursor: pointer;
        outline: 2px solid ${(props) => props.theme.colours.secondary};
        border-radius: 50%;

        &.selected {
          outline: 3px solid ${(props) => props.theme.colours.primary};
          border-radius: 50%;
        }
      }
    }
  }

  .avatar-uploader {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .avatar-picker {
      outline: 2px solid ${(props) => props.theme.colours.primary};
      padding: 1em;
      border-radius: 16px;
      cursor: pointer;
      font-weight: 600;

      &:focus-visible {
        border: none;
        outline: 2px solid ${(props) => props.theme.colours.secondary};
      }
    }

    input {
      display: none;
    }
  }

  .avatar-preview {
    display: flex;
    justify-content: center;
    width: max-content;
    gap: 32px;

    .avatar-preview-left-side {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 16px;

      img {
        width: 75px;
        aspect-ratio: 1/1;
        border-radius: 50%;
        outline: 3px solid ${(props) => props.theme.colours.primary};
        align-self: center;
      }
    }

    .clear-avatar-button {
      align-self: center;
    }
  }

  .clear-avatar-button,
  .update-profile-button {
    height: max-content;
    width: max-content;
    font-size: ${(props) => props.theme.fontSizes.standard};
  }

  @media (hover: hover) {
    .user-info {
      .previous-page-link {
        padding: 0.2em 0.4em;

        &:hover {
          border-radius: 8px;
          background-color: ${(props) => props.theme.colours.tertiary};
        }
      }
    }

    .avatar-uploader {
      .avatar-picker {
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
    .user-info {
      .previous-page-link {
        top: -2em;
        text-decoration: revert;
        text-underline-offset: 0.3em;
      }
    }

    .avatar-preview {
      width: 100%;
      display: grid;
      grid-template-columns: max-content 1fr;
      gap: 16px;

      .clear-avatar-button {
        width: 150px;
        justify-self: center;
      }
    }
  }
`;
