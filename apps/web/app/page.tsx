'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabaseClient';

export default function Page() {
  const supabase = createClient();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
  }, [supabase]);

  const signIn = () => supabase.auth.signInWithOAuth({ provider: 'github' });
  const signOut = () => supabase.auth.signOut().then(() => setSession(null));

  return (
    <main>
      {session ? (
        <>
          <p>{session.user.email}</p>
          <button onClick={signOut}>Sign out</button>
          <a href="/drill">ドリル開始</a>
        </>
      ) : (
        <button onClick={signIn}>Sign in with GitHub</button>
      )}
    </main>
  );
}
