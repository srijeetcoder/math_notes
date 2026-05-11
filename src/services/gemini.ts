export interface QuizQuestion {
  id: number;
  topic: string;
  difficulty: string;
  type: string;
  question: string;
  options?: string[];
  answer: string;
  solution: string[];
}

export interface QuizResultData {
  id?: string;
  createdAt?: number;
  title: string;
  questions: QuizQuestion[];
}

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function generateQuiz(
  topic: string,
  difficulty: string,
  count: number,
  questionType: string
): Promise<QuizResultData> {
  if (!GEMINI_API_KEY) {
    throw new Error('VITE_GEMINI_API_KEY is missing. Please set it in your .env file.');
  }

  const prompt = `
You are a BSM201 Probability and Statistics CA3 exam question generator for MAKAUT first year engineering students.

Generate unique exam style questions only from these topics:
Basic probability, conditional probability, Bayes theorem, PMF, PDF, CDF, expectation, variance, binomial distribution, correlation coefficient, regression lines, Spearman rank correlation.

Difficulty: ${difficulty}
Topic: ${topic}
Number of questions: ${count}
Question type: ${questionType}

Rules:
- Do not repeat common textbook examples exactly.
- Use clear numerical data.
- Use simple exam language.
- Include formulas where needed using LaTeX notation. YOU MUST WRAP ALL MATH FORMULAS IN $ FOR INLINE MATH OR $$ FOR BLOCK MATH. IMPORTANT: DO NOT wrap regular English text in $. Only wrap actual mathematical symbols, equations, and numbers. For example, write "The value is $BSLASHalpha$" instead of "$The value is BSLASHalpha$".
- CRITICAL JSON ESCAPING RULE: DO NOT use the backslash character (\\) anywhere in your LaTeX formulas or text. Instead, use the word BSLASH. For example, write BSLASHfrac{1}{2} instead of \\frac{1}{2}, and BSLASHsum instead of \\sum. This is mandatory to prevent JSON parsing errors.
- For every answer, show step by step solution.
- For MCQ, give 4 options and mention the correct option exactly as it appears in the options list.
- For short answer, give final answer clearly.
- Keep the level suitable for BSM201 CA3.

Return JSON EXACTLY in this format, with no markdown code blocks around it:
{
  "title": "Quiz title",
  "questions": [
    {
      "id": 1,
      "topic": "Topic name",
      "difficulty": "Difficulty",
      "type": "MCQ or Short Answer",
      "question": "Question text with math BSLASHalpha",
      "options": ["A", "B", "C", "D"],
      "answer": "Correct answer",
      "solution": ["Step 1", "Step 2", "Step 3"]
    }
  ]
}
`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.7,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const textResponse = data.candidates[0].content.parts[0].text;
    
    // Parse the JSON. The responseMimeType ensures we get raw JSON, but we'll trim just in case.
    let cleanJson = textResponse.trim().replace(/^\s*```json/i, '').replace(/```\s*$/i, '');
    
    // Replace the placeholder BSLASH with double backslash so JSON.parse resolves it to a single backslash
    // This safely avoids all JSON parsing errors with LaTeX
    cleanJson = cleanJson.replace(/BSLASH/g, '\\\\');

    return JSON.parse(cleanJson) as QuizResultData;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
}
