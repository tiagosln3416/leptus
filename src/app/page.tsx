"use client"

import { useState, useEffect } from "react"
import { 
  BookOpen, 
  Brain, 
  CheckCircle2, 
  Trophy, 
  Users, 
  Lightbulb, 
  Play, 
  Lock,
  Sparkles,
  TrendingUp,
  MessageSquare,
  Star,
  Award,
  ChevronRight,
  Home,
  Target
} from "lucide-react"

// Types
interface UserProgress {
  completedModules: number[]
  quizScores: { [key: number]: number }
  totalPoints: number
  lastAccess: string
}

interface Module {
  id: number
  title: string
  description: string
  duration: string
  videoUrl: string
  content: string[]
  locked: boolean
}

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
}

interface Tool {
  name: string
  description: string
  category: string
  link: string
}

interface CommunityPost {
  id: number
  author: string
  avatar: string
  content: string
  likes: number
  replies: number
  timestamp: string
}

export default function AIMoneyApp() {
  const [activeTab, setActiveTab] = useState<"home" | "modules" | "quiz" | "resources" | "community">("home")
  const [selectedModule, setSelectedModule] = useState<number | null>(null)
  const [quizActive, setQuizActive] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizScore, setQuizScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  
  // User Progress State
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedModules: [],
    quizScores: {},
    totalPoints: 0,
    lastAccess: new Date().toISOString()
  })

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("aiMoneyAppProgress")
    if (saved) {
      setUserProgress(JSON.parse(saved))
    }
  }, [])

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem("aiMoneyAppProgress", JSON.stringify(userProgress))
  }, [userProgress])

  // Modules Data
  const modules: Module[] = [
    {
      id: 1,
      title: "Introdução à IA e Monetização",
      description: "Descubra o potencial da IA para gerar renda e as principais oportunidades do mercado",
      duration: "15 min",
      videoUrl: "https://www.youtube.com/embed/example1",
      content: [
        "O que é Inteligência Artificial e como ela está transformando o mercado",
        "Principais áreas de monetização com IA: criação de conteúdo, automação, consultoria",
        "Cases de sucesso: pessoas que já estão lucrando com IA",
        "Mindset necessário para aproveitar as oportunidades"
      ],
      locked: false
    },
    {
      id: 2,
      title: "Criação de Conteúdo com IA",
      description: "Aprenda a usar IA para criar textos, imagens e vídeos que geram receita",
      duration: "20 min",
      videoUrl: "https://www.youtube.com/embed/example2",
      content: [
        "Ferramentas de IA para criação de textos: ChatGPT, Claude, Jasper",
        "Geração de imagens com Midjourney, DALL-E e Stable Diffusion",
        "Como vender conteúdo criado com IA: e-books, posts, designs",
        "Estratégias para escalar sua produção de conteúdo"
      ],
      locked: userProgress.completedModules.length < 1
    },
    {
      id: 3,
      title: "Automação de Negócios com IA",
      description: "Automatize processos e ofereça serviços de automação para empresas",
      duration: "25 min",
      videoUrl: "https://www.youtube.com/embed/example3",
      content: [
        "Automação de atendimento ao cliente com chatbots",
        "Ferramentas no-code para criar automações: Make, Zapier, n8n",
        "Como vender serviços de automação para empresas",
        "Precificação e modelos de negócio recorrente"
      ],
      locked: userProgress.completedModules.length < 2
    },
    {
      id: 4,
      title: "Consultoria e Treinamento em IA",
      description: "Torne-se um especialista e ensine outros a usar IA",
      duration: "18 min",
      videoUrl: "https://www.youtube.com/embed/example4",
      content: [
        "Como se posicionar como especialista em IA",
        "Criando cursos e mentorias sobre IA",
        "Plataformas para vender conhecimento: Hotmart, Udemy, Kiwify",
        "Marketing digital para atrair alunos"
      ],
      locked: userProgress.completedModules.length < 3
    },
    {
      id: 5,
      title: "Desenvolvimento de Produtos com IA",
      description: "Crie e venda produtos digitais potencializados por IA",
      duration: "30 min",
      videoUrl: "https://www.youtube.com/embed/example5",
      content: [
        "Ideias de produtos digitais com IA: templates, ferramentas, apps",
        "Como validar sua ideia antes de investir tempo",
        "Plataformas para vender produtos digitais",
        "Estratégias de lançamento e crescimento"
      ],
      locked: userProgress.completedModules.length < 4
    }
  ]

  // Quiz Questions
  const quizQuestions: QuizQuestion[] = [
    {
      question: "Qual é a principal vantagem de usar IA para criação de conteúdo?",
      options: [
        "Substituir completamente o trabalho humano",
        "Aumentar a velocidade e escala de produção",
        "Eliminar a necessidade de criatividade",
        "Reduzir custos a zero"
      ],
      correctAnswer: 1
    },
    {
      question: "Qual ferramenta é mais indicada para automação de processos sem código?",
      options: [
        "Python",
        "Java",
        "Make (Integromat)",
        "C++"
      ],
      correctAnswer: 2
    },
    {
      question: "Qual é o melhor modelo de precificação para serviços de automação?",
      options: [
        "Pagamento único baixo",
        "Modelo recorrente (mensalidade)",
        "Trabalho voluntário",
        "Apenas comissões"
      ],
      correctAnswer: 1
    },
    {
      question: "Para se tornar consultor em IA, o que é mais importante?",
      options: [
        "Ter diploma em ciência da computação",
        "Conhecimento prático e capacidade de ensinar",
        "Trabalhar em uma grande empresa",
        "Ter mais de 10 anos de experiência"
      ],
      correctAnswer: 1
    },
    {
      question: "Qual é o primeiro passo para criar um produto digital com IA?",
      options: [
        "Investir muito dinheiro em desenvolvimento",
        "Validar a ideia com potenciais clientes",
        "Criar um site complexo",
        "Contratar uma equipe grande"
      ],
      correctAnswer: 1
    }
  ]

  // Tools and Resources
  const tools: Tool[] = [
    { name: "ChatGPT", description: "IA conversacional para textos e ideias", category: "Criação de Conteúdo", link: "https://chat.openai.com" },
    { name: "Midjourney", description: "Geração de imagens com IA", category: "Criação de Conteúdo", link: "https://midjourney.com" },
    { name: "Make", description: "Automação visual sem código", category: "Automação", link: "https://make.com" },
    { name: "Zapier", description: "Conecte apps e automatize workflows", category: "Automação", link: "https://zapier.com" },
    { name: "Notion AI", description: "Produtividade e organização com IA", category: "Produtividade", link: "https://notion.so" },
    { name: "Canva AI", description: "Design gráfico facilitado por IA", category: "Criação de Conteúdo", link: "https://canva.com" },
    { name: "Descript", description: "Edição de vídeo e áudio com IA", category: "Criação de Conteúdo", link: "https://descript.com" },
    { name: "Copy.ai", description: "Copywriting com inteligência artificial", category: "Criação de Conteúdo", link: "https://copy.ai" }
  ]

  // Community Posts
  const communityPosts: CommunityPost[] = [
    {
      id: 1,
      author: "Maria Silva",
      avatar: "MS",
      content: "Acabei de fechar meu primeiro cliente de automação! Usei o Make para criar um chatbot de atendimento. Faturei R$ 2.500 no projeto + R$ 500/mês de manutenção. Obrigada pelo curso! 🚀",
      likes: 124,
      replies: 18,
      timestamp: "há 2 horas"
    },
    {
      id: 2,
      author: "João Pedro",
      avatar: "JP",
      content: "Dica: Comecei oferecendo serviços de criação de conteúdo com IA de graça para 3 empresas locais. Depois de 1 mês, todas viraram clientes pagantes. Portfólio é tudo!",
      likes: 89,
      replies: 12,
      timestamp: "há 5 horas"
    },
    {
      id: 3,
      author: "Ana Costa",
      avatar: "AC",
      content: "Alguém já tentou vender templates de prompts? Estou pensando em criar um pacote para Instagram. Vale a pena?",
      likes: 45,
      replies: 23,
      timestamp: "há 1 dia"
    },
    {
      id: 4,
      author: "Carlos Mendes",
      avatar: "CM",
      content: "Minha jornada: Mês 1 - R$ 0 | Mês 2 - R$ 800 | Mês 3 - R$ 3.200 | Mês 4 - R$ 7.500. Foco em consultoria para pequenas empresas. A chave é nicho específico!",
      likes: 201,
      replies: 34,
      timestamp: "há 2 dias"
    }
  ]

  // Functions
  const completeModule = (moduleId: number) => {
    if (!userProgress.completedModules.includes(moduleId)) {
      setUserProgress(prev => ({
        ...prev,
        completedModules: [...prev.completedModules, moduleId],
        totalPoints: prev.totalPoints + 100
      }))
    }
    setSelectedModule(null)
  }

  const startQuiz = () => {
    setQuizActive(true)
    setCurrentQuestion(0)
    setQuizScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setQuizScore(prev => prev + 1)
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
    } else {
      const finalScore = selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? quizScore + 1 : quizScore
      setUserProgress(prev => ({
        ...prev,
        quizScores: { ...prev.quizScores, [Date.now()]: finalScore },
        totalPoints: prev.totalPoints + (finalScore * 20)
      }))
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    setQuizActive(false)
    setCurrentQuestion(0)
    setQuizScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
  }

  // Render Functions
  const renderHome = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 p-8 md:p-12 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">Aprenda a Monetizar com IA</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Transforme IA em Renda Real
          </h1>
          <p className="text-lg md:text-xl mb-6 text-white/90 max-w-2xl">
            Descubra estratégias práticas e comprovadas para ganhar dinheiro usando inteligência artificial. Do zero ao primeiro cliente.
          </p>
          <button 
            onClick={() => setActiveTab("modules")}
            className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl flex items-center gap-2"
          >
            Começar Agora <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
          <Trophy className="w-10 h-10 mb-3" />
          <div className="text-3xl font-bold mb-1">{userProgress.totalPoints}</div>
          <div className="text-sm text-white/80">Pontos Conquistados</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
          <CheckCircle2 className="w-10 h-10 mb-3" />
          <div className="text-3xl font-bold mb-1">{userProgress.completedModules.length}/{modules.length}</div>
          <div className="text-sm text-white/80">Módulos Completos</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white">
          <TrendingUp className="w-10 h-10 mb-3" />
          <div className="text-3xl font-bold mb-1">{Object.keys(userProgress.quizScores).length}</div>
          <div className="text-sm text-white/80">Quizzes Realizados</div>
        </div>
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Acesso Rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setActiveTab("modules")}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-left hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 group"
          >
            <BookOpen className="w-12 h-12 mb-3 text-purple-500 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Módulos de Aprendizado</h3>
            <p className="text-gray-600 dark:text-gray-400">Conteúdo estruturado com vídeos e textos explicativos</p>
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-left hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-pink-500 group"
          >
            <Brain className="w-12 h-12 mb-3 text-pink-500 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Quiz Interativo</h3>
            <p className="text-gray-600 dark:text-gray-400">Teste seus conhecimentos e ganhe pontos</p>
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-left hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 group"
          >
            <Lightbulb className="w-12 h-12 mb-3 text-orange-500 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Recursos e Ferramentas</h3>
            <p className="text-gray-600 dark:text-gray-400">Descubra as melhores ferramentas de IA</p>
          </button>
          <button
            onClick={() => setActiveTab("community")}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-left hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-cyan-500 group"
          >
            <Users className="w-12 h-12 mb-3 text-cyan-500 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Comunidade</h3>
            <p className="text-gray-600 dark:text-gray-400">Conecte-se com outros estudantes</p>
          </button>
        </div>
      </div>
    </div>
  )

  const renderModules = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Módulos de Aprendizado</h2>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {userProgress.completedModules.length} de {modules.length} completos
        </div>
      </div>

      {selectedModule === null ? (
        <div className="grid grid-cols-1 gap-4">
          {modules.map((module) => (
            <div
              key={module.id}
              className={`bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 transition-all duration-300 ${
                module.locked 
                  ? "border-gray-200 dark:border-gray-700 opacity-60" 
                  : "border-gray-200 dark:border-gray-700 hover:border-purple-500 hover:shadow-xl cursor-pointer"
              }`}
              onClick={() => !module.locked && setSelectedModule(module.id)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  userProgress.completedModules.includes(module.id)
                    ? "bg-green-500"
                    : module.locked
                    ? "bg-gray-300 dark:bg-gray-700"
                    : "bg-gradient-to-br from-purple-500 to-pink-500"
                }`}>
                  {userProgress.completedModules.includes(module.id) ? (
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  ) : module.locked ? (
                    <Lock className="w-6 h-6 text-gray-500" />
                  ) : (
                    <Play className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{module.title}</h3>
                    {userProgress.completedModules.includes(module.id) && (
                      <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded-full font-semibold">
                        Completo
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{module.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      {module.duration}
                    </span>
                    {module.locked && (
                      <span className="text-orange-500 font-semibold">
                        Complete o módulo anterior para desbloquear
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8">
          <button
            onClick={() => setSelectedModule(null)}
            className="text-purple-500 hover:text-purple-600 mb-6 flex items-center gap-2 font-semibold"
          >
            ← Voltar aos módulos
          </button>
          
          {modules.find(m => m.id === selectedModule) && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                  {modules.find(m => m.id === selectedModule)!.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {modules.find(m => m.id === selectedModule)!.description}
                </p>
              </div>

              {/* Video Player Placeholder */}
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-xl aspect-video flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 mx-auto mb-4 text-purple-600 dark:text-purple-400" />
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">Vídeo do Módulo</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {modules.find(m => m.id === selectedModule)!.duration}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">O que você vai aprender:</h3>
                <ul className="space-y-3">
                  {modules.find(m => m.id === selectedModule)!.content.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Complete Button */}
              {!userProgress.completedModules.includes(selectedModule) && (
                <button
                  onClick={() => completeModule(selectedModule)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Marcar como Completo (+100 pontos)
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )

  const renderQuiz = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Quiz Interativo</h2>

      {!quizActive ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 text-center">
          <Brain className="w-20 h-20 mx-auto mb-6 text-pink-500" />
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Teste Seus Conhecimentos</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Responda {quizQuestions.length} perguntas sobre monetização com IA e ganhe até {quizQuestions.length * 20} pontos!
          </p>
          
          {Object.keys(userProgress.quizScores).length > 0 && (
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 mb-8">
              <h4 className="font-bold mb-3 text-gray-900 dark:text-gray-100">Seus Resultados Anteriores:</h4>
              <div className="flex flex-wrap gap-3 justify-center">
                {Object.entries(userProgress.quizScores).map(([timestamp, score]) => (
                  <div key={timestamp} className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow">
                    <div className="text-2xl font-bold text-purple-600">{score}/{quizQuestions.length}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(parseInt(timestamp)).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={startQuiz}
            className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Iniciar Quiz
          </button>
        </div>
      ) : showResult ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 text-center">
          <Award className="w-20 h-20 mx-auto mb-6 text-yellow-500" />
          <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Quiz Concluído!</h3>
          <div className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {quizScore}/{quizQuestions.length}
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Você ganhou {quizScore * 20} pontos!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              Tentar Novamente
            </button>
            <button
              onClick={() => setActiveTab("modules")}
              className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-8 py-4 rounded-xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
            >
              Voltar aos Módulos
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Pergunta {currentQuestion + 1} de {quizQuestions.length}
              </span>
              <span className="text-sm font-semibold text-purple-600">
                Pontuação: {quizScore * 20}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            {quizQuestions[currentQuestion].question}
          </h3>

          <div className="space-y-3 mb-8">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedAnswer === index
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-purple-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index
                      ? "border-purple-500 bg-purple-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}>
                    {selectedAnswer === index && (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="text-gray-900 dark:text-gray-100">{option}</span>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
              selectedAnswer !== null
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-105 shadow-lg"
                : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            {currentQuestion < quizQuestions.length - 1 ? "Próxima Pergunta" : "Finalizar Quiz"}
          </button>
        </div>
      )}
    </div>
  )

  const renderResources = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">Recursos e Ferramentas</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Descubra as melhores ferramentas de IA para começar a monetizar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-gray-100 group-hover:text-orange-500 transition-colors">
                  {tool.name}
                </h3>
                <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full font-semibold">
                  {tool.category}
                </span>
              </div>
              <Sparkles className="w-6 h-6 text-orange-500" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{tool.description}</p>
            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600 transition-colors"
            >
              Acessar Ferramenta <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Quer Mais Recursos?</h3>
        <p className="mb-6 text-white/90">
          Acesse nossa biblioteca completa com templates, prompts prontos e guias detalhados para cada ferramenta.
        </p>
        <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300">
          Explorar Biblioteca
        </button>
      </div>
    </div>
  )

  const renderCommunity = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">Comunidade</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Conecte-se com outros estudantes e compartilhe suas conquistas
        </p>
      </div>

      {/* New Post */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700">
        <textarea
          placeholder="Compartilhe sua experiência, dúvida ou conquista..."
          className="w-full bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700 focus:border-cyan-500 focus:outline-none resize-none text-gray-900 dark:text-gray-100"
          rows={3}
        ></textarea>
        <div className="flex justify-end mt-3">
          <button className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:from-cyan-700 hover:to-blue-700 transition-all duration-300">
            Publicar
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {communityPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-cyan-500 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                {post.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">{post.author}</h4>
                  <span className="text-sm text-gray-500">• {post.timestamp}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                    <Star className="w-4 h-4" />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-2 hover:text-cyan-500 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    {post.replies}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">AI Money Academy</h1>
                <p className="text-xs text-gray-500">Monetize com Inteligência Artificial</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-2 rounded-xl">
              <Trophy className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="font-bold text-purple-600 dark:text-purple-400">{userProgress.totalPoints} pts</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === "home"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Home className="w-4 h-4" />
              Início
            </button>
            <button
              onClick={() => setActiveTab("modules")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === "modules"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Módulos
            </button>
            <button
              onClick={() => setActiveTab("quiz")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === "quiz"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Brain className="w-4 h-4" />
              Quiz
            </button>
            <button
              onClick={() => setActiveTab("resources")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === "resources"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              Recursos
            </button>
            <button
              onClick={() => setActiveTab("community")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === "community"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Users className="w-4 h-4" />
              Comunidade
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "home" && renderHome()}
        {activeTab === "modules" && renderModules()}
        {activeTab === "quiz" && renderQuiz()}
        {activeTab === "resources" && renderResources()}
        {activeTab === "community" && renderCommunity()}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600 dark:text-gray-400">
          <p className="text-sm">© 2024 AI Money Academy. Transforme IA em renda real.</p>
        </div>
      </footer>
    </div>
  )
}
