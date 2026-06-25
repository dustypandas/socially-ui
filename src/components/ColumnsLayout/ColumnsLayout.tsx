import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import './columns-layout.css';

type MainPosition = 'left' | 'right';

type ColumnsLayoutContextValue = {
  isStacked: boolean;
};

const ColumnsLayoutContext = createContext<ColumnsLayoutContextValue>({
  isStacked: false,
});

function useColumnsLayoutContext() {
  return useContext(ColumnsLayoutContext);
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const onChange = () => setMatches(mediaQuery.matches);

    onChange();
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

type ColumnsLayoutRootProps = {
  children: ReactNode;
  mainPosition?: MainPosition;
  stackAt?: number;
  gap?: string;
  className?: string;
};

function ColumnsLayoutRoot({
  children,
  mainPosition = 'left',
  stackAt = 780,
  gap,
  className = '',
}: ColumnsLayoutRootProps) {
  const isStacked = useMediaQuery(`(max-width: ${stackAt}px)`);

  const style: CSSProperties | undefined = gap
    ? { '--columns-gap': gap } as CSSProperties
    : undefined;

  const rootClassName = [
    'columns-layout',
    mainPosition === 'right' && 'columns-layout--main-right',
    isStacked && 'columns-layout--stacked',
    className,
  ].filter(Boolean).join(' ');

  return (
    <ColumnsLayoutContext.Provider value={{ isStacked }}>
      <div className={rootClassName} style={style}>
        {children}
      </div>
    </ColumnsLayoutContext.Provider>
  );
}

type ColumnSlotProps = {
  children: ReactNode;
  sticky?: boolean;
  className?: string;
};

function Main({ children, sticky = false, className = '' }: ColumnSlotProps) {
  const { isStacked } = useColumnsLayoutContext();

  const slotClassName = [
    'columns-layout__main',
    sticky && !isStacked && 'columns-layout__slot--sticky',
    className,
  ].filter(Boolean).join(' ');

  return <div className={slotClassName}>{children}</div>;
}

type AsideProps = ColumnSlotProps & {
  asideWidth?: string;
};

function Aside({
  children,
  sticky = false,
  asideWidth,
  className = '',
}: AsideProps) {
  const { isStacked } = useColumnsLayoutContext();

  const style: CSSProperties | undefined = asideWidth
    ? { '--columns-aside-width': asideWidth } as CSSProperties
    : undefined;

  const slotClassName = [
    'columns-layout__aside',
    sticky && !isStacked && 'columns-layout__slot--sticky',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={slotClassName} style={style}>
      {children}
    </div>
  );
}

function assertValidChildren(children: ReactNode) {
  Children.forEach(children, child => {
    if (!isValidElement(child)) return;

    const displayName = (child.type as { displayName?: string }).displayName;
    if (
      displayName !== 'ColumnsLayoutMain'
      && displayName !== 'ColumnsLayoutAside'
    ) {
      console.warn(
        'ColumnsLayout expects ColumnsLayout.Main and ColumnsLayout.Aside as direct children.',
      );
    }
  });
}

type ColumnsLayoutProps = ColumnsLayoutRootProps;

function ColumnsLayout(props: ColumnsLayoutProps) {
  assertValidChildren(props.children);
  return <ColumnsLayoutRoot {...props} />;
}

Main.displayName = 'ColumnsLayoutMain';
Aside.displayName = 'ColumnsLayoutAside';

ColumnsLayout.Main = Main;
ColumnsLayout.Aside = Aside;

export { ColumnsLayout };
