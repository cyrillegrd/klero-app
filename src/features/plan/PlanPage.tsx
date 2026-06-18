import { Card } from "../../components/ui/Card";
import { SectionTitle } from "../../components/ui/SectionTitle";

export function PlanPage() {
  return (
    <div className="plan-page">
      <header className="page-header">
        <h1>Plan</h1>
        <p>Tout ce qui est prévu, au même endroit.</p>
      </header>

      <div className="tabs" role="tablist" aria-label="Vue du plan">
        <button className="tab tab--active">Jour</button>
        <button className="tab">Semaine</button>
        <button className="tab">Mois</button>
      </div>

      <Card>
        <SectionTitle>Aujourd'hui</SectionTitle>
        <p>Aucune tâche prévue.</p>
      </Card>

      <div className="plan-grid">
        <Card>
          <SectionTitle>Tâches</SectionTitle>
          <p>0 tâche</p>
        </Card>

        <Card>
          <SectionTitle>Rendez-vous</SectionTitle>
          <p>0 rendez-vous</p>
        </Card>

        <Card>
          <SectionTitle>Routines</SectionTitle>
          <p>0 routine</p>
        </Card>

        <Card>
          <SectionTitle>Notes</SectionTitle>
          <p>0 note</p>
        </Card>
      </div>
    </div>
  );
}