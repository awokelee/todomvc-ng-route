(function(angular) {
  angular
    .module('todoApp.controller', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/:status?', {
        templateUrl: './views/todo.html',
        controller: 'TodoController'
      });
    }])	
    .controller('TodoController', ['$scope', '$routeParams', 'DataService', TodoController]);

  function TodoController($scope, $routeParams, DataService) {
    var vm = $scope;

    // 1. 展示任务列表
    vm.taskList = DataService.getData();

    // 2. 添加任务
    vm.newTask = '';
    vm.add = function() {
      if (vm.newTask.trim() === '') {
        return;
      }

      DataService.setData(vm.newTask);
      vm.newTask = '';
      vm.allChecked = false;
    };

    // 3. 删除一条任务
    vm.remove = function(id) {
      DataService.remove(id);
    };

    // 4. 修改任务
    vm.editId = 0;
    vm.edit = function(id) {
      vm.editId = id;
    };

    // 敲回车保存内容
    vm.update = function() {
      vm.editId = 0;

      DataService.save();
    };

    // 5. 切换任务选中状态
    vm.toggleItem = function() {
      vm.allChecked = DataService.allChecked();

      DataService.save();
    };

    vm.allChecked = DataService.allChecked();

    vm.checkAll = function() {
      DataService.checkAll(vm.allChecked);
    };

    // 6. 清除已完成
    vm.clearAll = function() {
      DataService.clearAll();
    };

    vm.isShow = function() {
      return DataService.isShow();
    };

    // 7. 显示未完成任务数
    vm.getUnCompleted = function() {
      return DataService.getUnCompleted();
    };

    // 8. 显示不同状态的任务
    vm.selectedStatus = { isCompleted: undefined };

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
