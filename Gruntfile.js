module.exports = function (grunt) {

    // Load plug-ins
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-open');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    // grunt.loadNpmTasks('grunt-karma');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        //Configuring jshint
        jshint: {
            files: [
                './public/app/**/*.js',
                '!node_modules/**/*'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },


        shell: {
            options: {
                stdout: true
            },
            npm_install: {
                command: 'npm install'
            },
            bower_install: {
                command: 'bower install'
            }
        },

        connect: {
            options: {
                base: 'server/'
            },
            webserver: {
                options: {
                    port: 3000,
                    keepalive: true
                }
            },
            devserver: {
                options: {
                    port: 3000
                }
            },
            testserver: {
                options: {
                    port: 3000
                }
            }
        },

        open: {
            devserver: {
                path: 'http://localhost:3000'
            }
        },

        /*
         karma: {
         unit: {
         configFile: './test/karma-unit.conf.js',
         autoWatch: false,
         singleRun: true
         },
         unit_auto: {
         configFile: './test/karma-unit.conf.js'
         },
         midway: {
         configFile: './test/karma-midway.conf.js',
         autoWatch: false,
         singleRun: true
         },
         midway_auto: {
         configFile: './test/karma-midway.conf.js'
         },
         e2e: {
         configFile: './test/karma-e2e.conf.js',
         autoWatch: false,
         singleRun: true
         },
         e2e_auto: {
         configFile: './test/karma-e2e.conf.js'
         }
         },
         */

        watch: {
            assets: {
                files: ['./public/app/static/css/**/*.css', './public/app/**/*.js'],
                tasks: ['concat']
            }
        },

        concat: {
            styles: {
                dest: './public/dist/app.css',
                src: [
                    './public/app/static/css/**/*.css',
                    './public/vendor/bootstrap/dist/bootstrap.min.css',
                    './public/vendor/bootstrap/dist/bootstrap-theme.min.css',
                    './public/vendor/bootstrap/dist/bootstrap-datetimepicker.min.css',

                    //Toastr
                    './public/vendor/toastr/toastr.css'



                ]
            },
            scripts: {
                options: {
                    separator: ';'
                },
                dest: './app/assets/apps.js',
                src: [
                    //jquery
                    './public/vendor/jquery/jquery.min.js',
                    './public/vendor/jquery-migrate/jquery-migrate.min.js',


                    //modernizer
                    './public/vendor/modernizr/modernizr.min.js',

                    //retina
                    './public/vendor/modernizr/retina.js',

                    //Toastr
                    './public/vendor/toastr/toastr.min.js',



                    //Angular dependencies
                    './public/vendor/angular/angular.min.js',
                    './public/vendor/angular-resource/angular-resource.min.js',
                    './public/vendor/angular-route/angular-route.min.js',

                    //'bower_components/angularjs-scope.safeapply/src/Scope.SafeApply.js',


                    //Bootstrap
                    './public/vendor/bootstrap/dist/bootstrap.min.js',
                    './public/vendor/bootstrap/dist/bootstrap.min.js',
                    './public/vendor/bootstrap-datetimepicker/build/bootstrap-datetimepicker.min.js',


                    './public/app/scripts/lib/router.js',
                    './public/app/scripts/config/config.js',
                    './public/app/scripts/services/**/*.js',
                    './public/app/scripts/directives/**/*.js',
                    './public/app/scripts/controllers/**/*.js',
                    './public/app/scripts/filters/**/*.js',
                    './public/app/scripts/config/routes.js',
                    './public/app/scripts/app.js'
                ]
            }
        }
    });

    //installation-related
    grunt.registerTask('install', ['shell:npm_install', 'shell:bower_install']);

    //defaults
    grunt.registerTask('default', ['dev']);

    //development
    grunt.registerTask('dev', ['install', 'jshint', 'concat', 'connect:devserver', 'open:devserver', 'watch:assets']);

    //server daemon
    grunt.registerTask('serve', ['connect:webserver']);
};
