import {
  inputEnabled,
  setDiv,
  message,
  token,
  enableInput,
  setToken,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showAddEdit } from "./addEdit.js";

let formsDiv = null;
let formsTable = null;
let formsTableHeader = null;

export const handleForms = () => {
  formsDiv = document.getElementById("notes");
  const logoff = document.getElementById("logoff");
  const addNote = document.getElementById("add-note");
  formsTable = document.getElementById("forms-table");
  formsTableHeader = document.getElementById("forms-table-header");

  formsDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addNote) {
        showAddEdit(null);
      } else if (e.target === logoff) {
        setToken(null);

        message.textContent = "Logged off successfully";

        formsTable.replaceChildren([formsTableHeader]);

        showLoginRegister();
      }
    }
  });
};

export const showForms = async () => {
  setDiv(formsDiv);
};
