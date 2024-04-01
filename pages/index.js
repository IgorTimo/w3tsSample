import { useEffect, useState } from "react";
import w3ts from "../abi/w3ts/w3ts";
import getW3tsWithSigner from "../abi/w3ts/getW3tsWithSigner";
import postAddress from "../utils/postAddress";

const Index = () => {
  const [totalWlSupplay, setTotalWlSupplay] = useState(0n);
  const [infoMessage, setInfoMessage] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [userNftBalances, setUserNftBalances] = useState([0n, 0n, 0n, 0n]);

  useEffect(() => {
    (async () => {
      try {
        const totalWlSupplay = await w3ts.totalWlSupplay();
        console.log("totalWlSupplay: ", totalWlSupplay);
        setTotalWlSupplay(totalWlSupplay);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (currentAccount) {
        try {
          const balances = await w3ts.balancesOf(currentAccount);
          setUserNftBalances(balances);
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
      postAddress(accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      setInfoMessage(error.message);
    }
  };

  const mintPart = async (id) => {
    setInfoMessage("Confirm mint");
    try {
      const tx = await (await getW3tsWithSigner()).mint(id);
      setInfoMessage("Minting in progress...");
      console.log("tx: ", tx);
      const response = await tx.wait();
      console.log("response: ", response);
      setInfoMessage("Success mint");
      const balances = await w3ts.balancesOf(currentAccount);
      console.log("balances: ", balances);
      setUserNftBalances(balances);
    } catch (error) {
      console.error(error);
    }
  };

  const mintWL = async () => {
    setInfoMessage("Confirm mint");
    try {
      const tx = await (await getW3tsWithSigner()).mintWL();
      setInfoMessage("Minting in progress...");
      console.log("tx: ", tx);
      const response = await tx.wait();
      console.log("response: ", response);
      setInfoMessage("Success mint");
      const balances = await w3ts.balancesOf(currentAccount);
      setUserNftBalances(balances);
      setTotalWlSupplay((prev) => prev + 1n);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>WL Supplay {totalWlSupplay+""}/5</h1>
      <h4>Last status: {infoMessage}</h4>
      {currentAccount ? (
        <>
          <h1>Current account: {currentAccount}</h1>
          <h2>Balances: {userNftBalances + ""}</h2>
          <button
            disabled={userNftBalances[0] === 1n || userNftBalances[3] === 1n}
            onClick={() => mintPart(1)}
          >
            Mint first part
          </button>
          <button
            disabled={userNftBalances[1] === 1n || userNftBalances[3] === 1n}
            onClick={() => mintPart(2)}
          >
            Mint second part
          </button>
          <button
            disabled={userNftBalances[2] === 1n || userNftBalances[3] === 1n}
            onClick={() => mintPart(3)}
          >
            Mint third part
          </button>
          <br />
          <br />
          <br />
          <button
            disabled={
              userNftBalances.reduce((acc, value) => acc + value, 0n) !== 3n
            }
            onClick={mintWL}
          >
            Mint WL
          </button>
        </>
      ) : (
        <button onClick={connectMetamask}>Connect</button>
      )}
    </div>
  );
};

export default Index;
