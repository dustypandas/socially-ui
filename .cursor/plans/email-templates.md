# Email templates directory

Create a flat `src/pages-ui/_emails/` folder of React email designs (dynamic subject + content, inline styles) plus a simple iframe preview linked from IndexPage. Design source only — not a Next.js send path.

## Status

- [x] Create `EmailLayout.tsx` as an inner table wrapper (inline styles, no html/body/role)
- [x] Create `SignupVerifyCode.tsx` with dynamic `subject(props)` and `content(props)`
- [x] Create `EmailPreviewPage` with a sample-props registry, route, and IndexPage link
- [x] Run `pnpm lint` and/or `pnpm exec tsc --noEmit`

## Context

This is a Vite SPA. Templates here are **design sources** to port later to a Next.js mailer — not a production send path. They live in this folder as files (not a framed page). No `PageLayout` header/nav/footer.

## Structure (flat)

```
src/pages-ui/_emails/
  PLAN.md
  EmailLayout.tsx
  SignupVerifyCode.tsx
  EmailPreviewPage.tsx
  email-preview.css
```

No `base/`, `templates/`, `types.ts`, or barrel. Types live next to the files that use them.

Skip `MembershipRequest` until there is real copy.

## Template pattern

Both subject and content are functions over the same props. Template markup uses **inline `style={}` only** — no `className`, no shared CSS for the email body (clients strip it).

```tsx
// SignupVerifyCode.tsx
type Props = { code: string };

export const subject = ({ code }: Props) =>
  `${code} is your Socially verification code`;

export const content = ({ code }: Props) => (
  <EmailLayout>
    <h1 style={{ ... }}>Verify your email</h1>
    <p style={{ ... }}>Enter this code to continue:</p>
    <div style={{ ... }}>{code}</div>
  </EmailLayout>
);
```

## EmailLayout

Inner table wrapper only. Do **not** render `<html>`, `<body>`, or `role` (repo forbids ARIA; nested html/body is awkward in the SPA). Use `align` / `cellPadding` / `width` for email clients.

```tsx
export function EmailLayout({ children }: { children: ReactNode }) {
  return (
    <table width="100%" cellPadding={0} cellSpacing={0}>
      <tbody>
        <tr>
          <td align="center" style={{ padding: '40px 20px' }}>
            <table width="100%" cellPadding={0} cellSpacing={0} style={{ maxWidth: 480 }}>
              <tbody>
                <tr>
                  <td>{children}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
```

The preview (or a later Next.js send path) can wrap this in a full HTML document when building a string.

## Preview

`EmailPreviewPage.tsx` is preview chrome only (`email-preview.css` is fine here).

Small registry so adding a third email later is one entry:

```ts
{ id, label, subject, content, sampleProps }
```

- Route `#/emails-preview` in [`src/index.tsx`](../../index.tsx) (not in main nav)
- Link from [`src/pages/IndexPage.tsx`](../../pages/IndexPage.tsx) (how prototypes are discovered)
- Render selected template + subject from the same `sampleProps`
- Iframe preview; optional copy-HTML via `renderToStaticMarkup` as a **preview aid**, not a send API

Do not add `_emails` to [`src/pages-ui/index.ts`](../index.ts) as a product page — import `EmailPreviewPage` only where the route needs it.

## Initial template

**SignupVerifyCode** — after `signupInitial`; subject includes the 6-digit code.

## Verification

Run `pnpm lint` and/or `pnpm exec tsc --noEmit`.
