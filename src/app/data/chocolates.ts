export type ChocolateType = 
  | 'dark-round' 
  | 'milk-square' 
  | 'white-heart' 
  | 'dark-swirl' 
  | 'milk-round' 
  | 'white-square' 
  | 'special-rose' 
  | 'special-sprinkle'
  | 'special-ribbon'
  | 'special-macaron'
  | 'special-heart-cookie'
  | 'special-biscuit'
  | 'special-square-heart'
  | 'special-heart-drizzle'
  | 'special-square-rose'
  | 'special-pink-square'
  | 'special-round-heart'
  | 'special-dark-rose';

export interface ChocolateData {
  id: number;
  type: ChocolateType;
  message: string;
  character: string;
}

export const allMessages = [
  { message: "Si el destino te hiere, yo pelearé a tu lado.", character: "Ichigo Kurosaki" },
  { message: "El corazón no se ve, pero vive en todo lo que protegemos.", character: "Rukia Kuchiki" },
  { message: "Si tuviera cinco vidas, en las cinco volvería a encontrarte.", character: "Orihime Inoue" },
  { message: "Incluso el orgullo se inclina ante aquello que ama.", character: "Byakuya Kuchiki" },
  { message: "No necesitas ver el camino entero para dar el siguiente paso.", character: "Kisuke Urahara" },
  { message: "La fuerza verdadera nace cuando tienes algo que proteger.", character: "Yoruichi Shihōin" },
  { message: "Una promesa no pierde su valor aunque pase el tiempo.", character: "Renji Abarai" },
  { message: "Hay batallas que solo se ganan sonriendo.", character: "Rangiku Matsumoto" },
  { message: "Hasta el invierno más largo termina encontrando su primavera.", character: "Tōshirō Hitsugaya" },
  { message: "Vive con tanta fuerza que hasta el miedo retroceda.", character: "Kenpachi Zaraki" },
  { message: "Las heridas también demuestran que elegimos seguir adelante.", character: "Shunsui Kyōraku" },
  { message: "Tu luz puede alcanzar incluso el rincón más oscuro.", character: "Jūshirō Ukitake" },
  { message: "La admiración empieza donde las palabras ya no alcanzan.", character: "Sōsuke Aizen" },
  { message: "A veces, una mirada guarda más verdad que mil palabras.", character: "Gin Ichimaru" },
  { message: "Quizá el corazón aparece cuando alguien importa de verdad.", character: "Ulquiorra Cifer" },
  { message: "No importa la distancia si nuestras almas recuerdan el camino.", character: "Neliel Tu Odelschwanck" },
  { message: "La bondad también puede ser una forma de valentía.", character: "Chad Yasutora" },
  { message: "Cree en la persona que has decidido llegar a ser.", character: "Uryū Ishida" },
  { message: "Los mejores recuerdos siempre merecen otra canción.", character: "Shinji Hirako" },
  { message: "La alegría compartida se convierte en fuerza.", character: "Yachiru Kusajishi" },
  { message: "Proteger tu sonrisa es una batalla que siempre elegiría.", character: "Ichigo Kurosaki" },
  { message: "Aunque el mundo cambie, algunos vínculos permanecen.", character: "Rukia Kuchiki" },
  { message: "Encontrarte convirtió lo cotidiano en algo extraordinario.", character: "Orihime Inoue" },
  { message: "Caminar juntos hace que cualquier destino valga la pena.", character: "Renji Abarai" }
];

export const chocolateTypes: ChocolateType[] = [
  'special-rose',
  'special-sprinkle',
  'special-ribbon',
  'special-macaron',
  'special-heart-cookie',
  'special-biscuit',
  'special-square-heart',
  'special-heart-drizzle',
  'special-square-rose',
  'special-pink-square',
  'special-round-heart',
  'special-dark-rose'
];

// Fisher-Yates shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function getRandomChocolates(): ChocolateData[] {
  const shuffledMessages = shuffleArray(allMessages);
  // We use the fixed list of 12 types, and assign a random message to each
  return chocolateTypes.map((type, index) => ({
    id: index + 1,
    type,
    message: shuffledMessages[index % shuffledMessages.length].message,
    character: shuffledMessages[index % shuffledMessages.length].character
  }));
}

export const chocolates = getRandomChocolates();
