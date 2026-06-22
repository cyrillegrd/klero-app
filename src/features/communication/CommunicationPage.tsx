import { useState } from "react";
import "./CommunicationPage.css";

const quickWords = [
  
  { text: "Oui," },
  { text: "Non" },
  { text: "Je ne sais pas" },
  { text: "peut-être" },
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
];

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
  { text: "un" },
  { text: "une" },
  { text: "ça" },
  { text: "ce" },
  { text: "la" },


  { text: "sien.s" },
  { text: "sienne.s" },
  { text: "mon" },
  { text: "ton" },
  { text: "son" },
  { text: "vos" },
  { text: "votre.s" },
  { text: "leur.s" },
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
}

  return (
    <div className="communication-page">
      <header className="page-header">
        <h1>💬 Communication</h1>
        <p>Construis une phrase et fais-la lire.</p>
      </header>

      <div className="communication-sentence">
        {sentence || "Choisis des mots..."}
      </div>

      <div className="communication-actions">
        <button
          type="button"
          className="primary-button"
          disabled={!sentence}
          onClick={() => speak(sentence)}
        >
          ▶ Lire
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
          🗑 Effacer
        </button>
      </div>

      <div className="communication-favorite-form">
  <input
    value={customPhrase}
    placeholder="Ajouter une phrase favorite..."
    onChange={(event) => setCustomPhrase(event.target.value)}
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

      <div className="communication-quickwords communication-quickwords--scroll">
        {quickWords.map((word) => (
          <button
            key={word.text}
            type="button"
            className="communication-word"
            onClick={() => addToSentence(word.text)}
          >
            
            <strong>{word.text}</strong>
          </button>
        ))}
      </div>

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
    setSelectedCategory(
      category as keyof typeof categories
    )
  }
>
  {category.charAt(0).toUpperCase() + category.slice(1)}
</button>
        ))}
      </div>



      <div className="communication-grid">
        {categories[selectedCategory].map((phrase) => (
          <button
            key={phrase.text}
            type="button"
            className="communication-card communication-tile"
            onClick={() => addToSentence(phrase.text)}
          >
            
            <strong>{phrase.text}</strong>
          </button>
        ))}
      </div>
    </div>
  );
}