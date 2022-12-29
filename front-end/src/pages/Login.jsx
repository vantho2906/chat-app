import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    phone: '',
    password: '',
  });

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  useEffect(() => {
    const handleGetItems = async () => {
      const data = await JSON.parse(localStorage.getItem('chat-app-user'));
      if (data) {
        navigate('/');
      }
    };
    handleGetItems();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (handleValidation()) {
      const { phone, password } = values;
      try {
        const data = await axios.post(loginRoute, {
          phone,
          password,
        });
        if (data.status === 200) {
          localStorage.setItem('chat-app-user', JSON.stringify(data.data.data));
          navigate('/');
        }
      } catch (err) {
        toast.error('Wrong phone number or password', toastOptions);
      }
    }
  };

  const handleValidation = () => {
    const { phone, password } = values;
    if (password === '') {
      toast.error('Username and Password is required', toastOptions);
      return false;
    } else if (phone === '') {
      toast.error('Username and Password is required', toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={e => handleSubmit(e)}>
          <div className="brand">
            <h1>Chap-app</h1>
          </div>
          <input
            type="tel"
            placeholder="Phone"
            name="phone"
            onChange={e => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={e => handleChange(e)}
          />

          <button type="submit">Login</button>
          <span>
            Don't have an account ? <Link to="/register">Register</Link>{' '}
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  witdh: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(to bottom left, #79c7c5 40%, #f9fbff 100%);
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    h1 {
      color: #777777;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: background-color: rgba(161, 226, 217, 0.5);
    box-shadow: -5px 5px 10px rgb(119 119 119 / 50%);
    border-radius: 1rem;
    padding: 2rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #777777;
      color: #000;
      border-radius: 0.4rem;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #000000;
        outline: none;
      }
    }
    button {
      padding: 1rem 2rem;
      border: none;
      border-radius: 0.4rem;
      cursor: pointer;
      text-transform: uppercase;
      font-weight: bold;
      &:hover {
        opacity: 0.8;
      }
    }
    span {
      font-weight: bold;
      text-transform: uppercase;
      a {
        text-decoration: none;
      }
    }
  }
`;

export default Login;
