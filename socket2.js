const Web3 = require('web3')

construct(projectId) {
	const web3 = new Web3('wss://mainnet.infura.io/ws/v3/' + projectID)
}

// get latest blocks
class getBlock {
	async checkBlock() {
				let block = await web3.eth.getBlock("latest");
				console.log(block.transactions)
	}
}

let intervalBlock = new getBlock(process.env.INFURA_ID);
intervalBlock.checkBlock();

setInterval(() => {
		intervalBlock.checkBlock();
		}, 20*1000);
