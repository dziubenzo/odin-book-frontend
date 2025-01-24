import {
  StyledCategory,
  StyledCategoryBody,
} from '../styles/AllCategoriesPage.styled';
import { StyledAvatarSkeleton } from '../styles/Skeletons.styled';
import { StyledButton } from '../styles/WelcomePage.styled';

type AllCategoriesSkeletonProps = {
  length: number;
};

function AllCategoriesSkeleton({ length }: AllCategoriesSkeletonProps) {
  return (
    <>
      <h1 className="top-header">All Categories ({length})</h1>
      {Array(length)
        .fill(null)
        .map((_v, index) => {
          return (
            <StyledCategory key={index}>
              <StyledAvatarSkeleton $size={50} />
              <StyledCategoryBody>
                <a className="category-link skeleton fit-content">
                  Category Name
                </a>
                <p className="description skeleton">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Placeat eaque, non quos.
                </p>
              </StyledCategoryBody>
              <StyledButton className="follow-button skeleton">
                Follow
              </StyledButton>
            </StyledCategory>
          );
        })}
    </>
  );
}

export default AllCategoriesSkeleton;
