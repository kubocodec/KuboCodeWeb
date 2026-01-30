import React, { useState } from 'react';
import headerLogo from '../assets/logo_header.png';
import videoKubocode from '../assets/video_kubocode.mp4';
import aboutUsImage from '../assets/about_us_image.jpg';

import './Home.css';

const Home = ({ onNavigateToLogin }) => {
    const [view, setView] = useState('home');
    const [animationState, setAnimationState] = useState('idle');

    // ... (existing code)



    const handleNavigateToServices = () => {
        setAnimationState('moving-right');
        setTimeout(() => {
            setView('services');
            setAnimationState('positioned-right');
        }, 100);
    };

    const handleNavigateToNosotros = () => {
        setAnimationState('moving-right');
        setTimeout(() => {
            setView('nosotros');
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

    // Services Data with Inline SVGs
    const SERVICES_DATA = [
        {
            id: 1,
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
            ),
            title: 'Desarrollo de software',
            description: 'Creamos programas personalizados que se ajustan exactamente a los objetivos y flujos de trabajo de tu negocio.'
        },
        {
            id: 2,
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
            ),
            title: 'Automatización',
            description: 'Reducimos tareas manuales y repetitivas mediante sistemas inteligentes que aumentan la productividad y disminuyen errores.'
        },
        {
            id: 3,
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
            ),
            title: 'Gestión empresarial',
            description: 'Diseñamos plataformas para administrar información, clientes, inventarios y operaciones desde un solo lugar.'
        },
        {
            id: 4,
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
            ),
            title: 'Integración',
            description: 'Conectamos tus sistemas actuales con nuevas herramientas para que todo funcione de forma sincronizada y eficiente.'
        },
        {
            id: 5,
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                </svg>
            ),
            title: 'Modernización',
            description: 'Mejoramos software existente para hacerlo más rápido, seguro y preparado para el crecimiento.'
        }
    ];

    // Services Content Component (Cleaned up)
    const ServicesContent = () => {
        const [selectedService, setSelectedService] = useState(null);

        return (
            <div className="services-container">
                {/* Header moved to main layout */}
                <div className="services-content-wrapper">
                    <div className="hexagon-wrapper">
                        <div className="hexagon-shape">
                            <video
                                src={videoKubocode}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="hexagon-video"
                            />
                        </div>
                    </div>
                    <div className="services-info">
                        <h3 className="services-subtitle">¿Cuáles son los servicios que te brinda KuboCode?</h3>
                        <p className="services-intro">
                            En KuboCode ofrecemos soluciones tecnológicas diseñadas para que los negocios trabajen mejor, más rápido y con mayor control.
                            Desarrollamos software avanzado que se adapta a las necesidades reales de cada empresa, transformando procesos complejos en herramientas simples y eficientes.
                        </p>

                        <div className="services-grid">
                            {SERVICES_DATA.map((service) => (
                                <div
                                    key={service.id}
                                    className="service-card"
                                    onClick={() => setSelectedService(service)}
                                >
                                    <div className="service-icon-wrapper">
                                        {service.icon}
                                    </div>
                                    <h4 className="service-title">{service.title}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* SERVICE MODAL OVERLAY */}
                {selectedService && (
                    <div className="service-modal-overlay" onClick={() => setSelectedService(null)}>
                        <div className="service-modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close" onClick={() => setSelectedService(null)}>×</button>
                            <div className="modal-header">
                                <div className="modal-icon-wrapper">
                                    {selectedService.icon}
                                </div>
                                <h3>{selectedService.title}</h3>
                            </div>
                            <p className="modal-description">{selectedService.description}</p>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Nosotros Content Component
    const NosotrosContent = () => (
        <div className="services-container">
            <div className="services-content-wrapper">
                <div className="hexagon-wrapper">
                    <div className="hexagon-shape">
                        <img
                            src={aboutUsImage}
                            alt="Sobre Nosotros"
                            className="hexagon-video"
                        />
                    </div>
                </div>
                <div className="services-info">
                    <h3 className="services-subtitle">¿Quiénes somos?</h3>
                    <div className="services-intro">
                        <p style={{ marginBottom: '1rem' }}>
                            KuboCode nace a partir de una necesidad real: desarrollar soluciones de software modernas y eficientes para responder a los retos operativos de la empresa Soprint. Lo que inició como una respuesta interna a problemas específicos, rápidamente evolucionó en una propuesta tecnológica capaz de ayudar a otros negocios a optimizar sus procesos y tomar mejores decisiones.
                        </p>
                        <p style={{ marginBottom: '1rem' }}>
                            Con el tiempo, KuboCode ha desarrollado diversos proyectos tecnológicos, destacándose Parking Club, una aplicación abierta al público que permite a los usuarios identificar parqueaderos cercanos a su ubicación en tiempo real. Al mismo tiempo, la plataforma funciona como una herramienta de control y gestión para los propietarios de parqueaderos, brindándoles acceso a datos actualizados sobre disponibilidad, uso y operación de sus espacios.
                        </p>
                        <p>
                            Hoy, KuboCode combina experiencia, innovación y enfoque práctico para crear software que resuelve problemas reales y aporta valor tangible a las empresas.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );


    return (
        <div className={`landing-container ${view === 'services' || view === 'nosotros' ? 'services-mode' : ''}`}>

            {/* HEADER BAR */}
            <header className="landing-header">
                {/* Back Button - Positioned Absolutely in Header */}
                {(view === 'services' || view === 'nosotros') && (
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
                            {view === 'services' ? 'SERVICIOS' : 'NOSOTROS'}
                        </button>
                    </div>
                )}

                <div className="header-content">
                    {/* Hide Nav Links and Login when in Services/Nosotros View */}
                    <nav className={`header-nav ${view !== 'home' ? 'hidden' : ''}`}>
                        <button className="nav-link active">INICIO</button>
                        <button className="nav-link" onClick={handleNavigateToServices}>SERVICIOS</button>
                        <button className="nav-link" onClick={handleNavigateToNosotros}>NOSOTROS</button>
                        <button className="nav-link">CONTACTO</button>
                    </nav>

                    <button
                        onClick={onNavigateToLogin}
                        className={`login-nav-button ${view !== 'home' ? 'hidden' : ''}`}
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
                    view === 'services' ? <ServicesContent /> : <NosotrosContent />
                )}
            </main>
        </div>
    );
};

export default Home;
