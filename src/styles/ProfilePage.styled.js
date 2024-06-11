import styled from 'styled-components';

export const StyledProfilePage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 100%;
  width: 100%;
  padding: 2em 0;
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

      img {
        width: 50px;
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
  
  button {
    height: 50px;
    width: 150px;
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
  }
`;
