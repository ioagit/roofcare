module.exports = function (grunt) {

    // Load plug-ins
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-open');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-browserify');


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


        "browserify-shim": {
            "jquery": "global:$",
            "angular": "global:angular",
            "toast": "global:toastr"
        },

        browserify: {
           all: {
               src: './public/app/app.js',
               dest: './public/static/dist/bundle.js',
               options: {
                   transform: ['browserify-shim','partialify', 'debowerify',  'deglobalify'],
                   alias: ['./public/app/config/config.js:app_config'],
                   bundleOptions: {
                       debug: true
                   }
               }
           }

        },


        uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            },
            vendors: {
                files: {
                    './public/static/dist/vendors.min.js':
                        [
                            //jquery
                            './public/vendor/jquery-migrate/jquery-migrate.min.js',

                            './public/vendor/bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',

                            //modernizer
                            './public/vendor/modernizr/modernizr.js',

                            //retina
                            './public/vendor/retina.js/src/retina.js',

                            //Toastr
                            './public/vendor/toastr/toastr.min.js'




                    ]
                }
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



        watch: {
            assets: {
                files: './public/static/css/**/*.css',
                tasks: ['concat']
            },
            scripts: {
                files: './public/app/**/*.js',
                tasks: ['browserify all']
            },
            options: {
                spawn: false
            }
        },

        concat: {
            styles: {
                dest: './public/static/dist/app.css',
                src: [

                    //'./public/vendor/bootstrap/dist/css/bootstrap.min.css',
                    './public/static/css/light-theme.css',

                    //Toastr
                    './public/vendor/toastr/toastr.css'

                    //'./public/static/css/**/*.css'

                ]
            },
            scripts: {
                options: {
                    separator: ';'
                },
                dest: './public/static/dist/vendors.js',
                src: [
                    //jquery
                    './public/vendor/jquery-migrate/jquery-migrate.min.js',


                    //modernizer
                    './public/vendor/modernizr/modernizr.js',

                    //retina
                    './public/vendor/retina.js/src/retina.js',

                    //Toastr
                    './public/vendor/toastr/toastr.min.js',



                    './public/vendor/bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js'
                ]
            }
        }
    });

    //installation-related
    grunt.registerTask('install', ['shell:npm_install', 'shell:bower_install']);

    grunt.registerTask('browserify all', ['browserify']);

    //defaults
    grunt.registerTask('default', ['dev']);

    //development
    grunt.registerTask('dev', ['install', 'jshint', 'concat', 'connect:devserver', 'open:devserver', 'watch:assets']);

    //server daemon
    grunt.registerTask('serve', ['connect:webserver']);


};
