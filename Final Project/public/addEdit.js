import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showForms } from "./forms.js";

let addEditDiv = null;
let name = null;
let likes = null;
let status = null;
let addingNote = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-note");
  name = document.getElementById("name");
  likes = document.getElementById("likes");
  status = document.getElementById("status");
  addingNote = document.getElementById("adding-note");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingNote) {
        showForms();
      } else if (e.target === editCancel) {
        showForms();
      }
    }
  });
};

export const showAddEdit = (note) => {
  message.textContent = "";
  setDiv(addEditDiv);
};
