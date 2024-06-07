import styled from 'styled-components';
import { StyledPostInfo } from './AllPostsPage.styled';

export const StyledPostDetailsPage = styled.main`
  display: grid;
  height: 100%;
  width: 100%;
  padding: 4em 0;

  hr {
    margin: 1em 0;
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
  @media (max-width: ${(props) => props.theme.mobile}) {
    font-size: ${(props) => props.theme.fontSizes.standard};
    width: 100%;
    justify-content: space-between;
  }
`;
