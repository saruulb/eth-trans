const Web3 = require('web3')

constructor(projectId) {
	const web3 = new Web3('wss://mainnet.infura.io/ws/v3/' + projectID)
}

// get latest blocks
class getBlock {
	async checkBlock() {
				let block = await web3.eth.getBlock("latest");
				let blocktrans = block.transactions;
				var totalNumber = blocktrans.length;
				
				for (let i= 0; i < totalNumber; i++ ){
					web3.eth.getTransactionFromBlock("latest", i).then(console.log);
					} 
	}
}


let intervalBlock = new getBlock(process.env.INFURA_ID);
intervalBlock.checkBlock();

setInterval(() => {
		intervalBlock.checkBlock();
		}, 20*1000);
