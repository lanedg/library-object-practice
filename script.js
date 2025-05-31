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
  for (let i = 0; i < myLibrary.length; i++) {
    const bookCard = createBookCard(content);
    createTitle(bookCard, myLibrary[i].name);
    createAuthor(bookCard, myLibrary[i].author);
    createPageCount(bookCard, myLibrary[i].pages);
    createID(bookCard, myLibrary[i].id);
    createRead(bookCard, myLibrary[i].read);
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
  const idP = document.createElement("p");
  idP.classList.add("id");
  const idText = document.createTextNode("ID: ");
  idP.appendChild(idText);
  const idInfo = document.createElement("b");
  idInfo.textContent = `${id}`;
  idInfo.classList.add("info");
  idP.appendChild(idInfo);
  container.appendChild(idP);
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
