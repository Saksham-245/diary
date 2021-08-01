import React, { useState } from "react";
import {
  makeStyles,
  Backdrop,
  Toolbar,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import GoogleButton from "react-google-button";
import { useHistory, Redirect } from "react-router";
import supabase from "../utils/supabase";

const Login = () => {
  const useStyles = makeStyles({
    login: {
      marginTop: "20%",
      marginLeft: "40%",
      "@media(max-width:480px)": {
        marginLeft: "20%",
        marginTop: "70%",
      },
    },
    footer: {
      marginLeft: "3%",
      marginTop: "30%",
      color: "red",
      "@media(max-width: 480px)": {
        marginTop: "100%",
        marginLeft: "8%",
      },
    },
  });
  const history = useHistory();
  const session = JSON.parse(localStorage.getItem("supabase.auth.token"));
  const [open, setOpen] = useState(false);

  const handleLogin = async () => {
    await supabase.auth.signIn({
      provider: "google",
    });
    setOpen(!open);
  };

  if (session) {
    history.replace("/dashboard");
  } else {
    <Redirect to="/" />;
  }

  const classes = useStyles();

  return (
    <div className="login-page">
      <div className={classes.login}>
        <Backdrop open={open} onClick={handleLogin}>
          <CircularProgress color="secondary" />
        </Backdrop>
        <GoogleButton onClick={handleLogin} />
        <Toolbar className={classes.footer}>
          <Typography variant="body1">Made by Saksham Mathur</Typography>
        </Toolbar>
      </div>
    </div>
  );
};
export default Login;
