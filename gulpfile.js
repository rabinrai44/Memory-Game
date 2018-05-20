const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');


// Compile sass
gulp.task('sass', function(){
  return gulp.src(['./src/styles/scss/app.scss'])
  .pipe(sass())
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.stream());
});

// JavaScript Compile
// gulp.task("scripts", function() {
//     gulp.src("src/scripts/*.js")
//         .pipe(gulp.dest("src/scripts/temp"))
// });


// Watch & Serve
gulp.task('serve', ['sass'], function(){
  browserSync.init({
    server: './src'
  });

  gulp.watch(['src/styles/scss/**/*.scss'], ['sass']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});

// Default
gulp.task('default', ['serve']);
