// Подключаем плагины
const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create(); 

// Описываем задачу копирования HTML-файлов
function html() {
  return gulp.src('src/**/*.html')
        .pipe(plumber())
                .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}

exports.html = html;

// Склеивание и сборка CSS
function css() {
  return gulp.src('src/styles/**/*.css')
        .pipe(plumber())
        .pipe(concat('styles/style.css'))
                .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}

exports.css = css;

// Изображения, шрифты, видео
function images() {
  return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}', { encoding: false })
            .pipe(gulp.dest('dist/images'))
            .pipe(browserSync.reload({stream: true}));
}

exports.images = images; 

function svgs() {
  return gulp.src('src/svg/**/*.svg')
            .pipe(gulp.dest('dist/svg'))
            .pipe(browserSync.reload({stream: true}));
}

exports.svgs = svgs;

function fonts() {
  return gulp.src('src/fonts/**/*.{woff,woff2,css}', { encoding: false })
            .pipe(gulp.dest('dist/fonts'))
            .pipe(browserSync.reload({stream: true}));
}

exports.fonts = fonts;

// Скрипты js
function scripts() {
  return gulp.src('src/scripts/**/*.js')
            .pipe(gulp.dest('dist/scripts'))
            .pipe(browserSync.reload({stream: true}));
}

exports.scripts = scripts;

// Очистка папки dist/
function clean() {
  return del('dist');
}

// Сборка
exports.clean = clean;

const build = gulp.series(clean, gulp.parallel(html, css, images, svgs, fonts, scripts));

exports.build = build;

// Отслеживание изменений в файлах
function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/blocks/**/*.css'], css);
  gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
  gulp.watch(['src/svg/**/*.svg'], svgs);
  gulp.watch(['src/fonts/**/*.{woff, woff2, css}'], fonts);
  gulp.watch(['src/fonts/**/*.js'], scripts);
}
const watchapp = gulp.parallel(build, watchFiles, serve);

exports.watchapp = watchapp; 

// Сервер
function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
}

// Задание дефолтной команды
exports.default = watchapp;
