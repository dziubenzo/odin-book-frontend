/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Theme from '../components/Theme';
import LoginModal from '../components/LoginModal';

function renderComponent() {
  const user = userEvent.setup();
  render(
    <Theme>
      <LoginModal />
    </Theme>,
  );
  return user;
}

test('clicking on the close modal icon should call a function that closes the Log In modal', async () => {
  const user = userEvent.setup();
  const mockRef = {
    current: document.createElement('dialog'),
  };
  HTMLDialogElement.prototype.close = vi.fn();
  render(
    <Theme>
      <LoginModal loginModalRef={mockRef} />
    </Theme>,
  );

  const closeIcon = screen.getByTitle('Close');
  await user.click(closeIcon);

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

  const passwordField = screen.getByLabelText(/password/i);
  await user.click(passwordField);
  await user.keyboard('mypassword');

  expect(passwordField.value).toBe('mypassword');
});
