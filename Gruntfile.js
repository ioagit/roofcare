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
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.loadNpmTasks('grunt-contrib-copy');

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
               dest: './public/static/dist/ngScripts.js',
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
                },
                sourceMap: true,
                banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'

            },





            vendors_common: {
                files: {
                    './public/static/dist/vendors.common.min.js':
                    [
                        //jquery
                        './public/vendor/jquery/jquery.min.js',

                        //jquery
                        './public/vendor/jquery/jquery-migrate.js',

                        './public/vendor/bootstrap/dist/js/bootstrap.js',



                        './public/vendor/modernizr/modernizr.js',

                        //Moment Js
                        './public/vendor/momentjs/min/moment-with-langs.min.js',



                        //angular
                        './public/vendor/angular/angular.js',
                        './public/vendor/angular-resource/angular-resource.js',
                        './public/vendor/angular-route/angular-route.js',

                        //local storage managment
                        './public/vendor/angular-local-storage/angular-local-storage.min.js',



                        //Toastr
                        './public/vendor/toastr/toastr.min.js',

                        './public/specs/beta/assets/plugins/hover-dropdown.min.js',
                        './public/specs/beta/assets/plugins/back-to-top.js',
                        './public/specs/beta/assets/plugins/respond.js',


                        //Spin JS
                        './public/vendor/spinjs/spin.js',

                        //angular bootstrap deferred
                        './public/vendor/angular-deferred-bootstrap/angular-deferred-bootstrap.min.js',

                        './public/vendor/angular-loading-bar/build/loading-bar.min.js',

                        './public/vendor/bootstrap3-datetimepicker/src/js/bootstrap-datetimepicker.js',
                        './public/vendor/bootstrap3-datetimepicker/src/js/locales/bootstrap-datetimepicker.de.js',


                        './public/vendor/angular-moment/angular-moment.min.js'


                    ]
                }
            },
            vendors_order: {
                files: {
                    './public/static/dist/vendors.order.min.js':
                        [
                            //For the main site
                            './public/specs/beta/assets/plugins/parallax-slider/js/jquery.cslider.js',
                            './public/specs/beta/assets/js/roofcare.js',
                            './public/specs/beta/assets/js/pages/index.js'
                        ]
                }
            },
            vendors_contractor: {
                files: {
                    './public/static/dist/vendors.contractor.min.js':
                        [



                            //retina
                            './public/vendor/retina.js/src/retina.js'

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
                base: 'server.js'
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
            styles_main: {
                dest: './public/static/dist/app.order.css',
                src: [

                    './public/vendor/bootstrap/dist/css/bootstrap.css',
                    './public/specs/beta/assets/css/app.css',
                    './public/specs/beta/assets/css/style.css',
                    './public/specs/beta/assets/css/headers/header1.css',

                    './public/specs/beta/assets/css/responsive.css',

                    './public/specs/beta/assets/plugins/font-awesome/css/font-awesome.css',
                    './public/specs/beta/assets/plugins/parallax-slider/css/parallax-slider.css',

                    './public/specs/beta/assets/css/themes/red.css',
                    './public/specs/beta/assets/css/themes/headers/header1-red.css',

                    './public/vendor/bootstrap3-datetimepicker/build/css/bootstrap-datetimepicker.min.css',


                    //Toastr
                    './public/vendor/toastr/toastr.css',

                    //Angular related like animation, spinner
                    './public/static/css/ngStyles.css',

                    './public/vendor/angular-loading-bar/build/loading-bar.min.css'







                    //'./public/static/css/**/*.css'

                ]
            },
            styles: {
                dest: './public/static/dist/app.contractor.css',
                src: [

                    './public/vendor/bootstrap/dist/css/bootstrap.min.css',
                    './public/static/css/light-theme.css',
                    './public/static/dist/css/theme-colors.css',


                    //Toastr
                    './public/vendor/toastr/toastr.css',

                    //'./public/static/css/**/*.css'
                    //Angular related like animation, spinner
                    './public/static/css/ngStyles.css',

                    './public/vendor/angular-loading-bar/build/loading-bar.min.css'


                ]
            }
        },

        nodemon: {
            dev: {
                script: 'server.js'
            }
        }
    });

    //installation-related
    grunt.registerTask('install', ['shell:npm_install', 'shell:bower_install']);

    grunt.registerTask('browserify all', ['browserify']);

    //defaults
    grunt.registerTask('default', ['dev']);

    //development
    grunt.registerTask('dev', [ 'concat', 'uglify', 'watch']);


    //server daemon
    grunt.registerTask('serve', ['connect:webserver']);


};
