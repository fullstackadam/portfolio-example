var gulp = require('gulp'),
	cleanCSS = require('gulp-clean-css'),
	imageResize = require('gulp-image-resize'),
  prettify = require('gulp-prettify');

gulp.task('minify-css', function(){
  gulp.src('src/css/*.css')
    .pipe(cleanCSS({debug: true}, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('prettify', function(){
  gulp.src('src/index.html')
    .pipe(prettify({indent_size: 4}))
    .pipe(gulp.dest('dist'));
});

gulp.task('image-resize', function () {
  gulp.src('src/img/me.png')
    .pipe(imageResize({ 
      width : 720,
      height : 288,
      crop : true,
      upscale : false
    }))
    .pipe(gulp.dest('dist/img/medium'));

  gulp.src('dist/img/medium/me.png')
    .pipe(gulp.dest('src/img/medium'));

  gulp.src('src/img/me.png')
    .pipe(imageResize({ 
      width : 381,
      height : 152,
      crop : true,
      upscale : false
    }))
    .pipe(gulp.dest('dist/img/small'));

  gulp.src('dist/img/small/me.png')
    .pipe(gulp.dest('src/img/small'));

  gulp.src('src/img/+(pikachu|portfolio|armory-billing).png')
    .pipe(imageResize({ 
      width : 381,
      height : 306.8,
      crop : true,
      upscale : false
    }))
    .pipe(gulp.dest('dist/img/medium'));

  gulp.src('dist/img/medium/+(pikachu|portfolio|armory-billing).png')
    .pipe(gulp.dest('src/img/medium'));
});

gulp.task('watch', function(){
	gulp.watch('src/css/*.css',['minify-css']);
  gulp.watch('src/index.html',['prettify']);
	gulp.watch('src/img/**/*.png',['image-resize']);
});

gulp.task('beautify', function() {
  gulp.src('src/index.html')
    .pipe(beautify({indentSize: 4}))
    .pipe(gulp.dest('dist/'));
  gulp.src('dist/index.html')
    .pipe(gulp.dest('src/'));
});

gulp.task('default', ['minify-css','prettify','image-resize']);