const blockchain = require("./Block.js");
const { Block } = require("./Block.js");

class Blockchain {
    constructor() {
        this.chain = [new Block(Date.now().toString())];
        this.difficulty = 1;
        this.blockTime = 30000;
        this.transactions = [];
        this.reward = 1;

    }    

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(block) {
        block.prevHash = this.getLastBlock().hash;
        block.hash = block.getHash();
        block.mine(this.difficulty);
        this.chain.push(Object.freeze(block));
        this.difficulty += Date.now() - parseInt(this.getLastBlock().timestamp) < this.blockTime ? 1 : -1;
    }

    isValid(blockchain = this) {
        // Iterate over the chain, we need to set i to 1 because there are nothing before the genesis block, so we start at the second block.
        for (let i = 1; i < blockchain.chain.length; i++) {
            const currentBlock = blockchain.chain[i];
            const prevBlock = blockchain.chain[i-1];

            // Check validation
            if (currentBlock.hash !== currentBlock.getHash() || prevBlock.hash !== currentBlock.prevHash) {
                return false;
            }
        }

        return true;
    }

    addTransaction(transaction) {
        this.transactions.push(transaction);
    }

    mineTransactions(rewardAddress) {
        this.addBlock(new Block(Date.now().toString(), [new Transaction(CREATE_REWARD_ADDRESS, rewardAddress, this.reward), ...this.transactions]));

        // Right now, we are just going assume the "from" address is something like this,
        // we will get back to this later in the next part of the article.
        this.transactions = [];
    }

}

module.exports = {Block, Blockchain}