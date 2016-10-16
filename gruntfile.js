module.exports = function(grunt) {

	//configure task(s)
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			build: {
				src: 'src/js/*.js',
				dest: 'js/script.min.js'
			},
			dev: {
				options: {
					beutify: false,
					mangle: false,
					compress: false,
					preserveComments: true
				},
				src: 'src/js/*.js',
				dest: 'public/js/script.js'
			}

		},

		browserify: {

  main: {
    options: {
      browserifyOptions: {
        debug: true
      }
    },
    src: 'public/js/script.js',
    dest: 'public/js/main.js'
  }

		},

		sass: {
			dev: {

				files : [
					{
						src : ['**/*.scss', '!**/_*.scss'],
						cwd : 'src/scss',
						dest : 'public/css',
						ext : '.css',
						expand : true
					}
				],

				options:{
					outputStyle: 'expanded'

				}

			},
			build: {
				options: {
					outputStyle: 'compressed'
				},
				files: {

					'css/style.css' : 'src/scss/application.scss'

				}
			}
		},

		watch: {
			js: {
				files: ['src/**/*.js'],
				tasks: ['uglify:dev','browserify'],
				livereload : true
			},
			css: {
				files: ['src/**/*.scss'],
				tasks: ['sass:dev'],
				livereload : true
			},
			php: {

				files : ['**/*.php'],
				options : {
					livereload : true
				}

			}
		}

	});

	//load the plugins
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');


	//Register tastks

	grunt.registerTask('default', ['uglify:dev','sass:dev', 'browserify']);
	grunt.registerTask('build', ['uglify:build', 'sass:build']);


};