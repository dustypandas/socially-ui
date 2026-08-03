import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { getSessionUser } from '@src/data';
import type { MemberProfile } from '@src/common-libs/types';

type SessionContextValue = {
  sessionUser: MemberProfile | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  refreshSession: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [sessionUser, setSessionUser] = useState<MemberProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    const user = await getSessionUser();
    setSessionUser(user);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let cancelled = false;

    getSessionUser().then(user => {
      if (!cancelled) {
        setSessionUser(user);
        setIsLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo((): SessionContextValue => ({
    sessionUser,
    isLoggedIn: sessionUser !== null,
    isLoading,
    refreshSession,
  }), [sessionUser, isLoading, refreshSession]);

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): SessionContextValue {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return context;
}
