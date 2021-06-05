module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          'assets/js/main.min.js': [
            'assets/js/lunr/lunr.min.js',
            'assets/js/plugins/gumshoe.js',
            'assets/js/plugins/jquery.ba-throttle-debounce.js',
            'assets/js/plugins/jquery.fitvids.js',
            'assets/js/plugins/jquery.greedy-navigation.js',
            'assets/js/plugins/jquery.magnific-popup.js',
            'assets/js/plugins/smooth-scroll.js',
            'assets/js/vendor/jquery-3.4.1.js',
            'assets/js/_main.js',
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', 'uglify');
};