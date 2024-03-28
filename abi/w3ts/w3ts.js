import { Contract } from "ethers";
import defaultProvider from "../defaultProvider";

const abi = [
  "function balanceOf(address owner, uint256 id) public view returns (uint256)",
  "function mint(uint id) public"
];

const w3ts = new Contract(
  "0xc76b95c12B0c717AC8D46eaf7Acbb264482B0EF4",
  abi,
  defaultProvider
);

export default w3ts;
