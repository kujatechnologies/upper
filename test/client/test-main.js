/**
* @desc This is entry-point for testing with karma-runner and requirejs
* @reference http://karma-runner.github.io/0.8/plus/RequireJS.html
*/
(function () {

    'use strict';

    /**
     * @desc RequireJS workaround when using karma, generated by `karma init`
     */
    var specFiles = null;
    var baseUrl = '';
    var requirejsCallback = null;

    // if invoked in karma-runner environment
    if (typeof window !== 'undefined' && window.__karma__ !== undefined) {
        // Karma serves files from '/base'
        baseUrl = '/base';
        requirejsCallback = window.__karma__.start;

        // looking for *_spec.js files
        specFiles = [];
        for (var file in window.__karma__.files) {
            if (window.__karma__.files.hasOwnProperty(file)) {

                // if it contains all of these words:
                if (/.*\/.+Spec\.js$/.test(file)) {
                    specFiles.push(file);
                }
            }
        }
    }

    /**
     * @desc Required files for unit testing using RequireJS
     */
    requirejs.config({
        baseUrl: baseUrl,
        paths: {
            // chai BDD lib
            'chai': 'node_modules/chai/chai',
        },

        shim: {

        },

        // ask Require.js to load these files (all our tests)
        deps: specFiles,

        priority: [],

        // start test run, once Require.js is done
        callback: requirejsCallback
    });
})();
