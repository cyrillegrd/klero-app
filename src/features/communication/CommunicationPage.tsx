const phrases = [
  { icon: "✅", text: "Oui" },
  { icon: "❌", text: "Non" },
  { icon: "🆘", text: "J’ai besoin d’aide" },
  { icon: "🤕", text: "J’ai mal" },
  { icon: "😴", text: "Je suis fatigué" },
  { icon: "💧", text: "J’ai soif" },
  { icon: "🍽️", text: "J’ai faim" },
  { icon: "🚽", text: "Toilettes" },
  { icon: "⏸️", text: "Pause" },
  { icon: "🙉", text: "C’est trop fort" },
  { icon: "🧍", text: "Je veux être seul" },
  { icon: "🤝", text: "Reste avec moi" },
];

function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export function CommunicationPage() {
  return (
    <div className="communication-page">
      <header className="page-header">
        <h1>Communication</h1>
        <p>Appuie sur une phrase pour la dire à voix haute.</p>
      </header>

      <div className="communication-grid">
        {phrases.map((phrase) => (
          <button
            key={phrase.text}
            type="button"
            className="communication-card"
            onClick={() => speak(phrase.text)}
          >
            <span>{phrase.icon}</span>
            <strong>{phrase.text}</strong>
          </button>
        ))}
      </div>
    </div>
  );
}