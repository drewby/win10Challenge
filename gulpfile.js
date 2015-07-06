/// <binding Clean='clean' />

var gulp = require("gulp"),
  rimraf = require("rimraf"),
  fs = require("fs"),
  path = require("path"),
  minifyCSS = require('gulp-minify-css'),
  project = require("./project.json"),
  compass = require('gulp-compass');

var paths = {
  bower: "./bower_components/",
  lib: "./" + project.webroot + "/lib/"
};
 
gulp.task('compass', function() {
  gulp.src('./wwwroot/*.scss')
    .pipe(compass({
      project: path.join(__dirname, 'wwwroot'),
      css: 'styles',
      sass: 'styles'
    }))
    .on('error', function(error) {
      // Would like to catch the error here 
      console.log(error);
      this.emit('end');
    })
    .pipe(minifyCSS())
    .pipe(gulp.dest('wwwroot/styles'));
});

gulp.task('minify-css', function() {
  return gulp.src('./wwwroot/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('wwwroot/styles'));
});

gulp.task('compass-watch', function() {
  gulp.watch(['wwwroot/styles/*.scss'], ['compass']);
});

gulp.task("clean", function (cb) {
  rimraf(paths.lib, cb);
});

gulp.task("copy", ["clean"], function () {
  var bower = {
    "bootstrap": "bootstrap/dist/**/*.{js,map,css,ttf,svg,woff,eot}",
    "bootstrap-touch-carousel": "bootstrap-touch-carousel/dist/**/*.{js,css}",
    "bootstrap-sass-official": "bootstrap-sass-official/assets/**/*.{js,map,scss,ttf,svg,woff,eot}",
    "bootstrap-star-rating": "bootstrap-star-rating/**/*.{js,css,gif}",
    "hammer.js": "hammer.js/hammer*.{js,map}",
    "jquery": "jquery/dist/jquery*.{js,map}",
    "jquery-validation": "jquery-validation/jquery.validate.js",
    "jquery-validation-unobtrusive": "jquery-validation-unobtrusive/jquery.validate.unobtrusive.js",
    "angular": "angular/*.js",
    "angular-animate": "angular-animate/*.js",
    "angular-aria": "angular-aria/*.js",
    "angular-cookies": "angular-cookies/*.js",
    "angular-resource": "angular-resource/*.js",
    "angular-route": "angular-route/*.js",
    "angular-sanitize": "angular-sanitize/*.js",
    "angular-touch": "angular-touch/*.js",
    "ng-bs-animated-button" : "ng-bs-animated-button/*.{js,css}"
  };

  for (var destinationDir in bower) {
    gulp.src(paths.bower + bower[destinationDir])
      .pipe(gulp.dest(paths.lib + destinationDir));
  }
  
  gulp.src("ui-bootstrap/ui-bootstrap*.js").pipe(gulp.dest(paths.lib + "ui-bootstrap"));
});
