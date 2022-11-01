import { Routes, Route } from 'react-router-dom';
import Centered from './components/Centered/Centered';
import { Signup } from './views/Signup';
import Login from './views/Login';
import { Home } from './views/Home';

function App() {
  return (
    <div className='App'>
      <Centered>
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </main>
      </Centered>
    </div>
  );
}

export default App;
