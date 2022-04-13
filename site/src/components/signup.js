import axios from "axios";

function Signup({usernameState}) {
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
            console.log('successful signup');
        })
        .catch(error => {
            //this runs with an unsuccessful login
            if(error.response){
                console.log(error.response.data);
                if(error.response.data.err === 'E_USERNAMETAKEN'){
                    //if invalid username
                    console.log('username taken');
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
        wowowowwwowowowo user signup 
       <input id="signup_username" type="text" placeholder="username" />
       <input id="signup_password" type="password" placeholder="password" />
         <button onClick={submit_signup_data}>Login</button>
    </div>
  );
}

export default Signup;