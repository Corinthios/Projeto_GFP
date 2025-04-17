import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import Principal from './Components/Pages/Principal';
import Login from './Components/Pages/Login';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/principal" element={<Principal />} />
      </Routes>
    </Router>
  )
}