let container = document.getElementById("container");
let bookTitle = document.getElementById("book-title");
let authorName = document.getElementById("author-name");
let bookPages = document.getElementById("book-pages");
let pageRead = document.getElementsByName("page-read")
let submit = document.getElementById("submit");
let addNewBook = document.getElementById("add-new-book");
let userForm = document.getElementById("user-form");
let display;

// Book log
let totalBooks = document.getElementById("total-books");
let booksRead = document.getElementById("books-read");
let pagesRead = document.getElementById("pages-read");
let totalPages = document.getElementById("total-pages")

let myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

Book.prototype.haveRead = () => {
    for (let page of pageRead) {
        if (page.checked) {
            return true;
        } else {
            return false;
        }
    }
};


addNewBook.addEventListener("click", () => {
    userForm.classList.remove("hide")
    bookTitle.focus()
    submit.onclick = () => addBookToLibrary()
    userForm.reset();
})


userForm.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        addBookToLibrary()
    }
})

let pageCounter = 0;
let totalPageCounter = 0;
// let totalPages = 0;

function addBookToLibrary() {
    let userBook = new Book(bookTitle.value, authorName.value, bookPages.value);

    myLibrary.push(userBook);

    for (i = 0; i < myLibrary.length; i++) {
        let div = () => document.createElement("div");

        display = div();
        display.id = "display"

        let title = div();
        title.innerText = myLibrary[i].title;
        title.id = "display-title"
        display.appendChild(title);

        let img = document.createElement("img");
        img.id = "display-img";
        display.appendChild(img);

        let author = div();
        author.innerText = myLibrary[i].author;
        author.id = "display-author";
        display.appendChild(author);

        let pages = div();
        pages.innerText = myLibrary[i].pages;
        pages.id = "display-pages";
        display.appendChild(pages);

        let haveRead = div();
        haveRead.innerText = userBook.haveRead();
        haveRead.id = "display-read";
        display.appendChild(haveRead);


        let googleApi = "https://www.googleapis.com/books/v1/volumes?q="
        fetch(googleApi + myLibrary[i].title + "+inauthor:" + myLibrary[i].author)
            .then(response => response.json())
            .then(data => appendData(data))
            .catch(err => console.log(err));

        function appendData(data) {
            img.src = data.items[0].volumeInfo.imageLinks.smallThumbnail;

            totalPageCounter = data.items[0].volumeInfo.pageCount;
            console.log(totalPageCounter);
        }
    }
    container.appendChild(display)
    userForm.classList.add("hide")
    //update Book log 
    totalBooks.innerText++;
    userBook.haveRead() ? booksRead.innerText++ : null;
    pageCounter += +userBook.pages;
    pagesRead.innerText = pageCounter;
    totalPages.innerText += totalPageCounter;
};











// pageRead.map((page) => { page.checked ? console.log("true") : console.log('False') });
        // display.innerText = myLibrary[i].title;

        // for (let page of pageRead) {
        //     if (page.checked) {
        //         haveRead.innerText = false;
        //     } else {
        //         haveRead.innerText = true;
        //     }
        // }
        // 
// userBook.prototype = Object.create(Book.prototype);
    // pageRead.map(e => {
    //     if (e.checked) {
    //         return
    //     } else {
    //         return e.value
    //     }
    // })
    // myLibrary.map(e => {
    //     display = document.createElement("div");
    //     display.innerText = myLibrary[myLibrary.length - 1];
    // })

    // if (e.key === "Enter") {
    // let book = new Book(bookTitle.value,)
// let userInputValue = userInput.value;
// userInput.addEventListener("keydown", (e) => {
//     if (e.key === "Enter") {
//         let display = document.createElement("div");
//         display.innerText = userInput.value;
//         userInput.value ? container.appendChild(display) : console.log('empty');
//         userInput.value = "";
//     }
// });



//     let display = document.createElement("div");
//     display.innerText = e;
//     container.appendChild(display)
//     console.log(myLibrary[myLibrary.length - 1]);
// })