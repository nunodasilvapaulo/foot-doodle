export interface QuizQuestion {
  question: string
  options: string[]
  answerIndex: number
  category: string
}

export const QUESTIONS: QuizQuestion[] = [
  { question: "Which club has won the most UEFA Champions League titles?", options: ["Barcelona", "Real Madrid", "AC Milan", "Bayern Munich"], answerIndex: 1, category: "History" },
  { question: "Who scored the 'Hand of God' goal?", options: ["Pelé", "Ronaldo", "Diego Maradona", "Zidane"], answerIndex: 2, category: "History" },
  { question: "Which country won the 2022 FIFA World Cup?", options: ["France", "Brazil", "Argentina", "Germany"], answerIndex: 2, category: "World Cup" },
  { question: "Which player has won the most Ballon d'Or awards (as of 2024)?", options: ["Cristiano Ronaldo", "Lionel Messi", "Zinedine Zidane", "Ronaldinho"], answerIndex: 1, category: "Awards" },
  { question: "In what year was the Premier League founded?", options: ["1888", "1992", "1985", "2000"], answerIndex: 1, category: "History" },
  { question: "Which Italian club is known as 'The Old Lady'?", options: ["AC Milan", "Inter Milan", "Roma", "Juventus"], answerIndex: 3, category: "Clubs" },
  { question: "How many players are on a standard football team?", options: ["9", "10", "11", "12"], answerIndex: 2, category: "Rules" },
  { question: "Which nation invented the game of football (soccer)?", options: ["Brazil", "Italy", "England", "Germany"], answerIndex: 2, category: "History" },
  { question: "Who holds the record for most goals in a single World Cup?", options: ["Pelé", "Just Fontaine", "Messi", "Ronaldo"], answerIndex: 1, category: "World Cup" },
  { question: "Which stadium is known as the 'Theatre of Dreams'?", options: ["Anfield", "Camp Nou", "Old Trafford", "Bernabéu"], answerIndex: 2, category: "Clubs" },
  { question: "Which country has won the most World Cup titles?", options: ["Germany", "Argentina", "Italy", "Brazil"], answerIndex: 3, category: "World Cup" },
  { question: "What is the maximum number of substitutes allowed in a standard match?", options: ["3", "4", "5", "6"], answerIndex: 2, category: "Rules" },
  { question: "Which player won the Golden Boot at the 2018 World Cup?", options: ["Kylian Mbappé", "Harry Kane", "Antoine Griezmann", "Romelu Lukaku"], answerIndex: 1, category: "World Cup" },
  { question: "Which club plays at the Santiago Bernabéu?", options: ["Atletico Madrid", "Real Madrid", "Valencia", "Sevilla"], answerIndex: 1, category: "Clubs" },
  { question: "Who is the all-time top scorer in Champions League history?", options: ["Messi", "Lewandowski", "Raúl", "Cristiano Ronaldo"], answerIndex: 3, category: "UCL" },
  { question: "Which year did France win their first World Cup?", options: ["1994", "1998", "2002", "2006"], answerIndex: 1, category: "World Cup" },
  { question: "What does 'VAR' stand for?", options: ["Video Assistant Referee", "Visual Accuracy Review", "Video Analysis Recording", "Virtual Assistant Referee"], answerIndex: 0, category: "Rules" },
  { question: "Which club did Zinedine Zidane famously headbutt Marco Materazzi for in the 2006 World Cup Final?", options: ["France vs Argentina", "France vs Italy", "France vs Brazil", "France vs Germany"], answerIndex: 1, category: "World Cup" },
  { question: "Who managed Manchester United to Champions League glory in 1999?", options: ["José Mourinho", "Alex Ferguson", "Ron Atkinson", "Matt Busby"], answerIndex: 1, category: "Managers" },
  { question: "Which club won the first ever Premier League title?", options: ["Arsenal", "Manchester United", "Liverpool", "Blackburn Rovers"], answerIndex: 1, category: "History" },
]
