import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { userLogin, userSignUp } from "../redux/userSlice";
import Loading from "../components/Loading";

function LoginScreen() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [img, setImg] = useState("");
  const history = useHistory();
  const [check, setCheck] = useState(true);
  const { isLoading, isError, user, message } = useSelector(
    (state) => state.user
  );
  const singIn = (e) => {
    e.preventDefault();
    if (username.length == 0 || password.length == 0) {
      alert("Vui lòng nhập đầy đủ thông tin");
    } else {
      const user = {
        username: username,
        passwd: password,
      };
      dispatch(userLogin(user));
    }
  };
  const singUp = (e) => {
    e.preventDefault();
    if (
      username.length == 0 ||
      password.length == 0 ||
      confirmPassword.length == 0 ||
      img.length == 0
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
    } else if (password === confirmPassword) {
      const user = {
        username: username,
        passwd: password,
        img: img,
      };
      dispatch(userSignUp(user));
    } else {
      alert("Mật khẩu không khớp");
    }
  };
  useEffect(() => {
    if (user.username) history.push("/");
  }, [isLoading]);
  return (
    <Container>
      <LoadingContainer>{isLoading && <Loading />}</LoadingContainer>
      {check ? (
        <Content>
          <label>Login Account</label>
          <h4>
            Don't have account?{" "}
            <a href="#" onClick={() => setCheck(false)}>
              Sign up
            </a>
          </h4>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" onClick={singIn}>
            Sign In
          </button>
          {isError && <span>Tài khoản hoặc mật khẩu chưa đúng</span>}
        </Content>
      ) : (
        <Content>
          <label>Create Account</label>
          <h4>
            Already have an account?{" "}
            <a href="#" onClick={() => setCheck(true)}>
              Sign in
            </a>
          </h4>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Url Avatar"
            onChange={(e) => setImg(e.target.value)}
            required
          />
          <button type="submit" onClick={singUp}>
            Sign Up
          </button>
          {isError ? <span>{message}</span> : <Success>{message}</Success>}
        </Content>
      )}
    </Container>
  );
}

export default LoginScreen;
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;
`;
const Success = styled.p`
  color: #28c943;
`;
const Content = styled.form`
  width: max-content;
  margin: 0 auto;
  margin-top: -60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  -webkit-box-shadow: 1px 3px 13px 6px #3480eb;
  box-shadow: 1px 3px 13px 6px #3480eb;
  border-radius: 10px;
  label {
    font-size: 24px;
    margin-bottom: 4px;
    margin-top: 10px;
    font-weight: bold;
  }
  input {
    width: 200px;
    height: 28px;
    outline: none;
    margin-top: 20px;
    border-radius: 4px;
    border: none;
    border: 1px solid #111;
    padding: 4px;
    transition: border 0.25s linear;
    &:focus {
      border: 1px solid #3480eb;
    }
  }
  span {
    color: red;
  }
  button {
    background-color: #3480eb;
    border: none;
    margin-top: 20px;
    margin-bottom: 10px;
    padding: 10px;
    color: #fff;
    border-radius: 4px;
    width: 100px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;
const LoadingContainer = styled.div`
  width: 50px;
  height: 50px;
`;
