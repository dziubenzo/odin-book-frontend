import styled from 'styled-components';

export const StyledAllCategoriesPage = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 2em 0.1em;
  gap: 16px;

  *:focus-visible {
    border: none;
    outline: 2px solid ${(props) => props.theme.colours.secondary};
  }

  .top-header {
    color: ${(props) => props.theme.colours.secondary};
    margin-bottom: 0.5em;
  }

  .new-category-link-wrapper {
    position: sticky;
    bottom: 125px;
    align-self: flex-end;
    border-radius: 16px;
    background-color: ${(props) => props.theme.colours.primary};

    .new-category-link {
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.colours.background};
      font-size: ${(props) => props.theme.fontSizes.large};
      font-weight: 600;
      text-decoration: none;

      svg {
        fill: ${(props) => props.theme.colours.background};
        stroke: ${(props) => props.theme.colours.background};
        height: 48px;
        width: 48px;
        padding: 0.5em;
      }
    }
  }

  @media (hover: hover) {
    .new-category-link-wrapper {
      transition:
        color,
        background-color 0.15s ease-in;

      &:hover {
        background-color: ${(props) => props.theme.colours.secondary};
      }
    }
    .new-category-link-wrapper {
      .new-category-link:hover {
        color: ${(props) => props.theme.colours.secondary};
      }
    }
  }
`;

export const StyledCategory = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 32px;

  a {
    text-decoration: none;
  }

  .follow-button {
    width: 150px;
    height: fit-content;
    font-size: ${(props) => props.theme.fontSizes.standard};
    padding: 0.75em;
    margin-left: auto;
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    gap: 12px;

    .follow-button {
      min-width: 80px;
      font-size: ${(props) => props.theme.fontSizes.small};
      padding: 0.5em;
    }
  }
`;

export const StyledCategoryBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 64px;

    .name {
      font-size: ${(props) => props.theme.fontSizes.large};
      font-weight: 600;
    }
  }

  .description {
    font-size: 0.9em;
  }

  @media (hover: hover) {
    .name {
      &:hover {
        color: ${(props) => props.theme.colours.secondary};
      }
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    a {
      text-decoration: revert;
      text-underline-offset: 0.3em;
      text-decoration-color: ${(props) => props.theme.colours.secondary};

      .name {
        font-size: ${(props) => props.theme.fontSizes.medium};
        color: ${(props) => props.theme.colours.secondary};
      }
    }

    .description {
      font-size: ${(props) => props.theme.fontSizes.small};
    }
  }
`;
