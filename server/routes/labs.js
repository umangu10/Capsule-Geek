const express = require('express');
const router = express.Router();
const { readDB, writeDB } = require('../utils/database');

// Get all labs
router.get('/', async (req, res) => {
  try {
    const labs = [
      {
        id: "1",
        title: "Web Security Lab: XSS Attack",
        description: "Practice identifying and exploiting Cross-Site Scripting vulnerabilities.",
        difficulty: "Beginner",
        category: "web",
        points: 100,
        timeLimit: 60,
        status: "active",
        challengeType: "ctf",
        environment: {
          type: "web",
          url: "http://localhost:5001/labs/xss-lab"
        },
        instructions: [
          "Find the vulnerable input field",
          "Craft a payload to execute JavaScript",
          "Steal the cookie and submit it as the flag"
        ],
        hints: [
          {
            id: 1,
            text: "Try looking at user input fields",
            cost: 10
          },
          {
            id: 2,
            text: "Remember to check for input sanitization",
            cost: 20
          }
        ],
        flag: "CTF{xss_m4st3r_2024}",
        resources: [
          {
            title: "XSS Prevention Cheatsheet",
            url: "https://owasp.org/www-community/xss-filter-evasion-cheatsheet"
          }
        ]
      },
      {
        id: "2",
        title: "Network Lab: Port Scanning",
        description: "Learn to identify open ports and services using network scanning tools.",
        difficulty: "Intermediate",
        category: "network",
        points: 150,
        timeLimit: 90,
        status: "active",
        challengeType: "lab",
        environment: {
          type: "terminal",
          host: "lab-network.local"
        },
        instructions: [
          "Use nmap to scan the target network",
          "Identify running services",
          "Find the vulnerable service and exploit it"
        ],
        hints: [
          {
            id: 1,
            text: "Try using nmap's service detection",
            cost: 15
          }
        ],
        flag: "CTF{p0rt_sc4nn3r_pr0}",
        resources: [
          {
            title: "Nmap Cheatsheet",
            url: "https://www.stationx.net/nmap-cheat-sheet/"
          }
        ]
      }
    ];

    res.json(labs);
  } catch (err) {
    console.error('Error fetching labs:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single lab
router.get('/:id', async (req, res) => {
  try {
    const labs = [
      {
        id: "1",
        title: "Web Security Lab: XSS Attack",
        description: "Practice identifying and exploiting Cross-Site Scripting vulnerabilities.",
        difficulty: "Beginner",
        category: "web",
        points: 100,
        timeLimit: 60,
        status: "active",
        challengeType: "ctf",
        environment: {
          type: "web",
          url: "http://localhost:5001/labs/xss-lab"
        },
        instructions: [
          "Find the vulnerable input field",
          "Craft a payload to execute JavaScript",
          "Steal the cookie and submit it as the flag"
        ],
        hints: [
          {
            id: 1,
            text: "Try looking at user input fields",
            cost: 10
          },
          {
            id: 2,
            text: "Remember to check for input sanitization",
            cost: 20
          }
        ],
        flag: "CTF{xss_m4st3r_2024}",
        resources: [
          {
            title: "XSS Prevention Cheatsheet",
            url: "https://owasp.org/www-community/xss-filter-evasion-cheatsheet"
          }
        ]
      },
      {
        id: "2",
        title: "Network Lab: Port Scanning",
        description: "Learn to identify open ports and services using network scanning tools.",
        difficulty: "Intermediate",
        category: "network",
        points: 150,
        timeLimit: 90,
        status: "active",
        challengeType: "lab",
        environment: {
          type: "terminal",
          host: "lab-network.local"
        },
        instructions: [
          "Use nmap to scan the target network",
          "Identify running services",
          "Find the vulnerable service and exploit it"
        ],
        hints: [
          {
            id: 1,
            text: "Try using nmap's service detection",
            cost: 15
          }
        ],
        flag: "CTF{p0rt_sc4nn3r_pr0}",
        resources: [
          {
            title: "Nmap Cheatsheet",
            url: "https://www.stationx.net/nmap-cheat-sheet/"
          }
        ]
      }
    ];

    const lab = labs.find(l => l.id === req.params.id);
    if (!lab) {
      return res.status(404).json({ message: 'Lab not found' });
    }
    res.json(lab);
  } catch (err) {
    console.error('Error fetching lab:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit flag
router.post('/:id/submit', async (req, res) => {
  try {
    const { flag } = req.body;
    const labs = [
      // ... same labs array as above
    ];
    
    const lab = labs.find(l => l.id === req.params.id);
    if (!lab) {
      return res.status(404).json({ message: 'Lab not found' });
    }

    const isCorrect = flag === lab.flag;
    
    res.json({
      correct: isCorrect,
      message: isCorrect ? 'Congratulations! Flag is correct!' : 'Incorrect flag. Try again!',
      points: isCorrect ? lab.points : 0
    });
  } catch (err) {
    console.error('Error submitting flag:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Unlock hint
router.post('/:id/hints/:hintId', async (req, res) => {
  try {
    const labs = [
      // ... same labs array as above
    ];
    
    const lab = labs.find(l => l.id === req.params.id);
    if (!lab) {
      return res.status(404).json({ message: 'Lab not found' });
    }

    const hint = lab.hints.find(h => h.id === parseInt(req.params.hintId));
    if (!hint) {
      return res.status(404).json({ message: 'Hint not found' });
    }

    res.json({
      hint: hint.text,
      pointsDeducted: hint.cost
    });
  } catch (err) {
    console.error('Error unlocking hint:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 