/*
 * Copyright 2014 The Polymer Authors. All rights reserved.
 * Use of this source code is goverened by a BSD-style
 * license that can be found in the LICENSE file.
 */

suite('FormData', function() {

  var wrap = ShadowDOMPolyfill.wrap;
  var unwrap = ShadowDOMPolyfill.unwrap;

  test('instanceof', function() {
    var fd = new FormData();
    assert.instanceOf(fd, FormData);
  });

  test('form element', function() {
    var formElement = document.createElement('form');
    var fd = new FormData(formElement)
    assert.instanceOf(fd, FormData);
  });

  test('wrap/unwrap', function() {
    var fd = new FormData();
    var unwrapped = unwrap(fd);
    var wrapped = wrap(unwrapped);
    assert.equal(fd.impl, wrapped.impl);
  });

});
