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
	}
})(window);
