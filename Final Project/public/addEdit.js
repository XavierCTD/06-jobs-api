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

  addEditDiv.addEventListener("click", async (e) => {
    if (!inputEnabled || e.target.nodeName !== "BUTTON") return;

    // Adding or editing a note

    if (e.target === addingNote) {
      enableInput(false);

      let method = "POST";
      let url = "/api/v1/forms";

      if (addingNote.textContent === "Edit Note") {
        method = "PATCH";
        url = `/api/v1/forms/${addingNote.dataset.id}`;
      }

      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: name.value,
            likes: likes.value,
            status: status.value,
          }),
        });

        const data = await response.json();

        if (response.status === 201) {
          message.textContent =
            method === "POST"
              ? "Note added successfully!"
              : "Note updated successfully!";

          name.value = "";
          likes.value = "";
          status.value = "";
          showForms();
        } else {
          message.textContent = data.msg;
        }
      } catch (err) {
        console.error(err);
        message.textContent = "A communication error occurred.";
      }
      enableInput(true);

      // Cancel Button
      if (e.target === editCancel) {
        message.textContent = "";
        showForms();
      }
    }
  });
};

export const showAddEdit = async (noteId) => {
  if (!addEditDiv) {
    addEditDiv = document.getElementById("edit-note");
  }

  if (!noteId) {
    addingNote.textContent = "Add Note";
    addingNote.dataset.id = "";

    name.value = "";
    likes.value = "";
    status.value = "";
    message.textContent = "";

    setDiv(addEditDiv);
  } else {
    enableInput(false);

    try {
      const response = await fetch(`/api/v1/forms/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        addingNote.textContent = "Edit Note";
        addingNote.dataset.id = noteId;

        name.value = data.form.name;
        likes.value = data.form.likes;
        status.value = data.form.status;

        message.textContent = "";
        setDiv(addEditDiv);
      } else {
        message.textContent = "The note could not be found.";
        showForms();
      }
    } catch (err) {
      console.error(err);
      message.textContent = "An error occurred while fetching the note.";
      showForms();
    }
    enableInput(true);
  }
};
