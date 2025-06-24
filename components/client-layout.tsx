'use client';
import React from 'react';
import LoadingScreen from './loading-screen';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setLoading(false);
  }, []);
  const [showContent, setShowContent] = React.useState(false);
  React.useEffect(() => {
    if (!loading) {
      setTimeout(() => setShowContent(true), 2300);
    }
  }, [loading]);
  return (
    <>
      {loading || !showContent ? <LoadingScreen /> : children}
    </>
  );
} 