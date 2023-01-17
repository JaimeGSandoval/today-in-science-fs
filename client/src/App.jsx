import { Routes, Route } from 'react-router-dom';
import Centered from './components/Centered/Centered';
import { HomeView } from './views/HomeView';
import { ArticlesView } from './views/ArticlesView/ArticlesView';
import { DashboardView } from './views/DashboardView';
import { SignupView, LoginView } from './views/AuthViews';
import { Header } from './components/Header';
import { NoRouteView } from './views/NoRouteView/NoRouteView';

function App() {
  return (
    <div className='App'>
      <Centered>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<HomeView />} />
            <Route path='/signup' element={<SignupView />} />
            <Route path='/login' element={<LoginView />} />
            <Route path='/dashboard' element={<DashboardView />} />
            <Route path='/articles/:articlesType' element={<ArticlesView />} />
            <Route path='*' element={<NoRouteView />} />
          </Routes>
        </main>
      </Centered>
    </div>
  );
}

export default App;
