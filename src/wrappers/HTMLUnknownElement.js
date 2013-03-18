// Copyright 2013 The Toolkitchen Authors. All rights reserved.
// Use of this source code is goverened by a BSD-style
// license that can be found in the LICENSE file.

(function(exports) {
  'use strict';

  function WrapperHTMLUnknownElement(node) {
    switch (node.tagName) {
      case 'CONTENT':
        return new WrapperHTMLContentElement(node);
      case 'SHADOW':
        return new WrapperHTMLShadowElement(node);
      case 'TEMPLATE':
        return new WrapperHTMLTemplateElement(node);
    }
    WrapperHTMLElement.call(this, node);
  }
  WrapperHTMLUnknownElement.prototype = Object.create(WrapperHTMLElement.prototype);
  wrappers.register(HTMLUnknownElement, WrapperHTMLUnknownElement);
  exports.WrapperHTMLUnknownElement = WrapperHTMLUnknownElement;
})(this);