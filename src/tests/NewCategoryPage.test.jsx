/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';

import NewCategoryPage from '../pages/NewCategoryPage';
import Theme from '../components/Theme';
import { userEvent } from '@testing-library/user-event';
import {
  MIN_CATEGORY_NAME_LENGTH,
  MAX_CATEGORY_NAME_LENGTH,
  MIN_CATEGORY_DESCRIPTION_LENGTH,
  MAX_CATEGORY_DESCRIPTION_LENGTH,
} from '../helpers';
import { longDescription } from './mocks';
import { mockFetch } from './fetchMock';

const navigateFn = vi.fn();

function renderNewCategoryPage() {
  const user = userEvent.setup();

  // Mock useNavigate
  vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useNavigate: () => navigateFn,
    };
  });

  render(
    <Theme>
      <NewCategoryPage />
    </Theme>,
  );

  return user;
}

describe('NewCategoryForm', () => {
  it('should render a New Category heading', () => {
    renderNewCategoryPage();

    const newCategoryHeading = screen.getByRole('heading', {
      name: /new category/i,
    });

    expect(newCategoryHeading).toBeInTheDocument();
  });

  it('should render a name input that accepts input', async () => {
    const user = renderNewCategoryPage();
    const input = 'New Category Name';

    const nameInput = screen.getByRole('textbox', {
      name: /name/i,
    });
    await user.type(nameInput, input);

    expect(nameInput).toBeInTheDocument();
    expect(nameInput.value).toBe(input);
  });

  it('should render a name input that cannot exceed MAX_CATEGORY_NAME_LENGTH', async () => {
    const user = renderNewCategoryPage();
    const longInput = 'I am a waaay, waaay, waaay too long category name, hi!';

    const nameInput = screen.getByRole('textbox', {
      name: /name/i,
    });
    await user.type(nameInput, longInput);

    expect(nameInput.value).not.toBe(longInput);
    expect(nameInput.value.length).toBe(MAX_CATEGORY_NAME_LENGTH);
  });

  it('should render a name input that has different text colour if the number of characters is less than MIN_CATEGORY_NAME_LENGTH', async () => {
    const user = renderNewCategoryPage();
    const shortInput = '!!';

    const nameInput = screen.getByRole('textbox', {
      name: /name/i,
    });
    await user.clear(nameInput);
    await user.type(nameInput, shortInput);

    expect(nameInput.value.length).toBeLessThan(MIN_CATEGORY_NAME_LENGTH);
    expect(nameInput).toHaveClass('short-warning');
  });

  it('should render a name input that has normal text colour if the number of characters is at least MIN_CATEGORY_NAME_LENGTH', async () => {
    const user = renderNewCategoryPage();
    const normalInput = 'Super Cool Category Name';

    const nameInput = screen.getByRole('textbox', {
      name: /name/i,
    });
    await user.clear(nameInput);
    await user.type(nameInput, normalInput);

    expect(nameInput.value.length).toBeGreaterThanOrEqual(
      MIN_CATEGORY_NAME_LENGTH,
    );
    expect(nameInput).not.toHaveClass('short-warning');
  });

  it('should render a name label that shows the correct number of characters left', async () => {
    const user = renderNewCategoryPage();
    const input = 'Four';

    const nameLabel = screen.getByText(
      new RegExp(`${MAX_CATEGORY_NAME_LENGTH} characters`),
    );
    const nameInput = screen.getByRole('textbox', {
      name: /name/i,
    });

    expect(nameLabel).toBeInTheDocument();

    await user.type(nameInput, input);

    expect(nameLabel.textContent).toMatch(
      new RegExp(`${MAX_CATEGORY_NAME_LENGTH - input.length} characters`),
    );
  });

  it('should render a description textbox that accepts input', async () => {
    const user = renderNewCategoryPage();
    const input = 'New Category Description';

    const descriptionTextbox = screen.getByRole('textbox', {
      name: /description/i,
    });
    await user.type(descriptionTextbox, input);

    expect(descriptionTextbox).toBeInTheDocument();
    expect(descriptionTextbox.value).toBe(input);
  });

  it('should render a description textbox that cannot exceed MAX_CATEGORY_DESCRIPTION_LENGTH', async () => {
    const user = renderNewCategoryPage();

    const descriptionTextbox = screen.getByRole('textbox', {
      name: /description/i,
    });
    await user.type(descriptionTextbox, longDescription);

    expect(descriptionTextbox.value).not.toBe(longDescription);
    expect(descriptionTextbox.value.length).toBe(
      MAX_CATEGORY_DESCRIPTION_LENGTH,
    );
  });

  it('should render a description textbox that has different text colour if the number of characters is less than MIN_CATEGORY_DESCRIPTION_LENGTH', async () => {
    const user = renderNewCategoryPage();
    const shortInput = ':)';

    const descriptionTextbox = screen.getByRole('textbox', {
      name: /description/i,
    });
    await user.clear(descriptionTextbox);
    await user.type(descriptionTextbox, shortInput);

    expect(descriptionTextbox.value.length).toBeLessThan(
      MIN_CATEGORY_DESCRIPTION_LENGTH,
    );
    expect(descriptionTextbox).toHaveClass('short-warning');
  });

  it('should render a name input that has normal text colour if the number of characters is at least MIN_CATEGORY_NAME_LENGTH', async () => {
    const user = renderNewCategoryPage();
    const normalInput = 'Totally normal category description';

    const descriptionTextbox = screen.getByRole('textbox', {
      name: /description/i,
    });
    await user.clear(descriptionTextbox);
    await user.type(descriptionTextbox, normalInput);

    expect(descriptionTextbox.value.length).toBeGreaterThanOrEqual(
      MIN_CATEGORY_DESCRIPTION_LENGTH,
    );
    expect(descriptionTextbox).not.toHaveClass('short-warning');
  });

  it('should render a description label that shows the correct number of characters left', async () => {
    const user = renderNewCategoryPage();
    const input = 'A really interesting description, you feel hooked?';

    const descriptionLabel = screen.getByText(
      new RegExp(`${MAX_CATEGORY_DESCRIPTION_LENGTH} characters`),
    );
    const descriptionTextbox = screen.getByRole('textbox', {
      name: /description/i,
    });

    expect(descriptionLabel).toBeInTheDocument();

    await user.type(descriptionTextbox, input);

    expect(descriptionLabel.textContent).toMatch(
      new RegExp(
        `${MAX_CATEGORY_DESCRIPTION_LENGTH - input.length} characters`,
      ),
    );
  });
});

describe('NewCategoryPage', () => {
  it('should render a Default Icon heading', () => {
    renderNewCategoryPage();

    const defaultIconHeading = screen.getByRole('heading', {
      name: /default icon/i,
    });

    expect(defaultIconHeading).toBeInTheDocument();
  });

  it('should render a default icon', () => {
    renderNewCategoryPage();

    const defaultIcon = screen.getByRole('img', {
      name: /default category icon/i,
    });

    expect(defaultIcon).toBeInTheDocument();
  });

  it('should render an upload icon label', () => {
    renderNewCategoryPage();

    const uploadIconLabel = screen.getByText(/your own icon/i);

    expect(uploadIconLabel).toBeInTheDocument();
  });

  it('should remove the default icon section and add the icon preview section if an image is uploaded', async () => {
    const user = renderNewCategoryPage();
    const imageFile = new File(
      ['cutecategoryimagetrusttrust!'],
      'category_icon.png',
      {
        type: 'image/png',
      },
    );
    // Mock createObjectURL method
    global.URL.createObjectURL = vi.fn(() => 'category_icon.png');

    const fileInput = screen.getByTestId('avatar-picker');
    await user.upload(fileInput, imageFile);

    const defaultIcon = screen.queryByRole('img', {
      name: /default category icon/i,
    });
    const iconPreviewHeading = screen.getByRole('heading', {
      name: /icon preview/i,
    });
    const uploadedIconImg = screen.getByRole('img', {
      name: /uploaded icon/i,
    });
    const clearButton = screen.getByRole('button', { name: /clear/i });

    expect(defaultIcon).not.toBeInTheDocument();
    expect(iconPreviewHeading).toBeInTheDocument();
    expect(uploadedIconImg).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
  });

  it('should not accept a file other than an image', async () => {
    const user = renderNewCategoryPage();
    const nonImageFile = new File(
      ["I chew, you're tasty!"],
      'another_nasty_virus.rar',
      {
        type: 'application/vnd.rar',
      },
    );

    const fileInput = screen.getByTestId('avatar-picker');
    await user.upload(fileInput, nonImageFile);

    const defaultIconHeading = screen.queryByRole('heading', {
      name: /default icon/i,
    });
    const iconPreviewHeading = screen.queryByRole('heading', {
      name: /icon preview/i,
    });

    expect(defaultIconHeading).toBeInTheDocument();
    expect(iconPreviewHeading).not.toBeInTheDocument();
  });

  it('should render a Create Category Button', () => {
    renderNewCategoryPage();

    const createCategoryButton = screen.getByRole('button', {
      name: /create/i,
    });

    expect(createCategoryButton).toBeInTheDocument();
  });

  it('should render an error message if something goes wrong with creating a category', async () => {
    const user = renderNewCategoryPage();
    const error = 'Oh no, this is bad!';
    mockFetch(error, false);

    const nameInput = screen.getByRole('textbox', {
      name: /name/i,
    });
    const descriptionTextbox = screen.getByRole('textbox', {
      name: /description/i,
    });
    const createCategoryButton = screen.getByRole('button', {
      name: /create/i,
    });
    await user.type(nameInput, 'Some category name');
    await user.type(descriptionTextbox, 'Some category description');
    await user.click(createCategoryButton);
    const errorMessage = screen.getByText(new RegExp(error));

    expect(errorMessage).toBeInTheDocument();
  });

  it('should render a category created section if a new category is created successfully', async () => {
    const user = renderNewCategoryPage();
    mockFetch({}, true);

    const nameInput = screen.getByRole('textbox', {
      name: /name/i,
    });
    const descriptionTextbox = screen.getByRole('textbox', {
      name: /description/i,
    });
    const createCategoryButton = screen.getByRole('button', {
      name: /create/i,
    });
    await user.type(nameInput, 'Category');
    await user.type(descriptionTextbox, 'Some category description');
    await user.click(createCategoryButton);
    const successMessage = screen.getByText(/created successfully/i);

    expect(successMessage).toBeInTheDocument();
  });

  it('should redirect to the new category page if a new category is created successfully', async () => {
    const user = renderNewCategoryPage();
    const input = 'Category';
    mockFetch({}, true);
    // Mock setTimeout
    global.setTimeout = vi.fn((cb) => cb());

    const nameInput = screen.getByRole('textbox', {
      name: /name/i,
    });
    const descriptionTextbox = screen.getByRole('textbox', {
      name: /description/i,
    });
    const createCategoryButton = screen.getByRole('button', {
      name: /create/i,
    });
    await user.type(nameInput, input);
    await user.type(descriptionTextbox, 'Some category description');
    await user.click(createCategoryButton);

    expect(navigateFn).toHaveBeenCalledWith(
      `/categories/${input.toLowerCase()}`,
    );
  });
});
