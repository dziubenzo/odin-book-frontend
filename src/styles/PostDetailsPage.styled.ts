import styled from 'styled-components';
import { lightTheme, MIN_COMMENT_LENGTH } from '../constants';
import { StyledPostInfo } from './PostsPage.styled';
import { StyledButton } from './WelcomePage.styled';

type StyledCommentInputTopProps = {
  $contentLength: number;
};

export const StyledPostDetailsPage = styled.main`
  display: flex;
  flex-direction: column;
  align-content: start;
  height: 100%;
  width: 100%;

  hr {
    margin: 1.5em 0;
    width: 100%;
  }
`;

export const StyledPostDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

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
        word-break: break-all;
      }
    }

    .post-content {
      line-height: 1.75;

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

      .post-image {
        max-width: 100%;
        max-height: 800px;
        border-radius: 16px;
      }

      .yt-video-player {
        width: 100%;
        aspect-ratio: 16/9;
        border-radius: 16px;
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
  font-size: ${(props) => props.theme.fontSizes.standard};

  a {
    text-decoration: none;
  }

  .post-author {
    gap: 8px;
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    width: 100%;

    .post-author {
      min-width: 60px !important;
    }
  }
`;

export const StyledComments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  hr {
    margin: 0;
    opacity: 0.2;
  }

  h2 {
    color: ${(props) => props.theme.colours.secondary};
    margin-bottom: 0.5em;
  }
`;

export const StyledComment = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  white-space: pre-wrap;

  a {
    text-decoration: none;
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
    height: 38px;
    width: 38px;
    background: transparent;
    border: none;

    svg {
      width: 100%;
      height: 100%;
      fill: ${(props) =>
        props.theme.colours.primary === lightTheme.colours.primary
          ? props.theme.colours.primaryLighter
          : undefined};

      &.liked,
      &.disliked {
        fill: ${(props) => props.theme.colours.secondary};
      }
    }
  }

  .likes-count {
    font-size: ${(props) => props.theme.fontSizes.large};
    width: 3ch;
    text-align: center;
  }

  @media (hover: hover) {
    .like-icon,
    .dislike-icon {
      transition: background-color 0.3s;
      padding: 0.5em;
      border-radius: 50%;
      cursor: pointer;

      &:hover {
        background-color: ${(props) => props.theme.colours.tertiary};
      }
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    flex-direction: column;
    gap: 6px;

    .like-icon,
    .dislike-icon {
      height: 24px;
      width: 24px;
    }
  }
`;

export const StyledCommentInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  h2 {
    color: ${(props) => props.theme.colours.secondary};
  }

  hr {
    margin-top: 0.25em;
  }
`;

export const StyledSubmitButton = styled(StyledButton)`
  height: 40px;
  width: 125px;
  padding: 0.25em;
  font-size: ${(props) => props.theme.fontSizes.standard};
  background: transparent;
`;

export const StyledCommentInputTop = styled.div<StyledCommentInputTopProps>`
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
    border: none;
    outline: 1px solid ${(props) => props.theme.colours.primary};
    border-radius: 8px;
    padding: 0.5em;
    word-break: break-all;
    color: ${(props) =>
      props.$contentLength < MIN_COMMENT_LENGTH
        ? props.theme.colours.red
        : 'inherit'};
    resize: vertical;
    background-color: inherit;
    font-size: ${(props) => props.theme.fontSizes.standard};

    &::placeholder {
      color: ${(props) => props.theme.colours.secondary};
    }
  }

  .comment-length {
    width: 4ch;
    text-align: center;

    &.warning {
      color: ${(props) => props.theme.colours.red};
    }
  }
`;

export const StyledCommentInputBottom = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  .error-message-wrapper {
    display: flex;
    gap: 4px;
    align-items: center;
    color: ${(props) => props.theme.colours.red};
    text-align: center;

    svg,
    .error-message {
      color: ${(props) => props.theme.colours.red};
      fill: ${(props) => props.theme.colours.red};
    }
  }
`;

export const StyledNoCommentsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1em;
  gap: 8px;

  svg {
    width: 128px;
    height: 128px;
  }
`;
