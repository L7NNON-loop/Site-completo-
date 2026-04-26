'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const items = [
  ['Dashboard', '/dashboard'],
  ['Serviços', '/services'],
  ['Logs', '/logs'],
  ['Usuários', '/users'],
  ['Crash', '/games/crash'],
  ['Docs', '/docs']
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-b bg-card p-4 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <h1 className="mb-4 text-lg font-bold">Server-ia Admin</h1>
      <nav className="grid gap-2">
        {items.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className={cn('rounded px-3 py-2 text-sm', pathname === href ? 'bg-primary text-white' : 'hover:bg-accent')}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
