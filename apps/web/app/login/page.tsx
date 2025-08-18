'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';

export default function LoginPage() {
  const supabase = createClient();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  const signIn = () => supabase.auth.signInWithOAuth({ provider: 'github' });
  const signOut = () => supabase.auth.signOut();

  return (
    <div>
      {session ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <button onClick={signIn}>Sign in with GitHub</button>
      )}
    </div>
  );
}
