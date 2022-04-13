import axios from "axios";

function Signup({usernameState, errorMessageState}) {
    const submit_signup_data = () => {
        const username = document.getElementById("signup_username").value;
        const password = document.getElementById("signup_password").value;

        //our fuction that will send the signup data to the server
        axios.post("/user/signup", {
            username: username,
            password: password
        })
        .then(response => {
            //this runs with a successful signup
            usernameState(username);
            //removing error messages
            errorMessageState(undefined);
            console.log('successful signup');
        })
        .catch(error => {
            //this runs with an unsuccessful signup
            errorMessageState(error.response ? error.response.data.msg : 'unknown error');
        });
    }
    return (
    <div className="login-page">
        wowowowwwowowowo user signup 
       <input id="signup_username" type="text" placeholder="username" />
       <input id="signup_password" type="password" placeholder="password" />
         <button onClick={submit_signup_data}>Login</button>
    </div>
  );
}

export default Signup;