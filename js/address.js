var vm=new Vue({
	el:".container",
	data:{
		address:[],
		limitNum:3,
		currentIndex:0,
		defaultShipping:1,
		currentAddress:"",
		isShowModal:false,
		isShowModalCreate:false,
		newAddressArray:[{
			userName:"",
			streetName:"",
			tel:"",
			isDefault:false,
		}],
	},
	methods:{
		createAddress:function(){
			this.$http.get("./data/address.json").then(function(res){
				this.address=res.data.result;
			})
		},
		loadMore:function(){
			if(this.limitNum==3)
				this.limitNum=this.address.length;
			else
				this.limitNum=3;
		},
		setDefault:function(id){
			this.address.forEach(function(item,index){
				if(item.addressId==id)
					item.isDefault=true;
				else
					item.isDefault=false;
			});
		},
		delectAddress:function(item){
			this.currentAddress=item;
			this.isShowModal=true;
		},
		confirmDelect:function(){
			var index=this.address.indexOf(this.currentAddress);
			this.address.splice(index,1);
			this.isShowModal=false;
		},
		createNewAddress:function(){
			this.address.push(this.newAddressArray);
		},
	},
	computed:{
		filtersList:function(){
			return this.address.slice(0,this.limitNum);
		},
	},
	mounted:function(){
		this.$nextTick(function(){
			this.createAddress();
		})
	},
	
})