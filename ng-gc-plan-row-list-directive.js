/**
 * @license ng-gc-plan-row-list-directive v0.1.0
 * (c) 2013-2013 GoCardless, Ltd.
 * https://github.com/gocardless-ng/ng-gc-plan-row-list-directive.git
 * License: MIT
 */
(function(){
  'use strict';

  angular.module('plan-row-list-template.html', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('plan-row-list-template.html',
      '<div class="payments" ng-show="plans.length"><plan-row plan="plan" is-authorization="{{ !!plan.uri }}" url="{{ getPlanUrl(plan) }}" ng-repeat="plan in plans | orderBy:\'-created_at\'"></plan-row></div>');
  }]);

  'use strict';

  angular.module('gc.planRowListController', [])
  .controller('PlanRowListController', [
    '$scope',
    function PlanRowListController($scope) {

      $scope.getPlanUrl = function getPlanUrl(plan) {
        if (plan.uri) {
          return plan.uri;
        } else {
          return '/plans/' + plan.id;
        }
      };

    }
  ]);

  'use strict';

  angular.module('gc.planRowList', [
    'gc.planRowListController',
    'gc.planRow',
    'plan-row-list-template.html'
  ]).directive('planRowList',
    [function planRowDirective() {

      return {
        restrict: 'E',
        templateUrl: 'plan-row-list-template.html',
        scope: {
          plans: '=',
          url: '@'
        },
        controller: 'PlanRowListController',
        replace: true
      };

    }]);
})();
