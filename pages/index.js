import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import Head from 'next/head';

export default function Bailey() {
  const { data: session } = useSession();
  const [section, setSection] = useState('dashboard');
  const nav = ['dashboard','tasks','appointments','habits','spending','goals','journal','vault'];
  return (
    <>
      <Head><title>Bailey Tracker</title></Head>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:-apple-system,Inter,sans-serif;background:#f5f5f7}
        .app{display:flex;height:100vh;overflow:hidden}
        nav{width:220px;background:#1c1c1e;display:flex;flex-direction:column;padding:20px 0;flex-shrink:0}
        .brand{padding:0 16px 16px;border-bottom:1px solid rgba(255,255,255,0.07);margin-bottom:8px}
        .brand h1{font-size:17px;font-weight:600;color:#fff}
        .brand p{font-size:11px;color:rgba(255,255,255,0.25);margin-top:2px}
        .ni{display:flex;align-items:center;gap:10px;padding:8px 16px;margin:0 8px;border-radius:8px;cursor:pointer;color:rgba(255,255,255,0.45);font-size:13px;transition:all 0.15s}
        .ni:hover{background:rgba(255,255,255,0.06);color:#fff}
        .ni.active{background:rgba(255,255,255,0.1);color:#fff}
        .nb{margin-top:auto;padding:14px 16px;border-top:1px solid rgba(255,255,255,0.07)}
        .sb{width:100%;padding:9px;background:#4285f4;border:none;color:#fff;border-radius:8px;cursor:pointer;font-size:12px;font-family:inherit}
        .so{width:100%;padding:7px;background:rgba(255,255,255,0.08);border:none;color:rgba(255,255,255,0.5);border-radius:8px;cursor:pointer;font-size:11px;font-family:inherit;margin-top:6px}
        main{flex:1;padding:32px;overflow-y:auto}
        h2{font-size:28px;font-weight:700;letter-spacing:-0.8px;margin-bottom:24px}
        .card{background:#fff;border-radius:14px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06);margin-bottom:14px}
        .card h3{font-size:11px;font-weight:600;color:#6e6e73;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:12px}
        .ok{color:#1a7f3c;font-weight:500}
        .dim{font-size:13px;color:#6e6e73;margin-top:8px}
      `}</style>
      <div className="app">
        <nav>
          <div className="brand"><h1>Bailey</h1><p>Personal Tracker</p></div>
          {nav.map(s => (
            <div key={s} className={`ni${section===s?' active':''}`} onClick={()=>setSection(s)}>
              {s.charAt(0).toUpperCase()+s.slice(1)}
            </div>
          ))}
          <div className="nb">
            {session ? (
              <div>
                <div style={{fontSize:11,color:'#30d158',marginBottom:6}}>✓ Google Calendar synced</div>
                <div style={{fontSize:10,color:'rgba(255,255,255,0.3)',marginBottom:8}}>{session.user?.email}</div>
                <button className="so" onClick={()=>signOut()}>Sign out</button>
              </div>
            ) : (
              <button className="sb" onClick={()=>signIn('google')}>Sync Google Calendar</button>
            )}
          </div>
        </nav>
        <main>
          <h2>{section.charAt(0).toUpperCase()+section.slice(1)}</h2>
          <div className="card">
            <h3>Status</h3>
            <p className="ok">Bailey Tracker is live! 🎉</p>
            {session && <p className="dim">Google Calendar connected for {session.user?.email}</p>}
            {!session && <p className="dim">Click "Sync Google Calendar" in the sidebar to connect your calendar.</p>}
          </div>
          <div className="card">
            <h3>Next Steps</h3>
            <p className="dim">Complete the Google OAuth setup to enable calendar sync, then the full Bailey app will be loaded here.</p>
          </div>
        </main>
      </div>
    </>
  );
}