export type GrimoireWorldId =
  | "prairie"
  | "forest"
  | "swamp"
  | "mountain"
  | "beach"
  | "ocean";

export type GrimoireEntry = {
  id: string;
  name: string;
  icon: string;
  discovered: boolean;
  size: string;
  food: string;
  period: string;
  fact: string;
};

export type GrimoireWorld = {
  id: GrimoireWorldId;
  label: string;
  badge: string;
  title: string;
  description: string;
  entries: GrimoireEntry[];
};

export const grimoireWorlds: Record<GrimoireWorldId, GrimoireWorld> = {
  prairie: {
    id: "prairie",
    label: "Prairie",
    badge: "Monde Prairie",
    title: "Grimoire de la Prairie",
    description: "Les especes et decouvertes de la premiere zone du refuge.",
    entries: [
      {
        id: "brontosaurus",
        name: "Brontosaure",
        icon: "B",
        discovered: true,
        size: "20 a 25 metres",
        food: "Herbivore",
        period: "Jurassique",
        fact: "Son long cou lui permettait d'atteindre les feuilles tres hautes.",
      },
      {
        id: "dryosaurus",
        name: "Dryosaure",
        icon: "D",
        discovered: false,
        size: "3 a 4 metres",
        food: "Herbivore",
        period: "Jurassique",
        fact: "Il etait rapide et leger, parfait pour traverser les plaines.",
      },
    ],
  },
  forest: {
    id: "forest",
    label: "Foret",
    badge: "Monde Foret",
    title: "Grimoire de la Foret",
    description: "Les compagnons et indices caches sous les feuillages.",
    entries: [
      {
        id: "parasaurolophus",
        name: "Parasaurolophus",
        icon: "P",
        discovered: true,
        size: "9 a 10 metres",
        food: "Herbivore",
        period: "Cretace",
        fact: "Sa crete pouvait amplifier ses sons pour communiquer au loin.",
      },
      {
        id: "iguanodon",
        name: "Iguanodon",
        icon: "I",
        discovered: false,
        size: "8 a 10 metres",
        food: "Herbivore",
        period: "Cretace",
        fact: "Ses pouces formaient des pointes solides pour se proteger.",
      },
    ],
  },
  swamp: {
    id: "swamp",
    label: "Marecage",
    badge: "Monde Marecage",
    title: "Grimoire du Marecage",
    description: "Les traces calmes du monde humide et brumeux.",
    entries: [
      {
        id: "spinosaurus",
        name: "Spinosaure",
        icon: "S",
        discovered: true,
        size: "14 a 16 metres",
        food: "Poissons et viande",
        period: "Cretace",
        fact: "Il etait adapte aux milieux aquatiques et pouvait chasser dans l'eau.",
      },
      {
        id: "deinosuchus",
        name: "Deinosuchus",
        icon: "D",
        discovered: false,
        size: "10 a 12 metres",
        food: "Carnivore",
        period: "Cretace",
        fact: "Ce grand reptile vivait pres des rivieres et des zones humides.",
      },
    ],
  },
  mountain: {
    id: "mountain",
    label: "Montagne",
    badge: "Monde Montagne",
    title: "Grimoire de la Montagne",
    description: "Les especes solides et les signes trouves en altitude.",
    entries: [
      {
        id: "pachyrhinosaurus",
        name: "Pachyrhinosaure",
        icon: "P",
        discovered: true,
        size: "6 a 8 metres",
        food: "Herbivore",
        period: "Cretace",
        fact: "Son museau epais remplacait la grande corne de certains cousins.",
      },
      {
        id: "ankylosaurus",
        name: "Ankylosaure",
        icon: "A",
        discovered: false,
        size: "6 a 8 metres",
        food: "Herbivore",
        period: "Cretace",
        fact: "Sa queue en massue et son armure le rendaient tres difficile a attaquer.",
      },
    ],
  },
  beach: {
    id: "beach",
    label: "Plage",
    badge: "Monde Plage",
    title: "Grimoire de la Plage",
    description: "Les decouvertes du sable, des coquillages et du rivage.",
    entries: [
      {
        id: "archelon",
        name: "Archelon",
        icon: "A",
        discovered: true,
        size: "4 a 5 metres",
        food: "Meduses et petits animaux marins",
        period: "Cretace",
        fact: "Cette tortue geante nageait dans les mers anciennes.",
      },
      {
        id: "pteranodon",
        name: "Pteranodon",
        icon: "P",
        discovered: false,
        size: "6 metres d'envergure",
        food: "Poissons",
        period: "Cretace",
        fact: "Il planait au-dessus des cotes pour reperer les poissons.",
      },
    ],
  },
  ocean: {
    id: "ocean",
    label: "Ocean",
    badge: "Monde Ocean",
    title: "Grimoire de l'Ocean",
    description: "Les creatures du large et les mysteres de l'horizon.",
    entries: [
      {
        id: "mosasaurus",
        name: "Mosasaure",
        icon: "M",
        discovered: true,
        size: "12 a 15 metres",
        food: "Carnivore marin",
        period: "Cretace",
        fact: "Ce grand reptile marin etait l'un des predateurs puissants des mers.",
      },
      {
        id: "plesiosaurus",
        name: "Plesiosaure",
        icon: "P",
        discovered: false,
        size: "3 a 5 metres",
        food: "Poissons",
        period: "Jurassique",
        fact: "Son long cou l'a rendu tres reconnaissable dans l'imaginaire marin.",
      },
    ],
  },
};

export const grimoireEntries = grimoireWorlds.prairie.entries;
