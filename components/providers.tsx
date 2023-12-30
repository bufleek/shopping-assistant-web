"use client";

import { AppConfigs } from "../data/models/app_configs";
import React, { createContext, useState } from "react";

export const AppConfigsContext = createContext<{ appConfigs: AppConfigs | undefined | null }>({ appConfigs: undefined });

export function AppConfigsProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: AppConfigs | undefined | null;
}) {
  const [appConfigs, setAppConfigs] = useState(value);

  return (
    <AppConfigsContext.Provider value={{ appConfigs }}>
      {children}
    </AppConfigsContext.Provider>
  );
}
