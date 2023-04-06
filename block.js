const {GENESIS_DATA, MINE_RATE} = require("./genesis");
const cryptoHash = require("./crypto-hash");

class Block {
    constructor({hash, timestamp, prevHash, data, nonce, difficulty}){
        this.timestamp = timestamp; 
        this.hash = hash;
        this.prevHash = prevHash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty=difficulty;
    }
    //make static function to use the genesis data
    static genesis() {
        return new this(GENESIS_DATA);
    }

    static mineBlock({prevBlock, data}) {
        let hash, timestamp;
        const prevHash = prevBlock.hash;
        const {difficulty} = prevBlock;
        
        //Add nonce and difficulty
        let nonce=0;
        do{
            nonce++;
            timestamp = Date.now();
            difficulty : Block.adjustDifficulty({
                originalBlock: prevBlock,
                timestamp,
            });
            hash = cryptoHash(timestamp, prevHash, data, nonce, difficulty);
        }while(hash.substring(0,difficulty) !=='0'.repeat(difficulty));

        return new this({
            timestamp,
            prevHash,
            data,
            difficulty,
            nonce,
            hash,
        });
    }

    static adjustDifficulty({originalBlock, timestamp}) {
        const {difficulty} = originalBlock;
        
        if(difficulty<1) return 1;
        const difference = timestamp-originalBlock.timestamp;
        if(difference>MINE_RATE) return difficulty-1;
        return difficulty+1;
    }
}

// const  block1 = new Block({timestamp:"12/02/2023", hash:"0x12545", prevHash:"0x588974", data:"Blockchain is immutable, distributed ledger"});
// // console.log(block1);

// const genesisBlock = Block.genesis();
// //console.log(genesisBlock);

// const result = Block.mineBlock({prevBlock: block1, data:"Data is Added"})
// console.log(result);

module.exports = Block;