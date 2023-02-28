import '../index.css';
import {AuthProvider} from '../contexts/AuthContext';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
// import PrivateRoute from './PrivateRoute';
// import Dashboard from './Dashboard'
import Connect from './Connect';
import Main from './Main';
import Navbar from './Important/Navbar';

const Layout = () => (
  <>
  <Navbar />
  <Outlet />
  </>
)

function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* <PrivateRoute path='/' index>
              <Dashboard />
            </PrivateRoute> */}
            <Route path='/' index element={<Connect />} />
            <Route path='/connect' element={<Connect />} />
            <Route path='/main' element={<Layout />} >
              <Route exact index element={<Main />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  );
}
export default App;
