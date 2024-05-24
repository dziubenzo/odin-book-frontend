import { StyledFooterCentre } from '../styles/Footer.styled';

import { DiGithubBadge } from 'react-icons/di';

function FooterCentre() {
  return (
    <StyledFooterCentre>
      <p>by</p>
      <p className="dev-name">dziubenzo</p>
      <a
        href="https://github.com/dziubenzo/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Developer's GitHub page, opens in new tab"
      >
        <DiGithubBadge />
      </a>
    </StyledFooterCentre>
  );
}

export default FooterCentre;
