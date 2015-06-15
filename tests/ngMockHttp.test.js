describe('movie app tests', function () {

  beforeEach(module('moviesApp'));

  var $controller;
  var $httpBackend;
  var $scope;
  var $timeout;

  describe('real http tests', function() {

    beforeEach(angular.mock.http.init);
    afterEach(angular.mock.http.reset);

    beforeEach(inject(function(_$controller_, _$httpBackend_) {
      $controller = _$controller_;
      $scope = {};
      $httpBackend = _$httpBackend_;

      // Note that this HTTP backend is ngMockE2E's, and will make a real HTTP request
      $httpBackend.whenGET('http://www.omdbapi.com/?s=terminator').passThrough();
    }));

    it('should load default movies (with real http request)', function (done) {
      var moviesController = $controller('MovieController', { $scope: $scope });

      setTimeout(function() {
        expect($scope.movies).not.toEqual([]);
        done();
      }, 1000);

    });

  });

  describe('mixing real and fake http tests', function() {

    beforeEach(angular.mock.http.init);
    afterEach(angular.mock.http.reset);

    beforeEach(inject(function(_$controller_, _$httpBackend_) {
      $controller = _$controller_;
      $scope = {};
      $httpBackend = _$httpBackend_;
    }));

    it('should load default movies (with real http request)', function (done) {

      $httpBackend.whenGET('http://www.omdbapi.com/?s=terminator').passThrough();

      var moviesController = $controller('MovieController', { $scope: $scope });

      setTimeout(function() {
        expect($scope.movies).not.toEqual([]);
        done();
      }, 1000);

    });

    it('should search for movie (with fake http request)', function (done) {

      $httpBackend.whenGET('http://www.omdbapi.com/?s=terminator').respond({ Search: [{ title: 'Terminator' }] });
      $httpBackend.whenGET('http://www.omdbapi.com/?s=star+wars').respond({ Search: [{ title: 'Return of the Jedi'}] });

      var moviesController = $controller('MovieController', { $scope: $scope });

      $scope.keyword = 'star wars';
      $scope.search();

      setTimeout(function() {
        expect($scope.movies).toEqual([{ title: 'Return of the Jedi'}]);
        done();
      }, 1000);

    });

  });

  describe('mock http test', function() {

    var httpData = [{ title: 'Terminator'}];

    beforeEach(inject(function(_$controller_, _$httpBackend_) {
      $controller = _$controller_;
      $scope = {};
      $httpBackend = _$httpBackend_;
      $httpBackend.whenGET('http://www.omdbapi.com/?s=terminator').respond({ Search: httpData });
    }));

    it('should load default movies (with mock http request)', function () {
      var moviesController = $controller('MovieController', { $scope: $scope });
      $httpBackend.flush();
      expect($scope.movies).toEqual(httpData);
    });

  });

  describe('timeout tests', function() {

    beforeEach(inject(function(_$controller_, _$timeout_, _$httpBackend_) {
      $controller = _$controller_;
      $scope = {};
      $httpBackend = _$httpBackend_;
      $timeout = _$timeout_;

          // Note that this HTTP backend is ngMock's
          $httpBackend.whenGET('http://www.omdbapi.com/?s=terminator').respond({ Search: [{ title: 'Terminator'}] });
        }));

    it('should set results to 3 for sum', function() {
      var calculatorController = $controller('MovieController', { $scope: $scope });

      $scope.sum();

      $httpBackend.flush();
      $timeout.flush();

      expect($scope.movies).toEqual([{ title: 'Terminator'}]);
      expect($scope.result).toBe(3);
    });

  });

}); 