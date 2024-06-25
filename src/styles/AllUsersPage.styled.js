import styled from 'styled-components';
import { StyledAllCategoriesPage } from './AllCategoriesPage.styled';

export const StyledAllUsersPage = styled(StyledAllCategoriesPage)`
  padding: 2em 0.1em;

  .users-wrapper {
    max-width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
    gap: 16px;
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    .users-wrapper {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
  }
`;

export const StyledUser = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-content: center;
  outline: 2px solid ${(props) => props.theme.colours.tertiary};
  border-radius: 32px;
  padding: 1em;
  text-align: center;

  .user-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    text-decoration: none;
    width: 100%;
  }

  .username {
    font-size: ${(props) => props.theme.fontSizes.medium};
  }

  .follow-button {
    width: 150px;
    height: fit-content;
    font-size: ${(props) => props.theme.fontSizes.standard};
    padding: 0.75em;
  }

  @media (hover: hover) {
    transition: outline 0.15s ease-in;

    img {
      transition: transform 0.15s ease-out;

      &:hover {
        transform: rotate(30deg);
      }
    }

    &:hover {
      outline: 2px solid ${(props) => props.theme.colours.primary};
    }

    .username:hover {
      color: ${(props) => props.theme.colours.secondary};
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    .user-link {
      text-decoration: revert;
      text-underline-offset: 0.3em;
      text-decoration-color: ${(props) => props.theme.colours.secondary};
    }

    .username {
      color: ${(props) => props.theme.colours.secondary};
    }
  }
`;
