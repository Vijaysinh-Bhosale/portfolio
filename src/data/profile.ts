import type { Profile } from '../types';

export const profileData: Profile = {
  name: 'Vijay Bhosale',
  brandTitle: 'VIJAY.B — Data, Intelligence & Engineering',
  primaryHeadline: 'Engineering Intelligence from Data.',
  professionalTitle: 'Computer Engineering Graduate | Aspiring Data Scientist & ML Engineer',
  shortIntro:
    "I'm a Computer Engineering graduate who enjoys turning raw data into meaningful insights and building intelligent applications that solve practical problems.",
  education: {
    degree: 'B.Tech in Computer Engineering',
    institution: 'Dr. Babasaheb Ambedkar Technological University (DBATU)',
    location: 'Lonere, Maharashtra, India',
    period: '2022 – 2026',
    cgpa: '7.24',
    coursework: [
      'Data Structures & Algorithms',
      'Database Management Systems',
      'Operating Systems',
      'Computer Networks',
      'Object-Oriented Programming',
      'Machine Learning & Applied Statistics',
    ],
  },
  location: 'Maharashtra, India',
  availability: 'Open to Entry-Level Opportunities',
  targetRoles: [
    'Data Analyst',
    'Data Engineer',
    'Data Scientist',
    'Machine Learning Engineer',
    'AI/ML Developer',
    'Entry-level Python Developer',
  ],
  contact: {
    email: 'vijaybhosale1932@gmail.com',
    github: 'https://github.com/Vijaysinh-Bhosale',
    linkedin: 'https://www.linkedin.com/in/vijaysinh-bhosale/',
    resumeUrl: '/resume.pdf',
  },
  principles: [
    {
      number: '01',
      title: 'Analyze before assuming.',
      description:
        'Understand the structure, quality, and anomalies of data prior to training models or architecting pipelines.',
    },
    {
      number: '02',
      title: 'Build to solve real problems.',
      description:
        'Focus on real-world utility and practical value rather than unnecessary architectural complexity.',
    },
    {
      number: '03',
      title: 'Improve through experimentation.',
      description:
        'Iterate systematically on feature engineering, validation benchmarks, and model error analysis.',
    },
  ],
};
