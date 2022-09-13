import { categories } from "./data.js";
import { createNote, updateNote } from "./helperNote.js";
import { archiveLogo, deleteLogo } from "./logo.js";

export const loadLogo = () => {
  Array.from(document.getElementsByClassName("row-logo")).forEach((col) => {
    if (col.classList.contains("archive")) col.innerHTML = archiveLogo;
    if (col.classList.contains("delete")) col.innerHTML = deleteLogo;
  });
};
export const showMessage = (text, error) => {
  let messange = document.getElementById("messange");
  messange.style.opacity = "1";
  messange.innerText = text;
  if (error) messange.classList.add("invalid-input");
  setTimeout(() => {
    messange.style.opacity = "0";
    if (error) messange.classList.remove("invalid-input");
  }, 1500);
};

export const buildForm = (note) => {
  let form = document.createElement("form");

  form.innerHTML =
    `
        <input type="text" name="name" value="${
          typeof note.name === "string" ? note.name : ""
        }" placeholder="Name" required>
        <select name="categories">
        ` +
    Object.keys(categories).map(
      (elem) =>
        `<option value="${elem}" ${
          note.category === elem ? "selected" : ""
        }>${elem}</option>`
    ) +
    `
        </select>
        <textarea name="content" placeholder="Content" id="content">${
          note.content ? note.content : ""
        }</textarea>
        <input class="cancel" type="button" value="Cancel">
        <input class="submit-button" type="submit" value="Submit" > 
    `;

  form.getElementsByClassName("cancel")[0].addEventListener("click", () => {
    document.getElementsByClassName("wrapper-div")[0].remove();
  });

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  form.onsubmit = (event) => {
    event.preventDefault();
    let newNote = {
      id: typeof note.name === "string" ? note.id : new Date().getTime(),
      name: event.target.name.value,
      created:
        typeof note.name === "string"
          ? note.created
          : `${
              month[new Date().getMonth()]
            } ${new Date().getDate()}, ${new Date().getFullYear()}`,
      category: event.target.categories.value,
      content: event.target.content.value,
      dates: "",
      archived: typeof note.name === "string" ? note.archived : false,
    };

    if (typeof note.name === "string") updateNote(newNote);
    else createNote(newNote);

    document.getElementsByClassName("wrapper-div")[0].remove();
  };
  let wrapperDiv = document.createElement("div");
  wrapperDiv.className = "wrapper-div";
  wrapperDiv.append(form);

  document.body.prepend(wrapperDiv);
};
