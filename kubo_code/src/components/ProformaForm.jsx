import { useState } from 'react';
import './ProformaForm.css';

const ProformaForm = ({ formData, onChange, onItemCountChange, onItemChange, onFinish }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const totalSteps = 3;

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Final step reached
            if (onFinish) onFinish();
        }
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const nextItem = () => {
        if (currentItemIndex < formData.items.length - 1) {
            setCurrentItemIndex(prev => prev + 1);
        }
    };

    const prevItem = () => {
        if (currentItemIndex > 0) {
            setCurrentItemIndex(prev => prev - 1);
        }
    };

    return (
        <div className="proforma-form-container">
            <h2 className="form-title">Nueva Proforma</h2>

            {/* Step Indicator */}
            <div className="step-indicator">
                <div className={`step-dot ${currentStep >= 1 ? 'active' : ''}`}>1</div>
                <div className="step-line"></div>
                <div className={`step-dot ${currentStep >= 2 ? 'active' : ''}`}>2</div>
                <div className="step-line"></div>
                <div className={`step-dot ${currentStep >= 3 ? 'active' : ''}`}>3</div>
            </div>

            <div className="form-content">
                {currentStep === 1 && (
                    <section className="form-section animated-section">
                        <h3>Datos Personales</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Nombre</label>
                                <input type="text" name="nombre" value={formData.nombre} onChange={onChange} placeholder="Nombre del cliente" />
                            </div>
                            <div className="form-group">
                                <label>Empresa</label>
                                <input type="text" name="empresa" value={formData.empresa} onChange={onChange} placeholder="Nombre de la empresa" />
                            </div>
                            <div className="form-group">
                                <label>RUC / CI</label>
                                <input type="text" name="ruc" value={formData.ruc} onChange={onChange} placeholder="Identificación" />
                            </div>
                            <div className="form-group">
                                <label>Teléfono</label>
                                <input type="tel" name="telefono" value={formData.telefono} onChange={onChange} placeholder="099..." />
                            </div>
                            <div className="form-group full-width">
                                <label>Dirección</label>
                                <input type="text" name="direccion" value={formData.direccion} onChange={onChange} placeholder="Dirección completa" />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" value={formData.email} onChange={onChange} placeholder="correo@ejemplo.com" />
                            </div>
                            <div className="form-group">
                                <label>Nombre Asesor</label>
                                <input type="text" name="asesor" value={formData.asesor} onChange={onChange} placeholder="Nombre del asesor" />
                            </div>
                        </div>
                    </section>
                )}

                {currentStep === 2 && (
                    <section className="form-section animated-section">
                        <h3>Detalles de Productos</h3>

                        <div className="product-control-panel">
                            <div className="form-group" style={{ marginBottom: '0', maxWidth: '150px' }}>
                                <label>Total Ítems</label>
                                <input
                                    type="number"
                                    name="numProductos"
                                    value={formData.numProductos}
                                    onChange={(e) => {
                                        onItemCountChange(e);
                                        // Reset index if out of bounds (though Dashboard handles array resize, simple safety)
                                        if (currentItemIndex >= e.target.value) {
                                            setCurrentItemIndex(Math.max(0, e.target.value - 1));
                                        }
                                    }}
                                    min="1"
                                />
                            </div>
                            <div className="item-navigation">
                                <button
                                    className="item-nav-btn"
                                    onClick={prevItem}
                                    disabled={currentItemIndex === 0}
                                    title="Ítem Anterior"
                                >
                                    &lt;
                                </button>
                                <span className="item-counter">
                                    Ítem {currentItemIndex + 1} / {formData.items.length}
                                </span>
                                <button
                                    className="item-nav-btn"
                                    onClick={nextItem}
                                    disabled={currentItemIndex === formData.items.length - 1}
                                    title="Siguiente Ítem"
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>

                        {formData.items[currentItemIndex] && (
                            <div className="item-row animated-section" key={currentItemIndex}>
                                <div className="form-grid">
                                    <div className="form-group full-width">
                                        <label>Descripción</label>
                                        <textarea
                                            value={formData.items[currentItemIndex].descripcion}
                                            onChange={(e) => onItemChange(currentItemIndex, 'descripcion', e.target.value)}
                                            rows="4"
                                            placeholder="Detalles del producto o servicio..."
                                            autoFocus
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Cantidad</label>
                                        <input type="number" value={formData.items[currentItemIndex].cantidad} onChange={(e) => onItemChange(currentItemIndex, 'cantidad', e.target.value)} min="1" placeholder="0" />
                                    </div>
                                    <div className="form-group">
                                        <label>Valor Unitario ($)</label>
                                        <input type="number" value={formData.items[currentItemIndex].precioUnitario} onChange={(e) => onItemChange(currentItemIndex, 'precioUnitario', e.target.value)} min="0" step="0.01" placeholder="0.00" />
                                    </div>
                                    <div className="form-group">
                                        <label>Total ($)</label>
                                        <input type="text" value={formData.items[currentItemIndex].total} readOnly className="input-readonly" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {currentStep === 3 && (
                    <section className="form-section animated-section">
                        <h3>Tiempo de Validación</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Fecha de Emisión</label>
                                <input type="date" name="fechaEmision" value={formData.fechaEmision} onChange={onChange} />
                            </div>
                            <div className="form-group">
                                <label>Válido Hasta</label>
                                <input type="date" name="validoHasta" value={formData.validoHasta} onChange={onChange} />
                            </div>
                        </div>
                    </section>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="form-navigation">
                <button
                    className="nav-btn prev-btn"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                >
                    Atrás
                </button>
                <div className="step-counter">Paso {currentStep} de {totalSteps}</div>
                <button
                    className="nav-btn next-btn"
                    onClick={nextStep}
                >
                    {currentStep === totalSteps ? 'Finalizar' : 'Siguiente'}
                </button>
            </div>
        </div>
    );
};

export default ProformaForm;
