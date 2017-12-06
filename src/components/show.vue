<template>
	<div class="mshow">
		<el-upload
			class="upload-demo"
			drag
			:before-upload="beforeUpload"
			:on-success="uploadSuccess"
			:on-remove="fileRemove"
			:file-list="fileList"
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
							{{scope.row.filename}}
						</div>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" v-show="bflag" :disabled="b2flag">备份</el-button>
						<el-button size="mini" type="warning" v-show="bflag" :disabled="b2flag">更新</el-button>
						<el-button size="mini" type="danger" v-show="bflag" @click="handleDel(scope.$index, scope.row)" :disabled="b2flag">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-button-group v-show="bflag" id="mbutton">
				<el-button>备份选中</el-button>
				<el-button>更新选中</el-button>
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
				fileList: [],
				message:'',
				type: '',
				flag: true,
				bflag: false,
				b2flag: false,
				b2flagcount: 0,
				// filelist: [{'filename':''}],
				filelist: [],
				multipleSelection: [],
			}
		},
		methods: {
			beforeUpload(file){
				this.b2flagcount += 1;
				if (this.b2flagcount === 0) {
					this.b2flag = false
				} else {
					this.b2flag = true
				}
				return this.flag
			},			
			uploadSuccess(resp, file){
				this.$message({
					message: file.name + '上传成功',
					type: 'success',
				});
				this.fileList[this.fileList.length] = {'name':file.name};
				// this.fileList.push({'name':file.name}); push导致报错 原因未查明
				// console.log(typeof this.fileList)
				this.fileChange();
				this.b2flagcount -= 1;
				if (this.b2flagcount === 0) {
					this.b2flag = false
				} else {
					this.b2flag = true
				}
			},
			fileRemove: function(file) {
				if (this.b2flag === true) {
					this.b2flag = false
				}
				// console.log(this.fileList);
				// axios.get('/api/backstage/delfile', {params:{file:file.name}}).then(resp => {console.log(resp)}).catch(resp => {console.log(resp)})
				// axios({
				// 	method: 'get',
				// 	url: '/api/backstage/delfile',
				// 	params: {
				// 		file: file.name
				// 	}
				// }).then(resp => {console.log(resp)})
				// axios.post('/api/backstage/delfile', 'file='+file.name).then(resp => {console.log(resp)})
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
					if (resp.data.exec === "true"){
						this.message = file.name+'已删除';
						this.type = 'success';
						this.open();
						for (let i = 0; i < this.fileList.length; i++) {
							if (this.fileList[i].name === file.name) {
								this.fileList.splice(i,1)
							}
					};
						this.fileChange();
						
					} else if (resp.data.exec === "false"){
						this.message = file.name+'删除失败,请确认是否已上传';
						this.type = 'warning';
						this.open();
					}
				}).catch(err => {
					this.message = '与服务通信失败';
					this.type = 'error';
					this.open()
				})
			},
			fileChange() {
				axios({
					method: 'get',
					url: '/api/backstage/listfile',
				}).then(resp => {
					if (resp.data.filelist.length > 0) {
						this.filelist = resp.data.filelist;
						this.bflag = true
					} else {
						this.filelist = [];
						this.bflag = false
					}
				}).catch(err => {console.log(err)})
			},
			open() {
				this.$message({
					message: this.message,
					type: this.type,
				})
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
		position: absolute;
		left: 10.5%;
		border:1px solid #ccc;
		border-radius: 8px;
		height: 80%;
		width: 85%;
	}
	.upload-demo {
		margin: 2% 1% 1% 2%;
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