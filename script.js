const myLibrary = [];

function Book(name, author, pages, read, id) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

function addBookToLibrary(name, author, pages, read) {
  let newBook = new Book(name, author, pages, read, crypto.randomUUID());
  myLibrary.push(newBook);
}

addBookToLibrary("Harry Potter", "J.K. Rowling", 553, false);
addBookToLibrary("Captain Underpants", "Dave Pilky", 35, true);
addBookToLibrary("The Stand", "Steven King", 1102, true);
addBookToLibrary("IT", "Steven King", 1221, true);

function displayBooks() {
  const content = document.querySelector(".content");
  content.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const bookCard = createBookCard(content);
    createTitle(bookCard, myLibrary[i].name);
    createAuthor(bookCard, myLibrary[i].author);
    createPageCount(bookCard, myLibrary[i].pages);
    createID(bookCard, myLibrary[i].id);
    createRead(bookCard, myLibrary[i].read);
    createDeleteButton(bookCard);
    createReadButton(bookCard);
  }
}

function createBookCard(container) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  container.appendChild(bookCard);
  return bookCard;
}

function createTitle(container, title) {
  const titleP = document.createElement("p");
  titleP.classList.add("title");
  const titleText = document.createTextNode("Title: ");
  titleP.appendChild(titleText);
  const titleInfo = document.createElement("b");
  titleInfo.textContent = `${title}`;
  titleInfo.classList.add("info");
  titleP.appendChild(titleInfo);
  container.appendChild(titleP);
}

function createAuthor(container, author) {
  const authorP = document.createElement("p");
  authorP.classList.add("author");
  const authorText = document.createTextNode("Author: ");
  authorP.appendChild(authorText);
  const authorInfo = document.createElement("b");
  authorInfo.textContent = `${author}`;
  authorInfo.classList.add("info");
  authorP.appendChild(authorInfo);
  container.appendChild(authorP);
}

function createPageCount(container, pageCount) {
  const pageCountP = document.createElement("p");
  pageCountP.classList.add("pages");
  const pageCountText = document.createTextNode("Page Count: ");
  pageCountP.appendChild(pageCountText);
  const pageCountInfo = document.createElement("b");
  pageCountInfo.classList.add("info");
  pageCountInfo.textContent = `${pageCount}`;
  pageCountP.appendChild(pageCountInfo);
  container.appendChild(pageCountP);
}

function createID(container, id) {
  container.setAttribute("data-book-id", id);
  /*
  const idP = document.createElement("p");
  idP.classList.add("id");
  const idText = document.createTextNode("ID: ");
  idP.appendChild(idText);
  const idInfo = document.createElement("b");
  idInfo.textContent = `${id}`;
  idInfo.classList.add("info");
  idP.appendChild(idInfo);
  container.appendChild(idP);
  */
}

function createRead(container, read) {
  const readP = document.createElement("p");
  readP.classList.add("read");
  if (read === true) {
    const readTrue = document.createTextNode("Read");
    readP.appendChild(readTrue);
  } else {
    const readFalse = document.createTextNode("Unread");
    readP.appendChild(readFalse);
  }
  container.appendChild(readP);
}

function createDeleteButton(container) {
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "Remove Book";
  container.appendChild(deleteButton);
  deleteButton.addEventListener("click", () => {
    const deleteIndex = findBookID(container.getAttribute("data-book-id"));
    deleteBook(deleteIndex);
    deleteBookCard(container.getAttribute("data-book-id"));
  });
}

function findBookID(id) {
  const checkIfRightID = (element) => element.id === id;
  const deleteIndex = myLibrary.findIndex(checkIfRightID);
  return deleteIndex;
}

function deleteBook(deleteIndex) {
  myLibrary.splice(deleteIndex, 1);
}

function deleteBookCard(id) {
  const cardToBeDeleted = document.querySelector(`[data-book-id="${id}"]`);
  cardToBeDeleted.remove();
}

function createReadButton(container) {
  const readButton = document.createElement("button");
  readButton.classList.add("toggleRead");
  readButton.textContent = "Read?";
  readButton.addEventListener("click", () => {
    const read = checkIfRead(container);
    updateReadIndicator(container, read);
  });
  container.appendChild(readButton);
}

function checkIfRead(container) {
  const bookIndex = findBookID(container.getAttribute("data-book-id"));
  const read = myLibrary[bookIndex].read;
  if (read === true) {
    myLibrary[bookIndex].read = false;
    return false;
  } else {
    myLibrary[bookIndex].read = true;
    return true;
  }
}

function updateReadIndicator(container, read) {
  const readIndicator = container.querySelector(".read");
  if (read === true) {
    readIndicator.textContent = "Read";
  } else {
    readIndicator.textContent = "Unread";
  }
}

const addBtn = document.querySelector(".add-book");
const addDialog = document.getElementById("addDialog");
const cancelBtn = document.getElementById("cancel");
const confirmBtn = document.getElementById("confirm");
const titleInput = document.getElementById("book-title");
const authorInput = document.getElementById("book-author");
const pagesInput = document.getElementById("book-pages");
const addForm = document.getElementById("addForm");

addBtn.addEventListener("click", () => {
  addDialog.showModal();
});

cancelBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addDialog.close();
  addForm.reset();
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (
    titleInput.value === "" ||
    authorInput.value === "" ||
    pagesInput.value === ""
  ) {
    addForm.reset();
  } else {
    addBookToLibrary(
      titleInput.value,
      authorInput.value,
      Number(pagesInput.value),
      false
    );
    addDialog.close();
    addForm.reset();
    displayBooks();
  }
});
