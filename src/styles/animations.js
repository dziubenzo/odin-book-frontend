import { keyframes } from 'styled-components';

export const showModal = keyframes`
from {
  opacity: 0;
  transform: translate(-200%, -50%) scale(0);
}

to {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}`;

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
}`;
