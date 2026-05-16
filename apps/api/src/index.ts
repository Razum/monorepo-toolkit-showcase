import { serve } from '@hono/node-server';
import { debounce } from '@repo/toolkit/utils';
import type { ApiResponse, HealthStatus, Product, User } from '@repo/types';
import { Hono } from 'hono';

const app = new Hono();

const startedAt = Date.now();

/** Shared utility demo: debounced logging (flush/cancel available at runtime). */
const logDebounced = debounce((line: string) => {
  console.log(`[api] ${line}`);
}, 400);

const users: User[] = [
  {
    id: 'u_1',
    name: 'Asha Cohen',
    email: 'asha@example.com',
    role: 'admin',
    createdAt: '2026-01-10T12:00:00.000Z',
  },
  {
    id: 'u_2',
    name: 'Noah Kim',
    email: 'noah@example.com',
    role: 'member',
    createdAt: '2026-02-02T09:30:00.000Z',
  },
];

const products: Product[] = [
  {
    id: 'p_1',
    name: 'Mechanical Keyboard',
    description: 'Tactile switches, hot-swappable PCB.',
    price: 149.99,
    category: 'peripherals',
    inStock: true,
  },
  {
    id: 'p_2',
    name: 'USB-C Hub',
    description: 'HDMI, Ethernet, and extra ports.',
    price: 79.5,
    category: 'accessories',
    inStock: false,
  },
];

function jsonOk<T>(data: T, message?: string): ApiResponse<T> {
  return {
    data,
    success: true,
    message,
    timestamp: new Date().toISOString(),
  };
}

app.get('/health', (c) => {
  logDebounced('GET /health');
  const payload: ApiResponse<HealthStatus> = jsonOk({
    status: 'ok',
    version: '0.0.0-demo',
    uptime: Date.now() - startedAt,
    timestamp: new Date().toISOString(),
  });
  return c.json(payload);
});

app.get('/users', (c) => {
  logDebounced(`GET /users (${users.length})`);
  return c.json(jsonOk(users));
});

app.get('/products', (c) => {
  logDebounced(`GET /products (${products.length})`);
  return c.json(jsonOk(products));
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`API listening on http://localhost:${info.port}`);
  },
);
