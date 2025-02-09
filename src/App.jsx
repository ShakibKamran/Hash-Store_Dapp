import React, { useState } from "react";
import { pinata } from "../config.js";
import { ethers } from "ethers";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [storedHash, setStoredHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Replace these with your deployed contract details
  const contractAddress = "0xa5c400401bd4a0934ec77475a6c5a8372667ee6f";
  const contractABI = [
    {
      "anonymous": false,
      "inputs": [{ "indexed": false, "internalType": "string", "name": "newHash", "type": "string" }],
      "name": "IPFSHashUpdated",
      "type": "event"
    },
    {
      "inputs": [{ "internalType": "string", "name": "_ipfsHash", "type": "string" }],
      "name": "setIPFSHash",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getIPFSHash",
      "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async () => {
    setError("");
    if (!selectedFile) {
      setError("No file selected. Please choose a file.");
      return;
    }

    setLoading(true);
    try {
      const response = await pinata.upload.file(selectedFile);
      console.log(response);
      const ipfsHash = response.IpfsHash;
      console.log(ipfsHash)
      setIpfsHash(ipfsHash);
      await storeHashOnBlockchain(ipfsHash);
    } catch (error) {
      setError("File upload failed: " + error.message);
    }
    setLoading(false);
  };

  const storeHashOnBlockchain = async (hash) => {
    if (!window.ethereum) {
      setError("MetaMask not detected. Please install it.");
      return;
    }

    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.setIPFSHash(hash);
      await tx.wait();

      console.log("IPFS hash stored on blockchain:", hash);
    } catch (error) {
      setError("Failed to store IPFS hash: " + error.message);
    }
    setLoading(false);
  };

  const retrieveHashFromBlockchain = async () => {
    setError("");
    if (!window.ethereum) {
      setError("MetaMask not detected. Please install it.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const retrievedHash = await contract.getIPFSHash();
      setStoredHash(retrievedHash);
      console.log("Retrieved IPFS hash from blockchain:", retrievedHash);
    } catch (error) {
      setError("Failed to retrieve IPFS hash: " + error.message);
    }
  };

  return (
    <div className="app-container">
      <div className="upload-section">
        <label className="form-label">Choose File</label>
        <input type="file" onChange={changeHandler} className="file-input" />
        <button onClick={handleSubmission} className="submit-button" disabled={loading}>
          {loading ? "Uploading..." : "Submit"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {ipfsHash && (
        <div className="result-section">
          <p>
            <strong>IPFS Hash:</strong> {ipfsHash}
          </p>
          <a href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`} target="_blank" rel="noopener noreferrer">
            View File
          </a>
        </div>
      )}

      <div className="retrieve-section">
        <button onClick={retrieveHashFromBlockchain} className="retrieve-button">
          Retrieve Stored Hash
        </button>
        {storedHash && (
          <p>
            <strong>Stored IPFS Hash:</strong> {storedHash}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
