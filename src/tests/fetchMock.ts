/* eslint-disable no-undef */

export const mockFetch = (data: unknown, ok: boolean) => {
  const response = new Response(JSON.stringify(data), {
    status: ok ? 200 : 500,
  });
  return vi
    .spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve(response));
};
