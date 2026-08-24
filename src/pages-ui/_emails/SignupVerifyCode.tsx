import { EmailLayout } from './EmailLayout';

type Props = { code: string };

const fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif';

export const subject = ({ code }: Props) =>
  `${code} is your Socially verification code`;

export const content = ({ code }: Props) => (
  <EmailLayout>
    <div
      style={{
        fontFamily,
        fontSize: 28,
        fontWeight: 600,
        color: '#151515',
        marginTop: 0,
        marginBottom: 0,
        paddingBottom: 20,
      }}
    >
      {code}
    </div>
    <div
      style={{
        fontFamily,
        fontSize: 16,
        fontWeight: 400,
        color: '#151515',
        marginTop: 0,
        marginBottom: 0,
      }}
    >
      is your Socially verification code.
    </div>
    <div
      style={{
        fontFamily,
        fontSize: 14,
        fontWeight: 400,
        color: '#757575',
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 24,
      }}
    >
      <div>
        Never share this code or enter it anywhere other than Socially.
      </div>
      <div style={{ paddingTop: 10 }}>
        If you didn’t request this code, you can ignore this email.
      </div>
    </div>
  </EmailLayout>
);
