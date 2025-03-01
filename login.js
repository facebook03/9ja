// completed
const id = document.getElementById("id");
const password = document.getElementById("password");
const btn = document.getElementById("btn");
const error = document.getElementById("error");

id.addEventListener("input",(e) => {
  if(e.target.value.length === 7 && password.value.length >= 6){
    btn.style.opacity = 1;
  }
  else{
  btn.style.opacity = 0.3;
  }
});

password.addEventListener("input",(e) => {
  if(e.target.value.length >= 6 && id.value.length === 7){
    btn.style.opacity = 1;
  }
  else{
  btn.style.opacity = 0.3;
  }
});

btn.addEventListener("click",(e) => {
  if(!id.value || !password.value){
    return
  }
  else if(id.value.length === 7 && password.value.length >= 6){
    login(id.value,password.value,handleError);
  }
  
});

function handleError(message){
  if (!message) {
  error.innerText = "incorrect candidate!";
  }
  else{
    error.innerText = `Error: ${message}!`;
  }
}

xnav_array = [
  {
    name: "dashboard",
    func: function (){
      alert("please login to open dashboard!");
    },
    current: false
  },
    {
    name: "monitor",
    func: function (){
      alert("please login to open monitor!");
    },
    current: false
  },
    {
    name: "sgin up",
    func: function (){
      window.location = "signup.html";
    },
    current: false
  },
  ];
  
 xnav();
