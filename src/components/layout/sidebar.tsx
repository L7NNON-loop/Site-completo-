'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';
import { cn } from '@/lib/utils';

const items = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Serviços', href: '/services' },
  { label: 'Logs', href: '/logs' },
  { label: 'Usuários', href: '/users' },
  { label: 'Crash', href: '/games/crash' },
  { label: 'Docs', href: '/docs' }
] as const satisfies ReadonlyArray<{ label: string; href: Route }>;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-b bg-card p-4 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <h1 className="mb-4 text-lg font-bold">Server-ia Admin</h1>
      <nav className="grid gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'rounded px-3 py-2 text-sm',
              pathname === item.href ? 'bg-primary text-white' : 'hover:bg-accent'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
