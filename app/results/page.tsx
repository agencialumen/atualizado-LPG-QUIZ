"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Gift, Star, Clock, Heart, ShieldCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

// Opções de presentes fictícios que podem ser "comprados" com pontos
const giftOptions = [
  {
    id: "basic",
    title: "Guia Básico",
    description: "Acesso ao método natural básico para fortalecer a imunidade do seu filho",
    points: 30,
    image: "/placeholder.svg?height=100&width=100",
    features: ["Guia digital", "3 receitas naturais", "Checklist diário"],
  },
  {
    id: "premium",
    title: "Kit Premium",
    description: "Método completo + consulta personalizada para o caso do seu filho",
    points: 60,
    image: "/placeholder.svg?height=100&width=100",
    features: ["Guia digital completo", "10 receitas naturais", "Consulta online", "Suporte por 30 dias"],
    recommended: true,
  },
  {
    id: "vip",
    title: "Pacote VIP",
    description: "Experiência completa com acompanhamento personalizado por 3 meses",
    points: 90,
    image: "/placeholder.svg?height=100&width=100",
    features: [
      "Guia digital completo",
      "Todas as receitas naturais",
      "3 consultas online",
      "Suporte prioritário por 90 dias",
      "Acesso ao grupo exclusivo de mães",
    ],
  },
]

export default function ResultsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [countdown, setCountdown] = useState(300) // 5 minutos em segundos
  const [showConfetti, setShowConfetti] = useState(false)
  const [points, setPoints] = useState(0)
  const [selectedGift, setSelectedGift] = useState<string | null>(null)
  const [showGiftSelection, setShowGiftSelection] = useState(false)
  const [soundEnabled] = useState(true)
  const confettiRef = useRef<HTMLDivElement>(null)

  // Objeto para armazenar os sons pré-carregados
  const [sounds, setSounds] = useState<Record<string, HTMLAudioElement>>({})

  // Pré-carregar os sons quando o componente montar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const soundFiles = {
        success: "https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3", // Som de sucesso maior
        select: "https://assets.mixkit.co/active_storage/sfx/1114/1114-preview.mp3", // Som de seleção
        reveal: "https://assets.mixkit.co/active_storage/sfx/1166/1166-preview.mp3", // Som de revelação
        purchase: "https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3", // Som de compra
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

  useEffect(() => {
    // Recupera os pontos do localStorage
    const savedPoints = localStorage.getItem("quizPoints")
    if (savedPoints) {
      setPoints(Number.parseInt(savedPoints, 10))
    } else {
      // Se não houver pontos salvos, define um valor padrão
      setPoints(75)
    }

    // Simulate analysis time
    const timer = setTimeout(() => {
      setIsLoading(false)
      setShowConfetti(true)

      // Dispara confetti quando o resultado é mostrado
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6, x: 0.5 },
      })

      // Toca som de sucesso
      playSound("success")
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      // Show content with a slight delay after loading completes
      const timer = setTimeout(() => {
        setShowContent(true)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isLoading])

  // Contador regressivo
  useEffect(() => {
    if (showContent && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [showContent, countdown])

  // Formata o tempo do contador
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Função para selecionar um presente
  const selectGift = (giftId: string) => {
    setSelectedGift(giftId)

    // Toca som de seleção
    playSound("select")

    // Dispara confetti
    if (confettiRef.current) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5, x: 0.5 },
      })
    }
  }

  // Função para redirecionar para o checkout
  const redirectToCheckout = () => {
    // Toca som de compra
    playSound("purchase")

    // Redireciona após um pequeno delay para o som tocar
    setTimeout(() => {
      window.location.href = "https://pay.kirvano.com/5a2711a1-3c63-4d2e-a5e8-ec1bfc39fe51"
    }, 600)
  }

  // Função para mostrar a seleção de presentes
  const showGifts = () => {
    setShowGiftSelection(true)

    // Toca som de revelação
    playSound("reveal")
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
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">Seu Presente Especial</h1>
        </div>

        <Card className="border-blue-200 shadow-xl overflow-hidden">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
                <h2 className="text-xl font-semibold text-blue-800 mb-2">Preparando seu presente especial...</h2>
                <p className="text-blue-600 text-center">
                  Estamos analisando suas respostas para criar uma solução personalizada para seu filho.
                </p>
              </div>
            ) : (
              <div className="p-6 md:p-8">
                {showContent && (
                  <AnimatePresence>
                    {!showGiftSelection ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="flex justify-center mb-6">
                          <div className="bg-yellow-100 p-3 rounded-full">
                            <Gift className="h-12 w-12 text-yellow-600" />
                          </div>
                        </div>

                        <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-4 text-center">
                          ✨ Pronto! Com base nas suas respostas, identificamos que você é uma mãe incrível
                        </h2>

                        <p className="text-blue-700 mb-6 text-center">
                          Dedicada, forte e com um desejo real de fazer o melhor pelos seus pequenos.
                        </p>

                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                          <p className="text-red-700 font-medium">
                            Com base nas suas respostas, identificamos que seu filho pode estar sofrendo com problemas
                            causados por:
                          </p>
                          <ul className="mt-3 space-y-2">
                            <li className="flex items-start gap-2">
                              <span className="text-red-500 font-bold">•</span>
                              <span>Alimentos industrializados que enfraquecem o sistema imunológico</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-red-500 font-bold">•</span>
                              <span>Produtos de limpeza com químicos que afetam o sistema respiratório</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-red-500 font-bold">•</span>
                              <span>Uso frequente de antibióticos que destroem a flora intestinal</span>
                            </li>
                          </ul>
                        </div>

                        {/* Pontos acumulados */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                            <h3 className="text-lg font-bold text-yellow-700">Parabéns! Você acumulou:</h3>
                          </div>
                          <p className="text-3xl font-bold text-yellow-800 mb-2">{points} pontos</p>
                          <p className="text-yellow-700">
                            Você pode usar seus pontos para desbloquear um presente especial!
                          </p>
                          <motion.button
                            onClick={showGifts}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-full shadow-md px-6 py-2 transition-all"
                          >
                            Ver Presentes Disponíveis
                          </motion.button>
                        </div>

                        {/* Contador regressivo */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                          <div className="flex items-center justify-center gap-3 mb-2">
                            <Clock className="h-5 w-5 text-blue-600" />
                            <p className="text-blue-700 font-bold">Esta oferta expira em:</p>
                          </div>
                          <p className="text-center text-2xl font-bold text-blue-800">{formatTime(countdown)}</p>
                          <p className="text-center text-sm text-blue-600 mt-2">
                            Após este tempo, seus pontos e presente personalizado não estarão mais disponíveis
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="text-center mb-6">
                          <div className="inline-block p-3 bg-yellow-100 rounded-full mb-4">
                            <Gift className="h-10 w-10 text-yellow-600" />
                          </div>
                          <h2 className="text-2xl font-bold text-blue-800 mb-2">Escolha seu Presente Especial</h2>
                          <p className="text-blue-700">
                            Use seus <span className="font-bold">{points} pontos</span> para desbloquear um destes
                            presentes exclusivos:
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          {giftOptions.map((gift) => (
                            <motion.div
                              key={gift.id}
                              whileHover={{ scale: 1.03 }}
                              className={`border rounded-xl overflow-hidden ${
                                selectedGift === gift.id ? "border-pink-500 shadow-lg" : "border-gray-200 shadow-md"
                              } ${gift.recommended ? "ring-2 ring-blue-500" : ""}`}
                            >
                              <div className="relative">
                                {gift.recommended && (
                                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                                    Recomendado
                                  </div>
                                )}
                                <div className="h-24 bg-gray-100 flex items-center justify-center">
                                  <Image
                                    src={gift.image || "/placeholder.svg"}
                                    alt={gift.title}
                                    width={80}
                                    height={80}
                                    className="object-contain"
                                  />
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="font-bold text-blue-800">{gift.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{gift.description}</p>
                                <div className="mb-3">
                                  {gift.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-1 text-xs text-gray-700 mb-1">
                                      <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                                      <span>{feature}</span>
                                    </div>
                                  ))}
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                    <span className="font-bold text-yellow-700">{gift.points} pontos</span>
                                  </div>
                                  <button
                                    onClick={() => selectGift(gift.id)}
                                    disabled={points < gift.points}
                                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                                      points >= gift.points
                                        ? "bg-pink-500 text-white hover:bg-pink-600"
                                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    } ${selectedGift === gift.id ? "bg-green-500 hover:bg-green-600" : ""}`}
                                  >
                                    {selectedGift === gift.id ? (
                                      <span className="flex items-center gap-1">
                                        <CheckCircle className="h-3 w-3" /> Selecionado
                                      </span>
                                    ) : points >= gift.points ? (
                                      "Selecionar"
                                    ) : (
                                      "Pontos insuficientes"
                                    )}
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Botão de checkout */}
                        <div className="text-center">
                          <motion.button
                            onClick={redirectToCheckout}
                            disabled={!selectedGift}
                            whileHover={selectedGift ? { scale: 1.05 } : {}}
                            whileTap={selectedGift ? { scale: 0.95 } : {}}
                            className={`bg-pink-500 text-white font-bold rounded-full shadow-lg transition-all duration-300 px-8 py-4 text-lg flex items-center gap-2 mx-auto ${
                              selectedGift ? "hover:bg-pink-600 animate-pulse" : "opacity-50 cursor-not-allowed"
                            }`}
                          >
                            DESBLOQUEAR MEU PRESENTE AGORA
                            <Gift className="ml-2 h-5 w-5" />
                          </motion.button>
                          <p className="mt-4 text-sm text-blue-600">
                            {selectedGift
                              ? "Clique acima para acessar seu presente especial"
                              : "Selecione um presente para continuar"}
                          </p>
                        </div>

                        {/* Selos de garantia e segurança */}
                        <div className="flex flex-wrap justify-center gap-4 mt-6">
                          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-green-700 text-sm font-medium">Garantia de 7 dias</span>
                          </div>
                          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                            <ShieldCheck className="h-5 w-5 text-blue-600" />
                            <span className="text-blue-700 text-sm font-medium">Pagamento seguro</span>
                          </div>
                          <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
                            <Heart className="h-5 w-5 text-yellow-600" />
                            <span className="text-yellow-700 text-sm font-medium">+137.000 mães aprovam</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
