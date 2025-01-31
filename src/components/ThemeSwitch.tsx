import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { StyledThemeSwitch } from '../styles/Footer.styled';
import type { ThemeValue } from '../types';

type ThemeSwitchProps = {
  theme: ThemeValue;
  setTheme: React.Dispatch<React.SetStateAction<ThemeValue>>;
};

function ThemeSwitch({ theme, setTheme }: ThemeSwitchProps) {
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
      aria-label="Theme Switch"
      title={theme !== 'light' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="theme-switch"
    >
      {theme !== 'light' ? <MdLightMode /> : <MdDarkMode />}
    </StyledThemeSwitch>
  );
}
export default ThemeSwitch;
