const { Block, Blockchain } = require("./Blockchain.js")

const JeromeChain = new Blockchain();

JeromeChain.addBlock(new Block(Date.now().toString(), { from: "Adam", to: "Jerome", amount: 1000 }));
JeromeChain.addBlock(new Block(Date.now().toString(), { from: "Adam", to: "Jerome", amount: 1000 }));
JeromeChain.addBlock(new Block(Date.now().toString(), { from: "Adam", to: "Jerome", amount: 1000 }));
JeromeChain.addBlock(new Block(Date.now().toString(), { from: "Adam", to: "Jerome", amount: 1000 }));


console.log(JeromeChain.chain)