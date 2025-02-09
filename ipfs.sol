// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IPFSStorage {
    string private ipfsHash;
    
    // Event to log hash updates
    event IPFSHashUpdated(string newHash);

    // Store the IPFS hash
    function setIPFSHash(string memory _ipfsHash) public {
        ipfsHash = _ipfsHash;
        emit IPFSHashUpdated(_ipfsHash);
    }

    // Retrieve the IPFS hash
    function getIPFSHash() public view returns (string memory) {
        return ipfsHash;
    }
}
