import { useEffect, useState } from "react";

const wallets = () => {
  const [wallets, setWalets] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://w3ts-c794d6e5e200.herokuapp.com/");
        const data = await response.json();
        const walltes = data.wallets.map((wallet) => wallet.address)
        console.log("walltes: ", walltes);
        setWalets(walltes);
      } catch (error) {
        console.error(error);
      }
    })();
    () => {
      w3ts.removeAllListeners("Mint");
    };
  }, []);

  return (
    <div>
      <h1>Wallets:</h1>
      <ol>
        {wallets.map((address) => (
          <li
            key={crypto.randomUUID()}
          >{address}</li>
        ))}
      </ol>
    </div>
  );
};

export default wallets;
