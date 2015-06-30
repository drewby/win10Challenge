'use strict';

angular
  .module('win10App', [
    // 'ngAnimate',
    // 'ngAria',
    'ngCookies',
    'ngResource',
    'ngRoute',
    // 'ngSanitize',
    // 'ngTouch',
    'win10Services',
    'win10Controllers'
  ]);
  
angular.module('win10Controllers', ['ui.bootstrap']);
angular.module('win10Services', ['ngResource']);