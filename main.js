const url = "https://getpantry.cloud/apiv1/pantry/03507b42-55c3-46a0-a747-accd683ab00a/basket/";
//login 

async function login(id, password,callback){
  if(!id || !password){
  return;
  }
  
  const fullurl = url + id;
  const req = await fetch(fullurl);
  if(!req.ok){
    callback("account not found!");
    throw new Error("network issues");
  }
  const contentType = req.headers.get("content-type");
  let data;
  if(contentType && contentType.includes("application/json")){
  data = await req.json();
  }else{
   callback("no account found!");
   throw new Error("no account found");
  }
  if(data.password !== password){
    callback();
    return;
  }
  
  setCookie("userSession",id,30);
  window.location = "index.html";
 
}

//logout

function logout(){
  document.cookie = "userSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "userSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
  alert("you have been logout!");
  window.location = "login.html";
}

//create account
async function createAccount(user={},callback){
  const sig = {
    click: 3,
   isagent: false,
   loggedin: [],
   live: []
  }
  const signup = {...sig,...user};
  console.log(signup);
  const {id,password} = signup;
  if(!id || !password){
  return;
  }
 
 const fullurl = url + id;
  const req = await fetch(fullurl,{
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(signup)
  });
  
  callback("created");
  setCookie("account","yes",365);
}



//send click - gold mine
async function sendClick(amount,userid){
 const fullurl = url + userid;
  const req = await fetch(fullurl);
 const data = await req.json();
 const bclick =  data.click += amount;
 validateClick(bclick,userid);
}

async function validateClick(data, userid){
 const fullurl = url + userid;
  const req = await fetch(fullurl,{
    method: "PUT",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      click: data
    })
  });
}

//send click agent

async function agentSendClick(amount,agentId,userId){
  const agentUrl = url + agentId;
  const agentReq = await fetch(agentUrl);
  const agentData = await agentReq.json();
  const agentClick = agentData.click;
  if(agentClick >= amount){
    sendClick(amount,userId);
  const balance = agentClick - amount;
    const req = await fetch(agentUrl,{
    method: "PUT",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      click: balance
    })
  });
  }
  
}

//set cookies
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 3600 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/; Secure; SameSite=Strict"; 
}

// generateID
function generateID(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

//get cookie
function getcookie(name) {
  const cookies = document.cookie;
 const token = cookies.split(";");
 let result = null;
 token.forEach(jwt => {
   if(jwt.startsWith(` ${name}`) || jwt.startsWith(name)){
     const projwt = jwt.split("=");
     result = projwt[1];
   }
 });
 return result;
}

const domready = new Promise((resolve, reject) => {
  function check(){
    if(document.readyState === "complete"){
      clearInterval(check);
      resolve(true)
    }
  }
  
  setInterval(check,100);
});


function style(elem, styles = {}){
   Object.keys(styles).forEach(sty => {
    elem.style[sty] = styles[sty];
  });
   }
let xnav_array = [
  {
    name: "dashboard",
    func: null,
    current: true
  },
    {
    name: "monitor",
    func: null,
    current: false
  },
    {
    name: "logout",
    func: null,
    current: false
  },
  ];
const nav_main01 = document.createElement("div");
const nav_main02 = document.createElement("div");
const nav_headc = document.createElement("div");
nav_headc.innerHTML = "&#9932";
const nav_header = document.createElement("div");
const nav_ul01 = document.createElement("ul");
nav_header.appendChild(nav_headc);
style(nav_headc,{
  fontSize: "2em",
  color: "white",
  marginRight: "0.5em"
});
style(nav_header,{
  width: "50%",
  height: "4em",
  background: "dodgerblue",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
});

function xnav(){
xnav_array.forEach(child => {
  const li = document.createElement("li");
  li.innerText = child.name;
  nav_ul01.appendChild(li);
  li.addEventListener("click",child.func);
  if(child.current === true){
    style(li,{
    width: "90%",
    padding: "1em",
    background: "dodgerblue",
    margin: "1em 0em",
    boxSizing: "border-box",
    borderRadius: "1em",
    textTransform: "capitalize",
    color: "white"
  })
  }else{
  style(li,{
    width: "90%",
    padding: "1em",
    background: "whitesmoke",
    margin: "1em 0em",
    boxSizing: "border-box",
    borderRadius: "1em",
    textTransform: "capitalize"
  })
  }
});
}
nav_main02.appendChild(nav_header);
nav_main02.appendChild(nav_ul01);
nav_main01.appendChild(nav_main02);
style(nav_ul01,{
  width: "50%",
  listStyleType: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  
});
style(nav_main01,{
  background: "rgba(0, 0, 0, 0)",
  width: "100%",
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 5,
  overflow: "hidden",
  display: "none",
});
style(nav_main02,{
  backgroundColor: "white",
  width: "100%",
  height: "100vh",
  position: "absolute",
  top: 0,
  left: "100%",
  zIndex: 5,
  opacity: 1,
});

function outMenu(){
  style(nav_main01,{
  display: "block",
  background: "rgba(0, 0, 0, 0.3)",
  transition: "0.5s"
});
  style(nav_main02,{
  backgroundColor: "white",
  width: "100%",
  height: "100vh",
  position: "absolute",
  top: 0,
  left: "50%",
  zIndex: 5,
  opacity: 1,
  transition: "0.5s",
});
}

function inMenu(){
  style(nav_main01,{
  background: "rgba(0, 0, 0, 0)",
  transition: "0.5s"
});
  style(nav_main02,{
  backgroundColor: "white",
  width: "100%",
  height: "100vh",
  position: "absolute",
  top: 0,
  left: "100%",
  zIndex: 5,
  opacity: 1,
  transition: "0.5s",
});
setTimeout(() => {
  style(nav_main01,{
  display: "none"
});
},500);

}

domready.then(d => {
  if(d === true){
    document.body.appendChild(nav_main01);
  const menu =  document.getElementById("menu");
  menu.addEventListener("click",(e) => {
      outMenu();
    })
  
  }
});

nav_headc.addEventListener("click",(e) =>{
  inMenu();
});


function getupdate(url, callback, config = {}) {
  const defaultConfig = {
    polling: true,
    type: "short", // Default to short polling
    time: 7000,
  };
  const mainConfig = { ...defaultConfig, ...config };
  const { polling, type, time } = mainConfig;

  if (typeof callback !== "function") {
    throw new Error("callback must be a function");
  }

  if (polling === true) {
    if (type === "long" && time < 7000) {
      throw new Error("long polling time can't be less than 6 seconds");
    }

    if (type === "short" && time > 7000) {
      throw new Error("short polling time can't be greater than 6 seconds");
    }

    const intervalId = setInterval(async () => {
      try {
        const req = await fetch(url);
        if (!req.ok) {
          throw new Error(`HTTP error! status: ${req.status}`);
        }
    
        const contentType = req.headers.get("content-type");
      
        let res;

        if (contentType && contentType.includes("application/json")) {
          res = await req.json();
    
        } else {
          res = await req.text();
        }
      
        callback(res);
      } catch (error) {
        console.error("Error during polling:", error);
      }
    }, time);

    // Immediately execute the callback for the first time
    (async () => {
      try {
        const req = await fetch(url);
        if (!req.ok) {
          throw new Error(`HTTP error! status: ${req.status}`);
        }
        const contentType = req.headers.get("content-type");
        let res;

        if (contentType && contentType.includes("application/json")) {
          res = await req.json();
        } else {
          res = await req.text();
        }

        callback(res);
      } catch (error) {
        console.error("Error during first time polling:", error);
      }
    })();

    return {
      stop: () => clearInterval(intervalId),
    };
  }
}


async function getUserData(id,callback){
  if (typeof callback !== "function") {
    throw new Error("callback must be a function!");
  }
  const req = await fetch(url + id);
  if(!req.ok){
    throw new Error(`Error: ${req.status}`);
  }
  const res = await req.json();
  callback(res);
}
