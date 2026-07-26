export async function signupStep1(email: string): Promise<void> {
  const trimmed = email.trim();
  if (!trimmed) throw new Error('Email is required');

  await new Promise(resolve => setTimeout(resolve, 1000));
}
