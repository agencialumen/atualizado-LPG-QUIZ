"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Gift, Star, Award, Sparkles, Brain, Heart, Volume2, VolumeX } from "lucide-react"

// Tipos de recompensas para gamificação
const rewardTypes = [
  {
    icon: <Star className="h-6 w-6 text-yellow-400" />,
    text: "🎉 +5 Pontos de Conexão com seu filho!",
    color: "bg-yellow-100 border-yellow-300 text-yellow-700",
    points: 5,
    sound: "reward1",
  },
  {
    icon: <Heart className="h-6 w-6 text-pink-500" />,
    text: "💖 Você desbloqueou uma dica exclusiva de ouro!",
    color: "bg-pink-100 border-pink-300 text-pink-700",
    points: 10,
    sound: "reward2",
  },
  {
    icon: <Brain className="h-6 w-6 text-purple-500" />,
    text: "🧠 Insight desbloqueado: você está mais perto da solução ideal.",
    color: "bg-purple-100 border-purple-300 text-purple-700",
    points: 15,
    sound: "reward3",
  },
  {
    icon: <Sparkles className="h-6 w-6 text-blue-500" />,
    text: "✨ Parabéns! Você está no caminho certo!",
    color: "bg-blue-100 border-blue-300 text-blue-700",
    points: 5,
    sound: "reward1",
  },
  {
    icon: <Gift className="h-6 w-6 text-green-500" />,
    text: "🔥 Avançou mais um passo rumo ao seu presente personalizado!",
    color: "bg-green-100 border-green-300 text-green-700",
    points: 10,
    sound: "reward2",
  },
  {
    icon: <Award className="h-6 w-6 text-amber-500" />,
    text: "🏆 Você está entre as 10% melhores mães que fizeram este quiz!",
    color: "bg-amber-100 border-amber-300 text-amber-700",
    points: 20,
    sound: "reward3",
  },
]

// Mensagens motivacionais para a barra de progresso
const progressMessages = [
  { threshold: 10, message: "Vamos começar a entender seu caso..." },
  { threshold: 20, message: "Estamos conhecendo você melhor..." },
  { threshold: 40, message: "Você está indo super bem!" },
  { threshold: 60, message: "Mais da metade! Continue assim!" },
  { threshold: 80, message: "Quase lá, continue!" },
  { threshold: 90, message: "Finalizando sua análise personalizada..." },
  { threshold: 100, message: "Estamos preparando seu presente..." },
]

const questions = [
  {
    id: 1,
    question: "Seu filho vive com nariz escorrendo, tossindo ou com febre do nada?",
    options: [
      { id: "a", text: "Sim, direto!" },
      { id: "b", text: "Às vezes." },
      { id: "c", text: "Quase nunca, graças a Deus." },
    ],
    tip: "Sintomas respiratórios frequentes podem indicar alergias ou baixa imunidade.",
  },
  {
    id: 2,
    question: "Você costuma dar leite de caixinha, achocolatado ou suquinho de caixinha pra ele?",
    options: [
      { id: "a", text: "Sim, todo dia." },
      { id: "b", text: "Só às vezes." },
      { id: "c", text: "Não dou, evito ao máximo." },
    ],
    tip: "Alimentos ultraprocessados podem conter conservantes que afetam o sistema imunológico.",
  },
  {
    id: 3,
    question: "Ele costuma ter dor de barriga, gases, intestino preso ou diarreia?",
    options: [
      { id: "a", text: "Direto!" },
      { id: "b", text: "De vez em quando." },
      { id: "c", text: "Nunca reparei nisso..." },
    ],
    tip: "A saúde intestinal está diretamente ligada à imunidade do corpo.",
  },
  {
    id: 4,
    question: "Quando ele fica doente, você corre pro médico ou resolve em casa com receita de vó?",
    options: [
      { id: "a", text: "Médico. Sempre." },
      { id: "b", text: "Tento em casa primeiro." },
      { id: "c", text: "Fico desesperada e não sei o que fazer!" },
    ],
    tip: "Encontrar o equilíbrio entre remédios naturais e medicina convencional é importante.",
  },
  {
    id: 5,
    question:
      "Se existisse um método 100% natural, sem remédio, criado por uma mãe como você — pra cortar gripe, tosse e febre recorrente — você toparia conhecer?",
    options: [
      { id: "a", text: "ÓBVIO, quero agora!" },
      { id: "b", text: "Talvez..." },
      { id: "c", text: "Não acredito nessas coisas." },
    ],
    tip: "Métodos naturais podem fortalecer o sistema imunológico sem efeitos colaterais.",
  },
  {
    id: 6,
    question: "Você sente que ele adoece mais do que outras crianças?",
    options: [
      { id: "a", text: "Sim, é o mais doente da turma." },
      { id: "b", text: "Acho que sim." },
      { id: "c", text: "Nunca pensei nisso..." },
    ],
    tip: "Comparar a frequência de doenças pode ajudar a identificar padrões importantes.",
  },
  {
    id: 7,
    question: "Alguém da família já disse que ele 'vive doente' ou que 'você mima demais'?",
    options: [
      { id: "a", text: "Já, várias vezes..." },
      { id: "b", text: "Às vezes ouço isso." },
      { id: "c", text: "Nunca." },
    ],
    tip: "A percepção dos outros pode oferecer perspectivas que não notamos no dia a dia.",
  },
  {
    id: 8,
    question: "Você já tentou de tudo, mas sente que nada resolve de verdade?",
    options: [
      { id: "a", text: "SIM! Já gastei horrores e continua a mesma coisa." },
      { id: "b", text: "Tô tentando ainda..." },
      { id: "c", text: "Nem sei o que tentar mais..." },
    ],
    tip: "Às vezes, a solução está em uma abordagem completamente diferente do convencional.",
  },
  {
    id: 9,
    question: "Ele toma antibiótico com frequência?",
    options: [
      { id: "a", text: "Quase todo mês!" },
      { id: "b", text: "De vez em quando..." },
      { id: "c", text: "Raramente." },
    ],
    tip: "O uso frequente de antibióticos pode enfraquecer a flora intestinal e a imunidade natural.",
  },
  {
    id: 10,
    question:
      "Se você descobrir que pode estar errando com ele... Você teria coragem de mudar tudo HOJE pra proteger a saúde do seu filho?",
    options: [
      { id: "a", text: "Sim, pelo meu filho eu mudo TUDO!" },
      { id: "b", text: "Depende do que for." },
      { id: "c", text: "Não sei..." },
    ],
    tip: "A disposição para mudar é o primeiro passo para transformar a saúde do seu filho.",
  },
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showReward, setShowReward] = useState(false)
  const [currentReward, setCurrentReward] = useState<(typeof rewardTypes)[0] | null>(null)
  const [points, setPoints] = useState(0)
  const [showTestimonials, setShowTestimonials] = useState(false)
  const [progressMessage, setProgressMessage] = useState("")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const confettiRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Objeto para armazenar os sons pré-carregados
  const [sounds, setSounds] = useState<Record<string, HTMLAudioElement>>({})

  // Pré-carregar os sons quando o componente montar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const soundFiles = {
        reward1: "https://assets.mixkit.co/active_storage/sfx/2005/2005-preview.mp3", // Som de sino suave
        reward2: "https://assets.mixkit.co/active_storage/sfx/1167/1167-preview.mp3", // Som de sucesso curto
        reward3: "https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3", // Som de conquista
        toggle: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", // Som de clique suave
        success: "https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3", // Som de sucesso maior
        select: "https://assets.mixkit.co/active_storage/sfx/1114/1114-preview.mp3", // Som de seleção
      }

      const loadedSounds: Record<string, HTMLAudioElement> = {}

      // Tenta carregar cada som
      Object.entries(soundFiles).forEach(([key, url]) => {
        try {
          const audio = new Audio(url)
          audio.volume = 0.5 // Volume a 50%
          audio.preload = "auto"
          loadedSounds[key] = audio
        } catch (error) {
          console.log(`Erro ao carregar som ${key}:`, error)
        }
      })

      setSounds(loadedSounds)
    }
  }, [])

  // Atualiza a mensagem de progresso com base na porcentagem atual
  useEffect(() => {
    const progress = ((currentQuestion + 1) / questions.length) * 100
    const message = progressMessages.findLast((item) => progress >= item.threshold)
    if (message) {
      setProgressMessage(message.message)
    }
  }, [currentQuestion])

  // Salva os pontos no localStorage quando o quiz termina
  useEffect(() => {
    if (showTestimonials) {
      localStorage.setItem("quizPoints", points.toString())
    }
  }, [showTestimonials, points])

  // Função para tocar um som
  const playSound = (soundName: string) => {
    if (!soundEnabled || typeof window === "undefined") return

    try {
      const sound = sounds[soundName]
      if (sound) {
        // Reinicia o som para poder tocar novamente
        sound.currentTime = 0
        sound.play().catch((error) => {
          console.log("Erro ao tocar som:", error)
        })
      }
    } catch (error) {
      console.log("Erro ao tocar som:", error)
    }
  }

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
    if (!soundEnabled) {
      // Tocar um som de teste quando ativar
      playSound("toggle")
    }
  }

  const handleOptionSelect = (optionId: string) => {
    // Salva a resposta
    setAnswers({ ...answers, [currentQuestion]: optionId })

    // Seleciona uma recompensa aleatória
    const randomReward = rewardTypes[Math.floor(Math.random() * rewardTypes.length)]
    setCurrentReward(randomReward)

    // Adiciona pontos baseado na recompensa
    setPoints(points + randomReward.points)

    // Toca o som da recompensa
    playSound(randomReward.sound)

    // Mostra a recompensa
    setShowReward(true)

    // Dispara confetti para respostas específicas (a primeira e a última pergunta)
    if (currentQuestion === 0 || currentQuestion === questions.length - 1) {
      if (confettiRef.current) {
        const rect = confettiRef.current.getBoundingClientRect()
        confetti({
          particleCount: 100,
          spread: 70,
          origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight,
          },
        })
      }
    }

    // Avança para a próxima pergunta após um delay
    setTimeout(() => {
      setShowReward(false)

      if (currentQuestion === questions.length - 1) {
        // Mostra testimonials antes dos resultados
        setShowTestimonials(true)
      } else {
        setCurrentQuestion(currentQuestion + 1)
      }
    }, 1500)
  }

  const handleFinish = () => {
    playSound("success")
    router.push("/results")
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (showTestimonials) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="border-blue-200 shadow-xl">
            <CardContent className="p-6 md:p-8">
              <div className="text-center mb-8">
                <div className="inline-block p-3 bg-yellow-100 rounded-full mb-4">
                  <Gift className="h-10 w-10 text-yellow-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4">Seu presente está quase pronto!</h2>
                <p className="text-blue-700 mb-6">Veja o que outras mães como você descobriram após fazer este quiz:</p>
              </div>

              <div className="space-y-6 mb-8">
                {[
                  {
                    name: "Juliana, SP",
                    text: "Eu achei que era frescura, mas esse quiz me abriu os olhos! Meu filho tá 3 MESES sem gripar!!",
                    image: "https://iili.io/3N3hs7s.md.jpg",
                  },
                  {
                    name: "Daiane, BA",
                    text: "Chorei quando vi que eu mesma tava piorando a saúde do meu bebê... Obrigada por me mostrar a verdade.",
                    image: "https://iili.io/3N3jhZl.jpg",
                  },
                  {
                    name: "Camila, RJ",
                    text: "Meu filho tomava antibiótico todo mês. Agora tá correndo no quintal igual um capeta saudável! Funciona mesmo.",
                    image: "https://iili.io/3N3wnt4.jpg",
                  },
                ].map((testimonial, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex gap-4 bg-blue-50 p-4 rounded-xl border border-blue-100"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={60}
                          height={60}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-blue-700 mb-2 italic">"{testimonial.text}"</p>
                      <p className="text-blue-900 font-semibold">{testimonial.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center">
                <motion.button
                  onClick={handleFinish}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:shadow-xl px-8 py-4 text-lg flex items-center gap-2"
                >
                  Desbloquear Meu Presente Especial
                  <Gift className="ml-2 h-5 w-5" />
                </motion.button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100 py-8 px-4">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-pink-100 opacity-50"></div>
        <div className="absolute top-1/4 -right-10 w-32 h-32 rounded-full bg-blue-200 opacity-40"></div>
        <div className="absolute bottom-1/3 -left-10 w-36 h-36 rounded-full bg-yellow-100 opacity-30"></div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10" ref={confettiRef}>
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-white p-1 rounded-full shadow-md w-20 h-20 flex items-center justify-center overflow-hidden">
              <Image
                src="https://iili.io/3hWg9ne.jpg"
                alt="Logo"
                width={70}
                height={70}
                className="rounded-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">Quiz da Saúde do Seu Filho</h1>
          <p className="text-blue-700">Responda com sinceridade para descobrir a verdade</p>

          {/* Botão de som */}
          <button
            onClick={toggleSound}
            className="mt-2 bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-all"
            aria-label={soundEnabled ? "Desativar som" : "Ativar som"}
          >
            {soundEnabled ? (
              <Volume2 className="h-5 w-5 text-blue-600" />
            ) : (
              <VolumeX className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>

        {/* Barra de progresso com mensagem motivacional */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex justify-between text-sm text-blue-700 mb-2">
            <span>
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3 bg-blue-100" indicatorClassName="bg-blue-500" />
          <p className="text-center mt-2 text-blue-600 font-medium">{progressMessage}</p>

          {/* Contador de pontos */}
          <div className="flex justify-center mt-2">
            <div className="bg-yellow-100 rounded-full px-4 py-1 flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-yellow-700 font-bold">{points} pontos</span>
            </div>
          </div>
        </div>

        <Card className="border-blue-200 shadow-xl relative">
          <CardContent className="p-6 md:p-8">
            {/* Área de recompensa - Corrigido para dispositivos móveis */}
            <AnimatePresence>
              {showReward && currentReward && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
                >
                  <div
                    className={`p-4 rounded-xl border ${currentReward.color} shadow-lg flex items-center gap-3 max-w-[90%] mx-auto`}
                  >
                    {currentReward.icon}
                    <p className="font-bold">{currentReward.text}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={showReward ? "opacity-30" : ""}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-6">
                    {questions[currentQuestion].question}
                  </h2>

                  <div className="space-y-4">
                    {questions[currentQuestion].options.map((option) => (
                      <motion.div
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all cursor-pointer bg-white hover:bg-blue-50"
                        onClick={() => !showReward && handleOptionSelect(option.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-transparent"></div>
                          </div>
                          <span className="text-blue-900">{option.text}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Dica da pergunta */}
                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-blue-700 text-sm">
                      <span className="font-bold">💡 Dica:</span> {questions[currentQuestion].tip}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
