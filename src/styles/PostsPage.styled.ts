import styled from 'styled-components';
import { breathing, walkingCrab } from './animations';

export const StyledPostsPage = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;

  *:focus-visible {
    border: none;
    outline: 2px solid ${(props) => props.theme.colours.secondary};
  }

  .posts-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 16px;
  }

  .top-header {
    color: ${(props) => props.theme.colours.secondary};
    text-align: center;
    margin-bottom: 1em;
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    .top-header {
      margin-bottom: 0.25em;
      font-size: ${(props) => props.theme.fontSizes.large};
    }
  }
`;

export const StyledPost = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;

  a {
    text-decoration: none;
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    grid-template-columns: min-content 1fr;
    gap: 16px;
  }
`;

export const StyledPostLikes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .like-icon,
  .dislike-icon {
    height: 46px;
    width: 46px;
    background: transparent;
    border: none;

    svg {
      width: 100%;
      height: 100%;

      &.liked,
      &.disliked {
        fill: ${(props) => props.theme.colours.secondary};
      }
    }
  }

  .likes-count {
    font-size: ${(props) => props.theme.fontSizes.extraLarge};
    width: 4ch;
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

      .loader * {
        width: 4px !important;
        height: 4px !important;
      }
    }

    .likes-count {
      font-size: ${(props) => props.theme.fontSizes.large};
    }
  }
`;

export const StyledPostBody = styled.div`
  display: grid;
  gap: 8px;
  padding: 0.5em;
  border-radius: 16px;

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
    font-size: ${(props) => props.theme.fontSizes.standard};

    .post-image {
      max-width: 100%;
      max-height: 600px;
      border-radius: 16px;
    }

    .yt-video-player {
      width: 100%;
      aspect-ratio: 16/9;
      border-radius: 16px;
    }

    * {
      font-size: ${(props) => props.theme.fontSizes.standard};
    }
  }

  @media (hover: hover) {
    transition: background-color 0.3s;

    &:hover {
      background-color: ${(props) => props.theme.colours.tertiary};
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    padding: revert;

    .post-title {
      font-size: ${(props) => props.theme.fontSizes.medium};
    }

    .post-content {
      font-size: 0.9em;

      * {
        font-size: 0.9em;
      }
    }
  }
`;

export const StyledPostInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.9rem;

  .post-author {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .post-date {
    color: ${(props) => props.theme.colours.primaryDarker};
  }

  .post-comments {
    display: flex;
    align-items: center;
    gap: 8px;

    p,
    svg {
      color: ${(props) => props.theme.colours.primaryLighter};
      fill: ${(props) => props.theme.colours.primaryLighter};
    }
  }

  @media (hover: hover) {
    .category-link:hover,
    .user-link:hover {
      color: ${(props) => props.theme.colours.secondary};
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.small};
    justify-content: space-between;

    .post-author {
      gap: 4px;
    }

    .category-link,
    .user-link {
      text-decoration: revert;
      color: ${(props) => props.theme.colours.secondary};
      text-underline-offset: 4px;
      font-size: 0.9em;
    }

    .post-date {
      font-size: 0.9em;
    }
  }
`;

export const StyledNoPostsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;

  &.position-normal {
    position: revert;
    left: revert;
    top: revert;
    transform: revert;
    margin-bottom: 2em;
  }

  .no-posts-crab {
    height: 256px;
    width: 256px;
  }

  @media (hover: hover) {
    .no-posts-crab:hover {
      animation: ${walkingCrab} 0.2s linear infinite alternate;
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    .no-posts-crab {
      height: 50vw;
      width: 50vw;
    }

    h1 {
      font-size: ${(props) => props.theme.fontSizes.large};
    }
  }
`;

export const StyledResourceDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 2em 0.5em;

  .description,
  .bio {
    font-style: italic;
    font-size: ${(props) => props.theme.fontSizes.medium};
    text-align: center;
    line-height: 1.75;
    margin: 2em 0;
  }

  .error-message-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: center;

    p,
    svg {
      fill: ${(props) => props.theme.colours.lightRed};
      color: ${(props) => props.theme.colours.lightRed};
    }
  }

  // This makes it as if the position: fixed element is fixed relative to its parent rather than relative to the viewport, so no JS calculations are required
  // https://moshfeu.github.io/position-fixed-relative-to-parent/
  .mystery-wrapper {
    position: absolute;
    right: 0;
    width: calc(150px); // width of the element

    .follow-button {
      position: fixed;
      bottom: 110px;
      width: 150px;
      height: fit-content;
      font-size: ${(props) => props.theme.fontSizes.standard};
      padding: 0.75em;
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    gap: 16px;
    margin: 0em 0.5em 1em 0.5em;

    .description,
    .bio {
      font-size: ${(props) => props.theme.fontSizes.standard};
      line-height: 1.5;
      margin: 1em 0.5em;
    }
  }
`;

export const StyledResourceDetailsTop = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  .name {
    color: ${(props) => props.theme.colours.secondary};
    font-weight: 700;
    text-align: center;
  }

  .date-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: center;
    margin-left: auto;

    span {
      color: ${(props) => props.theme.colours.secondary};
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    gap: 16px;

    img {
      height: 50px;
      width: 50px;
    }

    .name {
      font-size: ${(props) => props.theme.fontSizes.medium};
    }

    .date-wrapper {
      gap: 0;
    }
  }
`;

export const StyledCategoryStats = styled.div`
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(250px, 1fr));
  place-items: center;

  @media (max-width: ${(props) => props.theme.mobile}) {
    grid-template-columns: repeat(2, minmax(125px, 1fr));
  }
`;

export const StyledUserStats = styled.div`
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  place-items: center;
  row-gap: 32px;

  @media (min-width: ${(props) => props.theme.tabletMin}) and (max-width: ${(
      props,
    ) => props.theme.tabletMax}) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
    row-gap: 16px;
  }
`;

export const StyledStat = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  .stat-title {
    font-size: ${(props) => props.theme.fontSizes.medium};
    text-align: center;
  }

  .count {
    font-size: ${(props) => props.theme.fontSizes.extraLarge};
  }

  svg {
    height: 36px;
    width: 36px;
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    gap: 4px;

    .stat-title {
      font-size: ${(props) => props.theme.fontSizes.standard};
    }

    .count {
      font-size: ${(props) => props.theme.fontSizes.large};
    }

    svg {
      height: 24px;
      width: 24px;
    }
  }
`;

export const StyledLoadingInfiniteScroll = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2em;
  margin-bottom: 1em;

  svg {
    width: 64px;
    height: 64px;
    animation: ${breathing} 0.3s ease-out infinite alternate;
  }
`;

export const StyledEndInfiniteScroll = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2em;
  margin-bottom: 1em;
  gap: 8px;

  svg {
    width: 128px;
    height: 128px;
  }
`;

export const StyledPostSorter = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;

  .sort-buttons {
    display: flex;
    gap: 8px;

    button {
      background-color: ${(props) => props.theme.colours.primary};
      color: ${(props) => props.theme.colours.background};
      border: none;
      padding: 0.5em;
      border-radius: 4px;
      cursor: pointer;

      &.selected {
        background-color: ${(props) => props.theme.colours.background};
        color: ${(props) => props.theme.colours.primary};
      }
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    justify-content: center;

    .sort-buttons {
      gap: 12px;
    }

    p {
      display: none;
    }
  }
`;
