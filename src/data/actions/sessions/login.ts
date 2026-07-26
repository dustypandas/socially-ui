import { authUser } from '../../stores/dummyData.ts';

export async function login(email: string, password: string): Promise<void> {
  const trimmedEmail = email.trim();

  if (trimmedEmail === authUser.email && password === authUser.password) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return;
  }

  throw new Error('Incorrect email or password.');
}
