<template>
	<div class="mshow">
		<el-upload
			class="upload-demo"
			drag
			:before-upload="beforeUpload"
			:on-success="uploadSuccess"
			:on-remove="fileRemove"
			:file-list="filelist"
			action="http://localhost:8080/api/backstage/postfile/"
			multiple>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			<div class="el-upload__tip" slot="tip">只能上传文件</div>
		</el-upload>
		<div id="mtable">
			<el-table ref="multipleTable" tooltip-effect="dark" :data="filelist" @selection-change="handleSelectionChange">
				<el-table-column type="selection">
				</el-table-column>
				<el-table-column label="已上传文件">
					<template slot-scope="scope">
						<div slot="reference" class="name-wrapper">
							{{scope.row.name}}
						</div>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" :disabled="btndisabled" @click="handleBack([{'filename': scope.row.name}])">备份</el-button>
						<el-button size="mini" type="warning" :disabled="btndisabled" @click="handleUpdate([{'filename': scope.row.name}])">更新</el-button>
						<el-button size="mini" type="danger" :disabled="btndisabled" @click="handleDel(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-button-group id="mbutton">
				<el-button @click="handleBackSelection">备份选中</el-button>
				<el-button @click="handleUpdateSelection">更新选中</el-button>
				<el-button @click="handleDelSelection">删除选中</el-button>
			</el-button-group>
		</div>
	</div>

</template>

<script>
	import axios from 'axios'
	export default {
		data(){
			return {
				multipleSelection: [],
			}
		},
		methods: {
			beforeUpload(file){
				this.$store.dispatch('ChangeDisabled')
			},			
			uploadSuccess(resp){
				let pd = resp.exec
				if (pd === 'true') {
					this.$message.success(resp.reason)
					this.fileChange()
				} else {
					this.$message.error(resp.reason)
				}
			},
			fileRemove: function(file) {
				axios({
					method: 'post',
					url: '/api/backstage/delfile',
					data: {file: file.name},
					transformRequest:[
						function(data) {
							let params = ''
							for(let index in data) {
								params += index+'='+data[index]+'&'
							}
							return params
						}
					]
				}).then(resp => {
					// console.log(resp.data)
						this.fileChange();
						
				}).catch(err => {
				})
			},
			fileChange() {
				// axios({
				// 	method: 'get',
				// 	url: '/api/backstage/listfile',
				// }).then(resp => {
				// 	if (resp.data.filelist.length > 0) {
				// 		this.filelist = resp.data.filelist;
				// 		this.bflag = true
				// 	} else {
				// 		this.filelist = [];
				// 		this.bflag = false
				// 	}
				// }).catch(err => {console.log(err)})
				this.$store.dispatch('ListFile').then(resp => {console.log(resp)}).catch(err => {console.log(err)})
			},
			handleDel(index, row) {
				// console.log(index, row)
				// console.log(row.filename)
				this.fileRemove({'name': row.filename}, {'name': row.filename})
			},
			handleDelSelection() {
				for (let i in this.multipleSelection) {
					this.fileRemove({'name': this.multipleSelection[i].filename})
				}
			},
			handleSelectionChange(val) {
        		this.multipleSelection = val;
      		},
      		handleBack(row) {
      			// console.log(row);
    //   			axios({
				// 	method: 'post',
				// 	url: '/api/backstage/backupfile',
				// 	data: row,
				// 	transformRequest:[
				// 		function(data) {
				// 			let params = ''
				// 			for(let index in data) {
				// 				params += 'filename=' + data[index].filename + '&'
				// 			}
				// 			return params
				// 		}
				// 	]
				// }).then(resp=>{
				// 	let successlist = resp.data.successlist;
				// 	let faillist = resp.data.faillist;
				// 	for (let index in successlist) {
				// 		// let now = new Date();
				// 		// console.log(now.getTime())
				// 		// let exitTime = now.getTime() + 1000
				// 		// while (true) {
				// 		// 	now = new Date();
				// 		// 	if (now.getTime() > exitTime) {
				// 		// 		break;
				// 		// 	}
				// 		// }
				// 		this.title = '备份成功！';
				// 		this.message = successlist[index];
				// 		this.type = 'success';
				// 		this.open2()
				// 	};
				// 	for (let index in faillist) {
				// 		this.title = '备份失败！';
				// 		this.message = '请检查'+faillist[index]+'是否合规';
				// 		this.type = 'error';
				// 		this.open2()
				// 	}
				// }).catch(err=>{console.log(err)})
				this.$store.dispatch('BackUpFile',filename).then(resp => {console.log(resp)}).catch(err => {console.log(err)})

				// axios({
				// 	method: 'get',
				// 	url: '/api/backstage/backupfile',
				// 	params: {
				// 		'filename': row[0].filename,
				// 		'filename': 'xx'
				// 	}

				// })
      		},
      		handleBackSelection() {
      			this.handleBack(this.multipleSelection)
      			// console.log(this.multipleSelection)
      		},
      		handleUpdate(row) {
      			// console.log(this.loading)
      			this.loading.pd = true;
      			axios({
					method: 'post',
					url: '/api/backstage/updatefile',
					data: row,
					transformRequest:[
						function(data) {
							let params = ''
							for(let index in data) {
								params += 'filename=' + data[index].filename + '&'
							}
							return params
						}
					]
				}).then(resp=>{
					// console.log(resp.data.successdata)
					// console.log(resp.data.faillist)
					let pdata = '';
					let data = resp.data.successdata;
					for (let item1 in data) {
						pdata += item1 + '<br>'
						for (let item2 in data[item1]) {
							for (let item3 in data[item1][item2])
								pdata += item3 + ' : ' + data[item1][item2][item3]+ '<br>'
						}
					};
					let fdata = resp.data.faillist;
					for (let fitem in fdata) {
							pdata += '<br>' + fdata[fitem] + '文件不符合要求<br>'
					};
					console.log(pdata)					
	      			this.loading.pd = false;
					this.$alert('<html>'+pdata+'</html>', {dangerouslyUseHTMLString: true, showClose: false})
					
				}).catch(err=>{console.log(err)})
      		},
      		handleUpdateSelection() {
      			this.handleUpdate(this.multipleSelection)
      		},

		},
		computed: {
			filelist() {
				return this.$store.getters.filelist
			},
			btndisabled() {
				return this.$store.getters.btndisabled
			}
		},
		created() {
			// console.log(1)
			this.fileChange()
		},
	}
</script>

<style scoped>
	.mshow {
		display: flex;
	}
	/*.mshow {
		display: flex;
		position: absolute;
		left: 10.5%;
		border:1px solid #ccc;
		border-radius: 8px;
		height: 80%;
		width: 85%;
	}*/
	.upload-demo {
		margin: 8% 1% 1% 8%;
		z-index: 666;
	}
	#mtable {
		position: absolute;
		right: 2%;
		/*border: 1px solid red;*/
		width: 60%;
	}
	#mbutton {
		position: absolute;
		right: 2%;
		margin-top: 1%;
	}
</style>