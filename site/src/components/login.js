import axios from "axios";
import { useEffect } from "react";

function Login({usernameState}) {
    const submit_login_data = () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        //our fuction that will send the login data to the server
        axios.post("/user/login", {
            username: username,
            password: password
        })
        .then(response => {
            //this runs with a successful login
            console.log(response.data);
        })
        .catch(error => {
            //this runs with an unsuccessful login
            if(error.response){
                console.log(error.response.data);
                if(error.response.data.err == 'E_USERNOTFOUND'){
                    //if invalid username
                    console.log('invalid username');
                }else if(error.response.data.err == 'E_WRONGPASSWORD'){
                    //if invalid password
                    console.log('invalid password');
                }
            }else{
                console.log('unknown error:', error);
            }
        });
    }
    return (
    <div className="login-page">
        wowowowwwowowowo user signup 
       <input id="username" type="text" placeholder="username" />
       <input id="password" type="password" placeholder="password" />
         <button onClick={submit_login_data}>Login</button>
    </div>
  );
}

export default Login;