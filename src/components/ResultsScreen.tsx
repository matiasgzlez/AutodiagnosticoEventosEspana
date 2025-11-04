import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TestResult } from '../types';
import Gauge from './Gauge';
import { submitToGoogleForms } from '../services/googleForms';

interface ResultsScreenProps {
  result: TestResult;
  onReset: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ result, onReset }) => {
  useEffect(() => {
    // Enviar datos a Google Forms silenciosamente cuando se muestra la pantalla de resultados
    if (result.userData) {
      console.log('🔄 ResultsScreen: Enviando datos a Google Forms...', result.userData);
      try {
        submitToGoogleForms(result.userData, result)
          .then((success) => {
            console.log('✅ Envío completado:', success);
          })
          .catch((error) => {
            console.error('❌ Error al enviar:', error);
          });
      } catch (error) {
        console.error('❌ Error al ejecutar envío:', error);
      }
    } else {
      console.warn('⚠️ No hay datos de usuario para enviar');
    }
  }, [result]);
  const getLevelColor = (levelText: string) => {
    if (levelText === 'Madurez avanzada') return 'text-green-600';
    if (levelText === 'Mejora táctica') return 'text-orange-600';
    return 'text-red-600';
  };

  const getLevelBgColor = (levelText: string) => {
    if (levelText === 'Madurez avanzada') return 'bg-green-50 border-green-200';
    if (levelText === 'Mejora táctica') return 'bg-orange-50 border-orange-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Resultado de tu Auto-diagnóstico VUCA
          </h1>
          <p className="text-lg text-gray-600">
            Aquí tienes tu evaluación completa y recomendaciones personalizadas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Score Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 px-12 py-10 text-center"
          >
            <h2 className="text-2xl font-semibold text-text mb-8">Tu Puntuación</h2>
            
            <div className="mb-8">
              <Gauge value={result.totalScore} width={400} />
            </div>
            
            <div className={`inline-block px-6 py-3 rounded-full border ${getLevelBgColor(result.levelText)} mb-6`}>
              <span className={`font-semibold text-lg ${getLevelColor(result.levelText)}`}>
                {result.levelText}
              </span>
            </div>
            
            <p className="text-gray-600 text-base leading-relaxed">
              {result.interpretation}
            </p>
          </motion.div>

          {/* Recommendations Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 px-8 py-8"
          >
            <h2 className="text-2xl font-semibold text-text mb-6">Recomendaciones</h2>
            
            {result.recommendations.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {result.recommendations.map((recommendation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200"
                  >
                    <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {recommendation}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg text-gray-600 font-medium">
                  ¡Excelente! No necesitas recomendaciones específicas.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Invitación Brunch-Shop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 rounded-3xl shadow-2xl p-12 text-center text-white mt-8 mb-8 border-4 border-orange-300"
        >
          <div className="max-w-4xl mx-auto">
            <div className="w-24 h-24 bg-white bg-opacity-25 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              TE INVITAMOS A UN "BRUNCH-SHOP" SIN COSTO
            </h2>
            
            <p className="text-xl md:text-2xl mb-8 opacity-95 leading-relaxed font-light">
              Basado en las recomendaciones de tu auto-diagnóstico, te invitamos a aplicar a un exclusivo workshop dónde podrás ver como aplicar estos novedosos y poderosos conceptos y su impacto potencial usando un poderoso simulador, y compartir con otros ejecutivos en medio de un delicioso brunch. Aplica y te diremos si fuiste seleccionado para uno de los 20 exclusivos cupos sin costo del evento:
            </p>
            
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://eventos.k2sol.co/evento2', '_blank')}
              className="bg-white text-orange-600 font-bold text-lg px-12 py-5 rounded-2xl hover:bg-gray-50 transition-all duration-300 transform shadow-2xl border-2 border-white"
            >
              QUIERO ASISTIR
            </motion.button>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="btn-primary px-8 py-3"
          >
            Reiniciar evaluación
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center mt-12 text-sm text-gray-500"
        >
          <p>Herramienta de evaluación desarrollada para profesionales de cadena de suministro</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsScreen;
