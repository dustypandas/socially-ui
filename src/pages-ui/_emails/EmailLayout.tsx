import type { ReactNode } from 'react';

const fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif';

type EmailLayoutProps = {
  children: ReactNode;
};

export function EmailLayout({ children }: EmailLayoutProps) {
  return (
    <table width="100%" cellPadding={0} cellSpacing={0}>
      <tbody>
        <tr>
          <td align="center">
            <table width="100%" cellPadding={0} cellSpacing={0} style={{ maxWidth: 600 }}>
              <tbody>
                <tr>
                  <td
                    align="left"
                    style={{
                      padding: 16,
                      fontFamily,
                      fontSize: 16,
                      lineHeight: 1.6,
                      color: '#151515',
                    }}
                  >
                    {children}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
