import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect } from 'vitest';
import Theme from '../components/Theme';
import { defaultAvatars, MAX_BIO_LENGTH } from '../constants';
import ProfilePage from '../pages/ProfilePage';
import { mockFetch } from './fetchMock';
import { mockUseUserAndTheme } from './hookMocks';
import { longBio, user2 } from './mocks';

function renderProfilePage() {
  mockUseUserAndTheme(user2);
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

describe('UserInfo', () => {
  it("should render a user's avatar", () => {
    renderProfilePage();

    const avatarImg = screen.getByRole('img', {
      name: `${user2.username}'s avatar`,
    });

    expect(avatarImg).toBeInTheDocument();
  });

  it("should render a user's username", () => {
    renderProfilePage();

    const username = screen.getByText(new RegExp(user2.username, 'i'));

    expect(username).toBeInTheDocument();
  });

  it('should render two links to the user page (avatar and username)', () => {
    renderProfilePage();

    const userLinks = screen.getAllByRole('link', {
      name: /user2/i,
    });

    expect(userLinks).toHaveLength(2);

    for (const userLink of userLinks) {
      expect(userLink).toHaveAttribute('href', `/users/${user2.username}`);
    }
  });

  it('should render a heading with the correct registration date', () => {
    renderProfilePage();

    const heading = screen.getByRole('heading', {
      name: new RegExp(new Date().getFullYear().toString()),
    });

    expect(heading).toBeInTheDocument();
  });

  it('should render a link to return to the previous page', () => {
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

  it('should render default avatars that are not selected by default', () => {
    renderProfilePage();

    const defaultAvatarImgs = screen.getAllByRole('img', {
      name: /default avatar/i,
    });

    for (const avatarImg of defaultAvatarImgs) {
      expect(avatarImg).not.toHaveClass('selected');
    }
  });

  it("should mark a default avatar as current if the user's avatar is one of the default avatars", () => {
    renderProfilePage();

    const currentDefaultAvatar = screen.getByRole<HTMLImageElement>('img', {
      name: /default avatar 1/i,
    });

    expect(currentDefaultAvatar.src).toBe(user2.avatar);
    expect(currentDefaultAvatar).toHaveClass('current');
  });

  it('should mark a default avatar as selected on click', async () => {
    const user = renderProfilePage();

    const defaultAvatar = screen.getByRole('img', {
      name: /default avatar 2/i,
    });
    await user.click(defaultAvatar);

    expect(defaultAvatar).toHaveClass('selected');
  });

  it("should mark the default avatar currently set as the user's avatar as selected on click as well", async () => {
    const user = renderProfilePage();

    const currentDefaultAvatar = screen.getByRole('img', {
      name: /default avatar 1/i,
    });
    await user.click(currentDefaultAvatar);

    expect(currentDefaultAvatar).toHaveClass('selected');
  });
});

describe('AvatarUploader', () => {
  it('should render a label that allows the user to upload their own avatar', () => {
    renderProfilePage();

    const uploadAvatarLabel = screen.getByText(/your own avatar/i);

    expect(uploadAvatarLabel).toBeInTheDocument();
  });

  it('should remove the default avatars section and add the avatar preview section if an image is uploaded', async () => {
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
    const uploadedAvatarImg = screen.getByRole('img', {
      name: /uploaded avatar/i,
    });
    const clearButton = screen.getByRole('button', { name: /clear/i });

    expect(defaultAvatarImgs).toHaveLength(0);
    expect(avatarPreviewHeading).toBeInTheDocument();
    expect(uploadedAvatarImg).toBeInTheDocument();
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

    const bioTextbox = screen.getByRole<HTMLTextAreaElement>('textbox');

    expect(bioTextbox.value).toBe(user2.bio);
  });

  it('should have a textbox that accepts input', async () => {
    const user = renderProfilePage();
    const input = 'Apple pies are tasty!';

    const bioTextbox = screen.getByRole<HTMLTextAreaElement>('textbox');
    await user.clear(bioTextbox);
    await user.type(bioTextbox, input);

    expect(bioTextbox.value).toBe(input);
  });

  it('should have a textbox that respects MAX_BIO_LENGTH', async () => {
    const user = renderProfilePage();

    const bioTextbox = screen.getByRole<HTMLTextAreaElement>('textbox');
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