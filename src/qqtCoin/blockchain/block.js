"use strict";

class Block {
/**
 * The constructor function is used to create a new block object.
 * @param [blockNumber=1] - The index of the block in the chain.
 * @param [timestamp] - The time at which the block was created.
 * @param [transactions] - An array of transactions.
 * @param [difficulty=1] - The difficulty of the block. This is the number of leading zeros that the
 * hash of the block must have.
 * @param [parentHash] - The hash of the previous block in the chain.
 */
  constructor( blockNumber = 1, timestamp = Date.now(),  transactions = [],  difficulty = 1, parentHash = "" ) {
    this.transactions = transactions;               // Transaction list
    // Block header
    this.blockNumber = blockNumber;                         // Block's index in chain
    this.timestamp = timestamp;                                  // Block creation timestamp
    this.difficulty = difficulty;                                        // Difficulty to mine block
    this.parentHash = parentHash;                              // Parent (previous) block's hash
    this.nonce = 0;                                                       // Nonce
    this.txRoot = buildMerkleTree(transactions).val;   // Merkle root of transactions
    this.hash = Block.getHash(this);                            // Hash of the block
  }

  static getHash(block) {
    // Convert every piece of data to string, merge and then hash
    return SHA256(
      block.blockNumber.toString()  +
        block.timestamp.toString()     +
        block.txRoot                            +
        block.difficulty.toString()         +
        block.parentHash                    +
        block.nonce.toString()
    );
  }

  static hasValidPropTypes(block) {
    return (
      Array.isArray(block.transactions)                     &&
      typeof block.blockNumber === "number"     &&
      typeof block.timestamp === "number"          &&
      typeof block.difficulty === "number"             &&
      typeof block.parentHash === "string"            &&
      typeof block.nonce === "number"                 &&
      typeof block.txRoot === "string"                    &&
      typeof block.hash === "string"
    );
  }

 
}

module.exports = Block;
