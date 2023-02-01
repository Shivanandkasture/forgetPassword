import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Signup from '../src/components/Signup'
import Home from './components/Home';
import Resetpassword from './components/RestPassword';
import ForgotPassword from './components/ResetPassword2'

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />}> </Route>
      <Route exact path='/register' element={<Signup />}> </Route>

      <Route exact path='/login' element={<Login />}> </Route>
      <Route exact path='/sendpasswordlink' element={<Resetpassword />}> </Route>
      <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} />
      {/* <Route path="*" element={<Error />} /> */}

    </Routes>
  );
}

export default App;
