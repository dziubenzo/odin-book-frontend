import styled from 'styled-components';
import { flicker } from './animations';
import { StyledButton } from './WelcomePage.styled';

type StyledAvatarSkeletonProps = {
  $size: number;
};

export const StyledAvatarSkeleton = styled.div<StyledAvatarSkeletonProps>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colours.primary};
  animation: ${flicker} 1s linear infinite alternate;
`;

export const StyledParagraphSkeleton = styled.p`
  width: max-content !important;
  text-align: center;
  background-color: ${(props) => props.theme.colours.primary};
  color: transparent !important;
  user-select: none;
  border-radius: 6px;
  animation: ${flicker} 1s linear infinite alternate;
  justify-self: center;
`;

export const StyledPopoverButtonSkeleton = styled(StyledButton)`
  height: 100% !important;
  width: auto;
  padding: revert !important;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colours.primary};
  animation: ${flicker} 1s linear infinite alternate;
`;
