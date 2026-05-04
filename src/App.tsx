import { useState } from 'react';
import { api } from './services/api';
import Showcase from './components/Showcase';
import AdminLogin from './components/AdminLogin';
import Admin from './components/Admin';

type Page = 'showcase' | 'login' | 'admin';

export default function App() {
  const [page, setPage] = useState<Page>(api.isLoggedIn() ? 'admin' : 'showcase');

  if (page === 'showcase') return <Showcase onAdmin={() => setPage('login')} />;
  if (page === 'login') return <AdminLogin onSuccess={() => setPage('admin')} onBack={() => setPage('showcase')} />;
  return <Admin onBack={() => { api.logout(); setPage('showcase'); }} />;
}
