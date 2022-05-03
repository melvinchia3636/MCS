import React from 'react';

function NotFound() {
  return (
    <div className="py-12 min-h-[52vh] px-16 text-zinc-700 dark:text-white transition-all duration-500">
      <h1 className="font-medium text-4xl mb-3 text-amber-400">404: Not Found</h1>
      <p className="text-lg tracking-wide"> &quot;I tried really hard. I really did! But I couldn&apos;t find what you asked for.&quot; :( </p>
    </div>
  );
}

export default NotFound;
