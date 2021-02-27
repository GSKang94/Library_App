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
// let totalPages = parseInt(document.getElementById("total-pages").innerText, 10);

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

let haveRead = () => {
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
    console.log(localStorage);
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
    let userBook = new Book(bookTitle.value, authorName.value, bookPages.value, haveRead());
    myLibrary.push(userBook);
    render()
};

let render = () => {
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

        let apiKey = "AIzaSyDL_N1oZ_AQlov4et30nXnY7QQuxyic3mA"
        let googleApi = "https://www.googleapis.com/books/v1/volumes?q="
        fetch(googleApi + book.title + "+inauthor:" + book.author + "&key=" + apiKey)
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

    let deleteObject = document.getElementById("delete-object");


    bookLog();
}

// localStorage.clear()

let bookLog = () => {
    //update Book log 
    totalBooks.innerText++;

    pagesRead += +myLibrary[myLibrary.length - 1].pages
    document.getElementById("pages-read").innerText = pagesRead;

    localStorage.setItem("Book", JSON.stringify(myLibrary));
    myLibrary[myLibrary.length - 1].read ? booksRead.innerText++ : null;
}

let storage = () => {
    if (localStorage.length) {
        let storedbooks = JSON.parse(localStorage.getItem("Book"));
        storedbooks.map((book, i) => {
            let savedBook = new Book(storedbooks[i].title, storedbooks[i].author, storedbooks[i].pages, storedbooks[i].read)
            myLibrary.push(savedBook)
            render()
        })
    }
}

storage()






 // deleteObject.onclick = () => {
    //     container.removeChild(container.children[0])
    //     // console.log(container.children[0]);
    // }
    // display.onclick = (e) => {
    //     container.removeChild(container.children[0])
    // }

// deleteObject.onclick = () => {
//     myLibrary.splice(0, 1)
//     console.log(myLibrary);
// }