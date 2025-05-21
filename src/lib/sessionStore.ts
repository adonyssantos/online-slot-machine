type Session = {
  credits: number;
  rolls: number;
};

const sessions = new Map<string, Session>();

export function createSession(sessionId: string) {
  sessions.set(sessionId, { credits: 10, rolls: 0 });
}

export function getSession(sessionId: string): Session | undefined {
  return sessions.get(sessionId);
}

export function updateSession(sessionId: string, data: Partial<Session>) {
  const session = sessions.get(sessionId);
  if (session) {
    sessions.set(sessionId, { ...session, ...data });
  }
}

export function deleteSession(sessionId: string) {
  sessions.delete(sessionId);
}
