/*
 * Copyright 2013 The Polymer Authors. All rights reserved.
 * Use of this source code is goverened by a BSD-style
 * license that can be found in the LICENSE file.
 */

suite('HTMLCanvasElement', function() {

  var iconUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHklEQVQ4T2Nk+A+EFADGUQMYRsOAYTQMgHloGKQDAJXkH/HZpKBrAAAAAElFTkSuQmCC';

  test('getContext null', function() {
    var canvas = document.createElement('canvas');
    // IE10 returns undefined instead of null
    assert.isTrue(canvas.getContext('unknown') == null);
  });

  test('getContext 2d', function() {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    assert.instanceOf(context, CanvasRenderingContext2D);
    assert.equal(context.canvas, canvas);
  });

  test('getContext webgl', function() {
    // IE10 does not have WebGL.
    if (typeof WebGLRenderingContext === 'undefined')
      return;

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('webgl');
    // Chrome returns null if the graphics drivers are not good enough.
    assert.isTrue(context === null || context instanceof WebGLRenderingContext);

    if (context != null)
      assert.equal(context.canvas, canvas);
  });

  test('2d drawImage', function(done) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    var img = document.createElement('img');
    img.onload = function() {
      context.drawImage(img, 0, 0);
      done();
    };
    img.src = iconUrl;
  });

  test('2d createPattern', function(done) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var img = document.createElement('img');
    img.onload = function() {
      var pattern = context.createPattern(img, 'repeat');
      done();
    };
    img.src = iconUrl;
  });

  test('WebGL texImage2D', function(done) {
    var canvas = document.createElement('canvas');
    var gl = canvas.getContext('webgl');
    // IE10 does not have WebGL.
    // Chrome returns null if the graphics card is not supported
    if (!gl) {
      done();
      return;
    }

    var img = document.createElement('img');
    img.onload = function() {
      var texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      done();
    };
    img.src = iconUrl;
  });

  test('WebGL texSubImage2D', function(done) {
    var canvas = document.createElement('canvas');
    var gl = canvas.getContext('webgl');
    // IE10 does not have WebGL.
    // Chrome returns null if the graphics card is not supported
    if (!gl) {
      done();
      return;
    }

    var img = document.createElement('img');
    img.onload = function() {
      var texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, img);
      done();
    };
    img.src = iconUrl;
  });

});
