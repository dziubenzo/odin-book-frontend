import styled from 'styled-components';
import { hidePopover, showPopover } from './animations';

export const POPOVER_WIDTH = 300;

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

  a {
    max-height: ${(props) => props.$size || 50}px !important;

    img {
      height: ${(props) => props.$size || 50}px !important;
      width: ${(props) => props.$size || 50}px !important;
    }
  }

  @media (hover: hover) {
    transition: outline 0.15s ease-in;

    img {
      transition: transform 0.15s ease-out;

      &:hover {
        transform: rotate(30deg);
      }
    }
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

export const StyledPopover = styled.div`
  position: absolute;
  width: ${POPOVER_WIDTH}px;
  height: 225px;
  border-radius: 24px;
  background-color: ${(props) => props.theme.colours.background};
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: ${(props) => props.theme.colours.popoverBoxShadow};
  z-index: 2; // to be on top of the footer

  &.opening {
    animation: ${showPopover} 0.25s ease-in forwards;
  }

  &.closing {
    animation: ${hidePopover} 0.25s ease-in forwards;
  }

  .top-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    align-items: center;
    word-break: break-all;

    div {
      display: revert;

      a {
        display: block;
        width: inherit !important;
        height: inherit !important;
        max-height: 64px;
      }
    }

    p {
      font-size: ${(props) => props.theme.fontSizes.medium};
      color: ${(props) => props.theme.colours.secondary};
    }
  }

  .user-stats,
  .category-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    text-align: center;
    gap: 8px;

    div {
      p {
        font-size: ${(props) => props.theme.fontSizes.small};
      }
      .count {
        font-size: ${(props) => props.theme.fontSizes.large};
        color: ${(props) => props.theme.colours.secondary};
      }
    }
  }

  .category-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .popover-btn {
    height: 100% !important;
    width: auto;
    padding: revert !important;
    border-radius: 8px;

    &:disabled {
      cursor: not-allowed;
      background-color: ${(props) => props.theme.colours.background};
      color: ${(props) => props.theme.colours.background};
      opacity: 0.5;
    }
  }

  .error-msg-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;

    svg {
      height: 64px;
      width: 64px;
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    display: none;
  }
`;
