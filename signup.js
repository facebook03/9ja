// complete

if(getcookie("account")){
  alert("sorry! you already have an account... you can't create another plz login");
  window.location = "login.html";
}

const idbox = document.getElementById("idbox");
const cp = document.getElementById("cp");
const password = document.getElementById("password");
const ca = document.getElementById("ca");
const info = document.getElementById("info");
const generatedId = generateID(7);
const pageId = generateID(5);
idbox.innerText = `your id: ${generatedId}`;

password.addEventListener("input",(e) =>{
  let message = "";
  if(e.target.value.length >= 6 && e.target.value.length < 8){
    message = "strength: Good!";
    ca.style.opacity = 1;
    info.innerText = message;
    info.style.color = "green";
    
  }
  else if(e.target.value.length < 6){
    message = "Weak: password most be greater or equal 6";
    ca.style.opacity = 0.3;
    info.innerText = message;
    info.style.color = "red";
  }
  else if(e.target.value.length >= 8){
    message = "strength: strong!";
    ca.style.opacity = 1;
    info.innerText = message;
    info.style.color = "green";
  }
});

cp.addEventListener("click",(e) => {
  if(navigator.clipboard){
    navigator.clipboard.writeText(generatedId);
    cp.innerText = "copied!";
    cp.style.background = "whitesmoke";
    setTimeout(() => {
      cp.innerText = "copy";
      cp.style.background = "white";
    },2000);
  }
});

ca.addEventListener("click",async (e) => {
  const req = await fetch(url + generatedId);
  if(!req.ok){
    alert("network error try again!");
    throw new Error("network error");
  }
  const res = req.text();
  if(res === `Could not get basket: ${generatedId} does not exist`){
  if(password.value.length >= 6){
    const data = {
      id: generatedId,
      password: password.value,
      page: pageId
    }
    createAccount(data,cahandler);
  }
  }
  else {
    alert("failed to create account please try again")
  }
});


function cahandler(message){
  if(message === "created"){
    ca.removeEventListener("click",() =>{});
    ca.innerText = "go to login page";
    let message = `your account is created! id: ${generatedId} <br> please copy your id and login your account!`;
    password.style.display = "none";
    info.innerHTML = message;
    info.style.color = "black";
    info.style.fontSize = "1.2em";
    ca.style.opacity = 1;
    ca.addEventListener("click",(e) =>{
   window.location = "login.html";
})
  }
}

xnav_array = [
  {
    name: "dashboard",
    func: function (){
      alert("please sign up first!");
    },
    current: false
  },
    {
    name: "monitor",
    func: function (){
      alert("please sign up & login to open your powerful monitor!");
    },
    current: false
  },
    {
    name: "log in",
    func: function (){
      window.location = "login.html";
    },
    current: false
  },
  ];
  
 xnav();
