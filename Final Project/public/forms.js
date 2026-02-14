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

function initElements() {
  if (!formsTable) formsTable = document.getElementById("forms-table");
  if (!formsTableHeader)
    formsTableHeader = document.getElementById("forms-table-header");
  if (!formsDiv) formsDiv = document.getElementById("notes");
}

export const showForms = async () => {
  initElements();
  try {
    enableInput(false);

    const response = await fetch("/api/v1/forms", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    const forms = Array.isArray(data) ? data : (data.forms ?? []);
    const children = [formsTableHeader];

    if (response.ok) {
      if (forms.length === 0) {
        formsTable.replaceChildren(...children);
      } else {
        for (let i = 0; i < forms.length; i++) {
          const fields = forms[i];
          const rowEntry = document.createElement("tr");
          rowEntry.innerHTML = `
            <td>${fields.name}</td>
            <td>${fields.likes}</td>
            <td>${fields.status}</td>
            <td><button type="button" class="edit-button" data-id="${fields.id}">edit</button></td>
            <td><button type="button" class="delete-button" data-id="${fields.id}">delete</button></td>
          `;
          children.push(rowEntry);
        }
        formsTable.replaceChildren(...children);
      }
    } else {
      message.textContent = data?.msg ?? "Failed to load forms.";
    }
  } catch (err) {
    console.error(err);
    message.textContent = "An error occurred while fetching the forms.";
  } finally {
    enableInput(true);
    setDiv(formsDiv);
  }
};

export const handleForms = () => {
  initElements();
  if (!formsDiv) {
    console.warn("formsDiv not found; cannot attach handler");
    return;
  }

  formsDiv.addEventListener("click", async (e) => {
    if (!inputEnabled || e.target.nodeName !== "BUTTON") return;

    const noteId = e.target.dataset.id;

    if (e.target.classList.contains("edit-button")) {
      showAddEdit(noteId);
      return;
    }

    if (e.target.classList.contains("delete-button")) {
      enableInput(false);
      try {
        const response = await fetch(`/api/v1/forms/${noteId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          message.textContent = "Note deleted successfully.";
          await showForms();
        } else {
          const data = await response.json();
          message.textContent = data?.msg ?? "Failed to delete note.";
        }
      } catch (err) {
        console.error(err);
        message.textContent = "An error occurred while deleting the note.";
      } finally {
        enableInput(true);
      }
    }
  });
};
