import styled from 'styled-components';

export const StyledAllPostsPage = styled.main`
  width: 100%;
  display: grid;
  gap: 4px;
  margin: 2em 0;

  @media (max-width: ${(props) => props.theme.mobile}) {
    gap: 16px;
  }
`;

export const StyledPost = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;

  a {
    text-decoration: none;
  }

  .post-likes {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;

    .like-icon {
      height: 32px;
      width: 32px;

      &.liked {
        fill: ${(props) => props.theme.colours.secondary};
      }
    }

    .likes-count {
      font-size: ${(props) => props.theme.fontSizes.extraLarge};
    }
  }

  .post-body {
    display: grid;
    gap: 8px;
    padding: 0.5em;

    a {
      display: grid;
      gap: 8px;
    }

    .post-title {
      color: ${(props) => props.theme.colours.secondary};
      font-size: ${(props) => props.theme.fontSizes.large};
      font-weight: 700;
    }

    .post-content {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .post-info {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.9rem;

      .post-date {
        color: ${(props) => props.theme.colours.primaryDarker};
      }

      .post-comments {
        display: flex;
        align-items: center;
        gap: 8px;
        color: ${(props) => props.theme.colours.primaryLighter};

        svg {
          fill: ${(props) => props.theme.colours.primaryLighter};
        }
      }
    }
  }

  @media (hover: hover) {
    .post-body:hover {
      border-radius: 16px;
      background-color: ${(props) => props.theme.colours.tertiary};

      .category-link:hover,
      .user-link:hover {
        color: ${(props) => props.theme.colours.secondary};
      }
    }

    .like-icon-wrapper {
      padding: 0.5em 0.6em;
      cursor: pointer;

      &:hover {
        background-color: ${(props) => props.theme.colours.tertiary};
        border-radius: 50%;
      }
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    grid-template-columns: min-content 1fr;
    gap: 16px;

    .post-likes {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;

      .likes-icon {
        height: 24px;
        width: 24px;
      }

      .likes-count {
        font-size: ${(props) => props.theme.fontSizes.large};
      }
    }

    .post-body {
      padding: revert;

      .post-title {
        font-size: ${(props) => props.theme.fontSizes.medium};
      }

      .post-content {
        font-size: 0.9em;
      }

      .post-info {
        text-align: center;
        font-size: ${(props) => props.theme.fontSizes.small};

        .category-link,
        .user-link {
          text-decoration: revert;
          color: ${(props) => props.theme.colours.secondary};
          text-underline-offset: 4px;
          font-size: 0.85em;
        }

        .post-date {
          font-size: 0.85em;
        }
      }
    }
  }
`;
