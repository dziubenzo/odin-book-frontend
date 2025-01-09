import { StyledFooterRight } from '../styles/Footer.styled';
import type { User } from '../types';
import Avatar from './Avatar';

type FooterRightProps = {
  user: User;
};

function FooterRight({ user }: FooterRightProps) {
  return (
    <StyledFooterRight>
      <Avatar object={user} size={50} type="user" />
      <p className="username">{user.username}</p>
    </StyledFooterRight>
  );
}

export default FooterRight;
