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
let totalPages = parseInt(document.getElementById("total-pages").innerText, 10);


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

let pageCounter = 0;

closeIcon.onclick = () => {
    userForm.classList.add("hide")
}

addNewBook.addEventListener("click", () => {
    userForm.classList.remove("hide")
    // container.classList.add("filter")
    bookTitle.focus()
    // submit.onclick = () => addBookToLibrary()
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
            pageCounter = data.items[0].volumeInfo.pageCount;
        }
    }
    container.appendChild(display)
    userForm.classList.add("hide")

    //update Book log 
    totalBooks.innerText++;
    userBook.haveRead() ? booksRead.innerText++ : null;
    pagesRead += +userBook.pages;
    document.getElementById("pages-read").innerText = pagesRead;
    // totalPages += pageCounter;
    // document.getElementById("total-pages").innerText = totalPages;
    // console.log(pageCounter);



    myLibrary.splice(0, 1)
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