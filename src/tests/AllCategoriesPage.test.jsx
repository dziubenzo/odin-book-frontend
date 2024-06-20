/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';

import AllCategoriesPage from '../pages/AllCategoriesPage';
import Category from '../components/Category';
import Theme from '../components/Theme';
import { BrowserRouter } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';

import { mockFetch } from './fetchMock';
import { user2, category1, category2, user3 } from './mocks';
import { describe, expect } from 'vitest';

const categories = [category1, category2];

function renderAllCategoriesPage() {
  // Mock useOutletContext
  vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useOutletContext: () => [user2],
    };
  });

  render(
    <BrowserRouter>
      <Theme>
        <AllCategoriesPage />
      </Theme>
    </BrowserRouter>,
  );
}

function renderCategory(loggedInUser, inProgress) {
  const mockFollowCategory = vi.fn();
  const user = userEvent.setup();

  render(
    <BrowserRouter>
      <Theme>
        <Category
          user={loggedInUser}
          category={category1}
          handleCategoryButtonClick={mockFollowCategory}
          inProgress={inProgress}
        />
      </Theme>
    </BrowserRouter>,
  );

  return { mockFollowCategory, user };
}

describe('AllCategoriesPage', () => {
  it('should show a loading message immediately after rendering', () => {
    mockFetch('Failed to fetch', false);
    renderAllCategoriesPage();

    const loadingMessage = screen.getByRole('heading', {
      name: /loading all categories/i,
    });

    expect(loadingMessage).toBeInTheDocument();
  });

  it('should show an error message if fetching categories fails', async () => {
    mockFetch('Failed to fetch', false);
    renderAllCategoriesPage();

    const errorMessage = await screen.findByText(/failed to fetch/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it('should render a heading with the correct number of categories', async () => {
    mockFetch(categories, true);
    renderAllCategoriesPage();

    const allCategoriesHeading = await screen.findByRole('heading', {
      name: /all categories \(/i,
    });

    expect(allCategoriesHeading.textContent).toContain(categories.length);
  });

  it('should render a link to the New Category page', async () => {
    mockFetch(categories, true);
    renderAllCategoriesPage();

    const newCategoryLink = await screen.findByTitle('Create New Category');

    expect(newCategoryLink).toBeInTheDocument();
    expect(newCategoryLink).toHaveProperty(
      'href',
      expect.stringContaining('/categories/new'),
    );
  });

  it('should render all categories', async () => {
    mockFetch(categories, true);
    renderAllCategoriesPage();

    const categoryDescriptions = await screen.findAllByText(/description/i);

    expect(categoryDescriptions).toHaveLength(categories.length);
  });
});

describe('Category', () => {
  it('should render a category icon that links to the category page', () => {
    renderCategory(user2, false);

    const categoryIconLink = screen.getByRole('link', { name: /icon for/i });

    expect(categoryIconLink).toBeInTheDocument();
    expect(categoryIconLink).toHaveAttribute(
      'href',
      `/categories/${category1.slug}`,
    );
  });

  it('should render a category name that links to the category page', () => {
    renderCategory(user2, false);

    const categoryNameLink = screen.getByRole('link', {
      name: category1.name,
    });

    expect(categoryNameLink).toBeInTheDocument();
    expect(categoryNameLink).toHaveAttribute(
      'href',
      `/categories/${category1.slug}`,
    );
  });

  it('should render a category description', () => {
    renderCategory(user2, false);

    const categoryDescription = screen.getByText(
      new RegExp(category1.description),
    );

    expect(categoryDescription).toBeInTheDocument();
  });

  it('should render a Follow/Unfollow button, which calls a follow/unfollow function with category ID if clicked', async () => {
    const { mockFollowCategory, user } = renderCategory(user2, false);

    const followButton = screen.getByRole('button');

    expect(followButton).toBeInTheDocument();

    await user.click(followButton);

    expect(mockFollowCategory).toHaveBeenCalledTimes(1);
    expect(mockFollowCategory).toHaveBeenCalledWith(category1._id);
  });

  it('should render a Follow button description if the category is not followed by the user', () => {
    renderCategory(user2, false);

    const followButton = screen.getByRole('button');

    expect(followButton.textContent).toBe('Follow');
  });

  it('should render an Unfollow button description if the category is followed by the user', () => {
    renderCategory(user3, false);

    const followButton = screen.getByRole('button');

    expect(followButton.textContent).toBe('Unfollow');
  });

  it('should render a Changing button description if the category is being followed/unfollowed by the user', () => {
    renderCategory(user2, category1._id);

    const followButton = screen.getByRole('button');

    expect(followButton.textContent).toMatch(/changing/i);
  });
});
