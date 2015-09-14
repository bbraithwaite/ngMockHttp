/// <reference path="../typings/angularjs/angular-mocks.d.ts"/>
module Mock.Http {
    'use strict';
    export function init(): void {
        angular.module('ngMock', ['ng', 'ngMockE2E']).provider({
            $exceptionHandler: (<any>angular.mock).$ExceptionHandlerProvider,
            $log: (<any>angular.mock).$LogProvider,
            $interval: (<any>angular.mock).$IntervalProvider,
            $rootElement: (<any>angular.mock).$RootElementProvider
        }).config([
            '$provide', ($provide: ng.IModule) => {
                $provide.decorator('$timeout', (<any>angular.mock).$TimeoutDecorator);
                $provide.decorator('$$rAF', (<any>angular.mock).$RAFDecorator);
                $provide.decorator('$$asyncCallback', (<any>angular.mock).$AsyncCallbackDecorator);
                $provide.decorator('$rootScope', (<any>angular.mock).$RootScopeDecorator);
                $provide.decorator('$controller', (<any>angular.mock).$ControllerDecorator);
            }
        ]);
    }
    export function reset(): void {
        angular.module('ngMock', ['ng']).provider({
            $browser: (<any>angular.mock).$BrowserProvider,
            $exceptionHandler: (<any>angular.mock).$ExceptionHandlerProvider,
            $log: (<any>angular.mock).$LogProvider,
            $interval: (<any>angular.mock).$IntervalProvider,
            $httpBackend: (<any>angular.mock).$HttpBackendProvider,
            $rootElement: (<any>angular.mock).$RootElementProvider
        }).config([
            '$provide', ($provide: ng.IModule) => {
                $provide.decorator('$timeout', (<any>angular.mock).$TimeoutDecorator);
                $provide.decorator('$$rAF', (<any>angular.mock).$RAFDecorator);
                $provide.decorator('$$asyncCallback', (<any>angular.mock).$AsyncCallbackDecorator);
                $provide.decorator('$rootScope', (<any>angular.mock).$RootScopeDecorator);
                $provide.decorator('$controller', (<any>angular.mock).$ControllerDecorator);
            }
        ]);
    }
}
