import prairie00 from "../../assets/refuge/prairie/prairie_00.png";
import prairie01 from "../../assets/refuge/prairie/prairie_01.png";
import prairie02 from "../../assets/refuge/prairie/prairie_02.png";
import prairie03 from "../../assets/refuge/prairie/prairie_03.png";
import prairie04 from "../../assets/refuge/prairie/prairie_04.png";
import prairie05 from "../../assets/refuge/prairie/prairie_05.png";

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
  id: "prairie-info",
  requiredFiches: 100,
  title: "Le Brontosaure",
  description:
    "Découvre ton premier dinosaure.",
},
];