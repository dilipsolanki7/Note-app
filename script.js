const addButton = document.getElementById("add");
const notes = JSON.parse(localStorage.getItem("notes"));
const updateLocalStorage = () => {
  const notesText = document.querySelectorAll("textarea");
  const notes = [];
  notesText.forEach((note) => notes.push(note.value));
  localStorage.setItem("notes", JSON.stringify(notes));
};

//function to add a new note to the DOM
const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
  <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
  </div>
  <div class="main ${text ? "" : "hidden"}"></div>
  <textarea class="${text ? "hidden" : ""}"></textarea>`;

  const editButton = note.querySelector(".edit");
  const deleteButton = note.querySelector(".delete");
  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");
  textArea.value = text;
  main.innerHTML = marked(text);

  deleteButton.addEventListener("click", () => {
    note.remove();
    updateLocalStorage();
  });
  editButton.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });
  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked(value);
    updateLocalStorage();
  });
  document.body.appendChild(note);
};
let registerBtn = document.querySelector('.account-form .register-btn');
let loginBtn = document.querySelector('.account-form .login-btn');

registerBtn.onclick = () => {
  registerBtn.classList.add('active');
  loginBtn.classList.remove('active');
  document.querySelector('.account-form .login-form').classList.remove('active');
  document.querySelector('.account-form .register-form').classList.add('active');
}
loginBtn.onclick = () => {
  registerBtn.classList.remove('active');
  loginBtn.classList.add('active');
  document.querySelector('.account-form .login-form').classList.add('active');
  document.querySelector('.account-form .register-form').classList.remove('active');
}
let accountForm = document.querySelector('.account-form');

document.querySelector('#account-btn').onclick = () => {
  accountForm.classList.add('active');
}


function check() {
  email = document.getElementById('email').value;
  console.log(email)
  if (email.search("@nirmauni.ac.in") == -1) {
      document.getElementById('email').value = '';
      document.getElementById('email').placeholder = "Enter valid format";
      alert("Not valid format");
  }

}
function checkPassword(a) {

  if (a == 0) {

    var check = /(?=.*\W)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/

    if (npwd.value == "") {
      pwd1.className = "error";
      pwd1.innerHTML = `*Please enter password`;
      npwd.focus();
    } else {
      if (npwd.value.match(check) != npwd.value) {
        pwd1.className = "error";
        pwd1.innerHTML = `*Password must contain at least 1 lowercase,at least 1 uppercase,at least 1 special character,at least 1 digit & length should be more than 8`;
        
        npwd.focus();
      } else {
        pwd1.innerHTML = ``;
      }
    }

    if (npwd.value != "" && npwd.value.match(check) == npwd.value) {
      pwd1.innerHTML = ``;
    }
  }

  else if (a == 1) {
    if (npwd.value != cpwd.value) {
      pwd2.className = "error";
      pwd2.innerHTML = `*Not match`;
    }

    if (npwd.value == cpwd.value) {
      pwd2.innerHTML = ``;
    }
  }
}



document.querySelector('#close-form').onclick = () => {
  accountForm.classList.remove('active');
}
// Add event listener to the add button to call addNewNote function
addButton.addEventListener("click", () => {
  addNewNote();
});

// Load notes from local storage
if (notes) {
  notes.forEach((note) => addNewNote(note));
}
