"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Calendar, Clock, MoreVertical, Plus, ChevronDown, ChevronUp, Settings, Trash2, Image, Palette, Edit, Share2, ChevronRight, ChevronLeft, RotateCcw, Crown, HelpCircle, Send, FileText } from "lucide-react"
import { format, startOfDay, eachDayOfInterval, isSameDay, startOfMonth, endOfMonth, getDay } from "date-fns"
import { ptBR, enUS, es, fr, de, it, ja, zhCN } from "date-fns/locale"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Addiction = {
  id: string
  name: string
  icon: string
}

const addictions: Addiction[] = [
  { id: "pornografia", name: "Pornografia", icon: "🚫" },
  { id: "cigarro", name: "Cigarro", icon: "🚬" },
  { id: "bebidas", name: "Bebidas Alcoólicas", icon: "🍺" },
  { id: "drogas", name: "Drogas", icon: "💊" },
  { id: "jogos", name: "Jogos de Azar", icon: "🎰" },
  { id: "redes-sociais", name: "Redes Sociais", icon: "📱" },
  { id: "comida", name: "Comida (Compulsão)", icon: "🍔" },
  { id: "compras", name: "Compras Compulsivas", icon: "🛍️" },
]

// Emojis disponíveis para seleção
const availableEmojis = [
  "🚫", "🚬", "🍺", "💊", "🎰", "📱", "🍔", "🛍️",
  "🎯", "💪", "🔥", "⭐", "🏆", "✨", "🌟", "💎",
  "🎮", "🍕", "🍰", "☕", "🥤", "🍷", "🎲", "💰"
]

// Paleta de cores disponíveis (para vícios individuais)
const availableColors = [
  { name: "Vermelho", value: "#b71c1c" },
  { name: "Vermelho Escuro", value: "#8b0000" },
  { name: "Azul", value: "#1976d2" },
  { name: "Azul Escuro", value: "#0d47a1" },
  { name: "Verde", value: "#388e3c" },
  { name: "Verde Escuro", value: "#1b5e20" },
  { name: "Roxo", value: "#7b1fa2" },
  { name: "Roxo Escuro", value: "#4a148c" },
  { name: "Laranja", value: "#f57c00" },
  { name: "Laranja Escuro", value: "#e65100" },
  { name: "Rosa", value: "#c2185b" },
  { name: "Rosa Escuro", value: "#880e4f" },
  { name: "Ciano", value: "#0097a7" },
  { name: "Índigo", value: "#303f9f" },
  { name: "Âmbar", value: "#ffa000" },
]

// Paleta de cores para o tema do app (substituirá o vermelho padrão)
const appThemeColors = [
  { name: "Vermelho", value: "#b71c1c" },
  { name: "Azul", value: "#1976d2" },
  { name: "Verde", value: "#388e3c" },
  { name: "Roxo", value: "#7b1fa2" },
  { name: "Laranja", value: "#f57c00" },
  { name: "Rosa", value: "#c2185b" },
  { name: "Ciano", value: "#0097a7" },
  { name: "Índigo", value: "#303f9f" },
  { name: "Âmbar", value: "#ffa000" },
  { name: "Teal", value: "#00796b" },
  { name: "Lime", value: "#827717" },
  { name: "Deep Orange", value: "#d84315" },
]

// Moedas mais usadas
const currencies = [
  { code: "BRL", symbol: "R$", name: "Real Brasileiro" },
  { code: "USD", symbol: "$", name: "Dólar Americano" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "Libra Esterlina" },
  { code: "JPY", symbol: "¥", name: "Iene Japonês" },
  { code: "CAD", symbol: "C$", name: "Dólar Canadense" },
  { code: "AUD", symbol: "A$", name: "Dólar Australiano" },
  { code: "CHF", symbol: "CHF", name: "Franco Suíço" },
]

// Idiomas principais
const languages = [
  { code: "pt-BR", name: "Português (Brasil)" },
  { code: "en-US", name: "English (US)" },
  { code: "es-ES", name: "Español" },
  { code: "fr-FR", name: "Français" },
  { code: "de-DE", name: "Deutsch" },
  { code: "it-IT", name: "Italiano" },
  { code: "ja-JP", name: "日本語" },
  { code: "zh-CN", name: "中文" },
]

// Mapeamento de locales do date-fns
const localeMap: Record<string, any> = {
  "pt-BR": ptBR,
  "en-US": enUS,
  "es-ES": es,
  "fr-FR": fr,
  "de-DE": de,
  "it-IT": it,
  "ja-JP": ja,
  "zh-CN": zhCN,
}

type Milestone = {
  hours: number
  label: string
  description: string
}

const milestones: Milestone[] = [
  { hours: 24, label: "24 Horas", description: "Primeiro dia completo!" },
  { hours: 72, label: "3 Dias", description: "Fase crítica superada!" },
  { hours: 168, label: "1 Semana", description: "Uma semana de vitória!" },
  { hours: 336, label: "2 Semanas", description: "Duas semanas fortes!" },
  { hours: 720, label: "1 Mês", description: "Um mês de conquista!" },
  { hours: 2160, label: "3 Meses", description: "Trimestre vitorioso!" },
  { hours: 4320, label: "6 Meses", description: "Meio ano livre!" },
  { hours: 8760, label: "1 Ano", description: "Um ano de liberdade!" },
]

type TrackedAddiction = {
  id: string
  addictionId: string
  addictionType: "vicio" | "habito"
  startDate: string
  startTime: string
  resets: string[]
  customIcon?: string
  customColor?: string
  customName?: string
  progressType?: "circle" | "line"
  // Impactos
  impactMoney?: number
  impactTime?: number
  impactEvent?: string
  reason?: string
}

const motivationalQuotes = [
  "Você é mais forte do que pensa! 💪",
  "Cada dia é uma vitória! 🏆",
  "Continue firme, você consegue! 🔥",
  "Sua força inspira outros! ⭐",
  "O melhor ainda está por vir! 🌟",
  "Você está no controle! 🎯",
  "Orgulhe-se do seu progresso! 👏",
  "Um dia de cada vez! 🌅",
  "Você é um guerreiro! ⚔️",
  "Liberdade é o seu destino! 🦅",
]

// Base de conhecimento para ajuda (expandida e aprofundada)
const helpKnowledgeBase = [
  {
    keywords: ["recaída", "recai", "voltei", "falhei", "erro", "caí", "cedi"],
    response: `**Recaídas: Como Transformar Falhas em Aprendizado**

Primeiro, respire fundo. Recaídas NÃO significam fracasso total - são parte natural do processo de recuperação. Estudos mostram que a maioria das pessoas precisa de 5-7 tentativas antes de conseguir superar um vício definitivamente.

**Por que recaídas acontecem:**
• **Neuroplasticidade**: Seu cérebro criou caminhos neurais fortes ao longo do tempo. Quebrar esses padrões leva tempo
• **Gatilhos não identificados**: Situações, emoções ou ambientes que você ainda não reconheceu
• **Expectativas irreais**: Esperar perfeição desde o início cria pressão excessiva
• **Falta de estratégias alternativas**: Não ter um "plano B" quando a vontade surge

**O que fazer AGORA (protocolo de emergência):**
1. **Não entre em espiral de culpa** - Autocrítica excessiva aumenta chances de nova recaída
2. **Documente o momento** - Anote: onde estava, como se sentia, o que aconteceu antes
3. **Identifique o gatilho real** - Foi estresse? Tédio? Ambiente? Pessoa específica?
4. **Reinicie IMEDIATAMENTE** - Quanto mais rápido voltar, menor o impacto psicológico
5. **Ajuste sua estratégia** - Use o que aprendeu para fortalecer seu plano

**Técnicas comprovadas para prevenir próxima recaída:**
• **Mapeamento de gatilhos**: Crie uma lista de situações de risco e planos específicos para cada
• **Rede de apoio ativa**: Tenha 3 pessoas que pode ligar em momentos críticos
• **Substituição comportamental**: Tenha atividades prontas para fazer quando sentir vontade
• **Mindfulness**: Pratique observar a vontade sem julgamento - ela passa em 10-15 minutos

**Lembre-se**: Cada recaída te ensina algo novo sobre seus padrões. Use esse conhecimento! 💪`
  },
  {
    keywords: ["vontade", "desejo", "tentação", "difícil", "resistir", "urgência", "compulsão"],
    response: `**Dominando a Vontade: Técnicas Científicas de Controle**

A vontade é uma onda - ela sobe, atinge o pico e desce. Estudos mostram que a intensidade máxima dura apenas 10-15 minutos. Seu objetivo é surfar essa onda sem ceder.

**Entendendo a neurociência da vontade:**
• **Dopamina**: Seu cérebro antecipa o prazer e libera dopamina ANTES do ato
• **Ciclo de recompensa**: Quanto mais você cede, mais forte fica o circuito neural
• **Janela crítica**: Os primeiros 5 minutos são os mais difíceis - depois fica mais fácil

**Técnicas imediatas (use AGORA):**

**1. Técnica dos 10 Minutos**
- Diga: "Vou esperar 10 minutos"
- Configure um timer
- Faça QUALQUER outra coisa nesse tempo
- 80% das vontades passam nesse período

**2. Respiração 4-7-8 (comprovada cientificamente)**
- Inspire pelo nariz contando até 4
- Segure a respiração contando até 7
- Expire pela boca contando até 8
- Repita 4 vezes
- Ativa o sistema nervoso parassimpático (relaxamento)

**3. Técnica HALT (Check-in emocional)**
Pergunte-se: Estou...
- **H**ungry (com fome)?
- **A**ngry (com raiva)?
- **L**onely (sozinho)?
- **T**ired (cansado)?
Se sim para qualquer um, resolva ISSO primeiro - não é realmente sobre o vício

**4. Visualização de Consequências**
- Feche os olhos
- Visualize VIVIDAMENTE como se sentirá DEPOIS de ceder
- Culpa, vergonha, perda de progresso
- Agora visualize como se sentirá DEPOIS de resistir
- Orgulho, força, progresso mantido

**5. Distração Física Intensa**
- 20 flexões ou polichinelos
- Banho gelado de 2 minutos
- Caminhar rapidamente por 10 minutos
- Exercício físico interrompe o circuito mental

**6. Técnica do "Surfar a Onda"**
- Não lute contra a vontade
- Observe-a como um cientista
- "Interessante, estou sentindo vontade agora"
- Note como ela muda de intensidade
- Aceite que ela está ali, mas você não precisa agir

**Estratégias preventivas (use DIARIAMENTE):**
• **Manhã**: Reforce seu "porquê" - releia seus motivos
• **Tarde**: Check-in emocional - como está se sentindo?
• **Noite**: Planeje o dia seguinte - identifique possíveis gatilhos

**Lembre-se**: A vontade é temporária. Sua determinação é permanente. Você JÁ resistiu antes - pode fazer de novo! 🔥`
  },
  {
    keywords: ["ansiedade", "ansioso", "nervoso", "estresse", "estressado", "preocupado", "tenso"],
    response: `**Ansiedade e Estresse: Gerenciamento Profundo**

Ansiedade e estresse são os gatilhos #1 para recaídas. Por quê? Porque seu cérebro busca alívio rápido, e o vício era sua "solução" antiga. Vamos criar novas soluções mais saudáveis.

**Entendendo a conexão ansiedade-vício:**
• **Ciclo vicioso**: Ansiedade → Vício → Alívio temporário → Culpa → Mais ansiedade
• **Tolerância ao estresse**: Seu cérebro precisa reaprender a lidar com desconforto
• **Regulação emocional**: Vícios eram sua forma de "desligar" emoções difíceis

**Técnicas de alívio imediato (0-5 minutos):**

**1. Grounding 5-4-3-2-1**
Identifique em voz alta:
- 5 coisas que você VÊ
- 4 coisas que você TOCA
- 3 coisas que você OUVE
- 2 coisas que você CHEIRA
- 1 coisa que você SABOREIA
*Por que funciona*: Traz você de volta ao presente, interrompe espiral ansiosa

**2. Respiração Diafragmática**
- Mão no peito, mão na barriga
- Inspire profundamente pelo nariz (barriga sobe, peito não)
- Expire lentamente pela boca
- 5 minutos reduzem cortisol (hormônio do estresse) em 30%

**3. Técnica do Gelo**
- Segure gelo na mão por 30 segundos
- Ou lave o rosto com água gelada
- Choque sensorial interrompe ataque de ansiedade

**Estratégias de médio prazo (diárias):**

**1. Exercício Físico (ESSENCIAL)**
- 30 minutos de atividade moderada
- Libera endorfina, serotonina, dopamina naturalmente
- Reduz ansiedade em até 50% (comprovado)
- Caminhada rápida já funciona!

**2. Meditação/Mindfulness**
- Comece com 5 minutos/dia
- Apps: Headspace, Calm, Insight Timer
- Estudos: 8 semanas de prática reduzem ansiedade em 40%
- Foco: observar pensamentos sem julgamento

**3. Journaling (Escrita Terapêutica)**
- 10 minutos antes de dormir
- Escreva: "Hoje me senti... porque..."
- Externalizar pensamentos reduz carga mental
- Identifica padrões ao longo do tempo

**4. Rotina de Sono**
- Dormir/acordar no mesmo horário
- Sem telas 1h antes de dormir
- Quarto escuro, fresco, silencioso
- Sono ruim = ansiedade 3x maior

**Estratégias de longo prazo:**

**1. Terapia Cognitivo-Comportamental (TCC)**
- Mais eficaz para ansiedade + vícios
- Ensina a identificar pensamentos distorcidos
- Cria estratégias personalizadas
- Considere buscar um psicólogo

**2. Rede de Apoio**
- Compartilhe com pessoas de confiança
- Grupos de apoio (online ou presencial)
- Não carregue tudo sozinho

**3. Limite Cafeína e Açúcar**
- Ambos aumentam ansiedade
- Substitua por água, chás calmantes
- Alimentação equilibrada = mente equilibrada

**Quando buscar ajuda profissional:**
- Ansiedade interfere em atividades diárias
- Ataques de pânico frequentes
- Pensamentos intrusivos constantes
- Isolamento social

**Lembre-se**: Ansiedade não é fraqueza. É seu sistema nervoso em alerta. Você pode treiná-lo a se acalmar. 🌟`
  },
  {
    keywords: ["motivação", "desanimo", "desanimado", "cansado", "desistir", "sem forças", "perdido"],
    response: `**Recuperando a Motivação: Estratégias Psicológicas Profundas**

Perder motivação é NORMAL e ESPERADO. Motivação é como uma onda - sobe e desce. O segredo não é ter motivação constante, mas ter SISTEMAS que funcionam mesmo sem motivação.

**Por que a motivação desaparece:**
• **Efeito novidade**: Empolgação inicial passa após 2-3 semanas
• **Falta de resultados visíveis**: Mudanças internas demoram a aparecer externamente
• **Fadiga de decisão**: Resistir constantemente cansa mentalmente
• **Comparação**: Ver outros "perfeitos" nas redes sociais desmotiva

**Mudança de mindset fundamental:**
❌ "Preciso de motivação para continuar"
✅ "Vou continuar até a motivação voltar"

**Estratégias para reacender a chama:**

**1. Reconecte com seu PORQUÊ profundo**
Escreva respostas honestas:
- Por que comecei essa jornada?
- Que dor quero evitar?
- Que futuro quero criar?
- Quem eu quero me tornar?
- Quem depende de mim?

**2. Celebre Micro-Vitórias**
Cada dia livre É uma conquista:
- 1 dia = Você tomou a decisão
- 3 dias = Você superou o mais difícil
- 1 semana = Você provou que consegue
- 1 mês = Você mudou padrões de anos
Comemore CADA marco!

**3. Visualização do Futuro Eu**
- Feche os olhos
- Imagine você daqui a 1 ano, livre do vício
- Como você se sente? Como se vê?
- O que conquistou? Como as pessoas te veem?
- Que oportunidades se abriram?
- Esse futuro vale a luta de hoje?

**4. Lista de Benefícios Tangíveis**
Anote TUDO que melhorou:
- Saúde física (mais energia, melhor sono)
- Saúde mental (menos culpa, mais autoestima)
- Financeiro (quanto economizou?)
- Relacionamentos (quem se aproximou?)
- Tempo (o que fez com horas recuperadas?)

**5. Transforme em Jogo (Gamificação)**
- Cada dia = +1 ponto
- Cada semana = +10 pontos
- Cada mês = +50 pontos
- Crie recompensas para marcos
- Use o dinheiro economizado para presentes

**6. Conecte-se com Comunidade**
- Grupos online de apoio
- Fóruns (Reddit: r/addiction, r/stopdrinking, etc)
- Compartilhe sua história
- Inspire outros = se inspira também

**7. Documente a Jornada**
- Tire foto no dia 1, 30, 60, 90
- Escreva diário semanal
- Grave vídeos para você mesmo
- Ver progresso visual motiva MUITO

**Técnica do "Só por hoje":**
Não pense em "nunca mais"
Pense em "só por hoje, não vou ceder"
Amanhã, repita: "só por hoje"
Um dia de cada vez = anos de liberdade

**Quando a motivação falha, use DISCIPLINA:**
- Motivação = sentimento (instável)
- Disciplina = ação (estável)
- Faça mesmo sem vontade
- Ação cria motivação, não o contrário

**Recompensas estratégicas:**
Use o dinheiro/tempo economizado:
- 1 semana: Algo pequeno que gosta
- 1 mês: Jantar especial, roupa nova
- 3 meses: Viagem curta, hobby novo
- 1 ano: Algo que sempre quis

**Lembre-se**: Você já chegou até aqui. Isso PROVA que você é capaz. Dias ruins não apagam dias bons. Continue! 💎`
  },
  {
    keywords: ["gatilho", "situação", "ambiente", "pessoas", "evitar", "trigger"],
    response: `**Dominando Gatilhos: Guia Completo de Identificação e Prevenção**

Gatilhos são estímulos que ativam o desejo pelo vício. Identificá-los e gerenciá-los é 80% do sucesso na recuperação.

**Tipos de gatilhos:**

**1. Gatilhos Emocionais (mais comuns)**
- Estresse, ansiedade, tédio
- Solidão, tristeza, raiva
- Até emoções positivas (celebração)

**2. Gatilhos Ambientais**
- Lugares específicos
- Horários do dia
- Objetos relacionados ao vício

**3. Gatilhos Sociais**
- Pessoas específicas
- Eventos sociais
- Pressão de grupo

**4. Gatilhos Físicos**
- Cansaço extremo
- Fome, sede
- Dor física

**Exercício de Mapeamento (FAÇA AGORA):**

Pegue papel e caneta. Para cada recaída ou vontade forte, anote:
- **Quando**: Dia, hora
- **Onde**: Local exato
- **Com quem**: Sozinho ou acompanhado?
- **Sentindo**: Emoção predominante
- **Antes**: O que aconteceu 30min antes?

Após 1 semana, você verá PADRÕES claros.

**Estratégias por tipo de gatilho:**

**Para Gatilhos Emocionais:**
- **Estresse**: Respiração, exercício, meditação
- **Tédio**: Lista de 10 atividades alternativas prontas
- **Solidão**: Ligar para alguém, ir a lugar público
- **Raiva**: Exercício intenso, socar travesseiro, escrever carta (não enviar)

**Para Gatilhos Ambientais:**
- **Evite** lugares de risco nas primeiras semanas
- **Mude rotas**: Vá por caminhos diferentes
- **Remova objetos**: Tudo que lembra o vício
- **Crie novos ambientes**: Reorganize quarto, mude decoração

**Para Gatilhos Sociais:**
- **Comunique-se**: Avise pessoas próximas sobre sua jornada
- **Estabeleça limites**: "Não vou a X lugar por enquanto"
- **Tenha frase pronta**: "Não, obrigado. Estou bem assim"
- **Saia de situações**: Não é covardia, é estratégia

**Para Gatilhos Físicos:**
- **Rotina de sono**: 7-9h por noite
- **Alimentação regular**: Não pule refeições
- **Hidratação**: 2L água/dia
- **Exercício**: 30min/dia

**Plano de Emergência (tenha SEMPRE):**

**Se encontrar gatilho inesperado:**
1. **Reconheça**: "Isso é um gatilho"
2. **Respire**: 3 respirações profundas
3. **Saia**: Fisicamente, se possível
4. **Ligue**: Para alguém da rede de apoio
5. **Distraia**: Atividade da lista preparada

**Lista de Distração Emergencial (prepare AGORA):**
- 3 pessoas para ligar
- 5 atividades físicas (caminhar, flexões, etc)
- 3 lugares seguros para ir
- 2 hobbies que pode fazer imediatamente
- 1 mantra pessoal ("Eu sou mais forte que isso")

**Técnica de Dessensibilização (avançado):**
Após 30+ dias limpo:
- Exponha-se gradualmente a gatilhos menores
- Com rede de apoio presente
- Prove para si mesmo que pode resistir
- Aumenta confiança e reduz poder do gatilho

**Lembre-se**: Gatilhos perdem força com o tempo. Cada vez que você resiste, o circuito neural enfraquece. Você está reprogramando seu cérebro! 🎯`
  }
]

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  
  // Aba 1
  const [selectedAddiction, setSelectedAddiction] = useState<string>("")
  const [addictionType, setAddictionType] = useState<"vicio" | "habito">("vicio")
  
  // Aba 2
  const [selectedImpact, setSelectedImpact] = useState<"money" | "time" | "event" | null>(null)
  const [impactMoney, setImpactMoney] = useState<string>("")
  const [impactTime, setImpactTime] = useState<string>("")
  const [impactEvent, setImpactEvent] = useState<string>("")
  const [reason, setReason] = useState<string>("")
  
  // Aba 3
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [startTime, setStartTime] = useState<string>(format(new Date(), "HH:mm"))
  const [selectedHour, setSelectedHour] = useState<number>(new Date().getHours())
  const [selectedMinute, setSelectedMinute] = useState<number>(new Date().getMinutes())
  
  const [trackedAddictions, setTrackedAddictions] = useState<TrackedAddiction[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [currentQuote, setCurrentQuote] = useState("")
  const [mounted, setMounted] = useState(false)
  
  // Estados para configurações
  const [configDialogOpen, setConfigDialogOpen] = useState(false)
  const [editingAddiction, setEditingAddiction] = useState<TrackedAddiction | null>(null)
  const [newIcon, setNewIcon] = useState("")
  const [newColor, setNewColor] = useState("")
  const [newName, setNewName] = useState("")
  const [progressType, setProgressType] = useState<"circle" | "line">("circle")

  // Estados para confirmação de ações
  const [confirmResetDialog, setConfirmResetDialog] = useState(false)
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)
  const [actionTargetId, setActionTargetId] = useState<string | null>(null)

  // Estados para menu de ajuda
  const [helpDialogOpen, setHelpDialogOpen] = useState(false)
  const [helpMessages, setHelpMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([])
  const [helpInput, setHelpInput] = useState("")

  // Estados para configurações gerais
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState("BRL")
  const [selectedLanguage, setSelectedLanguage] = useState("pt-BR")
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [dailyMotivationEnabled, setDailyMotivationEnabled] = useState(true)
  const [appThemeColor, setAppThemeColor] = useState("#b71c1c") // Cor do tema do app

  // Estado para política de privacidade
  const [privacyDialogOpen, setPrivacyDialogOpen] = useState(false)

  // Carregar dados salvos
  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem("addiction-tracker-v2")
      if (saved) {
        const data = JSON.parse(saved)
        setTrackedAddictions(data)
      }

      // Carregar configurações
      const savedSettings = localStorage.getItem("app-settings")
      if (savedSettings) {
        const settings = JSON.parse(savedSettings)
        setSelectedCurrency(settings.currency || "BRL")
        setSelectedLanguage(settings.language || "pt-BR")
        setThemeMode(settings.theme || "light")
        setNotificationsEnabled(settings.notifications ?? true)
        setDailyMotivationEnabled(settings.dailyMotivation ?? true)
        setAppThemeColor(settings.appThemeColor || "#b71c1c")
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
    }

    setCurrentQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)])
  }, [])

  // Salvar dados
  useEffect(() => {
    if (mounted && trackedAddictions.length > 0) {
      try {
        localStorage.setItem("addiction-tracker-v2", JSON.stringify(trackedAddictions))
      } catch (error) {
        console.error("Erro ao salvar dados:", error)
      }
    }
  }, [trackedAddictions, mounted])

  // Salvar configurações
  useEffect(() => {
    if (mounted) {
      try {
        const settings = {
          currency: selectedCurrency,
          language: selectedLanguage,
          theme: themeMode,
          notifications: notificationsEnabled,
          dailyMotivation: dailyMotivationEnabled,
          appThemeColor: appThemeColor,
        }
        localStorage.setItem("app-settings", JSON.stringify(settings))
      } catch (error) {
        console.error("Erro ao salvar configurações:", error)
      }
    }
  }, [selectedCurrency, selectedLanguage, themeMode, notificationsEnabled, dailyMotivationEnabled, appThemeColor, mounted])

  // Atualizar startTime quando hora/minuto mudar
  useEffect(() => {
    const formattedTime = `${String(selectedHour).padStart(2, '0')}:${String(selectedMinute).padStart(2, '0')}`
    setStartTime(formattedTime)
  }, [selectedHour, selectedMinute])

  const resetDialog = () => {
    setCurrentStep(1)
    setSelectedAddiction("")
    setAddictionType("vicio")
    setSelectedImpact(null)
    setImpactMoney("")
    setImpactTime("")
    setImpactEvent("")
    setReason("")
    setStartDate(new Date())
    const now = new Date()
    setSelectedHour(now.getHours())
    setSelectedMinute(now.getMinutes())
    setStartTime(format(now, "HH:mm"))
  }

  const handleAddAddiction = () => {
    if (!selectedAddiction) return

    const newTracked: TrackedAddiction = {
      id: Date.now().toString(),
      addictionId: selectedAddiction,
      addictionType,
      startDate: format(startDate, "yyyy-MM-dd"),
      startTime,
      resets: [],
      progressType: "circle",
      impactMoney: selectedImpact === "money" && impactMoney ? parseFloat(impactMoney) : undefined,
      impactTime: selectedImpact === "time" && impactTime ? parseFloat(impactTime) : undefined,
      impactEvent: selectedImpact === "event" && impactEvent ? impactEvent : undefined,
      reason: reason || undefined,
    }

    setTrackedAddictions([...trackedAddictions, newTracked])
    setIsDialogOpen(false)
    resetDialog()
  }

  const handleResetAddiction = (id: string) => {
    setActionTargetId(id)
    setConfirmResetDialog(true)
  }

  const confirmReset = () => {
    if (!actionTargetId) return
    
    const now = new Date()
    setTrackedAddictions(
      trackedAddictions.map((addiction) => {
        if (addiction.id === actionTargetId) {
          return {
            ...addiction,
            startDate: format(now, "yyyy-MM-dd"),
            startTime: format(now, "HH:mm"),
            resets: [...addiction.resets, now.toISOString()],
          }
        }
        return addiction
      })
    )
    
    setConfirmResetDialog(false)
    setActionTargetId(null)
  }

  const handleDeleteAddiction = (id: string) => {
    setActionTargetId(id)
    setConfirmDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (!actionTargetId) return
    
    const newAddictions = trackedAddictions.filter((a) => a.id !== actionTargetId)
    setTrackedAddictions(newAddictions)
    
    if (newAddictions.length === 0) {
      try {
        localStorage.removeItem("addiction-tracker-v2")
      } catch (error) {
        console.error("Erro ao remover dados:", error)
      }
    }
    
    setConfirmDeleteDialog(false)
    setActionTargetId(null)
  }

  const handleOpenConfig = (addiction: TrackedAddiction) => {
    setEditingAddiction(addiction)
    const addictionData = addictions.find((a) => a.id === addiction.addictionId)
    setNewIcon(addiction.customIcon || addictionData?.icon || "")
    setNewColor(addiction.customColor || "#b71c1c")
    setNewName(addiction.customName || addictionData?.name || "")
    setProgressType(addiction.progressType || "circle")
    setConfigDialogOpen(true)
  }

  const handleSaveConfig = () => {
    if (!editingAddiction) return

    setTrackedAddictions(
      trackedAddictions.map((addiction) => {
        if (addiction.id === editingAddiction.id) {
          return {
            ...addiction,
            customIcon: newIcon,
            customColor: newColor,
            customName: newName,
            progressType: progressType,
          }
        }
        return addiction
      })
    )
    setConfigDialogOpen(false)
    setEditingAddiction(null)
  }

  const handleShareProgress = (tracked: TrackedAddiction) => {
    const addictionData = addictions.find((a) => a.id === tracked.addictionId)
    const displayName = tracked.customName || addictionData?.name
    const { elapsedHours } = calculateProgress(tracked)
    const timeText = formatElapsedTime(elapsedHours)
    
    const shareText = `🎯 Estou ${timeText} livre de ${displayName}!\n\n#Liberdade #Superação`
    
    // Prioriza navigator.share se disponível
    if (navigator.share) {
      navigator.share({
        title: "Meu Progresso",
        text: shareText,
      }).catch(() => {
        // Fallback: mostra o texto para copiar manualmente
        alert(`Compartilhe seu progresso:\n\n${shareText}`)
      })
    } else {
      // Fallback: mostra o texto para copiar manualmente
      alert(`Compartilhe seu progresso:\n\n${shareText}`)
    }
  }

  const handleSendHelpMessage = () => {
    if (!helpInput.trim()) return

    const userMessage = helpInput.trim().toLowerCase()
    setHelpMessages([...helpMessages, { role: 'user', content: helpInput.trim() }])
    setHelpInput("")

    // Sistema inteligente de resposta baseado em palavras-chave
    setTimeout(() => {
      let response = ""
      
      // Buscar na base de conhecimento
      const matchedTopic = helpKnowledgeBase.find(topic => 
        topic.keywords.some(keyword => userMessage.includes(keyword))
      )

      if (matchedTopic) {
        response = matchedTopic.response
      } else {
        // Resposta genérica se não encontrar correspondência
        response = "Entendo sua situação. Superar um vício é um desafio diário que requer determinação e estratégia.\n\n**Dicas gerais importantes:**\n\n1. **Identifique seus gatilhos** - Reconheça situações que despertam a vontade\n2. **Tenha um plano de ação** - Saiba o que fazer quando a vontade surgir\n3. **Busque apoio** - Compartilhe sua jornada com pessoas de confiança\n4. **Celebre vitórias** - Cada dia livre é uma conquista!\n5. **Seja gentil consigo** - Recaídas podem acontecer, o importante é não desistir\n\n💡 **Dica:** Tente ser mais específico sobre sua dificuldade (ex: 'estou com vontade', 'tive uma recaída', 'estou ansioso') para receber orientações mais direcionadas.\n\nVocê não está sozinho nessa jornada! 💪"
      }
      
      setHelpMessages(prev => [...prev, { role: 'assistant', content: response }])
    }, 800)
  }

  const calculateProgress = (tracked: TrackedAddiction) => {
    const startDateTime = new Date(`${tracked.startDate}T${tracked.startTime}`)
    const now = new Date()
    const diffMs = now.getTime() - startDateTime.getTime()
    const diffHours = diffMs / (1000 * 60 * 60)

    const nextMilestone = milestones.find((m) => m.hours > diffHours) || milestones[milestones.length - 1]
    
    const previousMilestone = milestones.filter((m) => m.hours <= diffHours).pop()
    const previousHours = previousMilestone ? previousMilestone.hours : 0
    const nextHours = nextMilestone.hours
    
    const progressInRange = diffHours - previousHours
    const rangeSize = nextHours - previousHours
    const progress = (progressInRange / rangeSize) * 100

    return {
      elapsedHours: diffHours,
      progress: Math.min(Math.max(progress, 0), 100),
      nextMilestone,
    }
  }

  const formatElapsedTime = (hours: number) => {
    const days = Math.floor(hours / 24)
    const remainingHours = Math.floor(hours % 24)
    const minutes = Math.floor((hours % 1) * 60)

    if (days > 0) {
      return `${days}d ${remainingHours}h ${minutes}m`
    }
    if (remainingHours > 0) {
      return `${remainingHours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  const getCalendarDays = (tracked: TrackedAddiction) => {
    const now = new Date()
    const currentMonth = startOfMonth(now)
    const monthEnd = endOfMonth(now)
    
    const allDays = eachDayOfInterval({
      start: currentMonth,
      end: monthEnd,
    })

    const firstDayOfWeek = getDay(currentMonth)
    const emptyDays = Array(firstDayOfWeek).fill(null)

    const startDateTime = new Date(`${tracked.startDate}T${tracked.startTime}`)

    return {
      emptyDays,
      days: allDays.map((day) => {
        const isResetDay = tracked.resets.some((reset) => isSameDay(new Date(reset), day))
        const isVictoryDay = !isResetDay && day >= startOfDay(startDateTime) && day <= now
        
        return {
          date: day,
          isResetDay,
          isVictoryDay,
          isToday: isSameDay(day, now),
        }
      })
    }
  }

  // Calendário para seleção de data (Aba 3)
  const getSelectionCalendarDays = () => {
    const currentMonth = startOfMonth(startDate)
    const monthEnd = endOfMonth(startDate)
    
    const allDays = eachDayOfInterval({
      start: currentMonth,
      end: monthEnd,
    })

    const firstDayOfWeek = getDay(currentMonth)
    const emptyDays = Array(firstDayOfWeek).fill(null)

    return {
      emptyDays,
      days: allDays.map((day) => ({
        date: day,
        isSelected: isSameDay(day, startDate),
        isToday: isSameDay(day, new Date()),
      }))
    }
  }

  // Obter locale do date-fns baseado no idioma selecionado
  const currentLocale = localeMap[selectedLanguage] || ptBR

  if (!mounted) {
    return null
  }

  // Classes dinâmicas baseadas no tema
  const bgClass = themeMode === "dark" ? "bg-gray-900" : "bg-[#f5f5f5]"
  const cardBgClass = themeMode === "dark" ? "bg-gray-800" : "bg-white"
  const textPrimaryClass = themeMode === "dark" ? "text-gray-100" : "text-gray-900"
  const textSecondaryClass = themeMode === "dark" ? "text-gray-400" : "text-gray-600"
  const borderClass = themeMode === "dark" ? "border-gray-700" : "border-gray-200"
  const hoverBgClass = themeMode === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"
  const dialogBgClass = themeMode === "dark" ? "bg-gray-800" : "bg-white"
  const dialogTextClass = themeMode === "dark" ? "text-gray-100" : "text-gray-900"
  const inputBgClass = themeMode === "dark" ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"
  const selectBgClass = themeMode === "dark" ? "bg-gray-700 text-gray-100" : "bg-gray-50 text-gray-900"

  if (trackedAddictions.length === 0) {
    return (
      <>
        <div className={`flex flex-col items-center justify-center min-h-screen ${bgClass} p-6`}>
          <div className="text-center space-y-10">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold ${textPrimaryClass} mb-6`}>
              Liberte-se
            </h1>
            <p className={`text-lg sm:text-xl ${textSecondaryClass} max-w-md mx-auto mb-16`}>
              Comece sua jornada de superação hoje
            </p>

            <Button
              onClick={() => setIsDialogOpen(true)}
              className="w-56 h-56 sm:w-64 sm:h-64 rounded-full text-white text-2xl sm:text-3xl font-bold shadow-2xl transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: appThemeColor,
                boxShadow: `0 25px 50px -12px ${appThemeColor}40`
              }}
            >
              Começar
            </Button>
          </div>
        </div>

        {/* Dialog com sistema de abas */}
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) resetDialog()
        }}>
          <DialogContent className={`sm:max-w-xl max-h-[85vh] overflow-hidden flex flex-col ${dialogBgClass}`}>
            <DialogHeader>
              <DialogTitle className={`text-xl ${dialogTextClass}`}>
                {currentStep === 1 && "Selecione seu desafio"}
                {currentStep === 2 && "Como isso te afeta?"}
                {currentStep === 3 && "Quando você começou?"}
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto py-4 px-1">
              {/* ABA 1 - Seleção do vício com SELECT */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label className={`text-sm font-semibold ${dialogTextClass}`}>Escolha o que deseja superar</Label>
                    <Select value={selectedAddiction} onValueChange={setSelectedAddiction}>
                      <SelectTrigger className={`h-12 text-sm ${inputBgClass}`}>
                        <SelectValue placeholder="Selecione um vício ou mau hábito" />
                      </SelectTrigger>
                      <SelectContent className={dialogBgClass}>
                        {addictions.map((addiction) => (
                          <SelectItem key={addiction.id} value={addiction.id} className={`text-sm py-2 ${dialogTextClass}`}>
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{addiction.icon}</span>
                              <span className="font-medium">{addiction.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className={`text-sm font-semibold ${dialogTextClass}`}>Tipo</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setAddictionType("vicio")}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          addictionType === "vicio"
                            ? themeMode === "dark" ? "bg-gray-700" : "bg-red-50"
                            : themeMode === "dark" ? "border-gray-600 hover:border-gray-500" : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={addictionType === "vicio" ? { borderColor: appThemeColor } : {}}
                      >
                        <div className="text-2xl mb-1">🚫</div>
                        <div className={`font-semibold text-base ${dialogTextClass}`}>Vício</div>
                        <div className={`text-xs ${textSecondaryClass} mt-1`}>Dependência física/psicológica</div>
                      </button>
                      <button
                        onClick={() => setAddictionType("habito")}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          addictionType === "habito"
                            ? themeMode === "dark" ? "bg-gray-700" : "bg-red-50"
                            : themeMode === "dark" ? "border-gray-600 hover:border-gray-500" : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={addictionType === "habito" ? { borderColor: appThemeColor } : {}}
                      >
                        <div className="text-2xl mb-1">🔄</div>
                        <div className={`font-semibold text-base ${dialogTextClass}`}>Mau Hábito</div>
                        <div className={`text-xs ${textSecondaryClass} mt-1`}>Comportamento prejudicial</div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ABA 2 - Impactos */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <div className="space-y-3">
                    <Label className={`text-sm font-semibold ${dialogTextClass}`}>Selecione um tipo de impacto (opcional)</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => setSelectedImpact(selectedImpact === "money" ? null : "money")}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedImpact === "money"
                            ? themeMode === "dark" ? "bg-gray-700 shadow-lg" : "bg-red-50 shadow-lg"
                            : themeMode === "dark" ? "border-gray-600 hover:border-gray-500" : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={selectedImpact === "money" ? { borderColor: appThemeColor } : {}}
                      >
                        <div className="text-3xl mb-2">💰</div>
                        <div className={`text-sm font-semibold ${dialogTextClass}`}>Financeiro</div>
                      </button>
                      <button
                        onClick={() => setSelectedImpact(selectedImpact === "time" ? null : "time")}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedImpact === "time"
                            ? themeMode === "dark" ? "bg-gray-700 shadow-lg" : "bg-red-50 shadow-lg"
                            : themeMode === "dark" ? "border-gray-600 hover:border-gray-500" : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={selectedImpact === "time" ? { borderColor: appThemeColor } : {}}
                      >
                        <div className="text-3xl mb-2">⏰</div>
                        <div className={`text-sm font-semibold ${dialogTextClass}`}>Tempo</div>
                      </button>
                      <button
                        onClick={() => setSelectedImpact(selectedImpact === "event" ? null : "event")}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedImpact === "event"
                            ? themeMode === "dark" ? "bg-gray-700 shadow-lg" : "bg-red-50 shadow-lg"
                            : themeMode === "dark" ? "border-gray-600 hover:border-gray-500" : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={selectedImpact === "event" ? { borderColor: appThemeColor } : {}}
                      >
                        <div className="text-3xl mb-2">⚠️</div>
                        <div className={`text-sm font-semibold ${dialogTextClass}`}>Evento</div>
                      </button>
                    </div>
                  </div>

                  {selectedImpact === "money" && (
                    <div className="space-y-2 animate-in fade-in duration-300">
                      <Label className={`text-sm font-semibold flex items-center gap-2 ${dialogTextClass}`}>
                        💰 Impacto Financeiro
                      </Label>
                      <p className={`text-xs ${textSecondaryClass}`}>Quanto você gastava por mês?</p>
                      <div className="relative">
                        <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${textSecondaryClass} text-sm`}>
                          {currencies.find(c => c.code === selectedCurrency)?.symbol || "R$"}
                        </span>
                        <Input
                          type="number"
                          value={impactMoney}
                          onChange={(e) => setImpactMoney(e.target.value)}
                          placeholder="0,00"
                          className={`h-10 pl-10 text-sm ${inputBgClass}`}
                        />
                      </div>
                    </div>
                  )}

                  {selectedImpact === "time" && (
                    <div className="space-y-2 animate-in fade-in duration-300">
                      <Label className={`text-sm font-semibold flex items-center gap-2 ${dialogTextClass}`}>
                        ⏰ Impacto de Tempo
                      </Label>
                      <p className={`text-xs ${textSecondaryClass}`}>Quantas horas por dia você dedicava?</p>
                      <div className="relative">
                        <Input
                          type="number"
                          value={impactTime}
                          onChange={(e) => setImpactTime(e.target.value)}
                          placeholder="0"
                          className={`h-10 text-sm ${inputBgClass}`}
                        />
                        <span className={`absolute right-3 top-1/2 -translate-y-1/2 ${textSecondaryClass} text-xs`}>horas/dia</span>
                      </div>
                    </div>
                  )}

                  {selectedImpact === "event" && (
                    <div className="space-y-2 animate-in fade-in duration-300">
                      <Label className={`text-sm font-semibold flex items-center gap-2 ${dialogTextClass}`}>
                        ⚠️ Acontecimento Marcante
                      </Label>
                      <p className={`text-xs ${textSecondaryClass}`}>Algum evento que te motivou a parar?</p>
                      <Input
                        value={impactEvent}
                        onChange={(e) => setImpactEvent(e.target.value)}
                        placeholder="Ex: Perdi uma oportunidade importante"
                        className={`h-10 text-sm ${inputBgClass}`}
                      />
                    </div>
                  )}

                  <div className={`space-y-2 pt-3 border-t ${borderClass}`}>
                    <Label className={`text-sm font-semibold flex items-center gap-2 ${dialogTextClass}`}>
                      💭 Por que você quer parar? <span className={`text-xs ${textSecondaryClass} font-normal`}>(opcional)</span>
                    </Label>
                    <Textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Escreva aqui sua motivação..."
                      className={`min-h-20 resize-none text-sm ${inputBgClass}`}
                    />
                  </div>
                </div>
              )}

              {/* ABA 3 - Data e Horário */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label className={`text-sm font-semibold flex items-center gap-2 ${dialogTextClass}`}>
                      <Calendar className="w-4 h-4" />
                      Selecione a data de início
                    </Label>
                    
                    <div className={`${themeMode === "dark" ? "bg-gray-700" : "bg-gray-50"} rounded-lg p-3`}>
                      <div className="flex items-center justify-between mb-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setStartDate(new Date(startDate.getFullYear(), startDate.getMonth() - 1, 1))}
                          className={`h-8 w-8 p-0 ${themeMode === "dark" ? "hover:bg-gray-600" : ""}`}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <h3 className={`font-semibold text-sm ${dialogTextClass}`}>
                          {format(startDate, "MMMM yyyy", { locale: currentLocale })}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setStartDate(new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1))}
                          className={`h-8 w-8 p-0 ${themeMode === "dark" ? "hover:bg-gray-600" : ""}`}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-7 gap-1 mb-1">
                        {['D', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, idx) => (
                          <div key={`weekday-${idx}`} className={`text-center text-xs font-semibold ${textSecondaryClass} py-1`}>
                            {day}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {getSelectionCalendarDays().emptyDays.map((_, index) => (
                          <div key={`empty-${index}`} className="aspect-square" />
                        ))}
                        
                        {getSelectionCalendarDays().days.map((day, index) => (
                          <button
                            key={`day-${index}-${format(day.date, 'yyyy-MM-dd')}`}
                            onClick={() => setStartDate(day.date)}
                            className={`aspect-square rounded-md flex items-center justify-center text-xs font-semibold transition-all ${
                              day.isSelected
                                ? "text-white scale-105 shadow-md"
                                : day.isToday
                                ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                : themeMode === "dark"
                                ? "hover:bg-gray-600 text-gray-300"
                                : "hover:bg-gray-200 text-gray-700"
                            }`}
                            style={day.isSelected ? { backgroundColor: appThemeColor } : {}}
                          >
                            {format(day.date, "d")}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className={`text-sm font-semibold flex items-center gap-2 ${dialogTextClass}`}>
                      <Clock className="w-4 h-4" />
                      Selecione o horário
                    </Label>
                    
                    <div className={`${themeMode === "dark" ? "bg-gradient-to-br from-gray-700 to-gray-800" : "bg-gradient-to-br from-gray-50 to-gray-100"} rounded-xl p-5 shadow-inner`}>
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex flex-col items-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedHour((selectedHour + 1) % 24)}
                            className={`mb-1 h-7 w-7 p-0 ${themeMode === "dark" ? "hover:bg-gray-600" : "hover:bg-white/50"}`}
                          >
                            <ChevronUp className="w-4 h-4" />
                          </Button>
                          <div className={`${themeMode === "dark" ? "bg-gray-600" : "bg-white"} rounded-lg shadow-lg px-4 py-3 min-w-[60px] text-center`}>
                            <div className={`text-3xl font-bold ${dialogTextClass} tabular-nums`}>
                              {String(selectedHour).padStart(2, '0')}
                            </div>
                            <div className={`text-[10px] ${textSecondaryClass} mt-0.5 font-semibold`}>HORA</div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedHour((selectedHour - 1 + 24) % 24)}
                            className={`mt-1 h-7 w-7 p-0 ${themeMode === "dark" ? "hover:bg-gray-600" : "hover:bg-white/50"}`}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className={`text-3xl font-bold ${textSecondaryClass} pb-6`}>:</div>

                        <div className="flex flex-col items-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedMinute((selectedMinute + 1) % 60)}
                            className={`mb-1 h-7 w-7 p-0 ${themeMode === "dark" ? "hover:bg-gray-600" : "hover:bg-white/50"}`}
                          >
                            <ChevronUp className="w-4 h-4" />
                          </Button>
                          <div className={`${themeMode === "dark" ? "bg-gray-600" : "bg-white"} rounded-lg shadow-lg px-4 py-3 min-w-[60px] text-center`}>
                            <div className={`text-3xl font-bold ${dialogTextClass} tabular-nums`}>
                              {String(selectedMinute).padStart(2, '0')}
                            </div>
                            <div className={`text-[10px] ${textSecondaryClass} mt-0.5 font-semibold`}>MIN</div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedMinute((selectedMinute - 1 + 60) % 60)}
                            className={`mt-1 h-7 w-7 p-0 ${themeMode === "dark" ? "hover:bg-gray-600" : "hover:bg-white/50"}`}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex gap-2 justify-center mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const now = new Date()
                            setSelectedHour(now.getHours())
                            setSelectedMinute(now.getMinutes())
                          }}
                          className={`h-7 text-xs ${themeMode === "dark" ? "bg-gray-600 hover:bg-gray-500" : "bg-white hover:bg-gray-50"}`}
                        >
                          Agora
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedHour(0)
                            setSelectedMinute(0)
                          }}
                          className={`h-7 text-xs ${themeMode === "dark" ? "bg-gray-600 hover:bg-gray-500" : "bg-white hover:bg-gray-50"}`}
                        >
                          00:00
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedHour(12)
                            setSelectedMinute(0)
                          }}
                          className={`h-7 text-xs ${themeMode === "dark" ? "bg-gray-600 hover:bg-gray-500" : "bg-white hover:bg-gray-50"}`}
                        >
                          12:00
                        </Button>
                      </div>
                    </div>
                    
                    <p className={`text-xs ${textSecondaryClass} text-center`}>
                      Horário de Brasília (GMT-3)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Barra de progresso e navegação */}
            <div className={`border-t pt-4 mt-2 ${borderClass}`}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-shrink-0">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={`step-${step}`}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                        step === currentStep
                          ? "text-white scale-110"
                          : step < currentStep
                          ? "bg-green-500 text-white"
                          : themeMode === "dark"
                          ? "bg-gray-700 text-gray-400"
                          : "bg-gray-200 text-gray-500"
                      }`}
                      style={step === currentStep ? { backgroundColor: appThemeColor } : {}}
                    >
                      {step}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {currentStep > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className={`gap-1 h-9 text-sm ${themeMode === "dark" ? "border-gray-600 hover:bg-gray-700" : ""}`}
                    >
                      <ChevronLeft className="w-3 h-3" />
                      Voltar
                    </Button>
                  )}
                  
                  {currentStep < 3 ? (
                    <Button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      disabled={currentStep === 1 && !selectedAddiction}
                      className="text-white gap-1 h-9 text-sm"
                      style={{ backgroundColor: appThemeColor }}
                    >
                      Próximo
                      <ChevronRight className="w-3 h-3" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleAddAddiction}
                      className="bg-green-600 hover:bg-green-700 gap-1 h-9 text-sm"
                    >
                      Finalizar
                      <ChevronRight className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <div className={`min-h-screen ${bgClass}`}>
      {/* Barra superior */}
      <div className={`${cardBgClass} ${textPrimaryClass} p-5 shadow-md sticky top-0 z-50 border-b ${borderClass}`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex-1 text-center">
            <p className={`text-xs sm:text-sm font-semibold ${textSecondaryClass} mb-1`}>Mensagem do dia!</p>
            <p className={`text-base sm:text-lg font-medium ${textPrimaryClass}`}>{currentQuote}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className={`${textPrimaryClass} ${hoverBgClass}`}>
                <MoreVertical className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={`w-48 ${dialogBgClass} ${borderClass}`}>
              <DropdownMenuItem onClick={() => alert("Em breve!")} className={dialogTextClass}>
                <Crown className="w-4 h-4 mr-2" />
                Assinar Premium
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSettingsDialogOpen(true)} className={dialogTextClass}>
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setHelpDialogOpen(true)} className={dialogTextClass}>
                <HelpCircle className="w-4 h-4 mr-2" />
                Ajuda
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-5 sm:p-6 space-y-5 pb-24">
        {trackedAddictions.map((tracked) => {
          const addictionData = addictions.find((a) => a.id === tracked.addictionId)
          const displayIcon = tracked.customIcon || addictionData?.icon || "🎯"
          const displayColor = tracked.customColor || appThemeColor
          const displayName = tracked.customName || addictionData?.name || "Vício"
          const { elapsedHours, progress, nextMilestone } = calculateProgress(tracked)
          const isExpanded = expandedId === tracked.id
          const calendarData = getCalendarDays(tracked)
          const currentProgressType = tracked.progressType || "circle"

          return (
            <div key={tracked.id} className={`${cardBgClass} rounded-xl shadow-md overflow-hidden`}>
              <button
                onClick={() => setExpandedId(isExpanded ? null : tracked.id)}
                className={`w-full p-5 sm:p-6 flex items-center justify-between ${hoverBgClass} transition-colors`}
              >
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="text-4xl sm:text-5xl">{displayIcon}</div>
                  <div className="text-left">
                    <h2 className={`text-lg sm:text-xl font-semibold ${textPrimaryClass}`}>
                      {displayName}
                    </h2>
                    <p className={`text-sm sm:text-base ${textSecondaryClass}`}>
                      {formatElapsedTime(elapsedHours)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {currentProgressType === "circle" ? (
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="50%"
                          cy="50%"
                          r="40%"
                          stroke={themeMode === "dark" ? "#374151" : "#e5e7eb"}
                          strokeWidth="5"
                          fill="none"
                        />
                        <circle
                          cx="50%"
                          cy="50%"
                          r="40%"
                          stroke={displayColor}
                          strokeWidth="5"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 40} ${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                          strokeLinecap="round"
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-sm sm:text-base font-bold ${textPrimaryClass}`}>{Math.round(progress)}%</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-sm font-bold ${textPrimaryClass}`}>{Math.round(progress)}%</span>
                      <div className={`w-24 sm:w-32 rounded-full h-3 overflow-hidden ${themeMode === "dark" ? "bg-gray-700" : "bg-gray-200"}`}>
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${progress}%`, backgroundColor: displayColor }}
                        />
                      </div>
                    </div>
                  )}
                  {isExpanded ? (
                    <ChevronUp className={`w-6 h-6 ${textSecondaryClass}`} />
                  ) : (
                    <ChevronDown className={`w-6 h-6 ${textSecondaryClass}`} />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className={`border-t ${borderClass} p-5 sm:p-6 space-y-6 ${themeMode === "dark" ? "bg-gray-700" : "bg-gray-50"}`}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm sm:text-base">
                      <span className={textSecondaryClass}>Próximo marco: {nextMilestone?.label}</span>
                      <span className="font-bold" style={{ color: displayColor }}>{Math.round(progress)}%</span>
                    </div>
                    <div className={`w-full rounded-full h-4 overflow-hidden ${themeMode === "dark" ? "bg-gray-600" : "bg-gray-200"}`}>
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${progress}%`, backgroundColor: displayColor }}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className={`w-6 h-6 ${textSecondaryClass}`} />
                      <h3 className={`font-semibold ${textPrimaryClass} text-base`}>
                        {format(new Date(), "MMMM yyyy", { locale: currentLocale })}
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
                      {['D', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, i) => (
                        <div key={`cal-header-${i}`} className={`text-center text-xs font-semibold ${textSecondaryClass}`}>
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 sm:gap-2">
                      {calendarData.emptyDays.map((_, index) => (
                        <div key={`cal-empty-${index}`} className="aspect-square" />
                      ))}
                      
                      {calendarData.days.map((day, index) => (
                        <div
                          key={`cal-day-${index}-${format(day.date, 'yyyy-MM-dd')}`}
                          className={`aspect-square rounded-lg flex items-center justify-center text-xs sm:text-sm font-semibold ${
                            day.isResetDay
                              ? "bg-red-100 text-red-700 border-2 border-red-300"
                              : day.isVictoryDay
                              ? "bg-green-100 text-green-700"
                              : themeMode === "dark" 
                              ? "bg-gray-600 text-gray-400"
                              : "bg-gray-100 text-gray-400"
                          } ${day.isToday ? "ring-2 ring-blue-500" : ""}`}
                          title={format(day.date, "dd/MM/yyyy", { locale: currentLocale })}
                        >
                          {format(day.date, "d")}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-center gap-6 text-xs sm:text-sm pt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-green-100 rounded border border-green-300" />
                        <span className={textSecondaryClass}>Vitória</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-red-100 rounded border-2 border-red-300" />
                        <span className={textSecondaryClass}>Reinício</span>
                      </div>
                    </div>
                  </div>

                  <div className={`flex gap-3 pt-4 border-t ${borderClass}`}>
                    <Button
                      onClick={() => handleOpenConfig(tracked)}
                      variant="outline"
                      className={`h-12 px-4 ${themeMode === "dark" ? "border-gray-600 hover:bg-gray-600" : "border-gray-300"} ${textPrimaryClass} ${hoverBgClass}`}
                    >
                      <Settings className="w-5 h-5" />
                    </Button>
                    <Button
                      onClick={() => handleShareProgress(tracked)}
                      variant="outline"
                      className={`h-12 px-4 ${themeMode === "dark" ? "border-gray-600 hover:bg-gray-600" : "border-gray-300"} ${textPrimaryClass} ${hoverBgClass}`}
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                    <Button
                      onClick={() => handleResetAddiction(tracked.id)}
                      variant="outline"
                      className="flex-1 border-orange-600 text-orange-600 hover:bg-orange-50 h-12 gap-2 text-base font-semibold"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Reiniciar
                    </Button>
                    <Button
                      onClick={() => handleDeleteAddiction(tracked.id)}
                      variant="outline"
                      className="border-red-600 text-red-600 hover:bg-red-50 h-12 px-4"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="w-16 h-16 rounded-full text-white shadow-2xl transition-all duration-300 hover:scale-110"
          style={{ 
            backgroundColor: appThemeColor,
            boxShadow: `0 25px 50px -12px ${appThemeColor}40`
          }}
        >
          <Plus className="w-7 h-7" />
        </Button>
      </div>

      {/* Dialog para adicionar novo vício */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open)
        if (!open) resetDialog()
      }}>
        <DialogContent className={`sm:max-w-xl max-h-[85vh] overflow-hidden flex flex-col ${dialogBgClass}`}>
          <DialogHeader>
            <DialogTitle className={`text-xl ${dialogTextClass}`}>
              {currentStep === 1 && "Adicionar novo desafio"}
              {currentStep === 2 && "Como isso te afeta?"}
              {currentStep === 3 && "Quando você começou?"}
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto py-4 px-1">
            {/* Conteúdo das abas (mesmo código anterior) */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className={`text-sm font-semibold ${dialogTextClass}`}>Escolha o que deseja superar</Label>
                  <Select value={selectedAddiction} onValueChange={setSelectedAddiction}>
                    <SelectTrigger className={`h-12 text-sm ${inputBgClass}`}>
                      <SelectValue placeholder="Selecione um vício ou mau hábito" />
                    </SelectTrigger>
                    <SelectContent className={dialogBgClass}>
                      {addictions.map((addiction) => (
                        <SelectItem key={addiction.id} value={addiction.id} className={`text-sm py-2 ${dialogTextClass}`}>
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{addiction.icon}</span>
                            <span className="font-medium">{addiction.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className={`text-sm font-semibold ${dialogTextClass}`}>Tipo</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setAddictionType("vicio")}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        addictionType === "vicio"
                          ? themeMode === "dark" ? "bg-gray-700" : "bg-red-50"
                          : themeMode === "dark" ? "border-gray-600 hover:border-gray-500" : "border-gray-300 hover:border-gray-400"
                      }`}
                      style={addictionType === "vicio" ? { borderColor: appThemeColor } : {}}
                    >
                      <div className="text-2xl mb-1">🚫</div>
                      <div className={`font-semibold text-base ${dialogTextClass}`}>Vício</div>
                      <div className={`text-xs ${textSecondaryClass} mt-1`}>Dependência física/psicológica</div>
                    </button>
                    <button
                      onClick={() => setAddictionType("habito")}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        addictionType === "habito"
                          ? themeMode === "dark" ? "bg-gray-700" : "bg-red-50"
                          : themeMode === "dark" ? "border-gray-600 hover:border-gray-500" : "border-gray-300 hover:border-gray-400"
                      }`}
                      style={addictionType === "habito" ? { borderColor: appThemeColor } : {}}
                    >
                      <div className="text-2xl mb-1">🔄</div>
                      <div className={`font-semibold text-base ${dialogTextClass}`}>Mau Hábito</div>
                      <div className={`text-xs ${textSecondaryClass} mt-1`}>Comportamento prejudicial</div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-5">
                <div className="space-y-3">
                  <Label className={`text-sm font-semibold ${dialogTextClass}`}>Selecione um tipo de impacto (opcional)</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setSelectedImpact(selectedImpact === "money" ? null : "money")}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedImpact === "money"
                          ? themeMode === "dark" ? "bg-gray-700 shadow-lg" : "bg-red-50 shadow-lg"
                          : themeMode === "dark" ? "border-gray-600 hover:border-gray-500" : "border-gray-300 hover:border-gray-400"
                      }`}
                      style={selectedImpact === "money" ? { borderColor: appThemeColor } : {}}
                    >
                      <div className="text-3xl mb-2">💰</div>
                      <div className={`text-sm font-semibold ${dialogTextClass}`}>Financeiro</div>
                    </button>
                    <button
                      onClick={() => setSelectedImpact(selectedImpact === "time" ? null : "time")}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedImpact === "time"
                          ? themeMode === "dark" ? "bg-gray-700 shadow-lg" : "bg-red-50 shadow-lg"
                          : themeMode === "dark" ? "border-gray-600 hover:border-gray-500" : "border-gray-300 hover:border-gray-400"
                      }`}
                      style={selectedImpact === "time" ? { borderColor: appThemeColor } : {}}
                    >
                      <div className="text-3xl mb-2">⏰</div>
                      <div className={`text-sm font-semibold ${dialogTextClass}`}>Tempo</div>
                    </button>
                    <button
                      onClick={() => setSelectedImpact(selectedImpact === "event" ? null : "event")}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedImpact === "event"
                          ? themeMode === "dark" ? "bg-gray-700 shadow-lg" : "bg-red-50 shadow-lg"
                          : themeMode === "dark" ? "border-gray-600 hover:border-gray-500" : "border-gray-300 hover:border-gray-400"
                      }`}
                      style={selectedImpact === "event" ? { borderColor: appThemeColor } : {}}
                    >
                      <div className="text-3xl mb-2">⚠️</div>
                      <div className={`text-sm font-semibold ${dialogTextClass}`}>Evento</div>
                    </button>
                  </div>
                </div>

                {selectedImpact === "money" && (
                  <div className="space-y-2 animate-in fade-in duration-300">
                    <Label className={`text-sm font-semibold flex items-center gap-2 ${dialogTextClass}`}>
                      💰 Impacto Financeiro
                    </Label>
                    <p className={`text-xs ${textSecondaryClass}`}>Quanto você gastava por mês?</p>
                    <div className="relative">
                      <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${textSecondaryClass} text-sm`}>
                        {currencies.find(c => c.code === selectedCurrency)?.symbol || "R$"}
                      </span>
                      <Input
                        type="number"
                        value={impactMoney}
                        onChange={(e) => setImpactMoney(e.target.value)}
                        placeholder="0,00"
                        className={`h-10 pl-10 text-sm ${inputBgClass}`}
                      />
                    </div>
                  </div>
                )}

                {selectedImpact === "time" && (
                  <div className="space-y-2 animate-in fade-in duration-300">
                    <Label className={`text-sm font-semibold flex items-center gap-2 ${dialogTextClass}`}>
                      ⏰ Impacto de Tempo
                    </Label>
                    <p className={`text-xs ${textSecondaryClass}`}>Quantas horas por dia você dedicava?</p>
                    <div className="relative">
                      <Input
                        type="number"
                        value={impactTime}
                        onChange={(e) => setImpactTime(e.target.value)}
                        placeholder="0"
                        className={`h-10 text-sm ${inputBgClass}`}
                      />
                      <span className={`absolute right-3 top-1/2 -translate-y-1/2 ${textSecondaryClass} text-xs`}>horas/dia</span>
                    </div>
                  </div>
                )}

                {selectedImpact === "event" && (
                  <div className="space-y-2 animate-in fade-in duration-300">
                    <Label className={`text-sm font-semibold flex items-center gap-2 ${dialogTextClass}`}>
                      ⚠️ Acontecimento Marcante
                    </Label>
                    <p className={`text-xs ${textSecondaryClass}`}>Algum evento que te motivou a parar?</p>
                    <Input
                      value={impactEvent}
                      onChange={(e) => setImpactEvent(e.target.value)}
                      placeholder="Ex: Perdi uma oportunidade importante"
                      className={`h-10 text-sm ${inputBgClass}`}
                    />
                  </div>
                )}

                <div className={`space-y-2 pt-3 border-t ${borderClass}`}>
                  <Label className={`text-sm font-semibold flex items-center gap-2 ${dialogTextClass}`}>
                    💭 Por que você quer parar? <span className={`text-xs ${textSecondaryClass} font-normal`}>(opcional)</span>
                  </Label>
                  <Textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Escreva aqui sua motivação..."
                    className={`min-h-20 resize-none text-sm ${inputBgClass}`}
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className={`text-sm font-semibold flex items-center gap-2 ${dialogTextClass}`}>
                    <Calendar className="w-4 h-4" />
                    Selecione a data de início
                  </Label>
                  
                  <div className={`${themeMode === "dark" ? "bg-gray-700" : "bg-gray-50"} rounded-lg p-3`}>
                    <div className="flex items-center justify-between mb-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setStartDate(new Date(startDate.getFullYear(), startDate.getMonth() - 1, 1))}
                        className={`h-8 w-8 p-0 ${themeMode === "dark" ? "hover:bg-gray-600" : ""}`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <h3 className={`font-semibold text-sm ${dialogTextClass}`}>
                        {format(startDate, "MMMM yyyy", { locale: currentLocale })}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setStartDate(new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1))}
                        className={`h-8 w-8 p-0 ${themeMode === "dark" ? "hover:bg-gray-600" : ""}`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-1">
                      {['D', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, idx) => (
                        <div key={`weekday-${idx}`} className={`text-center text-xs font-semibold ${textSecondaryClass} py-1`}>
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {getSelectionCalendarDays().emptyDays.map((_, index) => (
                        <div key={`empty-${index}`} className="aspect-square" />
                      ))}
                      
                      {getSelectionCalendarDays().days.map((day, index) => (
                        <button
                          key={`day-${index}-${format(day.date, 'yyyy-MM-dd')}`}
                          onClick={() => setStartDate(day.date)}
                          className={`aspect-square rounded-md flex items-center justify-center text-xs font-semibold transition-all ${
                            day.isSelected
                              ? "text-white scale-105 shadow-md"
                              : day.isToday
                              ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                              : themeMode === "dark"
                              ? "hover:bg-gray-600 text-gray-300"
                              : "hover:bg-gray-200 text-gray-700"
                          }`}
                          style={day.isSelected ? { backgroundColor: appThemeColor } : {}}
                        >
                          {format(day.date, "d")}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className={`text-sm font-semibold flex items-center gap-2 ${dialogTextClass}`}>
                    <Clock className="w-4 h-4" />
                    Selecione o horário
                  </Label>
                  
                  <div className={`${themeMode === "dark" ? "bg-gradient-to-br from-gray-700 to-gray-800" : "bg-gradient-to-br from-gray-50 to-gray-100"} rounded-xl p-5 shadow-inner`}>
                    <div className="flex items-center justify-center gap-3">
                      <div className="flex flex-col items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedHour((selectedHour + 1) % 24)}
                          className={`mb-1 h-7 w-7 p-0 ${themeMode === "dark" ? "hover:bg-gray-600" : "hover:bg-white/50"}`}
                        >
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                        <div className={`${themeMode === "dark" ? "bg-gray-600" : "bg-white"} rounded-lg shadow-lg px-4 py-3 min-w-[60px] text-center`}>
                          <div className={`text-3xl font-bold ${dialogTextClass} tabular-nums`}>
                            {String(selectedHour).padStart(2, '0')}
                          </div>
                          <div className={`text-[10px] ${textSecondaryClass} mt-0.5 font-semibold`}>HORA</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedHour((selectedHour - 1 + 24) % 24)}
                          className={`mt-1 h-7 w-7 p-0 ${themeMode === "dark" ? "hover:bg-gray-600" : "hover:bg-white/50"}`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className={`text-3xl font-bold ${textSecondaryClass} pb-6`}>:</div>

                      <div className="flex flex-col items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedMinute((selectedMinute + 1) % 60)}
                          className={`mb-1 h-7 w-7 p-0 ${themeMode === "dark" ? "hover:bg-gray-600" : "hover:bg-white/50"}`}
                        >
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                        <div className={`${themeMode === "dark" ? "bg-gray-600" : "bg-white"} rounded-lg shadow-lg px-4 py-3 min-w-[60px] text-center`}>
                          <div className={`text-3xl font-bold ${dialogTextClass} tabular-nums`}>
                            {String(selectedMinute).padStart(2, '0')}
                          </div>
                          <div className={`text-[10px] ${textSecondaryClass} mt-0.5 font-semibold`}>MIN</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedMinute((selectedMinute - 1 + 60) % 60)}
                          className={`mt-1 h-7 w-7 p-0 ${themeMode === "dark" ? "hover:bg-gray-600" : "hover:bg-white/50"}`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-center mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const now = new Date()
                          setSelectedHour(now.getHours())
                          setSelectedMinute(now.getMinutes())
                        }}
                        className={`h-7 text-xs ${themeMode === "dark" ? "bg-gray-600 hover:bg-gray-500" : "bg-white hover:bg-gray-50"}`}
                      >
                        Agora
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedHour(0)
                          setSelectedMinute(0)
                        }}
                        className={`h-7 text-xs ${themeMode === "dark" ? "bg-gray-600 hover:bg-gray-500" : "bg-white hover:bg-gray-50"}`}
                      >
                        00:00
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedHour(12)
                          setSelectedMinute(0)
                        }}
                        className={`h-7 text-xs ${themeMode === "dark" ? "bg-gray-600 hover:bg-gray-500" : "bg-white hover:bg-gray-50"}`}
                      >
                        12:00
                      </Button>
                    </div>
                  </div>
                  
                  <p className={`text-xs ${textSecondaryClass} text-center`}>
                    Horário de Brasília (GMT-3)
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className={`border-t pt-4 mt-2 ${borderClass}`}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-shrink-0">
                {[1, 2, 3].map((step) => (
                  <div
                    key={`dialog-step-${step}`}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                      step === currentStep
                        ? "text-white scale-110"
                        : step < currentStep
                        ? "bg-green-500 text-white"
                        : themeMode === "dark"
                        ? "bg-gray-700 text-gray-400"
                        : "bg-gray-200 text-gray-500"
                    }`}
                    style={step === currentStep ? { backgroundColor: appThemeColor } : {}}
                  >
                    {step}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className={`gap-1 h-9 text-sm ${themeMode === "dark" ? "border-gray-600 hover:bg-gray-700" : ""}`}
                  >
                    <ChevronLeft className="w-3 h-3" />
                    Voltar
                  </Button>
                )}
                
                {currentStep < 3 ? (
                  <Button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={currentStep === 1 && !selectedAddiction}
                    className="text-white gap-1 h-9 text-sm"
                    style={{ backgroundColor: appThemeColor }}
                  >
                    Próximo
                    <ChevronRight className="w-3 h-3" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleAddAddiction}
                    className="bg-green-600 hover:bg-green-700 gap-1 h-9 text-sm"
                  >
                    Finalizar
                    <ChevronRight className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmação de reinício */}
      <Dialog open={confirmResetDialog} onOpenChange={setConfirmResetDialog}>
        <DialogContent className={dialogBgClass}>
          <DialogHeader>
            <DialogTitle className={dialogTextClass}>Confirmar Reinício</DialogTitle>
            <DialogDescription className={textSecondaryClass}>
              Tem certeza que deseja reiniciar o contador? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmResetDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmReset} className="bg-orange-600 hover:bg-orange-700">
              Confirmar Reinício
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmação de exclusão */}
      <Dialog open={confirmDeleteDialog} onOpenChange={setConfirmDeleteDialog}>
        <DialogContent className={dialogBgClass}>
          <DialogHeader>
            <DialogTitle className={dialogTextClass}>Confirmar Exclusão</DialogTitle>
            <DialogDescription className={textSecondaryClass}>
              Tem certeza que deseja excluir este item? Todo o progresso será perdido permanentemente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Confirmar Exclusão
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de configurações do vício */}
      <Dialog open={configDialogOpen} onOpenChange={setConfigDialogOpen}>
        <DialogContent className={`sm:max-w-md ${dialogBgClass}`}>
          <DialogHeader>
            <DialogTitle className={dialogTextClass}>Configurações</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className={dialogTextClass}>Nome Personalizado</Label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Digite um nome personalizado"
                className={inputBgClass}
              />
            </div>

            <div className="space-y-2">
              <Label className={dialogTextClass}>Ícone</Label>
              <div className="grid grid-cols-8 gap-2">
                {availableEmojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setNewIcon(emoji)}
                    className={`text-2xl p-2 rounded-lg border-2 transition-all ${
                      newIcon === emoji
                        ? "border-blue-500 bg-blue-50 scale-110"
                        : themeMode === "dark"
                        ? "border-gray-600 hover:border-gray-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className={dialogTextClass}>Cor</Label>
              <Select value={newColor} onValueChange={setNewColor}>
                <SelectTrigger className={inputBgClass}>
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded" style={{ backgroundColor: newColor }} />
                      <span>{availableColors.find(c => c.value === newColor)?.name || "Selecione"}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className={dialogBgClass}>
                  {availableColors.map((color) => (
                    <SelectItem key={color.value} value={color.value} className={dialogTextClass}>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded" style={{ backgroundColor: color.value }} />
                        <span>{color.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className={dialogTextClass}>Tipo de Progresso</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setProgressType("circle")}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    progressType === "circle"
                      ? themeMode === "dark" ? "bg-gray-700 border-blue-500" : "bg-blue-50 border-blue-500"
                      : themeMode === "dark" ? "border-gray-600 hover:border-gray-500" : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className={`text-sm font-semibold ${dialogTextClass}`}>Circular</div>
                </button>
                <button
                  onClick={() => setProgressType("line")}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    progressType === "line"
                      ? themeMode === "dark" ? "bg-gray-700 border-blue-500" : "bg-blue-50 border-blue-500"
                      : themeMode === "dark" ? "border-gray-600 hover:border-gray-500" : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className={`text-sm font-semibold ${dialogTextClass}`}>Barra</div>
                </button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfigDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveConfig} style={{ backgroundColor: appThemeColor }}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Ajuda */}
      <Dialog open={helpDialogOpen} onOpenChange={setHelpDialogOpen}>
        <DialogContent className={`sm:max-w-2xl max-h-[80vh] flex flex-col ${dialogBgClass}`}>
          <DialogHeader>
            <DialogTitle className={dialogTextClass}>Central de Ajuda</DialogTitle>
            <DialogDescription className={textSecondaryClass}>
              Faça perguntas sobre como superar vícios e receba orientações personalizadas
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto space-y-4 py-4">
            {helpMessages.length === 0 ? (
              <div className={`text-center py-8 ${textSecondaryClass}`}>
                <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Faça uma pergunta para começar!</p>
                <p className="text-xs mt-2">Exemplos: "Como lidar com recaídas?", "Estou com vontade", "Me sinto ansioso"</p>
              </div>
            ) : (
              helpMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg ${
                    msg.role === 'user'
                      ? themeMode === "dark" ? "bg-blue-900/30 ml-8" : "bg-blue-50 ml-8"
                      : themeMode === "dark" ? "bg-gray-700 mr-8" : "bg-gray-100 mr-8"
                  }`}
                >
                  <div className={`text-xs font-semibold mb-1 ${msg.role === 'user' ? 'text-blue-600' : textSecondaryClass}`}>
                    {msg.role === 'user' ? 'Você' : 'Assistente'}
                  </div>
                  <div className={`text-sm whitespace-pre-line ${dialogTextClass}`}>{msg.content}</div>
                </div>
              ))
            )}
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Input
              value={helpInput}
              onChange={(e) => setHelpInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendHelpMessage()}
              placeholder="Digite sua pergunta..."
              className={inputBgClass}
            />
            <Button onClick={handleSendHelpMessage} style={{ backgroundColor: appThemeColor }}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Configurações Gerais */}
      <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
        <DialogContent className={`sm:max-w-md ${dialogBgClass}`}>
          <DialogHeader>
            <DialogTitle className={dialogTextClass}>Configurações</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label className={dialogTextClass}>Moeda</Label>
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger className={inputBgClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={dialogBgClass}>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code} className={dialogTextClass}>
                      {currency.symbol} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className={dialogTextClass}>Idioma</Label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className={inputBgClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={dialogBgClass}>
                  {languages.map((language) => (
                    <SelectItem key={language.code} value={language.code} className={dialogTextClass}>
                      {language.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className={dialogTextClass}>Tema</Label>
              <div className="flex items-center justify-between">
                <span className={textSecondaryClass}>Modo Escuro</span>
                <Switch
                  checked={themeMode === "dark"}
                  onCheckedChange={(checked) => setThemeMode(checked ? "dark" : "light")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className={dialogTextClass}>Cor do Tema</Label>
              <div className="grid grid-cols-4 gap-2">
                {appThemeColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setAppThemeColor(color.value)}
                    className={`h-12 rounded-lg border-2 transition-all ${
                      appThemeColor === color.value
                        ? "border-blue-500 scale-110 shadow-lg"
                        : themeMode === "dark"
                        ? "border-gray-600 hover:border-gray-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className={dialogTextClass}>Notificações</Label>
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className={dialogTextClass}>Mensagem Diária</Label>
                <Switch
                  checked={dailyMotivationEnabled}
                  onCheckedChange={setDailyMotivationEnabled}
                />
              </div>
            </div>

            <div className={`space-y-2 pt-4 border-t ${borderClass}`}>
              <Label className={dialogTextClass}>Outros</Label>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className={`w-full justify-start ${themeMode === "dark" ? "border-gray-600 hover:bg-gray-700" : ""}`}
                  onClick={() => alert("Em breve! Envie seu feedback para contato@app.com")}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Feedback
                </Button>
                <Button
                  variant="outline"
                  className={`w-full justify-start ${themeMode === "dark" ? "border-gray-600 hover:bg-gray-700" : ""}`}
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: "Liberte-se",
                        text: "Conheça o app que está me ajudando a superar vícios!",
                      }).catch(() => {})
                    } else {
                      alert("Compartilhe: Conheça o app Liberte-se!")
                    }
                  }}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
                <Button
                  variant="outline"
                  className={`w-full justify-start ${themeMode === "dark" ? "border-gray-600 hover:bg-gray-700" : ""}`}
                  onClick={() => {
                    setSettingsDialogOpen(false)
                    setPrivacyDialogOpen(true)
                  }}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Política de Privacidade
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Política de Privacidade */}
      <Dialog open={privacyDialogOpen} onOpenChange={setPrivacyDialogOpen}>
        <DialogContent className={`sm:max-w-2xl max-h-[80vh] overflow-y-auto ${dialogBgClass}`}>
          <DialogHeader>
            <DialogTitle className={dialogTextClass}>Política de Privacidade</DialogTitle>
          </DialogHeader>
          <div className={`space-y-4 py-4 text-sm ${dialogTextClass}`}>
            <section>
              <h3 className="font-semibold mb-2">1. Coleta de Dados</h3>
              <p className={textSecondaryClass}>
                O aplicativo "Liberte-se" armazena todos os dados localmente no seu dispositivo usando localStorage. 
                Nenhuma informação pessoal é enviada para servidores externos ou compartilhada com terceiros.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">2. Dados Armazenados</h3>
              <p className={textSecondaryClass}>Os seguintes dados são armazenados localmente:</p>
              <ul className={`list-disc list-inside mt-2 space-y-1 ${textSecondaryClass}`}>
                <li>Vícios e hábitos que você está rastreando</li>
                <li>Datas e horários de início</li>
                <li>Histórico de reinícios</li>
                <li>Configurações personalizadas (ícones, cores, nomes)</li>
                <li>Preferências do aplicativo (tema, idioma, moeda)</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold mb-2">3. Uso dos Dados</h3>
              <p className={textSecondaryClass}>
                Todos os dados são utilizados exclusivamente para fornecer funcionalidades do aplicativo, 
                como rastreamento de progresso, cálculo de marcos e personalização da experiência do usuário.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">4. Segurança</h3>
              <p className={textSecondaryClass}>
                Como os dados são armazenados localmente no seu dispositivo, você tem controle total sobre eles. 
                Recomendamos não compartilhar seu dispositivo com outras pessoas se desejar manter suas informações privadas.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">5. Exclusão de Dados</h3>
              <p className={textSecondaryClass}>
                Você pode excluir todos os seus dados a qualquer momento através das configurações do aplicativo 
                ou limpando os dados de navegação do seu navegador.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">6. Cookies e Rastreamento</h3>
              <p className={textSecondaryClass}>
                Este aplicativo não utiliza cookies de rastreamento ou ferramentas de análise de terceiros. 
                Não coletamos informações sobre seu comportamento de navegação.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">7. Alterações na Política</h3>
              <p className={textSecondaryClass}>
                Esta política de privacidade pode ser atualizada ocasionalmente. Recomendamos revisar 
                periodicamente para estar ciente de quaisquer mudanças.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">8. Contato</h3>
              <p className={textSecondaryClass}>
                Se você tiver dúvidas sobre esta política de privacidade, entre em contato através do 
                menu "Enviar Feedback" nas configurações do aplicativo.
              </p>
            </section>

            <p className={`text-xs ${textSecondaryClass} mt-6`}>
              Última atualização: {format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: currentLocale })}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
