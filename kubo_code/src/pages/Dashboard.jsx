import { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import ProformaForm from '../components/ProformaForm';
import ProformaPreview from '../components/ProformaPreview';
import html2pdf from 'html2pdf.js';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState('home');
  const [isFinalPreview, setIsFinalPreview] = useState(false);
  const [formKey, setFormKey] = useState(0); // Key to force reset form component
  const previewRef = useRef(null);

  // Helper to generate fresh state
  const getInitialState = () => ({
    // Datos Personales
    nombre: '',
    empresa: '',
    ruc: '',
    direccion: '',
    telefono: '',
    email: '',
    // Asesor
    asesor: '',
    // Producto
    numProductos: 1,
    items: [
      { id: 1, descripcion: '', cantidad: '', precioUnitario: '', total: '' }
    ],
    // Totals
    subtotal: 0,
    // Fechas
    fechaEmision: new Date().toISOString().split('T')[0],
    validoHasta: '',
    // Meta
    numeroProforma: '001-' + Math.floor(1000 + Math.random() * 9000)
  });

  const [formData, setFormData] = useState(getInitialState());

  // Auto-calculate Item Totals & Grand Subtotal
  useEffect(() => {
    const newItems = formData.items.map(item => {
      const cant = parseFloat(item.cantidad) || 0;
      const price = parseFloat(item.precioUnitario) || 0;
      const total = (cant * price).toFixed(2);
      return { ...item, total: total > 0 ? total : '' };
    });

    const currentJSON = JSON.stringify(formData.items);
    const newJSON = JSON.stringify(newItems);

    if (currentJSON !== newJSON) {
      setFormData(prev => ({ ...prev, items: newItems }));
    }

    const newSubtotal = newItems.reduce((acc, item) => {
      return acc + (parseFloat(item.total) || 0);
    }, 0);

    if (formData.subtotal !== newSubtotal) {
      setFormData(prev => ({ ...prev, subtotal: newSubtotal }));
    }

  }, [JSON.stringify(formData.items.map(i => [i.cantidad, i.precioUnitario]))]);

  // Auto-set Valid Until (+10 days) on Init or Issue Date Change
  useEffect(() => {
    if (formData.fechaEmision) {
      const emissionDate = new Date(formData.fechaEmision);
      const validDate = new Date(emissionDate);
      validDate.setDate(validDate.getDate() + 10);
      const validString = validDate.toISOString().split('T')[0];

      if (formData.validoHasta !== validString) {
        setFormData(prev => ({ ...prev, validoHasta: validString }));
      }
    }
  }, [formData.fechaEmision]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle number of products change
  const handleItemCountChange = (e) => {
    const count = parseInt(e.target.value) || 1;
    const validCount = Math.max(1, count);

    setFormData(prev => {
      const currentItems = [...prev.items];
      if (validCount > currentItems.length) {
        const toAdd = validCount - currentItems.length;
        for (let i = 0; i < toAdd; i++) {
          currentItems.push({
            id: currentItems.length + 1 + i,
            descripcion: '',
            cantidad: '',
            precioUnitario: '',
            total: ''
          });
        }
      } else if (validCount < currentItems.length) {
        currentItems.splice(validCount);
      }
      return { ...prev, numProductos: validCount, items: currentItems };
    });
  };

  // Handle specific item change
  const handleItemChange = (index, field, value) => {
    setFormData(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };

  const handleFinish = () => {
    setIsFinalPreview(true);
  };

  const handleBackToEdit = () => {
    setIsFinalPreview(false);
  };

  const handleNewProforma = () => {
    setFormData(getInitialState()); // Reset data with new ID
    setFormKey(prev => prev + 1);   // Reset form component (Step 1)
    setIsFinalPreview(false);       // Go back to edit mode
  };

  const handleDownloadPDF = () => {
    const element = document.querySelector('.preview-container'); // Select the preview DOM
    // Force full expansion for PDF generation
    element.classList.add('printing');

    const opt = {
      margin: [0.2, 0, 0.2, 0], // Top, Right, Bottom, Left margins (in inches)
      filename: `Proforma-${formData.numeroProforma}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      element.classList.remove('printing');
    });
  };

  const renderContent = () => {
    if (currentView === 'home') {
      return (
        <div className="welcome-container">
          <div className="welcome-header">
            <h2>Bienvenido a Kubo Code</h2>
            <p className="welcome-subtitle">¿Por donde quieres que empezemos?</p>
          </div>

          <div className="shortcuts-grid">
            <div className="shortcut-card" onClick={() => setCurrentView('proformas')}>
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <h3>Proformas</h3>
              <p>Crear y administrar cotizaciones</p>
            </div>
          </div>
        </div>
      );
    }

    if (currentView === 'proformas') {
      if (isFinalPreview) {
        return (
          <div className="final-preview-layout">
            <div className="final-preview-container">
              <ProformaPreview data={formData} />
            </div>
            <div className="final-actions">
              <button className="action-btn edit-btn" onClick={handleBackToEdit}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                Seguir Editando
              </button>
              <button className="action-btn new-btn" onClick={handleNewProforma}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>
                Nueva Proforma
              </button>
              <button className="action-btn download-btn" onClick={handleDownloadPDF}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Descargar PDF
              </button>
            </div>
          </div>
        );
      }

      return (
        <div className="proformas-layout">
          <div className="proformas-left">
            <ProformaForm
              key={formKey}
              formData={formData}
              onChange={handleChange}
              onItemCountChange={handleItemCountChange}
              onItemChange={handleItemChange}
              onFinish={handleFinish}
            />
          </div>
          <div className="proformas-right">
            <div className="preview-container-wrapper">
              <ProformaPreview data={formData} />
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        onLogout={onLogout}
        activeOption={currentView}
        onSelectOption={setCurrentView}
      />
      <div className="dashboard-main">
        <header className="dashboard-header">
          <h1>{currentView === 'home' ? 'Inicio' : 'Proformas'}</h1>
        </header>
        <main className="dashboard-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
