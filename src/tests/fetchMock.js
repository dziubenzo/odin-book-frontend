/* eslint-disable no-undef */

export const mockFetch = (data, ok) => {
  return vi.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
      ok: ok,
    }),
  );
};
