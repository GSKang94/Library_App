let myLibrary = [];
let userForm = document.getElementById("user-form");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

let haveRead = () => {
  let hr = document.getElementsByName("have-read");
  for (let h of hr) {
    return h.checked;
  }
};

// Toggle menu on mobile
let toggleMenu = () => {
  document.getElementById("menu").addEventListener("click", () => {
    document.getElementById("aside").classList.toggle("toggle-aside");
  });
};
toggleMenu();

let main = () => {
  let bookTitle = document.getElementById("book-title");

  userForm.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      validate();
    }
  });

  document.querySelector("ion-icon[name='close-circle']").onclick = () => {
    userForm.classList.add("hide");
  };

  document.getElementById("add-new-book").addEventListener("click", () => {
    // hide sidebar
    document.getElementById("aside").classList.remove("toggle-aside");
    userForm.classList.remove("hide");
    bookTitle.focus();
    userForm.reset();
  });

  document.getElementById("submit").onclick = () => validate();

  let validate = () => {
    // let container = document.getElementById("container");
    let authorName = document.getElementById("author-name");
    let bookPages = document.getElementById("book-pages");

    let userBook = new Book(
      bookTitle.value,
      authorName.value,
      bookPages.value,
      haveRead()
    );
    myLibrary.push(userBook);
    render();
  };
};

let render = () => {
  let display;
  myLibrary.map((book) => {
    let div = () => document.createElement("div");

    display = div();
    display.id = "display";

    let displaySide = div();
    displaySide.id = "display-side";

    let title = div();
    title.innerText = book.title;
    title.id = "display-title";
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

    display.appendChild(displaySide);

    let googleApi = "https://www.googleapis.com/books/v1/volumes?q=";
    fetch(googleApi + book.title + "+inauthor:" + book.author)
      .then((response) => response.json())
      .then((data) => appendData(data))
      .catch((err) => console.log(err));

    function appendData(data) {
      img.src = data.items[0].volumeInfo.imageLinks.smallThumbnail;
      pages.innerText = data.items[0].volumeInfo.pageCount + " pages";
    }
  });
  container.appendChild(display);

  display.classList.add("fadeIn");

  userForm.classList.add("hide");
  bookLog();
};

// localStorage.clear();

let bookLog = () => {
  let lastItem = myLibrary.length - 1;
  document.getElementById("total-books").innerText++;

  let pagesRead = parseInt(document.getElementById("pages-read").innerText, 10);
  pagesRead += +myLibrary[lastItem].pages;
  document.getElementById("pages-read").innerText = pagesRead;

  let booksRead = document.getElementById("books-read");
  myLibrary[lastItem].read ? booksRead.innerText++ : null;

  localStorage.setItem("book", JSON.stringify(myLibrary));
};

let storage = () => {
  let storedbooks = JSON.parse(localStorage.getItem("book"));
  storedbooks.map((book) => {
    let savedBook = new Book(book.title, book.author, book.pages, book.read);
    myLibrary.push(savedBook);
    render();
  });
  main();
};

let defaultValue = () => {
  myLibrary = [
    { title: "1984", author: "orwell", pages: "10", read: false },
    {
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      pages: "10",
      read: false,
    },
    {
      title: "Harry Potter and the Philosopher’s Stone",
      author: "J.K. Rowling",
      pages: "10",
      read: false,
    },
    {
      title: "The Kite Runner",
      author: " Khaled Hosseini",
      pages: "10",
      read: false,
    },
    {
      title: "Slaughterhouse-Five",
      author: " Kurt Vonnegut",
      pages: "10",
      read: false,
    },
  ];
  localStorage.setItem("book", JSON.stringify(myLibrary));
  storage();
};

localStorage.length ? storage() : defaultValue();
