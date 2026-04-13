import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/login', async ({ request }) => {
    const { email, password } = (await request.json()) as any;

    if (email === 'user@example.com' && password === 'password123') {
      return HttpResponse.json({
        user: { id: '1', email: 'user@example.com', name: 'Test User' },
        token: 'fake-jwt-token',
      });
    }

    return new HttpResponse(null, { status: 401 });
  }),
];
