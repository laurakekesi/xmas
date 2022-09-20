import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './Homepage';
import Navbar from './Navbar';
import GlobalStyles from './styles/GlobalStyles';

const App = () => {
  return (
  <BrowserRouter>
  <GlobalStyles/>
  <Navbar/>
    <Routes>
      <Route path='/' element={<Homepage />}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
