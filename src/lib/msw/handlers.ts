import { http, HttpResponse, delay } from 'msw';

interface LoginRequestBody {
  email: string;
  password: string;
}

export const authHandlers = [
  http.post('/api/login', async ({ request }) => {
    const { email, password } = (await request.json()) as LoginRequestBody;

    if (email === 'harsha@incubyte.co' && password === 'password123') {
      return HttpResponse.json({
        user: { id: '1', email: 'harsha@incubyte.co', name: 'Harsha' },
        token: 'fake-jwt-token',
      });
    }

    return new HttpResponse(null, { status: 401 });
  }),
];

export const weatherHandlers = [
  http.get('https://geocoding-api.open-meteo.com/v1/search', async ({ request }) => {
    await delay(100);
    const url = new URL(request.url);
    const name = url.searchParams.get('name');

    if (name?.toLowerCase().startsWith('lond')) {
      return HttpResponse.json({
        results: [
          { 
            id: 1, 
            name: 'London', 
            latitude: 51.5085, 
            longitude: -0.1257, 
            timezone: 'Europe/London', 
            country: 'United Kingdom', 
            admin1: 'England' 
          },
          { 
            id: 10, 
            name: 'London', 
            latitude: 42.9834, 
            longitude: -81.233, 
            timezone: 'America/Toronto', 
            country: 'Canada', 
            admin1: 'Ontario' 
          }
        ],
      });
    }

    if (name === 'Pune') {
      return HttpResponse.json({
        results: [
          { 
            id: 2, 
            name: 'Pune', 
            latitude: 18.5204, 
            longitude: 73.8567, 
            timezone: 'Asia/Kolkata', 
            country: 'India', 
            admin1: 'Maharashtra' 
          }
        ],
      });
    }

    return HttpResponse.json({ results: [] });
  }),
  http.get('https://api.open-meteo.com/v1/forecast', async ({ request }) => {
    await delay(100);
    const url = new URL(request.url);
    const lat = url.searchParams.get('latitude');

    if (lat === '51.5085') {
      return HttpResponse.json({
        current_weather: { temperature: 15, weathercode: 1, is_day: 1 },
      });
    }

    if (lat === '18.5204') {
      return HttpResponse.json({
        current_weather: { temperature: 32, weathercode: 0, is_day: 1 },
      });
    }

    return new HttpResponse(null, { status: 404 });
  }),
];

export const handlers = [...authHandlers, ...weatherHandlers];
