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
              action=""
              :on-preview="handlePreview"
              :auto-upload="false"
              :on-remove="deleteAttachment"
              :file-list="form.fileList"
              :on-change="addAttachment"
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
            <el-button type="primary" @click="onSubmit()">Create</el-button>
            <el-button @click="onCancel">Cancel</el-button>
          </el-form-item>
        </el-form>
    </section>
    <!--- Hello world ---->
  </div>
  
</template>


<script>
import  getWeb3  from '@/utils/web3/getWeb3' // 验权
import {authservice} from '../../mixins/pusherlogin.js'
import {uploadFile} from '../../utils/utils';
import {UPLOAD, GENERAL} from '../../utils/message';
import contract from  'truffle-contract';
import TestAbi from '../../../build/contracts/TestContract.json';
import HSDispatcher from '../../hypersign-sdk/dispatcher/dispatcher.js'
import QrcodeVue from 'qrcode.vue'
var CryptoJS = require("crypto-js");



export default {
  components: {
    QrcodeVue,
    PulseLoader
  },
  mounted() {
    debugger
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
        fileList : []
      },
      value: '{"id": 21,"direction":"Login"}',
      showQR: false
    }
  },
  methods: {//
    onSubmit() {
      // this.callSendTx()
      // return  
      const file =  this.form.fileList[0]
      if(file && file.raw){
        uploadFile(file.raw).then((result, filehash)=>{
          if(result && result.res){
            const filehash = result.hash
            this.$message(UPLOAD.UPLD_IPFS_SUCCESS)
            console.log('https://ipfs.io/ipfs/' + filehash)
            // uplaod the content to blockchain
            //this.callSendTx()
          }else{
            // upload unsuccessfull
            this.$message(UPLOAD.UPLD_IPFS_FAIL)
          }
          //hide loader
        })
        .catch((err)=>{
          //hide loader 
          // print err
        })
      }
    },
    addAttachment ( file, fileList ) {
          this.form.fileList.push( file );
    },
    deleteAttachment () {
          // removes from array
    },
    handlePreview (){
      //
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    callSendTx(fileName, fileHash, fileSize) {
      let web3 =  this.$store.state.user.web3.web3Instance
      if(web3){
        const testContract = contract(TestAbi)
        testContract.setProvider(web3.currentProvider);
        testContract.deployed().then(testContractInstance => {
          testContractInstance.set(
            10,
            { from: '0xe1fa969d685abfb6559657ce0367a767b1652b30' }
          )
        })
      }else{
        console.log(GENERAL.NOWEB3)
      }
    },

    // sendToBC (files, metadata)  {
    //   return new Promise((resolve, reject) => {
    //       const web3 = store.getState().web3.web3Instance;
    //       if (!web3) reject(new Error("Unable to insrtantiate web3"));
    //       // Get current ethereum wallet.
    //       web3.eth.getCoinbase((error, coinbase) => {
    //           if (error) reject(new Error("Unable to getaccount details"));
    //           onAccountRetrieved(error, coinbase, web3, files, metadata)
    //           .then(resolve)
    //       })
    //   })
    // },

    // onAccountRetrieved (error, coinbase, web3, files, metadata) {
    //   const mediaStoreContract = contract(MediaStoreAbi);
    //   mediaStoreContract.setProvider(web3.currentProvider);
    //   let mediaId = files[0].hash;;
      
    //   return mediaStoreContract.deployed()
    //   .then(mediaStoreInstance => {
    //       return mediaStoreInstance.addMedia(
    //           mediaId,
    //           'hardCodedTag',
    //           { from: coinbase }
    //       )
    //   }).then(({ receipt: { to, transactionHash }}) => {
    //       alert('Content successfully added into blockchain. transactionHash : ' + transactionHash)
    //   });
    // }

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

