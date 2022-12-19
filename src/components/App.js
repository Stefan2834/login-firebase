import '../index.css';
import SignUp from './SignUp';
import {AuthProvider} from '../contexts/AuthContext';
import { HashRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'

function App() {
  return (
      <HashRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' index element={<Dashboard />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </AuthProvider>
      </HashRouter>
  );
}
export default App;
