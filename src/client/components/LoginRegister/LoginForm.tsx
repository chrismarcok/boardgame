import React from "react";
import { useDispatch } from "react-redux";
import Axios, { AxiosResponse } from "axios";
import { userLogin } from "../../actions/userActions";
import { ReactUser } from "../../../server/models/User";
import Toast from "../../../utils/toasts";
import { useHistory } from "react-router";

interface LoginFormProps {
  usernameValue: string;
  passwordValue: string;
  setUsernameValue: React.Dispatch<React.SetStateAction<string>>;
  setPasswordValue: React.Dispatch<React.SetStateAction<string>>;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  usernameValue,
  passwordValue,
  setUsernameValue,
  setPasswordValue,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const clearFields = () => {
    setUsernameValue("");
    setPasswordValue("");
  };

  const loginUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const userInfo = {
      username: usernameValue,
      password: passwordValue,
    };

    Axios.post("/login", userInfo)
      .then((response: AxiosResponse<ReactUser>) => {
        const user: ReactUser = response.data;
        dispatch(userLogin(user));
        clearFields();
        if (user.activated) {
          Toast.success("You have successfully logged in.");
        } else {
          Toast.warning("Please check your email to activiate your account.");
        }
        history.push("/");
      })
      .catch((err: Error) => {
        Toast.error("Could not log you in.");
        console.log(err.message);
      });
  };

  return (
    <>
      <h1>Login</h1>
      <form className="login-form">
        <label>Username</label>
        <input
          id="login-username"
          name="username"
          type="text"
          required
          value={usernameValue}
          onChange={(e) => setUsernameValue(e.target.value)}
        ></input>

        <label>Password</label>
        <input
          id="login-password"
          name="password"
          type="password"
          required
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
        ></input>
        <button className="login-btn" onClick={(e) => loginUser(e)}>
          Login
        </button>
      </form>
    </>
  );
};
