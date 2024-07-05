/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import WelcomePage from '../pages/WelcomePage';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import Theme from '../components/Theme';

import { mockFetch } from './fetchMock';

function renderWelcomePage() {
  const user = userEvent.setup();
  HTMLDialogElement.prototype.showModal = vi.fn();
  render(
    <BrowserRouter>
      <WelcomePage />
    </BrowserRouter>,
  );
  return user;
}

function renderLoginModal() {
  const user = userEvent.setup();
  const mockRef = {
    current: document.createElement('dialog'),
  };
  HTMLDialogElement.prototype.close = vi.fn();
  render(
    <BrowserRouter>
      <Theme>
        <LoginModal
          loginModalRef={mockRef}
          setUsername={vi.fn()}
          setPassword={vi.fn()}
        />
      </Theme>
    </BrowserRouter>,
  );
  return user;
}

function renderSignupModal() {
  const user = userEvent.setup();
  const signUpRefMock = {
    current: document.createElement('dialog'),
  };
  const logInRefMock = {
    current: document.createElement('dialog'),
  };
  HTMLDialogElement.prototype.close = vi.fn();
  HTMLDialogElement.prototype.showModal = vi.fn();
  render(
    <Theme>
      <SignupModal
        signupModalRef={signUpRefMock}
        loginModalRef={logInRefMock}
        setUsername={vi.fn()}
        setPassword={vi.fn()}
      />
    </Theme>,
  );
  return user;
}

describe('WelcomePage', () => {
  test('Log In and Sign Up buttons should be visible', async () => {
    renderWelcomePage();

    const logInButton = await screen.findByRole('button', { name: /log in/i });
    const signUpButton = await screen.findByRole('button', {
      name: /sign up/i,
    });

    expect(logInButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });

  test('clicking on the Log In button should call a function that opens the Log In modal', async () => {
    const user = renderWelcomePage();

    const logInButton = await screen.findByRole('button', { name: /log in/i });
    await user.click(logInButton);

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1);
  });

  test('clicking on the Sign Up button should call a function that opens the Sign Up modal', async () => {
    const user = renderWelcomePage();

    const signUpButton = await screen.findByRole('button', {
      name: /sign up/i,
    });
    await user.click(signUpButton);

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1);
  });
});

describe('LoginModal', () => {
  test('clicking on the close modal icon should call a function that closes the Log In modal', async () => {
    const user = renderLoginModal();

    const closeIcon = screen.getByTitle('Close');
    await user.click(closeIcon);

    expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1);
  });

  test('clicking outside the modal should call a function that closes the Log In modal', async () => {
    const user = renderLoginModal();

    // Modal is hidden by default, hence hidden: true
    const modal = screen.getByRole('dialog', { hidden: true });
    await user.click(modal);

    expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1);
  });

  test('Username field should accept input', async () => {
    const user = renderLoginModal();

    const usernameField = screen.getByLabelText(/username/i);
    await user.click(usernameField);
    await user.keyboard('myusername');

    expect(usernameField.value).toBe('myusername');
  });

  test('Password field should accept input', async () => {
    const user = renderLoginModal();

    const passwordField = screen.getByLabelText(/password/i);
    await user.click(passwordField);
    await user.keyboard('mypassword');

    expect(passwordField.value).toBe('mypassword');
  });

  test('Log In button should be visible on render', () => {
    renderLoginModal();

    const logInButton = screen.getByRole('button', { hidden: true });

    expect(logInButton).not.toHaveStyle({ visibility: 'hidden' });
  });

  test('Log In button should not submit the form if the form is not filled out', async () => {
    const user = renderLoginModal();
    const fetchMock = mockFetch('I should not be called!', false);

    const logInButton = screen.getByRole('button', { hidden: true });
    await user.click(logInButton);

    expect(fetchMock).not.toHaveBeenCalled();
  });

  test('an error message should be shown and the Log In button should be invisible on form submission with incorrect credentials', async () => {
    const user = renderLoginModal();
    const fetchMock = mockFetch('invalid username', false);

    const usernameField = screen.getByLabelText(/username/i);
    const passwordField = screen.getByLabelText(/password/i);
    usernameField.value = 'myusername';
    passwordField.value = 'mypassword';

    const logInButton = screen.getByRole('button', { hidden: true });
    await user.click(logInButton);
    const errorMessage = await screen.findByText(/invalid username/i);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(logInButton).toHaveStyle({ visibility: 'hidden' });
    expect(errorMessage).toBeInTheDocument();
  });
});

describe('SignupModal', () => {
  test('clicking on the close modal icon should call a function that closes the Sign Up modal', async () => {
    const user = renderSignupModal();

    const closeIcon = screen.getByTitle('Close');
    await user.click(closeIcon);

    expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1);
  });

  test('clicking outside the modal should call a function that closes the Sign Up modal', async () => {
    const user = renderSignupModal();

    const modal = screen.getByRole('dialog', { hidden: true });
    await user.click(modal);

    expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1);
  });

  test('Username field should accept input', async () => {
    const user = renderSignupModal();

    const usernameField = screen.getByLabelText(/username/i);
    await user.click(usernameField);
    await user.keyboard('myusername');

    expect(usernameField.value).toBe('myusername');
  });

  test('Password field should accept input', async () => {
    const user = renderSignupModal();

    const passwordField = screen.getByLabelText('Password');
    await user.click(passwordField);
    await user.keyboard('mypassword');

    expect(passwordField.value).toBe('mypassword');
  });

  test('Confirm Password field should accept input', async () => {
    const user = renderSignupModal();

    const confirmPasswordField = screen.getByLabelText(/confirm password/i);
    await user.click(confirmPasswordField);
    await user.keyboard('confirmpassword');

    expect(confirmPasswordField.value).toBe('confirmpassword');
  });

  test('Sign Up button should be visible on render', () => {
    renderSignupModal();

    const signUpButton = screen.getByRole('button', { hidden: true });

    expect(signUpButton).not.toHaveStyle({ visibility: 'hidden' });
  });

  test('Sign Up button should not submit the form if the form is not filled out', async () => {
    const user = renderSignupModal();
    const fetchMock = mockFetch('I should not be called!', false);

    const signUpButton = screen.getByRole('button', { hidden: true });
    await user.click(signUpButton);

    expect(fetchMock).not.toHaveBeenCalled();
  });

  test('an error message should be shown and the Sign Up button should be invisible on form submission with incorrect credentials', async () => {
    const user = renderSignupModal();
    const fetchMock = mockFetch('invalid username', false);

    const usernameField = screen.getByLabelText(/username/i);
    const passwordField = screen.getByLabelText('Password');
    const confirmPasswordField = screen.getByLabelText(/confirm password/i);
    usernameField.value = 'myusername';
    passwordField.value = 'mypassword';
    confirmPasswordField.value = 'mypassword';

    const signUpButton = screen.getByRole('button', { hidden: true });
    await user.click(signUpButton);
    const errorMessage = await screen.findByText(/invalid username/i);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(signUpButton).toHaveStyle({ visibility: 'hidden' });
    expect(errorMessage).toBeInTheDocument();
  });

  test('a function to close the Sign Up modal and a function to show the Log In modal should be called on form submission with correct credentials', async () => {
    const user = renderSignupModal();
    const fetchMock = mockFetch(
      { username: 'validusername', password: 'validpassword' },
      true,
    );

    const usernameField = screen.getByLabelText(/username/i);
    const passwordField = screen.getByLabelText('Password');
    const confirmPasswordField = screen.getByLabelText(/confirm password/i);
    usernameField.value = 'validusername';
    passwordField.value = 'validpassword';
    confirmPasswordField.value = 'idonotmatter';

    const signUpButton = screen.getByRole('button', { hidden: true });
    await user.click(signUpButton);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1);
  });
});
