"use client";
import { Session } from "next-auth";
import { createContext, useContext } from "react";

const SessionContext = createContext<Session | null>(null);

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({
  value: session,
  children,
}: {
  value: Session | null;
  children: React.ReactNode;
}) => {
  if (!session) {
    return <>{children}</>;
  }
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
