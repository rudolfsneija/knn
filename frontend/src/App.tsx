import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Aktualitates } from './pages/Aktualitates';
import { AktualitateDetail } from './pages/AktualitateDetail';
import { Pakalpojumi } from './pages/Pakalpojumi';
import { Preces } from './pages/Preces';
import { PreceDetail } from './pages/PreceDetail';
import { ParUznemumu } from './pages/ParUznemumu';
import { Sazinai } from './pages/Sazinai';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminAktualitates } from './pages/admin/AdminAktualitates';
import { AdminPreces } from './pages/admin/AdminPreces';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="aktualitates" element={<Aktualitates />} />
            <Route path="aktualitates/:id" element={<AktualitateDetail />} />
            <Route path="pakalpojumi" element={<Pakalpojumi />} />
            <Route path="preces" element={<Preces />} />
            <Route path="preces/:id" element={<PreceDetail />} />
            <Route path="par-uznemumu" element={<ParUznemumu />} />
            <Route path="sazinai" element={<Sazinai />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/aktualitates" element={<AdminAktualitates />} />
          <Route path="/admin/preces" element={<AdminPreces />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
