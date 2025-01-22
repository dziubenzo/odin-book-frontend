import { keyframes } from 'styled-components';

export const showModal = keyframes`
  from {
    opacity: 0;
    transform: translate(-200%, -50%) scale(0);
  }

  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const hideModal = keyframes`
  from {
    display: flex;
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  to {
    display: none;
    opacity: 0;
    transform: translate(100%, -50%) scale(0);
  }
`;

export const walkingCrab = keyframes`
  from {
    transform: rotate(-5deg);
  }

  to {
    transform: rotate(5deg);
  }
`;

export const breathing = keyframes`
  from {
    transform: scale(1.0);
  }

  to {
    transform: scale(1.2);
  }
`;

export const flicker = keyframes`
  from {
    opacity: 0.5;
  }

  to {
    opacity: 1;
  }
`;

export const showPopover = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const hidePopover = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;
