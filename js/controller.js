// todomvc业务（功能）逻辑模块

(function(angular) {

angular
	.module('todoApp.controller', ['ngRoute'])
	// 配置路由
	.config(['$routeProvider',function($routeProvider) {
		
		$routeProvider.when('/:status?', {
			// templateUrl: 'todoView',
			templateUrl: './views/todo.html',
			controller: 'TodoController'
		})


	}])
	.controller('TodoController', ['$scope', '$routeParams', 'DataService', TodoController]);

	// 控制器函数
	function TodoController($scope, $routeParams, DataService) {
		// 注意：只要是路由发生了变化，那么控制器中的代码就要重新执行一次！！！
		// 定义一个变量 vm，这个变量就是对 $scope 的引用！！！
		var vm = $scope;

		// 1 展示任务列表
		vm.taskList = DataService.getData();

		// 2 添加任务
		vm.newTask = '';
		vm.add = function() {
			if(vm.newTask.trim() === '') {
				return;
			}

			// 调用保存数据的方法
			DataService.setData( vm.newTask );

			// 清空文本框内容
			vm.newTask = '';
			// 因为新添加的任务都是没有完成的
			vm.allChecked = false;
		};

		// 3 删除一条任务
		vm.remove = function( id ) {
			DataService.remove( id );
		};
		// vm.remove = DataService.remove;

		// 4 修改任务
		vm.editId = 0;
		vm.edit = function( id ) {
			vm.editId = id;
		};
		// 敲回车保存内容
		vm.update = function() {
			vm.editId = 0;

			// 保存数据
			DataService.save();
		};

		// 5 切换任务选中状态(单个或批量)
		// 因为单选切换任务的状态，也是修改了数据，所以，单选功能也需要保存数据！！
		vm.toggleItem = function() {
			// 每一次修改单个任务状态，都来判断是否需要将全选按钮选中
			vm.allChecked = DataService.allChecked();

			// 选中状态切换以后，是需要将数据进行保存的！！！
			// 只要调用save方法，就能够将数据保存到 localStorage
			DataService.save();
		};

		// 使用 方法 来代替 属性，这样数据变化的时候，
		// 这个方法就会被重新调用，用来控制当前的选中状态
		// vm.allChecked = false;
		vm.allChecked = DataService.allChecked();

		// 通过全选按钮控制所有任务项的选中状态
		vm.checkAll = function() {
			DataService.checkAll( vm.allChecked );
		};

		// 6 清除已完成任务
		vm.clearAll = function() {
			DataService.clearAll();

			// 因为 DataService.clearAll 方法中，重新修改了
			// this.taskList 的指向，所以，需要重新获取数据
			// vm.taskList = DataService.getData();
		};

		vm.isShow = function() {
			return DataService.isShow();
		};


		// 7 显示未完成任务数
		vm.getUnCompleted = function() {
			return DataService.getUnCompleted();
		};
		
		// 8 显示不同状态的任务
		vm.selectedStatus = { isCompleted: undefined };
		console.log($routeParams);

		switch ($routeParams.status) {
			case 'active':
				vm.selectedStatus = { isCompleted: false };
				break;
			case 'completed':
				vm.selectedStatus = { isCompleted: true };
				break;
			default:
				vm.selectedStatus = { isCompleted: undefined };
				break;
		}

	}




})(angular);