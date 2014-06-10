(function() {
  'use strict';
  define(function(require) {
    var App, DAT, Visualizer, World, settings;
    Visualizer = require('visualizer/visualizer');
    DAT = require('dat');
    World = require('model/world');
    settings = require('settings');
    return App = (function() {
      function App() {}

      App.prototype.init = function() {
        this.world = new World;
        this.world.load();
        this.visualizer = new Visualizer(this.world);
        this.visualizer.start();
        this.gui = new DAT.GUI;
        this.gui.add(this.world, 'save');
        this.gui.add(this.world, 'load');
        this.gui.add(this.world, 'clear');
        this.gui.add(this.visualizer, 'running').listen();
        this.gui.add(this.visualizer.zoomer, 'scale', 0.1, 2).listen();
        this.gui.add(this.visualizer, 'timeFactor', 0.1, 10).listen();
        this.gui.add(this.world, 'carsNumber').min(0).max(200).step(1).listen();
        this.gui.add(this.world, 'instantSpeed').step(0.00001).listen();
        return this.gui.add(settings, 'lightsFlipInterval', 0, 10, 0.01).listen();
      };

      return App;

    })();
  });

}).call(this);
