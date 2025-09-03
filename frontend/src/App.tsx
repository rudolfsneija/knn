import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Aktualitates } from './pages/Aktualitates';
import { AktualitateDetail } from './pages/AktualitateDetail';
import { Pakalpojumi } from './pages/Pakalpojumi';
import { Preces } from './pages/Preces';
import { PreceDetail } from './pages/PreceDetail';
import { ParUznemumu } from './pages/ParUznemumu';
import { Sazinai } from './pages/Sazinai';
import { BezvaduTiklaKonfigurators } from './pages/BezvaduTiklaKonfigurators';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminAktualitates } from './pages/admin/AdminAktualitates';
import { AdminPreces } from './pages/admin/AdminPreces';
import { NklPrasibuRealizesana } from './pages/services/NklPrasibuRealizesana';
import { ItDrosibasApmacibas } from './pages/services/ItDrosibasApmacibas';
import { BezvaduWifiRisinajumi } from './pages/services/BezvaduWifiRisinajumi';
import { VideonoveroSistemas } from './pages/services/VideonoveroSistemas';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="aktualitates" element={<Aktualitates />} />
              <Route path="aktualitates/:id" element={<AktualitateDetail />} />
              <Route path="pakalpojumi" element={<Pakalpojumi />} />
              <Route path="pakalpojumi/nkl-prasibu-realizesana" element={<NklPrasibuRealizesana />} />
              <Route path="pakalpojumi/it-drosibas-apmacibas" element={<ItDrosibasApmacibas />} />
              <Route path="pakalpojumi/bezvadu-wifi-risinajumi" element={<BezvaduWifiRisinajumi />} />
              <Route path="pakalpojumi/videonovero-sistemas" element={<VideonoveroSistemas />} />
              <Route path="preces" element={<Preces />} />
              <Route path="preces/:id" element={<PreceDetail />} />
              <Route path="bezvadu-tikla-konfigurators" element={<BezvaduTiklaKonfigurators />} />
              <Route path="par-uznemumu" element={<ParUznemumu />} />
              <Route path="sazinai" element={<Sazinai />} />
            </Route>

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/aktualitates" element={
              <ProtectedRoute>
                <AdminAktualitates />
              </ProtectedRoute>
            } />
            <Route path="/admin/preces" element={
              <ProtectedRoute>
                <AdminPreces />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
