import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/cn';

/** Wordmark + mark. The mark sits on a white tile so the dark logo reads on dark. */
export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="LeakSonic home"
      className={cn('flex items-center gap-2.5', className)}
    >
      <span
        className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-tile bg-white"
        aria-hidden
      >
        <Image
          src="/LeakSonicMark.png"
          alt=""
          width={32}
          height={32}
          className="h-full w-full object-contain p-0.5"
          priority
        />
      </span>
      <span className="text-lg font-bold tracking-tight text-ink">
        Leak<span className="text-accent">Sonic</span>
      </span>
    </Link>
  );
}
