module.exports = {
    /**
     * Конструктор для кастомных объектов ошибок,
     * с помощью которых удобно контролировать выдачу
     *
     * @example
     *  // где-то в обработчике реджекта промиса
     *  return new ServerError({
     *      code: 404,
     *      message: 'Not Found'
     *  })
     *
     *  // где-то в обработчике then промиса
     *  if (result instanceof ServerError) {
     *    ...
     *  }
     */
    ServerError: function (info) {
        var message = '';

        if (info.code === 404) {
            message = 'Not found';
        }
        if (info.message === 500) {
            message = 'Mongo failed';
        }

        this.code = info.code;
        this.message = info.message || message;
    }
};