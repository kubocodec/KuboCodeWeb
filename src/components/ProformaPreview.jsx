import './ProformaPreview.css';
import rubikIcon from '../assets/rubik_resolved.png';

const ProformaPreview = ({ data }) => {
    // Calculate Taxes
    const subtotal = data.subtotal || 0;
    const impuesto = subtotal * 0.15;
    const totalPagar = subtotal + impuesto;

    return (
        <div className="preview-container">
            {/* Header */}
            <div className="preview-header">
                <div className="brand-section">
                    <img src={rubikIcon} alt="Logo" className="preview-logo" />
                    <span className="brand-name">kubocode</span>
                </div>
                <div className="header-title">
                    <h2>Desarrollo de Software</h2>
                </div>
            </div>

            {/* Info Bar */}
            <div className="info-bar-container">
                <div className="company-info">
                    <h4>Matriz Quito:</h4>
                    <p>Av Eloy Alfaro y Alemania N29-143</p>
                    <p>Edificio Salazar Barba primer piso</p>
                    <p>02 500 8384</p>
                </div>
                <div className="proforma-meta">
                    <div className="meta-row header-row">
                        <span>N.° DE PROFORMA</span>
                        <span>FECHA</span>
                    </div>
                    <div className="meta-row value-row">
                        <span>{data.numeroProforma}</span>
                        <span>{data.fechaEmision}</span>
                    </div>
                    <div className="meta-row header-row black-bg">
                        <span>VALIDO HASTA</span>
                        <span>Pago</span>
                    </div>
                    <div className="meta-row value-row">
                        <span>{data.validoHasta}</span>
                        <span>A convenir</span>
                    </div>
                    <div className="meta-extra">
                        <span>TIEMPO ENTREGA:</span>
                        <span>A convenir</span>
                    </div>
                </div>
            </div>

            {/* Client & Advisor */}
            <div className="people-section">
                <div className="black-bar">
                    <span>Cliente</span>
                    <span>Asesor</span>
                </div>
                <div className="people-grid">
                    <div className="client-details">
                        <div className="detail-row"><span className="label">Nombre:</span> <span>{data.nombre}</span></div>
                        <div className="detail-row"><span className="label">Empresa:</span> <span>{data.empresa}</span></div>
                        <div className="detail-row"><span className="label">RUC/CI:</span> <span>{data.ruc}</span></div>
                        <div className="detail-row"><span className="label">Dirección:</span> <span>{data.direccion}</span></div>
                        <div className="detail-row"><span className="label">Teléfono:</span> <span>{data.telefono}</span></div>
                        <div className="detail-row"><span className="label">Mail:</span> <span>{data.email}</span></div>
                    </div>
                    <div className="advisor-details">
                        <p className="advisor-name">{data.asesor}</p>
                        <p className="advisor-role">Desarrollador</p>
                    </div>
                </div>
            </div>

            {/* Table */}
            <table className="proforma-table">
                <thead>
                    <tr>
                        <th style={{ width: '10%' }}>ITEM</th>
                        <th style={{ width: '50%' }}>Descripcion</th>
                        <th style={{ width: '10%' }}>CANT</th>
                        <th style={{ width: '15%' }}>V. UNIT.</th>
                        <th style={{ width: '15%' }}>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    {data.items && data.items.map((item, index) => (
                        <tr key={index}>
                            <td className="center-text">{index + 1}</td>
                            <td>{item.descripcion}</td>
                            <td className="center-text">{item.cantidad}</td>
                            <td className="right-text">$ {parseFloat(item.precioUnitario || 0).toFixed(2)}</td>
                            <td className="right-text">$ {parseFloat(item.total || 0).toFixed(2)}</td>
                        </tr>
                    ))}
                    {/* Filler Rows if few items */}
                    {(!data.items || data.items.length < 3) && (
                        <tr style={{ height: '20px' }}>
                            <td colSpan="4" style={{ border: 'none' }}></td>
                            <td style={{ border: 'none', borderLeft: '2px solid black', borderRight: '2px solid black' }} className="right-text">$ -</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Totals Section */}
            <div className="totals-section">
                <div className="terms-box">
                    <div className="black-bar-small">TÉRMINOS Y CONDICIONES</div>
                    <ol className="terms-list">
                        <li>El tiempo de entrega y stock puede variar pasada la fecha de validez de la proforma</li>
                        <li>El pago y/o crédito será acordado con el asesor</li>
                        <li>Por favor enviar la cotización firmada al email indicado anteriormente</li>
                        <li>La aceptación del cliente (firmar a continuación):</li>
                    </ol>
                </div>
                <div className="totals-box">
                    <div className="total-row"><span>Subtotal IVA</span> <span>$ {subtotal.toFixed(2)}</span></div>
                    <div className="total-row"><span>Descuento 0%</span> <span>$ -</span></div>
                    <div className="total-row"><span>Impuesto 15%</span> <span>$ {impuesto.toFixed(2)}</span></div>
                    <div className="total-row grand-total"><span>TOTAL</span> <span>$ {totalPagar.toFixed(2)}</span></div>
                </div>
            </div>

            {/* Signatures */}
            <div className="signatures-section">
                <div className="signature-block">
                    <div className="sign-line">x</div>
                    <p className="sign-name">{data.nombre || 'Cliente'} -</p>
                </div>
                <div className="signature-block">
                    <div className="sign-line">x</div>
                    <p className="sign-name">KuboCode</p>
                </div>
            </div>

            {/* Footer Note */}
            <div className="footer-note">
                <p>Si tiene preguntas relacionadas con esta proforma, póngase en contacto con {data.asesor || 'Nosotros'} - -</p>
            </div>
        </div>
    );
};

export default ProformaPreview;
