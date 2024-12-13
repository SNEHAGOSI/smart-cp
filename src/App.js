import React, { useState, useEffect } from 'react';
import { Minus, Plus, Thermometer, Snowflake, Flame } from 'lucide-react';

const ACTemperatureControl = () => {
  const [temperature, setTemperature] = useState(22);
  const [secondaryTemperature, setSecondaryTemperature] = useState(24);
  const [coldSwitch, setColdSwitch] = useState(false);
  const [hotSwitch, setHotSwitch] = useState(false);

  // Automatic switch control based on temperature
  useEffect(() => {
    // Cold mode activates when temperature is above 30°C
    if (temperature > 30 && temperature < 50) {
      setColdSwitch(true);
      setHotSwitch(false);
    } 
    // Hot mode activates when temperature is below 20°C
    else if (temperature < 20 && temperature > 0) {
      setHotSwitch(true);
      setColdSwitch(false);
    } 
    // Neutral state when temperature is in comfortable range
    else {
      setColdSwitch(false);
      setHotSwitch(false);
    }
  }, [temperature]);

  const handleIncrease = () => {
    setTemperature(prev => Math.min(prev + 1, 50));
  };

  const handleDecrease = () => {
    setTemperature(prev => Math.max(prev - 1, 0));
  };

  // Manual switch toggle (overrides automatic control)
  const toggleColdSwitch = () => {
    setColdSwitch(prev => !prev);
    setHotSwitch(false);
  };

  const toggleHotSwitch = () => {
    setHotSwitch(prev => !prev);
    setColdSwitch(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="flex flex-col items-center space-y-8">
        {/* Interactive Temperature Control */}
        <div className="bg-white shadow-2xl rounded-3xl p-6 w-96 transform transition-all hover:scale-105 duration-300 ease-in-out">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={handleDecrease} 
              className="bg-blue-50 text-blue-600 p-3 rounded-full hover:bg-blue-100 transition-colors"
            >
              <Minus size={24} />
            </button>
            
            <div className="flex items-center space-x-3">
              <Thermometer 
                size={36} 
                className="text-blue-500 animate-pulse"
              />
              <span className="text-5xl font-bold text-blue-800">
                {temperature}°C
              </span>
            </div>
            
            <button 
              onClick={handleIncrease} 
              className="bg-blue-50 text-blue-600 p-3 rounded-full hover:bg-blue-100 transition-colors"
            >
              <Plus size={24} />
            </button>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-blue-700 font-semibold">
              Interactive Temperature Control
            </p>
          </div>
        </div>

        {/* Temperature Mode Switches */}
        <div className="flex space-x-4 w-96">
          {/* Cold Switch */}
          <div 
            onClick={toggleColdSwitch}
            className={`flex-1 p-4 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out flex items-center justify-between ${
              coldSwitch 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
          >
            <Snowflake size={24} />
            <span className="font-semibold">Cold</span>
            <div className={`w-6 h-6 rounded-full transition-all duration-300 ${
              coldSwitch 
                ? 'bg-white' 
                : 'bg-blue-200'
            }`}></div>
          </div>

          {/* Hot Switch */}
          <div 
            onClick={toggleHotSwitch}
            className={`flex-1 p-4 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out flex items-center justify-between ${
              hotSwitch 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-red-50 text-red-600 hover:bg-red-100'
            }`}
          >
            <Flame size={24} />
            <span className="font-semibold">Hot</span>
            <div className={`w-6 h-6 rounded-full transition-all duration-300 ${
              hotSwitch 
                ? 'bg-white' 
                : 'bg-red-200'
            }`}></div>
          </div>
        </div>

        {/* Read-only Temperature Display */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 shadow-2xl rounded-3xl p-6 w-96 transform transition-all hover:scale-105 duration-300 ease-in-out">
          <div className="flex items-center justify-center space-x-3">
            <Thermometer 
              size={36} 
              className="text-white animate-bounce"
            />
            <span className="text-5xl font-bold text-white">
              {secondaryTemperature}°C
            </span>
          </div>
          
          <div className="bg-white/20 rounded-xl p-4 text-center mt-6">
            <p className="text-white font-semibold">
              Passive Temperature Display
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ACTemperatureControl;