import { StyledUser } from '../styles/AllUsersPage.styled';
import { StyledAvatarSkeleton } from '../styles/Skeletons.styled';
import { StyledButton } from '../styles/WelcomePage.styled';

type AllUsersSkeletonProps = {
  length: number;
};

function AllUsersSkeleton({ length }: AllUsersSkeletonProps) {
  return (
    <>
      <h1 className="top-header">All Users ({length})</h1>
      <div className="users-wrapper no-hover">
        {Array(length)
          .fill(null)
          .map((_v, index) => {
            return (
              <StyledUser key={index}>
                <StyledAvatarSkeleton $size={100} />
                <a className="user-link skeleton">Username</a>
                <StyledButton className="follow-button skeleton">
                  Follow
                </StyledButton>
              </StyledUser>
            );
          })}
      </div>
    </>
  );
}

export default AllUsersSkeleton;
