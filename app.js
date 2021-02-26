let container = document.getElementById("container");
let bookTitle = document.getElementById("book-title");
let authorName = document.getElementById("author-name");
let bookPages = document.getElementById("book-pages");
let pageBoolian = document.getElementsByName("page-boolian")
let submit = document.getElementById("submit");
let addNewBook = document.getElementById("add-new-book");
let userForm = document.getElementById("user-form");
let closeIcon = document.querySelector("ion-icon[name='close-circle']")
let display;

// Book log
let totalBooks = document.getElementById("total-books");
let booksRead = document.getElementById("books-read");
let pagesRead = parseInt(document.getElementById("pages-read").innerText, 10);
let totalPages = document.getElementById("total-pages");

let myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

Book.prototype.haveRead = () => {
    for (let page of pageBoolian) {
        if (page.checked) {
            return true;
        } else {
            return false;
        }
    }
};

closeIcon.onclick = () => {
    userForm.classList.add("hide")
}

addNewBook.addEventListener("click", () => {
    userForm.classList.remove("hide")
    bookTitle.focus()
    submit.onclick = () => validate();
    userForm.reset();
})


userForm.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        validate();
    }
})

let validate = () => {
    if (bookTitle.value === "" || authorName.value === "" || bookPages.value === "") {
        swal("Please Fill everything", {
            buttons: false,
            className: "swal-bg",
            timer: 1000,
        });
    } else {
        addBookToLibrary();
    }
}

function addBookToLibrary() {
    let userBook = new Book(bookTitle.value, authorName.value, bookPages.value);
    myLibrary.push(userBook);

    myLibrary.map((book) => {

        let div = () => document.createElement("div");

        display = div();
        display.id = "display"

        let displaySide = div()
        displaySide.id = "display-side"

        let title = div();
        title.innerText = book.title;
        title.id = "display-title"
        displaySide.appendChild(title);

        let img = document.createElement("img");
        img.id = "display-img";
        display.appendChild(img);

        let author = div();
        author.innerText = "by " + book.author;
        author.id = "display-author";
        displaySide.appendChild(author);

        let pages = div();
        pages.id = "display-pages";
        displaySide.appendChild(pages);

        let haveRead = div();
        haveRead.id = "display-read";
        displaySide.appendChild(haveRead);

        display.appendChild(displaySide)

        let googleApi = "https://www.googleapis.com/books/v1/volumes?q="
        fetch(googleApi + book.title + "+inauthor:" + book.author)
            .then(response => response.json())
            .then(data => appendData(data))
            .catch(err => console.log(err));

        function appendData(data) {
            img.src = data.items[0].volumeInfo.imageLinks.smallThumbnail;
            pages.innerText = data.items[0].volumeInfo.pageCount + " pages";

        }
    })


    container.appendChild(display)
    userForm.classList.add("hide")
    //update Book log 
    totalBooks.innerText++;
    userBook.haveRead() ? booksRead.innerText++ : null;
    pagesRead += +userBook.pages;
    document.getElementById("pages-read").innerText = pagesRead;

};

