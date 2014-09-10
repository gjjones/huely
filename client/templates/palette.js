/* Callbacks */
Template.palette.created = function () {
	Session.setDefault("swatchStyle", "circle");
	Session.setDefault("swatchLabel", "default");
	Session.set("resultView", "palette");
};

Template.palette.rendered = function () {
	renderPalette();
};

/* Helpers */
Template.palette.helpers({
	swatches: function() {
		console.log(this._id);
		console.log(Palettes.findOne({_id: this._id}).swatches);

		// Define reactive variable
		var swatches = Palettes.findOne({_id: this._id}).swatches;
		renderPalette();
		return swatches;
	},
	swatchCount: function() {
		// return Palettes.find(this._id).swatches.length;
		return this.swatches.length;
	},

	/* General Utility helpers */
	pluralize: function(count, singular, plural) {
		if (count == 1) {
			return singular;
		} else {
			return	plural;
		}
	},

	codeText: function() {
		return this.text;
	},

	/* Toolbar Toggles */
	paletteViewActive: function() {
		return (Session.get("resultView") == "code" ? "" : "active");
	},
	codeViewActive: function() {
		return (Session.get("resultView") == "code" ? "active" : "");
	},
	squareSwatchActive: function() {
		return (Session.get("swatchStyle") == "square" ? "active" : "")
	},
	circleSwatchActive: function() {
		return (Session.get("swatchStyle") == "square" ? "" : "active")
	},
	varLabelActive: function() {
		return (Session.get("swatchLabel") == "colorVal" ? "" : "active")
	},
	colorValLabelActive: function() {
		return (Session.get("swatchLabel") == "colorVal" ? "active" : "")
	},

	paletteView: function() {
		return (Session.get("resultView") == "code" ? false : true);
	},

	/* Swatch template helpers */
	// The name or the value of the swatch.
	swatchLabel: function() {
		if (Session.get("swatchLabel") == "colorVal") {
			return this.colorVal;
		// } else if (Session.get("swatchLabel") == "varName") {
		// 	return this.varName || "undefined";
		} else {
			return this.varName || this.colorVal;
		}
	},
	// Circle or Square style swatch color
	swatchStyle: function() {
		if (Session.get("swatchStyle") == "square") {
			return	"swatch-item__swatch--square";
		} else {
			return	"swatch-item__swatch--circle";
		}
	}
});

/* Events */
Template.palette.events({
	// Click animation functionality
	'click .gridly .swatch-item__swatch': function(event) {
		event.preventDefault();
		event.stopPropagation();
		var $this, height, width;
		$this = $(event.currentTarget).parent();
		$this.toggleClass('small');
		$this.toggleClass('large');
		if ($this.hasClass('small')) {
			width = 140;
			height = 160;
		}
		if ($this.hasClass('large')) {
			width = 300;
			height = 340;
		}
		$this.data('width', width);
		$this.data('height', height);
		return $('.gridly').gridly('layout');
	},
	// Remove a swatch
	'click .gridly .delete': function(event) {
		var $this;
		event.preventDefault();
		event.stopPropagation();
		$this = $(event.currentTarget);
		$this.closest('.swatch').remove();
		return $('.gridly').gridly('layout');
	},
	// Select the label input when clicked
	'click .gridly .swatch-item__label': function(event) {
		$this = $(event.currentTarget);
		$this.select()
	},
	/* Toolbar Toggles */
	'click .toolbar .toggle-circle': function(event) {
		Session.set("swatchStyle", "circle");
	},
	'click .toolbar .toggle-square': function(event) {
		Session.set("swatchStyle", "square");
	},
	'click .toolbar .toggle-varName': function(event) {
		Session.set("swatchLabel", "varName");
	},
	'click .toolbar .toggle-colorVal': function(event) {
		Session.set("swatchLabel", "colorVal");
	},
	'click .toolbar .toggle-paletteView': function(event) {
		Session.set("resultView", "palette");
	},
	'click .toolbar .toggle-codeView': function(event) {
		Session.set("resultView", "code");
	},

	'click #re-extract': function(event) {
		event.preventDefault();
		var self = this;
		var code = $("textarea.extract-code").val();
		// Extract swatches and update current palette
		extractSwatches(code, this._id);
		console.log(this._id);
		Session.set("text", code);
		
		// Router.go('palette');
		Session.set("resultView", "palette");
		$('.gridly').gridly({
		      base: 60, // px 
		      gutter: 20, // px
		      columns: 10,
		      draggable: {
		        zIndex: 800,
		        selector: '> *'
		      }
		  });
		$('.palette .swatch-item').each(function(index, el) {
			setTimeout(function() {
				$(el).addClass('fade-in');
			}, Math.floor(index/5)*100);
		});
		return false;
	}




	//, 'click .add': function(event) {
	// 	event.preventDefault();
	// 	event.stopPropagation();
	// 	$('.gridly').append(swatch);
	// 	return $('.gridly').gridly();
	// }
})


		// $('.gridly').gridly({
	 //      base: 60, // px 
	 //      gutter: 20, // px
	 //      columns: 12
	 //  });

	    // Generated by CoffeeScript 1.6.3
// 	    (function() {
// 	    	$(function() {
// 	    		var swatch;
// 	    		swatch = "<div class='swatch small'><div class='delete'>&times;</div></div>";
// 	    		// $(document).on("click", ".add", function(event) {
// 	    		// 	event.preventDefault();
// 	    		// 	event.stopPropagation();
// 	    		// 	$('.gridly').append(swatch);
// 	    		// 	return $('.gridly').gridly();
// 	    		// });
// 	    		// return $('.gridly').gridly();
// 	    	});

// }).call(this);
