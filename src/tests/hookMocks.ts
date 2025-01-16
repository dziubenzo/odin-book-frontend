import 'react-router-dom';
import * as hooks from '../hooks';
import type { User } from '../types';

export const mockUseUserAndTheme = (
  user: User,
  theme = 'dark',
  setTheme?: () => void,
) => {
  return vi.spyOn(hooks, 'useUserAndTheme').mockReturnValue({
    user,
    setUser: vi.fn(),
    theme,
    setTheme: setTheme ? setTheme : vi.fn(),
  });
};
