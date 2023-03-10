import React from "react";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://yummy-recipes-backend.onrender.com/auth/login/",
        {
          username,
          password,
        }
      );

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      lable="Login"
      onSubmit={onSubmit}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://yummy-recipes-backend.onrender.com/auth/register/",
        {
          username,
          password,
        }
      );
      alert("Registration Completed! Please Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      lable="Register"
      onSubmit={onSubmit}
    />
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  lable,
  onSubmit,
}) => {
  return (
    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2>{lable}</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
        </div>
        <button type="submit">{lable}</button>
      </form>
    </div>
  );
};

export default Auth;
