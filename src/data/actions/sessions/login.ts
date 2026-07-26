import { authUser } from '../../stores/dummyData.ts';

export async function login(email: string, password: string): Promise<void> {
  const trimmedEmail = email.trim();

  await new Promise(resolve => setTimeout(resolve, 1000));

  if (trimmedEmail === authUser.email && password === authUser.password) {
    return;
  }

  throw new Error('Incorrect email or password.');
}
