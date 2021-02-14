import React, { useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import KakaoLogin from "react-kakao-login";
import { signIn } from "modules/loginSlice";
import { Box, Button, makeStyles } from "@material-ui/core";
import loginButtonImage from "resources/images/kakao_login_large_narrow.png";

const token = "4d3093214b6fa6d7a83a304b794a96e1";

const useStyles = makeStyles({
  loginButton: {
    width: "366px",
    height: "90px",
    transform: "scale(0.7)",
    backgroundImage: `url(${loginButtonImage})`
  }
});

const LoginPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const { data:loginData, error } = useSelector((state) => state.login);

  useEffect(() => {
    if (error) {
      alert("로그인 실패");
    }
  }, [error])

  const successLogin = (res) => {
    dispatch(signIn({
      id: res.profile.id,
      nickname: res.profile.properties.nickname,
      email: res.profile.kakao_account.email
    }));
  };

  if (loginData) {
    const path = location.state ? location.state.from.pathname : "/profile";
    return <Redirect to={path} />;
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
    <KakaoLogin
      token={token}
      onSuccess={successLogin}
      onFail={() => alert("로그인 실패")}
      render={({ onClick }) =>
      <Button className={classes.loginButton} onClick={()=> onClick()} />}
    />
    </Box>
  );
};

export default LoginPage;
