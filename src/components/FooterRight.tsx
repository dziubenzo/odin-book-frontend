import { StyledFooterRight } from '../styles/Footer.styled';
import type { ThemeValue, User } from '../types';
import Avatar from './Avatar';
import ThemeSwitch from './ThemeSwitch';

type FooterRightProps = {
  user: User;
  theme: ThemeValue;
  setTheme: React.Dispatch<React.SetStateAction<ThemeValue>>;
};

function FooterRight({ user, theme, setTheme }: FooterRightProps) {
  return (
    <StyledFooterRight>
      <ThemeSwitch theme={theme} setTheme={setTheme} />
      <div className="user-info-footer">
        <Avatar object={user} size={50} type="user-no-popover" />
        <p className="username">{user.username}</p>
      </div>
    </StyledFooterRight>
  );
}

export default FooterRight;
