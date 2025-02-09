# IPFS File Uploader with Ethereum Smart Contract

This project is a React-based decentralized application (DApp) that allows users to upload files to IPFS using Pinata and store/retrieve the IPFS hash on the Ethereum blockchain via a smart contract.

## Features
- Upload files to IPFS using Pinata
- Store the uploaded IPFS hash on the Ethereum blockchain
- Retrieve the stored IPFS hash from the blockchain
- Uses MetaMask for blockchain interactions

## Prerequisites
Ensure you have the following installed before running the project:
- Node.js (latest LTS version recommended)
- MetaMask browser extension
- Pinata account for IPFS storage
- Ethereum test network with a deployed smart contract

## Setup and Installation

1. Clone the repository:
   ```sh
   https://github.com/ShakibKamran/Hash-Store_Dapp.git
   cd Hash_Store_Dapp
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Configure Pinata API:
   - Update `config.js` with your Pinata API keys.

4. Update Smart Contract Details:
   - Ensure the contract address and ABI in `App.js` match your deployed smart contract.

## Running the Application
To start the React app:
```sh
npm start
```
The app will be available at `http://localhost:3000/`.

## Usage
1. Select a file and upload it.
2. The file gets uploaded to IPFS via Pinata, and the hash is displayed.
3. The IPFS hash is stored on the blockchain.
4. Retrieve the stored hash from the blockchain by clicking the "Retrieve Stored Hash" button.

## Smart Contract
Ensure your smart contract is deployed on an Ethereum testnet and includes the following functions:
```solidity
function setIPFSHash(string memory _ipfsHash) public;
function getIPFSHash() public view returns (string memory);
```

## Dependencies
- React
- ethers.js
- Pinata SDK

## Troubleshooting
- If MetaMask is not detected, install the MetaMask extension.
- Ensure you have an active network connection to the blockchain.
- Check Pinata API credentials if the file upload fails.

## License
This project is licensed under the MIT License.

