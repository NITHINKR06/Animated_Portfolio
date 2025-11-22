export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export interface Skill {
  category: string;
  items: {
    name: string;
    logo: string;
    link: string;
    color: string; // 👈 added
  }[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description?: string;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string[];
  location: string;
  technologies?: string[];
  achievements?: string[];
  projects?: string[];
  responsibilities?: string[];
  skills?: string[];
  tools?: string[];
  certifications?: string[];
  awards?: string[];
  languages?: string[];
}
export interface Certifications {
  title: string;
  issuer: string;
  date: string;
  location?: string;
  description: string[];
  skills?: string[];
  link?: string;
  image?: string;
  category: 'competition' | 'other';
}

export const portfolioData = {
  personal: {
    name: "Nithin K R",
    title: "Full Stack Developer | Cyber Security",
    email: "nithinpoojari717@gmail.com",
    github: "https://github.com/NITHINKR06",
    linkedin: "https://linkedin.com/in/nithinkr06",
    location: "Karnataka, IN",
    bio: "Passionate Full Stack Developer with expertise in modern web technologies and a focus on creating scalable, user-centric applications."
  },
  
  // Specify which GitHub repositories to include (leave empty to include all public repos)
  // Example: ["repo-name-1", "repo-name-2", "my-awesome-project"]
  githubRepos: [
    "cyberawareness",
    "chc-secure-file-system",
    "sfw",
    // "NITHINKR06",
    // "wellness",
    "cyberwalrus",
    // "inslab",
    // "SQL",
    "Animated_Portfolio",
    // "CHC",
    // "betacsinmamit",
    // "ctf",
    "E-Voting",
    // "PROTON-CTF",
    // "CybersecurityPath",
    // "SecuredChatApp",
    "Able-D",
    // "Profile",
    // "vibathon-2025",
    // "codefury",
    // "csinmamit",
    // "Interview_helper",
    // "csinmamit.in",
    "emp",
    "ImpoortantQuestions",
    "Orbital-Note",
    // "CyberSecurity",
    "GlobleBites",
    "Hackinator_Hackthon",
    "MSE",
    "TastyEffect",
    "FrozenMagic-Desert",
    // "FB",
    // "BackendCode",
    // "empServer",
    // "AdminDashboard",
    // "BackendCodeEmployment",
    // "Employment",
    "kaarmiqofficial",
    "HealthCasre",
    "Hotel-room-booking-website",
    // "Diploma_Expirements",
    // "MongoDB-CRUD-Operation",
    // "Spring-Apltn-STS",
    "star-animation-background"
  ] as string[],
  
  skills: [
    {
      category: "Frontend",
      items: [
        { name: "React", logo: "/logos/react-original.svg", link: "https://react.dev/", color: "#61DAFB" },
        { name: "Next.js", logo: "/logos/nextjs-original.svg", link: "https://nextjs.org/", color: "#000000" },
        { name: "TypeScript", logo: "/logos/typescript-original.svg", link: "https://www.typescriptlang.org/", color: "#3178C6" },
        { name: "Tailwind CSS", logo: "/logos/tailwindcss-original.svg", link: "https://tailwindcss.com/", color: "#38BDF8" },
        { name: "GSAP", logo: "/logos/gsap.svg", link: "https://gsap.com/", color: "#88CE02" },
        { name: "Three.js", logo: "/logos/threejs-original.svg", link: "https://threejs.org/", color: "#FFFFFF" },
        { name: "Vite", logo: "/logos/vite-original.svg", link: "https://vitejs.dev/", color: "#646CFF" }
      ]
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", logo: "/logos/nodejs-original.svg", link: "https://nodejs.org/", color: "#5FA04E" },
        { name: "Python", logo: "/logos/python-original.svg", link: "https://www.python.org/", color: "#3776AB" },
        { name: "PostgreSQL", logo: "/logos/postgresql-original.svg", link: "https://www.postgresql.org/", color: "#336791" },
        { name: "MongoDB", logo: "/logos/mongodb-original.svg", link: "https://www.mongodb.com/", color: "#47A248" },
        { name: "GraphQL", logo: "/logos/graphql-plain.svg", link: "https://graphql.org/", color: "#E10098" },
        { name: "Networking", logo: "/logos/networking-original.svg", link: "https://en.wikipedia.org/wiki/Computer_network", color: "#0284C7" }
      ]
    },
    {
      category: "DevOps",
      items: [
        { name: "Docker", logo: "/logos/docker-original.svg", link: "https://www.docker.com/", color: "#2496ED" },
        { name: "AWS", logo: "/logos/aws-original.svg", link: "https://aws.amazon.com/", color: "#FF9900" },
        { name: "Vercel", logo: "/logos/vercel-original.svg", link: "https://vercel.com/", color: "#000000" },
        { name: "GitHub Actions", logo: "/logos/githubactions-original.svg", link: "https://github.com/features/actions", color: "#2088FF" }
      ]
    },
    {
      category: "Tools",
      items: [
        { name: "Git", logo: "/logos/git-original.svg", link: "https://git-scm.com/", color: "#F05032" },
        { name: "GitHub", logo: "/logos/github-original.svg", link: "https://github.com/", color: "#181717" },
        { name: "VSCode", logo: "/logos/vscode-original.svg", link: "https://code.visualstudio.com/", color: "#007ACC" },
        { name: "Figma", logo: "/logos/figma-original.svg", link: "https://figma.com/", color: "#F24E1E" },
        { name: "Canva", logo: "/logos/canva-original.svg", link: "https://canva.com/", color: "#00C4CC" },
        { name: "Notion", logo: "/logos/notion-original.svg", link: "https://notion.so/", color: "#000000" },
        { name: "Postman", logo: "/logos/postman.svg", link: "https://www.postman.com/", color: "#FF6C37" },
        { name: "Firebase", logo: "/logos/firebase-original.svg", link: "https://firebase.google.com/", color: "#FFCA28" }
      ]
    }
  ] as Skill[],

  projects: [
    {
      id: "emp",
      title: "Employment Website",
      description: "A comprehensive React application focused on user authentication, booking management, calendar integration, and interactive UI components.",
      technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      githubUrl: "https://github.com/NITHINKR06/emp",
      liveUrl: "",
      status: "completed"
    }
  ] as Project[],

  education: [
    {
      institution: "NMAM Institute of Technology Nitte",
      degree: "Computer Science(Cyber Security)",
      period: "2024-present",
      description: "Pursuing Master's in Cyber Security with a focus on Ethical Hacking and Network Security"
    },
    {
      institution: "SDM Institute of Technology Ujire",
      degree: "Computer Science and Engineering(Full Stack)",
      period: "2021-2024",
      description: "Specialized in Full Stack Development with a focus on modern web technologies"
    },
    {
      institution: "S.Manasa High School, Aldur",
      degree: "High School",
      period: "2021"
    }
  ] as Education[],

  experience: [
    {
      company: "Code lab systems Mangalore",
      position: "Full Stack Developer Intern",
      period: "2024",
      location: "Mangalore, IN",
      description: [
        "Led development of microservices architecture serving 1M+ users",
        "Implemented real-time features using WebSockets and Redis",
        "Mentored 3 junior developers and conducted code reviews",
        "Reduced application load time by 40% through optimization"
      ],
      technologies: ["Node.js", "React", "Redis", "PostgreSQL"],
      achievements: ["Optimized performance by 40%", "Improved developer onboarding"],
      responsibilities: ["Architecture design", "Feature development", "Code reviews"]
    },
    {
      company: "StartupXYZ",
      position: "Frontend Developer",
      period: "2022-2023", 
      description: [
        "Built responsive web applications using React and TypeScript",
        "Collaborated with designers to implement pixel-perfect UIs",
        "Integrated third-party APIs and payment systems",
        "Participated in agile development and sprint planning"
      ]
    }
  ] as Experience[],

  certifications: [
    {
      title: "Code Fury 8.0 - NL Hackathon",
      issuer: "University Visvesvaraya College of Engineering ( UVCE )",
      date: "Aug 2025",
      image: "/certificate/codefury.jpeg",
      location: "Online ",
      category: "competition",
      description: [
        "Thrilled to share that I participated in CodeFury 8.0! 🎉",
        "It was an amazing opportunity to explore my skills,",
        "collaborate, and learn in the field of technology."
      ],
      skills: ["CyberSecurity", "GenAI", "Flack", "Git"]
    },

    {
      title: "Hackfest '25 - Hackathon",
      issuer: "Finite Loop Club - NMAMIT Nitte",
      date: "Apr 2025",
      image: "/certificate/hackfest.jpeg",
      category: "competition",
      description: [
        "Validated knowledge of AWS services and architecture best practices.",
        "Designed and implemented scalable cloud solutions."
      ],
      skills: ["AWS", "Cloud Architecture", "Networking"]
    },

    {
      title: "PROJECT OMEGA 2025 - Hackathon",
      issuer: "YENEPOYA INSTITUTE OF TECHNOLOGY MANGALORE",
      date: "Apr 2025",
      image: "/certificate/omega1.jpeg",
      category: "competition",
      description: [
        ''
      ],
      skills: [""]
    },

    {
      title: "Systems and Usable Security - Course",
      issuer: "NPTEL ",
      date: "Apr 2025",
      image: "/certificate/nptel1.jpeg",
      category: "other",
      description: [
        "Happy to share that I have successfully completed the NPTEL course on Systems and Usable Security (Jan–Feb 2025).",
        "Grateful for the learning experience and excited to keep growing in the field of security."
      ],
      skills: ["System Security", "CyberSecurity ", "Networking"]
    },

    {
      title: "Microsoft Learn Workshop - Workshop",
      issuer: "NMAM Institute of Technology Nitte",
      date: "Mar 2025",
      image: "/certificate/javascript.jpeg",
      category: "other",
      description: [
        "Introduction to JavaScript DOM Basics (Hands-On), hosted by S Shyam Kumar. 💻✨",
        "It was a great experience to enhance my JavaScript skills and deepen my understanding of the DOM."
      ],
      skills: ["JavaScript", "Logic & Working", "WebDevelopment"]
    },

    {
      title: "Debug Your Soul 2.0",
      issuer: "CSI, Student Branch NMAMIT Nitte",
      date: "Aug 2024",
      image: "/certificate/debugus.jpeg",
      category: "competition",
      description: [
        ""
      ],
      skills: ["Logic", "Promblem Solving"]
    }
  ] as Certifications[]
};

export const terminalCommands = {
  help: {
    description: "Show available commands",
    usage: "help"
  },
  about: {
    description: "Display personal information",
    usage: "about"
  },
  skills: {
    description: "List technical skills",
    usage: "skills [category]"
  },
  projects: {
    description: "Show project portfolio",
    usage: "projects [project-id]"
  },
  education: {
    description: "Display education background",
    usage: "education"
  },
  experience: {
    description: "Show work experience",
    usage: "experience"
  },
  contact: {
    description: "Get contact information",
    usage: "contact"
  },
  clear: {
    description: "Clear terminal screen",
    usage: "clear"
  },
  whoami: {
    description: "Display current user",
    usage: "whoami"
  },
  ls: {
    description: "List available sections",
    usage: "ls"
  },
  cat: {
    description: "Display file contents",
    usage: "cat [filename]"
  },
  pwd: {
    description: "Print working directory",
    usage: "pwd"
  },
  social: {
    description: "Show social links (GitHub, LinkedIn)",
    usage: "social"
  }

};