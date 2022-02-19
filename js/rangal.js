
//--------------------------------Intro Code-------------------------------------------------

let lastLogin = new Date().toDateString();
let getLastLogin = localStorage.getItem("lastLogin");

if (getLastLogin == null || (lastLogin != getLastLogin))
{
    setTimeout(() =>{
        document.body.classList.remove("intro");
        document.body.classList.remove("endIntro");
    }, 3000);

    setTimeout(() =>{
        document.body.classList.add("noIntro");
    }, 3500);

    setTimeout(() =>{
        document.body.classList.add("endIntro");
    }, 2000);

    localStorage.setItem("lastLogin", lastLogin);
}
else
{
    document.body.classList.remove("intro");
    document.body.classList.add("noIntro");
}

//--------------------------------Design code-------------------------------------------------

function changeMode(){
    let mode = document.querySelector(".mode input");
    //Default night mode
    document.body.classList.toggle('night');
    // if(mode.checked)    document.body.classList.add("night");
    // else document.body.classList.remove("night");
    
}

const btn = document.querySelector(".lnkbtn");

btn.addEventListener('click',()=>{
    var link = document.querySelector('.navlinks');
    var menubar = document.querySelector('.menu');
    link.classList.toggle('mobile-menu');//Change menu display
    menubar.classList.toggle('menu-back'); //Change background
    btn.classList.toggle('menu-index'); //change button index
})

//--------------------------------Login model-------------------------------------------------



// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

function displayLogin(disp)
{
    
    var modal = document.getElementById('divLogin');
    var modalForm = document.querySelector('#divLogin form');
    modalForm.classList.toggle("animate-in");

    // modalForm.classList.toggle('animate');
    modal.style.display = disp;
    var signupcontainer = document.querySelector('.signupcontainer');
    signupcontainer.style.display = 'none';   
    // document.getElementById("txtLoginUsrName").autofocus;
    return false;
}

function displayRegister(disp)
{
    var signupcontainer = document.querySelector('.signupcontainer');
    var logincontainer = document.querySelector('.logincontainer');
    
    signupcontainer.style.display = disp;
    signupcontainer.classList.toggle("animate-in");

    if(disp == 'block')
        logincontainer.style.display ='none';
    else
        logincontainer.style.display ='block';
    
    return false;
}

// navigator.clipboard.writeText(copyText.value);

//reference
//-----------------------------------------------------------------
// fetch("../api/books")
   
//     // Converting received data to JSON
//     .then(response => response.json())
//     .then(json => {
  
//         // Create a variable to store HTML
//         let li = `<tr><th>ID</th><th>Name</th></tr>`;
       
//         // Loop through each data and add a table row
//         json.forEach(user => {
//             li += `<tr>
//                 <td>${user.id} </td>
//                 <td>${user.title}</td>        
//             </tr>`;
//         });
  
//         // Display result
//         document.getElementById("users").innerHTML = li;
//     })
//     .catch(err => {
//         alert(err);
//     });
//-----------------------------------------------------------------
//simple get
// fetch("http://localhost:8080/api/books")
   
//     // Converting received data to JSON
//     .then(response => response.json())
//     .then(response => console.log(response));

//-----------------------------------------------------------------
// POST request using fetch()
// fetch("https://jsonplaceholder.typicode.com/posts", {
     
//     // Adding method type
//     method: "POST",
     
//     // Adding body or contents to send
//     body: JSON.stringify({
//         title: "foo",
//         body: "bar",
//         userId: 1
//     }),
     
//     // Adding headers to the request
//     headers: {
//         "Content-type": "application/json; charset=UTF-8"
//     }
// })
 
// // Converting to JSON
// .then(response => response.json())
 
// // Displaying results to console
// .then(json => console.log(json));


//-----------------------------------------------------------------
//Local storage

/*

myObject = {a: 1, b: 2, c: 3};
localStorage.setItem("uniq", JSON.stringify(myObject));
var myStorageObject = JSON.parse(localStorage.getItem("uniq"));
window.alert(myStorageObject.b);




*/