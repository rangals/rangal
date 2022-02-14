
function clickLogin()
{
    let txtUser = document.querySelector("#txtUsrName").value;
    if (txtUser.length != 1) { alert("Invalid User Name"); return;}

    loginUser(txtUser);
    return false;
}


function loginUser(userName){
    dat = JSON.stringify({
        id: userName
    });
    postData("/api/books", dat, getLogin);
}

function getLogin(data){
    let sp = document.querySelector(".output");
    sp.innerHTML = data.id + ' ' + data.title;
    console.log(data);
}

//--------------------------------------------------------------------------------
//                              Common functions
//--------------------------------------------------------------------------------
function postData(url, data, fn)
{
    //  Post request using fetch()
    fetch(url, {
            method: "POST",// Adding method type
            body: data, // Adding body or contents to send
            headers: { // Adding headers to the request
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) =>{ // Converting to JSON
             return response.json()})
        .then((json) => { // Displaying results to console
            //console.log(json);
            fn(json);//callback function
        });
        
}