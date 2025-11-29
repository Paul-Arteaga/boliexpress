import React from 'react';

function PromotionalSection() {
  return (
    <div className="flex flex-col justify-center h-full">
      <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
        Envíos de dinero rápidos y seguros desde Chile
      </h1>
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        Transfiere a más de 500 mil sucursales en más de 190 países de manera rápida y segura.
      </p>
      <button className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors shadow-md w-fit">
        Descarga la app
      </button>
    </div>
  );
}

export default PromotionalSection;

