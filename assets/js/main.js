// Get the Elements 
let lBtn = document.querySelector('.btn-login'),
  closebtn =  document.querySelector('.close'),
  login = document.querySelector('.loginform'),
  opacity = document.createElement('div'),
  setting = document.querySelector('.setting'),
  isactive = false,
  nameInput = document.querySelector('.name'),
  ageInput = document.querySelector('.age'),
  themeInput = document.querySelector('select'),
  btns = document.querySelectorAll('.nBtn'),
  res = document.querySelector('.result'),
  nameValue =  window.localStorage.getItem('name'),
  ageValue = window.localStorage.getItem('age'),
  themeValue = window.localStorage.getItem('theme'),
  answerInput = document.querySelector('.answer'),
  total = 0,
  totalAnswer = 0,
  count = 0;

lBtn.addEventListener('click', () =>{ 
  showFormO()
  login.classList.add("active");
})
closebtn.addEventListener('click', () => {
  login.classList.remove('active')
  document.body.removeChild(opacity)
})
setting.addEventListener('click', () =>{
  login.classList.add("active");
  showFormO()
  document.querySelector('.head').innerHTML = "Settings";
  document.querySelector('.loginBtn').innerHTML = "Change";
})
document.querySelector("form").onsubmit = function(){ 
  // prevent the event of the form
  if (nameInput.value == '' || ageInput.value == ""){
    form.preventDefault()
  } else {
    // Save to local storge
    window.localStorage.setItem('isactive', true);
    window.localStorage.setItem('name', nameInput.value)
    window.localStorage.setItem('age', ageInput.value)
    window.localStorage.setItem('theme', themeInput.value)
    document.body.removeChild(opacity)
    login.classList.remove("active");
    document.querySelector('.head-kid').innerHTML = "Welcome " + nameValue + '<br>' + 'Your Age is ' + ageValue
  }
}
function showFormO(){
  // func.. to show the dark bg
  document.body.appendChild(opacity)
  opacity.style = `position: absolute;left: 0;top: 0;width: 100%;height: 100%;background-color: #000000a3;z-index: 20;display: block;`
}   

btns.forEach((e)=>{
  e.addEventListener('click', (c)=>{
    if (c.target.innerHTML == 'C') {
      res.innerHTML = "";
      answerInput.value = '';
    }
    if (res.innerHTML.slice(-1) == '=') {
      if (res.innerHTML == "") {
        res.innerHTML = "Enter a Number";
      } else if (c.target.innerHTML != 'Submit'){
        total = eval(res.innerHTML.split('=').join(""))
        toShowNumber('ss')
      } else if (c.target.innerHTML == 'Submit'){  
        if (total == eval(answerInput.value)){
          count++
          answerInput.value = "";
          res.innerHTML = 'Great Job';
          document.querySelector('.score').textContent = count;
        } else {
          answerInput.value = "";
          res.innerHTML = "Try again";
        }
      }
    } else if (c.target.innerHTML != 'C' && c.target.innerHTML != 'Submit'){
      if (res.innerHTML == "Enter a Number" || res.innerHTML == "Great Job" || res.innerHTML == "Try again") {
        res.innerHTML = "";
        answerInput.value = "";
      }     
      toShowNumber('res')
    } 
    function toShowNumber(input) {
      let btn = input;
      if (btn == 'res') {
        res.innerHTML += c.target.innerHTML;
      } else {
        answerInput.value += c.target.innerHTML
      }
    }
  })
})
// Chech the localstorage
if (window.localStorage.getItem('isactive')){
  isactive = window.localStorage.getItem('isactive');  
}
if (isactive == 'true') {
  // get the value of the inputs
  nameInput.value = nameValue;
  ageInput.value = ageValue;
  themeInput.value = themeValue;

  lBtn.classList.remove('active')
  setting.classList.add('active')
  // toggle the root to change the theme
  let moodChange = document.querySelector(':root');
  if (themeValue == "Space") {
    moodChange.style.cssText  = `--main-color: #c012ca;
    --background-img: url('../images/Spacebg.avif');`;
  } else if (themeValue == 'Ocean') {
    moodChange.style.cssText  = `--main-color: teal;
    --background-img: url('../images/Oceanbg.jpg');`;
  }  else if (themeValue == 'Tech') {
    moodChange.style.cssText  = `--main-color: #75baff;
    --background-img: url('../images/Techbg.jpg');`;
  } else if (themeValue == 'Normal'){
    moodChange.style.cssText  = `--main-color: #1A2238;
    --background-img: none;`;
  }
  // Show the massege
  document.querySelector('.head-kid').innerHTML = "Welcome " + nameValue + '<br>' + 'Your Age is ' + ageValue
} else {
  nameInput.value = "";
  ageInput.value = "";
  themeInput.value = "Normal";
}

