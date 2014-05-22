$('.input').on('focus', focus);
$('.input').on('blur', blur);
$('.input').on('keydown', processKeycode);

function focus(e) {
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
	}

	if (text !== def) {
		$(this).addClass('input_full');
	} else {
		$(this).removeClass('input_full');
	}
}

function processKeycode(e) {
	var key = e.keyCode | e.which;

	if (key == 13) {
		$(this).blur();
		e.preventDefault();
	}

	if (key == 27) {
		$(this).text($(this).attr('placeholder'));
	}
}