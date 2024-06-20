/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';

import ProfilePage from '../pages/ProfilePage';
import Theme from '../components/Theme';
import { BrowserRouter } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';

import { longBio, user2 } from './mocks';
import { MAX_BIO_LENGTH, defaultAvatars } from '../helpers';
import { mockFetch } from './fetchMock';

function renderProfilePage() {
  // Mock useOutletContext
  vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useOutletContext: () => [user2, vi.fn()],
    };
  });
  const user = userEvent.setup();

  render(
    <BrowserRouter>
      <Theme>
        <ProfilePage />
      </Theme>
    </BrowserRouter>,
  );

  return user;
}

describe('PostInfo', () => {
  it('should render an avatar', () => {
    renderProfilePage();

    const avatarImg = screen.getByRole('img', {
      name: `${user2.username}'s avatar`,
    });

    expect(avatarImg).toBeInTheDocument();
  });

  it('should render a link to the user page', () => {
    renderProfilePage();

    const userLink = screen.getByRole('link', {
      name: /user2/i,
    });

    expect(userLink).toBeInTheDocument();
    expect(userLink).toHaveAttribute('href', `/users/${user2.username}`);
  });

  it('should render a heading with the correct registration date', () => {
    renderProfilePage();

    const heading = screen.getByRole('heading', {
      name: new RegExp(new Date().getFullYear()),
    });

    expect(heading).toBeInTheDocument();
  });

  it('should render a link to the previous page page', () => {
    renderProfilePage();

    const previousPageLink = screen.getByRole('link', {
      name: /previous page/i,
    });

    expect(previousPageLink).toBeInTheDocument();
  });
});

describe('DefaultAvatars', () => {
  it('should render all default avatars', () => {
    renderProfilePage();

    const defaultAvatarImgs = screen.getAllByRole('img', {
      name: /default avatar/i,
    });

    expect(defaultAvatarImgs).toHaveLength(defaultAvatars.length);
  });
});

describe('AvatarUploader', () => {
  it('should render a label that allows the user to upload their own avatar', () => {
    renderProfilePage();

    const uploadAvatarLabel = screen.getByText(/upload your/i);

    expect(uploadAvatarLabel).toBeInTheDocument();
  });

  it('should remove the default avatars section and add the image preview section if an image is uploaded', async () => {
    const user = renderProfilePage();
    const imageFile = new File(['catimage!'], 'cat_image.png', {
      type: 'image/png',
    });
    // Mock createObjectURL method
    global.URL.createObjectURL = vi.fn(() => 'cat_image.png');

    const fileInput = screen.getByTestId('avatar-picker');
    await user.upload(fileInput, imageFile);

    const defaultAvatarImgs = screen.queryAllByRole('img', {
      name: /default avatar/i,
    });
    const avatarPreviewHeading = screen.getByRole('heading', {
      name: /avatar preview/i,
    });
    const avatarPreviewImg = screen.getByTestId('avatar-preview');
    const clearButton = screen.getByRole('button', { name: /clear/i });

    expect(defaultAvatarImgs).toHaveLength(0);
    expect(avatarPreviewHeading).toBeInTheDocument();
    expect(avatarPreviewImg).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
  });

  it('should not accept a file other than an image', async () => {
    const user = renderProfilePage();
    const nonImageFile = new File(['I bite!'], 'nasty_virus.rar', {
      type: 'application/vnd.rar',
    });

    const fileInput = screen.getByTestId('avatar-picker');
    await user.upload(fileInput, nonImageFile);

    const chooseAvatarHeading = screen.queryByRole('heading', {
      name: /choose/i,
    });
    const avatarPreviewHeading = screen.queryByRole('heading', {
      name: /avatar preview/i,
    });

    expect(chooseAvatarHeading).toBeInTheDocument();
    expect(avatarPreviewHeading).not.toBeInTheDocument();
  });
});

describe('BioInput', () => {
  it('should render a label that indicates the number of available characters', () => {
    renderProfilePage();
    const expectedChars = MAX_BIO_LENGTH - user2.bio.length;

    const bioLabel = screen.getByText(
      new RegExp(`${expectedChars} characters`),
    );

    expect(bioLabel).toBeInTheDocument();
  });

  it('should render an Update Profile button', () => {
    renderProfilePage();

    const updateProfileButton = screen.getByRole('button', { name: /update/i });

    expect(updateProfileButton).toBeInTheDocument();
  });

  it('should render a label that indicates the number of available characters', () => {
    renderProfilePage();
    const expectedChars = MAX_BIO_LENGTH - user2.bio.length;

    const bioLabel = screen.getByText(
      new RegExp(`${expectedChars} characters`),
    );

    expect(bioLabel).toBeInTheDocument();
  });

  it('should show the correct number of available characters if the bio textbox is empty', async () => {
    const user = renderProfilePage();

    const bioTextbox = screen.getByRole('textbox');
    await user.clear(bioTextbox);

    const bioLabel = screen.getByText(
      new RegExp(`${MAX_BIO_LENGTH} characters`),
    );

    expect(bioLabel).toBeInTheDocument();
  });

  it('should have a textbox that shows the current user bio', () => {
    renderProfilePage();

    const bioTextbox = screen.getByRole('textbox');

    expect(bioTextbox.value).toBe(user2.bio);
  });

  it('should have a textbox that accepts input', async () => {
    const user = renderProfilePage();
    const input = 'Apple pies are tasty!';

    const bioTextbox = screen.getByRole('textbox');
    await user.clear(bioTextbox);
    await user.type(bioTextbox, input);

    expect(bioTextbox.value).toBe(input);
  });

  it('should have a textbox that respects MAX_BIO_LENGTH', async () => {
    const user = renderProfilePage();

    const bioTextbox = screen.getByRole('textbox');
    await user.clear(bioTextbox);
    await user.type(bioTextbox, longBio);

    expect(bioTextbox.value.length).toBe(MAX_BIO_LENGTH);
  });

  it('should show an error message if the Update Profile button is clicked with no changes introduced', async () => {
    const user = renderProfilePage();

    const updateProfileButton = screen.getByRole('button', { name: /update/i });
    await user.click(updateProfileButton);
    const errorMessage = screen.getByText(/first/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it('should show an error message if something goes wrong with updating the profile', async () => {
    const user = renderProfilePage();
    const error = 'Something went wrong!';
    mockFetch(error, false);

    const bioTextbox = screen.getByRole('textbox');
    await user.clear(bioTextbox);
    await user.type(bioTextbox, 'I like mountains!');

    const updateProfileButton = screen.getByRole('button', { name: /update/i });
    await user.click(updateProfileButton);
    const errorMessage = screen.getByText(new RegExp(error));

    expect(errorMessage).toBeInTheDocument();
  });

  it('should show a feedback message if the profile is updated successfully', async () => {
    const user = renderProfilePage();
    const updatedBio = 'I like oceans, and hills!';
    mockFetch({ ...user2, bio: updatedBio }, true);

    const bioTextbox = screen.getByRole('textbox');
    await user.clear(bioTextbox);
    await user.type(bioTextbox, updatedBio);

    const updateProfileButton = screen.getByRole('button', { name: /update/i });
    await user.click(updateProfileButton);
    const errorMessage = screen.getByText(/successfully/i);

    expect(errorMessage).toBeInTheDocument();
  });
});
