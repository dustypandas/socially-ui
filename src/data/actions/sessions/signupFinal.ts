export type SignupFinalPayload = {
  firstName: string;
  lastName: string;
  password: string;
  madridSince: string;
  livingNear?: string;
  previousHomes: string[];
};

export async function signupFinal(payload: SignupFinalPayload): Promise<void> {
  if (!payload.firstName.trim()) throw new Error('First name is required');

  await new Promise(resolve => setTimeout(resolve, 1000));
}
