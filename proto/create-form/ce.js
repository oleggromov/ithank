$('.input').on('focus', selectAll);
$('.input').on('blur', blur);
$('.input').on('keydown', processKeycode);
$('.input').on('keyup', removeFormat);
$('.input').on('keyup', resizeToFit);

function selectAll(e) {
	if ($(this).text().trim() !== $(this).attr('placeholder')) return;
	
	var range = document.createRange();
	range.selectNodeContents(this);
	
	var sel = window.getSelection();
	sel.removeAllRanges();
	sel.addRange(range);
}

function blur() {
	var text = $(this).text().trim();
	var def = $(this).attr('placeholder');

	if (!text.length) {
		$(this).text(def);
		text = def;
	}

	if (text !== def) {
		$(this).addClass('input_full');
	} else {
		$(this).removeClass('input_full');
	}
}

function processKeycode(e) {
	var key = e.keyCode | e.which;

	switch (key) {
		case 13:
			e.preventDefault();
		case 27:
			$(this).blur();
	}
}

function removeFormat() {
	var tag = /\<.*\>/g;

	if ($(this).html().match(tag) || $(this).text().match(tag)) {
		$(this).html($(this).text());
	}
}

function resizeToFit() {
	var container = $(this).parents('.container');
	var max = parseInt(container.css('max-height'), 10);
	var fz = parseInt($('.thank').css('font-size'), 10);

	while (container.height() > max && fz-- > 30) {
		$('.thank').css('font-size', fz);
	}
}
