// src/utils/data-lesson.ts
export const lessons = [
  // Unit 1: Basic Vocabulary
  {
    id: 1,
    title: "Greetings Video",
    lessonType: "VIDEO",
    challenges: [],
    videoUrl: "dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Greetings",
    lessonType: "QUIZ",
    challenges: [
      {
        id: 1,
        question: "How do you say 'hello' in English?",
        challengeOptions: [
          { id: 1, challengeId: 1, text: "Hello", correct: true },
          { id: 2, challengeId: 1, text: "Goodbye", correct: false },
          { id: 3, challengeId: 1, text: "Thanks", correct: false },
          { id: 4, challengeId: 1, text: "Please", correct: false },
        ],
      },
      {
        id: 2,
        question: "What does 'goodbye' mean?",
        challengeOptions: [
          { id: 5, challengeId: 2, text: "Greeting", correct: false },
          { id: 6, challengeId: 2, text: "Farewell", correct: true },
          { id: 7, challengeId: 2, text: "Question", correct: false },
          { id: 8, challengeId: 2, text: "Answer", correct: false },
        ],
      },
    ],
    videoUrl: null,
  },
  {
    id: 3,
    title: "Numbers",
    lessonType: "QUIZ",
    challenges: [
      {
        id: 3,
        question: "What is the English word for 'dua'?",
        challengeOptions: [
          { id: 9, challengeId: 3, text: "One", correct: false },
          { id: 10, challengeId: 3, text: "Two", correct: true },
          { id: 11, challengeId: 3, text: "Three", correct: false },
          { id: 12, challengeId: 3, text: "Four", correct: false },
        ],
      },
      {
        id: 4,
        question: "What is 'five' in Indonesian?",
        challengeOptions: [
          { id: 13, challengeId: 4, text: "Lima", correct: true },
          { id: 14, challengeId: 4, text: "Empat", correct: false },
          { id: 15, challengeId: 4, text: "Tiga", correct: false },
          { id: 16, challengeId: 4, text: "Enam", correct: false },
        ],
      },
    ],
    videoUrl: null,
  },
  {
    id: 4,
    title: "Common Objects",
    lessonType: "QUIZ",
    challenges: [
      {
        id: 5,
        question: "Which one is a 'book'?",
        challengeOptions: [
          { id: 17, challengeId: 5, text: "Book", correct: true },
          { id: 18, challengeId: 5, text: "Pen", correct: false },
          { id: 19, challengeId: 5, text: "Table", correct: false },
          { id: 20, challengeId: 5, text: "Chair", correct: false },
        ],
      },
      {
        id: 6,
        question: "What is 'pencil' in English?",
        challengeOptions: [
          { id: 21, challengeId: 6, text: "Pencil", correct: true },
          { id: 22, challengeId: 6, text: "Eraser", correct: false },
          { id: 23, challengeId: 6, text: "Ruler", correct: false },
          { id: 24, challengeId: 6, text: "Sharpener", correct: false },
        ],
      },
    ],
    videoUrl: null,
  },

  // Unit 2: Grammar Fundamentals
  {
    id: 5,
    title: "Present Tense Video",
    lessonType: "VIDEO",
    challenges: [],
    videoUrl: "3JZ_D3ELwOQ",
  },
  {
    id: 6,
    title: "Present Tense",
    lessonType: "QUIZ",
    challenges: [
      {
        id: 7,
        question: "Which sentence is in present tense?",
        challengeOptions: [
          { id: 25, challengeId: 7, text: "I eat breakfast.", correct: true },
          { id: 26, challengeId: 7, text: "I ate breakfast.", correct: false },
          {
            id: 27,
            challengeId: 7,
            text: "I will eat breakfast.",
            correct: false,
          },
          {
            id: 28,
            challengeId: 7,
            text: "I was eating breakfast.",
            correct: false,
          },
        ],
      },
      {
        id: 8,
        question: "Choose the correct present tense verb.",
        challengeOptions: [
          { id: 29, challengeId: 8, text: "Runs", correct: true },
          { id: 30, challengeId: 8, text: "Ran", correct: false },
          { id: 31, challengeId: 8, text: "Will run", correct: false },
          { id: 32, challengeId: 8, text: "Running", correct: false },
        ],
      },
    ],
    videoUrl: null,
  },
  {
    id: 7,
    title: "Pronouns",
    lessonType: "QUIZ",
    challenges: [
      {
        id: 9,
        question: "Which is a subject pronoun?",
        challengeOptions: [
          { id: 33, challengeId: 9, text: "He", correct: true },
          { id: 34, challengeId: 9, text: "Him", correct: false },
          { id: 35, challengeId: 9, text: "His", correct: false },
          { id: 36, challengeId: 9, text: "Hers", correct: false },
        ],
      },
      {
        id: 10,
        question: "Which is an object pronoun?",
        challengeOptions: [
          { id: 37, challengeId: 10, text: "Me", correct: true },
          { id: 38, challengeId: 10, text: "I", correct: false },
          { id: 39, challengeId: 10, text: "My", correct: false },
          { id: 40, challengeId: 10, text: "Mine", correct: false },
        ],
      },
    ],
    videoUrl: null,
  },
  {
    id: 8,
    title: "Articles",
    lessonType: "QUIZ",
    challenges: [
      {
        id: 11,
        question: "Which is an indefinite article?",
        challengeOptions: [
          { id: 41, challengeId: 11, text: "A", correct: true },
          { id: 42, challengeId: 11, text: "The", correct: false },
          { id: 43, challengeId: 11, text: "This", correct: false },
          { id: 44, challengeId: 11, text: "That", correct: false },
        ],
      },
      {
        id: 12,
        question: "Which is a definite article?",
        challengeOptions: [
          { id: 45, challengeId: 12, text: "The", correct: true },
          { id: 46, challengeId: 12, text: "A", correct: false },
          { id: 47, challengeId: 12, text: "An", correct: false },
          { id: 48, challengeId: 12, text: "Some", correct: false },
        ],
      },
    ],
    videoUrl: null,
  },

  // Unit 3: Conversation Skills
  {
    id: 9,
    title: "Introducing Yourself Video",
    lessonType: "VIDEO",
    challenges: [],
    videoUrl: "M7lc1UVf-VE",
  },
  {
    id: 10,
    title: "Introducing Yourself",
    lessonType: "QUIZ",
    challenges: [
      {
        id: 13,
        question: "How do you introduce yourself?",
        challengeOptions: [
          { id: 49, challengeId: 13, text: "My name is...", correct: true },
          { id: 50, challengeId: 13, text: "How are you?", correct: false },
          { id: 51, challengeId: 13, text: "Goodbye!", correct: false },
          { id: 52, challengeId: 13, text: "Thank you!", correct: false },
        ],
      },
      {
        id: 14,
        question: "What do you say after meeting someone?",
        challengeOptions: [
          { id: 53, challengeId: 14, text: "Nice to meet you", correct: true },
          { id: 54, challengeId: 14, text: "See you", correct: false },
          { id: 55, challengeId: 14, text: "Sorry", correct: false },
          { id: 56, challengeId: 14, text: "Please", correct: false },
        ],
      },
    ],
    videoUrl: null,
  },
  {
    id: 11,
    title: "Asking for Directions",
    lessonType: "QUIZ",
    challenges: [
      {
        id: 15,
        question: "How do you ask for directions?",
        challengeOptions: [
          {
            id: 57,
            challengeId: 15,
            text: "Where is the bank?",
            correct: true,
          },
          { id: 58, challengeId: 15, text: "What time is it?", correct: false },
          { id: 59, challengeId: 15, text: "How old are you?", correct: false },
          {
            id: 60,
            challengeId: 15,
            text: "What's your name?",
            correct: false,
          },
        ],
      },
      {
        id: 16,
        question: "How do you thank someone for directions?",
        challengeOptions: [
          { id: 61, challengeId: 16, text: "Thank you!", correct: true },
          { id: 62, challengeId: 16, text: "Sorry", correct: false },
          { id: 63, challengeId: 16, text: "Please", correct: false },
          { id: 64, challengeId: 16, text: "Excuse me", correct: false },
        ],
      },
    ],
    videoUrl: null,
  },

  // Unit 4: Listening Practice (Video lessons)
  {
    id: 12,
    title: "Daily Conversations Video",
    lessonType: "VIDEO",
    challenges: [],
    videoUrl: "E7wJTI-1dvQ",
  },
  {
    id: 13,
    title: "Daily Conversations",
    lessonType: "VIDEO",
    challenges: [],
    videoUrl: "dQw4w9WgXcQ",
  },
  {
    id: 14,
    title: "News Listening",
    lessonType: "VIDEO",
    challenges: [],
    videoUrl: "3JZ_D3ELwOQ",
  },
];
