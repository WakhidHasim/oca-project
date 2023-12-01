import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Verifikasi from './pages/Verifikasi';
import Dashboard from './pages/Dashboard';
import Layout from './components/Navigation/Layout';
import DataPPh21Shortcut from "./pages/DataPPh21Shortcut";


function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Login />} 
        />
        <Route 
          path="/verifikasi" 
          element={<Verifikasi />} 
        />
        <Route 
          path="/dashboard" 
          element={
            <Layout> 
              <Dashboard />
            </Layout>} 
        />
        <Route 
          path='/PPh21Shortcut'
          element={
            <Layout>
              <DataPPh21Shortcut />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
