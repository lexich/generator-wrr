"use strict";

const path = require("path");
const gulp = require("gulp");
const eslint = require("gulp-eslint");
const excludeGitignore = require("gulp-exclude-gitignore");
const mocha = require("gulp-mocha");
const nsp = require("gulp-nsp");
const plumber = require("gulp-plumber");

gulp.task("static", function () {
  return gulp.src("**/*.js")
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("nsp", function (cb) {
  nsp({ package: path.resolve("package.json") }, cb);
});

gulp.task("test", function (cb) {
  let mochaErr;

  gulp.src("test/**/*.js")
    .pipe(plumber())
    .pipe(mocha({ reporter: "spec" }))
    .on("error", function (err) {
      mochaErr = err;
    })
    .on("end", function () {
      cb(mochaErr);
    });
});


gulp.task("prepublish", ["nsp"]);
gulp.task("default", ["static", "test"]);
