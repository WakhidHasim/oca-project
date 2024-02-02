import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Verifikasi from './pages/Auth/Verifikasi';
import Dashboard from './pages/Dashboard/Dashboard';
import Layout from './components/Navigation/Layout';
import DataPPh21Shortcut from './pages/Dashboard/ShortcutDataPPh21';
import PanduanInformasi from './pages/Panduan/PanduanPPh';
import DataKegiatanPPh21 from './pages/PPh21/DataKegiatanPPh21';
import TambahData from './pages/PPh21/TambahDataKegiatan';
import DetailPenerima from './pages/PPh21/DetailPenerima';
import TambahDataPenerima from './pages/PPh21/TambahDataPenerima';
import EditKegiatan from './pages/PPh21/EditKegiatan';
import DataKegiatan23 from './pages/PPh23/DataKegiatan23';
import TambahDataKegiatan from './pages/PPh23/TambahDataKegiatan';
import DataKegiatanPPh4 from './pages/PPh 4/DataKegiatanPPh4';
import TambahKegiatan4 from './pages/PPh 4/TambahKegiatan4';
import DataInventaris from './pages/Inventaris Pajak/DataInventaris';
import TambahInventaris from './pages/Inventaris Pajak/TambahInventaris';
import DataWPOP from './pages/Registrasi WP/WPOP/DataWPOP';
import TambahWPOP from './pages/Registrasi WP/WPOP/TambahWPOP';
import EditWPOP from './pages/Registrasi WP/WPOP/EditWPOP';
import DataWPBU from './pages/Registrasi WP/WPBU/DataWPBU';
import VerifikasiWPOP from './pages/Registrasi WP/Verifikasi/VerifikasiWPOP';
import EditKegiatan23 from './pages/PPh23/EditKegiatan23';
import EditKegiatan4 from './pages/PPh 4/EditKegiatan4';
import EditInventaris from './pages/Inventaris Pajak/EditInventaris';
import TambahWPBU from './pages/Registrasi WP/WPBU/TambahWPBU';
import EditWPBU from './pages/Registrasi WP/WPBU/EditWPBU';
import DetailPanduanPPh21 from './pages/Panduan/DetailPanduanPPh21';
import DetailPanduanPPh23 from './pages/Panduan/DetailPanduanPPh23';
import DetailPanduanPPh4 from './pages/Panduan/DetailPanduanPPh4';
import EditPenerima from './pages/PPh21/EditPenerima';

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path='/' element={<Login />} />
        <Route path='/verifikasi' element={<Verifikasi />} />
        <Route
          path='/dashboard'
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path='/panduan'
          element={
            <Layout>
              <PanduanInformasi />
            </Layout>
          }
        />

        <Route
          path='/detailPanduan21'
          element={
            <Layout>
              <DetailPanduanPPh21 />
            </Layout>
          }
        />

        <Route
          path='/detailPanduan23'
          element={
            <Layout>
              <DetailPanduanPPh23 />
            </Layout>
          }
        />

        <Route
          path='/detailPanduan4'
          element={
            <Layout>
              <DetailPanduanPPh4 />
            </Layout>
          }
        />

        {/* PPH 21 */}
        <Route
          path='/PPh21Shortcut'
          element={
            <Layout>
              <DataPPh21Shortcut />
            </Layout>
          }
        />

        <Route
          path='/dataKegiatan21'
          element={
            <Layout>
              <DataKegiatanPPh21 />
            </Layout>
          }
        />

        <Route
          path='/dataKegiatan21/tambahKegiatan21'
          element={
            <Layout>
              <TambahData />
            </Layout>
          }
        />

        <Route
          path='/dataKegiatan21/editKegiatan21'
          element={
            <Layout>
              <EditKegiatan />
            </Layout>
          }
        />

        <Route
          path='/detailPenerima21'
          element={
            <Layout>
              <DetailPenerima />
            </Layout>
          }
        />

        <Route
          path='/tambahPenerima21'
          element={
            <Layout>
              <TambahDataPenerima />
            </Layout>
          }
        />

        <Route
          path='/editPenerima21'
          element={
            <Layout>
              <EditPenerima />
            </Layout>
          }
        />

        {/* PPH 23 */}
        <Route
          path='/dataKegiatan23'
          element={
            <Layout>
              <DataKegiatan23 />
            </Layout>
          }
        />

        <Route
          path='/tambahKegiatan23'
          element={
            <Layout>
              <TambahDataKegiatan />
            </Layout>
          }
        />

        <Route
          path='/editKegiatan23'
          element={
            <Layout>
              <EditKegiatan23 />
            </Layout>
          }
        />

        {/* PPH 4 */}
        <Route
          path='/kegiatanPPh4'
          element={
            <Layout>
              <DataKegiatanPPh4 />
            </Layout>
          }
        />

        <Route
          path='/tambahkegiatanPPh4'
          element={
            <Layout>
              <TambahKegiatan4 />
            </Layout>
          }
        />

        <Route
          path='/editkegiatanPPh4'
          element={
            <Layout>
              <EditKegiatan4 />
            </Layout>
          }
        />

        {/* Inventaris Pajak */}
        <Route
          path='/inventaris'
          element={
            <Layout>
              <DataInventaris />
            </Layout>
          }
        />

        <Route
          path='/tambahinventaris'
          element={
            <Layout>
              <TambahInventaris />
            </Layout>
          }
        />

        <Route
          path='/editinventaris'
          element={
            <Layout>
              <EditInventaris />
            </Layout>
          }
        />

        {/* WPOP */}
        <Route
          path='/registerWP/dataWPOP'
          element={
            <Layout>
              <DataWPOP />
            </Layout>
          }
        />
        <Route
          path='/tambahWPOP'
          element={
            <Layout>
              <TambahWPOP />
            </Layout>
          }
        />

        <Route
          path='/editWPOP'
          element={
            <Layout>
              <EditWPOP />
            </Layout>
          }
        />

        {/* WPBU */}
        <Route
          path='/registerWP/dataWPBU'
          element={
            <Layout>
              <DataWPBU />
            </Layout>
          }
        />

        <Route
          path='/tambahWPBU'
          element={
            <Layout>
              <TambahWPBU />
            </Layout>
          }
        />

        <Route
          path='/editWPBU'
          element={
            <Layout>
              <EditWPBU />
            </Layout>
          }
        />

        {/* Verifikasi WPOP */}
        <Route
          path='/verifikasiWPOP'
          element={
            <Layout>
              <VerifikasiWPOP />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
