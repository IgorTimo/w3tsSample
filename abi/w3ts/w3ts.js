import { Contract } from "ethers";
import defaultProvider from "../defaultProvider";

const abi = [
  "function balancesOf(address owner) public view returns (uint8[4])",
  "function totalWlSupplay() public view returns (uint)",
  "function mint(uint8 id) public",
  "function mintWL() public"
];

const w3ts = new Contract(
  "0x67c12E2614B042E357A334EEB853FDB7a72051e1",
  abi,
  defaultProvider
);

export default w3ts;
