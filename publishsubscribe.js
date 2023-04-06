const redis = require('redis');

const CHANNELS = {
    TEST:'TEST',
    BLOCKCHAIN:'BLOCKCHAIN',
}
class PubSub {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();

        this.subscriber.subscribe(CHANNELS.TEST);
        this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);

        this.subscriber.on('message',(channel,message)=>this.handleMessage(channel,message));
    }

    handleMessage(channel,message){
        console.log(`Message received on Channel: ${channel}, and Message is:${message}`);
        const parseMessage = JSON.parse(message);
        if(channel===CHANNELS.BLOCKCHAIN){
            this.blockchain.replaceChain(parseMessage);
        } 
    }
    publish({channel,message}) {
        this.publisher.publish(channel,message);
    }
    broadcastChain() {
        this.PubSub({
            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain),
        }); 
    }
}

const checkPubSub = new PubSub();
setTimeout(
    () => checkPubSub.publisher.publish(CHANNELS.TEST, "HELLOOOOOO"),
    1000
);