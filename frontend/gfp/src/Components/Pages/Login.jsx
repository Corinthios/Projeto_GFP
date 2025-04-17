import {useNavigate, Link} from 'react-router-dom'
import EStilo from '../Styles/Estilo'
export default function Login() {
    const navigate = useNavigate()
    return (
        <div>
            <h1>Login</h1>
            <button style={EStilo.botao} onClick={() => navigate('/principal')}>Entrar</button>
        </div>
    )
}
