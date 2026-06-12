export type FaqItem = {
  title: string
  description: string
}

export type FaqCategory = {
  category: string
  items: FaqItem[]
}

export const faqData: FaqCategory[] = [
  {
    category: "Contrato e Jornada",
    items: [
      {
        title: "Qual a duração máxima do meu contrato de aprendizagem?",
        description:
          "O contrato de aprendizagem pode durar até 2 anos. O período exato depende do programa de aprendizagem e está especificado no seu contrato.",
      },
      {
        title: "Quantas horas posso trabalhar por dia?",
        description:
          "A jornada máxima é de 6 horas diárias para aprendizes que ainda não concluíram o ensino fundamental. Se você já concluiu, pode trabalhar até 8 horas diárias, incluindo as horas de aprendizagem teórica.",
      },
      {
        title: "Posso ser demitido durante o contrato?",
        description:
          "Sim, mas apenas em casos específicos: desempenho insuficiente, falta disciplinar grave, ausência injustificada à escola, ou a pedido do próprio aprendiz. Fora desses casos, o contrato deve ser cumprido até o final.",
      },
    ],
  },
  {
    category: "Férias e Faltas",
    items: [
      {
        title: "Como funcionam as férias do jovem aprendiz?",
        description:
          "Você tem direito a 30 dias de férias por ano, que devem coincidir preferencialmente com as férias escolares. As férias são remuneradas e você recebe 1/3 a mais do salário.",
      },
      {
        title: "Quantas faltas posso ter?",
        description:
          "As faltas justificadas com atestado médico são aceitas. Faltas sem justificativa podem resultar em desconto no salário e, se forem excessivas, podem levar ao desligamento. Sempre apresente justificativa quando faltar.",
      },
      {
        title: "Preciso apresentar atestado médico?",
        description:
          "Sim, sempre que faltar por motivo de saúde, você deve apresentar atestado médico para justificar a ausência. Isso evita desconto no salário e problemas no seu contrato.",
      },
    ],
  },
  {
    category: "Salário e Benefícios",
    items: [
      {
        title: "Qual é o valor do meu salário?",
        description:
          "O salário do jovem aprendiz é calculado por hora trabalhada, tendo como base o salário mínimo/hora. O valor exato depende da sua jornada de trabalho e está especificado no seu contrato.",
      },
      {
        title: "Tenho direito ao vale-transporte?",
        description:
          "Sim! Você tem direito ao vale-transporte para cobrir o deslocamento entre casa, trabalho e escola. O empregador pode descontar até 6% do seu salário para custear parte do benefício.",
      },
      {
        title: "Como funciona o FGTS do aprendiz?",
        description:
          "O empregador deve depositar 2% do seu salário no FGTS mensalmente. Este valor fica numa conta vinculada em seu nome e pode ser sacado ao final do contrato.",
      },
    ],
  },
  {
    category: "Trabalho e Escola",
    items: [
      {
        title: "Sou obrigado a estudar enquanto sou aprendiz?",
        description:
          "Se você ainda não concluiu o ensino médio, sim, é obrigatório estar matriculado e frequentando a escola. Essa é uma exigência da Lei da Aprendizagem.",
      },
      {
        title: "Posso trabalhar em feriado?",
        description:
          "Normalmente não. Você tem direito a folga nos feriados nacionais e no descanso semanal remunerado (geralmente aos domingos). Trabalho em feriados só é permitido em casos excepcionais previstos em lei.",
      },
      {
        title: "O que acontece se eu reprovar na escola?",
        description:
          "A reprovação escolar pode ser motivo para rescisão do contrato de aprendizagem, pois a frequência e o desempenho escolar são requisitos do programa. Mantenha sempre seu compromisso com os estudos.",
      },
    ],
  },
   {
    category: "Rescisão e Direitos",
    items: [
      {
        title: "Como funciona recisão de contrato?",
        description:
          "Ao término do contrato, você recebe: saldo de salário, férias proporcionais + 1/3, 13º salário proporcional e saque do FGTS. Se for demitido sem justa causa, também tem direito a aviso prévio.",
      },
      {
        title: "Tenho direito ao seguro desemprego?",
        description:
          "Não. O contrato de aprendizagem não gera direito ao seguro-desemprego, pois é um contrato com prazo determinado e com finalidade educacional.",
      },
      {
        title: "Posso pedir demissão antes do fim do contrato?",
        description:
          "Sim, você pode solicitar o desligamento a qualquer momento. Neste caso, você receberá os valores proporcionais ao período trabalhado (salário, férias e 13º).",
      },
    ],
  },
]
