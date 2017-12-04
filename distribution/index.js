'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StyleCollection = require('./styles');

var _require = require('./utils'),
    getDivider = _require.getDivider,
    getNumberGroup = _require.getNumberGroup,
    toFixed = _require.toFixed;

/**
 * Global style collection object
 */


var styles = new StyleCollection();

/**
 * Adds a style
 * @param {Array<String>} style - an array with four or more strings
 * @example
 * addStyle('metric', ['k', 'M', 'G', 'T'])
 * addStyle('abbreviation', ['K', 'M', 'B', 'T'])
 */
var addStyle = function addStyle(name) {
  var symbols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  styles.add(name, symbols);
};

var getStyle = function getStyle(name) {
  return styles.get(name);
};

/**
 * Formats a number
 * @param {Number} number - a number
 * @param {Object} options - options object
 * @param {String} options.measurement - a fixed number group (like formatting a million with a thousands format)
 * @param {Number} options.precision - a precision after the dot (the difference between 2K and 2.56K)
 * @param {Object} options.collection - a style collection to use instead of the global one
 * @param {String} options.style - a specific style to use
 * @returns {String} - the formatted number
 */
var _format = function _format(number) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var formatted = number / getDivider(options.measurement ? options.measurement : number);
  var fixed = toFixed(formatted, options.precision || 0);
  var collection = options.collection instanceof StyleCollection ? options.collection : styles;
  var symbol = options.measurement ? collection.getSymbol(options.measurement) : collection.getSymbol(getNumberGroup(number), options.style);
  return fixed + symbol;
};

var NumberSuffix = function () {
  /**
   * @constructor
   */
  function NumberSuffix() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, NumberSuffix);

    this.stylesCollection = new StyleCollection();
    this.setOptions(options);
  }

  /**
   * Formats a number by the definitions
   * @param {Number} number - a number
   * @param {Object} options - extra options if needed
   * @returns {String}
   */


  _createClass(NumberSuffix, [{
    key: 'format',
    value: function format(number) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var settings = Object.assign({}, {
        style: this.stylesCollection.getDefault(),
        precision: this.precision,
        measurement: this.measurement,
        collection: this.stylesCollection
      }, options);
      return _format(number, settings);
    }

    /**
     * Adds a style to the collection by an array
     * @param {Array<String>} style - an array with four or more strings
     * @example
     * addStyle('metric', ['k', 'M', 'G', 'T'])
     * addStyle('abbreviation', ['K', 'M', 'B', 'T'])
     */

  }, {
    key: 'addStyle',
    value: function addStyle() {
      var _stylesCollection;

      (_stylesCollection = this.stylesCollection).add.apply(_stylesCollection, arguments);
      return this;
    }
  }, {
    key: 'setDefaultStyle',
    value: function setDefaultStyle(name) {
      this.stylesCollection.setDefault(name);
      return this;
    }
  }, {
    key: 'setOptions',
    value: function setOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.precision = options.precision || this.precision || 0;
      this.measurement = options.measurement || this.measurement || null;
      options.style && this.stylesCollection.setDefault(options.style);
    }
  }]);

  return NumberSuffix;
}();

NumberSuffix.addStyle = addStyle;
NumberSuffix.getStyle = getStyle;
NumberSuffix.getDivider = getDivider;
NumberSuffix.format = _format;
NumberSuffix.styles = styles;
NumberSuffix.toFixed = toFixed;
NumberSuffix.format = _format;

module.exports = NumberSuffix;