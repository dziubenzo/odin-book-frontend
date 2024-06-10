import styled from 'styled-components';
import { StyledPostInfo } from './AllPostsPage.styled';
import { StyledButton } from './WelcomePage.styled';

export const StyledPostDetailsPage = styled.main`
  display: grid;
  align-content: start;
  height: 100%;
  width: 100%;
  padding: 4em 0;

  hr {
    margin: 1.5em 0;
    width: 100%;
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    padding: 1em 0;
  }
`;

export const StyledPostDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .return-icon-wrapper {
    display: flex;
    justify-content: center;
    width: 50px;
    align-self: center;

    svg {
      height: 32px;
      width: 32px;
    }
  }

  .post-body {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .post-top-bar {
      display: flex;
      align-items: center;

      .post-title {
        font-size: ${(props) => props.theme.fontSizes.extraLarge};
        color: ${(props) => props.theme.colours.secondary};
        margin-right: auto;
        font-weight: 700;
      }
    }

    .post-content {
      line-height: 1.75;
    }
  }

  @media (hover: hover) {
    .return-icon-wrapper {
      padding: 0.5em 0.6em;
      cursor: pointer;

      &:hover {
        background-color: ${(props) => props.theme.colours.tertiary};
        border-radius: 50%;
      }
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    .post-body {
      width: 100%;
    }
  }
`;

export const StyledPostInfoPostDetails = styled(StyledPostInfo)`
  a {
    text-decoration: none;
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    font-size: ${(props) => props.theme.fontSizes.standard};
    width: 100%;
    justify-content: space-between;
  }
`;

export const StyledComments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h3 {
    margin-bottom: 0.5em;
  }
`;

export const StyledComment = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  a {
    text-decoration: none;
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    gap: 12px;
  }
`;

export const StyledCommentAvatar = styled.div`
  .avatar-placeholder {
    height: 36px;
    width: 36px;
    border: 2px solid ${(props) => props.theme.colours.primary};
    border-radius: 50%;
  }
`;

export const StyledCommentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  .top-bar {
    display: flex;
    align-items: center;
    gap: 4px;

    .user-link {
      color: ${(props) => props.theme.colours.secondary};
    }

    .date {
      color: ${(props) => props.theme.colours.primaryDarker};
      font-size: ${(props) => props.theme.fontSizes.small};
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    .user-link {
      text-decoration: revert;
      text-underline-offset: 0.2em;
      color: ${(props) => props.theme.colours.secondary};
    }
  }
`;

export const StyledCommentLikes = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;

  .like-icon,
  .dislike-icon {
    height: 18px;
    width: 18px;

    &.liked,
    &.disliked {
      fill: ${(props) => props.theme.colours.secondary};
    }
  }

  .likes-count {
    font-size: ${(props) => props.theme.fontSizes.large};
    width: 3ch;
    text-align: center;
  }

  @media (hover: hover) {
    .like-icon-wrapper,
    .dislike-icon-wrapper {
      padding: 0.2em 0.4em;
      border-radius: 50%;
      cursor: pointer;

      &:hover {
        background-color: ${(props) => props.theme.colours.tertiary};
      }
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    flex-direction: column;
    gap: revert;
  }
`;

export const StyledCommentInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  .top-section {
    display: flex;
    gap: 16px;
    align-items: center;

    .avatar-placeholder {
      height: 36px;
      width: 36px;
      border: 2px solid ${(props) => props.theme.colours.primary};
      border-radius: 50%;
    }

    .comment-input-field {
      width: 100%;
      height: auto;
      outline: 1px solid ${(props) => props.theme.colours.primary};
      border-radius: 8px;
      padding: 0.5em;
      word-break: break-all;

      &:focus-visible {
        outline: 2px solid ${(props) => props.theme.colours.primary};
        border: none;
      }
    }

    .comment-length {
      width: 4ch;
      text-align: center;

      &.warning {
        color: ${(props) => props.theme.colours.lightRed};
      }
    }
  }
`;

export const StyledSubmitButton = styled(StyledButton)`
  height: 40px;
  width: 100px;
  padding: 0.25em;
  font-size: ${(props) => props.theme.fontSizes.standard};
  background: transparent;
`;
