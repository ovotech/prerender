module.exports = function (grunt) {
    var pkg = grunt.file.readJSON('package.json');

    grunt.config.merge({
        pkg: pkg,
        compress: {
            main: {
                options: {
                    archive: 'archives/<%= pkg.version %>.zip'
                },
                files: [
                    { expand: true, src: ['lib/**'] },
                    { expand: true, src: ['index.js', 'LICENCE', 'package.json', 'server.js'] }
                ]
            }
        },
        aws_s3: {
            options: {
                region: 'eu-west-1',
                uploadConcurrency: 5,
                downloadConcurrency: 5
            },
            publish: {
                options: {
                    bucket: 'ovo-bower-repo',
                    differential: true
                },
                files: [
                    { expand: true, cwd: 'archives/', src: ['<%= pkg.version %>.zip'], dest: '<%= pkg.name %>/'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-aws-s3');
    grunt.loadNpmTasks('grunt-contrib-compress');
    
    grunt.registerTask('publish', ['compress', 'aws_s3:publish']);
};