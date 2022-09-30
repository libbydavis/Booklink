import {useState} from "react";
import axios from "axios";
import '../App.css';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";

function Login() {
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    });
    const [logInError, setLogInError] = useState("");
    const navigate = useNavigate();

    const login = () => {
        axios.post('http://localhost:4000/authenticate', loginDetails, {timeout: 5000}).then((res) => {
            if (res.status === 200 && res.data === true) {
                navigate('../booking', {state: {companyID: "63295353c5eec762e96a5e9b"}});
            }
        }).catch((err) => {
            if (err.response.status === 404) {
                setLogInError(err.response.data.error);
            }
            else {
                setLogInError("network error");
            }
        });
    }

    return (
        <div>
            <h3 className="title">Login to Booklink</h3>
            <div className="loginContainer">
                <input className="inputClean" value={loginDetails.email} placeholder="email" onChange={(e) => setLoginDetails({...loginDetails, email: e.target.value})}/>
                <input className="inputClean" type="password" value={loginDetails.password} placeholder="password" onChange={(e) => setLoginDetails({...loginDetails, password: e.target.value})}/>
                <button className="bookerButton" onClick={login}>login</button>
                <p style={{display: "inline", marginRight: "5px"}}>Don't have an account?</p><Link style={{display: "inline"}} to="../register">Register here</Link>
                <p>{logInError.length > 0 ? logInError : null}</p>
            </div>
        </div>
    )

}
export default Login;
