
Array.prototype.inArray = function (value)
{
	 // Returns true if the passed value is found in the
	 // array. Returns false if it is not.
	 var i;
	 for (i=0; i < this.length; i++)
	 {
	 if (this[i] == value)
	 {
	 return true;
	 }
	 }
	 return false;
}

export const signtxMixin = {
	

	created(){
	
	},

	data(){
	     	 return {
     	 }
 	},
	methods:{
		updateStatus(id,status) {
	      var d = document.getElementById(id);
	      if(d){
	        if(status == "NOTSTARTED"){
	          d.className += " not-started";
	        }

	        if(status == "STARTED"){
	          d.className += " started";
	        }
	        if(status == "COMPLETED"){
	          d.className += " success";
	        }
	      }
	    },
		
	}
}