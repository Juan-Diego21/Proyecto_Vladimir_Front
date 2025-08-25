import React from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

const AddCard = ({ onClick, label = "Añadir" }) => {
  return (
    <div 
      className="bg-white rounded-lg border-2 border-dashed border-gray-300 
        hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 
        cursor-pointer flex items-center justify-center p-6 min-h-[200px]"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="text-center">
        <PlusCircleIcon className="h-12 w-12 text-gray-400 mx-auto mb-2 
          hover:text-blue-500 transition-colors" />
        <p className="text-gray-600 font-medium">{label}</p>
      </div>
    </div>
  );
};

export default AddCard;