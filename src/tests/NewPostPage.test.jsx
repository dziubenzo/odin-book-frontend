/* eslint-disable no-undef */

import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect } from 'vitest';
import { within } from '@testing-library/react';

import NewPostPage from '../pages/NewPostPage';
import Theme, { darkTheme } from '../components/Theme';
import { userEvent } from '@testing-library/user-event';
import { category1, category2, longPostTitle, user3 } from './mocks';
import { mockFetch } from './fetchMock';
import { MAX_POST_TITLE_LENGTH } from '../helpers';

const navigateFn = vi.fn();
const categories = [category1, category2];

function renderNewPostPage() {
  const user = userEvent.setup();

  // Mock useNavigate and useOutletContext
  vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useNavigate: () => navigateFn,
      useOutletContext: () => [user3],
    };
  });

  render(
    <Theme>
      <NewPostPage />
    </Theme>,
  );

  return { user };
}

describe('Loading and Error', () => {
  it('should show a loading message immediately after rendering', () => {
    mockFetch('Failed to fetch', false);
    renderNewPostPage();

    const loadingMessage = screen.getByRole('heading', {
      name: /loading../i,
    });

    expect(loadingMessage).toBeInTheDocument();
  });

  it('should show an error message if fetching users fails', async () => {
    mockFetch('Failed to fetch', false);
    renderNewPostPage();

    const errorMessage = await screen.findByText(/failed to fetch/i);

    expect(errorMessage).toBeInTheDocument();
  });
});

describe('NewPostPage', () => {
  beforeEach(() => {
    mockFetch(categories, true);
  });

  it('should render a New Post heading', async () => {
    renderNewPostPage();

    const newPostHeading = await screen.findByRole('heading', {
      name: /new post/i,
    });

    expect(newPostHeading).toBeInTheDocument();
  });
});

describe('PostTitleInput', () => {
  beforeEach(() => {
    mockFetch(categories, true);
  });

  it('should render an input for post title', async () => {
    renderNewPostPage();

    const postTitleInput = await screen.findByRole('textbox', {
      name: /post title/i,
    });

    expect(postTitleInput).toBeInTheDocument();
  });

  it('should render an input for post title that accepts input', async () => {
    const { user } = renderNewPostPage();
    const text = 'I am a post title input, hi!';

    const postTitleInput = await screen.findByRole('textbox', {
      name: /post title/i,
    });
    await user.type(postTitleInput, text);

    expect(postTitleInput.value).toBe(text);
  });

  it('should render an input for post title that shows text in a different colour if the input length is too short', async () => {
    const { user } = renderNewPostPage();
    const text = 'Sh';

    const postTitleInput = await screen.findByRole('textbox', {
      name: /post title/i,
    });
    await user.clear(postTitleInput);
    await user.type(postTitleInput, text);

    expect(postTitleInput).toHaveClass('short-title');
  });

  it('should render an input for post title that shows text in normal colour if the input length is adequate', async () => {
    const { user } = renderNewPostPage();
    const text = 'I am completely normal';

    const postTitleInput = await screen.findByRole('textbox', {
      name: /post title/i,
    });
    await user.clear(postTitleInput);
    await user.type(postTitleInput, text);

    expect(postTitleInput).not.toHaveClass('short-title');
  });

  it('should render an input for post title that cannot go above MAX_POST_TITLE_LENGTH', async () => {
    const { user } = renderNewPostPage();

    const postTitleInput = await screen.findByRole('textbox', {
      name: /post title/i,
    });
    await user.clear(postTitleInput);
    await user.type(postTitleInput, longPostTitle);

    expect(postTitleInput.value.length).toBe(MAX_POST_TITLE_LENGTH);
  });
});

describe('CategoryPicker', () => {
  beforeEach(() => {
    mockFetch(categories, true);
  });

  it('should render a category picker', async () => {
    renderNewPostPage();

    const categoryPicker = await screen.findByRole('combobox', {
      name: /category/i,
    });

    expect(categoryPicker).toBeInTheDocument();
  });

  it('should render a category picker that has an empty option and all fetched categories', async () => {
    renderNewPostPage();

    const categoryPicker = await screen.findByRole('combobox', {
      name: /category/i,
    });
    const categoryOptions =
      await within(categoryPicker).findAllByRole('option');

    expect(categoryOptions.length).toBe(categories.length + 1);
  });

  it('should render a category picker that has an empty option selected by default', async () => {
    renderNewPostPage();

    const defaultCategoryOption = await screen.findByRole('option', {
      name: /choose category/i,
    });

    expect(defaultCategoryOption.value).toBeFalsy();
    expect(defaultCategoryOption.selected).toBe(true);
  });

  it('should render a category picker that has selectable options', async () => {
    const { user } = renderNewPostPage();

    const categoryPicker = await screen.findByRole('combobox', {
      name: /category/i,
    });
    const category1Option = await screen.findByRole('option', {
      name: new RegExp(category1.name, 'i'),
    });
    await user.selectOptions(categoryPicker, category1Option);

    expect(category1Option.selected).toBe(true);

    const category2Option = await screen.findByRole('option', {
      name: new RegExp(category2.name, 'i'),
    });
    await user.selectOptions(categoryPicker, category2Option);

    expect(category1Option.selected).toBe(false);
    expect(category2Option.selected).toBe(true);
  });

  it('should render a category picker whose options have category IDs as values', async () => {
    renderNewPostPage();

    const category1Option = await screen.findByRole('option', {
      name: new RegExp(category1.name, 'i'),
    });

    expect(category1Option.value).toBe(category1._id);
  });

  it('should render a Followed Categories Only checkbox that is unchecked by default', async () => {
    renderNewPostPage();

    const followedCategoriesCheckbox = await screen.findByRole('checkbox', {
      name: /followed categories only/i,
    });

    expect(followedCategoriesCheckbox).toBeInTheDocument();
    expect(followedCategoriesCheckbox).not.toBeChecked();
  });

  it('should render a Followed Categories Only checkbox that can be checked and unchecked', async () => {
    const { user } = renderNewPostPage();

    const followedCategoriesCheckbox = await screen.findByRole('checkbox', {
      name: /followed categories only/i,
    });
    await user.click(followedCategoriesCheckbox);

    expect(followedCategoriesCheckbox).toBeChecked();

    await user.click(followedCategoriesCheckbox);

    expect(followedCategoriesCheckbox).not.toBeChecked();
  });

  it('should render a Followed Categories Only checkbox that shows only categories followed by the logged in user and the empty category if checked', async () => {
    const { user } = renderNewPostPage();

    const followedCategoriesCheckbox = await screen.findByRole('checkbox', {
      name: /followed categories only/i,
    });
    await user.click(followedCategoriesCheckbox);

    const categoryPicker = await screen.findByRole('combobox', {
      name: /category/i,
    });
    const categoryOptions =
      await within(categoryPicker).findAllByRole('option');

    expect(categoryOptions.length).toBe(user3.followed_categories.length + 1);
  });
});

describe('PostTypeSelector', () => {
  beforeEach(() => {
    mockFetch(categories, true);
  });

  it('should render three post type buttons', async () => {
    renderNewPostPage();

    const postTypeSelector = await screen.findByTestId('post-type-selector');
    const postTypeButtons =
      await within(postTypeSelector).findAllByRole('button');

    expect(postTypeButtons.length).toBe(3);
  });

  it('should render a text post type button that is selected by default', async () => {
    renderNewPostPage();

    const textPostTypeButton = await screen.findByRole('button', {
      name: /text/i,
    });

    expect(textPostTypeButton).toHaveClass('selected');
  });

  it('should render three post type buttons that change their selected status on click', async () => {
    const { user } = renderNewPostPage();

    const textPostTypeButton = await screen.findByRole('button', {
      name: /text/i,
    });
    const imagePostTypeButton = await screen.findByRole('button', {
      name: /image/i,
    });
    const videoPostTypeButton = await screen.findByRole('button', {
      name: /video/i,
    });
    await user.click(imagePostTypeButton);

    expect(textPostTypeButton).not.toHaveClass('selected');
    expect(videoPostTypeButton).not.toHaveClass('selected');
    expect(imagePostTypeButton).toHaveClass('selected');

    await user.click(videoPostTypeButton);

    expect(textPostTypeButton).not.toHaveClass('selected');
    expect(imagePostTypeButton).not.toHaveClass('selected');
    expect(videoPostTypeButton).toHaveClass('selected');
  });

  it('should render three post type buttons that retain their selected status if clicked again', async () => {
    const { user } = renderNewPostPage();

    const videoPostTypeButton = await screen.findByRole('button', {
      name: /video/i,
    });
    await user.click(videoPostTypeButton);

    expect(videoPostTypeButton).toHaveClass('selected');

    await user.click(videoPostTypeButton);

    expect(videoPostTypeButton).toHaveClass('selected');
  });
});

describe('TextEditor', () => {
  beforeEach(() => {
    mockFetch(categories, true);
  });

  it('should render a text editor if the text post type is selected', async () => {
    const { user } = renderNewPostPage();

    const textPostTypeButton = await screen.findByRole('button', {
      name: /text/i,
    });
    await user.click(textPostTypeButton);
    const textEditor = await screen.findByTestId('text-editor');

    expect(textEditor).toBeInTheDocument();
  });

  it('should render a text editor that shows text in a different colour if the input length is too short', async () => {
    const { user } = renderNewPostPage();
    const text = 'Sad';

    const textEditor = await screen.findByTestId('text-editor');
    await user.type(textEditor, text);

    expect(textEditor).toHaveStyle({ color: darkTheme.colours.lightRed });
    await user.clear(textEditor);
  });

  it('should render a text editor that shows text in normal colour if the input length is adequate', async () => {
    const { user } = renderNewPostPage();
    const text = 'I am a totally normal post content, nice to meet you!';

    const textEditor = await screen.findByTestId('text-editor');
    await user.type(textEditor, text);

    expect(textEditor).not.toHaveStyle({ color: darkTheme.colours.lightRed });
  });
});

describe('ImageEditor', () => {
  beforeEach(() => {
    mockFetch(categories, true);
  });

  it('should render an image URL input and an image selector if the image post type is selected', async () => {
    const { user } = renderNewPostPage();

    const imagePostTypeButton = await screen.findByRole('button', {
      name: /image/i,
    });
    await user.click(imagePostTypeButton);

    const imageURLInput = await screen.findByRole('textbox', {
      name: /image url/i,
    });
    const imageSelector = await screen.findByText(/upload image from file/i);

    expect(imageURLInput).toBeInTheDocument();
    expect(imageSelector).toBeInTheDocument();
  });

  it('should not render an image preview and a heading for it by default', async () => {
    renderNewPostPage();

    // Wait for mockFetch to populate the page
    // This allows me to use the queryBy query to check for the non-existence of something in proper setting
    await waitFor(() => {}, { timeout: 0 });

    const imagePreviewHeading = screen.queryByRole('heading', {
      name: /image preview/i,
    });
    const imagePreview = screen.queryByRole('img', {
      name: /image preview/i,
    });

    expect(imagePreviewHeading).not.toBeInTheDocument();
    expect(imagePreview).not.toBeInTheDocument();
  });

  it('should render an image URL input that accepts input', async () => {
    const { user } = renderNewPostPage();
    const text = 'Super cool image!';

    const imageURLInput = await screen.findByRole('textbox', {
      name: /image url/i,
    });
    await user.type(imageURLInput, text);

    expect(imageURLInput.value).toBe(text);
  });
});
