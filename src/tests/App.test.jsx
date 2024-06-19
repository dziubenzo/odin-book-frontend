/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';

import Avatar from '../components/Avatar';
import Theme from '../components/Theme';

import { category1, user2 } from './mocks';

function renderAvatar(size) {
  render(
    <Theme>
      <Avatar object={user2} size={size} />
    </Theme>,
  );
}

function renderIcon() {
  render(
    <Theme>
      <Avatar object={category1} isCategory={true} />
    </Theme>,
  );
}

describe('Avatar', () => {
  describe("User's Avatar", () => {
    it('should render an avatar img that has the correct alt text', () => {
      renderAvatar();

      const avatarImg = screen.getByRole('img');

      expect(avatarImg).toBeInTheDocument();
      expect(avatarImg).toHaveAttribute('alt', `${user2.username}'s avatar`);
    });

    it('should render an avatar img that has the correct size', () => {
      renderAvatar(100);

      const avatarImg = screen.getByRole('img');

      expect(avatarImg).toHaveStyle({ height: '100px' });
    });

    it('should render an avatar img that has the default size if no size prop provided', () => {
      renderAvatar();

      const avatarImg = screen.getByRole('img');

      expect(avatarImg).toHaveStyle({ height: '50px' });
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
  });
});
