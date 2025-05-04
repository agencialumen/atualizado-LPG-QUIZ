"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Gift } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-pink-100 opacity-50"></div>
        <div className="absolute top-1/4 -right-10 w-32 h-32 rounded-full bg-blue-200 opacity-40"></div>
        <div className="absolute bottom-1/3 -left-10 w-36 h-36 rounded-full bg-yellow-100 opacity-30"></div>
        <Image
          src="/placeholder.svg?height=100&width=100"
          alt="Baby rattle"
          width={100}
          height={100}
          className="absolute top-20 right-10 opacity-10 rotate-12"
        />
        <Image
          src="/placeholder.svg?height=120&width=120"
          alt="Teddy bear"
          width={120}
          height={120}
          className="absolute bottom-20 left-10 opacity-10 -rotate-12"
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white p-1 rounded-full shadow-md w-24 h-24 flex items-center justify-center overflow-hidden">
              <Image
                src="https://iili.io/3hWg9ne.jpg"
                alt="Logo"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Mãe, Tem Algo Errado Acontecendo?</h1>
          <p className="text-lg md:text-xl text-blue-700 font-medium">
            Descubra se você está prejudicando a saúde do seu filho sem perceber
          </p>
        </header>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-blue-100">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4">
                Seu filho vive gripado, tossindo e com febre?
              </h2>
              <p className="text-blue-700 mb-6">
                Milhares de mães descobriram que estavam cometendo erros simples que prejudicavam a saúde dos seus
                filhos. Responda nosso quiz rápido e descubra o que pode estar acontecendo com o seu pequeno.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <QuizStartButton />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative rounded-xl overflow-hidden shadow-lg border-4 border-blue-100">
                <Image
                  src="https://iili.io/3wLXp8G.jpg"
                  alt="Mãe preocupada com bebê"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">O que outras mães descobriram:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Juliana, SP",
                text: "Eu achei que era frescura, mas esse quiz me abriu os olhos! Meu filho tá 3 MESES sem gripar!!",
                stars: 5,
              },
              {
                name: "Daiane, BA",
                text: "Chorei quando vi que eu mesma tava piorando a saúde do meu bebê... Obrigada por me mostrar a verdade.",
                stars: 5,
              },
              {
                name: "Camila, RJ",
                text: "Meu filho tomava antibiótico todo mês. Agora tá correndo no quintal igual um capeta saudável! Funciona mesmo.",
                stars: 5,
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm">
                <div className="flex mb-2">
                  {Array(testimonial.stars)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                </div>
                <p className="text-blue-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="text-blue-900 font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-6 md:p-8 text-white text-center">
          <div className="bg-white p-1 rounded-full inline-block mb-4 w-16 h-16 flex items-center justify-center overflow-hidden">
            <Image
              src="https://iili.io/3hWg9ne.jpg"
              alt="Logo"
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Não espere seu filho adoecer novamente</h2>
          <p className="mb-6 text-lg">
            Responda 10 perguntas rápidas e descubra o que pode estar prejudicando a saúde do seu pequeno.
          </p>
          <QuizStartButton />
        </div>
      </div>
    </main>
  )
}

// Componente para o botão de iniciar o quiz com modal
function QuizStartButton() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Button
        size="lg"
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:shadow-xl w-full"
        onClick={() => setShowModal(true)}
      >
        <span className="flex items-center gap-2">
          Fazer o Quiz Agora
          <ArrowRight className="h-5 w-5" />
        </span>
      </Button>

      {/* Modal de incentivo */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fade-in">
            <div className="flex justify-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Gift className="h-10 w-10 text-yellow-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-blue-800 mb-3 text-center">
              Você está prestes a descobrir algo incrível!
            </h3>
            <p className="text-blue-700 mb-4 text-center">
              Complete o quiz até o final e ganhe um <span className="font-bold">presente especial</span> que pode
              transformar a saúde do seu filho para sempre!
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                <p className="text-yellow-700 text-sm">
                  <span className="font-bold">Bônus:</span> Acumule pontos respondendo às perguntas e desbloqueie
                  recompensas exclusivas!
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700"
                onClick={() => setShowModal(false)}
              >
                Voltar
              </Button>
              <Link href="/quiz" className="w-full">
                <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                  <span className="flex items-center gap-2">
                    Começar Agora
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
