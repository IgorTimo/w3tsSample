import { Contract } from "ethers";
import defaultProvider from "../defaultProvider";

const abi = [
  "function balancesOf(address owner) public view returns (uint[4])",
  "function totalWlSupplay() public view returns (uint)",
  "function mint(uint id) public",
  "function mintWL() public",
  "event Mint(address indexed owner, uint8 indexed id)"
];

const w3ts = new Contract(
  "0x76AA9214b1c00BFe935c9b1Ee2EdF9eb878a1681",
  abi,
  defaultProvider
);

export default w3ts;
