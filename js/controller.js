// todomvc业务（功能）逻辑模块

(function(angular) {

angular
	.module('todoApp.controller', [])
	.controller('TodoController', ['$scope', '$location', 'DataService', TodoController]);


	// 控制器函数
	function TodoController($scope, $location, DataService) {
		// 定义一个变量 vm，这个变量就是对 $scope 的引用！！！
		var vm = $scope;

		// 1 展示任务列表
		var taskList = [
			{id: 1, name: '抽烟', isCompleted: false},
			{id: 2, name: '喝酒', isCompleted: true},
			{id: 3, name: '汤头', isCompleted: false}
		];

		vm.taskList = taskList;

		// 2 添加任务
		vm.newTask = '';
		vm.add = function() {
			// 只需要往 taskList 数组中添加一条数据, 就可以, 页面结构会自动改变!
			if(vm.newTask.trim() === '') {
				return;
			}

			// 根据数组中最后一项的id, 再加1 获取到当前id
			var id, len = vm.taskList.length;
			if( len === 0 ) {
				id = 1;
			} else {
				// vm.taskList[len - 1] 取数组最后一项的值
				id = vm.taskList[len - 1].id + 1;
			}

			// 添加任务, 并且默认任务状态为: 未完成
			vm.taskList.push({id: id, name: vm.newTask, isCompleted: false});

			// 清空文本框内容
			vm.newTask = '';
		};

		// 3 删除一条任务
		vm.remove = function( id ) {
			// console.log(id)
			for(var i = 0; i < vm.taskList.length; i++) {
				if(vm.taskList[i].id === id) {
					vm.taskList.splice(i, 1);
				}
			}
		}

		// 4 修改任务
		vm.editId = 0;
		vm.edit = function( id ) {
			vm.editId = id;
		};
		// 敲回车保存内容
		vm.update = function() {
			vm.editId = 0;
		};

		// 5 切换任务选中状态(单个或批量)
		vm.allChecked = false;
		vm.checkAll = function() {
			vm.taskList.forEach(function( task ) {
				task.isCompleted = vm.allChecked;
			});
		};

		// 6 清除已完成任务
		vm.clearAll = function() {
			var temp = [];
			for(var i = 0; i < vm.taskList.length; i++) {
				if( !vm.taskList[i].isCompleted ) {
					temp.push( vm.taskList[i] );
				}
			}

			vm.taskList = temp;
		};

		vm.isShow = function() {
			var temp = false;

			for(var i = 0; i < vm.taskList.length; i++) {
				if( vm.taskList[i].isCompleted ) {
					temp = true;
					break;
				}
			}

			return temp;
		};


		// 7 显示未完成任务数
		vm.getUnCompleted = function() {
			var count = 0;

			vm.taskList.forEach(function( task ) {
				if( !task.isCompleted ) {
					count++;
				}
			});

			return count;
		};

		// 8 显示不同状态的任务
		vm.selectedStatus = { isCompleted: undefined };
		vm.location = $location;
		vm.$watch('location.url()', function(newValue, oldValue) {
			switch( newValue ) {
				case '/':
					vm.selectedStatus = { isCompleted: undefined };
					break;
				case '/active':
					vm.selectedStatus = { isCompleted: false };
					break;
				case '/completed':
					vm.selectedStatus = { isCompleted: true };
					break;
			}

		});}




})(angular);