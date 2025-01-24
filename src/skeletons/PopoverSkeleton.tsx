import { StyledPopover } from '../styles/App.styled';
import { StyledAvatarSkeleton } from '../styles/Skeletons.styled';
import { StyledButton } from '../styles/WelcomePage.styled';

type PopoverSkeletonType = {
  type: 'user' | 'category';
  positionX: number;
  positionY: number;
};

function PopoverSkeleton({ type, positionX, positionY }: PopoverSkeletonType) {
  if (type === 'user') {
    return (
      <StyledPopover
        className="opening"
        style={{ top: positionY, left: positionX }}
      >
        <div className="top-row">
          <StyledAvatarSkeleton $size={64} />
          <p className="skeleton">Username</p>
        </div>
        <div className="user-stats">
          <div>
            <p>Posts</p>
            <p className="count skeleton fit-content justify-center">111</p>
          </div>
          <div>
            <p>Comments</p>
            <p className="count skeleton fit-content justify-center">111</p>
          </div>
          <div>
            <p>Followers</p>
            <p className="count skeleton fit-content justify-center">111</p>
          </div>
          <div>
            <p>Following</p>
            <p className="count skeleton fit-content justify-center">111</p>
          </div>
        </div>
        <StyledButton className="popover-btn skeleton">Button</StyledButton>
      </StyledPopover>
    );
  }

  if (type === 'category') {
    return (
      <StyledPopover
        className="opening"
        style={{ top: positionY, left: positionX }}
      >
        <div className="top-row">
          <StyledAvatarSkeleton $size={64} />
          <p className="skeleton">Category</p>
        </div>
        <div className="category-stats">
          <div>
            <p>Posts</p>
            <p className="count skeleton fit-content justify-center">111</p>
          </div>
          <div>
            <p>Followers</p>
            <p className="count skeleton fit-content justify-center">111</p>
          </div>
        </div>
        <StyledButton className="popover-btn skeleton">Button</StyledButton>
      </StyledPopover>
    );
  }
}

export default PopoverSkeleton;
