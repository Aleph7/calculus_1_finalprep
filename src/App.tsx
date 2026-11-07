import React, { useState, useEffect } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { ExamCountdownBar } from './components/ExamCountdownBar';
import { MockExamArena } from './components/MockExamArena';
import { TargetedPracticeDrills } from './components/TargetedPracticeDrills';
import { FormulaVault } from './components/FormulaVault';
import { SlidesViewer } from './components/SlidesViewer';
import { Footer } from './components/Footer';
import { mockExamQuestions } from './data/calculusData';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('mock-exam');

  // Load saved scores and completion states from localStorage
  const [userScores, setUserScores] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem('kmitl_calc1_scores');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [completedQuestions, setCompletedQuestions] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('kmitl_calc1_completed');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kmitl_calc1_scores', JSON.stringify(userScores));
    } catch {}
  }, [userScores]);

  useEffect(() => {
    try {
      localStorage.setItem('kmitl_calc1_completed', JSON.stringify(completedQuestions));
    } catch {}
  }, [completedQuestions]);

  const setUserScore = (questionId: number, score: number) => {
    setUserScores((prev) => ({
      ...prev,
      [questionId]: score,
    }));
  };

  const toggleCompleted = (questionId: number) => {
    setCompletedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const totalPoints = 50;
  const earnedPoints = mockExamQuestions.reduce((sum, q) => {
    return sum + (userScores[q.id] || 0);
  }, 0);

  const completedCount = Object.values(completedQuestions).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200">
      <div>
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          earnedPoints={earnedPoints}
          totalPoints={totalPoints}
        />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-6">
          {/* Top Exam Countdown Bar and Academic Warning */}
          <ExamCountdownBar
            totalQuestions={12}
            totalPoints={50}
            earnedPoints={earnedPoints}
            completedCount={completedCount}
          />

          {/* Active Tab Content */}
          {activeTab === 'mock-exam' && (
            <MockExamArena
              userScores={userScores}
              setUserScore={setUserScore}
              completedQuestions={completedQuestions}
              toggleCompleted={toggleCompleted}
              earnedPoints={earnedPoints}
              totalPoints={totalPoints}
            />
          )}

          {activeTab === 'practice' && <TargetedPracticeDrills />}

          {activeTab === 'formula-vault' && <FormulaVault />}

          {activeTab === 'slides-index' && <SlidesViewer />}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default App;
