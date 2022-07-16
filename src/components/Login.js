import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import { GET_USER_DETAILS } from "../queries/GET_USER_DETAILS";
import { useLazyQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import PulseLoader from "react-spinners/ClipLoader";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  userSelectorWrapper: {
    display: "flex",
    width: "fit-content",
    justifyContent: "center",
    borderBottom: "2px solid #3f51b5",
    marginTop: "20px",
  },
  option: {
    cursor: "pointer",
    background: "#3f51b5",
    padding: "10px",
    color: "white",
    fontWeight: "600",
  },
  optionAdmin: {
    cursor: "pointer",
    padding: "10px",
    fontWeight: "600",
  },
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    width: "100%",
  },
  label: {
    marginTop: "10px",
  },
  input: {
    height: "30px",
    fontSize: "16px",
    marginBottom: "20px",
    marginTop: "10px",
  },
  loader: {
    color: "#3f51b5 !important",
    marginTop: "50%",
    marginLeft: "50%",
    transform: "translateX(-50%)",
  },
}));

function Login() {
  const classes = useStyles();
  const [isAdmin, setAdmin] = React.useState(false);
  const [cred, setCred] = React.useState({
    username: null,
    password: null,
  });
  const history = useHistory();

  const [login, { data, loading, error }] = useLazyQuery(GET_USER_DETAILS);
  if (loading) return <PulseLoader className={classes.loader} />;
  if (error) return <>Sorry Unexpected error occured</>;

  if (data) {
    localStorage.setItem("user", JSON.stringify(data.users[0]));
    history.push("/user-dashboard");
  }

  return (
    <div className={classes.wrapper}>
      <h1>Login to continue!!!</h1>
      <div className={classes.userSelectorWrapper}>
        <div
          className={isAdmin ? classes.optionAdmin : classes.option}
          onClick={() => setAdmin(!isAdmin)}
        >
          User Login
        </div>
        <div
          className={isAdmin ? classes.option : classes.optionAdmin}
          onClick={() => setAdmin(!isAdmin)}
        >
          Admin Login
        </div>
      </div>
      <div>
        <form className={classes.formWrapper}>
          <label className={classes.label}>Username</label>
          <input
            className={classes.input}
            onChange={(event) =>
              setCred((prev) => ({ ...prev, username: event.target.value }))
            }
            type="text"
          />
          <label className={classes.label}>Password</label>
          <input
            className={classes.input}
            onChange={(event) =>
              setCred((prev) => ({ ...prev, password: event.target.value }))
            }
            type="password"
          />
          {isAdmin ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => console.log(cred)}
            >
              Admin Login
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => login({ variables: cred })}
            >
              User Login
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
