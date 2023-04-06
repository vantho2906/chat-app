import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
// import Chat from './pages';
import Login from './pages/Login';
import ConfirmOTP from './pages/ConfirmOTP';
import SetAvatar from './pages/SetAvatar';
import { createContext, useEffect } from 'react';
import PageRender from './PageRender';
import { Alert } from './components/alert/Alert';
import { useDispatch } from 'react-redux';
import { refreshToken } from './redux/actions/authAction';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);
  return (
    <Router>
      <Alert />
      <Routes>
        {/* <Route path="/register" element={<Register />} />
        <Route path="/register/confirmOTP" element={<ConfirmOTP />} />
        <Route path="/register/avatar" element={<SetAvatar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} /> */}
        <Route path="/" element={<PageRender />} />
        <Route path="/:page" element={<PageRender />} />
        <Route path="/:page/:slug" element={<PageRender />} />
      </Routes>
    </Router>
  );
}

export default App;
