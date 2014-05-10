var ithank = {};

/**
 * Инициализация приложения
 */
ithank.init = function() {
	ithank.buttonLogin = document.querySelector('.js-init-vk');
	ithank.buttonPost = document.querySelectorAll('.js-friends-post');
	ithank.friends = document.querySelector('.js-friends');

	// при клике на кнопульку логинимся вконтакте
	document.addEventListener('click', function(e) {
		var target = e.target.className;

		if (target === 'js-init-vk') {
			ithank.login();
		}

		if (target === 'js-friends-post') {
			ithank.postToWall(e.target.onclick());
		}
	});

	// при клике на кнопульку «сказать спасибо»
	// запостим другу на стену
	//ithank.buttonPost.addEventListener('click', .bind(ithank.buttonPost));

	// загрузим АПИ
	ithank.loadOpenApi();
};

/**
 * Инициализируем АПИ, когда
 * библиотека загрузилась
 */
ithank.onApiLoaded = function() {
	VK.init({
		apiId: 4353978
	});
};

/**
 * Логинимся вконтакте
 */
ithank.login = function() {
	VK.Auth.login(function(response) {
		ithank.user = response.session.user;
		ithank.getFriends(ithank.renderFriends);
	});
};

/**
 * Получим список друзей
 */
ithank.getFriends = function(onDone) {
	VK.Api.call('friends.get', {
		'user_id': ithank.user.id,
		fields: 'nickname, domain, sex, bdate, city, country',
		count: 5
	}, function(data) {
		// отрендерим список
		ithank.renderFriends(data.response);
	});
};

/**
 * Загрузим библиотеку асинхронно
 */
ithank.loadOpenApi = function() {
	var el = document.createElement("script");
	el.type = "text/javascript";
	el.src = "//vk.com/js/api/openapi.js";
	el.async = true;

	el.onload = ithank.onApiLoaded;

	document.body.appendChild(el);
};

/**
 * Нарисуем список друзей
 * по полученным данным
 */
ithank.renderFriends = function(friends) {
	var html = '<ul>';
	friends.forEach(function(person) {
		html += [
			'<li>',
			'<p>' + person.first_name + ' ' + person.last_name,
			'<p><button class="js-friends-post"',
			'onclick="return {',
			'id: ' + person.user_id + ', ',
			'mention: \'@' + person.domain + '(' + person.first_name + ' ' + person.last_name + ')\'',
			'};">Сказать спасибо дружбану</button>',
			'</p></li>'
		].join('');
	});
	html += '</ul>';
	ithank.friends.innerHTML = html;
};

/**
 * Запостим на стену другу
 */
ithank.postToFriendWall = function(params) {
	VK.Api.call('wall.post', {
		'owner_id': params.id,
		message: params.mention + ', спасибо! Ты настоящий друг!'
	});
};

ithank.init();