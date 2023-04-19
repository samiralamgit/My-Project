const closeBtn=document.querySelector('.close-icon');
const logBtn=document.querySelector('.logBtn');
const logIn1=document.querySelector('.logIn1');

logBtn.onclick=function(){
    logIn1.classList.add('active1');
}

closeBtn.onclick=function(){
    logIn1.classList.remove('active1');
}

const logOut=document.querySelector('#logOut');
logOut.onclick=function(){
    alert("name");
}