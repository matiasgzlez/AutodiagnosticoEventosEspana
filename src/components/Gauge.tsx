import React from 'react';
import { motion } from 'framer-motion';

interface GaugeProps {
  value: number; // 0-100
  width?: number;
  showLabel?: boolean;
}

const Gauge: React.FC<GaugeProps> = ({ value, width = 400, showLabel = true }) => {
  const height = 100; // Aumentado para dar espacio a la aguja
  const barHeight = 32;
  const padding = 40;
  const barWidth = width - (padding * 2);
  
  // Calcular el ancho de cada zona
  const greenWidth = (barWidth * 60) / 100;
  const yellowWidth = (barWidth * 25) / 100;
  const redWidth = (barWidth * 15) / 100;
  
  // Posición de la aguja según el valor
  const needlePosition = (value / 100) * barWidth;
  
  // Determinar el color según el valor
  const getZoneColor = () => {
    if (value <= 60) return '#EF4444'; // Rojo (precaución)
    if (value <= 85) return '#F59E0B'; // Amarillo
    return '#10B981'; // Verde (excelente)
  };
  
  const getZoneLabel = () => {
    if (value <= 60) return 'Necesita mejora';
    if (value <= 85) return 'Bueno';
    return 'Excelente';
  };

  return (
    <div className="relative inline-block">
      <svg width={width} height={height}>
        {/* Definir gradiente para las tres zonas */}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="60%" stopColor="#EF4444" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="85%" stopColor="#F59E0B" />
            <stop offset="85%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        
        {/* Barra completa con gradiente */}
        <rect
          x={padding}
          y={(height - barHeight) / 2}
          width={barWidth}
          height={barHeight}
          fill="url(#gaugeGradient)"
          rx="16"
        />
        
        {/* Marcas de escala */}
        {[0, 50, 100].map((mark, index) => {
          const x = padding + (mark / 100) * barWidth;
          return (
            <g key={index}>
              {/* Línea de marca */}
              <line
                x1={x}
                y1={(height - barHeight) / 2 - 8}
                x2={x}
                y2={(height - barHeight) / 2 - 3}
                stroke="#6B7280"
                strokeWidth="2"
              />
              {/* Número */}
              <text
                x={x}
                y={(height - barHeight) / 2 - 12}
                textAnchor="middle"
                dominantBaseline="bottom"
                className="text-sm font-semibold fill-gray-700"
              >
                {mark}
              </text>
            </g>
          );
        })}
        
        {/* Aguja/triángulo indicador */}
        <motion.g
          initial={{ x: padding }}
          animate={{ x: padding + needlePosition }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 1
          }}
        >
          {/* Línea vertical de la aguja */}
          <line
            x1={0}
            y1={20}
            x2={0}
            y2={height - 20}
            stroke="#1F2937"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          {/* Triángulo superior */}
          <polygon
            points={`0,25 -6,33 6,33`}
            fill="#1F2937"
          />
          
          {/* Triángulo inferior */}
          <polygon
            points={`0,${height - 25} -6,${height - 33} 6,${height - 33}`}
            fill="#1F2937"
          />
        </motion.g>
      </svg>
      
      {/* Valor y etiqueta */}
      <div className="flex flex-col items-center justify-center mt-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2
          }}
          className="text-center"
        >
          <div className="text-5xl font-bold mb-2" style={{ color: getZoneColor() }}>
            {value}
          </div>
          {showLabel && (
            <div className="text-lg text-gray-600 font-medium">
              {getZoneLabel()}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Gauge;
