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

export const taskHandlers = [
  http.get('/api/tasks', async () => {
    await delay(500);
    // Get tasks from sessionStorage to simulate persistence across refreshes
    const stored = sessionStorage.getItem('mock-tasks');
    const tasks = stored ? JSON.parse(stored) : [
      { id: '1', title: 'Setup Day 07 Route', completed: true },
      { id: '2', title: 'Learn Zustand Persistence', completed: true },
      { id: '3', title: 'Master React Query Mutations', completed: false },
    ];
    return HttpResponse.json(tasks);
  }),

  http.post('/api/tasks', async ({ request }) => {
    await delay(1000);
    const { title } = (await request.json()) as { title: string };
    const newTask = { id: Math.random().toString(36).substring(2, 9), title, completed: false };
    
    const stored = sessionStorage.getItem('mock-tasks');
    const tasks = stored ? JSON.parse(stored) : [];
    sessionStorage.setItem('mock-tasks', JSON.stringify([...tasks, newTask]));
    
    return HttpResponse.json(newTask, { status: 201 });
  }),

  http.patch('/api/tasks/:id', async ({ params, request }) => {
    await delay(800);
    const { id } = params;
    const { completed } = (await request.json()) as { completed: boolean };
    
    const stored = sessionStorage.getItem('mock-tasks');
    let tasks = stored ? JSON.parse(stored) : [];
    tasks = tasks.map((t: { id: string; completed: boolean }) => t.id === id ? { ...t, completed } : t);
    sessionStorage.setItem('mock-tasks', JSON.stringify(tasks));

    return HttpResponse.json({ id, completed });
  }),
];

export const chatHandlers = [
  http.post('/api/chat', async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const text = "This is a **mocked** medical response from the simulated Gemma 2 backend.\\n\\n### Disclaimer\\n> I am an AI, not a doctor. Please consult a qualified healthcare provider for any medical concerns.\\n\\nHere is a simple breakdown:\\n\\n| Symptom | Potential Cause | Action |\\n| --- | --- | --- |\\n| Persistent Cough | Allergies, Infection | Rest, hydration |\\n| High Fever | Flu, Infection | Seek medical care if > 103°F |\\n\\n```javascript\\n// Mock token calculation\\nconst tokens = text.length / 4;\\n```\\n";
        
        const words = text.split(' ');
        
        // Wait to simulate processing time (shows typing indicator)
        await delay(1500);
        
        for (const word of words) {
          const chunk = JSON.stringify({ choices: [{ delta: { content: word + ' ' } }] });
          controller.enqueue(encoder.encode(`data: ${chunk}\n\n`));
          await delay(50); // Fast stream
        }
        
        // Simulate usage token payload (custom extension for tracking)
        const finalChunk = JSON.stringify({ 
          usage: { prompt_tokens: 24, completion_tokens: words.length, total_tokens: 24 + words.length }
        });
        controller.enqueue(encoder.encode(`data: ${finalChunk}\n\n`));
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      }
    });

    return new HttpResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      }
    });
  })
];

export const handlers = [...authHandlers, ...weatherHandlers, ...taskHandlers, ...chatHandlers];
