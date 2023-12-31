"use client";

import { AppConfigs } from "../data/models/app_configs";
import React, { createContext, useRef } from "react";

export const AppConfigsContext = createContext<{ appConfigs: AppConfigs | undefined | null }>({ appConfigs: undefined });

export function AppConfigsProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: AppConfigs | undefined | null;
}) {
  const appConfigs = useRef(value);

  return (
    <AppConfigsContext.Provider value={{ appConfigs: appConfigs.current }}>
      {children}
    </AppConfigsContext.Provider>
  );
}
