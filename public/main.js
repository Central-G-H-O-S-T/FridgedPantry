//Sign up
document.getElementById("signUpBtn").addEventListener('click', e=>{
    const name = document.getElementById("createName").value;
    const email = document.getElementById("createEmail").value;
    const password = document.getElementById("createPassword").value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
        alert('Account successfully created');
    })
        .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
            alert('Email currently in use');
          } 
        else if (errorCode === 'auth/invalid-email') {
            alert('Email invalid');
          }
        else if (errorCode === 'auth/weak-password') {
            alert('Password too weak');
          }
        else {
            alert(errorMessage);
          }
        console.log(error);
    });

    //database
    var db = firebase.database().ref('users');
    db.set({
        name: name,
        email: email
    }).catch(function(error) {
        alert('Database error');
    });
    logInStatus();
});

//Log in
document.getElementById("logInBtn").addEventListener('click', e=>{
    const email = document.getElementById("userEmail").value;
    const password = document.getElementById("userPassword").value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password' || errorCode == 'auth/user-not-found') {
            alert('Incorrect email/password.');
          } else {
            alert(errorMessage);
          }
        logInStatus();
    });
});




window.onload = function() {
    logInStatus();
}


//show/hide if logged in or out
function logInStatus() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            document.getElementById("signUpSection").setAttribute('hidden', 'true');  document.getElementById("logInSection").setAttribute('hidden', 'true'); 
            document.getElementById("logOut").removeAttribute('hidden');
            document.getElementById("sections").classList.remove("flex");
            document.getElementById("recipeSection").classList.add("onlyItem");
        } 
        else {
            document.getElementById("signUpSection").removeAttribute('hidden');
            document.getElementById("logInSection").removeAttribute('hidden');
             document.getElementById("logOut").setAttribute('hidden', 'true');
             document.getElementById("sections").classList.add("flex");
            document.getElementById("recipeSection").classList.remove("onlyItem");
          }
    });
}

 function showLogIn(){
     document.getElementById("logInSection").removeAttribute('hidden');
 }
function showSignUp(){
     document.getElementById("signUpSection").removeAttribute('hidden');
 }

function logOut() {
    firebase.auth().signOut().then(function() {
          //alert("Successful sign out");
        }).catch(function(error) {
          alert("An error occured");    
    });
}