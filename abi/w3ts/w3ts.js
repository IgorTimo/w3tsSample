import { Contract } from "ethers";
import defaultProvider from "../defaultProvider";

const abi = [
  "function balancesOf(address owner) public view returns (uint8[4])",
  "function totalWlSupplay() public view returns (uint)",
  "function mint(uint8 id) public",
  "function mintWL() public",
  "event Mint(address indexed owner, uint8 indexed id)"
];

const w3ts = new Contract(
  "0x055cF34E526d7079af8000e1f0de32f61a753fFB",
  abi,
  defaultProvider
);

export default w3ts;
