import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="container-site py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="h-section mt-2">Flag not found</h1>
      <p className="mx-auto mt-4 max-w-md text-slate-600 dark:text-slate-300">
        This page doesn&apos;t exist — but the festival does.
      </p>
      <Link href="/" className="btn-trail mt-8">Back to the Tech Fest</Link>
    </div>
  );
}
