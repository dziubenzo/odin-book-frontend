/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect } from 'vitest';
import Avatar from '../components/Avatar';
import FooterCentre from '../components/FooterCentre';
import FooterLeft from '../components/FooterLeft';
import FooterRight from '../components/FooterRight';
import HeaderBottomBar from '../components/HeaderBottomBar';
import HeaderTopBar from '../components/HeaderTopBar';
import Theme from '../components/Theme';
import { category1, superUser, user2 } from './mocks';

function renderAvatar(size: number) {
  render(
    <BrowserRouter>
      <Theme>
        <Avatar object={user2} size={size} type="user" />
      </Theme>
    </BrowserRouter>,
  );
}

function renderIcon() {
  render(
    <BrowserRouter>
      <Theme>
        <Avatar object={category1} size={36} type="category" />
      </Theme>
    </BrowserRouter>,
  );
}

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

function renderFooterLeft() {
  render(
    <BrowserRouter>
      <Theme>
        <FooterLeft />
      </Theme>
    </BrowserRouter>,
  );
}

function renderFooterCentre() {
  render(
    <BrowserRouter>
      <Theme>
        <FooterCentre />
      </Theme>
    </BrowserRouter>,
  );
}

function renderFooterRight() {
  render(
    <BrowserRouter>
      <Theme>
        <FooterRight user={superUser} />
      </Theme>
    </BrowserRouter>,
  );
}
describe('Avatar', () => {
  describe("User's Avatar", () => {
    it('should render an avatar img that has the correct alt text', () => {
      renderAvatar(36);

      const avatarImg = screen.getByRole('img');

      expect(avatarImg).toBeInTheDocument();
      expect(avatarImg).toHaveAttribute('alt', `${user2.username}'s avatar`);
    });

    it('should render an avatar img that has the correct size', () => {
      renderAvatar(100);

      const avatarImg = screen.getByRole('img');

      expect(avatarImg).toHaveStyle({ height: '100px' });
    });

    it('should render an avatar img that links to the user page', () => {
      renderAvatar(36);

      const userLink = screen.getByRole('link');

      expect(userLink).toHaveAttribute('href', `/users/${user2.username}`);
    });
  });

  describe('Category Icon', () => {
    it('should render an icon img that has the correct alt text', () => {
      renderIcon();

      const iconImg = screen.getByRole('img');

      expect(iconImg).toBeInTheDocument();
      expect(iconImg).toHaveAttribute(
        'alt',
        `Icon for the ${category1.name} category`,
      );
    });

    it('should render an icon img that links to the category page', () => {
      renderIcon();

      const categoryLink = screen.getByRole('link');

      expect(categoryLink).toHaveAttribute(
        'href',
        `/categories/${category1.slug}`,
      );
    });
  });
});

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

describe('FooterLeft', () => {
  it('should contain two links', () => {
    renderFooterLeft();

    const allLinks = screen.getAllByRole('link');

    expect(allLinks).toHaveLength(2);
  });

  it('should have a correct link to the My Profile page', () => {
    renderFooterLeft();

    const myProfileLink = screen.getByRole('link', { name: /my profile/i });

    expect(myProfileLink).toHaveAttribute('href', '/profile');
  });

  it('should lead to the correct URL once the user clicks the Log Out button', () => {
    renderFooterLeft();

    const logOutLink = screen.getByRole('link', { name: /log out/i });

    expect(logOutLink).toHaveAttribute('href', '/');
  });
});

describe('FooterCentre', () => {
  it("should have a correct link to the dev's GitHub page", () => {
    renderFooterCentre();

    const gitHubPageLink = screen.getByRole('link', { name: /developer's/i });

    expect(gitHubPageLink).toHaveAttribute(
      'href',
      'https://github.com/dziubenzo/',
    );
  });
});

describe('FooterRight', () => {
  it("should render the logged in user's username", () => {
    renderFooterRight();

    const usernamePara = screen.getByRole('paragraph');

    expect(usernamePara.textContent).toBe(superUser.username);
  });
});
