'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('./constants'),
    units = _require.units,
    styles = _require.styles;

/**
 * @class Style
 * @description A class to represent a style as an object
 */


var Style = function () {
  function Style(symbols) {
    var _this = this;

    _classCallCheck(this, Style);

    /**
     * Filling up units.
     * the object looks like this (sort of):
     * this.thousand = 'k'
     * this.million = 'M'
     */
    units.forEach(function (unit, index) {
      _this[unit] = symbols[index] || styles.metric[index];
    });
  }

  /**
   * Returns a symbol by a group
   * @param {String} group - a group ('thousand', 'million', etc)
   * @returns {String}
   */


  _createClass(Style, [{
    key: 'getSymbol',
    value: function getSymbol(group) {
      return this[group];
    }
  }]);

  return Style;
}();

/**
 *
 */


var StyleCollection = function () {
  function StyleCollection() {
    _classCallCheck(this, StyleCollection);

    this.styles = {};
    this.default = null;

    // default setup
    this.add('metric', styles.metric);
    this.add('abbreviation', styles.abbreviation);
    this.setDefault('metric');
  }

  /**
   * adds a style to the collection by an array
   * @param {Array<String>} style - an array with four or more strings
   * @example
   * add('metric', ['k', 'M', 'G', 'T'])
   * add('abbreviation', ['K', 'M', 'B', 'T'])
   */


  _createClass(StyleCollection, [{
    key: 'add',
    value: function add(name) {
      var symbols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      this.styles[name] = new Style(symbols);
      return this;
    }

    /**
     * Returns a style by name
     * @param {String} name - the style name
     * @returns {Object} - the style
     */

  }, {
    key: 'get',
    value: function get(name) {
      return this.styles[name];
    }

    /**
     * Returns the symbol of a number by a style
     * @param {String} group - the number group - thousand, million, billion etc.
     * @param {String} style - a style name for formatting
     * @returns {String}
     */

  }, {
    key: 'getSymbol',
    value: function getSymbol(group) {
      var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.default;

      return this.get(style).getSymbol(group);
    }

    /**
     * Sets the default style name
     * @param {String} name - the style's name
     * @returns {Object} - return the collection object (chainable)
     */

  }, {
    key: 'setDefault',
    value: function setDefault(name) {
      this.default = name;
      return this;
    }

    /**
     * Returns the default style name
     */

  }, {
    key: 'getDefault',
    value: function getDefault() {
      return this.default;
    }
  }]);

  return StyleCollection;
}();

StyleCollection.Style = Style;

module.exports = StyleCollection;