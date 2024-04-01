import { useEffect, useState } from "react";
import defaultProvider from "../abi/defaultProvider";
import w3ts from "../abi/w3ts/w3ts";

const Events = () => {
  const [eventArgs, setEventArgs] = useState([]);

  useEffect(() => {
    w3ts.on("Mint", (address, id) => {
      console.log(`Address: ${address}, NFT id: ${id}`);
      setEventArgs(prev => [...prev, [address, id]]);
    });
    (async () => {
      try {
        const currentBlock = await defaultProvider.getBlockNumber();
        console.log("currentBlock: ", currentBlock);
        const events = await w3ts.queryFilter("*", 5605423, currentBlock);
        console.log("events: ", events);
        setEventArgs(events.map((event) => ([event.args[0], event.args[1]])));
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
      <h1>Events:</h1>
      <ol>
        {eventArgs.map((event) => (
          <li
            key={crypto.randomUUID()}
          >{`Address: ${event[0]}, NFT id: ${event[1]}`}</li>
        ))}
      </ol>
    </div>
  );
};

export default Events;
