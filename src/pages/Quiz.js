import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/pages/Quiz.css';

function Quiz() {
  const { courseId, weekId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [quizData, setQuizData] = useState({
    questions: [
      {
        questionText: 'What is the primary purpose of network penetration testing?',
        options: [
          'To break network security',
          'To identify and fix security vulnerabilities',
          'To monitor network traffic',
          'To install security software'
        ],
        correctAnswer: 1
      },
      {
        questionText: 'Which tool is commonly used for port scanning?',
        options: [
          'Wireshark',
          'Metasploit',
          'Nmap',
          'Burp Suite'
        ],
        correctAnswer: 2
      },
      {
        questionText: 'What is a "Zero-day vulnerability"?',
        options: [
          'A vulnerability that has existed for zero days',
          'A vulnerability with no known patches or fixes',
          'A vulnerability that takes zero days to exploit',
          'A vulnerability that affects zero users'
        ],
        correctAnswer: 1
      },
      // Add more questions as needed
    ],
    timeLimit: 300, // 5 minutes
    passingScore: 70
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleQuizComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === quizData.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    setShowScore(true);
    const percentage = (score / quizData.questions.length) * 100;
    // Save quiz results to user profile
    saveQuizResults(percentage);
  };

  const saveQuizResults = async (percentage) => {
    try {
      // Add API call to save quiz results
      console.log('Quiz results saved:', percentage);
    } catch (error) {
      console.error('Error saving quiz results:', error);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (showScore) {
    const percentage = (score / quizData.questions.length) * 100;
    return (
      <div className="quiz-container">
        <div className="score-section">
          <h2>Quiz Completed!</h2>
          <div className="score-details">
            <p>Your Score: {percentage.toFixed(1)}%</p>
            <p className={percentage >= quizData.passingScore ? 'pass' : 'fail'}>
              {percentage >= quizData.passingScore ? 'Passed!' : 'Failed'}
            </p>
          </div>
          <div className="score-actions">
            <button onClick={() => navigate(`/courses/${courseId}`)}>
              Return to Course
            </button>
            <button onClick={() => window.location.reload()}>
              Retry Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="quiz-progress">
          Question {currentQuestion + 1}/{quizData.questions.length}
        </div>
        <div className="quiz-timer">
          Time Remaining: {formatTime(timeLeft)}
        </div>
      </div>

      <div className="question-section">
        <h2>{quizData.questions[currentQuestion].questionText}</h2>
        <div className="answer-options">
          {quizData.questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              className="answer-option"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Quiz; 