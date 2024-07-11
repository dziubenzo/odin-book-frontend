import styled from 'styled-components';
import { showModal, hideModal } from './animations';

export const StyledWelcomePage = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .welcome-page-wrapper {
    display: flex;
    flex-direction: column;
    gap: 48px;
    text-align: center;

    h1 {
      font-size: 4rem;
    }

    .app-name {
      color: ${(props) => props.theme.colours.secondary};
    }
  }

  .welcome-page-btns {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 64px;
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    .welcome-page-btns {
      gap: 32px;
    }
  }
`;

export const StyledButton = styled.button`
  width: 200px;
  padding: 0.75em;
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: 600;
  background-color: ${(props) => props.theme.colours.background};
  border: 2px solid ${(props) => props.theme.colours.primary};
  border-radius: 32px;
  cursor: pointer;

  &.log-in-as-guest-btn {
    font-size: ${(props) => props.theme.fontSizes.medium};
  }

  @media (hover: hover) {
    &:hover {
      transition:
        color,
        background-color 0.15s ease-in;
      color: ${(props) => props.theme.colours.background};
      background-color: ${(props) => props.theme.colours.primary};
    }
  }

  @media (max-width: ${(props) => props.theme.mobile}) {
    width: 125px;
    font-size: ${(props) => props.theme.fontSizes.medium};

    &.log-in-as-guest-btn {
      width: 200px;
    }
  }
`;

export const StyledModal = styled.dialog`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 350px;
  background-color: ${(props) => props.theme.colours.background};
  border: none;
  outline: 2px solid ${(props) => props.theme.colours.tertiary};
  border-radius: 32px;
  animation: ${hideModal} 0.2s ease-in;

  &[open] {
    display: flex;
    animation: ${showModal} 0.2s ease-in;

    &::backdrop {
      backdrop-filter: blur(4px);
    }
  }

  .modal-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 36px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    label {
      font-size: ${(props) => props.theme.fontSizes.medium};
      cursor: pointer;
    }
  }

  .close-modal-icon {
    position: absolute;
    right: 1em;
    top: 1em;
    height: 36px;
    width: 36px;
    border-radius: 50%;
    background: transparent;
    border: none;

    &:focus-visible {
      border: none;
      outline: 2px solid ${(props) => props.theme.colours.secondary};
    }

    svg {
      height: 100%;
      width: 100%;
    }
  }

  .error-message {
    position: absolute;
    bottom: 2em;
    text-align: center;
    color: red;
    padding: 0 0.5em;
    font-size: ${(props) => props.theme.fontSizes.medium};
  }

  @media (hover: hover) {
    .close-modal-icon {
      transition: background-color 0.1s ease-in;
      cursor: pointer;

      &:hover {
        background-color: ${(props) => props.theme.colours.tertiary};
      }
    }
  }
`;

export const StyledSubmitButton = styled(StyledButton)`
  width: 160px;
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

export const StyledInput = styled.input`
  width: 80%;
  background-color: ${(props) => props.theme.colours.tertiary};
  font-size: ${(props) => props.theme.fontSizes.medium};
  border: 2px solid ${(props) => props.theme.colours.background};
  border-radius: 32px;
  padding: 0.25em 0.5em;
`;

export const StyledSignupModal = styled(StyledModal)`
  &[open] {
    height: 450px;
  }
`;
