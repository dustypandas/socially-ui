type ResetPasswordConfirmInput = {
  email: string;
  resetCode: string;
  password: string;
};

export async function resetPasswordConfirm({
  email,
  resetCode,
  password,
}: ResetPasswordConfirmInput): Promise<void> {
  if (!email.trim()) {
    throw new Error('Email is required');
  }

  if (!/^\d{6}$/.test(resetCode)) {
    throw new Error('Invalid code');
  }

  if (!password) {
    throw new Error('Password is required');
  }

  await new Promise(resolve => setTimeout(resolve, 1000));
}
