const EventEmitter = require("events").EventEmitter;
const { TX_QR_EVENT } = require("../events");
class HSDispatcher extends EventEmitter {

    QREventGenerator = (rawTx) =>{
        debugger
        this.emit(TX_QR_EVENT,rawTx)
        //Generate QR

    }

    QREventListener = () => {
    
        return new Promise((resolve,reject) => {
            this.on(TX_QR_EVENT, (rawTx) => {
                debugger
                console.log('Listening to the event')
                resolve(rawTx)
                //call from API websocket lsiten 
            });
        })
        
    }

    // SIGNEventGenerator = (rawTx) =>{
    //     debugger
    //     this.emit(TX_QR_EVENT,rawTx)
    //     //Generate QR

    // }

    // SIGNEventListener = () => {
    //     debugger
    //     return new Promise((resolve,reject) => {
    //         this.on(TX_QR_EVENT, (rawTx) => {
    //             debugger
    //             console.log('Listening to the event')
    //             resolve(rawTx)
    //             //call from API websocket lsiten 
    //         });
    //     })
        
    // }

    
}


const instance = new HSDispatcher();
// Object.freeze(instance);

export default instance;