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
