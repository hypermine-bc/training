const ProviderEngine = require('web3-provider-engine');
const CacheSubprovider = require('web3-provider-engine/subproviders/cache');
const FixtureSubprovider = require('web3-provider-engine/subproviders/fixture');
const FilterSubprovider = require('web3-provider-engine/subproviders/filters');
const VmSubprovider = require('web3-provider-engine/subproviders/vm');
const HookedWalletSubprovider = require('web3-provider-engine/subproviders/hooked-wallet');
const NonceSubprovider = require('web3-provider-engine/subproviders/nonce-tracker');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc');
//const walletController = require("./controllers/wallet-controller");
// const TSIEventEmitter = require("./events/tsi-eventemitter")



export  default function HyperSignProvider(rpcAddress)  {
	
	var engine = new ProviderEngine();
	engine.addProvider(new FixtureSubprovider({
		web3_clientVersion: 'ProviderEngine/v0.0.0/javascript',
		net_listening: true,
		eth_hashrate: '0x00',
		eth_mining: false,
		eth_syncing: true,
	}));
	// cache layer
	engine.addProvider(new CacheSubprovider());

	// filters
	engine.addProvider(new FilterSubprovider());

	// pending nonce
	engine.addProvider(new NonceSubprovider());

	// vm
	engine.addProvider(new VmSubprovider());

	// id mgmt
	engine.addProvider(new HookedWalletSubprovider({
		getAccounts : (cb, walletController) => {
			debugger
			// TSIController.getAccounts().then(accounts => {
				let accounts = ['0x7db2dbf23d8b8592b6a9389655ede96e8f01b9b6']
			    cb(null, accounts)
			// }).catch(cb);
		},
		
		signTransaction : (rawTx, cb) => {
			debugger
			/// popup deekhana hai jisme QR aaye 
			/// use this link : https://davidshimjs.github.io/qrcodejs/ 

			

			//Create files similar to DBListener for other listeners.
			// Seperated in order to support more listeners like TSI SASS listener
		
			/// rawTx QR me shohw 
			/// websocket listener start
			/// QR ka popup show karo js wala 
			/// uske peeche me rawTx 
			
			/// scan hoga QR ans singned by Mobile 
			/// web socket will get the singeed message : digest
			/// cb(null, digest);
			
			// const listener = new TransactionListener(txListener);
			// listener.createTransaction(rawTx)
			//     .then(id => {
			//         TSIController.emit(TX_QR_EVENT, id);
			//         listener.start(id, cb);
			//     })
		}
	}	));

	// data source
	engine.addProvider(new RpcSubprovider({
		rpcUrl: rpcAddress,
	}));

	// log new blocks
	engine.on('block', block => {
		console.log('================================');
		console.log('BLOCK CHANGED:', '#' + block.number.toString('hex'), '0x' + block.hash.toString('hex'));
		console.log('================================');
	});

	// network connectivity error
	engine.on('error', err => {
		// report connectivity errors
		console.error(err.stack);
	});

	// start polling for blocks
	engine.start();

	return engine;
}


// module.exports = HyperSignProvider;