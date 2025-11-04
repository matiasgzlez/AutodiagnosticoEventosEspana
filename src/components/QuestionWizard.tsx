import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testConfig } from '../config';
import { TestResult } from '../types';
import Gauge from './Gauge';
import ProgressBar from './ProgressBar';

interface QuestionWizardProps {
  answers: number[];
  onAnswer: (questionIndex: number, answer: number) => void;
  onFinish: (result: TestResult) => void;
  onCancel: () => void;
}

const QuestionWizard: React.FC<QuestionWizardProps> = ({ answers, onAnswer, onFinish, onCancel }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [currentRecommendation, setCurrentRecommendation] = useState('');

  const handleAnswer = (value: number) => {
    onAnswer(currentQuestion, value);
    
    // Si la respuesta es 7 o menos, mostrar recomendación
    if (value <= 7) {
      setCurrentRecommendation(testConfig.questions[currentQuestion].recommendation);
      setShowRecommendation(true);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < testConfig.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      finishTest();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const finishTest = () => {
    const totalScore = answers.reduce((sum, answer) => sum + (answer || 0), 0);
    const maxScore = testConfig.questions.length * 10;
    const percentageScore = Math.round((totalScore / maxScore) * 100);
    
    // Determinar nivel
    let level: 'low' | 'medium' | 'high' = 'low';
    let levelText = '';
    let interpretation = '';
    
    if (percentageScore >= 86) {
      level = 'high';
      levelText = testConfig.levels.high.text;
      interpretation = testConfig.levels.high.interpretation;
    } else if (percentageScore >= 71) {
      level = 'medium';
      levelText = testConfig.levels.medium.text;
      interpretation = testConfig.levels.medium.interpretation;
    } else {
      level = 'low';
      levelText = testConfig.levels.low.text;
      interpretation = testConfig.levels.low.interpretation;
    }
    
    // Obtener recomendaciones
    const recommendations: string[] = [];
    answers.forEach((answer, index) => {
      if (answer <= 7) {
        recommendations.push(testConfig.questions[index].recommendation);
      }
    });
    
    // Si el puntaje total es bajo, agregar recomendación general
    if (percentageScore <= 70) {
      recommendations.unshift("Considera una revisión integral de tu estrategia de cadena de suministro para mejorar la resiliencia general.");
    }
    
    const result: TestResult = {
      totalScore: percentageScore,
      questionScores: [...answers],
      recommendations,
      level,
      levelText,
      interpretation
    };
    
    onFinish(result);
  };

  const currentAnswer = answers[currentQuestion] || 0;
  const progress = ((currentQuestion + 1) / testConfig.questions.length) * 100;
  const currentScore = answers.reduce((sum, answer) => sum + (answer || 0), 0);
  const maxPossibleScore = testConfig.questions.length * 10;
  const currentPercentage = Math.round((currentScore / maxPossibleScore) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-text">Auto-diagnóstico VUCA</h1>
              <p className="text-sm text-gray-600">Pregunta {currentQuestion + 1} de {testConfig.questions.length}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={onCancel}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Cancelar</span>
              </button>
              <ProgressBar progress={progress} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Question */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="card"
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  {currentQuestion + 1}
                </div>
                <h2 className="text-2xl font-bold text-text">Pregunta {currentQuestion + 1}</h2>
              </div>
              <div className="mb-8">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {testConfig.questions[currentQuestion].text}
                </p>
              </div>

              {/* Scale */}
              <div className="mb-8">
                <div className="relative mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Bajo desempeño</span>
                    <span className="text-sm text-gray-600">Perfecto</span>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-0">
                    <span className="text-sm text-gray-600">Mediocre</span>
                  </div>
                </div>
                
                {/* Scale buttons */}
                <div className="grid grid-cols-10 gap-2">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                    <motion.button
                      key={value}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleAnswer(value)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors duration-200
                        ${currentAnswer === value ? 'bg-primary text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                      {value}
                    </motion.button>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">1</span>
                  <span className="text-xs text-gray-500">10</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Gauge */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 px-16 py-12 text-center"
            >
              <h3 className="text-xl font-semibold text-text mb-8">Progreso Actual</h3>
              <div className="flex justify-center mb-6">
                <Gauge value={currentPercentage} width={450} />
              </div>
              <div className="space-y-2">
                <p className="text-base text-gray-700 font-medium">
                  Puntaje parcial: <span className="font-bold text-gray-900">{currentScore}</span> / 100
                </p>
                <p className="text-base text-gray-600">
                  {currentPercentage}% completado
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className={`btn-secondary ${
              currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            ← Anterior
          </motion.button>

          <div className="text-sm text-gray-600">
            {currentQuestion + 1} de {testConfig.questions.length}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextQuestion}
            disabled={currentAnswer === 0}
            className={`btn-primary ${
              currentAnswer === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {currentQuestion === testConfig.questions.length - 1 ? 'Finalizar' : 'Siguiente →'}
          </motion.button>
        </div>
      </div>

      {/* Modal de Recomendación */}
      {showRecommendation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 md:p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  Recomendación para esta pregunta
                </h3>
                
                <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                  {currentRecommendation}
                </p>
                
                <button
                  onClick={() => {
                    setShowRecommendation(false);
                    nextQuestion();
                  }}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Entendido
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default QuestionWizard;
