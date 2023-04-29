import { useWallet, WalletStatus } from "@terra-money/use-wallet";
import styled from "styled-components";
import { useSelectedChain } from "./ChainSelector";
import React, { useState, useEffect } from 'react';

const ButtonsHelperText = styled.h2`
  font-size: 22px;
  margin-top: 3rem;
  margin-bottom: 15px;
`;

const Button = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  line-height: 1;
  padding: 1px 20px;
  margin: 0 5px;
  white-space: pre;
  border-radius: 16px;
  min-width: 100px;
  height: 32px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  box-shadow: inset 0 0 0 1.75px #2043b5;
  background: white;
  text-decoration: none;
  color: #2043b6;
  transition: 0.2s;

  img {
    height: 20px;
    width: 20px;
  }

  &:hover {
    box-shadow: 3px 3px 6px rgb(55 55 55 / 25%);
    background: linear-gradient(90deg, #228bbc, #002c81);
    color: white;
    cursor: pointer;
  }
`;

export function ConnectSample() {
  const {
    status,
    network,
    wallets,
    availableConnectTypes,
    availableInstallTypes,
    availableConnections,
    supportFeatures,
    connect,
    availableInstallations,
    disconnect,
  } = useWallet();

  const chainID = useSelectedChain();

async function createFolderForWallet(walletAddress: string) {
  try {
    const response = await fetch('http://ip/create-folder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ walletAddress }),
    });

    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error('Error creating folder:', error);
  }
}


useEffect(() => {
  if (wallets.length > 0) {
    console.log(wallets[0].addresses['pisco-1']);
    createFolderForWallet(wallets[0].addresses['pisco-1']);
  }
}, [wallets]);


  return (
    <div>
      <h1>Connect Sample</h1>
      <section>
        <pre>
          {JSON.stringify(
            {
              status,
              network: network[chainID],
              wallets,
              supportFeatures: Array.from(supportFeatures),
              availableConnectTypes,
              availableInstallTypes,
            },
            null,
            2
          )}
        </pre>
      </section>

      <footer>
        {status === WalletStatus.WALLET_NOT_CONNECTED && (
          <>
            <ButtonsHelperText>Available Connect types</ButtonsHelperText>
            {availableConnectTypes.map((connectType) => (
              connectType === "EXTENSION" ? (<Button
                key={"connect-" + connectType}
                onClick={() => connect(connectType)}
              >
                Connect {connectType}
              </Button> ) : null
            ))}
          </>
        )}
        {status === WalletStatus.WALLET_CONNECTED && (
          <Button onClick={() => disconnect()}>Disconnect</Button>
        )}
      </footer>
    </div>
  );
}
