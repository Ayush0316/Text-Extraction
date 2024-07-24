import styles from "./SignupForm.module.css";

import Button from "../../../../components/Button/Button";
import InputBox from "../../../../components/InputBox/InputBox";

import axios from "../../../../baseAxios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();

  const [name, changeName] = useState("");
  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");
  const [passwordConfirm, changePasswordConfurm] = useState("");

  const signup = async () => {
    try {
      const res = await axios.post("/api/users/signup", {
        name,
        email,
        password,
        passwordConfirm,
      });
      console.log(res);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.Container}>
      <InputBox
        type="text"
        placeholder="Enter your name"
        onChange={changeName}
      ></InputBox>
      <InputBox
        type="email"
        placeholder="Enter your email"
        onChange={changeEmail}
      ></InputBox>
      <InputBox
        type="password"
        placeholder="Enter password"
        onChange={changePassword}
      ></InputBox>
      <InputBox
        type="password"
        placeholder="Confirm your password"
        onChange={changePasswordConfurm}
      ></InputBox>
      <Button text="Sign up" onClick={signup}></Button>
    </div>
  );
};

export default SignupForm;
