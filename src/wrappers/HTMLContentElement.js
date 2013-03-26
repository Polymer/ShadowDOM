// Copyright 2013 The Toolkitchen Authors. All rights reserved.
// Use of this source code is goverened by a BSD-style
// license that can be found in the LICENSE file.

(function(scope) {
  'use strict';

  var WrapperHTMLElement = scope.WrapperHTMLElement;
  var mixin = scope.mixin;
  var wrappers = scope.wrappers;

  function WrapperHTMLContentElement(node) {
    WrapperHTMLElement.call(this, node);
  }
  WrapperHTMLContentElement.prototype = Object.create(WrapperHTMLElement.prototype);
  mixin(WrapperHTMLContentElement.prototype, {
    get select() {
      return this.getAttribute('select');
    },
    set select(value) {
      this.setAttribute('select', value);
      this.invalidateShadowRenderer();
    },

    // getDistributedNodes is added in ShadowRenderer

    // TODO: attribute boolean resetStyleInheritance;
  });

  if (typeof HTMLContentElement !== 'undefined')
    wrappers.register(HTMLContentElement, WrapperHTMLContentElement);

  scope.WrapperHTMLContentElement = WrapperHTMLContentElement;
})(this.ShadowDOMPolyfill);