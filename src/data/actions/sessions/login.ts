import { sessionUser, sessionState } from '../../stores/userData/index.ts';

export async function ensureSession(): Promise<void> {
  sessionState.isLoggedIn = true;
}

export async function login(email: string, password: string): Promise<void> {
  const trimmedEmail = email.trim();

  await new Promise(resolve => setTimeout(resolve, 1000));

  if (trimmedEmail === sessionUser.email && password === sessionUser.password) {
    sessionState.isLoggedIn = true;
    return;
  }

  throw new Error('Incorrect email or password.');
}
