import styled from 'styled-components';

export const StyledProfilePage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 100%;
  width: 100%;
  gap: 64px;

  @media (max-width: ${(props) => props.theme.mobile}) {
    gap: 48px;

    .theme-switch {
      width: 60px;
    }
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

    .user-link {
      font-size: ${(props) => props.theme.fontSizes.extraLarge};
      font-weight: 700;
    }
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colours.secondary};
  }

  span {
    font-weight: 700;
    color: ${(props) => props.theme.colours.secondary};
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
      flex-direction: column;
      text-align: center;

      .user-link {
        text-decoration: revert;
        text-underline-offset: 0.2em;
        text-decoration-color: ${(props) => props.theme.colours.primary};
        word-break: break-all;
        font-size: ${(props) => props.theme.fontSizes.large};
      }
    }

    h2 {
      margin-top: 0.5em;
      text-align: center;
    }
  }
`;

export const StyledDefaultAvatars = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  h2 {
    color: ${(props) => props.theme.colours.secondary};
  }

  .default-avatars-images {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    justify-items: start;

    img {
      width: 100px;
      aspect-ratio: 1/1;
      cursor: pointer;
      border-radius: 50%;

      &.selected,
      &.current {
        outline-offset: -1px;
        box-shadow: ${(props) => props.theme.colours.boxShadow};
        border-radius: 50%;
      }

      &.selected {
        outline: 5px double ${(props) => props.theme.colours.secondary};
      }

      &.current {
        outline: 3px solid ${(props) => props.theme.colours.primary};
      }
    }
  }

  @media (min-width: ${(props) => props.theme.tabletMin}) and (max-width: ${(
      props,
    ) => props.theme.tabletMax}) {
    .default-avatars-images {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      justify-content: space-evenly;
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    .default-avatars-images {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      justify-content: space-evenly;
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
    color: ${(props) => props.theme.colours.secondary};
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
    }
  }

  @media (hover: hover) {
    .update-profile-wrapper {
      .update-profile-button {
        transition: none;

        &:hover {
          transition:
            color,
            background-color 0.15s ease-in;
        }
      }
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    .update-profile-wrapper {
      flex-direction: column;

      .update-profile-button {
        font-size: ${(props) => props.theme.fontSizes.medium};
        width: 100%;
      }
    }

    textarea {
      height: 230px;
      font-size: ${(props) => props.theme.fontSizes.standard};
    }
  }
`;
