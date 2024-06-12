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
`;

export const StyledUserInfo = styled.div`
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

  @media (hover: hover) {
    .previous-page-link {
      padding: 0.2em 0.4em;

      &:hover {
        border-radius: 8px;
        background-color: ${(props) => props.theme.colours.tertiary};
      }
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    .previous-page-link {
      top: -2em;
      text-decoration: revert;
      text-underline-offset: 0.3em;
    }
  }
`;

export const StyledDefaultAvatars = styled.div`
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
`;

export const StyledAvatarUploader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .avatar-picker {
    outline: 2px solid ${(props) => props.theme.colours.primary};
    padding: 1em;
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
        align-self: center;
      }
    }

    .clear-avatar-button {
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

export const StyledBioInput = styled.div`
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

  .update-profile-wrapper {
    display: flex;
    gap: 16px;
    align-items: center;

    .update-profile-button {
      height: max-content;
      width: max-content;
      font-size: ${(props) => props.theme.fontSizes.standard};
      outline: none;

      &:focus-visible {
        border: 2px solid ${(props) => props.theme.colours.secondary};
      }
    }
  }
`;
