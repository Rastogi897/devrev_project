// Book class
class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

// UI class
class UI {
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.getElementById("book-list-ul");

        const bookItem = document.createElement("li");
        bookItem.classList.add("book-item");
        bookItem.innerHTML = `<span>${book.title}</span> by ${book.author}`;

        list.appendChild(bookItem);
    }

    static clearFormFields() {
        document.getElementById("book-title").value = "";
        document.getElementById("book-author").value = "";
    }
}

// Store class (for local storage handling)
class Store {
    static getBooks() {
        let books = [];

        if (localStorage.getItem("books") !== null) {
            books = JSON.parse(localStorage.getItem("books"));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }
}

// Event: Display books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a book
function addBook() {
    const title = document.getElementById("book-title").value;
    const author = document.getElementById("book-author").value;

    if (title === "" || author === "") {
        alert("Please enter a title and author");
        return;
    }

    const book = new Book(title, author);

    UI.addBookToList(book);
    Store.addBook(book);
    UI.clearFormFields();
}
