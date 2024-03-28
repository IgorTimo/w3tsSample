import walletProvider from "../walletProvider";
import w3ts from "./w3ts";


const getW3tsWithSigner = async () => {
  const signer = await walletProvider.getSigner();
  return w3ts.connect(signer);
};

export default getW3tsWithSigner;
