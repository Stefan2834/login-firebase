import '../index.css';
import {AuthProvider} from '../contexts/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Connect from './Connect';

function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' index element={<Dashboard />} />
            <Route path='/connect' element={<Connect />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  );
}
export default App;
