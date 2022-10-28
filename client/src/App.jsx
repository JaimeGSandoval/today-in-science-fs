import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { Header } from './components/Header';
import Signup from './views/Signup';
import Login from './views/Login';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
