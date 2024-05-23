/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { mockFetch } from './fetchMock';

import Theme from '../components/Theme';
import SignupModal from '../components/SignupModal';

function renderComponent() {
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

test('clicking on the close modal icon should call a function that closes the Sign Up modal', async () => {
  const user = renderComponent();

  const closeIcon = screen.getByTitle('Close');
  await user.click(closeIcon);

  expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1);
});

test('clicking outside the modal should call a function that closes the Sign Up modal', async () => {
  const user = renderComponent();

  const modal = screen.getByRole('dialog', { hidden: true });
  await user.click(modal);

  expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1);
});

test('Username field should accept input', async () => {
  const user = renderComponent();

  const usernameField = screen.getByLabelText(/username/i);
  await user.click(usernameField);
  await user.keyboard('myusername');

  expect(usernameField.value).toBe('myusername');
});

test('Password field should accept input', async () => {
  const user = renderComponent();

  const passwordField = screen.getByLabelText('Password');
  await user.click(passwordField);
  await user.keyboard('mypassword');

  expect(passwordField.value).toBe('mypassword');
});

test('Confirm Password field should accept input', async () => {
  const user = renderComponent();

  const confirmPasswordField = screen.getByLabelText(/confirm password/i);
  await user.click(confirmPasswordField);
  await user.keyboard('confirmpassword');

  expect(confirmPasswordField.value).toBe('confirmpassword');
});

test('Sign Up button should be visible on render', () => {
  renderComponent();

  const signUpButton = screen.getByRole('button', { hidden: true });

  expect(signUpButton).not.toHaveStyle({ visibility: 'hidden' });
});

test('Sign Up button should not submit the form if the form is not filled out', async () => {
  const user = renderComponent();
  const fetchMock = mockFetch('I should not be called!', false);

  const signUpButton = screen.getByRole('button', { hidden: true });
  await user.click(signUpButton);

  expect(fetchMock).not.toHaveBeenCalled();
});

test('an error message should be shown and the Sign Up button should be invisible on form submission with incorrect credentials', async () => {
  const user = renderComponent();
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
  const user = renderComponent();
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
