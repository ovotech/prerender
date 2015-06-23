module.exports = function (grunt) {
    var pkg = grunt.file.readJSON('package.json');

    grunt.config.merge({
        pkg: pkg,
        version: '<%=pkg.version%>-' + process.env.BUILD_NUMBER,
        compress: {
            main: {
                options: {
                    archive: 'archives/<%= version %>.zip'
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
                    differential: true,
                    overwrite: false
                },
                files: [
                    { expand: true, cwd: 'archives/', src: ['<%= version %>.zip'], dest: '<%= pkg.name %>/'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-aws-s3');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('publish', ['compress', 'aws_s3:publish']);
};