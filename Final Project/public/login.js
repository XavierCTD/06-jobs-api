import {
  inputEnabled,
  setDiv,
  message,
  token,
  enableInput,
  setToken,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showForms } from "./forms.js";

let loginDiv = null;
let password = null;
let username = null;

export const handleLogin = () => {
  loginDiv = document.getElementById("login-div");
  password = document.getElementById("password");
  username = document.getElementById("username");
  const loginButton = document.getElementById("login-button");
  const loginCancel = document.getElementById("login-cancel");

  loginDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === loginButton) {
        showForms();
      } else if (e.target === loginCancel) {
        showLoginRegister();
      }
    }
  });
};

export const showLogin = () => {
  password.value = null;
  setDiv(loginDiv);
};
