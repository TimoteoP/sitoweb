"use client";

import { usePathname } from 'next/navigation';
import Footer from '@/components/Footer';

export default function FooterWrapper() {
  const pathname = usePathname() || '';
  const currentPage = pathname.startsWith('/privacy-policy')
    ? 'privacy-policy'
    : pathname.startsWith('/cookie-policy')
    ? 'cookie-policy'
    : undefined;
  return <Footer currentPage={currentPage} />;
}

