import { saveCloudCommunicationFavorites } from "./communicationCloud";

import { useState } from "react";
import "./CommunicationPage.css";

import {
  Volume2,
  Trash2,
} from "lucide-react";



type CommunicationWord = {
  text: string;
};

type SentencePrediction = {
  startsWith: string[];
  suggestions: string[];
};


const quickWords: Record<string, CommunicationWord[]> = {
  qui: [
{ text: "je" },
{text: "j'"},
  { text: "tu" },
  { text: "il" },
  { text: "elle" },
  { text: "on" },
  { text: "iel" },
  { text: "nous" },
  { text: "vous" },
  { text: "ils" },
  { text: "elles" },
  { text: "iels" },
  ],

  actions: [
{ text: "suis" },
    { text: "est" },
    { text: "sommes" },
    { text: "êtes" },
    { text: "sont" },

    { text: "ai" },
    { text: "as" },
    { text: "avons" },
    { text: "avez" },
    { text: "ont" },

    { text: "veux" },
    { text: "voulons" },
    { text: "voulez" },
    { text: "veulent" },

    { text: "peux" },
    { text: "pouvons" },
    { text: "pouvez" },
    { text: "peuvent" },

    { text: "vais" },
    { text: "vas" },
    { text: "allons" },
    { text: "allez" },
    { text: "vont" },
  ],

  reponses: [
 { text: "Oui," },
  { text: "Non" },
  { text: "Je ne sais pas" },
  { text: "Peut-être" },
   { text: "Je t'en prie" },
  { text: "J'ai quelque chose à dire" },
  { text: "Excuse-moi" },
  { text: "Discutons" },
  { text: "C'est une blague" },
  { text: "Je suis désolée" },
  { text: "S'il te plaît" },
  { text: "Merci" },
  { text: "Allez" },
  { text: "Génial" },
  ],
};

const baseCategories = {  
  besoins: [
    {  text: "boire" },
    {  text: "manger" },
    {  text: "aller aux toilettes" },
    { text: "me reposer" },
    { text: "faire une pause" },
    { text: "mon casque" },
    { text: "dormir" },
    {  text: "sortir" },
  ],

  commencer: [
    {  text: "Bonjour" },
  { text: "Bonsoir" },
  { text: "Au revoir" },
  { text: "Salut" },
  {  text: "Bon après-midi" },
  { text: "Je veux" },
  {  text: "Je ne veux pas" },
  { text: "J'ai" },
  { text: "Je n'ai pas" },
  { text: "Je peux" },
  {  text: "Je ne peux pas" },
  { text: "J'ai besoin de" },
  { text: "Je n'ai pas besoin de" },
  { text: "J'ai besoin d'" },
  { text: "Je n'ai pas besoin d'" },
  {  text: "Je suis" },
  { text: "Je ne suis pas" },
  { text: "J'ai mal à" },
  { text: "Je n'ai pas mal à" },
  ],

  pronoms: [
    { text: "je" },
  { text: "tu" },
  { text: "il" },
  { text: "elle" },
  { text: "on" },
  { text: "iel" },
  { text: "nous" },
  { text: "vous" },
  { text: "ils" },
  { text: "elles" },
  { text: "iels" },
  { text: "ça" },
  { text: "lui" },
  { text: "eux" },
  { text: "y" },
  { text: "en" },
  { text: "le" },
  { text: "mien.s" },
  { text: "tien.s" },
  { text: "mienne.s" },
  { text: "tienne.s" },
  { text: "sien.s" },
  { text: "sienne.s" },
  { text: "mon" },
  { text: "ton" },
  { text: "son" },
  { text: "mes" },
  { text: "tes" },
  { text: "ses" },
  { text: "vos" },
  { text: "votre" },
  { text: "nos" },
  { text: "notre" },
  { text: "leur.s" },
  { text: "celui-ci" },
  { text: "celui-là" },
  { text: "celui" },
  { text: "celle-ci" },
  { text: "celle-là" },
  { text: "celle" },
  { text: "ceux-ci" },
  { text: "ceux-là" },
  { text: "ceux" },
  { text: "ce" },
  { text: "se" },
  { text: "qui" },
  { text: "que" },
  { text: "quoi" },
  { text: "dont" },
  { text: "ou" },
  { text: "lequel" },
  { text: "laquelle" },
  { text: "lesquel.les" },
  { text: "auquel" },
  { text: "duquel" },
  ],

  verbes: [
    { text: "être" },
    { text: "vouloir" },
    { text: "faire" },
    { text: "avoir" },
    { text: "pouvoir" },
    { text: "aimer" },
    { text: "avoir besoin" },
    { text: "arrêter" },
    { text: "aller" },
    { text: "venir" },
    { text: "donner" },
    { text: "savoir" },
    { text: "aider" },
    { text: "écouter" },
    { text: "prendre" },
    { text: "regarder" },
    { text: "penser" },
    { text: "dire" },
    { text: "mettre" },
    { text: "manger" },
    { text: "jouer" },
    { text: "appeler" },
    { text: "attendre" },
    { text: "boire" },
    { text: "changer" },
    { text: "chercher" },
    { text: "ouvrir" },
    { text: "commencer" },
    {  text: "allumer" },
    { text: "fermer" },
    { text: "essayer" },
    {  text: "éteindre" },
    {  text: "se lever" },
    { text: "laver" },
    {  text: "lire" },
    {  text: "s'asseoir" },
    {  text: "montrer" },
    { text: "raconter" },
    {  text: "travailler" },
    {  text: "voir" },
  ],

  noms: [
    { text: "famille" },
  { text: "papa" },
  { text: "maman" },
  { text: "ami" },
  { text: "frère" },
  { text: "soeur" },
  { text: "aide" },
  { text: "docteur" },
  { text: "infirmière" },
  { text: "maître/maîtresse" },
  { text: "choses" },
  { text: "boisson" },
  { text: "maison" },
  { text: "petit-déjeuner" },
  { text: "école" },
  { text: "déjeuner" },
  { text: "travail" },
  { text: "dîner" },
  { text: "courses" },
  { text: "goûter" },
  { text: "hôpital" },
  { text: "fruits" },
  { text: "parc" },
  { text: "anniversaire" },
  { text: "ordinateur" },
  { text: "tablette" },
  { text: "musique" },
  { text: "dehors" },
  { text: "télé" },
  { text: "jeu" },
  { text: "mot" },
  { text: "email" },
  { text: "message" },
  { text: "réseaux sociaux" },
 
  ],

  adjectifs: [
    { text: "affamé" },
  { text: "bête" },
  { text: "blessé" },
  { text: "effrayé" },
  { text: "en sécurité" },
  { text: "excité" },
  { text: "fâché" },
  { text: "fatigué" },
  { text: "frustré" },
  { text: "heureux" },
  { text: "inquiet" },
  { text: "malade" },
  { text: "triste" },
  { text: "bien" },
    { text: "en colère" },
    { text: "peur" },
    { text: "stressé" },
    { text: "en surcharge" },

  ],

  articles: [
    { text: "le" },
  { text: "la" },
  { text: "les" },
  { text: "l'" },
  { text: "de" },
  { text: "d'" },
  { text: "des" },
  { text: "à" },
  { text: "au" },
  { text: "aux" },
  { text: "du" },
  { text: "un" },
  { text: "une" },
  { text: "de la" },
  { text: "de l'"},
  ],

  prépositions: [
    { text: "à" },
  { text: "avec" },
  { text: "de" },
  { text: "pour" },
  { text: "sur" },
  { text: "là" },
  { text: "avant" },
  { text: "dans" },
  { text: "ici" },
  { text: "chez"},
  { text: "par"},
  ],

  directions: [
    { text: "par" },
  { text: "loin" },
  { text: "près" },
  { text: "vers" },
  { text: "dessus" },
  { text: "dessous" },
  
  ],

  conjonctions: [
    { text: "parce que" },
  { text: "que" },
  { text: "ou" },
  { text: "et" },
  { text: "si" },
  { text: "mais" },
  ],

temps: [
    { text: "pas" },
    { text: "encore" },
    { text: "maintenant" },
    { text: "demain" },
    { text: "ajourd'hui" },
    { text: "ce soir" },
    { text: "jour" },
    { text: "demain" },
    { text: "semaine" },
    { text: "hier" },
    { text: "week-end" },
    { text: "mois" },
    { text: "année"},
    { text: "plus tôt" },
    { text: "plus tard" },
    { text: "toujours" },
    { text:"bientôt"}
  ],

  questions: [
    { text: "pourquoi" },
    { text: "quoi" },
    { text: "où" },
    {  text: "qui" },
    { text: "quand" },
    { text: "combien" },
    { text: "comment" },
    { text: "Je me pose une question" },
    { text: "Comment vas-tu ?" },
    { text: "Qu'est-ce que tu en penses ?" },
  ],

  douleur: [
    { text: "mal" },
    { text: "à la tête" },
    { text: "au ventre" },
    { text: "aux dents" },
    { text: "à la main" },
    { text: "à la jambe" },
    { text: "au dos" },
    { text: "aux yeux" },
    { text: "à la cheville" },
    { text: "au genou" },
    { text: "aux fesses" },
  ],

  social: [
    {text: "bonjour" },
    { text: "merci" },
    { text: "non, merci" },
    {  text: "reste avec moi" },
    { text: "être seul" },
    { text: "s'il vous plaît" },
    { text: "s'il te plait" },
    { text: "de rien" },
    { text: "oui, merci" },
  ],

  vitesse: [
  { text: "lent" },
    { text: "rapide" },
  ],

  positions: [
    { text: "suivant" },
    { text: "avant" },
    { text: "après" },
    { text: "haut" },
    { text: "bas" },
    { text: "premier" },
    { text: "dernier" },
    { text: "ça commence par" },
  ],

  taille: [
    { text: "grand" },
    { text: "petit" },
    { text: "moyen" },
    
  ],

  utiles: [
    { text: "c'est fini" },
    { text: "bien" },
    { text: "autre" },
    { text: "tout" },
    { text: "quelque.s" },
    { text: "rien" },
    { text: "ne pas" },
    { text: "préféré" },
    { text: "drôle" },
    { text: "difficile" },
    { text: "pareil" },
    { text: "plus" },
    { text: "nul" },
    { text: "moins" },
    { text: "mouillé" },
    { text: "sale" },
    {  text: "silencieux" },
    { text: "bruyant" },
    { text: "chaud" },
    { text: "froid" },
  ],

  urgence: [
    { text: "de l'aide" },
    { text: "appeler quelqu'un" },
    { text: "un médecin" },
    { text: "c'est une urgence" },
    { text: "Aide-moi" },
    { text: "en crise" },
    { text: "plus parler" },
  ],

  phrases: [
    { text: "Je raconte une histoire." },
    { text: "J'ai une idée." },
    { text: "Si tu veux !" },
    { text: "Je ne suis pas prêt.e" },
    { text: "Attends" },
    { text: "J'ai besoin de te parler" },
    {  text: "Pose-moi une question fermée." },
    { text: "Ce n'est pas ce que je veux dire." },
    { text: "Ma tablette a besoin d'être rechargée." },
    { text: "Quelque chose ne va pas." },
    { text: "Je peux le faire tout.e seul.e" },
    { text: "J'ai besoin d'une pause." },
    { text: "Je ne comprends pas." },
  ],
};


const fallbackPredictions = [
  "J'ai besoin de faire une pause.",
  "Je veux boire.",
  "Je veux manger.",
  "Je suis fatigue.",
  "Je ne comprends pas.",
  "Quelque chose ne va pas.",
];

const sentencePredictions: SentencePrediction[] = [
  {
    startsWith: ["je veux", "j' veux"],
    suggestions: [
      "Je veux boire.",
      "Je veux manger.",
      "Je veux faire une pause.",
    ],
  },
  {
    startsWith: ["j'ai besoin de", "j'ai besoin d"],
    suggestions: [
      "J'ai besoin de calme.",
      "J'ai besoin de mon casque.",
      "J'ai besoin de te parler.",
    ],
  },
  {
    startsWith: ["j'ai mal"],
    suggestions: [
      "J'ai mal a la tete.",
      "J'ai mal au ventre.",
      "J'ai mal au dos.",
    ],
  },
  {
    startsWith: ["je suis"],
    suggestions: [
      "Je suis fatigue.",
      "Je suis en surcharge.",
      "Je suis inquiet.",
    ],
  },
  {
    startsWith: ["je ne veux pas"],
    suggestions: [
      "Je ne veux pas parler.",
      "Je ne veux pas continuer.",
      "Je ne veux pas etre touche.",
    ],
  },
  {
    startsWith: ["je ne peux pas"],
    suggestions: [
      "Je ne peux pas le faire maintenant.",
      "Je ne peux pas expliquer.",
      "Je ne peux pas continuer.",
    ],
  },
  {
    startsWith: ["peux", "je peux"],
    suggestions: [
      "Je peux le faire tout seul.",
      "Je peux essayer.",
      "Je peux attendre.",
    ],
  },
  {
    startsWith: ["pourquoi", "comment", "quand", "ou"],
    suggestions: [
      "Pourquoi tu dis ca ?",
      "Comment je peux faire ?",
      "Quand est-ce qu'on part ?",
    ],
  },
  {
    startsWith: ["non"],
    suggestions: [
      "Non merci.",
      "Non, je ne veux pas.",
      "Non, ce n'est pas ca.",
    ],
  },
  {
    startsWith: ["oui"],
    suggestions: [
      "Oui merci.",
      "Oui, je veux bien.",
      "Oui, c'est ca.",
    ],
  },
];

function normalizePredictionText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[â€™']/g, "'")
    .replace(/[^\p{L}\p{N}' ]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getSentencePredictions(sentence: string) {
  const normalizedSentence = normalizePredictionText(sentence);

  if (!normalizedSentence) {
    return fallbackPredictions;
  }

  const matchedPredictions = sentencePredictions.find((prediction) =>
    prediction.startsWith.some((start) =>
      normalizedSentence.startsWith(normalizePredictionText(start))
    )
  );

  if (matchedPredictions) {
    return matchedPredictions.suggestions;
  }

  return fallbackPredictions
    .filter((prediction) =>
      normalizePredictionText(prediction).startsWith(normalizedSentence)
    )
    .slice(0, 3);
}
function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}



export function CommunicationPage() {
  const [sentence, setSentence] = useState("");
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [customPhrase, setCustomPhrase] = useState("");

  const [favorites, setFavorites] = useState<
    { icon: string; text: string }[]
  >(() => {
    const saved = localStorage.getItem(
      "klero-communication-favorites"
    );

    return saved ? JSON.parse(saved) : [];
  });

  const categories = {
    ...baseCategories,
    favoris: favorites,
  };

  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof categories>("besoins");

    const [wordPage, setWordPage] = useState(0);

const wordsPerPage = 12;

const currentWords = categories[selectedCategory];

const paginatedWords = currentWords.slice(
  wordPage * wordsPerPage,
  wordPage * wordsPerPage + wordsPerPage
);

const totalWordPages = Math.ceil(
  currentWords.length / wordsPerPage
);

const predictedSentences = getSentencePredictions(sentence);

function changeCategory(category: keyof typeof categories) {
  setSelectedCategory(category);
  setWordPage(0);
}

  function addToSentence(text: string) {
    setSentence((previous) =>
      previous ? `${previous} ${text}` : text
    );

    if (autoSpeak) {
      speak(text);
    }
  }

  function removeLastWord() {
    const words = sentence.split(" ");
    words.pop();
    setSentence(words.join(" "));
  }

  function saveFavorites(nextFavorites: { icon: string; text: string }[]) {
  setFavorites(nextFavorites);

  localStorage.setItem(
    "klero-communication-favorites",
    JSON.stringify(nextFavorites)
  );

  saveCloudCommunicationFavorites(nextFavorites);
}

function isWord(
  word: { text: string } | undefined
): word is { text: string } {
  return Boolean(word);
}

return (
  <div className="communication-page">
    <header className="communication-hero">
      <div>
        <h1>💬 Communication</h1>
        <p>Construis une phrase et fais-la lire.</p>
      </div>

      <div className="communication-level">
        <span>🔥</span>
        <small>Niv 1</small>
      </div>
    </header>

    <section className="communication-mission">
      <strong>🎯 Mission du jour</strong>
      <p>Dis ce que tu veux maintenant</p>
    </section>

    <section className="communication-panel">
      <h2>Favoris rapides</h2>

      <div className="communication-quickwords communication-quickwords--scroll">
        {Object.entries(quickWords).map(([groupName, words]) => (
          <div key={groupName} className="communication-word-group">
            {words.filter(isWord).map((word, index) => (
              <button
                key={`${groupName}-${word.text}-${index}`}
                type="button"
                className="communication-word"
                onClick={() => addToSentence(word.text)}
              >
                <strong>{word.text}</strong>
              </button>
            ))}
          </div>
        ))}
      </div>
    </section>

    <section className="communication-builder">
      <h2>Construis ta phrase</h2>

      <div className="communication-sentence">
        {sentence || "Ta phrase apparaîtra ici..."}
      </div>

      {predictedSentences.length > 0 && (
        <div className="communication-predictions">
          <span>Suggestions</span>

          <div className="communication-prediction-list">
            {predictedSentences.map((prediction) => (
              <button
                key={prediction}
                type="button"
                onClick={() => {
                  setSentence(prediction);

                  if (autoSpeak) {
                    speak(prediction);
                  }
                }}
              >
                {prediction}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="communication-actions">
        <button
          type="button"
          className="primary-button"
          disabled={!sentence}
          onClick={() => speak(sentence)}
        >
          <Volume2 size={18} />
          Lire
        </button>

        <button
          type="button"
          className="secondary-button"
          disabled={!sentence}
          onClick={removeLastWord}
        >
          ↩ Dernier
        </button>

        <button
          type="button"
          className="secondary-button"
          disabled={!sentence}
          onClick={() => setSentence("")}
        >
          <Trash2 size={18} />
          Effacer
        </button>
      </div>
    </section>

    <section className="communication-panel">
      <h2>Catégories</h2>

      <div className="communication-categories">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            type="button"
            className={
              selectedCategory === category
                ? `tab tab--active communication-category communication-category--${category}`
                : `tab communication-category communication-category--${category}`
            }
            onClick={() =>
  changeCategory(
    category as keyof typeof categories
  )
}
          >
            <span>
  {category.charAt(0).toUpperCase() +
    category.slice(1)}
</span>
          </button>
        ))}
      </div>
    </section>

    <section className="communication-panel">
      <h2>Mots</h2>

      <div className="communication-grid">
        {paginatedWords.map((phrase) => (
          <button
            key={phrase.text}
            type="button"
            className="communication-card"
            onClick={() => addToSentence(phrase.text)}
          >
            <strong>{phrase.text}</strong>
          </button>
        ))}
      </div>

      {totalWordPages > 1 && (
  <div className="communication-pagination">
    <button
      type="button"
      disabled={wordPage === 0}
      onClick={() =>
        setWordPage((page) =>
          Math.max(page - 1, 0)
        )
      }
    >
      ←
    </button>

    <span>
      {wordPage + 1} / {totalWordPages}
    </span>

    <button
      type="button"
      disabled={wordPage >= totalWordPages - 1}
      onClick={() =>
        setWordPage((page) =>
          Math.min(page + 1, totalWordPages - 1)
        )
      }
    >
      →
    </button>
  </div>
)}
    </section>

    <section className="communication-panel">
      <h2>⭐ Mes favoris</h2>

      <div className="communication-favorite-form">
        <input
          value={customPhrase}
          placeholder="Ajouter une phrase favorite..."
          onChange={(event) =>
            setCustomPhrase(event.target.value)
          }
        />

        <button
          type="button"
          className="primary-button"
          onClick={() => {
            if (!customPhrase.trim()) return;

            saveFavorites([
              ...favorites,
              {
                icon: "⭐",
                text: customPhrase.trim(),
              },
            ]);

            setCustomPhrase("");
            setSelectedCategory("favoris");
          }}
        >
          Ajouter
        </button>
      </div>
    </section>

    <label className="communication-toggle">
      <input
        type="checkbox"
        checked={autoSpeak}
        onChange={(event) =>
          setAutoSpeak(event.target.checked)
        }
      />
      🔊 Lecture automatique
    </label>
  </div>
);
}
