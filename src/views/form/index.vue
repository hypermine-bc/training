<template>
  <div class="dashboard-container">
     <section class="content-upload-form">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="Title">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="Tags">
            <el-select v-model="form.region" placeholder="please select your zone">
              <el-option label="India" value="india"></el-option>
              <el-option label="China" value="china"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-upload
              class="upload-demo"
              drag
              :file-list="fileList"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
              <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
            </el-upload>
            <qrcode-vue :value="value" :size="310" level="H" v-if = "showQR"></qrcode-vue>
          </el-form-item>
          <el-form-item label="Description">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button @click="onCancel">Cancel</el-button>
          </el-form-item>
        </el-form>
    </section>
    <!--- Hello world ---->
  </div>
</template>

<script>
import contract from  'truffle-contract';
import TestAbi from '../../../build/contracts/TestContract.json';
import HSDispatcher from '../../hypersign-sdk/dispatcher/dispatcher.js'
import QrcodeVue from 'qrcode.vue'
import ipfsAPI from "ipfs-api"

const VIDEO_ID = "QmPGhxVtNPQsVGrQkTetYbT3fJ2uPDyM3xb1VGK8dzm3fj";

var CryptoJS = require("crypto-js");
const VIDEO_PATH_PREFIX = './resource'
const IPFS_IP = '127.0.0.1'
export default {
  components: {
    QrcodeVue
  },
  mounted() {
    let promise = HSDispatcher.QREventListener()
    promise.then((rawTx) => {
      debugger
      let msg = JSON.stringify({"id": 21,"direction":"Login", "rawTx" : rawTx})
      console.log('msg : ' + msg)
      let encmsg = CryptoJS.AES.encrypt(msg, 'secret key 123').toString()
      this.value = encmsg
      console.log(this.value)
      this.showQR = true

    }).catch((err) => { 
      console.log('Error : Error in mounted in login' + err)
    })
  },
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      fileList:[],
      value: '{"id": 21,"direction":"Login"}',
      showQR: false
    }
  },
  methods: {
    onSubmit() {
      debugger
      this.callSendTx()
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
     callSendTx() {
      debugger
      let web3 =  this.$store.state.user.web3.web3Instance
      if(web3){
        const testContract = contract(TestAbi)
        testContract.setProvider(web3.currentProvider);
        testContract.deployed().then(testContractInstance => {
          debugger
          testContractInstance.set(
            10,
            { from: '0xe1fa969d685abfb6559657ce0367a767b1652b30' }
          )
        })
      }
    },

    uploadFiles (file, metadata)  {
      return new Promise((resolve, reject) => {
          if (!file) reject(new Error("File value cannot be null"));
          const reader = new FileReader();
          reader.onloadend = () => {
            debugger
              const buffer = Buffer.from(reader.result, 0, reader.result.length);
              this.uploadBuffer(buffer, VIDEO_PATH_PREFIX+file.name)
              .then(files => {
                  this.sendToBC(files, metadata);
                  resolve();
              })
              .then(resolve)
              .catch(reject);
          }
          reader.readAsArrayBuffer(file);
      })
    },

    uploadBuffer (buffer, path) {
      return new Promise((resolve, reject) => {
          const ipfs = ipfsAPI(IPFS_IP);
          const files = [{
              path,
              content: buffer
          }];
          if (!ipfs) reject(new Error("Unable to create IPFS object"));
          ipfs.files.add(files, (err, files) => {
              if (!files || err) reject(new Error("Unable to upload to IPFS"));
              resolve(files)
          });
      })
    },

    sendToBC (files, metadata)  {
      return new Promise((resolve, reject) => {
          const web3 = store.getState().web3.web3Instance;
          if (!web3) reject(new Error("Unable to insrtantiate web3"));
          // Get current ethereum wallet.
          web3.eth.getCoinbase((error, coinbase) => {
              if (error) reject(new Error("Unable to getaccount details"));
              onAccountRetrieved(error, coinbase, web3, files, metadata)
              .then(resolve)
          })
      })
    },

    onAccountRetrieved (error, coinbase, web3, files, metadata) {
      const mediaStoreContract = contract(MediaStoreAbi);
      mediaStoreContract.setProvider(web3.currentProvider);
      let mediaId = files[0].hash;;
      
      return mediaStoreContract.deployed()
      .then(mediaStoreInstance => {
          return mediaStoreInstance.addMedia(
              mediaId,
              'hardCodedTag',
              { from: coinbase }
          )
      }).then(({ receipt: { to, transactionHash }}) => {
          alert('Content successfully added into blockchain. transactionHash : ' + transactionHash)
      });
    }

  }
}
</script>

<style scoped lang="scss">
.line{
  text-align: center;
}
.content-upload-form{
  padding:10px;
}
</style>

