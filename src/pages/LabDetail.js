import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './LabDetail.css';

function LabDetail() {
  const { id } = useParams();
  const [lab, setLab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flagInput, setFlagInput] = useState('');
  const [submission, setSubmission] = useState(null);
  const [timer, setTimer] = useState(null);
  const [usedHints, setUsedHints] = useState([]);

  useEffect(() => {
    const fetchLab = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/labs/${id}`);
        if (!response.ok) {
          throw new Error('Lab not found');
        }
        const data = await response.json();
        setLab(data);
        setTimer(data.timeLimit * 60); // Convert to seconds
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLab();
  }, [id]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleFlagSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/labs/${id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ flag: flagInput })
      });
      const data = await response.json();
      setSubmission(data);
    } catch (err) {
      setError('Failed to submit flag');
    }
  };

  const unlockHint = async (hintId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/labs/${id}/hints/${hintId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setUsedHints([...usedHints, hintId]);
    } catch (err) {
      setError('Failed to unlock hint');
    }
  };

  if (loading) return <div className="loading">Loading challenge...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!lab) return <div className="not-found">Lab not found</div>;

  return (
    <div className="lab-detail">
      <div className="lab-header">
        <h1>{lab.title}</h1>
        <div className="lab-stats">
          <span className="difficulty">{lab.difficulty}</span>
          <span className="points">{lab.points} pts</span>
          <span className="time">
            {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="lab-content">
        <section className="description">
          <h2>Description</h2>
          <p>{lab.description}</p>
        </section>

        <section className="instructions">
          <h2>Instructions</h2>
          <ol>
            {lab.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </section>

        <section className="hints">
          <h2>Hints</h2>
          {lab.hints.map(hint => (
            <div key={hint.id} className="hint">
              {usedHints.includes(hint.id) ? (
                <p>{hint.text}</p>
              ) : (
                <button 
                  onClick={() => unlockHint(hint.id)}
                  className="btn btn-secondary"
                >
                  Unlock Hint (-{hint.cost} pts)
                </button>
              )}
            </div>
          ))}
        </section>

        <section className="resources">
          <h2>Resources</h2>
          <ul>
            {lab.resources.map((resource, index) => (
              <li key={index}>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  {resource.title}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="submission">
          <h2>Submit Flag</h2>
          <form onSubmit={handleFlagSubmit}>
            <input
              type="text"
              value={flagInput}
              onChange={(e) => setFlagInput(e.target.value)}
              placeholder="Enter flag (e.g., CTF{flag})"
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          {submission && (
            <div className={`submission-result ${submission.correct ? 'correct' : 'incorrect'}`}>
              {submission.message}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default LabDetail; 