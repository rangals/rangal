 var servurl = 'http://15.207.210.23:80';
//var servurl = 'http://localhost:91';

//--------------------------------------------------------------------------------
//                              Login
//--------------------------------------------------------------------------------
function frmLogin()
{
    let txtUser = document.querySelector("#txtLoginUsrName").value;
    let txtPwd = document.querySelector("#txtLoginPwd").value;
    if (txtUser.length < 2) { alert("User Name is too short"); return;}
    if (txtPwd.length < 3) { alert("Password is too short"); return;}

    loginUser(txtUser, txtPwd);
    return false;
}


function loginUser(userName, txtPwd){
    dat = JSON.stringify({
        un: userName
     ,  pwd: txtPwd    
    });
    postData("/api/user", dat, getLogin);
}

function getLogin(data){
    // let sp = document.querySelector(".output");
    // sp.innerHTML = data.id + ' ' + data.title;
    alert(data.msg);
    if(data.msg === "Login Success")
    {
        let lnkUser = document.querySelector("#lnkUser");
        let lnkLogin = document.querySelector("#lnkLogin");
        lnkLogin.classList.toggle('hideContent');
        lnkUser.classList.toggle('hideContent');
        displayLogin('none');
    }
    
    return false;    
}

//--------------------------------------------------------------------------------
//                              Register
//--------------------------------------------------------------------------------

function frmRegister(){
    let txtRegUsrName = document.querySelector("#txtRegUsrName").value;
    let txtRegPwd = document.querySelector("#txtRegPwd").value;
    let txtRegEmail = document.querySelector("#txtRegEmail").value;
    let txtRegMobile = document.querySelector("#txtRegMobile").value;

    if (txtRegUsrName.length < 2) { alert("User Name is too short"); return;}
    if (txtRegPwd.length < 3) { alert("Password is too short"); return;}
    if (txtRegEmail.length < 1) { alert("Email is required"); return;}

    regUser(txtRegUsrName, txtRegPwd, txtRegEmail, txtRegMobile);
    return false;
}

function regUser(userName, txtPwd, txtEmail, txtMobile){
    dat = JSON.stringify({
        un: userName
     ,  pwd: txtPwd  
     ,  email:    txtEmail
     ,  phone:   txtMobile 
    });
    postData("/api/reguser", dat, getRegister);
}

function getRegister(data){
    // let sp = document.querySelector(".output");
    // sp.innerHTML = data.id + ' ' + data.title;
    alert(data.msg);
    // console.log(data.msg);
    if(data.msg === "Success")
    {
        let lnkUser = document.querySelector("#lnkUser");
        let lnkLogin = document.querySelector("#lnkLogin");
        lnkLogin.classList.toggle('hideContent');
        lnkUser.classList.toggle('hideContent');
        displayRegister('none');
        displayLogin('none');
    }
    
    return false;    
}

//--------------------------------------------------------------------------------
//                              Common functions
//--------------------------------------------------------------------------------
function postData(url, data, fn)
{
    //  Post request using fetch()
    fetch(servurl+ url, {
            method: "POST",// Adding method type
            body: data, // Adding body or contents to send
            headers: { // Adding headers to the request
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) =>{ // Converting to JSON
             return response.json()})
        .then((json) => { // Displaying results to console
            //alert(json);
            fn(json);//callback function
        });
        
}