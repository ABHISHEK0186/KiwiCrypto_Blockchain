const SHA256 = require('crypto-js/sha256');

//create a JavaScript class to represent a Block
class Block{
  constructor(index, timestamp, data, previousHash){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.generateHash();
  }

  generateHash(){
    return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString()
  }
}

class Blockchain{
    constructor(){
        this.blockchain = [this.createGenesisBlock()];
    }
    createGenesisBlock(){
        return new Block(0, "10/05/2022", "first block on the chain", "0");
    }
    getTheLatestBlock(){
        return this.blockchain[this.blockchain.length - 1];
    }
    addNewBlock(newBlock){
        newBlock.previousHash = this.getTheLatestBlock().hash;
        newBlock.hash = newBlock.generateHash();
        this.blockchain.push(newBlock);
    }

    // testing the integrity of the chain
    validateChainIntegrity(){
        for(let i = 1; i<this.blockchain.length; i++){
            const currentBlock = this.blockchain[i];
            const previousBlock = this.blockchain[i-1];
            if(currentBlock.hash !== currentBlock.generateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
            return true;

        }
    }
} 

let KiwiCoin = new Blockchain();
console.log("mining Kiwicoin in progress...");
KiwiCoin.addNewBlock(
    new Block(1, "11/05/2022", {
        sender: "Abhishek Vinayak",
        recipient: "Admin",
        quantity: 25
    })
);

KiwiCoin.addNewBlock(
    new Block(2, "12/05/2022", {
        sender: "Arun Nayyar",
        recipient: "Jazzy B",
        quantity: 34
    })
);

KiwiCoin.addNewBlock(
    new Block(3, "13/05/2022", {
        sender: "Elena",
        recipient: "Joseph",
        quantity: 34
    })
);
console.log(JSON.stringify(KiwiCoin, null, 5))