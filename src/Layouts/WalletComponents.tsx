import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ConnectWallet } from "@coinbase/onchainkit/wallet";
import { Name } from "@coinbase/onchainkit/identity";
import { base } from "wagmi/chains";

export function WalletComponents() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="rounded-3xl border border-main-text p-2 text-main-text"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="rounded-3xl border border-main-text p-2 text-main-text"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="rounded-3xl border border-main-text p-2 text-main-text flex gap-4">
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 20,
                          height: 20,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 20, height: 20 }}
                          />
                        )}
                      </div>
                    )}
                    {/* {chain.name} */}
                  </button>

                  <button onClick={openAccountModal} type="button">
                    <ConnectWallet className="!bg-transparent !p-0">
                      <Name chain={base} />
                    </ConnectWallet>

                    {/* <Name /> */}
                    {/* {account.ensName ? account.ensName : account.displayName} */}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
