module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.initConfig({
    concat: {
      index_js: {
        src: ['src/js/**/*.js'],
        dest: 'built/js/index.js'
      },
      vendor_js: {
        src: ['bower_components/jquery/dist/jquery.js',
              'bower_components/underscore/underscore.js',
              'bower_components/animo.js/animo.js',
              'bower_components/bootstrap/dist/js/bootstrap.js',
              'bower_components/seiyria-bootstrap-slider/js/bootstrap-slider.js'],
        dest: 'built/js/vendor.js'
      },
      vendor_css: {
        src: ['bower_components/animo.js/animate+animo.css',
              'bower_components/bootstrap/dist/css/bootstrap.css',
              'bower_components/seiyria-bootstrap-slider/css/bootstrap-slider.css'],
        dest: 'built/css/vendor.css'
      }
    },
    less: {
      production: {
        options: {
          paths: ["less"],
          cleancss: true,
        },
        files: {
          "built/css/index.css": "src/less/index.less"
        }
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'static',
          src: ['**'],
          dest: 'built/'
        }]
      },
      html: {
        files: [{
          expand: true,
          cwd: 'src/html',
          src: ['**'],
          dest: 'built/'
        }]
      }
    },
    watch: {
      concat: {
        files: ['src/js/**/*.js'],
        tasks: ['concat']
      },
      less: {
        files: ['src/less/**/*.less'],
        tasks: ['less']
      },
      copy: {
        files: ['src/static/**',
                'src/html/**/*.html'],
        tasks: ['copy']
      }
    },
    connect: {
      server: {
        options: {
          port: 8080,
          base: 'built',
          options: {
            index: 'index.html'
          }
        }
      },
      keepalive: true
    }
  });

  grunt.registerTask('default', ['less', 'concat', 'copy']);
  grunt.registerTask('serve', ['connect:server', 'watch']);
};
