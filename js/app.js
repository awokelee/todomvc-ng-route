// 主模块，用来调度所有其他模块

(function (window) {
	'use strict';

	// 完成案例任务代码！！！

	angular
		// 创建模块
		.module('todoApp', [
			'todoApp.controller',
			'todoApp.DataSrv',
		]);

})(window);
