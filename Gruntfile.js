module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %>\n<%= pkg.description %>\n\n<%= pkg.author %>\n<%= grunt.template.today("yyyy-mm-dd") %> */\n',
                sourceMap: true
            },
            build: {
                src: 'src/DateFiddler.js',
                dest: 'dist/DateFiddler.min.js'
            }
        },
        jasmine: {
            pivotal: {
                src: 'src/DateFiddler.js',
                options: {
                    specs: 'src/test/DateFiddler_spec.js',
                    helpers: 'spec/*Helper.js'
                }
            }
        }
    });

    grunt.task.registerTask('copy', 'Copy the full src file to the dist folder', function() {
        grunt.file.copy('src/DateFiddler.js', 'dist/DateFiddler.js');
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // Default task(s).
    grunt.registerTask('default', ['jasmine', 'copy']);

    grunt.registerTask('dist', ['jasmine', 'copy', 'uglify']);
    grunt.registerTask('test', ['jasmine']);
};