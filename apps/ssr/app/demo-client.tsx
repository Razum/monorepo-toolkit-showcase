"use client";

import { useMemo, useState } from "react";
import { Badge, Button, Card } from "@repo/ui";
import { debounce } from "@repo/toolkit/utils";
import { useDebouncedValue } from "@repo/toolkit/hooks";

export function DemoClient() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 350);
  const [flushCount, setFlushCount] = useState(0);

  const bumpFlushCount = useMemo(
    () =>
      debounce(() => {
        setFlushCount((c) => c + 1);
      }, 350),
    [],
  );

  return (
    <Card
      title="Client island"
      footer={
        <div className="flex flex-wrap gap-2">
          <Badge tone="neutral">Debounced query: {debouncedQuery || "—"}</Badge>
          <Badge tone="success">Flush clicks (debounced): {flushCount}</Badge>
        </div>
      }
    >
      <div className="grid gap-3">
        <label className="grid gap-1 text-sm text-zinc-700 dark:text-zinc-300">
          <span className="font-medium">Search products (client)</span>
          <input
            className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to debounce…"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="secondary" size="sm" onClick={() => bumpFlushCount()}>
            Debounced increment
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              bumpFlushCount.flush();
            }}
          >
            Flush now
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => bumpFlushCount.cancel()}>
            Cancel pending
          </Button>
        </div>
      </div>
    </Card>
  );
}
