const Block = require('./block');
const cryptoHash = require('./crypto-hash');

class Blockchain{
    constructor() {
        this.chain = [Block.genesis()];  //add genesis block at 0 zero'th index
    }

    addBlock({data}) {
        const newBlock = Block.mineBlock({
            prevBlock: this.chain[this.chain.length - 1],
            data,
        });
        this.chain.push(newBlock);
    }

    //Let's check the chain is valid or not
    static isValaidChain(chain) {
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())){
            return false;
        }
        for(let i=1; i<chain.length; i++){
            const {timestamp, prevHash, hash,nonce, difficulty, data} = chain[i];
            const lastHash = chain[i - 1].hash;
            const lastDifficulty = chain[i-1].difficulty;
            
            if(prevHash !== lastHash) return false;

            const validateHash = cryptoHash({timestamp, prevHash, nonce,difficulty, data});
            if(hash !== validateHash) return false;
            if(Math.abs(lastDifficulty - difficulty) > 1) return false;
        }
        return true;
    }

    replaceChain(chain) {
        if(chain <= this.chain.length) {
            console.error("Incoming chain is no longer");
            return;
        }

        if(!Blockchain.isValaidChain(chain)) {
            console.error("Incoming Chain is not valid");
            return;
        }
        this.chain = chain;
    }
}

const blockchain = new Blockchain();
blockchain.addBlock({data: "Block1"});
blockchain.addBlock({data: "Block2"});
const result = Blockchain.isValaidChain(blockchain.chain);
console.log(result);
console.log(blockchain);
module.exports = Blockchain;