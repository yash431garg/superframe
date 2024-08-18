"use client";
import { clearJwt } from "../actions/validate";
import { DynamicContextProvider } from "../lib/dynamic";
import { EthereumWalletConnectors } from "../lib/dynamic";

export default function ProviderWrapper({ children }: React.PropsWithChildren) {
  const DYNAMIC_ENVIROMENT_ID = process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || ''
  return (
    <DynamicContextProvider
      theme="light"
      settings={{
        environmentId: DYNAMIC_ENVIROMENT_ID,
        walletConnectors: [EthereumWalletConnectors],
        eventsCallbacks: {
          onLogout: () => {
              clearJwt();
          },
        },
      }}

    >
      {children}
    </DynamicContextProvider>
  );
}
