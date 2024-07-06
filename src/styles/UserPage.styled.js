import styled from 'styled-components';

export const StyledUserPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 100%;
  width: 100%;
  padding: 4em 0.5em;
  gap: 64px;

  *:focus-visible {
    border: none;
    outline: 2px solid ${(props) => props.theme.colours.secondary};
  }

  .bio {
    width: 100%;
    font-style: italic;
    padding: 1em;
    outline: 2px solid ${(props) => props.theme.colours.tertiary};
    border-radius: 16px;
  }

  .follow-button {
    position: sticky;
    bottom: 110px;
    align-self: flex-end;
    width: 150px;
    height: fit-content;
    font-size: ${(props) => props.theme.fontSizes.standard};
    padding: 0.75em;
  }
`;

export const StyledUserStats = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;

  .user-stats-heading {
    text-align: center;
  }

  .user-stats-wrapper {
    max-width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    place-items: center;
    row-gap: 32px;
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    .user-stats-wrapper {
      grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
    }
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
`;
