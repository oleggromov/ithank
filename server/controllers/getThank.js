module.exports = function(req, res) {
	if (req.params.id % 2) {
		res.json({
			from: 'Карпыч',
			to: 'Громыч',
			'for': 'всё на свете'
		});
	} else {
		res.json({
			from: 'Громыч',
			to: 'Карпыч',
			'for': 'всё-всё на свете'
		});
	}
}