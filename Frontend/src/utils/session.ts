const SESSION_ID_KEY = "movie_finder_session_id";

export const generateSessionId = (): string => {
  return crypto.randomUUID();
};

export const getOrCreateSessionId = (): string => {
  let sessionId = localStorage.getItem(SESSION_ID_KEY);

  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem(SESSION_ID_KEY, sessionId);
    console.log("✅ New session ID created:", sessionId);
  } else {
    console.log("♻️ Using existing session ID:", sessionId);
  }

  return sessionId;
};
