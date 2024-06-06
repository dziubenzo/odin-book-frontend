/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';

import HeaderTopBar from '../components/HeaderTopBar';
import HeaderBottomBar from '../components/HeaderBottomBar';
import Theme from '../components/Theme';
import { BrowserRouter } from 'react-router-dom';

function renderHeaderTopBar() {
  render(
    <BrowserRouter>
      <Theme>
        <HeaderTopBar />
      </Theme>
    </BrowserRouter>,
  );
}

function renderHeaderBottomBar() {
  render(
    <BrowserRouter>
      <Theme>
        <HeaderBottomBar />
      </Theme>
    </BrowserRouter>,
  );
}

describe('HeaderTopBar', () => {
  it('should contain five links', () => {
    renderHeaderTopBar();

    const allLinks = screen.getAllByRole('link');

    expect(allLinks).toHaveLength(5);
  });

  it('should render a correct link to the All Posts page', () => {
    renderHeaderTopBar();

    const allPostsLink = screen.getByRole('link', { name: /all/i });

    expect(allPostsLink).toHaveAttribute('href', '/posts');
  });

  it('should render a correct link to the Your Categories page', () => {
    renderHeaderTopBar();

    const yourCategoriesLink = screen.getByRole('link', {
      name: /categories/i,
    });

    expect(yourCategoriesLink).toHaveAttribute('href', '/posts/categories');
  });

  it('should render a correct link to the Your Following page', () => {
    renderHeaderTopBar();

    const yourFollowingLink = screen.getByRole('link', { name: /following/i });

    expect(yourFollowingLink).toHaveAttribute('href', '/posts/following');
  });

  it('should render a correct link to the Liked By Me page', () => {
    renderHeaderTopBar();

    const likedByMeLink = screen.getByRole('link', { name: /liked/i });

    expect(likedByMeLink).toHaveAttribute('href', '/posts/liked');
  });

  it('should render a correct link to the Your Posts page', () => {
    renderHeaderTopBar();

    const yourPostsLink = screen.getByRole('link', { name: /yours/i });

    expect(yourPostsLink).toHaveAttribute('href', '/posts/by-you');
  });
});

describe('HeaderBottomBar', () => {
  it('should contain three links', () => {
    renderHeaderBottomBar();

    const allLinks = screen.getAllByRole('link');

    expect(allLinks).toHaveLength(3);
  });

  it('should render a correct link to the All Categories page', () => {
    renderHeaderBottomBar();

    const allCategoriesLink = screen.getByRole('link', {
      name: /all categories/i,
    });

    expect(allCategoriesLink).toHaveAttribute('href', '/categories');
  });

  it('should render a correct link to the Create Post page', () => {
    renderHeaderBottomBar();

    const createPostLink = screen.getByRole('link', {
      name: /create post/i,
    });

    expect(createPostLink).toHaveAttribute('href', '/posts/create');
  });

  it('should render a correct link to the All Users page', () => {
    renderHeaderBottomBar();

    const allUsersLink = screen.getByRole('link', {
      name: /all users/i,
    });

    expect(allUsersLink).toHaveAttribute('href', '/users');
  });
});
