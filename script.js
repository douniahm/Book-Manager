
var bookList = JSON.parse(localStorage.getItem('books')) || [];
window.localStorage.setItem('books', JSON.stringify(bookList));

var count = Number(window.localStorage.getItem('count')) || 0;
window.localStorage.setItem('count', count.toString());

window.onload = function(){
    console.log(bookList);
    for(var i=0; i<bookList.length; i++){
        rowCreate(bookList[i]);
    }   
 }

function rowCreate(book){
    let table = document.getElementsByTagName('table')[0];
    let newbook = document.createElement("tr");
    newbook.setAttribute("id",book.id);

    newbook.innerHTML="<td>" +book.title+ "</td> <td>" +book.author+ "</td><td>"+book.description;
    newbook.innerHTML+="</td><td> <button  class=\"btn btn-info\" onclick=\"changeBook("+book.id+")\">Modify</button> </td>";
    newbook.innerHTML+="</td><td> <button  class=\"btn btn-danger\" onclick=\"deleteBook("+book.id+")\">Delete</button> </td>";

    table.appendChild(newbook);
}

function addBook(){
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let desc = document.getElementById('description').value;
    var book = {
        id: count,
        title: title,
        author: author,
        description: desc,
    }
    rowCreate(book);
    bookList.push(book);
    window.localStorage.setItem("books", JSON.stringify(bookList)); 
    count++;
    window.localStorage.setItem('count', count.toString());
}

function changeBook(id){

    var title = document.getElementById('title'); var author = document.getElementById('author'); var desc = document.getElementById('description');

    var row = document.getElementById(id);
    for(let i=0; i<bookList.length; i++){
        if( bookList[i].id == id){
            index = i;
            break;
        }
    }
    var book = bookList[index];
    title.value = book.title;
    author.value = book.author;
    desc.value = book.description;

    var add = document.getElementById('addButton');
    add.setAttribute("hidden",true);
    var chg = document.getElementById('changeButton');
    chg.removeAttribute("hidden");
    chg.onclick= function(){
        book.title = title.value;
        book.author = author.value;
        book.description = desc.value;

        var row = document.getElementById(id);
        row.innerHTML="<td>" +book.title+ "</td> <td>" +book.author+ "</td><td>"+book.description;
        row.innerHTML+="</td><td> <button  class=\"btn btn-info\" onclick=\"changeBook("+book.id+")\">Modify</button> </td>";
        row.innerHTML+="</td><td> <button  class=\"btn btn-danger\" onclick=\"deleteBook("+book.id+")\">Delete</button> </td>";

        chg.setAttribute("hidden",true);
        add.removeAttribute("hidden");

        bookList[index] = book;
        window.localStorage.setItem("books", JSON.stringify(bookList));
    }

}

function deleteBook(id){
    var r = confirm("Are you sure you want to delete this book!");
    if (r == true) {
        let table = document.getElementsByTagName('table')[0];
        var row = document.getElementById(id);
        table.removeChild(row); 
        let index;
        for(let i=0; i<bookList.length; i++){
            if( bookList[i].id == id){
                index = i;
                break;
            }
        }
        bookList.splice(index,1);
        window.localStorage.setItem("books", JSON.stringify(bookList));
        
    }
}
