import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { StyledThemeSwitch } from '../styles/ProfilePage.styled';
import { useOutletContext } from 'react-router-dom';

function ThemeSwitch() {
  const { theme, setTheme } = useOutletContext();

  function handleThemeSwitchClick() {
    if (localStorage.getItem('theme') === 'dark') {
      setTheme('light');
      return localStorage.setItem('theme', 'light');
    }
    setTheme('dark');
    return localStorage.setItem('theme', 'dark');
  }

  return (
    <StyledThemeSwitch
      onClick={handleThemeSwitchClick}
      title={theme !== 'light' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      tabIndex={0}
      data-testid="theme-switch"
    >
      {theme !== 'light' ? <MdLightMode /> : <MdDarkMode />}
    </StyledThemeSwitch>
  );
}
export default ThemeSwitch;
