import * as hooks from '../hooks';
import type { User } from '../types';

export const mockUseUserAndTheme = (user: User) => {
  return vi.spyOn(hooks, 'useUserAndTheme').mockReturnValue({
    user,
    setUser: vi.fn(),
    theme: 'light',
    setTheme: vi.fn(),
  });
};
