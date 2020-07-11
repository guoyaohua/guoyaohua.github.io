var gulp = require('gulp')
var mathjax = require('gulp-mathjax-page')

gulp.task('mathjax', function() {
    gulp.src('./public/**/*.html')
    .pipe(mathjax({
        mjpageConfig: {
            format: ['TeX'],
            singleDollars: true,
            cssInline: false,
            mhchem: {legacy: true}
        },
        mjnodeConfig: {
            svg: true,
            css: false,
            speakText: false
        }
    }))
    .pipe(gulp.dest('./public'))
})