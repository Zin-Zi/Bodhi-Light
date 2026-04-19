// local wisdom data for offline use
const DHARMA_QUOTES = [
  "Better than a thousand hollow words, is one word that brings peace.",
  "The mind is everything. What you think you become.",
  "To conquer oneself is a greater task than conquering others.",
  "No one saves us but ourselves. No one can and no one may. We ourselves must walk the path.",
  "Peace comes from within. Do not seek it without.",
  "A disciplined mind brings happiness.",
  "Just as a candle cannot burn without fire, men cannot live without a spiritual life.",
  "The way is not in the sky. The way is in the heart.",
  "However many holy words you read, however many you speak, what good will they do you if you do not act on them?",
  "Work out your own salvation. Do not depend on others."
];

export const WISDOM_SEEDS = [
  "How to deal with anger?",
  "How to watch the breath?",
  "What is the cause of suffering?",
  "Who was the Buddha?",
  "How to stop overthinking?",
  "What is Anicca (Impermanence)?"
];

export interface SanghaResponse {
  answer: string;
  followUps: string[];
}

export async function askSangha(question: string): Promise<SanghaResponse> {
  // Offline mock: provide a relevant-looking response or a random quote
  await new Promise(resolve => setTimeout(resolve, 600)); // Simulate reflection
  
  const q = question.toLowerCase();
  
  // Categorized Wisdom
  const mappings = [
    {
      keys: ["breath", "meditat", "concentration", "calm"],
      resp: "To tame the mind, begin with the breath. Sit upright but relaxed. Close your eyes. Notice each inhalation and exhalation at the rim of your nostrils. When thoughts arise, do not fight them—simply acknowledge them and return to the breath. This is the practice of Anapanasati.",
      follows: ["How to deal with distractions?", "How long should I sit?", "What is Samadhi?"]
    },
    {
      keys: ["anger", "hate", "unhappy", "angry", "irritated"],
      resp: "Anger is an ember you hold in your hand. To control it, investigate its origin. Usually, it stems from a desire for things to be different than they are. Soften your heart with Metta (Loving-kindness). Start by wishing yourself well, then gradually extend that wish to those who irritate you.",
      follows: ["What is Metta?", "How to forgive someone?", "Is anger ever useful?"]
    },
    {
      keys: ["suffering", "pain", "sad", "dukkha", "hardship"],
      resp: "The Buddha taught the Four Noble Truths: Suffering exists, it has a cause (craving/attachment), it can end, and there is a path to its end. By understanding that all things are temporary, we reduce our attachment to outcomes, which in turn reduces our suffering.",
      follows: ["What is Craving?", "The Eightfold Path", "The Four Noble Truths"]
    },
    {
      keys: ["overthink", "busy mind", "monkey", "anxious", "anxiety"],
      resp: "The mind is like a monkey jumping from branch to branch. Do not try to tie the monkey down with force. Instead, give the monkey a single task: observing the present moment. Focus on your five senses—what do you hear right now? What do you feel? Ground yourself in 'now'.",
      follows: ["The 5 Senses Practice", "Dealing with the future", "Letting go of thoughts"]
    },
    {
      keys: ["impermanence", "anicca", "change", "dying", "lost"],
      resp: "Anicca is the truth that all conditioned things are in constant flux. Like a river that flows, you never step in the same water twice. When we accept that everything—joy, sorrow, and life itself—must change, we find a peace that no external event can shake.",
      follows: ["Accepting change", "What is Non-Self?", "The nature of joy"]
    },
    {
      keys: ["who are you", "sangha", "buddha", "philosophy"],
      resp: "I am a digital reflection of the Sangha—the community of practitioners. My words are drawn from the Suttas and the Dhammapada to help you find your own inner Buddha.",
      follows: ["Tell me a story", "Basic teachings", "Where to start?"]
    }
  ];

  for (const mapping of mappings) {
    if (mapping.keys.some(key => q.includes(key))) {
      return { answer: mapping.resp, followUps: mapping.follows };
    }
  }

  // Fallback to random quote
  return { 
    answer: DHARMA_QUOTES[Math.floor(Math.random() * DHARMA_QUOTES.length)],
    followUps: ["Tell me more", "Another quote", "Talk about breath"]
  };
}
