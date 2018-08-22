<template>
  <div class="">
     
          <div>
            <ul>
              <li id="ipfs" class="started"> {{UPLOAD.UPLD_IPFS_ONGO}} </li>
            </ul>
            <qrcode-vue :value="value" :size="310" level="H" v-if = "showQR"></qrcode-vue>
           <ul>
              <li id="bc" class="not-started"> {{UPLOAD.UPLD_BC_ONGO}} </li>
            </ul> <!-- {{ validationMessage }} -->
          </div>
          <div class="dialog-footer">
            <!-- <pulse-loader :loading="loading" :color="color" :size="size" v-if="showLoader"></pulse-loader> -->
            <scale-loader :loading="loading" :color="color" :height="height" :width="width" v-if="showLoader"></scale-loader>
            <!-- <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="dialogVisible = false">Confirm</el-button> -->
          </div>
  </div>
</template>



<script>
import {UPLOAD, GENERAL} from '../../utils/message'
import HSDispatcher from '../../hypersign-sdk/dispatcher/dispatcher.js'
import QrcodeVue from 'qrcode.vue'
var CryptoJS = require("crypto-js");

export default {
  components: {
    QrcodeVue
  },
  mounted() {
    let promise = HSDispatcher.QREventListener()
    promise.then((rawTx) => {
      let msg = JSON.stringify({"id": 21,"direction":"registration", "rawTx" : rawTx})
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
      value: '{"id": 21,"direction":"Login"}',
      showQR: false,
      showLoader : false,
      dialog: true,
      dialogVisible: false,
      UPLOAD : UPLOAD,
      validationMessage : UPLOAD.UPLD_IPFS_ONGO
    }
  },
  methods: {//
    
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


.not-started {
  padding: 5px;
  font-size: x-large;
  color: gray
}

.started {
  padding: 5px;
  font-size: x-large;
  color:black
}
.success {
  padding: 5px;
  font-size: x-large;
  color : green
}
</style>

