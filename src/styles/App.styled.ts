import styled from 'styled-components';

type StyledAvatarProps = {
  $size: number;
};

export const StyledError = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  text-align: center;
  align-self: center;
  justify-self: center;

  h1 {
    color: ${(props) => props.theme.colours.primary};
  }

  svg {
    height: 64px;
    width: 64px;
  }

  p {
    margin-top: 2em;
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    h1 {
      font-size: ${(props) => props.theme.fontSizes.large};
    }
  }
`;

export const StyledLoading = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 48px;
  align-items: center;
  justify-content: center;
  text-align: center;
  align-self: center;
  justify-self: center;

  &.whole-page {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    h1 {
      font-size: ${(props) => props.theme.fontSizes.large};
    }
  }
`;

export const StyledAvatar = styled.div<StyledAvatarProps>`
  display: flex;

  img {
    height: ${(props) => props.$size || 50}px;
  }
`;

export const StyledStickyIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  aspect-ratio: 1/1;
  cursor: pointer;
  position: sticky;
  bottom: 110px;
  margin-left: auto;
  border-radius: 50%;
  background: transparent;
  border: none;

  *:focus-visible {
    border: none;
    outline: 2px solid ${(props) => props.theme.colours.secondary};
  }

  svg {
    width: 100%;
    height: 100%;
  }

  @media (hover: hover) {
    transition: background-color 0.3s;

    &:hover {
      background-color: ${(props) => props.theme.colours.tertiary};
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    width: 50px;
  }
`;
