import type { ReactNode } from 'react';

export function nameAndOthersLabel(members: { label: string }[]): ReactNode {
  const primary = members[0]?.label;

  return (
    <>
      <strong>{primary}</strong>
      {members.length > 1 && (
        <>
          {' '}
          and {members.length - 1} {members.length > 2 ? 'others' : 'other'}
        </>
      )}
    </>
  );
}
