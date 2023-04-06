const MINE_RATE = 5000; //1s =1000ms
const INITIAL_DIFFICULTY = 2;
const GENESIS_DATA = {
    timestamp: "12/02/2023",
    prevHash : "0x000",
    hash: "0x236",
    difficulty : INITIAL_DIFFICULTY,
    nonce: 0,
    data: []
}

module.exports = {GENESIS_DATA, MINE_RATE};