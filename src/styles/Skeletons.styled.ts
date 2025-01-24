import styled from 'styled-components';
import { flicker } from './animations';

type StyledAvatarSkeletonProps = {
  $size: number;
};

export const StyledAvatarSkeleton = styled.div<StyledAvatarSkeletonProps>`
  min-width: ${(props) => props.$size}px !important;
  width: ${(props) => props.$size}px !important;
  min-height: ${(props) => props.$size}px !important;
  height: ${(props) => props.$size}px !important;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colours.primary};
  pointer-events: none;
  animation: ${flicker} 1s linear infinite alternate;
`;
