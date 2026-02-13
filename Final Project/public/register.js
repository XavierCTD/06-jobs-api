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

let registerDiv = null;
let username = null;
let password1 = null;
let password2 = null;

export const handleRegister = () => {
  registerDiv = document.getElementById("register-div");
  username = document.getElementById("username");
  password1 = document.getElementById("password1");
  password2 = document.getElementById("password2");
  const registerButton = document.getElementById("register-button");
  const registerCancel = document.getElementById("register-cancel");

  registerDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === registerButton) {
        showForms();
      } else if (e.target === registerCancel) {
        showLoginRegister();
      }
    }
  });
};

export const showRegister = () => {
  password1.value = null;
  password2.value = null;
  setDiv(registerDiv);
};
