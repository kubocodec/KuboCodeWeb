import { useState } from 'react';
import rubikscrambled from '../assets/rubik_v4.png';
import rubikResolved from '../assets/rubik_resolved.png';
import './Login.css';

const Login = ({ onValidate, onLoginSuccess, onBack }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Por favor completa todos los campos');
            return;
        }

        const isValid = onValidate(username, password);

        if (isValid) {
            setIsSuccess(true);
            setError('');
            // Wait for animation/visual confirmation before switching screens
            setTimeout(() => {
                onLoginSuccess();
            }, 1500);
        } else {
            setError('Usuario o contraseña incorrectos');
            setIsSuccess(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <button onClick={onBack} className="back-button">
                    &larr; Volver
                </button>
                <img
                    src={isSuccess ? rubikResolved : rubikscrambled}
                    alt="Kubo Code Logo"
                    className={`login-logo ${isSuccess ? 'resolved' : ''}`}
                />
                <h2>Bienvenido</h2>
                <p className="login-subtitle">Inicia sesión para continuar</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            className="form-input"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setError('');
                            }}
                            placeholder="Ingresa tu usuario"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                            placeholder="Ingresa tu contraseña"
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Entrar
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
