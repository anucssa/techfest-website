'use client';
import { useState } from 'react';
import Icon from './Icon';
import { BASE_PATH } from '@/lib/data';

export default function ShareButton({ title, path }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = `${window.location.origin}${BASE_PATH}${path}`;
    if (navigator.share) {
      try { await navigator.share({ title, url }); return; } catch {}
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button type="button" onClick={share} className="btn-ghost text-sm">
      <Icon name="share" className="h-4 w-4" /> {copied ? 'Link copied' : 'Share'}
    </button>
  );
}
