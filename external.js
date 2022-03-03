function Library(){
    const addBook = document.querySelector('.add-book');
    const deleteBook = document.querySelector('.delete');

    const booksSection = document.querySelector('.books');
    const dialog = document.querySelector('.dialog');
    const editDialog = document.querySelector('.edit-book');

    const submitBtn = document.querySelector('.submit');
    const submitEdit = document.querySelector('.submit-edit');

    let title = '';
    let author = '';
    let pages = '';
    let bookStatus = '';

    let currBook = -1;
    let currTitle = ''

    let myLibrary = JSON.parse(localStorage.getItem("myLibrary") || "[]");

    function Book(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    window.onload = loadShelf();
    
    document.querySelector('.background-screen').addEventListener("click", function(){
        resetValues();
    });

    addBook.addEventListener("click", function(){
        //puts dialog in focus
        showDialog(dialog);
        
        dialog.addEventListener("mouseout", function(e){
            addBookDetail(e.target);

            resetInvalidInput();
        });
    });

    submitBtn.addEventListener("click", function(){
        if(!myLibrary.some(e => e.title.toLowerCase().replace(/\s/g, '') == title.toLowerCase().replace(/\s/g, ''))){
            if(title != '' && author != '' && pages != '' && bookStatus != ''){
                myLibrary.unshift(new Book(title, author, pages, bookStatus));

                loadShelf();
                resetValues();
            }
            else{
                invalidInput();
            }
        }
        else{
            alert("This book already exists. Try deleting and adding it again.")
        }
        console.log(myLibrary)
    });

    submitEdit.addEventListener("click", function(){
        if(currBook != -1 && bookStatus != ''){
            myLibrary[currBook].status = bookStatus;
        }
        loadShelf();
        resetValues()
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
            if(userInput.options[userInput.selectedIndex].text != 'Select your book status'){
                bookStatus = userInput.options[userInput.selectedIndex].text;
            }
        }
    };

    booksSection.addEventListener("click", function(e){
        
        let matches = Array.prototype.slice.call(document.querySelectorAll(".book"));
        
        // Test to see if array contains the one that was clicked
        if(matches.includes(e.target) || e.target.parentNode.className == 'book'){
            currBook = myLibrary.findIndex((obj => obj.title == e.target.closest('.book').firstChild.textContent));
            currTitle = e.target.closest('.book').firstChild.textContent;

            document.querySelector('.edit-title').innerHTML = e.target.closest('.book').firstChild.textContent
            showDialog(editDialog);

            editDialog.addEventListener("mouseout", function(e){
                addBookDetail(e.target);
            });

        }
    });

    deleteBook.addEventListener("click", function(){
        myLibrary = myLibrary.filter(({title}) => !title.includes(currTitle));
        
        loadShelf();
        resetValues();
    });

    function loadShelf(){
        console.log(myLibrary)

        //saving to local storage
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

        document.querySelectorAll(".book").forEach(el => el.remove());

        for (let i = 0; i < myLibrary.length; i++){
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

        currBook = -1

        dialog.style.display = 'none';
        editDialog.style.display = 'none';

        document.querySelector('.background-screen').style.display = 'none';

        resetInvalidInput();

        dialog.reset();
        editDialog.reset();
    };

    function showDialog(val){
        val.style.display = 'flex'; 
        document.querySelector('.background-screen').style.display = 'block';
    };

    function invalidInput(){
        //set border color to red (indicated required field)
        if(title === ''){
            document.querySelector('.title').classList.add("invalid");
        }
        if(author === ''){
            document.querySelector('.author').classList.add("invalid");
        }
        if(pages === ''){
            document.querySelector('.pages').classList.add("invalid");
        }
        if(bookStatus === ''){
            document.querySelector('.search-categories').classList.add("invalid");
        }   
    }

    function resetInvalidInput(){
        let elems = dialog.querySelectorAll("[required]");
    
        for(let i = 0; i < elems.length; i++){
            elems[i].classList.remove("invalid");
        }
    };
}

Library();