(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ItemModel = require('client/models/item.js');
var ListCollection = require('client/models/list.js');

var ItemView = require('client/views/item.js');
var ListView = require('client/views/list.js');
var AppView = require('client/views/layout.js');

var IthankRouter = Backbone.Router.extend({
	routes: {
		"": "showList",
		":id": "showThank"
	},

	showList: function() {
		this.list = new ListCollection();
		this.listView = new ListView({ model: this.list });

		this.list.on('change', this.listView.render, this.listView);
		this.list.on('add', this.listView.render, this.listView);
		this.list.on('reset', this.listView.render, this.listView);

		this.list.fetch();	
	},

	showThank: function(id) {
		var thank = this.list.findWhere({ id: Number(id) });

		if (thank) {
			var thankView = new ItemView({ model: thank, el: $('.thank')[0] });
			thankView.render();
		} else {
			console.log('nothing found');
		}
	}
});

var router = new IthankRouter();
Backbone.history.start({ pushState: true });

var app = new AppView(router);
},{"client/models/item.js":2,"client/models/list.js":3,"client/views/item.js":5,"client/views/layout.js":6,"client/views/list.js":7}],2:[function(require,module,exports){
module.exports = Backbone.Model.extend();
},{}],3:[function(require,module,exports){
module.exports = Backbone.Collection.extend({
	url: '/',
	model: require('client/models/item.js')
});

},{"client/models/item.js":2}],4:[function(require,module,exports){
var jade = require("jade/runtime");
function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (item) {
buf.push("<article class=\"thank\"><span>Спасибо, </span><span class=\"thank__name\">" + (jade.escape((jade_interp = item.to) == null ? '' : jade_interp)) + ", </span><br/><span>за </span><span class=\"thank__for\">" + (jade.escape((jade_interp = item.reason) == null ? '' : jade_interp)) + "</span><br/><br/><strong>" + (jade.escape((jade_interp = item.from) == null ? '' : jade_interp)) + "</strong></article>");}("item" in locals_for_with?locals_for_with.item:typeof item!=="undefined"?item:undefined));;return buf.join("");
};
module.exports = template;
},{"jade/runtime":8}],5:[function(require,module,exports){
module.exports = Backbone.View.extend({
	tagName: 'article',
	className: 'thank',

	// такая же структура, как и в templates/, только *.js и внутри client/
	template: require('client/templates/thank/thank.js'),

	render: function() {
		var html = this.template({
			item: {
				to: this.model.get('to'),
				from: this.model.get('from'),
				reason: this.model.get('reason')
			}
		});

		this.$el.replaceWith(html);

		return this;
	}
});
},{"client/templates/thank/thank.js":4}],6:[function(require,module,exports){
module.exports = Backbone.View.extend({
	el: $('.layout'),

	events: {
		'click .layout__arrow': 'changeItem'
	},

	constructor: function(router) {
		// Вызываем дефолтный конструктор
		Backbone.View.apply(this);

		this.router = router;
	},

	changeItem: function(e) {
		e.preventDefault();

		this.router.navigate($(e.target).attr('href'), { trigger: true });
	}
});
},{}],7:[function(require,module,exports){
module.exports = Backbone.View.extend({
	tagName: 'ul',
	className: 'list'
});
},{}],8:[function(require,module,exports){
(function (global){
!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.jade=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = merge(attrs, a[i]);
    }
    return attrs;
  }
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    a['class'] = ac.concat(bc).filter(nulls);
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {*} val
 * @return {Boolean}
 * @api private
 */

function nulls(val) {
  return val != null && val !== '';
}

/**
 * join array as classes.
 *
 * @param {*} val
 * @return {String}
 */
exports.joinClasses = joinClasses;
function joinClasses(val) {
  return Array.isArray(val) ? val.map(joinClasses).filter(nulls).join(' ') : val;
}

/**
 * Render the given classes.
 *
 * @param {Array} classes
 * @param {Array.<Boolean>} escaped
 * @return {String}
 */
exports.cls = function cls(classes, escaped) {
  var buf = [];
  for (var i = 0; i < classes.length; i++) {
    if (escaped && escaped[i]) {
      buf.push(exports.escape(joinClasses([classes[i]])));
    } else {
      buf.push(joinClasses(classes[i]));
    }
  }
  var text = joinClasses(buf);
  if (text.length) {
    return ' class="' + text + '"';
  } else {
    return '';
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = function attr(key, val, escaped, terse) {
  if ('boolean' == typeof val || null == val) {
    if (val) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    } else {
      return '';
    }
  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
  } else if (escaped) {
    return ' ' + key + '="' + exports.escape(val) + '"';
  } else {
    return ' ' + key + '="' + val + '"';
  }
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 */
exports.attrs = function attrs(obj, terse){
  var buf = [];

  var keys = Object.keys(obj);

  if (keys.length) {
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('class' == key) {
        if (val = joinClasses(val)) {
          buf.push(' ' + key + '="' + val + '"');
        }
      } else {
        buf.push(exports.attr(key, val, false, terse));
      }
    }
  }

  return buf.join('');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  var result = String(html)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  if (result === '' + html) return html;
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str =  str || _dereq_('fs').readFileSync(filename, 'utf8')
  } catch (ex) {
    rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

},{"fs":2}],2:[function(_dereq_,module,exports){

},{}]},{},[1])
(1)
});
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])