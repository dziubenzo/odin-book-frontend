import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useUserAndTheme } from '../hooks';
import { StyledStickyIcon } from '../styles/App.styled';

function ThemeSwitch() {
  const { theme, setTheme } = useUserAndTheme();

  function handleThemeSwitchClick() {
    if (localStorage.getItem('theme') === 'dark') {
      setTheme('light');
      return localStorage.setItem('theme', 'light');
    }
    setTheme('dark');
    return localStorage.setItem('theme', 'dark');
  }

  return (
    <StyledStickyIcon
      onClick={handleThemeSwitchClick}
      aria-label="Theme Switch"
      title={theme !== 'light' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="theme-switch"
    >
      {theme !== 'light' ? <MdLightMode /> : <MdDarkMode />}
    </StyledStickyIcon>
  );
}
export default ThemeSwitch;
