var gulp = require('gulp'),
	cleanCSS = require('gulp-clean-css'),
	imageResize = require('gulp-image-resize');

gulp.task('minify-css', function(){
    return gulp.src('css/*.css')
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('image-resize', function () {
  gulp.src('img/me.png')
    .pipe(imageResize({ 
      width : 720,
      height : 288,
      crop : true,
      upscale : false
    }))
    .pipe(gulp.dest('dist/img/medium'));

  gulp.src('img/me.png')
    .pipe(imageResize({ 
      width : 381,
      height : 152,
      crop : true,
      upscale : false
    }))
    .pipe(gulp.dest('dist/img/small'));

  gulp.src('img/+(pikachu|portfolio|armory-billing).png')
    .pipe(imageResize({ 
      width : 381,
      height : 306.8,
      crop : true,
      upscale : false
    }))
    .pipe(gulp.dest('dist/img/medium'));
});

gulp.task('watch', function(){
	gulp.watch('css/*.css',['minify-css']);
	gulp.watch('css/*.png',['image-resize']);
});

gulp.task('default', ['minify-css','image-resize','watch']);