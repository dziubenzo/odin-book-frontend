import styled from 'styled-components';

export const StyledAllCategoriesPage = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 2em 0;
  gap: 16px;

  .top-header {
    color: ${(props) => props.theme.colours.secondary};
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
    width: fit-content;
    height: fit-content;
    font-size: ${(props) => props.theme.fontSizes.standard};
    padding: 0.75em;
    margin-left: auto;
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    gap: 16px;

    .follow-button {
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
