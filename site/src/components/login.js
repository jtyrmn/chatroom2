import axios from "axios";

function Login({usernameState, errorMessageState}) {
    const submit_login_data = () => {
        const username = document.getElementById("login_username").value;
        const password = document.getElementById("login_password").value;

        //our fuction that will send the login data to the server
        axios.post("/user/login", {
            username: username,
            password: password
        })
        .then(response => {
            //this runs with a successful login
            usernameState(username);
            //removing error messages
            errorMessageState(undefined);
            console.log('successful login');
        })
        .catch(error => {
            //this runs with an unsuccessful login
            errorMessageState(error.response ? error.response.data.msg : 'unknown error');
        });
    }
    return (
    <div className="login-page">
        Login
       <br/><input id="login_username" type="text" placeholder="username" />
       <br/><input id="login_password" type="password" placeholder="password" />
        <br/><button onClick={submit_login_data}>Login</button>
    </div>
  );
}

export default Login;