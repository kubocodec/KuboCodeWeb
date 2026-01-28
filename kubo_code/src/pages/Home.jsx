import './Home.css';
import headerLogo from '../assets/logo_header.png';

const Home = ({ onNavigateToLogin }) => {
    return (
        <div className="landing-container">
            <header className="landing-header">
                <div className="brand-container">
                    <img src={headerLogo} alt="Kubo Code Logo" className="header-logo" />
                    <h1>Kubo Code</h1>
                </div>
                <div className="header-actions">
                    <button className="nav-link">Soluciones</button>
                    <button className="nav-link">Servicios</button>
                    <button onClick={onNavigateToLogin} className="login-nav-button">
                        Iniciar Sesión
                    </button>
                </div>
            </header>

            <main className="landing-main">
                <section className="hero-content">
                    <p className="hero-subtitle">Nuestras soluciones</p>
                    <h2>Desarrollo de Software que acelera tu negocio</h2>
                    <p className="hero-description">
                        Creamos, modernizamos e integramos aplicaciones críticas que impulsan
                        ingresos, eficiencia y experiencia del cliente.
                    </p>
                    <div className="hero-actions">
                        <button className="cta-button primary">Habla con un experto</button>
                        <button onClick={onNavigateToLogin} className="cta-button secondary">
                            Acceder a la plataforma
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
