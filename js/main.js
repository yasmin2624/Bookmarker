var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkURLInput = document.getElementById("bookmarkURL");

var addBtnInput = document.getElementById("submitBtn");

// addBtnInput.addEventListener("click", addBookmark );
addBtnInput.addEventListener("click", function () {
    valid(bookmarkNameInput);
    valid(bookmarkURLInput);
  
    if (
      bookmarkNameInput.classList.contains("is-valid") &&
      bookmarkURLInput.classList.contains("is-valid")
    ) {
      addBookmark();
    } else {
      showError();
    }
  });  

bookmarkNameInput.addEventListener("input", function () {
  valid(this);
});
bookmarkURLInput.addEventListener("input", function () {
  valid(this);
});

if (localStorage.getItem("bookmarks") === null) {
  var booksList = [];
} else {
  booksList = JSON.parse(localStorage.getItem("bookmarks"));
  display(booksList);
}

function addBookmark() {
  var bookMark = {
    bookName: bookmarkNameInput.value,
    URL: bookmarkURLInput.value,
  };

  booksList.push(bookMark);
  localStorage.setItem("bookmarks", JSON.stringify(booksList));

  display(booksList);
  clearForm();
}

function display(list) {
  var tableData = document.getElementById("tableContent");
  var cartoona = ``;
  for (let i = 0; i < list.length; i++) {
    cartoona += `<tr>
                <td>${i + 1}</td>
                <td>${list[i].bookName}</td>              
                <td>
                  <a href="${
                    list[i].URL
                  }" target="_blank" class="btn btn-visit btn-outline-warning">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </a>
                </td>
                <td>
                  <button class="btn btn-delete btn-outline-danger" onclick="deleteBookmark(${i})">
                    <i class="fa-solid fa-trash-can "></i>
                    Delete
                  </button>
                </td>
            </tr>`;
  }
  tableData.innerHTML = cartoona;
}


// delete btn
// document
//   .getElementById("tableContent")
//   .addEventListener("click", function (event) {
//     if (event.target.closest(".btn-delete")) {
//       var index = event.target
//         .closest(".btn-delete")
//         .getAttribute("data-index");
//       deleteBookmark(index);
//     }
//   });

function deleteBookmark(index) {
  booksList.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(booksList));
  display(booksList);
}

function valid(elm) {
  var regex = {
    bookmarkName: /^\w{3,}(\s+\w+)*$/,
    bookmarkURL:
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
  };
  var matched = regex[elm.id]?.test(elm.value);

  if (matched) {
    elm.classList.add("is-valid");
    elm.classList.remove("is-invalid");
  } else {
    elm.classList.add("is-invalid");
    elm.classList.remove("is-valid");
  }
}

function clearForm() {
  bookmarkNameInput.value = "";
  bookmarkURLInput.value = "";
  bookmarkNameInput.classList.remove("is-valid", "is-invalid");
  bookmarkURLInput.classList.remove("is-valid", "is-invalid");
}

// box error
document.getElementById("closeBtn").addEventListener("click", hideError);
function showError() {
  var errorBox = document.getElementById("errorBox");
  errorBox.classList.remove("d-none");
}

function hideError() {
  var errorBox = document.getElementById("errorBox");
  errorBox.classList.add("d-none");
}

