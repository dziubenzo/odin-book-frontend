/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';

import FooterLeft from '../components/FooterLeft';
import FooterCentre from '../components/FooterCentre';
import FooterRight from '../components/FooterRight';
import Theme from '../components/Theme';
import { BrowserRouter } from 'react-router-dom';

import { superUser } from './mocks';

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
