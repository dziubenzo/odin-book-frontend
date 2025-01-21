import { StyledPopover } from '../styles/App.styled';
import {
  StyledAvatarSkeleton,
  StyledParagraphSkeleton,
  StyledPopoverButtonSkeleton,
} from '../styles/Skeletons.styled';

type PopoverSkeletonType = {
  type: 'user' | 'category';
  positionX: number;
  positionY: number;
};

function PopoverSkeleton({ type, positionX, positionY }: PopoverSkeletonType) {
  if (type === 'user') {
    return (
      <StyledPopover style={{ top: positionY, left: positionX }}>
        <div className="top-row">
          <StyledAvatarSkeleton $size={64} />
          <StyledParagraphSkeleton>Something</StyledParagraphSkeleton>
        </div>
        <div className="user-stats">
          <div>
            <p>Posts</p>
            <StyledParagraphSkeleton className="count">
              111
            </StyledParagraphSkeleton>
          </div>
          <div>
            <p>Comments</p>
            <StyledParagraphSkeleton className="count">
              111
            </StyledParagraphSkeleton>
          </div>
          <div>
            <p>Followers</p>
            <StyledParagraphSkeleton className="count">
              111
            </StyledParagraphSkeleton>
          </div>
          <div>
            <p>Following</p>
            <StyledParagraphSkeleton className="count">
              111
            </StyledParagraphSkeleton>
          </div>
        </div>
        <StyledPopoverButtonSkeleton />
      </StyledPopover>
    );
  }

  if (type === 'category') {
    return (
      <StyledPopover style={{ top: positionY, left: positionX }}>
        <div className="top-row">
          <StyledAvatarSkeleton $size={64} />
          <StyledParagraphSkeleton>Something</StyledParagraphSkeleton>
        </div>
        <div className="category-stats">
          <div>
            <p>Posts</p>
            <StyledParagraphSkeleton className="count">
              111
            </StyledParagraphSkeleton>
          </div>
          <div>
            <p>Followers</p>
            <StyledParagraphSkeleton className="count">
              111
            </StyledParagraphSkeleton>
          </div>
        </div>
        <StyledPopoverButtonSkeleton />
      </StyledPopover>
    );
  }
}

export default PopoverSkeleton;
