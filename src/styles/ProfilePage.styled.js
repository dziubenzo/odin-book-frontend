import styled from 'styled-components';

export const StyledProfilePage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 100%;
  width: 100%;
  padding: 4em 0.5em 2em 0.5em;
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

    .username {
      a {
        font-weight: 700;
      }
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

    .top-line {
      a {
        text-decoration: revert;
        text-underline-offset: 0.2em;
        text-decoration-color: ${(props) => props.theme.colours.primary};
      }
    }
  }
`;

export const StyledDefaultAvatars = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .default-avatars-images {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: space-evenly;

    img {
      width: 100px;
      aspect-ratio: 1/1;
      cursor: pointer;
      border-radius: 50%;

      &.selected {
        outline: 5px double ${(props) => props.theme.colours.secondary};
        outline-offset: -1px;
        box-shadow: ${(props) => props.theme.colours.boxShadow};
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
    width: 100%;
    gap: 32px;

    .avatar-preview-left-side {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 16px;

      .avatar-preview-heading {
        text-align: center;
        width: max-content;
      }

      img {
        width: 100px;
        aspect-ratio: 1/1;
        border-radius: 50%;
        align-self: center;
      }
    }

    .clear-avatar-button-wrapper {
      display: flex;
      justify-content: center;
      text-align: center;

      .clear-avatar-button {
        height: max-content;
        font-size: ${(props) => props.theme.fontSizes.standard};
        align-self: center;

        &:focus-visible {
          border: 2px solid ${(props) => props.theme.colours.secondary};
        }
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
    width: 100%;

    .avatar-preview {
      display: grid;
      grid-template-columns: max-content 1fr;
      gap: 16px;

      .clear-avatar-button {
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
    margin-top: 1em;

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

  @media (max-width: ${(props) => props.theme.mobile}) {
    .update-profile-wrapper {
      .update-profile-button {
        font-size: ${(props) => props.theme.fontSizes.medium};
        width: 100%;
      }
    }

    textarea {
      font-size: ${(props) => props.theme.fontSizes.standard};
    }
  }
`;

export const StyledThemeSwitch = styled.div`
  display: flex;
  height: 64px;
  width: 64px;
  cursor: pointer;
  position: sticky;
  bottom: 110px;
  margin-left: auto;

  svg {
    height: 64px;
    width: 64px;
    fill: ${(props) => props.theme.colours.primary};
  }

  @media (hover: hover) {
    svg:hover {
      fill: ${(props) => props.theme.colours.secondary};
    }
  }
`;
