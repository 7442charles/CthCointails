const URL = 'http://127.0.0.1:3000/api'
const form = document.querySelector("form");
nField = form.querySelector('.fullname'),
nInput = nField.querySelector('input'),
phoneField = form.querySelector(".phone-no"),
phoneInput = phoneField.querySelector("input"),
eField = form.querySelector(".email"),
eInput = eField.querySelector("input"),
pField = form.querySelector(".password"),
pInput = pField.querySelector("input"),
confPassField = form.querySelector(".confirm-password"),
confPassInput = confPassField.querySelector("input");

form.onsubmit = (e)=>{
  e.preventDefault(); //preventing from form submitting
  //if email and password is blank then add shake class in it else call specified function
  (eInput.value == "") ? eField.classList.add("shake", "error") : checkEmail();
  (pInput.value == "") ? pField.classList.add("shake", "error") : checkPass();
  (confPassInput.value == "") ? confPassField.add("shake", "error") : passMatch();

  setTimeout(()=>{ //remove shake class after 500ms
    eField.classList.remove("shake");
    pField.classList.remove("shake");
    confPassField.classList.remove("shake");
  }, 500);

  eInput.onkeyup = ()=>{checkEmail();} //calling checkEmail function on email input keyup
  pInput.onkeyup = ()=>{checkPass();} //calling checkPassword function on pass input keyup
  confPassInput.onkeyup = ()=>{passMatch();} //calling matchPassword function on input keyup 

  function checkEmail(){ //checkEmail function
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //pattern for validate email
    if(!eInput.value.match(pattern)){ //if pattern not matched then add error and remove valid class
      eField.classList.add("error");
      eField.classList.remove("valid");
      let errorTxt = eField.querySelector(".error-txt");
      //if email value is not empty then show please enter valid email else show Email can't be blank
      (eInput.value != "") ? errorTxt.innerText = "Enter a valid email address" : errorTxt.innerText = "Email can't be blank";
    }else{ //if pattern matched then remove error and add valid class
      eField.classList.remove("error");
      eField.classList.add("valid");
    }
  }

  function checkPass(){ //checkPass function
    if(pInput.value == ""){ //if pass is empty then add error and remove valid class
      pField.classList.add("error");
      pField.classList.remove("valid");
    }else{ //if pass is empty then remove error and add valid class
      pField.classList.remove("error");
      pField.classList.add("valid");
      //console.log(pInput.value);
      //passMatch();
    }
  }

  function passMatch() {
    if (confPassInput.value === pInput.value) {
      confPassField.classList.add("valid");
      confPassField.classList.remove("error");
    } else {
      confPassField.classList.add("error");
      confPassField.classList.remove("valid");
    }
  }

  //if eField and pField doesn't contains error class that mean user filled details properly
  if(!eField.classList.contains("error") && !pField.classList.contains("error") && !confPassField.classList.contains("error")){
    //console.log('email=', eInput.value, 'pass =', pInput.value, 'confirmed Password=', confPassInput.value );
    fetch(`${URL}/signup`, { //the login api url
      method: "post",
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        phone:phoneInput.value,
        email:eInput.value,
        name:nInput.value,
        password:confPassInput.value
      }),
    })
    .then((response) => response.json())
    .then((results) => {
      if (results.statusmsg == 'success') {
        Swal.fire(
          'Account Registered',
          'Proceed to login',
          'success'
        )
      } else {
        Swal.fire(
          'Email Taken',
          'Try a new email or proceed to login',
          'error'
        )
        let eError = document.querySelector('#email-error-field')
        //  eInput.value =""
        eField.classList.add("error")
        eError.innerText = "Email Taken!"
      }
      
    });
    //window.location.href = form.getAttribute("action"); //redirecting user to the specified url which is inside action attribute of form tag
  }
}


