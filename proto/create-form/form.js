function Input(el) {
	this.el = $(el);
	this.doc = $(document);
	
	this.edit = false;
	this.empty = true;

	this.el.on('click', $.proxy(this.startEditing, this));
}

Input.prototype.startEditing = function(e) {
	e.stopPropagation();

	if (this.edit) return;

	this.edit = true;

	if (this.empty) {
		this.el.text('');
	}

	this.el.addClass('input_edit');

	this.doc.on('click', $.proxy(this.stopEditing, this));
	this.doc.on('keypress', $.proxy(this.updateText, this));
	this.doc.on('keydown', $.proxy(this.controlInput, this));
};

Input.prototype.stopEditing = function(e) {
	if (e.target === this.el) return;
	
	this.edit = false;
	
	if (this.el.text().trim().length) {
		this.empty = false;
		this.el.addClass('input_full');
	} else {
		this.el.removeClass('input_full');
	}

	this.el.removeClass('input_edit');

	this.doc.off('click', $.proxy(this.stopEditing, this));
	this.doc.off('keypress', $.proxy(this.updateText, this));
	this.doc.off('keydown', $.proxy(this.controlInput, this));
};
	
Input.prototype.updateText = function(e) {
	this.el.text(this.el.text() + this.getChar(e.originalEvent));
};

Input.prototype.controlInput = function(e) {
	var Codes = this.KeyCodes;
	var text = this.el.text();
	var len = text.length;

	switch (e.keyCode) {
		case (Codes.Backspace):
			if (!len) break;
			this.el.text(text.substr(0, len-1));
			e.preventDefault();
		break;

		case (Codes.Enter):
			this.stopEditing(e);
			e.preventDefault();
		break;
	}

};

Input.prototype.KeyCodes = {
	Backspace: 8,
	Delete: 46,
	
	Enter: 13,
	Esc: 27,
	
	Left: 37,
	Right: 39
};

// кописиаста с javascript.ru
Input.prototype.getChar = function(e) {
	if (e.which == null) { // IE
	    if (e.keyCode < 32) return null; // спец. символ
	    return String.fromCharCode(e.keyCode)
	}

	if (e.which != 0 && e.charCode != 0) { // все кроме IE
	    if (e.which < 32) return null; // спец. символ
	    return String.fromCharCode(e.which); // остальные
	}

	return null; // спец. символ
};


// инициализируем всё
$('.input').each(function() {
	new Input(this);
});

