import React, { useState, useEffect } from 'react';
import './StylesMetodoPago.css';
import Swal from 'sweetalert2';

const MetodosPago_Left = ({ handleMetodoPagoSubmit }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [reference, setReference] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    if (method === 'Efectivo') {
      setReference('ninguno');
    }
  };

  const handleButtonClick = () => {
    if (selectedMethod) {
      let referenceValue = reference;
      if (selectedMethod === 'Efectivo') {
        referenceValue = 'ninguno';
      }
      Swal.fire({
        title: "Método de Pago Seleccionado",
        text: `Ha sido seleccionado con éxito el método de pago: ${selectedMethod}`,
        icon: "success",
        confirmButtonText: "OK",
      });
      // Llama a la función única para actualizar método de pago y referencia
      handleMetodoPagoSubmit(selectedMethod, referenceValue);
      setVisible(false); // Ocultar el componente al confirmar la selección
    } else {
      Swal.fire({
        title: "Error",
        text: "No se ha seleccionado ningún método de pago",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  
  return (
    <div className={`window_metodoPago ${visible ? 'visible' : 'hidden'}`}>
      <div className={`metodoPago_Container ${visible ? 'visible' : 'hidden'}`}>
        <div className="inputsContainer_MP">
          <div className="header_MetodoPago">
            <h3 className='tittle_MetodoPago'>Seleccione un Método de Pago</h3>
            <div className="nada"></div>
          </div>
          <div className="listMetodosPago">
            {['Efectivo', 'Tarjeta de Débito', 'Tarjeta de Crédito', 'Transferencia bancaria'].map((method) => (
              <div
                key={method}
                className={`opGrup_MetoPago ${selectedMethod === method ? 'slected_MP' : ''}`}
                onClick={() => handleSelectMethod(method)}
              >
                <div className="select__MP">
                  {selectedMethod === method && <div className="selected__MP"></div>}
                </div>
                <span>{method}</span>
              </div>
            ))}
          </div>
          <div className="speMP"></div>
          <div className={`grup_MetodoPago_Referencia ${selectedMethod && selectedMethod !== 'Efectivo' ? '' : 'disabled_Input_MP'}`}>
            <span className='tittleGrup__InputMP'>Escriba la referencia</span>
            <div className="inputContainerMP">
              <input
                className='inputText__MP'
                type="text"
                placeholder='|'
                disabled={!selectedMethod || selectedMethod === 'Efectivo'}
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              />
              <div className="righIconInput_MP">
                <i className="bi bi-input-cursor-text"></i>
              </div>
            </div>
          </div>
          <button className='SlectMetodoPago' onClick={handleButtonClick}>
            Seleccionar método de pago
          </button>
        </div>
      </div>
    </div>
  );
}

export default MetodosPago_Left;
