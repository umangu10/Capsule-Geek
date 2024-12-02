import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaFlag, FaLightbulb, FaClock, FaTrophy, FaTerminal, FaTimes, FaCheckCircle } from 'react-icons/fa';
import './CTFChallenge.css';

function CTFChallenge() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [flag, setFlag] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [showHint, setShowHint] = useState(false);
  const [submission, setSubmission] = useState({ status: '', message: '' });
  const [challengeEnded, setChallengeEnded] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Simulated challenge data
  useEffect(() => {
    const challengeData = {
      id: id,
      title: "Base64 Decode Challenge",
      description: "A secret message has been encoded using Base64. Your task is to decode it and find the flag.",
      difficulty: "easy",
      points: 50,
      challengeContent: `
        Here's your encoded message:
        Q1RGe2I0NTM2NF9kM2MwZDNyfQ==
        
        Hint: This is a standard Base64 encoded string. You can use online tools or command line utilities to decode it.
        
        Common tools:
        - echo "encoded_string" | base64 -d
        - Online Base64 decoders
        
        The flag format is: CTF{something}
      `,
      hints: [
        "Base64 is a way to encode binary data into ASCII text format",
        "The decoded text will directly give you the flag"
      ],
      instructions: [
        "Look at the encoded message provided",
        "Use a Base64 decoder (online or command line)",
        "Submit the decoded message as your flag"
      ],
      resources: [
        {
          name: "Base64 Decoder Online",
          url: "https://www.base64decode.org/"
        },
        {
          name: "About Base64 Encoding",
          url: "https://en.wikipedia.org/wiki/Base64"
        }
      ]
    };
    setChallenge(challengeData);
  }, [id]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setChallengeEnded(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle challenge end
  useEffect(() => {
    if (challengeEnded) {
      alert("Time's up! The challenge has ended.");
      navigate('/ctf'); // Redirect to CTF main page
    }
  }, [challengeEnded, navigate]);

  const handleFlagSubmit = (e) => {
    e.preventDefault();
    if (challengeEnded) {
      alert("Time's up! You can no longer submit flags.");
      return;
    }
    
    if (flag.trim() === 'CTF{b45364_d3c0d3r}') {
      setSubmission({
        status: 'success',
        message: 'Congratulations! You solved the challenge!'
      });
      setShowSuccessModal(true);
    } else {
      setSubmission({
        status: 'error',
        message: 'Incorrect flag. Try again!'
      });
    }
  };

  const handleReturnToChallenges = () => {
    navigate('/ctf');
  };

  if (!challenge) return <div>Loading...</div>;

  return (
    <div className="ctf-challenge-page">
      <div className="challenge-header">
        <div className="header-content">
          <h1>{challenge.title}</h1>
          <div className="challenge-meta">
            <span className={`difficulty ${challenge.difficulty}`}>
              {challenge.difficulty}
            </span>
            <span className="points">
              <FaTrophy /> {challenge.points} pts
            </span>
            <span className={`timer ${timeLeft < 60 ? 'urgent' : ''}`}>
              <FaClock />
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      <div className="challenge-container">
        <div className="challenge-content">
          <section className="description-section">
            <h2>Challenge Description</h2>
            <p>{challenge.description}</p>
          </section>

          <section className="challenge-terminal">
            <div className="terminal-header">
              <FaTerminal /> Challenge Content
            </div>
            <pre className="terminal-content">
              {challenge.challengeContent}
            </pre>
          </section>

          <section className="instructions-section">
            <h2>Instructions</h2>
            <ol>
              {challenge.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </section>

          <section className="resources-section">
            <h2>Resources</h2>
            <ul>
              {challenge.resources.map((resource, index) => (
                <li key={index}>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="submission-section">
            <h2>Submit Flag</h2>
            <form onSubmit={handleFlagSubmit}>
              <div className="flag-input">
                <FaFlag className="flag-icon" />
                <input
                  type="text"
                  value={flag}
                  onChange={(e) => setFlag(e.target.value)}
                  placeholder="CTF{flag_format}"
                  disabled={challengeEnded}
                />
              </div>
              <button type="submit" className="submit-btn" disabled={challengeEnded}>
                Submit Flag
              </button>
            </form>
            {submission.status && (
              <div className={`submission-result ${submission.status}`}>
                {submission.message}
              </div>
            )}
          </section>
        </div>

        <div className="challenge-sidebar">
          <div className="hints-panel">
            <h3>
              <FaLightbulb /> Hints
            </h3>
            {challenge.hints.map((hint, index) => (
              <div key={index} className="hint">
                <button
                  className={`hint-btn ${showHint ? 'revealed' : ''}`}
                  onClick={() => setShowHint(true)}
                  disabled={challengeEnded}
                >
                  {showHint ? hint : `Reveal Hint ${index + 1}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="success-modal">
            <button className="close-modal" onClick={() => setShowSuccessModal(false)}>
              <FaTimes />
            </button>
            <div className="success-content">
              <FaCheckCircle className="success-icon" />
              <h2>Challenge Completed!</h2>
              <div className="success-details">
                <p>Congratulations! You've successfully solved:</p>
                <h3>{challenge.title}</h3>
                <div className="points-earned">
                  <FaTrophy />
                  <span>{challenge.points} Points Earned!</span>
                </div>
                <div className="completion-time">
                  Time Remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
              </div>
              <button className="return-btn" onClick={handleReturnToChallenges}>
                Return to Challenges
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CTFChallenge; 