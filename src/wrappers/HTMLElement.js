// Copyright 2013 The Toolkitchen Authors. All rights reserved.
// Use of this source code is goverened by a BSD-style
// license that can be found in the LICENSE file.

(function(exports) {
  'use strict';

  /////////////////////////////////////////////////////////////////////////////
  // innerHTML and outerHTML

  var escapeRegExp = /&|<|"/g;

  function escapeReplace(c) {
    switch (c) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '"':
        return '&quot;'
    }
  }

  function escape(s) {
    return s.replace(escapeRegExp, escapeReplace);
  }

  // http://www.whatwg.org/specs/web-apps/current-work/#void-elements
  var voidElements = {
    'area': true,
    'base': true,
    'br': true,
    'col': true,
    'command': true,
    'embed': true,
    'hr': true,
    'img': true,
    'input': true,
    'keygen': true,
    'link': true,
    'meta': true,
    'param': true,
    'source': true,
    'track': true,
    'wbr': true
  };

  function getOuterHTML(node) {
    switch (node.nodeType) {
      case Node.ELEMENT_NODE:
        var tagName = node.tagName.toLowerCase();
        var s = '<' + tagName;
        var attrs = node.attributes;
        for (var i = 0, attr; attr = attrs[i]; i++) {
          s += ' ' + attr.name + '="' + escape(attr.value) + '"';
        }
        s += '>';
        if (voidElements[tagName])
          return s;

        return s + getInnerHTML(node) + '</' + tagName + '>';

      case Node.TEXT_NODE:
        return escape(node.nodeValue);

      case Node.COMMENT_NODE:
        return '<!--' + escape(node.nodeValue) + '-->';
      default:
        console.error(node);
        throw new Error('not implemented');
    }
  }

  function getInnerHTML(node) {
    var s = '';
    for (var child = node.firstChild; child; child = child.nextSibling) {
      s += getOuterHTML(child);
    }
    return s;
  }

  function WrapperHTMLElement(node) {
    WrapperElement.call(this, node);
  }
  WrapperHTMLElement.prototype = Object.create(WrapperElement.prototype);
  mixin(WrapperHTMLElement.prototype, {
    get innerHTML() {
      // TODO(arv): This should fallback to this.node.innerHTML if there
      // are no shadow trees below or above the context node.
      return getInnerHTML(this);
    },
    set innerHTML(value) {
      if (!this.invalidateShadowRenderer()) {
        this.node.innerHTML = value;
      } else {
        this.textContent = '';
        var tempElement =
            unwrap(this.node.ownerDocument.createElement(this.tagName));
        tempElement.innerHTML = value;
        var firstChild;
        while (firstChild = tempElement.firstChild) {
          this.appendChild(wrap(firstChild));
        }
      }
    },
  
    get outerHTML() {
      // TODO(arv): This should fallback to HTMLElement_prototype.outerHTML if there
      // are no shadow trees below or above the context node.
      return getOuterHTML(this);
    },
    set outerHTML(value) {
      if (!this.invalidateShadowRenderer()) {
        this.node.outerHTML = value;
      } else {
        throw new Error('not implemented');
      }
    }
  });

  // HTMLElement is abstract so we use a subclass that has no members.
  wrappers.register(HTMLElement, WrapperHTMLElement,
                    document.createElement('span'));

  exports.WrapperHTMLElement = WrapperHTMLElement;

  // TODO: Find a better way to share these two with WrapperShadowRoot.
  exports.getInnerHTML = getInnerHTML;
})(this);