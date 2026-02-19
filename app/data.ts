export const profile = {
  name: "Ayoub Nasraoui",
  tagline: "DevOps Engineer · Future System Architect",
  bio: "DevOps Engineer and software developer passionate about building scalable systems and reliable infrastructure. Currently pursuing a Master's degree in DevOps and Site Reliability Engineering, with hands-on experience in containerization, backend development, and cloud concepts. Curious, growth-driven, and focused on becoming a system architect while contributing to impactful and well-designed digital solutions.",
  location: "Monastir, Tunisia",
  degree: "MSc DevOps & SRE (in progress)",
  email: "ayoub.basraoui198@gmail.com",
  linkedin: "https://linkedin.com/in/ayoub-nasraoui-6b06b2236",
  github: "https://github.com/Ayoub-45",
  status: "Open to opportunities",
};

export const skillGroups = [
  {
    label: "DevOps & Cloud",
    skills: ["Docker", "Kubernetes", "CI/CD Pipelines", "GitHub Actions", "AWS EC2", "AWS S3", "Spot Instances"],
  },
  {
    label: "Programming & Scripting",
    skills: ["Python", "Bash", "Node.js", "Express.js"],
  },
  {
    label: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Redis"],
  },
  {
    label: "Systems & Architecture",
    skills: ["Linux Admin", "Microservices", "REST APIs", "Monitoring", "Automation", "Git & GitHub"],
  },
  {
    label: "Professional Skills",
    soft: true,
    skills: ["Problem-solving", "System Design", "Infrastructure Planning", "Team Collaboration", "Documentation", "Continuous Learning"],
  },
];

export const experiences = [
  {
    title: "DevOps & Cloud Automation Intern",
    company: "Mobelite Monastir",
    date: "Jan 2026 – Present",
    description: "Project: Auto-Doc – Hybrid Documentation Pipeline (Local + Cloud GenAI)",
    bullets: [
      "Built a hybrid pipeline for automated documentation of Full-Stack applications, combining local code analysis with cloud GenAI.",
      "Integrated the solution into CI/CD workflows to automatically update documentation alongside code changes.",
      "Ensured code confidentiality by processing sensitive data locally before cloud-side generation.",
      "Generated technical docs and deployment guides, improving knowledge sharing across engineering teams.",
      "Applied DevOps best practices including automation, version control, and secure infrastructure design.",
    ],
    tags: ["DevOps", "CI/CD", "Cloud", "GenAI", "Automation", "Technical Docs"],
  },
  {
    title: "DevOps & Software Intern",
    company: "DocStreamSolutions · Remote",
    date: "Jan 2024 – Jun 2024",
    description:
      "Contributed to the design and development of a medical clinic management platform, focusing on backend functionality and system architecture.",
    bullets: [
      "Assisted in the deployment and automation of application components using DevOps practices.",
      "Collaborated with engineers to improve workflow reliability, data handling, and software maintainability.",
    ],
    tags: ["Docker", "Kubernetes", "GitHub Actions", "PostgreSQL", "Node.js", "React", "Bash"],
  },
];

export const projects = [
  {
    icon: "🛒",
    title: "E-Commerce Microservices App",
    description:
      "A modular e-commerce system with separate services for users, products, and orders — built for scalability and independent deployment.",
    features: [
      "Decoupled microservice architecture (users, products, orders)",
      "RESTful inter-service communication",
      "Containerized with Docker for consistent environments",
    ],
    stack: ["Node.js", "Express", "MongoDB", "Docker", "REST APIs", "Git"],
    link: null,
  },
  {
    icon: "🔔",
    title: "Real-Time Notification System",
    description:
      "A scalable real-time notification system using Redis Pub/Sub with priority-based message delivery, filtering, and automatic expiration.",
    features: [
      "High / Medium / Low priority message categorization",
      "Keyword and priority-based subscriber filtering",
      "Auto-expiration via Redis TTL (24h) + 100-msg channel history",
      "Fully containerized and production-ready design",
    ],
    stack: ["Python", "Redis", "Pub/Sub", "Docker"],
    link: null,
  },
  {
    icon: "📄",
    title: "Auto-Doc Pipeline",
    description:
      "Hybrid CI/CD-integrated documentation pipeline that combines local code analysis with cloud GenAI to auto-generate and update technical docs.",
    features: [
      "Secure local pre-processing to protect sensitive code",
      "Automated docs updated on every code push",
      "Generates deployment guides + architecture docs",
    ],
    stack: ["CI/CD", "GenAI", "Python", "Cloud", "Automation"],
    link: null,
  },
];
export const resume = {
  summary:
    "Junior DevOps and Site Reliability Engineer with a strong software engineering background and hands-on experience operating production-like systems through internships and real-world projects. Skilled in automation, CI/CD pipelines, cloud infrastructure, containerization, and observability. Passionate about building scalable, secure, and reliable systems, applying SRE principles such as monitoring, performance optimization, and reliability-driven design.",

  education: [
    {
      degree: "Master's Degree – DevOps & Site Reliability Engineering",
      school: "School of Digital Technologies",
      date: "Expected June 2026",
    },
    {
      degree: "Bachelor's Degree – Software Engineering",
      school: "University of Monastir",
      date: "2024",
    },
  ],

  skills: [
    {
      label: "Cloud & DevOps",
      items: ["AWS", "Docker", "Kubernetes", "Terraform", "Ansible", "GitHub Actions", "IaC"],
    },
    {
      label: "Backend & Databases",
      items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis"],
    },
    {
      label: "Monitoring & Observability",
      items: ["Prometheus", "Grafana"],
    },
    {
      label: "Programming",
      items: ["JavaScript", "Python"],
    },
    {
      label: "Systems",
      items: ["Linux", "HTTP", "TCP/IP", "DNS"],
    },
  ],

  experience: [
    {
      title: "DevOps & Software Engineering Intern",
      company: "DocStreamSolutions",
      date: "2024",
      bullets: [
        "Contributed to backend development and system architecture for a medical clinic management platform.",
        "Participated in CI/CD automation and deployment workflows to improve release reliability.",
        "Supported containerized application deployments and system stability.",
        "Collaborated with cross-functional teams to enhance data handling and workflow reliability.",
      ],
    },
    {
      title: "Junior DevOps Engineer",
      company: "Academic & Personal Projects",
      date: "2024 – 2025",
      bullets: [
        "Automated infrastructure provisioning using Terraform and Ansible.",
        "Containerized applications with Docker and supported Kubernetes deployments.",
        "Implemented monitoring dashboards using Prometheus and Grafana.",
        "Applied DevOps and SRE best practices with scalability and reliability in mind.",
      ],
    },
  ],

  projects: [
    {
      name: "Real-Time Notification System",
      stack: "Python, Redis",
      bullets: [
        "Built a real-time notification system using Redis Pub/Sub.",
        "Implemented priority-based message handling and TTL-based cleanup.",
      ],
    },
    {
      name: "Task Manager API",
      stack: "Node.js, PostgreSQL, Redis",
      bullets: [
        "Developed a RESTful API with authentication and caching.",
        "Improved API response time by approximately 40%.",
      ],
    },
    {
      name: "CI/CD Automation",
      stack: "GitHub Actions, Docker",
      bullets: [
        "Designed CI/CD pipelines and automated build, test, and deployment workflows.",
      ],
    },
  ],

  languages: [
    { lang: "Arabic", level: "Native" },
    { lang: "English", level: "Fluent – B2" },
    { lang: "French", level: "Intermediate" },
    { lang: "German", level: "Beginner" },
  ],

  softSkills: [
    "Problem-solving",
    "Analytical thinking",
    "Ownership mindset",
    "Leadership",
    "Resilience",
    "Communication",
    "Teamwork",
  ],

  interests: [
    "Cloud Architecture",
    "DevOps Automation",
    "Site Reliability Engineering",
    "Entrepreneurship",
    "Writing",
    "Psychology",
  ],
};