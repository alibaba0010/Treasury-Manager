import abi from "./AITreasuryManager.json";
// import axios from "axios";
export const contractABI = abi.abi;
export const activeChain = "electroneum";
// export const clientId = import.meta.env.VITE_HELLO;
export const contractAddress = "0xA5a82A52df3067a9a256006faBC064b14c0F4fFa";
// export const contractAddress = "0xb8A6D14C8fdC1f9c9C2492e4C789d2F8c751Daa9";

export const calculateBarPercentage = (goal: number, raisedAmount: number) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};
export const encryptId = (id: any) => {
  return btoa(id); // Encode to Base64
};

export const decryptId = (encryptedId: any) => {
  return atob(encryptedId); // Decode from Base64
};
// export const daysLeft = (deadline: bigint) => {
//   const msPerDay = 86_400_000n; // 1000 * 60 * 60 * 24P
//   const deadlineMs = deadline * 1000n;
//   const now = BigInt(Date.now());
//   const difference = deadlineMs - now;

//   if (difference <= 0n) return "0";

//   // Ceiling division: (a + b - 1n) / b
//   const remainingDays = (difference + msPerDay - 1n) / msPerDay;

//   return remainingDays.toString();
// };

export const shortenAddress = (address: string) => {
  if (address) return address.slice(0, 6) + "..." + address.slice(-4);
};

interface UploadToPinataResponse {
  IpfsHash: string;
}
