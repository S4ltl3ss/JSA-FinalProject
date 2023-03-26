
function register(){
    const btn = document.querySelector("#btnRegister");
    btn.addEventListener("click", (e) =>{
        e.preventDefault()
        const email = document.querySelector("#email").value
        const password = document.querySelector("#password").value
        const users = getDataLocalStorage("users")

        users.push({email, password})

        setDataToLocalStorage("users", users)

    })
}

function login(){
    const btn = document.querySelector("#btnLogin");
    btn.addEventListener("click", (e) =>{
        e.preventDefault();
        const email = document.querySelector("#emailLogin").value;
        const password = document.querySelector("#passwordLogin").value;
        const users = getDataLocalStorage("users");
        const isLogin = false;
        for(let i = 0; i < users.length; i++){
            const user = users[i]
            if(user.email === email && user.password === password){
                setDataToLocalStorage("isLogin", true)
                alert("Login successful")
                window.location.href = "index.html";
                isLogin = true;
                
                break;
            }
        }
        if(isLogin === false){
            alert("Account or password is incorrect")
        }
    })  
}

function checkLogin(){
    const isLogin = getDataLocalStorage("isLogin");
    if(isLogin === true){
        window.location.href = "index.html"
    }
}

function getDataLocalStorage(item){
    return JSON.parse(localStorage.getItem(item))||[]

}

function setDataToLocalStorage(item, data){
    localStorage.setItem(item, JSON.stringify(data))
}

window.onload = function(){
    login()
    register()
}
checkLogin()
