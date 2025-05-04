# Funil de Vendas para Saúde Infantil

Este projeto consiste em um funil de conversão voltado para mães preocupadas com a saúde de seus filhos. O funil inclui uma landing page, um quiz interativo e uma página de resultados, todos projetados para capturar leads e converter visitantes.

## 📋 Estrutura do Projeto

\`\`\`
baby-health-funnel/
├── app/
│   ├── page.tsx            # Landing page inicial
│   ├── quiz/
│   │   └── page.tsx        # Página do quiz interativo
│   ├── results/
│   │   └── page.tsx        # Página de resultados
│   └── layout.tsx          # Layout padrão da aplicação
├── components/
│   └── ui/                 # Componentes de UI reutilizáveis
├── public/                 # Arquivos públicos (imagens, etc.)
├── tailwind.config.js      # Configuração do Tailwind CSS
└── README.md               # Este arquivo
\`\`\`

## 🛠️ Como Personalizar

### Alterando o Logotipo

O logotipo está definido em formato circular (estilo foto de perfil do Instagram) em três locais principais:

1. **Landing Page** (`app/page.tsx`):
   \`\`\`jsx
   <Image 
     src="https://iili.io/3hWg9ne.jpg" // ← ALTERE ESTA URL
     alt="Logo" 
     width={80} 
     height={80} 
     className="rounded-full object-cover"
   />
   \`\`\`

2. **Página do Quiz** (`app/quiz/page.tsx`):
   \`\`\`jsx
   <Image 
     src="https://iili.io/3hWg9ne.jpg" // ← ALTERE ESTA URL
     alt="Logo" 
     width={70} 
     height={70} 
     className="rounded-full object-cover" 
   />
   \`\`\`

3. **Página de Resultados** (`app/results/page.tsx`):
   \`\`\`jsx
   <Image 
     src="https://iili.io/3hWg9ne.jpg" // ← ALTERE ESTA URL
     alt="Logo" 
     width={70} 
     height={70} 
     className="rounded-full object-cover" 
   />
   \`\`\`

### Alterando Imagens Principais

1. **Imagem Principal na Landing Page** (`app/page.tsx`):
   \`\`\`jsx
   <Image
     src="/placeholder.svg?height=400&width=600" // ← ALTERE ESTA URL
     alt="Mãe preocupada com bebê"
     width={600}
     height={400}
     className="w-full h-auto"
   />
   \`\`\`

2. **Imagem Final do Funil** (`app/results/page.tsx`):
   \`\`\`jsx
   <Image
     src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20of%20iili.io/3hecLkg.jpg-iecD0.jpeg" // ← ALTERE ESTA URL
     alt="Antes e depois: criança doente vs criança saudável"
     width={800}
     height={600}
     className="w-full h-auto rounded-xl shadow-md"
   />
   \`\`\`

Para alterar qualquer imagem, substitua o valor do atributo `src` pela URL da sua imagem hospedada.

Para alterar o logotipo, substitua o URL `src` em todos esses locais. Recomendamos:
- Usar uma imagem quadrada para melhor resultado no formato circular
- Hospedar a imagem em um serviço como ImgBB ou diretamente em sua CDN
- Se necessário, ajustar os valores de `width` e `height` para melhor enquadramento

### Alterando o Link de Checkout

O botão de checkout no final do funil está configurado para redirecionar para um link específico. Para alterá-lo, modifique a função `redirectToCheckout` no arquivo `app/results/page.tsx`:

\`\`\`jsx
// Função para redirecionar para o checkout
const redirectToCheckout = () => {
  window.location.href = "https://pay.kirvano.com/5a2711a1-3c63-4d2e-a5e8-ec1bfc39fe51" // ← ALTERE ESTA URL
}
\`\`\`

Substitua a URL pelo seu link de checkout desejado.

### Alterando Imagens

Todas as imagens de placeholder podem ser substituídas por imagens reais. Procure por:

\`\`\`jsx
<Image
  src="/placeholder.svg?height=400&width=600"
  alt="Descrição da imagem"
  width={600}
  height={400}
  className="w-full h-auto"
/>
\`\`\`

Substitua o `src` pelo caminho da sua imagem real. Você pode:
1. Adicionar imagens na pasta `/public` e referenciá-las como `/nome-da-imagem.jpg`
2. Usar URLs externas como fizemos com o logotipo

### Modificando Links de Redirecionamento

Os links de redirecionamento estão nos botões CTA. Eles usam o componente `Link` do Next.js:

\`\`\`jsx
<Link href="/quiz" className="flex items-center gap-2">
  Fazer o Quiz Agora
  <ArrowRight className="h-5 w-5" />
</Link>
\`\`\`

Para alterar o destino, modifique o valor do atributo `href`.

### Alterando as Perguntas do Quiz

As perguntas do quiz estão definidas no arquivo `app/quiz/page.tsx` como um array:

\`\`\`jsx
const questions = [
  {
    id: 1,
    question: "Seu filho vive com nariz escorrendo, tossindo ou com febre do nada?",
    options: [
      { id: "a", text: "Sim, direto!" },
      { id: "b", text: "Às vezes." },
      { id: "c", text: "Quase nunca, graças a Deus." },
    ],
  },
  // Outras perguntas...
];
\`\`\`

Para modificar:
- Altere o texto da pergunta na propriedade `question`
- Modifique as opções no array `options`
- Adicione ou remova perguntas conforme necessário

### Alterando o Esquema de Cores

O projeto usa Tailwind CSS para estilização. As cores principais são:

- Azul: `blue-600`, `blue-700`, `blue-800`, `blue-900`
- Rosa: `pink-500`
- Fundo: Gradiente do `sky-50` para `blue-100`

Para mudar o esquema de cores, procure por classes como:
- `bg-blue-600`
- `text-blue-700`
- `from-sky-50 to-blue-100`
- `bg-pink-500`

Substitua por suas cores preferidas usando o padrão do Tailwind, por exemplo:
- `bg-purple-600` (para roxo)
- `text-teal-700` (para verde-água)

### Alterando Textos

Todos os textos estão diretamente nos componentes. Para modificá-los, basta localizar o texto desejado e substituí-lo. Por exemplo:

\`\`\`jsx
<h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Mãe, Tem Algo Errado Acontecendo?</h1>
\`\`\`

Pode ser alterado para:

\`\`\`jsx
<h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Descubra o Segredo da Saúde do Seu Filho</h1>
\`\`\`

### Modificando os Depoimentos

Os depoimentos estão presentes em vários lugares do funil. Localize os arrays de depoimentos:

\`\`\`jsx
[
  {
    name: "Juliana, SP",
    text: "Eu achei que era frescura, mas esse quiz me abriu os olhos! Meu filho tá 3 MESES sem gripar!!",
    stars: 5,
  },
  // Outros depoimentos
]
\`\`\`

E modifique as propriedades `name` e `text` conforme necessário.

## 📱 Responsividade

O funil já está totalmente adaptado para dispositivos móveis. As principais técnicas utilizadas:

- Classes responsivas do Tailwind (ex: `text-3xl md:text-4xl`)
- Layout flexível com `flex-col md:flex-row`
- Tamanhos adequados para elementos interativos em telas touch

Não é necessário fazer ajustes adicionais para que o funil funcione bem em celulares e tablets.

## 🚀 Integrações

### Google Analytics

Para adicionar Google Analytics, insira o seguinte código no arquivo `app/layout.tsx`:

\`\`\`jsx
<head>
  {/* Código existente */}
  <script async src="https://www.googletagmanager.com/gtag/js?id=SEU_ID_GA"></script>
  <script dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'SEU_ID_GA');
    `
  }} />
</head>
\`\`\`

Substitua `SEU_ID_GA` pelo seu ID do Google Analytics.

### Pixel do Facebook

Para adicionar o Pixel do Facebook, insira no `app/layout.tsx`:

\`\`\`jsx
<head>
  {/* Código existente */}
  <script dangerouslySetInnerHTML={{
    __html: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', 'SEU_PIXEL_ID');
      fbq('track', 'PageView');
    `
  }} />
</head>
\`\`\`

Substitua `SEU_PIXEL_ID` pelo ID do seu Pixel.

## 📊 Rastreamento de Conversão

Para adicionar rastreamento de eventos em botões específicos, adicione funções como:

\`\`\`jsx
const trackCheckoutClick = () => {
  // Para Google Analytics
  if (window.gtag) {
    window.gtag('event', 'click', {
      'event_category': 'checkout',
      'event_label': 'metodo_natural'
    });
  }
  
  // Para Facebook Pixel
  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout');
  }
  
  // Redireciona após o tracking
  window.location.href = 'https://seu-link-de-checkout.com';
};
\`\`\`

E use no botão:

\`\`\`jsx
<Button onClick={trackCheckoutClick}>
  Conhecer o Método Natural
</Button>
\`\`\`

## ⚙️ Configuração Avançada

Para modificações mais avançadas, consulte:

1. **Tailwind Configuration** - Arquivo `tailwind.config.js`
2. **Componentes UI** - Pasta `components/ui/`
3. **Layout Principal** - Arquivo `app/layout.tsx`

## 🤝 Suporte

Para dúvidas ou suporte adicional na customização, entre em contato com o desenvolvedor.
