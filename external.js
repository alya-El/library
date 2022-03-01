function Library(){
    const addBook = document.querySelector('.add-book');
    const booksSection = document.querySelector('.books');
    const dialog = document.querySelector('.dialog');
    const editDialog = document.querySelector('.edit-book')
    const submitBtn = document.querySelector('.submit');

    let title = '';
    let author = '';
    let pages = '';
    let bookStatus = '';

    let myLibrary = JSON.parse(localStorage.getItem("myLibrary") || "[]");

    function Book(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    window.onload = loadShelf(myLibrary.length);

    window.addEventListener("mouseup", function(e){
        if(e.target != dialog && e.target.parentNode != dialog){
            //if user clicks out of dialog
            resetValues();
        }
    });

    addBook.addEventListener("click", function(){
        //puts dialog in focus
        dialog.style.display = 'flex'; 
        booksSection.style.opacity = '0.3';
        addBook.style.opacity = '0.3';

        dialog.addEventListener("mouseout", function(e){
            addBookDetail(e.target);
        });
    });


    submitBtn.addEventListener("click", function(){
        if(!myLibrary.some(e => e.title.toLowerCase().replace(/\s/g, '') == title.toLowerCase().replace(/\s/g, ''))){
            if(title != '' && author != '' && pages != '' && bookStatus != 'Select your book status'){
                myLibrary.unshift(new Book(title, author, pages, bookStatus));
                
                //saving to local storage
                localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

                //addBookToLibrary(bookStatus);
                loadShelf(myLibrary.length);

                resetValues();
            }
            else{
            // boxBorder('red');
            }
        }
        else{
            alert("This book already exists. Try deleting and adding it again.")
        }
        console.log(myLibrary)
    });

    function addBookDetail(userInput){  
        if(userInput.className == 'title'){
            title = userInput.value;
        }
        else if(userInput.className == 'author'){
            author = userInput.value;
        }
        else if(userInput.className == 'pages'){
            pages = userInput.value;
        }
        else if(userInput.className == 'search-categories'){
            bookStatus = userInput.options[userInput.selectedIndex].text;
        }
        //document.querySelector('.' + userInput.className).style.cssText = 'border: 1px solid gray;'
    };

    function loadShelf(len){
        console.log(myLibrary)
        //myLibrary = []
        //localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

        document.querySelectorAll(".book").forEach(el => el.remove());

        for (let i = 0; i < len; i++){
            let book = document.createElement('div');
            book.className = 'book';

            let h3 = document.createElement("h3");
            let h4 = document.createElement("h4");
            let p = document.createElement("p");

            let bookTitle = document.createTextNode(myLibrary[i].title); 
            let bookAuthor = document.createTextNode("By: " + myLibrary[i].author);
            let bookPages = document.createTextNode(myLibrary[i].pages + " pages");

            h3.appendChild(bookTitle);
            h4.appendChild(bookAuthor);
            p.appendChild(bookPages);

            book.appendChild(h3);
            book.appendChild(h4);
            book.appendChild(p);

            if(myLibrary[i].status == 'Currently Reading'){
                document.querySelector('.current-reads > .shelf').appendChild(book); 
            }
            else if(myLibrary[i].status == 'Future Read'){
                document.querySelector('.future-reads > .shelf').appendChild(book); 
            }
            else{
                document.querySelector('.finised > .shelf').appendChild(book); 
            }
        }
    };

    function resetValues(){
        title = '';
        author = '';
        pages = '';
        bookStatus = ''; 

        dialog.style.display = 'none';
        booksSection.style.opacity = '1';
        addBook.style.opacity = '1';

        dialog.reset();
        //boxBorder();
    };

    const shelf = document.querySelectorAll('.shelf');

    booksSection.addEventListener("click", function(e){
        
        let matches = Array.prototype.slice.call(document.querySelectorAll(".book"));
  
        // Test to see if array contains the one that was clicked
        if(matches.includes(e.target)){
            console.log(e.target.closest('.section').className);
        }
        else if(e.target.parentNode.className == 'book'){
            console.log(e.target.parentNode.closest('.section').className);
        }
    });
}

Library();




/*function boxBorder(color){
    //set border color to red (indicated required field)
    if(color === 'red'){
        if(title === ''){
            document.querySelector('.title').style.cssText = "border: 1px solid red";
            console.log(bookStatus)
        }
        if(author === ''){
            document.querySelector('.author').style.cssText = "border: 1px solid red";
        }
        if(pages === ''){
            document.querySelector('.pages').style.cssText = "border: 1px solid red";
        }
        if(bookStatus === 'Select your book status'){
            document.querySelector('.search-categories').style.cssText = "border: 1px solid red";
        }
    }
    //reset border color to gray
    else{
        let elems = dialog.querySelectorAll("[required]");

        for(let i = 0; i < elems.length-1; i++){
            elems[i].style.cssText = 'border: 1px solid gray'; 
        }
    }
}*/