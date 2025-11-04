import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroScreen from './components/IntroScreen';
import QuestionWizard from './components/QuestionWizard';
import ResultsScreen from './components/ResultsScreen';
import { TestResult, UserData } from './types';

type Screen = 'intro' | 'questions' | 'results';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('intro');
  const [answers, setAnswers] = useState<number[]>([]);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Cargar progreso guardado
  useEffect(() => {
    const savedAnswers = localStorage.getItem('vuca-test-answers');
    const savedScreen = localStorage.getItem('vuca-test-screen') as Screen;
    
    if (savedAnswers && savedScreen) {
      setAnswers(JSON.parse(savedAnswers));
      setCurrentScreen(savedScreen);
    }
  }, []);

  // Guardar progreso
  useEffect(() => {
    if (answers.length > 0) {
      localStorage.setItem('vuca-test-answers', JSON.stringify(answers));
      localStorage.setItem('vuca-test-screen', currentScreen);
    }
  }, [answers, currentScreen]);

  const startTest = (data: UserData) => {
    setUserData(data);
    setAnswers([]);
    setCurrentScreen('questions');
    localStorage.removeItem('vuca-test-answers');
    localStorage.removeItem('vuca-test-screen');
  };

  const handleAnswer = (questionIndex: number, answer: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  const finishTest = (result: TestResult) => {
    // Agregar datos del usuario al resultado
    const resultWithUserData: TestResult = {
      ...result,
      userData: userData || undefined
    };
    setTestResult(resultWithUserData);
    setCurrentScreen('results');
    localStorage.removeItem('vuca-test-answers');
    localStorage.removeItem('vuca-test-screen');
  };

  const resetTest = () => {
    setAnswers([]);
    setTestResult(null);
    setUserData(null);
    setCurrentScreen('intro');
    localStorage.removeItem('vuca-test-answers');
    localStorage.removeItem('vuca-test-screen');
  };

  const cancelTest = () => {
    setAnswers([]);
    setTestResult(null);
    setUserData(null);
    setCurrentScreen('intro');
    localStorage.removeItem('vuca-test-answers');
    localStorage.removeItem('vuca-test-screen');
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {currentScreen === 'intro' && (
          <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            <IntroScreen onStart={startTest} />
          </motion.div>
        )}
        
        {currentScreen === 'questions' && (
          <motion.div key="questions" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5 }}>
            <QuestionWizard
              answers={answers}
              onAnswer={handleAnswer}
              onFinish={finishTest}
              onCancel={cancelTest}
            />
          </motion.div>
        )}
        
        {currentScreen === 'results' && testResult && (
          <motion.div key="results" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5 }}>
            <ResultsScreen result={testResult} onReset={resetTest} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
