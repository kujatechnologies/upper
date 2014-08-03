/**
 * `grunt test`      -     run tests
 * `grunt lint`      -     lint front and backend
 * `grunt docs`      -     create docs
 * `grunt validate`  -     check everything is how it should be before making a pull request a main branch
 */

module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                node : true,        // node variables
                browser : true,     // browser variables
                curly: true,        // disallow functions without curly braces
                eqeqeq: true,       // === and  !== instead of == and !=
                strict: true,       // have to enable strict mode
                undef: true,        // disallow globally defined variables
                noarg: true,        // prevents depreciated javascript functions
                loopfunc: true,     // disallow functions inside loops
                immed: true,        // disallow immediate functions, they need ()
                indent: 4,          // force tab indentation to be set to 4
                quotmark: 'single', // force use of single quotation marks
                camelcase: true,    // forces camel case - note this needs to be ignored when using json apis
                unused: true,       // disallows unused variables
                eqnull: true,       // allow variable comparison with null or undefined
                laxcomma: true,     // allow commas before variables or keys
                globals: {
                },
                ignores: ['example/client/public/bower_components/**/**/**/**/**/*.js', 'lib/static/dev/*.js'],
                reporter: require('jshint-stylish')
            },
            uses_defaults: ['lib/**/**/*.js', 'example/**/**/**/*.js']
        },
        jsdox: {
            generate: {
                options: {
                    contentsEnabled: true,
                    contentsTitle: 'Upper',
                    contentsFile: 'readme.md'
                },
                src: ['lib/**/**/*.js', 'test/server/**/*.js', 'test/client/**/*.js'],
                dest: 'docs'
            }
        },
        mochaTest: {
            lib: {
                options: {
                    reporter: 'spec',
                    growl: true,
                    colors: true
                },
                src: ['test/server/**/**/*.js', 'test/common.js']
            }
        },
        concat: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */ \n \n (function () { \n',
                footer: '\n })();\n',
                stripHeaders: true
            },
            dist: {
                src: ['lib/static/dev/upper.js', 'lib/static/dev/browser.js'],
                dest: 'lib/static/upper.js'
            },
            angular: {
                src: ['lib/static/dev/upper.js', 'lib/static/dev/ng-upper.js'],
                dest: 'lib/static/ng-upper.js'
            },
        },
        express: {
            options: {
            },
            test: {
                options: {
                    script: 'test/resources/server.js',
                    spawn: false
                }
            }
        },
        shell: {
            express: {
                options: {
                    port: 9000
                },
                command: 'node example/server/express.js'
            }
        },
        protractor: {
            options: {
                configFile: "test/e2e/e2e.conf.js",
                    keepAlive: false,
                    noColor: false,
                args: {
                }
            },
            your_target: {
                options: {
                    // configFile: "e2e.conf.js", // Target-specific config file
                    // args: {} // Target-specific arguments
                }
            },
        }
    });

    // npm modules
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsdox');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-mocha-selenium');

    // tasks
    grunt.registerTask('build', ['concat:dist', 'concat:angular']);
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('test:frontend', ['express']);
    grunt.registerTask('test:e2e', ['express', 'protractor']);
    // grunt.registerTask('test:e2e', ['express', 'mochaSelenium']);
    grunt.registerTask('test:backend', ['mochaTest']);
    grunt.registerTask('test', ['test:backend', 'test:frontend', 'test:e2e']);
    grunt.registerTask('example', ['shell:express']);
    grunt.registerTask('default', ['build', 'test', 'lint']);
};
