(function (window) {
	'use strict';

	// 完成案例任务代码！！！

	angular
		// 创建模块
		.module('todoApp', [])
		// 创建控制器
		.controller('TodoController', ['$scope', TodoController]);


	// 控制器函数
	function TodoController($scope) {
		// 定义一个变量 vm，这个变量就是对 $scope 的引用！！！
		var vm = $scope;

		// 1 展示任务列表
		// 	1.1 处理任务的选中状态 （checkbox）
		// 		状态需要根据 每一个对象的 isCompleted 属性的值来确定！！！
		// 	1.2 处理当前任务的样式 （completed）
		// 		根据任务的状态，如果完成了，就添加样式；否则，不添加
		var taskList = [
			{id: 1, name: '抽烟', isCompleted: false},
			{id: 2, name: '喝酒', isCompleted: true},
			{id: 3, name: '汤头', isCompleted: false}
		];

		vm.taskList = taskList;

		// 2 添加任务
		// 2.1 在文本框中输入内容, 点击回车,进行添加任务
		// 2.2 清空文本框内容
		// 2.3 判断是否为空, 为空不处理
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
	}
})(window);
