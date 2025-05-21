export type Session = {
  id: string;
  credits: number;
  rolls: number;
};

const globalForSessions = globalThis as unknown as {
  sessions: Map<string, Session> | undefined;
};

const sessions = globalForSessions.sessions ?? new Map<string, Session>();

if (!globalForSessions.sessions) {
  globalForSessions.sessions = sessions;
}

export function createSession(sessionId: string): Session | undefined {
  sessions.set(sessionId, { id: sessionId, credits: 10, rolls: 0 });
  return sessions.get(sessionId);
}

export function getSession(sessionId: string): Session | undefined {
  return sessions.get(sessionId);
}

export function updateSession(sessionId: string, data: Partial<Session>): Session | undefined {
  const session = sessions.get(sessionId);
  if (session) {
    sessions.set(sessionId, { ...session, ...data });
  }
  return sessions.get(sessionId);
}

export function deleteSession(sessionId: string): void {
  sessions.delete(sessionId);
}
