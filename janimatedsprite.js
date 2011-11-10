/**
 * @projectDescription
 * 
 *jAnimatedSprite animates a css-sprite by moving it from left to right 
 * (manipulating the background-position-x). 
 * Similar to an animated gif - but without limitations. 
 *
 * Copyright (c) 2011 Martin Krause (jquery.public.mkrause.info)
 * Dual licensed under the MIT and GPL licenses.
 *
 * @author Martin Krause public@mkrause.info
 * @copyright Martin Krause (jquery.public.mkrause.info)
 * @license MIT http://www.opensource.org/licenses/mit-license.php
 * @license GNU http://www.gnu.org/licenses/gpl-3.0.html
 * 
 */
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
	* Animation
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

	$.fn.jAnimatedSprite.__version = 1.1; // class version
	$.fn.jAnimatedSprite.__class = 'jAnimatedSprite'; // class name

})(jQuery);


 

