var vm=new Vue({
	el:"#app",
	data:{
		goodsList:[],
		totalMoney:0,
		selectAll:false,
		selectAllFlag:true,
		isShowModal:false,
		currentGoods:""
	},
	filters:{
		formatMoney:function(item,value){
			return "¥ "+item.toFixed(2)+" "+value;
		}
	},
	mounted:function(){
		this.$nextTick(function(){
			vm.createGoods();
		})
	},
	methods:{
		createGoods:function(){
			this.$http.get("./data/cartData.json").then(function(res){
				vm.goodsList=res.data.result.list;
			})
		},
		changeQuantity:function(item,val){
			if(val>0){
				item.productQuantity++;
			}
			else{
				item.productQuantity--;
				if(item.productQuantity<1)
					item.productQuantity=1;
			}
			this.calcTotalMoney();
		},
		selectOne:function(item){
			if(item.isChecked==="undefined"){
				this.$set(item,"isChecked",true);
			}
			else{
				item.isChecked=!item.isChecked;  //反转
			}
			this.calcTotalMoney();
			if(this.checkAll()){
				vm.selectAll=true;
				vm.selectAllFlag=false;    
			}
			else{
				vm.selectAll=false;
				vm.selectAllFlag=true;  
			}
		},
		calcTotalMoney:function(){
			var sum=0;
			this.goodsList.forEach(function(item,index){
				if(item.isChecked)
				sum+=item.productQuantity * item.productPrice;
			});
				this.totalMoney=sum;
		},
		checkAll:function(){
			var flag=0;
			this.goodsList.forEach(function(item){
				if(item.isChecked){
					flag++;
				}
			});
			if(flag==vm.goodsList.length)
				return true;
			else
				return false;
		},
		selectAllFuc:function(){
			this.goodsList.forEach(function(item,index){
				if(item.isChecked==="undefined"){
					vm.$set(item,"isChecked",true);
				}
				else{
					item.isChecked=vm.selectAllFlag;
				}
			});
			this.selectAll=!this.selectAll;
			this.calcTotalMoney();
			vm.selectAllFlag=!vm.selectAllFlag;   //反转
		},
		showModal:function(bool,val){
			this.isShowModal=bool;
			if(val!="")
				vm.currentGoods=val;
		},
		deleteGood:function(item){
			this.currentGoods=item;
			vm.isShowModal=true;
		},
		confirmDelect:function(){
			var index=this.goodsList.indexOf(vm.currentGoods);
			this.goodsList.splice(index,1);
			vm.isShowModal=false;
		}
	},
})