import Image from "next/image";

import type { Product } from "@repo/types";
import { Badge, Button, Card } from "@repo/ui";

import { DemoClient } from "./demo-client";

const products: Product[] = [
  {
    id: "p_ssr_1",
    name: "Noise‑cancelling headphones",
    description: "Great for deep work sessions.",
    price: 199,
    category: "audio",
    inStock: true,
  },
  {
    id: "p_ssr_2",
    name: "4K webcam",
    description: "Sharp picture for calls and streams.",
    price: 129,
    category: "video",
    inStock: false,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-5xl flex-col gap-8 px-6 py-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={110}
              height={22}
              priority
            />
            <div className="flex flex-wrap gap-2">
              <Badge tone="success">SSR</Badge>
              <Badge tone="neutral">@repo/ui</Badge>
              <Badge tone="neutral">@repo/types</Badge>
              <Badge tone="neutral">@repo/toolkit</Badge>
            </div>
            <h1 className="max-w-xl text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Monorepo demo: shared packages + SSR data
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              This page renders typed <span className="font-medium text-zinc-950 dark:text-zinc-50">Product</span>{" "}
              models from <span className="font-medium text-zinc-950 dark:text-zinc-50">@repo/types</span>, styled with{" "}
              <span className="font-medium text-zinc-950 dark:text-zinc-50">@repo/ui</span>.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button">Primary</Button>
            <Button type="button" variant="secondary">
              Secondary
            </Button>
            <Button type="button" variant="ghost">
              Ghost
            </Button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {products.map((p) => (
            <Card
              key={p.id}
              title={p.name}
              footer={
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge tone="neutral">{p.category}</Badge>
                    {p.inStock ? <Badge tone="success">In stock</Badge> : <Badge tone="warning">Backorder</Badge>}
                  </div>
                  <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">${p.price.toFixed(2)}</span>
                </div>
              }
            >
              <p>{p.description}</p>
            </Card>
          ))}
        </div>

        <DemoClient />
      </main>
    </div>
  );
}
