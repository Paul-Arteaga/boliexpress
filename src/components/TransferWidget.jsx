import React, { useState } from 'react';

function TransferWidget() {
  const [amount, setAmount] = useState('100.000');
  const [destination, setDestination] = useState('Bolivia');
  const [paymentMethod, setPaymentMethod] = useState('Direct bank');
  const [deliveryMethod, setDeliveryMethod] = useState('Cash pickup');
  const [promoCode, setPromoCode] = useState('HOLABOLI');

  // Simulación de tasa de cambio (1 CLP = 0.0012 BOB aproximadamente)
  const exchangeRate = 0.0012;
  const commission = 3000;
  const promoDiscount = promoCode === 'HOLABOLI' ? 3000 : 0;
  const totalAmount = parseFloat(amount.replace(/\./g, '')) || 100000;
  const totalToReceive = (totalAmount * exchangeRate).toFixed(2);
  const totalToPay = totalAmount;
  
  // Formatear números con separadores de miles
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow-lg">
      {/* Destination Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Destino</label>
        <div className="relative">
          <div className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-orange-500 transition-colors">
            <span className="text-2xl mr-3">🇧🇴</span>
            <span className="flex-1 text-gray-900">Enviar a {destination}</span>
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Amount to Send */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Tu envías</label>
        <div className="relative">
          <input
            type="text"
            value={amount}
            onChange={(e) => {
              // Permitir solo números y puntos
              const value = e.target.value.replace(/[^\d.]/g, '');
              setAmount(value);
            }}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-20 text-lg font-semibold focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <span className="text-xl">🇨🇱</span>
            <span className="text-gray-700 font-medium">CLP</span>
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-green-800 font-semibold mb-1">¡Tarifa promocional en tu primer envío!</p>
            <p className="text-sm text-green-700">
              1 CLP = <span className="line-through">0,00100</span> <span className="font-bold">0,00120 BOB</span>
            </p>
          </div>
        </div>
      </div>

      {/* Exchange Rate Display */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Tasa de cambio</label>
        <div className="bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🇧🇴</span>
            <div>
              <span className="text-2xl font-bold text-gray-900">{formatNumber(totalToReceive)}</span>
              <span className="text-gray-600 ml-2">BOB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Método de pago</label>
        <div className="relative">
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 appearance-none cursor-pointer focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          >
            <option>Direct bank</option>
            <option>Tarjeta de crédito</option>
            <option>Tarjeta de débito</option>
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Delivery Method */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Método de entrega</label>
        <div className="relative">
          <select
            value={deliveryMethod}
            onChange={(e) => setDeliveryMethod(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 appearance-none cursor-pointer focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          >
            <option>Cash pickup</option>
            <option>Bank deposit</option>
            <option>Mobile wallet</option>
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Commission Details */}
      <div className="mb-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">Comisión</span>
          <span className="text-gray-900 font-medium">{commission.toLocaleString('es-CL')} CLP</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">Código para tu primer envío:</span>
          <div className="flex items-center space-x-2">
            <span className="text-orange-600 font-semibold">{promoCode}</span>
            <span className="text-green-600 font-medium">-{promoDiscount.toLocaleString('es-CL')} CLP</span>
          </div>
        </div>
      </div>

      {/* Total to Pay */}
      <div className="mb-6 pb-4 border-b border-gray-300">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total a pagar</span>
          <span className="text-2xl font-bold text-gray-900">{formatNumber(totalToPay)} CLP</span>
        </div>
      </div>

      {/* Send Button */}
      <button className="w-full bg-orange-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors shadow-md mb-4">
        Enviar
      </button>

      {/* Payment Partner Logos */}
      <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">Pagos seguros con:</div>
        <div className="flex items-center space-x-3">
          <div className="bg-white px-3 py-1 rounded text-xs font-semibold text-gray-700 border border-gray-300">
            BCP
          </div>
          <div className="bg-white px-3 py-1 rounded text-xs font-semibold text-gray-700 border border-gray-300">
            BANCO UNION
          </div>
          <div className="bg-white px-3 py-1 rounded text-xs font-semibold text-gray-700 border border-gray-300">
            BANCO NACIONAL
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferWidget;

