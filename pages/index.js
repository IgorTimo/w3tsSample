import { useEffect, useState } from "react";
import w3ts from "../abi/w3ts/w3ts";
import getW3tsWithSigner from "../abi/w3ts/getW3tsWithSigner";

const Index = () => {
  const [infoMessage, setInfoMessage] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [userNftBalance, setuserNftBalance] = useState(0);

  useEffect(() => {
    (async () => {
      if (currentAccount) {
        try {
          const balance = await w3ts.balanceOf(currentAccount, 1);
          setuserNftBalance(balance)
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [currentAccount]);

  const connectMetamask = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      setInfoMessage("Use browser with metamask");
      return;
    }
    if (!ethereum.isConnected()) {
      setInfoMessage({ alert: "metamaskLogOut" });
      return;
    }
    try {
      const chainId = await ethereum.request({ method: "eth_chainId" });
      const targetChainId = "0xaa36a7";
      if (chainId !== targetChainId) {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: "0xaa36a7",
            },
          ],
        });
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      setInfoMessage(error.message);
    }
  };

  const mintNft = async (id) => {
    setInfoMessage("Confirm mint");
    try {
      const tx = await (await getW3tsWithSigner()).mint(id);
      setInfoMessage("Start minting...");
      console.log("tx: ", tx);
      const response = await tx.wait();
      console.log("response: ", response);
      setInfoMessage("Success mint");
      const balance = await w3ts.balanceOf(currentAccount, 1);
      setuserNftBalance(balance)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h4>Last status: {infoMessage}</h4>
      {currentAccount ? (
        <>
          <h1>Current account: {currentAccount}</h1>
          <h2>Balance of first nft: {userNftBalance + ""}</h2>
          <button onClick={() => mintNft(1)}>Mint first nft</button>
        </>
      ) : (
        <button onClick={connectMetamask}>Connect</button>
      )}
    </div>
  );
};

export default Index;
