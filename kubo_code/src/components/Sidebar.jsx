import { useState } from 'react';
import './Sidebar.css';
import rubikIcon from '../assets/rubik_resolved.png'; // Using existing asset for brand

const Sidebar = ({ onLogout, activeOption, onSelectOption }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <div
            className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
            onMouseEnter={() => setIsCollapsed(false)}
            onMouseLeave={() => setIsCollapsed(true)}
        >
            <div className="sidebar-header">
                <img src={rubikIcon} alt="Logo" className="sidebar-logo" />
                <span className="sidebar-title">Kubo Code</span>
            </div>

            <nav className="sidebar-nav">
                <ul className="menu-list">
                    <li
                        className={`menu-item ${activeOption === 'home' ? 'active' : ''}`}
                        onClick={() => onSelectOption('home')}
                    >
                        <span className="icon">
                            {/* Home Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                        </span>
                        <span className="label">Inicio</span>
                    </li>

                    <li
                        className={`menu-item ${activeOption === 'proformas' ? 'active' : ''}`}
                        onClick={() => onSelectOption('proformas')}
                    >
                        <span className="icon">
                            {/* Document/Proformas Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        </span>
                        <span className="label">Proformas</span>
                    </li>
                </ul>

                <div className="sidebar-footer">
                    <button onClick={onLogout} className="menu-item logout-item">
                        <span className="icon">
                            {/* Logout Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        </span>
                        <span className="label">Cerrar Sesión</span>
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
