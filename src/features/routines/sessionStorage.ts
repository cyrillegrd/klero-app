const ROUTINE_SESSION_KEY = "klero_routine_sessions";

export type RoutineSession = {
    
  id: string;
  circuitId: string;
  startedAt: string;
  updatedAt: string;
  currentStepIndex: number;
  completedSteps: number[];
  responses: Record<string, unknown>;
  status: "active" | "paused" | "completed";
  
};

export function loadRoutineSessions(): RoutineSession[] {
  const data = localStorage.getItem(ROUTINE_SESSION_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveRoutineSession(session: RoutineSession) {
  const sessions = loadRoutineSessions();

  const existingIndex = sessions.findIndex(
    (item) => item.id === session.id
  );

  if (existingIndex >= 0) {
    sessions[existingIndex] = session;
  } else {
    sessions.unshift(session);
  }

  localStorage.setItem(
    ROUTINE_SESSION_KEY,
    JSON.stringify(sessions)
  );
}
export function getPausedSession(circuitId: string) {
  const sessions = loadRoutineSessions();

  return sessions.find(
    (session) =>
      session.circuitId === circuitId &&
      session.status === "paused"
  );
}

export function getActiveSession(circuitId: string) {
  const sessions = loadRoutineSessions();

  return sessions.find(
    (session) =>
      session.circuitId === circuitId &&
      session.status === "active"
  );
}

export function getCompletedSessions() {
  return loadRoutineSessions()
    .filter((session) => session.status === "completed")
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime()
    );
}