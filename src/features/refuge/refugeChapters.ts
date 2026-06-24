import prairie00 from "../../assets/refuge/prairie/prairie_00.png";
import prairie01 from "../../assets/refuge/prairie/prairie_01.png";
import prairie02 from "../../assets/refuge/prairie/prairie_02.png";
import prairie03 from "../../assets/refuge/prairie/prairie_03.png";
import prairie04 from "../../assets/refuge/prairie/prairie_04.png";
import prairie05 from "../../assets/refuge/prairie/prairie_05.png";
import prairie06 from "../../assets/refuge/prairie/prairie_06.png";
import prairie07 from "../../assets/refuge/prairie/prairie_07.png";
import prairie08 from "../../assets/refuge/prairie/prairie_08.png";
import prairie09 from "../../assets/refuge/prairie/prairie_09.png";
import prairie10 from "../../assets/refuge/prairie/prairie_10.png";
import prairie11 from "../../assets/refuge/prairie/prairie_11.png";
import prairie12 from "../../assets/refuge/prairie/prairie_12.png";
import prairie13 from "../../assets/refuge/prairie/prairie_13.png";
import prairie14 from "../../assets/refuge/prairie/prairie_14.png";
import prairie15 from "../../assets/refuge/prairie/prairie_15.png";
import prairie16 from "../../assets/refuge/prairie/prairie_16.png";
import prairie17 from "../../assets/refuge/prairie/prairie_17.png";
import prairie18 from "../../assets/refuge/prairie/prairie_18.png";
import prairie19 from "../../assets/refuge/prairie/prairie_19.png";
import prairie20 from "../../assets/refuge/prairie/prairie_20.png";
import prairie21 from "../../assets/refuge/prairie/prairie_21.png";
import prairie22 from "../../assets/refuge/prairie/prairie_22.png";
import forest02 from "../../assets/refuge/forest/forest_02.png";
import forest03 from "../../assets/refuge/forest/forest_03.png";
import forest04 from "../../assets/refuge/forest/forest_04.png";
import forest05 from "../../assets/refuge/forest/forest_05.png";
import forest06 from "../../assets/refuge/forest/forest_06.png";
import forest07 from "../../assets/refuge/forest/forest_07.png";
import forest08 from "../../assets/refuge/forest/forest_08.png";
import forest09 from "../../assets/refuge/forest/forest_09.png";
import forest10 from "../../assets/refuge/forest/forest_10.png";
import forest11 from "../../assets/refuge/forest/forest_11.png";
import forest12 from "../../assets/refuge/forest/forest_12.png";
import forest13 from "../../assets/refuge/forest/forest_13.png";
import forest14 from "../../assets/refuge/forest/forest_14.png";
import forest15 from "../../assets/refuge/forest/forest_15.png";
import forest16 from "../../assets/refuge/forest/forest_16.png";
import forest17 from "../../assets/refuge/forest/forest_17.png";
import forest18 from "../../assets/refuge/forest/forest_18.png";
import forest19 from "../../assets/refuge/forest/forest_19.png";
import forest20 from "../../assets/refuge/forest/forest_20.png";
import mountain00 from "../../assets/refuge/mountain/mountain_00.png";
import mountain01 from "../../assets/refuge/mountain/mountain_01.png";
import mountain02 from "../../assets/refuge/mountain/mountain_02.png";
import mountain03 from "../../assets/refuge/mountain/mountain_03.png";
import mountain04 from "../../assets/refuge/mountain/mountain_04.png";
import mountain05 from "../../assets/refuge/mountain/mountain_05.png";
import mountain06 from "../../assets/refuge/mountain/mountain_06.png";
import mountain07 from "../../assets/refuge/mountain/mountain_07.png";
import mountain08 from "../../assets/refuge/mountain/mountain_08.png";
import mountain09 from "../../assets/refuge/mountain/mountain_09.png";
import mountain10 from "../../assets/refuge/mountain/mountain_10.png";
import mountain11 from "../../assets/refuge/mountain/mountain_11.png";
import mountain12 from "../../assets/refuge/mountain/mountain_12.png";
import mountain13 from "../../assets/refuge/mountain/mountain_13.png";
import mountain14 from "../../assets/refuge/mountain/mountain_14.png";
import mountain15 from "../../assets/refuge/mountain/mountain_15.png";
import mountain16 from "../../assets/refuge/mountain/mountain_16.png";
import sea00 from "../../assets/refuge/sea/sea_00.png";
import sea01 from "../../assets/refuge/sea/sea_01.png";
import sea02 from "../../assets/refuge/sea/sea_02.png";
import sea03 from "../../assets/refuge/sea/sea_03.png";
import sea04 from "../../assets/refuge/sea/sea_04.png";
import sea05 from "../../assets/refuge/sea/sea_05.png";
import sea06 from "../../assets/refuge/sea/sea_06.png";
import sea07 from "../../assets/refuge/sea/sea_07.png";
import sea08 from "../../assets/refuge/sea/sea_08.png";
import sea09 from "../../assets/refuge/sea/sea_09.png";
import sea10 from "../../assets/refuge/sea/sea_10.png";
import sea11 from "../../assets/refuge/sea/sea_11.png";
import sea12 from "../../assets/refuge/sea/sea_12.png";
import sea13 from "../../assets/refuge/sea/sea_13.png";
import sea14 from "../../assets/refuge/sea/sea_14.png";


export type RefugeStep = {
  id: string;
  requiredFiches: number;
  title: string;
  description: string;
  image?: string;
};

export const refugeSteps: RefugeStep[] = [
  {
    id: "prairie-1",
    requiredFiches: 0,
    title: "La prairie s’éveille",
    description: "Un coin calme apparaît sur l’île.",
    image: prairie00,
  },
  {
    id: "prairie-2",
    requiredFiches: 15,
    title: "Un premier arbre pousse",
    description: "Le refuge commence doucement à prendre vie.",
    image: prairie01,
  },
  {
    id: "prairie-3",
    requiredFiches: 30,
    title: "Une découverte étrange",
    description: "Quelque chose brille dans l’herbe.",
    image: prairie02,
  },
  {
    id: "prairie-4",
    requiredFiches: 45,
    title: "Une fissure apparaît",
    description: "Une fine craquelure traverse la coquille.",
    image: prairie03,
  },
  {
    id: "prairie-5",
    requiredFiches: 60,
    title: "L’éclosion",
    description: "Un petit museau apparaît.",
    image: prairie04,
  },
    {
    id: "prairie-6",
    requiredFiches: 80,
    title: "L’arrivée dans la prairie",
    description: "Un nouveau compagnon pour t'aider.",
    image: prairie05,
  },
   {
    id: "prairie-7",
    requiredFiches: 90,
    title: "La vie dans la prairie",
    description: "Un monceau de terre apparaît.",
    image: prairie06,
  },
   {
    id: "prairie-8",
    requiredFiches: 100,
    title: "Une nouvelle journée dnas la prairie",
    description: "Une jeune pousse apparaît.",
    image: prairie07,
  },
   {
    id: "prairie-9",
    requiredFiches: 110,
    title: "Bronto se met au boulot",
    description: "Ton compagnon arrose sa nouvelle plante.",
    image: prairie08,
  },
   {
    id: "prairie-10",
    requiredFiches: 120,
    title: "Du nouveau matériel arrive",
    description: "Un nouveau sac pour Bronto.",
    image: prairie09,
  },
  {
    id: "prairie-11",
    requiredFiches: 130,
    title: "La prairie s’éveille",
    description: "De nouvelles fleurs ont éclo.",
    image: prairie10,
  },
  {
    id: "prairie-12",
    requiredFiches: 140,
    title: "La prairie d'agrandit",
    description: "Une pancarte apparaît.",
    image: prairie11,
  },
  {
    id: "prairie-13",
    requiredFiches: 150,
    title: "Une nouvelle étape arrive",
    description: "Bronto grandit et devient un adolescent.",
    image: prairie12,
  },
  {
    id: "prairie-14",
    requiredFiches: 160,
    title: "La chaise",
    description: "Des planches apparaissent dans la prairie.",
    image: prairie13,
  },
  {
    id: "prairie-15",
    requiredFiches: 170,
    title: "La chaise",
    description: "Bronto a des clous et des planches.",
    image: prairie14,
  },
    {
    id: "prairie-16",
    requiredFiches: 180,
    title: "La chaise",
    description: "La chaise est finie !",
    image: prairie15,
  },
   {
    id: "prairie-17",
    requiredFiches: 190,
    title: "La tranquilité",
    description: "Bronto se repose dans sa chaise.",
    image: prairie16,
  },
   {
    id: "prairie-18",
    requiredFiches: 200,
    title: "La prairie change",
    description: "Une barrière apparaît et Bronto est devenu adulte.",
    image: prairie17,
  },
   {
    id: "prairie-19",
    requiredFiches: 210,
    title: "Un nouvel objet",
    description: "Un drôle de perchoir apparaît.",
    image: prairie18,
  },
   {
    id: "prairie-20",
    requiredFiches: 220,
    title: "Un nouvel objet",
    description: "Une lanterne est accrochée au perchoir.",
    image: prairie19,
  },
  {
    id: "prairie-21",
    requiredFiches: 230,
    title: "Un éclat de lumière",
    description: "La lanterne est allumée.",
    image: prairie20,
  },
   {
    id: "prairie-22",
    requiredFiches: 240,
    title: "Le livre",
    description: "Un mystérieux grimoire apparaît.",
    image: prairie21,
  },
  {
    id: "prairie-23",
    requiredFiches: 250,
    title: "Le livre",
    description: "Une information est disponible.",
    image: prairie22,
  },
  {
  id: "prairie-info",
  requiredFiches: 250,
  title: "Le Brontosaure",
  description:
    "Découvre les informations sur ton premier dinosaure.",
},
  {
    id: "forest-1",
    requiredFiches: 250,
    title: "L'orée de la forêt",
    description: "Un chemin s'ouvre derrière la prairie.",
    image: forest02,
  },
  {
    id: "forest-2",
    requiredFiches: 270,
    title: "Les premiers arbres",
    description: "Bronto entre prudemment sous les feuillages.",
    image: forest03,
  },
  {
    id: "forest-3",
    requiredFiches: 280,
    title: "Une clairière tranquille",
    description: "La lumière traverse les branches et apaise le sentier.",
    image: forest04,
  },
  {
    id: "forest-4",
    requiredFiches: 290,
    title: "Un bruit dans les feuilles",
    description: "Quelque chose bouge doucement entre les fougères.",
    image: forest05,
  },
  {
    id: "forest-5",
    requiredFiches: 300,
    title: "Le sentier s'élargit",
    description: "La forêt devient moins intimidante.",
    image: forest06,
  },
  {
    id: "forest-6",
    requiredFiches: 310,
    title: "Un abri naturel",
    description: "Bronto découvre un coin protégé par les branches.",
    image: forest07,
  },
  {
    id: "forest-7",
    requiredFiches: 320,
    title: "Des marques anciennes",
    description: "Des traces racontent qu'un autre passage existe.",
    image: forest08,
  },
  {
    id: "forest-8",
    requiredFiches: 330,
    title: "Le cœur vert",
    description: "Le refuge respire plus profondément.",
    image: forest09,
  },
  {
    id: "forest-9",
    requiredFiches: 340,
    title: "Une rencontre discrète",
    description: "La forêt semble reconnaître Bronto.",
    image: forest10,
  },
  {
    id: "forest-10",
    requiredFiches: 350,
    title: "La mousse lumineuse",
    description: "De petites lumières guident les pas.",
    image: forest11,
  },
  {
    id: "forest-11",
    requiredFiches: 360,
    title: "Le vieux tronc",
    description: "Un arbre immense garde la mémoire du lieu.",
    image: forest12,
  },
  {
    id: "forest-12",
    requiredFiches: 370,
    title: "Un pont de racines",
    description: "Le chemin traverse un passage fragile mais solide.",
    image: forest13,
  },
  {
    id: "forest-13",
    requiredFiches: 380,
    title: "La cabane oubliée",
    description: "Un petit refuge apparaît entre les arbres.",
    image: forest14,
  },
  {
    id: "forest-14",
    requiredFiches: 390,
    title: "Une réserve de calme",
    description: "Bronto rassemble ce qui pourra aider plus tard.",
    image: forest15,
  },
  {
    id: "forest-15",
    requiredFiches: 400,
    title: "La forêt s'ouvre",
    description: "La route devient plus claire.",
    image: forest16,
  },
  {
    id: "forest-16",
    requiredFiches: 410,
    title: "Le gardien du sentier",
    description: "Une présence paisible veille sur le passage.",
    image: forest17,
  },
  {
    id: "forest-17",
    requiredFiches: 420,
    title: "Le passage secret",
    description: "Une nouvelle direction se dessine.",
    image: forest18,
  },
  {
    id: "forest-18",
    requiredFiches: 430,
    title: "La sortie de la forêt",
    description: "Bronto aperçoit la prochaine région de l'île.",
    image: forest19,
  },
  {
    id: "forest-19",
    requiredFiches: 440,
    title: "La forêt accomplie",
    description: "Le monde vert est maintenant un vrai refuge.",
    image: forest20,
  },
  {
    id: "swamp-1",
    requiredFiches: 440,
    title: "Le bord du marécage",
    description: "L'eau calme apparaît entre les racines.",
  },
  {
    id: "swamp-2",
    requiredFiches: 448,
    title: "Les premières bulles",
    description: "De petits cercles troublent la surface.",
  },
  {
    id: "swamp-3",
    requiredFiches: 456,
    title: "Le sentier humide",
    description: "Bronto avance sur une terre plus souple.",
  },
  {
    id: "swamp-4",
    requiredFiches: 464,
    title: "Les roseaux s'ouvrent",
    description: "Un passage discret se dessine.",
  },
  {
    id: "swamp-5",
    requiredFiches: 472,
    title: "Un reflet étrange",
    description: "Quelque chose brille sous l'eau.",
  },
  {
    id: "swamp-6",
    requiredFiches: 480,
    title: "La petite passerelle",
    description: "Quelques planches rendent le chemin plus sûr.",
  },
  {
    id: "swamp-7",
    requiredFiches: 488,
    title: "La brume douce",
    description: "Le marécage devient calme plutôt qu'inquiétant.",
  },
  {
    id: "swamp-8",
    requiredFiches: 496,
    title: "Les nénuphars",
    description: "Des feuilles rondes couvrent l'eau immobile.",
  },
  {
    id: "swamp-9",
    requiredFiches: 504,
    title: "Un abri de branches",
    description: "Bronto trouve un coin sec pour observer.",
  },
  {
    id: "swamp-10",
    requiredFiches: 512,
    title: "Le chant lointain",
    description: "Un son grave répond au silence du lieu.",
  },
  {
    id: "swamp-11",
    requiredFiches: 520,
    title: "Les pierres stables",
    description: "Un chemin de pierres traverse l'eau.",
  },
  {
    id: "swamp-12",
    requiredFiches: 528,
    title: "La cabane sur pilotis",
    description: "Un refuge se construit au-dessus du marécage.",
  },
  {
    id: "swamp-13",
    requiredFiches: 536,
    title: "Une trace dans la vase",
    description: "Un autre compagnon est peut-être passé par ici.",
  },
  {
    id: "swamp-14",
    requiredFiches: 544,
    title: "Le vieux panneau",
    description: "La prochaine direction devient plus claire.",
  },
  {
    id: "swamp-15",
    requiredFiches: 552,
    title: "La lumière verte",
    description: "Des lucioles éclairent le chemin.",
  },
  {
    id: "swamp-16",
    requiredFiches: 560,
    title: "Le grand saule",
    description: "Ses branches protègent l'entrée du cœur du marécage.",
  },
  {
    id: "swamp-17",
    requiredFiches: 568,
    title: "Le cœur du marécage",
    description: "Le monde humide devient un endroit familier.",
  },
  {
    id: "swamp-18",
    requiredFiches: 576,
    title: "Une plateforme solide",
    description: "Bronto peut enfin s'y poser tranquillement.",
  },
  {
    id: "swamp-19",
    requiredFiches: 584,
    title: "La sortie cachée",
    description: "Une pente apparaît derrière les roseaux.",
  },
  {
    id: "swamp-20",
    requiredFiches: 592,
    title: "Vers les hauteurs",
    description: "L'air devient plus frais au loin.",
  },
  {
    id: "swamp-21",
    requiredFiches: 600,
    title: "Le marécage accompli",
    description: "Le passage vers la montagne est prêt.",
  },
  {
    id: "mountain-1",
    requiredFiches: 600,
    title: "Le pied de la montagne",
    description: "Le chemin quitte l'eau et commence à monter.",
    image: mountain00,
  },
  {
    id: "mountain-2",
    requiredFiches: 610,
    title: "Les premières pierres",
    description: "Bronto avance sur un sentier plus solide.",
    image: mountain01,
  },
  {
    id: "mountain-3",
    requiredFiches: 620,
    title: "L'air frais",
    description: "La prairie et la forêt semblent déjà plus loin.",
    image: mountain02,
  },
  {
    id: "mountain-4",
    requiredFiches: 630,
    title: "Un abri de roche",
    description: "Une petite cavité protège du vent.",
    image: mountain03,
  },
  {
    id: "mountain-5",
    requiredFiches: 640,
    title: "La source claire",
    description: "Une eau vive descend entre les pierres.",
    image: mountain04,
  },
  {
    id: "mountain-6",
    requiredFiches: 650,
    title: "La corniche",
    description: "Le passage demande de la patience et du calme.",
    image: mountain05,
  },
  {
    id: "mountain-7",
    requiredFiches: 660,
    title: "Le camp de hauteur",
    description: "Bronto trouve un endroit pour reprendre souffle.",
    image: mountain06,
  },
  {
    id: "mountain-8",
    requiredFiches: 670,
    title: "Les drapeaux au vent",
    description: "Des repères colorés indiquent la bonne direction.",
    image: mountain07,
  },
  {
    id: "mountain-9",
    requiredFiches: 680,
    title: "Le vieux passage",
    description: "Des marches anciennes apparaissent sous la mousse.",
    image: mountain08,
  },
  {
    id: "mountain-10",
    requiredFiches: 690,
    title: "Le ciel s'ouvre",
    description: "La lumière devient plus large au-dessus de Bronto.",
    image: mountain09,
  },
  {
    id: "mountain-11",
    requiredFiches: 700,
    title: "La halte tranquille",
    description: "Un banc de pierre invite à regarder le chemin parcouru.",
    image: mountain10,
  },
  {
    id: "mountain-12",
    requiredFiches: 710,
    title: "Une trace dans la neige",
    description: "Un nouveau monde laisse un signe discret.",
    image: mountain11,
  },
  {
    id: "mountain-13",
    requiredFiches: 720,
    title: "Le refuge d'altitude",
    description: "Une petite cabane résiste au froid.",
    image: mountain12,
  },
  {
    id: "mountain-14",
    requiredFiches: 730,
    title: "Le passage des nuages",
    description: "Bronto traverse une brume claire.",
    image: mountain13,
  },
  {
    id: "mountain-15",
    requiredFiches: 740,
    title: "La crête",
    description: "Le sommet n'est plus très loin.",
    image: mountain14,
  },
  {
    id: "mountain-16",
    requiredFiches: 745,
    title: "La vue immense",
    description: "L'île se dévoile sous un nouvel angle.",
    image: mountain15,
  },
  {
    id: "mountain-17",
    requiredFiches: 750,
    title: "La montagne accomplie",
    description: "Le passage vers la plage est prêt.",
    image: mountain16,
  },
  {
    id: "beach-1",
    requiredFiches: 750,
    title: "Le premier sable",
    description: "Le chemin descend vers une lumiere plus chaude.",
    image: sea00,
  },
  {
    id: "beach-2",
    requiredFiches: 770,
    title: "La plage s'ouvre",
    description: "Les pas deviennent plus doux au bord de l'eau.",
    image: sea01,
  },
  {
    id: "beach-3",
    requiredFiches: 790,
    title: "Les coquillages",
    description: "De petits tresors marquent la ligne du rivage.",
    image: sea02,
  },
  {
    id: "beach-4",
    requiredFiches: 810,
    title: "La cabane claire",
    description: "Un abri simple apparait face au vent marin.",
    image: sea03,
  },
  {
    id: "beach-5",
    requiredFiches: 830,
    title: "Le feu de camp",
    description: "La plage devient un endroit ou reprendre des forces.",
    image: sea04,
  },
  {
    id: "beach-6",
    requiredFiches: 850,
    title: "Les traces sur le sable",
    description: "Un nouveau chemin longe l'ecume.",
    image: sea05,
  },
  {
    id: "beach-7",
    requiredFiches: 870,
    title: "Le ponton",
    description: "Quelques planches avancent vers l'eau profonde.",
    image: sea06,
  },
  {
    id: "beach-8",
    requiredFiches: 900,
    title: "La plage accomplie",
    description: "Le passage vers l'ocean est pret.",
    image: sea07,
  },
  {
    id: "ocean-1",
    requiredFiches: 900,
    title: "Le bord de l'ocean",
    description: "Le refuge regarde maintenant vers le large.",
    image: sea08,
  },
  {
    id: "ocean-2",
    requiredFiches: 925,
    title: "La premiere vague",
    description: "L'eau avance puis recule, reguliere et rassurante.",
    image: sea09,
  },
  {
    id: "ocean-3",
    requiredFiches: 950,
    title: "Le courant calme",
    description: "Un mouvement plus grand guide la suite du voyage.",
    image: sea10,
  },
  {
    id: "ocean-4",
    requiredFiches: 975,
    title: "La barque",
    description: "Un petit passage flottant attend pres du rivage.",
    image: sea11,
  },
  {
    id: "ocean-5",
    requiredFiches: 1000,
    title: "Les eaux profondes",
    description: "La confiance grandit avec l'horizon.",
    image: sea12,
  },
  {
    id: "ocean-6",
    requiredFiches: 1025,
    title: "La lumiere du large",
    description: "Le ciel et la mer ouvrent un espace immense.",
    image: sea13,
  },
  {
    id: "ocean-7",
    requiredFiches: 1050,
    title: "L'ocean accompli",
    description: "Le refuge a trouve son horizon.",
    image: sea14,
  },
];
