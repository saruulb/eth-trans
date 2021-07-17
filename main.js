const csvwriter = require('csv-writer');
const Web3 = require('web3');
const web3 = new Web3('wss://mainnet.infura.io/ws/v3/'+process.env.INFURA_ID);
const fs = require("fs");
const dataArray = [];


// get latest blocks
class getBlock {
	async checkBlock() {
				let block = await web3.eth.getBlock("latest");
				let blocktrans = block.transactions;
				var totalNumber = blocktrans.length;
				
				for (let i= 0; i < totalNumber; i++ ){
					let transBlock = await web3.eth.getTransactionFromBlock("latest", i);
					dataArray.push(transBlock);
					} 
				console.log(dataArray);
			
				fs.writeFile ("input.json", JSON.stringify(dataArray), function(err) {
    				if (err) throw err;
    				console.log('complete');
				}
				);
  
				// Passing the column names intp the module
				var createCsvWriter = csvwriter.createObjectCsvWriter
				const csvWriter = createCsvWriter({
  					// output csv file name is transaction.csv
  					path: 'transaction.csv',
  					header: [
    					// Title of the columns (column_names)
    					{id: 'blockHash', title: 'BLOCKHASH'},
    					{id: 'blockNumber', title: 'BLOCKNUMBER'},
    					{id: 'from', title: 'FROM'},
    					{id: 'gas', title: 'GAS'},
    					{id: 'gasPrice', title: 'GASPRICE'},
    					{id: 'hash', title: 'HASH'},
    					{id: 'input', title: 'INPUT'},
    					{id: 'nonce', title: 'NONCE'},
    					{id: 'r', title: 'R'},
    					{id: 's', title: 'S'},
    					{id: 'to', title: 'TO'},
    					{id: 'transactionIndex', title: 'TRANSACTIONINDEX'},
    					{id: 'type', title: 'TYPE'},
    					{id: 'v', title: 'V'},
    					{id: 'value', title: 'VALUE'},
  					]
					});

				csvWriter
  					.writeRecords(dataArray)
  					.then(()=> console.log('Data uploaded into csv successfully'));
    				}
}



let intervalBlock = new getBlock();
intervalBlock.checkBlock();

setInterval(() => {
		intervalBlock.checkBlock();
		}, 30*1000);
