import { useMemo, useState } from 'react'
import axios from 'axios'

import type { Product, User } from '@repo/types'
import { Badge, Button, Card } from '@repo/ui'
import { debounce } from '@repo/toolkit/utils'
import { useDebouncedValue } from '@repo/toolkit/hooks'

import './App.css'

/**
 * `axios` stays installed on purpose: `.syncpackrc.json` bans it so `npm run syncpack:lint`
 * demonstrates dependency policy enforcement. Prefer `fetch` in production code.
 */
void axios

const users: User[] = [
  {
    id: 'u_spa_1',
    name: 'Jordan Patel',
    email: 'jordan@example.com',
    role: 'admin',
    createdAt: '2026-03-01T10:15:00.000Z',
  },
  {
    id: 'u_spa_2',
    name: 'Taylor Rivera',
    email: 'taylor@example.com',
    role: 'member',
    createdAt: '2026-03-18T16:40:00.000Z',
  },
]

const products: Product[] = [
  {
    id: 'p_spa_1',
    name: 'Ultra-wide monitor',
    description: 'Perfect for dashboards and dual-pane editors.',
    price: 549,
    category: 'displays',
    inStock: true,
  },
  {
    id: 'p_spa_2',
    name: 'Desk mat',
    description: 'Large surface with stitched edges.',
    price: 39,
    category: 'desk',
    inStock: true,
  },
]

function App() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query, 300)

  const [tapCount, setTapCount] = useState(0)
  const bumpTaps = useMemo(
    () =>
      debounce(() => {
        setTapCount((c) => c + 1)
      }, 250),
    [],
  )

  const filteredProducts = products.filter((p) =>
    debouncedQuery.trim()
      ? p.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      : true,
  )

  return (
    <div className="demo-root">
      <header className="demo-header">
        <div>
          <p className="demo-kicker">Vite + React</p>
          <h1>Turborepo demo (SPA)</h1>
          <p className="demo-lede">
            Consumes compiled outputs from <code>@repo/ui</code>,{' '}
            <code>@repo/toolkit</code>, and shared contracts from{' '}
            <code>@repo/types</code>.
          </p>
          <div className="demo-row">
            <Badge tone="success">Workspace packages</Badge>
            <Badge tone="warning">axios kept for Syncpack demo</Badge>
          </div>
        </div>

        <div className="demo-row wrap">
          <Button type="button">Primary</Button>
          <Button type="button" variant="secondary">
            Secondary
          </Button>
          <Button type="button" variant="ghost">
            Ghost
          </Button>
        </div>
      </header>

      <section className="demo-grid">
        <Card
          title="Debounced search"
          footer={
            <span className="demo-muted">
              Live query: <strong>{query || '—'}</strong> · Debounced:{' '}
              <strong>{debouncedQuery || '—'}</strong>
            </span>
          }
        >
          <label className="demo-field">
            <span>Filter products</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try typing quickly…"
            />
          </label>
          <div className="demo-stack">
            {filteredProducts.map((p) => (
              <div key={p.id} className="demo-item">
                <div>
                  <div className="demo-item-title">{p.name}</div>
                  <div className="demo-muted">{p.description}</div>
                </div>
                <div className="demo-row">
                  <Badge tone={p.inStock ? 'success' : 'warning'}>
                    {p.inStock ? 'In stock' : 'Limited'}
                  </Badge>
                  <span className="demo-price">${p.price}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="debounce() — cancel / flush"
          footer={
            <div className="demo-row wrap">
              <Badge tone="neutral">Committed taps: {tapCount}</Badge>
            </div>
          }
        >
          <p className="demo-muted">
            Rapid clicks coalesce; use <strong>Flush</strong> to apply immediately,
            or <strong>Cancel</strong> to drop the pending call.
          </p>
          <div className="demo-row wrap">
            <Button type="button" variant="secondary" onClick={() => bumpTaps()}>
              Debounced tap
            </Button>
            <Button type="button" variant="ghost" onClick={() => bumpTaps.flush()}>
              Flush
            </Button>
            <Button type="button" variant="ghost" onClick={() => bumpTaps.cancel()}>
              Cancel
            </Button>
          </div>
        </Card>
      </section>

      <section className="demo-grid">
        {users.map((u) => (
          <Card
            key={u.id}
            title={u.name}
            footer={
              <div className="demo-row wrap">
                <Badge role={u.role}>{u.role}</Badge>
                <span className="demo-muted">{u.email}</span>
              </div>
            }
          >
            <p className="demo-muted">Joined {new Date(u.createdAt).toLocaleDateString()}</p>
          </Card>
        ))}
      </section>
    </div>
  )
}

export default App
