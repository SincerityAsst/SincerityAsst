//引入gulp及组件
var gulp = require('gulp'),
    sass = require('gulp-sass'), // sass编译
    pngquant = require('imagemin-pngquant'), //深度压缩png图片
    imageminJpegoptim = require('imagemin-jpegoptim'), //深度压缩jpg图片
    nano = require('gulp-cssnano'),    //css压缩
    uglify = require('gulp-uglify'),           //js压缩
    sprite2 = require('gulp-sprite2'),   //合并图片1
    makeUrlVer = require('gulp-make-css-url-version'),  //图片添加版本号
    concat = require('gulp-concat');     //合并文件;

//scss解析
gulp.task('scss', function () {
    gulp.src('./dev/css/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./release/css'));
});
gulp.task('watch-scss', function () {
    gulp.watch('./dev/css/*.scss', ['scss']);
});

//css任务
gulp.task('cssmin', function () {
    gulp.src('../dev/css/*.css')
        .pipe(makeUrlVer())  //添加版本号
        .pipe(nano({     //压缩css
            discardUnused: false,
            zindex: false,
            reduceIdents: false,
            mergeIdents: false,
            colormin: false
        }))
        .pipe(concat('style.min.css'))   //合并文件
        .pipe(gulp.dest('../release/css/'));
});

//图片压缩任务
gulp.task('image', function () {
    gulp.src('../dev/images/*')
        .pipe(pngquant()())
        .pipe(imageminJpegoptim({progressive: true})())
        .pipe(gulp.dest('../release/images/'));
});

//js压缩任务
gulp.task('js', function () {
    gulp.src('../dev/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('../release/js/'));
});

