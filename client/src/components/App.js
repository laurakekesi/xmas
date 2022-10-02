import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './Homepage';
import Navbar from './Navbar';
import Budget from './Budget';
import GlobalStyles from './styles/GlobalStyles';

const App = () => {
  const date = "December, 25, 2022";

  return (
  <BrowserRouter>
  <GlobalStyles/>
  <Navbar date = {date}/>
    <Routes>
      <Route path='/' element={<Homepage />}/>
      <Route path='/budget' element={<Budget/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
