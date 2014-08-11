'use strict';

var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less', function () {
  gulp.src('./public/lib/css/**/*.less')
      .pipe(less())
      .pipe(gulp.dest('./public/lib/css'));
});

gulp.task('watch',function(){
  gulp.watch('./public/lib/css/**/*.less', ['less']);
});

gulp.task('default', ['watch']);
