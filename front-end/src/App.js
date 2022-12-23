import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Login from './pages/Login';
import ConfirmOTP from './pages/ConfirmOTP';
import SetAvatar from './pages/SetAvatar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/register/confirmOTP" element={<ConfirmOTP />} />
        <Route path="/register/avatar" element={<SetAvatar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
