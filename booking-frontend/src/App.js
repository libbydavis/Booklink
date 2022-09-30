import './App.css';
import {useNavigate} from "react-router";

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
        <h3>Booker</h3>
        <button onClick={() => navigate('/login')}>login</button>
    </div>
  );
}

export default App;
