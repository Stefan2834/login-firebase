import '../index.css';
import { useEffect } from 'react';
import {AuthProvider} from '../contexts/AuthContext';
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import Connect from './Connect';
import Main from './Main';
import Navbar from './Important/Navbar';

const Layout = () => (
  <>
  <Navbar />
  <Outlet />
  </>
)
const GoTo = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/main');
  }, []);
  return (<></>)
}
const NotFound = () => (
  <>Pagina in lucru, sau link gresit.</>
)

function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' index element={<GoTo />} />
            <Route path='/connect' element={<Connect />} />
            <Route path='/main' element={<Layout />} >
              <Route exact index element={<Main />} />
            </Route>
            <Route path='*' index element={<NotFound />} />
          </Routes>

        </AuthProvider>
      </BrowserRouter>
  );
}
export default App;
