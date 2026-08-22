export async function signupVerifyCode(code: string): Promise<void> {
  if (!/^\d{6}$/.test(code)) {
    throw new Error('Invalid code');
  }

  await new Promise(resolve => setTimeout(resolve, 1000));
}
