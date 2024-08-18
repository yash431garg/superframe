'use client';
import Link from 'next/link';
import { DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react-core';

export default function Header() {
  const { user } = useDynamicContext();

  return (
    <div
      className={`flex flex-row justify-between items-center p-2 md:p-5`}
      style={{
        boxShadow: `inset 0 0 0.5px 1px hsla(0, 0%,
                100%, 0.075),
            0 0 0 1px hsla(0, 0%, 0%, 0.05),
            0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),
            0 0.9px 1.5px hsla(0, 0%, 0%, 0.045),
            0 3.5px 6px hsla(0, 0%, 0%, 0.09)`,
      }}
    >
      <Link href="/" className="text-2xl md:text-4xl text-white">
        Superframes
      </Link>
      <div className="flex items-center space-x-2">
        {user && (
          <>
            {' '}
            <Link
              href="/"
              className="border px-2 md:px-4 py-1 md:py-2 rounded-md text-sm md:text-base text-white"
            >
              All Frames
            </Link>
            <Link
              href="/add"
              className="border px-2 md:px-4 py-1 md:py-2 rounded-md text-sm md:text-base text-white"
            >
              Create Frame
            </Link>
          </>
        )}
        <DynamicWidget />
      </div>
    </div>
  );
}
