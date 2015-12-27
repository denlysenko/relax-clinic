module.exports = function(grunt) {
	grunt.initConfig({

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['js/scripts/scripts.js', 'js/scripts/fix.js', 'js/scripts/carousel.js'],
        dest: 'js/relax.js',
      },
    },

    uglify: {
      my_target: {
        files: {
          'js/relax.min.js': ['js/relax.js']
        }
      }
    },

  	less: {
      development: {
        options: {
          compress: true
        },
        files: {
          "css/relax.min.css": "less/relax.less" // destination file and source file
        }
      }
    },

    watch: {
      styles: {
        files: ['less/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }

	})
	
	grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['less', 'watch']);
}