import axios from "axios";

function Login({usernameState}) {
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
            console.log('successful login');
        })
        .catch(error => {
            //this runs with an unsuccessful login
            if(error.response){
                if(error.response.data.err === 'E_USERNOTFOUND'){
                    //if invalid username
                    console.log('invalid username');
                }else if(error.response.data.err === 'E_WRONGPASSWORD'){
                    //if invalid password
                    console.log('invalid password');
                }else if(error.response.data.err === 'E_DATAINVALID'){
                    console.log('invalid data');
                }
            }else{
                console.log('unknown error:', error);
            }
        });
    }
    return (
    <div className="login-page">
        wowowowwwowowowo user login 
       <input id="login_username" type="text" placeholder="username" />
       <input id="login_password" type="password" placeholder="password" />
         <button onClick={submit_login_data}>Login</button>
    </div>
  );
}

export default Login;