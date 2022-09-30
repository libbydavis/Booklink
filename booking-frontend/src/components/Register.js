import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";

function Register() {
    const [registrationDetails, setRegistrationDetails] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        phone: ""
    });
    const navigate = useNavigate();

    const register = () => {
        axios.post('http://localhost:4000/register', registrationDetails).then((res) => {
            if (res.status === 200) {
                navigate('../booking', {state: {companyID: "63295353c5eec762e96a5e9b"}});
            }
            else {
                console.log("problem")
            }
        }).catch(err => console.error(err));
    }

    return (
        <div>
            <h3 className="title">Register for a Booklink Account</h3>
            <div className="loginContainer">
                <input className="inputClean" placeholder="email" value={registrationDetails.email} onChange={(e) => setRegistrationDetails({...registrationDetails, email: e.target.value})}/>
                <input className="inputClean" placeholder="first name" value={registrationDetails.firstName} onChange={(e) => setRegistrationDetails({...registrationDetails, firstName: e.target.value})}/>
                <input className="inputClean" placeholder="last name" value={registrationDetails.lastName} onChange={(e) => setRegistrationDetails({...registrationDetails, lastName: e.target.value})}/>
                <input className="inputClean" placeholder="password" type="password" value={registrationDetails.password} onChange={(e) => setRegistrationDetails({...registrationDetails, password: e.target.value})}/>
                <input className="inputClean" placeholder="phone" value={registrationDetails.phone} onChange={(e) => setRegistrationDetails({...registrationDetails, phone: e.target.value})}/>
                <button className="bookerButton" onClick={register}>register</button>
            </div>
        </div>
    )
}

export default Register;
