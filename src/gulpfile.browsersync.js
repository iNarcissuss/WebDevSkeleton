var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json',{noImplicitAny: true});
//var mustache = require("gulp-mustache");
var browserSync = require('browser-sync').create();
var del = require('del');
var minify = require('gulp-minify');
(function(){
        var self = this;
        
        self.source = {};
        self.source.typescript = {};
        self.source.scss = {};
        self.source.all = {};
        self.source.fonts = {};
        self.source.html = {};
        self.source.images = {};
        self.source.all.typescript = {};
        self.source.all.javascript = {};
        self.source.path = 'app/';
        self.source.scss.path = self.source.path + "scss/**/*.scss";
        self.source.html.path = self.source.path + "**/*.html";
        self.source.fonts.path = self.source.path + "fonts/**.*";
        self.source.all.javascript = self.source.path + 'js/**/*.js';
        self.source.all.typescript = self.source.path + '**/*.ts';
        self.source.typescript.typings = self.source.path + 'typings/';
        self.source.typescript.libraryTypings = self.source.path + 'typings/main/**/*.ts';
        self.source.images.path = self.source.path + "images/**/*.+(png|jpg|gif|svg)";

        self.destination = {};
        self.destination.html = {};
        self.destination.javascript = {};
        self.destination.images = {};
        self.destination.css = {};
        self.destination.fonts = {};
        self.destination.path = "dist/";
        self.destination.html.path = self.destination.path;        
        self.destination.images.path = self.destination.path + "images";
        self.destination.javascript.path = self.destination.path + 'js';
        self.destination.css.path = self.destination.path + "css";
        self.destination.fonts.path = self.destination.path + "fonts";

self.tasks = {"sass":   
                        {
                            "callback":sass,
                            "source":self.source.scss.path, 
                            "destination":self.destination.css.path,
                            "watches": [self.source.scss.path],
                            "sync": true
                        },
                      "fonts":{
                             "callback": null,
                             "source":self.source.fonts.path,
                             "destination":self.destination.fonts.path,
                             "watches": [self.source.fonts.path],
                             "sync": true
                      },
                      "imagemin":{
                             "callback": imagemin,
                             "source":self.source.images.path,
                             "destination":self.destination.images.path,
                             "watches": [self.source.images.path],
                             "sync": true
                      },
                      "html":{
                             "callback": null,
                             "source":self.source.html.path,
                             "destination":self.destination.html.path,
                             "watches": [self.source.html.path],
                             "sync": true
                      }
                    };
        
        self.watches = {}; 
        self.addWatch = function(name, task){
                if(typeof(task.watches)!=="undefined"){
                for(var i = 0; i <task.watches.length; i+=1){
                    var watch = task.watches[i];
                    if(!(name in self.watches)){
                        self.watches[name] = [];
                    }
                    self.watches[name].push(watch);
                } 
                }
            }
        

        self.addTask = function(name, task){
            var taskCall = function(){};
            if(task.callback){
                if(task.sync){
                    taskCall =function(){
                                return gulp.src(task.source)
                                    .pipe(task.callback())
                                    .pipe(gulp.dest(task.destination));
                            };
                } else {
                    taskCall = function(){
                                return gulp.src(task.source)
                                    .pipe(task.callback())
                                    .pipe(gulp.dest(task.destination))
                                    .pipe(browserSync.reload({stream: true}));
                            }
                }
            } else {
                taskCall = function(){
                     return gulp.src(task.source)
                    .pipe(gulp.dest(task.destination))
                }
            }
            gulp.task(name, taskCall);
        };
        Object.keys(tasks).forEach(function(key, index) {
            self.addTask(key, tasks[key]);
            self.addWatch(key, tasks[key]); 
        }, self.tasks);

        //Special tasks
        gulp.task('browserSync',function(){ 
            browserSync.init({server: {baseDir: self.source.path}}
        )});
        
        gulp.task('clean:dist', function() {
            return del.sync(self.destination.path);
        })

        gulp.task('typescript', function() {
            return tsProject.src() 
                .pipe(tsProject()).js.pipe(minify()).pipe(gulp.dest(self.destination.javascript.path));
        });

        gulp.task("watch", function(){
                    
                Object.keys(watches).forEach(function(key, index) {
                    gulp.watch(watches[key][0], function(){
                            gulp.start(key);
                        });
                    
                }, self.watches);
            gulp.watch(self.source.all.typescript, function(){
                gulp.start("typescript");
            });

        });

        gulp.task("develop",function(){
           gulp.start("clean:dist");
           gulp.start("typescript");
           var tasksForDev = Object.keys(self.tasks), i =0;
           for(i =0; i<tasksForDev.length; i += 1){
               gulp.start(tasksForDev[i]);
           }
           gulp.start("watch");
        });

}());
