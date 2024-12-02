const labs = [
  {
    id: "1",
    title: "Web Security Lab: XSS Attack",
    description: "Practice identifying and exploiting Cross-Site Scripting vulnerabilities.",
    difficulty: "Beginner",
    category: "web",
    points: 100,
    timeLimit: 60, // in minutes
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

module.exports = labs; 