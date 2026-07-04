/**
 * @module portfolio-data
 * @author  Nithin K R — https://github.com/NITHINKR06
 * @license Attribution required — see LICENSE in project root
 *
 * Personal portfolio data for Nithin K R.
 * This file contains personal content specific to Nithin K R.
 * Use of this file's structure is permitted for learning;
 * redistribution with original content is not permitted.
 */

import type { Education, Certifications } from './types';

export const portfolioData = {
  personal: {
    name: 'Nithin K R',
    title: 'Full Stack Developer | Cyber Security Researcher',
    email: 'nithinpoojari717@gmail.com',
    github: 'https://github.com/NITHINKR06',
    linkedin: 'https://linkedin.com/in/nithinkr06',
    location: 'Karnataka, IN',
    bio: 'Passionate Full Stack Developer with expertise in modern web technologies and a focus on creating scalable, user-centric applications.',
  },

  skills: [
    {
      category: 'Frontend',
      items: [
        {
          name: 'HTML5',
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
          link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
          color: '#E34F26',
        },
        {
          name: 'CSS3',
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
          link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
          color: '#1572B6',
        },
        {
          name: 'JavaScript',
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
          link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
          color: '#F7DF1E',
        },
        {
          name: 'TypeScript',
          logo: '/logos/typescript-original.svg',
          link: 'https://www.typescriptlang.org/',
          color: '#3178C6',
        },
        {
          name: 'React',
          logo: '/logos/react-original.svg',
          link: 'https://react.dev/',
          color: '#61DAFB',
        },
        {
          name: 'Tailwind CSS',
          logo: '/logos/tailwindcss-original.svg',
          link: 'https://tailwindcss.com/',
          color: '#38BDF8',
        },
        {
          name: 'Framer Motion',
          logo: 'https://cdn.simpleicons.org/framer',
          link: 'https://www.framer.com/motion/',
          color: '#FF008C',
        },
      ],
    },
    {
      category: 'Backend',
      items: [
        {
          name: 'Node.js',
          logo: '/logos/nodejs-original.svg',
          link: 'https://nodejs.org/',
          color: '#5FA04E',
        },
        {
          name: 'Express.js',
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
          link: 'https://expressjs.com/',
          color: '#FFFFFF',
        },
        {
          name: 'Python',
          logo: '/logos/python-original.svg',
          link: 'https://www.python.org/',
          color: '#3776AB',
        },
        {
          name: 'FastAPI',
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
          link: 'https://fastapi.tiangolo.com/',
          color: '#009688',
        },
        {
          name: 'PostgreSQL',
          logo: '/logos/postgresql-original.svg',
          link: 'https://www.postgresql.org/',
          color: '#336791',
        },
        {
          name: 'MongoDB',
          logo: '/logos/mongodb-original.svg',
          link: 'https://www.mongodb.com/',
          color: '#47A248',
        },
        {
          name: 'Firebase',
          logo: '/logos/firebase-original.svg',
          link: 'https://firebase.google.com/',
          color: '#FFCA28',
        },
      ],
    },
    {
      category: 'DevOps',
      items: [
        {
          name: 'Docker',
          logo: '/logos/docker-original.svg',
          link: 'https://www.docker.com/',
          color: '#2496ED',
        },
        {
          name: 'AWS',
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
          link: 'https://aws.amazon.com/',
          color: '#FF9900',
        },
        {
          name: 'Vercel',
          logo: '/logos/vercel-original.svg',
          link: 'https://vercel.com/',
          color: '#FFFFFF',
        },
        {
          name: 'GitHub Actions',
          logo: '/logos/githubactions-original.svg',
          link: 'https://github.com/features/actions',
          color: '#2088FF',
        },
      ],
    },
    {
      category: 'Tools',
      items: [
        {
          name: 'Git',
          logo: '/logos/git-original.svg',
          link: 'https://git-scm.com/',
          color: '#F05032',
        },
        {
          name: 'GitHub',
          logo: '/logos/github-original.svg',
          link: 'https://github.com/',
          color: '#FFFFFF',
        },
        {
          name: 'VSCode',
          logo: '/logos/vscode-original.svg',
          link: 'https://code.visualstudio.com/',
          color: '#007ACC',
        },
        {
          name: 'Figma',
          logo: '/logos/figma-original.svg',
          link: 'https://figma.com/',
          color: '#F24E1E',
        },
        {
          name: 'Postman',
          logo: '/logos/postman.svg',
          link: 'https://www.postman.com/',
          color: '#FF6C37',
        },
      ],
    },
    {
      category: 'Security',
      items: [
        {
          name: 'Kali Linux',
          logo: 'https://cdn.simpleicons.org/kalilinux',
          link: 'https://www.kali.org/',
          color: '#557C94',
        },
        {
          name: 'TryHackMe',
          logo: 'https://cdn.simpleicons.org/tryhackme',
          link: 'https://tryhackme.com/',
          color: '#212C42',
        },
        {
          name: 'Wireshark',
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/networkx/networkx-original.svg',
          link: 'https://www.wireshark.org/',
          color: '#1679A7',
        },
      ],
    },
  ] as Skill[],

  projects: [
    {
      id: 'codesentinel',
      title: 'CodeSentinel - Full-Stack Security Analysis Platform',
      description:
        'Built a scalable security platform that scans GitHub repos and live URLs using AST pattern scanning (12+ vuln types), multi-step vulnerability chain detection, and PoC exploit generation; containerized with Docker Compose for full product deployment.',
      details: `## Overview
CodeSentinel is a complete static-analysis and exploit-simulation platform built with Next.js, FastAPI, and Docker Compose. It automates vulnerability scanning, exploit generation, and AI-powered patch submission.

## Key Features
- **AST Pattern Scanning**: Scans GitHub repositories and live URLs using AST-based pattern matching across 12+ vulnerability types
- **Vulnerability Chaining**: Detects multi-step vulnerability chains and generates working Proof-of-Concept (PoC) exploits
- **AI-Powered Patching**: Integrated LLM-powered (Groq/Ollama) patch generation with red-agent validation and automated GitHub Pull Request submission
- **Attack Graph Dashboard**: Implements a live D3.js attack-graph dashboard to visualize threats and relationships in real-time

## Technical Stack
- **Frontend**: Next.js, React, Tailwind CSS, D3.js
- **Backend**: Python, FastAPI, TypeScript, Docker Compose
- **AI/ML**: Groq, Ollama, local LLM engineering`,
      technologies: [
        'Next.js',
        'FastAPI',
        'Python',
        'TypeScript',
        'Docker',
        'D3.js',
        'Ollama',
        'Groq',
      ],
      githubUrl: 'https://github.com/NITHINKR06/codesentinel',
      status: 'completed',
      priority: 'high',
      thumbnail: '/projects/codesentinel-thumbnail.png',
    },
    {
      id: 'gitpulse',
      title: 'GitPulse - GitHub Developer Profile API',
      description:
        'Built a scalable Spring Boot REST API that fetches and aggregates GitHub user stats (language analytics, stars, forks, top repos) with async processing via @Async + CompletableFuture and Redis caching (10-min TTL) to handle GitHub rate limits.',
      details: `## Overview
GitPulse is a high-performance Spring Boot REST API that aggregates GitHub developer metrics across six distinct endpoints, designed to handle high-concurrency requests and manage rate-limiting constraints efficiently.

## Key Features
- **Asynchronous Concurrency**: Utilizes Spring's \`@Async\` and Java's \`CompletableFuture\` for fully non-blocking concurrent API calls to GitHub
- **Redis Caching**: Implements Redis-based caching with a 10-minute Time-To-Live (TTL) to stay well within GitHub's rate limits and maintain fast response times
- **Dynamic Frontend**: Surfaces results using responsive, dark-themed Thymeleaf profile cards

## Technical Stack
- **Backend Framework**: Java, Spring Boot, Spring Cache
- **Caching & Storage**: Redis, Docker
- **Frontend**: Thymeleaf, Tailwind CSS`,
      technologies: ['Java', 'Spring Boot', 'Redis', 'Docker', 'Thymeleaf'],
      githubUrl: 'https://github.com/NITHINKR06/gitpulse',
      status: 'completed',
      priority: 'high',
      thumbnail: '/projects/gitpulse-thumbnail.png',
    },
    {
      id: 'walrus',
      title: 'WALRUS - Cybersecurity & Digital Safety Platform',
      description:
        'Built a full-stack cybersecurity education platform with an AI-powered scam analyzer using Hugging Face NLP (BART-large-MNLI) to classify phishing URLs, emails, and phone numbers with confidence scoring.',
      details: `## Overview
WALRUS (Web Application for Learning, Reporting, and Understanding Security) is a comprehensive full-stack cybersecurity education and protection platform designed to tackle the growing digital safety challenges faced by users in India.

## Key Features
- **AI-Powered Scam Analysis**: Evaluates text messages, URLs, email content, and phone numbers in real-time using Hugging Face's NLP models (Facebook's BART-large-MNLI)
- **Threat Classification**: Classifies threats as phishing, malware, fraud, or legitimate content with confidence scores and actionable recommendations
- **Gamified Learning**: Five progressive cybersecurity modules where users earn points, climb leaderboards, and maintain daily learning streaks
- **Time Machine**: Interactive historical scenarios spanning 2015 to 2035, teaching how digital fraud has evolved
- **Multi-Language Support**: English, Hindi (हिंदी), and Kannada (ಕನ್ನಡ)
- **Community Platform**: Users can report scams, participate in forums, and access admin-moderated safety content

## Technical Stack
- **Frontend**: React 18.3, TypeScript 5.5, Vite 5.4
- **Backend**: Node.js, Express.js 5.x, MongoDB, Mongoose 8.x
- **Auth**: Firebase Auth with Admin SDK
- **Security**: Helmet.js, CORS policies, rate-limiting, express-slow-down middleware
- **APIs**: Cloudflare URL Scanner, Google Safe Browsing, Whois lookup, Tesseract.js for OCR`,
      technologies: [
        'React',
        'TypeScript',
        'Node.js',
        'Express.js',
        'MongoDB',
        'Firebase',
        'Hugging Face',
        'Vite',
      ],
      githubUrl: 'https://github.com/NITHINKR06/cyberawareness',
      liveUrl: 'https://cyberawareness-iota.vercel.app',
      status: 'completed',
      priority: 'high',
      thumbnail: '/projects/walrus/walrus-thumbnail.webp',
      screenshots: [
        '/projects/walrus/walrus-thumbnail.webp',
        '/projects/walrus/image.webp',
        '/projects/walrus/image.webp',
      ],
    },
    {
      id: 'driftguard',
      title: 'DriftGuard - ML Network Intrusion Detection System',
      description:
        'Designed an ensemble ML-based IDS combining Isolation Forest, Dense Autoencoder, and Bidirectional LSTM with weighted fusion, achieving ∼2,380 flows/sec throughput.',
      details: `## Overview
DriftGuard addresses one of the most persistent challenges in cybersecurity: the inability of ML models to generalize across different network environments. Most intrusion detection systems fail when deployed in networks different from where they were trained, but DriftGuard maintains robust performance across diverse environments.

## ML Architecture
- **Isolation Forest**: Fast, unsupervised tree-based anomaly detection on high-dimensional network traffic data (contamination=0.1)
- **Dense Autoencoder**: Symmetric architecture (77 → 50 → 25 → 50 → 77) trained exclusively on benign traffic samples, detecting anomalies through reconstruction error
- **Bidirectional LSTM Autoencoder**: Captures temporal dependencies in network flows using window size of 10 timesteps

## Scoring
Risk scores computed via weighted ensemble fusion: 0.3 × Isolation Forest + 0.4 × Autoencoder + 0.3 × LSTM

## Validation Datasets
- **CICIDS2017**: Training dataset (academic network)
- **UNSW-NB15**: Cross-dataset validation
- **UGR16v2noIRC**: Real-world ISP traffic validation

## Performance
- Processing throughput of ~2,380 network flows per second with low latency
- SHAP (SHapley Additive exPlanations) analysis provides interpretable explanations for each flagged flow

## Future Enhancements
- Zeek real-time inference integration
- Automated MITRE ATT&CK technique mapping`,
      technologies: ['Python', 'Jupyter Notebook', 'scikit-learn', 'TensorFlow', 'SHAP', 'LSTM'],
      githubUrl: 'https://github.com/NITHINKR06/DriftGuard',
      status: 'completed',
      priority: 'high',
      thumbnail: '/projects/driftguard-thumbnail.png',
    },
    {
      id: 'chc-secure',
      title: 'CHC Secure File Management System',
      description:
        'A blockchain-integrated file encryption platform built around a custom Contextual Hash Chain (CHC) cryptographic algorithm with forward security by design and immutable audit trails.',
      details: `## Overview
The CHC Secure File Management System is a blockchain-integrated file encryption platform built around a custom cryptographic algorithm called the Contextual Hash Chain (CHC).

## Key Innovation
Unlike traditional encryption where a single key protects all files, CHC derives a unique encryption seed for each file by combining the user's master secret with blockchain context (latest block hash, timestamp, and file identifier) through HMAC-SHA256.

## Encryption Details
- **Chained Block Cipher**: Each block's encryption state depends on the previous block's ciphertext through SHA-256 hash chaining
- **Forward Security**: Even if a single file's encryption is compromised, no other files are affected
- **Variable-Length Keystream**: Expands 256-bit key state into variable-length keystream using counter-mode SHA-256 blocks
- **Per-User Access**: Wraps each file's encryption seed individually for each authorized user

## Audit Trail
An immutable blockchain audit trail records all file operations — uploads, downloads, access grants, and revocations — as SHA-256-chained blocks, creating a tamper-proof log.

## Architecture
- **Frontend**: TypeScript
- **Encryption Core**: Python
- **Storage**: Encrypted files stored off-chain on Firestore
- **Metadata**: Wrapped keys and blockchain records maintained separately`,
      technologies: ['Python', 'TypeScript', 'Firebase', 'HMAC-SHA256', 'Blockchain'],
      githubUrl: 'https://github.com/NITHINKR06/chc-secure-file-system',
      status: 'completed',
      priority: 'high',
    },
    {
      id: 'packet-defender',
      title: 'Packet Defender - Cyber Defense Simulation',
      description:
        'A comprehensive Pygame-based cyber defense simulation that gamifies defending a network infrastructure against escalating waves of cyberattacks with real-time visualization.',
      details: `## Overview
Packet Defender is a comprehensive Pygame-based cyber defense simulation that gamifies the experience of defending a network infrastructure against escalating waves of cyberattacks.

## Attack Waves
1. **Wave 1**: Reconnaissance via Port Scans
2. **Wave 2**: Initial Assault with SYN Floods
3. **Wave 3**: Coordinated DDoS Attacks
4. **Wave 4**: Advanced Threats (Slowloris, DNS Amplification)
5. **Wave 5**: Final Siege with multi-vector attacks

## Attack Types
Seven distinct attack types modeled: DDoS, SYN Flood, Port Scanning, Brute Force, Ping Flood (ICMP), Slowloris, and DNS Amplification — each with realistic packet generation including authentic headers, protocols, and payloads.

## Defense Modes
- **Manual Defense**: Click individual malicious packets to block them
- **Auto-Defense Mode**: AI-powered automated threat blocking system
- **Power-ups**: "Block All Threats", "Heal Network", "Clear Screen"

## Visualization
- Complete network topology: Router → Firewall → Server → Workstations
- Color-coded threat levels (Safe, Suspicious, Malicious, Critical)
- Live statistics dashboard
- Cyberpunk-themed design with glassmorphism effects and particle animations
- Comprehensive logging with timestamps and exportable reports`,
      technologies: ['Python', 'Pygame'],
      githubUrl: 'https://github.com/NITHINKR06/cyb-eh',
      status: 'completed',
      priority: 'medium',
    },
    {
      id: 'cyber-defense-game',
      title: 'Real-Time Cyber Defense Game',
      description:
        'A Python Pygame project that integrates directly with Linux iptables firewall to apply real network security rules during gameplay, bridging cybersecurity simulation and actual system-level firewall management.',
      details: `## Overview
The Real-Time Cyber Defense Game bridges the gap between cybersecurity simulation and actual system-level firewall management. Unlike purely visual simulations, this game integrates directly with the Linux iptables firewall to apply real network security rules during gameplay.

## Key Features
- **Real Firewall Integration**: When a player clicks on a hostile packet, the game executes \`iptables -A INPUT -s <IP> -j DROP\`, genuinely blocking that IP at the kernel level
- **Health System**: Network core health decreases when hostile packets breach defenses
- **Visual Identification**: Hostile packets glow red, safe packets glow blue
- **Randomized Threats**: Packets spawn with randomized IP addresses, speeds (1.5–4.0 units), and threat classifications

## Cross-Platform Support
- Kali Linux (native)
- Windows
- VirtualBox for isolated testing environments

## Educational Value
Designed as an effective educational tool for cybersecurity students and professionals who want to practice threat identification in an engaging, hands-on manner.`,
      technologies: ['Python', 'Pygame', 'iptables', 'Kali Linux'],
      githubUrl: 'https://github.com/NITHINKR06/cybgame',
      status: 'completed',
      priority: 'medium',
    },
    {
      id: 'ctf-dashboard',
      title: 'CTF Dashboard',
      description:
        'A Capture The Flag competition platform with real-time leaderboards, challenge management, and a complete admin panel for organizing cybersecurity competitions.',
      details: `## Overview
The CTF Dashboard is a Capture The Flag competition platform built with TypeScript and powered by a Firebase backend, designed to host and manage cybersecurity challenge competitions.

## Player Features
- Browse available challenges organized by category
- Submit flags for verification
- Track scores and monitor ranking on a live leaderboard
- Real-time updates as other participants solve challenges

## Admin Panel
- Full challenge lifecycle management
- Create challenges with descriptions, difficulty levels, point values, and flags
- Monitor submission attempts and success rates
- View analytics on challenge completion patterns
- Manage active competitions

## Technical Details
- **Database**: Firebase Firestore for real-time data synchronization
- **Auth**: Firebase Authentication with Firestore Security Rules
- **Deployment**: Vercel for frontend
- Supports multiple challenge categories
- Easily customizable themes and challenge types`,
      technologies: ['TypeScript', 'Firebase', 'Firestore', 'Vercel'],
      githubUrl: 'https://github.com/NITHINKR06/ctf',
      status: 'completed',
      priority: 'medium',
    },
    {
      id: 'cyberwalrus',
      title: 'CyberWalrus - WALRUS v2',
      description:
        'The next-generation evolution of the WALRUS cybersecurity platform with enhanced gamification, multi-tier threat classification, and expanded AI-powered scam detection capabilities.',
      details: `## Overview
CyberWalrus is the next-generation evolution of the WALRUS cybersecurity platform, representing a significant architectural and feature upgrade from the original.

## Enhanced Features
- **Points & Levels Progression**: Users earn points for completing security modules, reporting threats, and participating in community activities
- **Achievement System**: Unlock achievements as you advance through defined skill levels
- **Multi-Tier Threat Classification**: Granular levels (low, medium, high, critical) with detailed actionable insights for each severity tier
- **Expanded AI Integration**: Hugging Face API for NLP-based content classification + Google Safe Browsing API for URL reputation checking

## Architecture
- **Mobile-First Design**: Responsive approach ensuring accessibility across devices
- **Improved API Integration**: Clean separation between presentation layer and security analysis backends
- **TypeScript Codebase**: Entirely built in TypeScript with structured project organization following modern frontend conventions`,
      technologies: ['TypeScript', 'Hugging Face', 'Google Safe Browsing API', 'React'],
      githubUrl: 'https://github.com/NITHINKR06/cyberwalrus',
      status: 'completed',
      priority: 'medium',
    },
    {
      id: 'animated-portfolio',
      title: 'Animated 3D Portfolio',
      description:
        'A cutting-edge personal portfolio website with immersive 3D graphics, cinematic animations, WebGL particle systems via Three.js, and a cyberpunk-inspired design philosophy.',
      details: `## Overview
The Animated 3D Portfolio pushes the boundaries of modern web design through immersive 3D graphics and cinematic animation sequences.

## Key Features
- **WebGL Particle System**: 5,000 particles distributed across a spherical volume using trigonometric calculations, rendered with additive blending
- **Cyan-to-Magenta Color Gradient**: Reinforces the neon cyberpunk aesthetic
- **Framer Motion 12+**: Page transitions and component-level animations
- **Anime.js 4+**: Complex keyframe-based animations for micro-interactions and loading sequences

## Design Philosophy
- Cyberpunk neon-themed dark mode
- Glassmorphism panels (backdrop-filter with blur and semi-transparent backgrounds)
- Dynamic hover effects responsive to user interaction
- Fully responsive across all device sizes

## Technical Details
- Built with 98.2% TypeScript
- Strict TypeScript codebase with custom type definitions
- Deployed on Vercel with continuous deployment
- Three.js scene management with custom animation controllers`,
      technologies: ['TypeScript', 'React', 'Three.js', 'Framer Motion', 'Anime.js', 'Vite'],
      githubUrl: 'https://github.com/NITHINKR06/Animated_Portfolio',
      liveUrl: 'https://nithinkr.vercel.app',
      status: 'completed',
      priority: 'high',
    },
    {
      id: 'kaleido',
      title: 'Kaleido - AI Poster & Carousel Generator',
      description:
        'An AI-powered design automation tool that transforms images and intent descriptions into professional-quality posters and multi-slide carousels using GPT-4o Vision.',
      details: `## Overview
Kaleido transforms images and intent descriptions into professional-quality posters and multi-slide carousels through a full AI pipeline.

## AI Pipeline
1. User uploads an image and describes their intent (e.g., "promotion for a music festival")
2. GPT-4o Vision analyzes the visual content to extract dominant color palette, classify mood, and generate tailored marketing copy
3. Headless Puppeteer renders CSS-based layouts into high-resolution webp files

## Key Features
- **Adaptive Learning System**: Remembers each user's design preferences over time
- **Style Preferences**: Adjusts between neon/bold aesthetics or pastel/minimal styles
- **Multiple Formats**: Single poster and multi-slide carousel outputs
- **Pixel-Perfect Output**: Suitable for print and digital distribution

## Architecture
- **Frontend**: Next.js for the user interface
- **Backend**: Python FastAPI for AI inference pipeline, image processing, and rendering orchestration
- **Database**: Supabase with PostgreSQL for user profiles, design history, and adaptive preference storage
- **API Design**: RESTful conventions with typed Pydantic models for request/response validation`,
      technologies: [
        'Next.js',
        'Python',
        'FastAPI',
        'GPT-4o Vision',
        'Supabase',
        'PostgreSQL',
        'Puppeteer',
      ],
      githubUrl: 'https://github.com/NITHINKR06/Kaleido',
      status: 'completed',
      priority: 'high',
    },
    {
      id: 'airtable',
      title: 'Airtable - Dynamic Form Builder',
      description:
        'A full-stack dynamic form builder with deep Airtable integration, OAuth-based authentication, conditional logic, and complete form lifecycle management.',
      details: `## Overview
The Airtable Dynamic Form Builder allows users to create, manage, and deploy custom forms with deep Airtable integration.

## Key Features
- **OAuth-based Authentication**: Connect forms directly to Airtable bases for automated data synchronization
- **Rich Field Types**: Support for a comprehensive set of Airtable field types
- **Conditional Logic**: Show, hide, or modify fields based on user responses using customizable operators and logic combinators
- **Complete Lifecycle**: Dashboard, visual form editor, live preview, and response viewer

## API Endpoints
1. **Authentication**: User registration, login, token management
2. **Forms**: CRUD operations, field configuration
3. **Airtable**: OAuth flow, base synchronization, field mapping
4. **Webhooks**: External service triggers on form submission

## Data Models
- **User**: Profile and authentication data
- **Form**: Field configurations with nested conditional logic rules
- **Response**: Submissions with webhook payloads

## Deployment
- Frontend on Vercel
- Backend on Render/Railway`,
      technologies: ['JavaScript', 'Airtable API', 'OAuth', 'Vercel'],
      githubUrl: 'https://github.com/NITHINKR06/Airtable',
      liveUrl: 'https://airtabledynamicform.vercel.app',
      status: 'completed',
      priority: 'medium',
    },
    {
      id: 'intapp',
      title: 'IntApp (callus) - Short-Form Video App',
      description:
        'A full-stack short-form video application with end-to-end type safety via tRPC, Docker containerization, and AWS S3 video storage.',
      details: `## Overview
IntApp is a full-stack short-form video application built with modern TypeScript tooling and enterprise-grade architecture.

## Key Features
- **End-to-End Type Safety**: tRPC (TypeScript Remote Procedure Call) ensures API changes are automatically reflected in the frontend at compile time
- **Docker Containerized**: docker-compose configuration for local development with database migration scripts
- **Video Storage**: AWS S3 with built-in local storage fallback for development environments
- **Complete Feature Set**: User auth, profile management, video upload, feed generation, likes, comments, follows, and content discovery

## Architecture
- **API Layer**: tRPC routers for type-safe API definitions
- **External Integrations**: REST API routes for third-party services
- **Database**: Well-documented Entity Relationship Diagram
- **Modular Structure**: Clearly separated concerns with comprehensive documentation`,
      technologies: ['TypeScript', 'tRPC', 'Docker', 'AWS S3', 'Node.js'],
      githubUrl: 'https://github.com/NITHINKR06/callus',
      status: 'completed',
      priority: 'medium',
    },
    {
      id: 'globlebites',
      title: 'GlobleBites - Food Delivery Backend',
      description:
        'A production-ready RESTful API backend for a food delivery platform with JWT authentication, bcrypt password hashing, role-based access control, and Nodemailer integration.',
      details: `## Overview
GlobleBites is a production-ready RESTful API backend for a food delivery platform, built with Node.js, Express.js, and MongoDB.

## Authentication & Security
- **Password Hashing**: bcryptjs with 12 salt rounds
- **JWT Sessions**: 7-day expiration, signed with server-side secret
- **Role-Based Access Control**: Supports user, admin, and delivery roles
- **Rate Limiting**: Middleware to prevent API abuse
- **CORS**: Cross-origin request configuration

## API Features
- RESTful conventions with Express.js routing
- Complete user profiles (name, email, location, role-based permissions)
- Nodemailer integration for order confirmations, account verification, and password resets

## Data Layer
- MongoDB with Mongoose for schema validation
- Separated route definitions, controller logic, middleware functions, and model schemas`,
      technologies: ['JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Nodemailer'],
      githubUrl: 'https://github.com/NITHINKR06/GlobleBites',
      status: 'completed',
      priority: 'medium',
    },
    {
      id: 'wellness',
      title: 'Wellness - PPD Risk Assessment',
      description:
        'A full-stack healthcare application for assessing postpartum depression risk through a comprehensive multi-factor evaluation system targeting new mothers and healthcare professionals.',
      details: `## Overview
Wellness is a full-stack healthcare application designed to assess postpartum depression (PPD) risk through a comprehensive multi-factor evaluation system.

## Target Users
- **New Mothers & Expecting Parents**: Self-assess risk levels with accessible, non-clinical language
- **Healthcare Professionals**: Detailed factor-by-factor breakdowns for nuanced clinical discussions

## Risk Assessment Engine
- Evaluates multiple clinical risk factors: personal history of depression, pregnancy-related complications, support system strength, sleep patterns, and emotional wellbeing
- Weighted scoring algorithm mapping individual answers to risk factor contributions
- Aggregates into overall risk level (low, moderate, high) with personalized recommendations

## Technical Stack
- **Frontend**: React for responsive single-page application
- **Backend**: Node.js with Express.js RESTful API endpoints
- **Privacy**: Strict data handling protocols with prominent medical disclaimers
- **Note**: Intended as a screening aid, not a clinical diagnosis tool`,
      technologies: ['JavaScript', 'React', 'Node.js', 'Express.js'],
      githubUrl: 'https://github.com/NITHINKR06/wellness',
      status: 'completed',
      priority: 'medium',
    },
    {
      id: 'orbital-note',
      title: 'Orbital-Note',
      description:
        'A creative notes application with a unique orbital layout system where notes are arranged in a circular pattern, featuring full CRUD operations, custom colors, and smooth animations.',
      details: `## Overview
Orbital-Note reimagines how users interact with their notes through a unique orbital layout system.

## Key Features
- **Orbital Layout**: Notes arranged in a circular pattern around a central point on desktop — a visually distinctive, spatially intuitive alternative to traditional lists or grids
- **Full CRUD Operations**: Create, edit, delete, and search through notes by title or content
- **Custom Colors**: Assign colors to notes for visual categorization
- **LocalStorage Persistence**: Data survives page refreshes without requiring a backend
- **Responsive Design**: Orbital layout on desktop, mobile-optimized view on smaller screens

## Technical Stack
- **Framework**: Next.js for server-side rendering and optimized performance
- **UI Primitives**: Radix UI for accessible, WCAG-compliant components
- **Animations**: Framer Motion for smooth creation, deletion, and layout transitions
- **Styling**: Tailwind CSS
- **Language**: TypeScript`,
      technologies: ['TypeScript', 'Next.js', 'Radix UI', 'Framer Motion', 'Tailwind CSS'],
      githubUrl: 'https://github.com/NITHINKR06/Orbital-Note',
      liveUrl: 'https://orbital-note.vercel.app',
      status: 'completed',
      priority: 'medium',
    },
    {
      id: 'modx',
      title: 'MODX Innovation Hub',
      description:
        'A web-based innovation management platform for team collaboration and project tracking with security-hardened architecture, activity logging, and Cloudinary media integration.',
      details: `## Overview
MODX Innovation Hub is a web-based innovation management platform designed for team collaboration and project tracking.

## Security Features
- Comprehensive Firestore security rules
- Helmet.js middleware for HTTP header hardening
- CORS configuration
- Client-side input validation

## Key Features
- **Admin Dashboard**: Centralized view of platform activity with timestamped activity logging
- **Project Management**: Complete workflows for creating, updating, and managing innovation projects
- **Moderation Tools**: User management and activity analytics for administrators
- **Media Uploads**: Cloudinary integration with client-side validation for file type and size constraints
- **Authentication**: Firebase Auth with rememberMe functionality
- **Real-Time Data**: Firestore for real-time data persistence

## Deployment
Deployed on Vercel at modxbeta.vercel.app with component-based architecture and responsive design patterns.`,
      technologies: ['TypeScript', 'React', 'Firebase', 'Firestore', 'Cloudinary', 'Helmet.js'],
      githubUrl: 'https://github.com/NITHINKR06/modx',
      liveUrl: 'https://modxbeta.vercel.app',
      status: 'completed',
      priority: 'medium',
    },
    {
      id: 'admin-dashboard',
      title: 'AdminDashboard - Recipe Manager',
      description:
        'A web-based content management system for recipe administration with structured project layout, clear separation of concerns, and modern frontend development conventions.',
      details: `## Overview
The Recipe Admin Dashboard is a web-based content management system designed for recipe administration.

## Key Features
- Structured project layout with clear separation between components, services, and data layers
- Organized interface for managing recipe collections
- Creation, editing, categorization, and publishing workflows
- Complete setup instructions and technology documentation
- Well-defined project structure following modern frontend development conventions

## Deployment
Built with JavaScript and deployed on Vercel with deployment automation.`,
      technologies: ['JavaScript', 'Vercel'],
      githubUrl: 'https://github.com/NITHINKR06/AdminDashboard',
      liveUrl: 'https://admin-dashboard-ashen-iota-56.vercel.app',
      status: 'completed',
      priority: 'low',
    },
    {
      id: 'among-us-game',
      title: 'Among Us Game',
      description:
        'A web-based multiplayer imposter detection game inspired by Among Us, featuring social deduction mechanics with discussion, accusation, and voting rounds, built with TypeScript.',
      details: `## Overview
The Among Us Game is a web-based multiplayer imposter detection game inspired by the popular Among Us franchise.

## Key Features
- Social deduction mechanics for identifying hidden imposters
- Rounds of discussion, accusation, and voting
- Determine which players are trustworthy and which are sabotaging the group
- Type-safe game logic, state management, and UI rendering across different browser environments

## Technical Details
- Built entirely with TypeScript for reliable multiplayer interaction
- Deployed on Vercel at whoimposter.vercel.app`,
      technologies: ['TypeScript', 'Vercel'],
      githubUrl: 'https://github.com/NITHINKR06/among-us-game',
      liveUrl: 'https://whoimposter.vercel.app',
      status: 'completed',
      priority: 'low',
    },
    {
      id: 'csi-nmamit',
      title: 'CSI NMAMIT Website v2.0',
      description:
        'A complete redesign of the official CSI student chapter website with Firebase Auth, role-based access (3 tiers), event management, Razorpay payments, and membership certificate generation.',
      details: `## Overview
A complete redesign and rebuild of the official website for the Computer Society of India (CSI) student chapter at NMAM Institute of Technology, serving as a central hub for 500+ members.

## Authentication & Roles
- Firebase Auth with Google OAuth sign-in
- Automatic role detection based on email domains
- Three access tiers: Regular Members, Core Members (enhanced permissions), Admin users (full access)
- Secure session management and state persistence

## Event Management
- Category-based browsing with advanced filtering (year, type, category)
- Real-time search and user registration
- Admin CRUD operations for event creation and management
- Image gallery with lightbox functionality

## Membership & Payments
- Multiple plans: Annual, Semester, and Core Member
- Integrated Razorpay payment gateway (cards, UPI, net banking)
- Backend payment verification with transaction tracking
- Rate limiting to prevent abuse
- Downloadable membership certificate generation

## User Profiles
- Academic details, contact information, bios, and membership status
- Profile completion tracking via modal prompts
- Dynamic team showcase with real-time Firestore sync

## Technical Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, React Parallax Tilt, Lucide React
- **Backend**: Firebase Firestore, Firebase Storage, Razorpay, EmailJS
- **Security**: Authentication guards, data validation, production-hardened webhook endpoints`,
      technologies: [
        'JavaScript',
        'React',
        'Vite',
        'Tailwind CSS',
        'Firebase',
        'Razorpay',
        'Framer Motion',
      ],
      githubUrl: 'https://github.com/NITHINKR06/betacsinmamit',
      status: 'completed',
      priority: 'high',
    },
  ] as Project[],

  education: [
    {
      institution: 'NMAM Institute of Technology Nitte',
      degree: 'Computer Science(Cyber Security)',
      period: '2024 - 2027',
      description:
        "Pursuing Master's in Cyber Security with a focus on Ethical Hacking and Network Security",
      image: '/images/nmamit.webp',
    },
    {
      institution: 'SDM Institute of Technology Ujire',
      degree: 'Computer Science and Engineering(Full Stack)',
      period: '2021 - 2024',
      description: 'Specialized in Full Stack Development with a focus on modern web technologies',
      image: '/images/dip_ujire.webp',
    },
  ] as Education[],

  experience: [
    {
      company: 'Melsta Studio',
      position: 'Full Stack Developer Intern',
      period: 'Jun 2026 – Present',
      location: 'Bengaluru, Karnataka (Remote)',
      description: [
        'Developing and maintaining full-stack features for an AI-powered beauty marketplace platform connecting verified professionals and clients, using React.js, Node.js, and modern web technologies.',
        'Building responsive UI components, REST API integrations, and contributing to platform architecture in a fast-paced startup environment with flexible, remote-first workflows.',
      ],
      technologies: ['React.js', 'Node.js', 'REST API', 'Go'],
    },
    {
      company: 'Code lab systems Mangalore',
      position: 'Full Stack Developer Intern',
      period: '2024',
      location: 'Mangalore, IN',
      description: [
        'Led development of microservices architecture serving 10k+ users',
        'Implemented real-time features using WebSockets and Redis',
        'Mentored 3 junior developers and conducted code reviews',
        'Reduced application load time by 40% through optimization',
      ],
      technologies: ['Node.js', 'React', 'Redis', 'PostgreSQL'],
      achievements: ['Optimized performance by 40%', 'Improved developer onboarding'],
      responsibilities: ['Architecture design', 'Feature development', 'Code reviews'],
    },
  ] as Experience[],

  certifications: [
    {
      title: 'Code Fury 8.0 - NL Hackathon',
      issuer: 'University Visvesvaraya College of Engineering ( UVCE )',
      date: 'Aug 2025',
      image: '/certificate/codefury.webp',
      location: 'Online ',
      category: 'competition',
      description: [
        'Thrilled to share that I participated in CodeFury 8.0! 🎉',
        'It was an amazing opportunity to explore my skills,',
        'collaborate, and learn in the field of technology.',
      ],
      skills: ['CyberSecurity', 'GenAI', 'Flack', 'Git'],
    },

    {
      title: "Hackfest '25 - Hackathon",
      issuer: 'Finite Loop Club - NMAMIT Nitte',
      date: 'Apr 2025',
      image: '/certificate/hackfest.webp',
      category: 'competition',
      description: [
        'Validated knowledge of AWS services and architecture best practices.',
        'Designed and implemented scalable cloud solutions.',
      ],
      skills: ['AWS', 'Cloud Architecture', 'Networking'],
    },

    {
      title: 'PROJECT OMEGA 2025 - Hackathon',
      issuer: 'YENEPOYA INSTITUTE OF TECHNOLOGY MANGALORE',
      date: 'Apr 2025',
      image: '/certificate/omega1.webp',
      category: 'competition',
      description: [''],
      skills: [''],
    },

    {
      title: 'Systems and Usable Security - Course',
      issuer: 'NPTEL ',
      date: 'Apr 2025',
      image: '/certificate/nptel1.webp',
      category: 'other',
      description: [
        'Happy to share that I have successfully completed the NPTEL course on Systems and Usable Security (Jan–Feb 2025).',
        'Grateful for the learning experience and excited to keep growing in the field of security.',
      ],
      skills: ['System Security', 'CyberSecurity', 'Networking'],
    },

    {
      title: 'Microsoft Learn Workshop - Workshop',
      issuer: 'NMAM Institute of Technology Nitte',
      date: 'Mar 2025',
      image: '/certificate/javascript.webp',
      category: 'other',
      description: [
        'Introduction to JavaScript DOM Basics (Hands-On), hosted by S Shyam Kumar. 💻✨',
        'It was a great experience to enhance my JavaScript skills and deepen my understanding of the DOM.',
      ],
      skills: ['JavaScript', 'Logic & Working', 'WebDevelopment'],
    },

    {
      title: 'Oracle Cloud Infrastructure 2025 Certified Networking Professional',
      issuer: 'Oracle',
      date: 'Nov 2025',
      image: '/certificate/oracle_networking.webp',
      category: 'other',
      description: [
        'Successfully completed the Oracle Cloud Infrastructure 2025 Certified Networking Professional certification! 🌐💼',
        'This certification validates my expertise in designing and deploying OCI Virtual Cloud Networks, planning and designing OCI networking solutions and app services, and designing for hybrid networking architectures. Excited to apply these skills in real-world cloud environments!',
      ],
      skills: [
        'Design And Deploy OCI Virtual Cloud Networks',
        'Plan and Design OCI Networking Solutions and App Services',
        'Design for Hybrid Networking Architectures',
      ],
    },

    {
      title: 'Debug Your Soul 2.0',
      issuer: 'CSI, Student Branch NMAMIT Nitte',
      date: 'Aug 2024',
      image: '/certificate/debugus.webp',
      category: 'competition',
      description: [''],
      skills: ['Logic', 'Problem Solving'],
    },
    {
      title: 'Innovation 2025: Microsoft Azure Learning Challenge',
      issuer: 'Microsoft',
      date: 'Aug 2025',
      image: '/certificate/azure.webp',
      location: 'Online',
      category: 'other',
      description: [
        'Completed Microsoft Azure Learning Challenge.',
        'Gained hands-on exposure to cloud services and deployment models.',
        'Strengthened understanding of Azure fundamentals.',
      ],
      skills: ['Azure', 'Cloud Computing', 'Deployment'],
    },
    {
      title: 'Innovation 2025: Applied AI Learning Challenge',
      issuer: 'Microsoft',
      date: 'Aug 2025',
      image: '/certificate/appliedai.webp',
      location: 'Online',
      category: 'other',
      description: [
        'Completed Applied AI Learning Challenge.',
        'Explored AI concepts and real-world applications.',
        'Built foundational understanding of intelligent systems.',
      ],
      skills: ['AI', 'Machine Learning', 'AI Applications'],
    },
    {
      title: 'Innovation 2025: Microsoft AI Learning Challenge',
      issuer: 'Microsoft',
      date: 'Aug 2025',
      image: '/certificate/msai.webp',
      location: 'Online',
      category: 'other',
      description: [
        'Completed Microsoft AI Learning Challenge.',
        'Strengthened AI fundamentals and tools.',
        'Explored practical AI use cases.',
      ],
      skills: ['AI', 'ML', 'AI Tools'],
    },
    {
      title: 'Hashgraph Developer Course',
      issuer: 'The Hashgraph Association',
      date: 'Oct 2025',
      image: '/certificate/hashgraph.webp',
      location: 'Online',
      category: 'other',
      description: [
        'Completed Hashgraph Developer Course.',
        'Learned distributed ledger and Hedera Hashgraph concepts.',
        'Explored decentralized application development.',
      ],
      skills: ['Blockchain', 'Distributed Systems', 'Hedera'],
    },
    {
      title: 'Udbhava 2025 - National Level Tech Fest',
      issuer: 'Nitte Institute of Professional Education',
      date: 'Oct 2025',
      image: '/certificate/udbhav.webp',
      location: 'Offline',
      category: 'competition',
      description: [
        'Participated in Udbhava 2025 National Level Tech Fest.',
        'Engaged in multiple technical events and challenges.',
        'Enhanced innovation and collaboration skills.',
      ],
      skills: ['Innovation', 'Teamwork', 'Technical Events'],
    },
    {
      title: 'Protothon 2026',
      issuer: 'Sahyadri College / Technical Career Education',
      date: '2026',
      image: '/certificate/prothon.webp',
      location: 'Offline',
      category: 'competition',
      description: [
        'Participated in Protothon 2026.',
        'Showcased technical innovation and creativity.',
        'Worked on solving real-world engineering problems.',
      ],
      skills: ['Innovation', 'Engineering', 'Problem Solving'],
    },
    {
      title: 'Hackfest CTF 26',
      issuer: 'NMAM Institute of Technology (NITTE)',
      date: '2026',
      image: '/certificate/hackfest_ctf.webp',
      location: 'Offline',
      category: 'competition',
      description: [
        'Participated in Hackfest 26 hackathon.',
        'Collaborated in a fast-paced development environment.',
        'Improved rapid prototyping and teamwork skills.',
      ],
      skills: ['Hackathon', 'Teamwork', 'Rapid Prototyping'],
    },
  ] as Certifications[],
};
