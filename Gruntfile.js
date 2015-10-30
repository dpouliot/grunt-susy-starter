module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Sass to CSS
    sass: {
      app: {
        files: [{
          expand: true,
          cwd: 'assets/css',
          src: ['**/*.scss'],
          dest: 'dist/css',
          ext: '.css'
        }]
      },
      options: {
        sourceMap: true,
        outputStyle: 'nested',
        imagePath: "../",
      }
    },

    watch: {
      sass: {
        files: ['scss/{,*/}*.{scss,sass}'],
        tasks: ['sass']
      },
      options: {
        livereload: true,
        spawn: false
      }
    },

    sprite:{
      all: {
        src: 'assets/img/sprite/**/*x/*.png',
        dest: 'dist/img/spritesheet.png',
        destCss: 'dist/css/sprites.css',
        retinaSrcFilter: ['2x/*.png'],
        retinaDest: 'dist/img/spritesheet.retina@2x.png',
      }
    }




  });

  // Loads Grunt Tasks
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-spritesmith');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'watch']);
};
