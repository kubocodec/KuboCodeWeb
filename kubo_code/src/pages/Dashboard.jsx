import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
  return (
    <div className="home-container">
      <header>
        <h1>Inicio</h1>
        <button onClick={onLogout} className="logout-button">Cerrar Sesión</button>
      </header>
      <main>
        <p>Bienvenido al sistema.</p>
      </main>
    </div>
  );
};

export default Dashboard;
