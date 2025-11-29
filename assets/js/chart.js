"use strict";

window.chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
};

(function (global) {
  var MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var COLORS = [
    "#4dc9f6",
    "#f67019",
    "#f53794",
    "#537bc4",
    "#acc236",
    "#166a8f",
    "#00a950",
    "#58595b",
    "#8549ba",
  ];

  var Samples = global.Samples || (global.Samples = {});
  var Color = global.Color;

  Samples.utils = {
    // Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
    /**
     * Seeds the random number generator.
     * @param {number} seed - The seed value.
     */
    srand: function (seed) {
      this._seed = seed;
    },

    /**
     * Generates a pseudo-random number between min and max.
     * @param {number} [min=0] - The minimum value.
     * @param {number} [max=1] - The maximum value.
     * @returns {number} The random number.
     */
    rand: function (min, max) {
      var seed = this._seed;
      min = min === undefined ? 0 : min;
      max = max === undefined ? 1 : max;
      this._seed = (seed * 9301 + 49297) % 233280;
      return min + (this._seed / 233280) * (max - min);
    },

    /**
     * Generates an array of random numbers based on configuration.
     * @param {Object} config - Configuration object.
     * @param {number} [config.min=0] - Minimum value.
     * @param {number} [config.max=1] - Maximum value.
     * @param {Array<number>} [config.from=[]] - Array of base values.
     * @param {number} [config.count=8] - Number of values to generate.
     * @param {number} [config.decimals=8] - Number of decimals.
     * @param {number} [config.continuity=1] - Probability of continuity.
     * @returns {Array<number|null>} Array of generated numbers.
     */
    numbers: function (config) {
      var cfg = config || {};
      var min = cfg.min || 0;
      var max = cfg.max || 1;
      var from = cfg.from || [];
      var count = cfg.count || 8;
      var decimals = cfg.decimals || 8;
      var continuity = cfg.continuity || 1;
      var dfactor = Math.pow(10, decimals) || 0;
      var data = [];
      var i, value;

      for (i = 0; i < count; ++i) {
        value = (from[i] || 0) + this.rand(min, max);
        if (this.rand() <= continuity) {
          data.push(Math.round(dfactor * value) / dfactor);
        } else {
          data.push(null);
        }
      }

      return data;
    },

    /**
     * Generates an array of labels based on configuration.
     * @param {Object} config - Configuration object.
     * @param {number} [config.min=0] - Minimum value.
     * @param {number} [config.max=100] - Maximum value.
     * @param {number} [config.count=8] - Number of labels to generate.
     * @param {number} [config.decimals=8] - Number of decimals.
     * @param {string} [config.prefix=""] - Prefix for each label.
     * @returns {Array<string>} Array of generated labels.
     */
    labels: function (config) {
      var cfg = config || {};
      var min = cfg.min || 0;
      var max = cfg.max || 100;
      var count = cfg.count || 8;
      var step = (max - min) / count;
      var decimals = cfg.decimals || 8;
      var dfactor = Math.pow(10, decimals) || 0;
      var prefix = cfg.prefix || "";
      var values = [];
      var i;

      for (i = min; i < max; i += step) {
        values.push(prefix + Math.round(dfactor * i) / dfactor);
      }

      return values;
    },

    /**
     * Generates an array of month names.
     * @param {Object} config - Configuration object.
     * @param {number} [config.count=12] - Number of months to generate.
     * @param {number} [config.section] - Number of characters to include from month name.
     * @returns {Array<string>} Array of month names.
     */
    months: function (config) {
      var cfg = config || {};
      var count = cfg.count || 12;
      var section = cfg.section;
      var values = [];
      var i, value;

      for (i = 0; i < count; ++i) {
        value = MONTHS[Math.ceil(i) % 12];
        values.push(value.substring(0, section));
      }

      return values;
    },

    /**
     * Returns a color from the predefined palette based on index.
     * @param {number} index - Index of the color.
     * @returns {string} The color string.
     */
    color: function (index) {
      return COLORS[index % COLORS.length];
    },

    /**
     * Returns a transparent version of a color.
     * @param {string} color - The base color.
     * @param {number} [opacity=0.5] - The opacity value.
     * @returns {string} The rgba color string.
     */
    transparentize: function (color, opacity) {
      var alpha = opacity === undefined ? 0.5 : 1 - opacity;
      return Color(color).alpha(alpha).rgbString();
    },
  };

  // DEPRECATED
  /**
   * Generates a random scaling factor (DEPRECATED).
   * @deprecated
   * @returns {number} A random integer between -100 and 100.
   */
  window.randomScalingFactor = function () {
    return Math.round(Samples.utils.rand(-100, 100));
  };

  // INITIALIZATION

  Samples.utils.srand(Date.now());

  // Google Analytics
  /* eslint-disable */
  if (document.location.hostname.match(/^(www\.)?chartjs\.org$/)) {
    (function (i, s, o, g, r, a, m) {
      i["GoogleAnalyticsObject"] = r;
      (i[r] =
        i[r] ||
        function () {
          (i[r].q = i[r].q || []).push(arguments);
        }),
        (i[r].l = 1 * new Date());
      (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(
      window,
      document,
      "script",
      "//www.google-analytics.com/analytics.js",
      "ga"
    );
    ga("create", "UA-28909194-3", "auto");
    ga("send", "pageview");
  }
  /* eslint-enable */
})(this);
