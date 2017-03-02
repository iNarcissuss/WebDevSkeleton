const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json',{noImplicitAny: true});
const del = require('del');
const minify = require('gulp-minify');
const chmod = require('gulp-chmod');
(function(){
        var self = this;
        
        self.source = {};
        self.source.typescript = {};
        self.source.css = {};
        self.source.scss = {};
        self.source.all = {};
        self.source.fonts = {};
        self.source.html = {};
        self.source.images = {};
        self.source.all.typescript = {};
        self.source.javascript = {};
        self.source.path = 'clientApp/';
        self.source.favicon = self.source.path+"/favicon.ico";
        self.source.css.path = self.source.path + "css/**/*.css";
        self.source.scss.path = self.source.path + "scss/**/*.scss";
        self.source.html.path = self.source.path + "**/*.+(html|mustache)";
        self.source.fonts.path = self.source.path + "fonts/**.*";
        self.source.javascript.path = self.source.path + 'js/**/*.js';
        self.source.all.typescript = self.source.path + 'ts/**/*.ts';
        self.source.images.path = self.source.path + "images/**/*.+(png|jpg|gif|svg)";

        self.destination = {};
        self.destination.html = {};
        self.destination.javascript = {};
        self.destination.images = {};
        self.destination.css = {};
        self.destination.fonts = {};
        self.destination.path = "dist/";
        self.destination.html.path = self.destination.path;        
        self.destination.favicon = self.destination.path+ "favicon.ico";
        self.destination.images.path = self.destination.path + "images";
        self.destination.javascript.path = self.destination.path + 'js';
        self.destination.css.path = self.destination.path + "css";
        self.destination.fonts.path = self.destination.path + "fonts";

        gulp.task("favicon", function(){
                    return gulp.src(self.source.favicon)
                .pipe(chmod(0o755))
                .pipe(gulp.dest(self.destination.favicon))
            });

        gulp.task("fonts", function(){
                    return gulp.src(self.source.fonts.path)
                .pipe(chmod(0o755))
                .pipe(gulp.dest(self.destination.fonts.path))
            });
        gulp.task("html", function(){
                    return gulp.src(self.source.html.path)
                .pipe(chmod(0o755))
                .pipe(gulp.dest(self.destination.html.path))
            });
        gulp.task("js", function(){
                    return gulp.src(self.source.javascript.path)
                .pipe(chmod(0o755))
                .pipe(gulp.dest(self.destination.javascript.path))
            });
        gulp.task("css", function(){
                    return gulp.src(self.source.css.path)
                .pipe(chmod(0o755))
                .pipe(gulp.dest(self.destination.css.path))
            });
        gulp.task("sass", function(){ 
                return gulp.src(self.source.scss.path)
                            .pipe(sass())
                            .pipe(chmod(0o755))
                            .pipe(gulp.dest(self.destination.css.path));
                });
        gulp.task("imagemin",function(){ 
                return gulp.src(self.source.images.path)
                            .pipe(imagemin())
                            .pipe(chmod(0o755))
                            .pipe(gulp.dest(self.destination.images.path));
                });
                    
        gulp.task('browserSync',function(){ 
            browserSync.init({server: {baseDir: self.source.path}}
        )});

        gulp.task('clean:dist', function() {
            return del.sync(self.destination.path);
        })

        gulp.task('typescript', function() {
            return tsProject.src() 
                .pipe(tsProject({
                    allowJs: true
                })).js.pipe(minify())
                .pipe(chmod(0o755))
                .pipe(gulp.dest(self.destination.javascript.path));
        });

        gulp.task("watch", function(){
            gulp.watch(self.source.scss.path, function(){
                gulp.start("sass");
            });
            gulp.watch(self.source.scss.path, function(){
                gulp.start("css");
            });
            gulp.watch(self.source.fonts.path, function(){
                gulp.start("fonts");
            });                        
            gulp.watch(self.source.images.path, function(){
                gulp.start("imagemin");
            });
            gulp.watch(self.source.html.path, function(){
                gulp.start("html");
            });
            gulp.watch(self.source.all.typescript, function(){
                gulp.start("typescript");
            });
            gulp.watch(self.source.javascript.path, function(){
                gulp.start("js");
            });
        });

        gulp.task("develop",function(){
           gulp.start("clean:dist");
           gulp.start("typescript");
           gulp.start("css");
           gulp.start("sass");
           gulp.start("fonts");
           gulp.start("imagemin");
           gulp.start("html");
           gulp.start("js");
           gulp.start("watch");
        });

}());
