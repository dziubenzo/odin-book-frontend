import 'react-router-dom';
import * as hooks from '../hooks';
import type { ThemeValue, User } from '../types';

export const mockUseUserAndTheme = (
  user: User,
  theme: ThemeValue = 'dark',
  setTheme?: () => void,
) => {
  return vi.spyOn(hooks, 'useUserAndTheme').mockReturnValue({
    user,
    setUser: vi.fn(),
    theme,
    setTheme: setTheme ? setTheme : vi.fn(),
  });
};
