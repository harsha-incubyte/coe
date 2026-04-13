import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/login', async ({ request }) => {
    const { email, password } = (await request.json()) as any;

    if (email === 'harsha@incubyte.co' && password === 'password123') {
      return HttpResponse.json({
        user: { id: '1', email: 'harsha@incubyte.co', name: 'Harsha' },
        token: 'fake-jwt-token',
      });
    }

    return new HttpResponse(null, { status: 401 });
  }),
];
