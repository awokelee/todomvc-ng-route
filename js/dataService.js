(function(angular) {
  angular
    .module('todoApp.DataSrv', [])
    .service('DataService', ['$window', function($window) {

      var localStorage = $window.localStorage;

      var dataStr = localStorage.getItem('todo');
      var taskList = JSON.parse(dataStr) || [];
      this.taskList = taskList;

      // 1. 获取数据列表
      this.getData = function() {
        return this.taskList;
      };

      // 2. 添加数据
      this.setData = function(name) {
        var id, len = this.taskList.length;
        if (len === 0) {
          id = 1;
        } else {
          id = this.taskList[len - 1].id + 1;
        }

        this.taskList.push({ id: id, name: name, isCompleted: false });
        this.save();
      };

      // 4. 数据存储到 localStorage 
      this.save = function() {
        localStorage.setItem('todo', JSON.stringify(this.taskList));
      };

      // 3. 删除数据
      this.remove = function(id) {
        for (var j = 0; j < this.taskList.length; j++) {
          if (this.taskList[j].id === id) {
            this.taskList.splice(j, 1);
          }
        }
        this.save();
      };

      // 5. 切换任务选中状态
      this.checkAll = function(allChecked) {
        this.taskList.forEach(function(task) {
          task.isCompleted = allChecked;
        });

        this.save();
      };

      // 控制全选按钮的状态
      this.allChecked = function () {
      	var checked = true;

      	(this.taskList.length === 0) && (checked = false);

      	this.taskList.forEach( function(task) {
      		if (!task.isCompleted) {
      			checked = false;
      		}
      	});

      	return checked;
      };

      // 6. 清除已完成任务
      this.clearAll = function () {
      	var temp = [];

      	for(var i = 0; i < this.taskList.length; i ++) {
      		if (!this.taskList[i].isCompleted) {
      			temp.push(this.taskList[i]);
      		}
      	}

      	this.taskList.length = 0;
      	[].push.apply(this.taskList, temp);

      	this.save();
      };

      this.isShow = function () {
      	var temp = false;

      	for(var i = 0; i < this.taskList.length; i++) {
      		if ( this.taskList[i].isCompleted ) {
      			temp = true;
      			break;
      		}
      	}

      	return temp;
      };

      // 7. 显示未完成任务数
      this.getUnCompleted = function () {
      	var count = 0;

      	this.taskList.forEach( function(task) {
      		if (!task.isCompleted) {
      			count++;
      		}
      	});

      	return count;
      };

    }]);
})(angular);
