import React, { useState } from 'react';
import headerLogo from '../assets/logo_header.png';
import './Home.css';

const Home = ({ onNavigateToLogin }) => {
    const [view, setView] = useState('home');
    const [animationState, setAnimationState] = useState('idle');

    const handleNavigateToServices = () => {
        setAnimationState('moving-right');
        setTimeout(() => {
            setView('services');
            setAnimationState('positioned-right');
        }, 100);
    };

    const handleBackToHome = () => {
        setAnimationState('moving-left');
        setTimeout(() => {
            setView('home');
            setAnimationState('idle');
        }, 100);
    };

    // Services Content Component (Cleaned up)
    const ServicesContent = () => (
        <div className="services-container">
            {/* Header moved to main layout */}
            <div className="services-content-wrapper">
                <div className="hexagon-wrapper">
                    <div className="hexagon-shape"></div>
                </div>
                <div className="services-info">
                    <h3 className="services-subtitle">THE BIG CHALLENGE</h3>
                    <p>
                        In today's competitive business environment, effective communication is more essential than ever before.
                        It is the foundation upon which companies are built, careers are propelled, and knowledge is imparted.
                    </p>
                    <p>
                        Effective communication is critical - without it, misunderstandings arise, errors occur, and business goals are frustrated.
                        In short, effective communication is the key driver of long-term business and professional success.
                    </p>
                    <button className="cta-button primary">LEARN MORE</button>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`landing-container ${view === 'services' ? 'services-mode' : ''}`}>

            {/* HEADER BAR */}
            <header className="landing-header">
                {/* Services Back Button - Positioned Absolutely in Header */}
                {view === 'services' && (
                    <div className="services-back-header">
                        <button onClick={handleBackToHome} className="back-button">
                            {/* Thin SVG Arrow */}
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="arrow-icon"
                            >
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            SERVICIOS
                        </button>
                    </div>
                )}

                <div className="header-content">
                    {/* Hide Nav Links and Login when in Services View */}
                    <nav className={`header-nav ${view === 'services' ? 'hidden' : ''}`}>
                        <button className="nav-link active">INICIO</button>
                        <button className="nav-link" onClick={handleNavigateToServices}>SERVICIOS</button>
                        <button className="nav-link">NOSOTROS</button>
                        <button className="nav-link">CONTACTO</button>
                    </nav>

                    <button
                        onClick={onNavigateToLogin}
                        className={`login-nav-button ${view === 'services' ? 'hidden' : ''}`}
                    >
                        LOGIN
                    </button>
                </div>
            </header>

            {/* Floating Brand Box (Slider) */}
            <div className={`brand-box ${animationState}`}>
                <div className="brand-content-inner">
                    <img src={headerLogo} alt="Kubo Code" className="brand-logo" />
                    <div className="brand-text">
                        <span>KUBO</span>
                        <span>CODE</span>
                    </div>
                </div>
            </div>

            <main className="landing-main">
                {view === 'home' ? (
                    <>
                        <section className="hero-content">
                            <p className="hero-subtitle">DESARROLLO DE SOFTWARE</p>
                            <h2>
                                SOFTWARE QUE HACE<br />
                                CRECER TU NEGOCIO
                            </h2>
                            <p className="hero-description">
                                Creamos, modernizamos e integramos aplicaciones críticas que impulsan
                                ingresos, eficiencia y experiencia del cliente.
                            </p>
                            <div className="hero-actions">
                                <button className="cta-button primary">MÁS INFORMACIÓN</button>
                            </div>
                        </section>

                        <div className="scroll-indicator">
                            <div className="mouse-icon">
                                <div className="wheel"></div>
                            </div>
                        </div>
                    </>
                ) : (
                    <ServicesContent />
                )}
            </main>
        </div>
    );
};

export default Home;
