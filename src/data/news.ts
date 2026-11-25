export type NewsItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  content: string;
  illustration: 'church' | 'community' | 'bible' | 'care';
};

export const news: NewsItem[] = [
  {
    id: 'community-celebration',
    title: 'Comunidade se reúne em celebração de fé',
    description: 'Um encontro de oração e partilha fortalece os laços entre famílias.',
    date: '2026-11-24',
    content:
      'Famílias de toda a paróquia se reuniram para um momento de oração, canto e partilha.\n\nDurante o encontro, os participantes refletiram sobre a importância da vida em comunidade e renovaram o compromisso de caminhar juntos na fé.',
    illustration: 'church',
  },
  {
    id: 'solidarity',
    title: 'Solidariedade transforma a vida de famílias',
    description: 'Voluntários se unem para apoiar quem mais precisa.',
    date: '2026-11-23',
    content:
      'Um grupo de voluntários organizou a arrecadação e a distribuição de alimentos e roupas para famílias em situação de necessidade.\n\nA iniciativa segue aberta a quem quiser colaborar com tempo, doações ou orações.',
    illustration: 'community',
  },
  {
    id: 'bible',
    title: 'A Bíblia como inspiração para o dia a dia',
    description: 'Momentos de leitura e reflexão aproximam pessoas da Palavra.',
    date: '2026-11-22',
    content:
      'A leitura diária da Palavra de Deus tem inspirado muitas pessoas a viver a fé no cotidiano.\n\nGrupos de leitura e momentos de reflexão ajudam a aproximar a Bíblia da vida de cada dia.',
    illustration: 'bible',
  },
  {
    id: 'creation',
    title: 'Cuidar da criação é um gesto de esperança',
    description: 'Pequenas atitudes fazem a diferença no cuidado com a casa comum.',
    date: '2026-11-21',
    content:
      'Cuidar da casa comum é uma forma concreta de viver o Evangelho.\n\nAtitudes simples, como reduzir o desperdício, plantar árvores e reutilizar materiais, geram esperança e transformam a comunidade.',
    illustration: 'care',
  },
];

// Simula a busca em uma API; substituir por uma requisição real quando existir backend.
export async function fetchNews(): Promise<NewsItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return [...news];
}

export function getNewsById(id: string | undefined) {
  return news.find((item) => item.id === id);
}

export function formatNewsDate(date: string) {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export function filterNews(items: NewsItem[], query: string) {
  const search = normalize(query.trim());
  return items.filter((item) =>
    normalize(`${item.title} ${item.description}`).includes(search),
  );
}
