/**
 * jAnimatedSprite - https://github.com/martinkr/jAnimatedSprite
 *
 * jAnimatedSprite animates a css-sprite by moving it from left to right
 * (manipulating the background-position-x).
 * Similar to an animated gif - but without limitations.
 *
 * @Version: 1.2
 *
 * @param {Object} {
 *		iItemWidth: {Number},
 *		cssBackgroundPositionY:  {String},
 *		iFPS: {Number}
 *	};
 *
 * @example:
 *	<div class="animate-me" style="background: url('sprite.png') 0 0 no-repeat"></div>
 *  <script>jQuery.jAnimatedSprite($('.animate-me'))</script>
 *
 *
 * Copyright (c) 2011 Martin Krause (jquery.public.mkrause.info)
 * Dual licensed under the MIT and GPL licenses.
 *
 * @author Martin Krause public@mkrause.info
 * @copyright Martin Krause (jquery.public.mkrause.info)
 * @license MIT http://www.opensource.org/licenses/mit-license.php
 * @license GNU http://www.gnu.org/licenses/gpl-3.0.html
 *
 * @requires
 *  jQuery JavaScript Library - http://jquery.com/
 *    Copyright 2010, John Resig
 *    Dual licensed under the MIT or GPL Version 2 licenses - http://jquery.org/license
 */

// JSLint setting, @see http://www.jslint.com/lint.html#options
/*jslint devel: false, browser: true, continue: true, eqeq: true, vars: true, evil: true, white: true, forin: true, css: true, cap: true, nomen: true, plusplus: true, maxerr: 500, indent: 4 */

(function($) {

	// plugin definition
	$.fn.jAnimatedSprite = function(oOptions_) {
		// failsafe
		if (jQuery(window).data('jAnimatedSprite') ) {throw new Error('jAnimatedSprite: already initialized');}
		// merge plugin options
		var _oOpts = jQuery.extend({}, $.fn.jAnimatedSprite._oDefaults, oOptions_);
		var _iRnd = new Date().getTime();
		// iterate jQuery elements, apply jAnimatedSprite-plugin
		window.setInterval(function (){$.fn.jAnimatedSprite.step(); },Math.floor(1/_oOpts.iFPS*1000) );
		var _oData = {};
		return this.each(function(i_) {
			var _$this = jQuery(this);
			// force id
			if (!_$this.attr('id') ) {
				_$this.attr('id',['jAnimatedSprite_',_iRnd,'_',i_].join(''));
			}
			var _sId = _$this.attr('id');

			// store properties
			_oData = jQuery(window).data('jAnimatedSprite') || {};
			_oData[_sId] = {};
			_oData[_sId].options = _oOpts;
			_oData[_sId].step = 0;
			_oData[_sId].id = _sId;
			jQuery(window).data('jAnimatedSprite', _oData);
		});
	};

	// public functions

	/**
	* Animation Step
	* @param {Void}
	* @return {Void}
	*/
	$.fn.jAnimatedSprite.step = function () {
		// grab data
		var _oData = {};
		var _sId;
		_oData = jQuery(window).data('jAnimatedSprite');
		for (_sId in _oData) {
			_oData[_sId].step++;
			if (_oData[_sId].step >= _oData[_sId].options.iFPS) {_oData[_sId].step = 0;}
				jQuery(['#',_sId].join(''))
					.css({
						backgroundPosition: [-1* ( _oData[_sId].step*_oData[_sId].options.iItemWidth),'px ',_oData[_sId].options.cssBackgroundPositionY].join('')
					});
		}
		jQuery(window).data('jAnimatedSprite',_oData);
		return;
	};

	// plugin defaults
	$.fn.jAnimatedSprite._oDefaults = {
		iItemWidth: 70,
		cssBackgroundPositionY: '0px',
		iFPS: 12
	};

	$.fn.jAnimatedSprite.__version = 1.2; // class version
	$.fn.jAnimatedSprite.__class = 'jAnimatedSprite'; // class name

})(jQuery);




