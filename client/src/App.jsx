import './sass/App.scss';
import { Test } from './components/styleTest';
import { httpHealthCheck, httpFeed } from './api/requests';

function App() {
  // httpHealthCheck();

  httpFeed();
  return (
    <div className='App'>
      <Test />
      {/* <div className='container grid grid-max grid-bg grid-height'>
        <div className='col-12 bg-crimson'></div>
        <div className='col-2 bg-green'></div>
        <div className='col-1 bg-blue'></div>
        <div className='col-3 bg-yellow'></div>
        <div className='col-12 bg-pink'></div>
      </div> */}
    </div>
  );
}

export default App;
