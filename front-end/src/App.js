import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import PageRender from './PageRender';
import { Alert } from './components/alert/Alert';
import { useDispatch } from 'react-redux';
import { refreshToken } from './redux/actions/authAction';
import { useQuery } from 'react-query';
import { getUsers } from './apis/user.api';

function App() {
  const dispatch = useDispatch();
  const { data } = useQuery({
    queryKey: ['getUsers'],
    queryFn: () => getUsers(),
    staleTime: 10 * (60 * 1000),
    cacheTime: 15 * (60 * 1000),
  });

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
