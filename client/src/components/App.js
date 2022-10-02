import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './Homepage';
import Navbar from './Navbar';
import GlobalStyles from './styles/GlobalStyles';

const App = () => {
  const date = "December, 25, 2022";

  return (
  <BrowserRouter>
  <GlobalStyles/>
  <Navbar date = {date}/>
    <Routes>
      <Route path='/' element={<Homepage />}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
