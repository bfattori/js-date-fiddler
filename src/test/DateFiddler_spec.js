describe('DateFiddler', function() {

    var DATE = new Date();
    var DATE_TOMORROW = new Date(DATE);
    var DATE_YESTERDAY = new Date(DATE);

    DATE_TOMORROW = new Date(DATE_TOMORROW.setDate(DATE_TOMORROW.getDate() + 1));
    DATE_YESTERDAY = new Date(DATE_YESTERDAY.setDate(DATE_YESTERDAY.getDate() - 1));


    var dateFiddler = new DateFiddler(DATE);

    it('date() should return the DateFiddler with the internal date set to the initial date', function() {
        expect(dateFiddler.init.accumulator).toEqual(DATE);
    });

    it('get() should return the Date object which the fiddler is currently at', function() {
        expect(dateFiddler.get()).toEqual(DATE);
    });

    it('set should change the operation to "="', function() {
        expect(dateFiddler.set.operation).toBe("=");
    });

    it('date() should set the date if it is specified', function() {
        expect(dateFiddler.set.date(DATE_TOMORROW).accumulator).toEqual(DATE_TOMORROW);
    });

    it('add should change the operation to +', function() {
        expect(dateFiddler.add.operation).toBe("+");
    });

    it('subtract should change the operation to -', function() {
        expect(dateFiddler.subtract.operation).toBe("-");
    });

    it('doIt() should run the function and modify the accumulator', function() {
        var self, dt;
        function doNothing(date) {
            self = this;
            dt = date;
            return dt;
        }

        dateFiddler.set.date(DATE);
        dateFiddler.doIt(doNothing);
        expect(self).toBe(dateFiddler);
        expect(dt).toEqual(DATE);
    });

    it('op() should perform an operation on a date based on the operation, setter, and getter methods', function() {
        var dt = new Date(DATE);

        dateFiddler.init.add;
        var oppedDate = new Date(dateFiddler.op(dt, dt.setDate, dt.getDate, 1));
        expect(oppedDate).toEqual(DATE_TOMORROW);
    });

    it('add().days(1) should add a day to the date', function() {
        var tomorrow = dateFiddler.init.add.days(1).get();
        expect(tomorrow).toEqual(DATE_TOMORROW);
    });

    it('subtract().days(1) should subtract a day from the date', function() {
        var tomorrow = dateFiddler.init.subtract.days(1).get();
        expect(tomorrow).toEqual(DATE_YESTERDAY);
    });

    it('chaining operations', function() {
    });

    it('should set the date to 6/1/1954', function() {
        var dt = dateFiddler.init.set.date(new Date("6/1/1954")).get();
        expect(dt.getMonth()).toBe(5);
        expect(dt.getDate()).toBe(1);
        expect(dt.getFullYear()).toBe(1954);
    });

    it('should set the day to Sunday', function() {
        var dt = dateFiddler.init.sunday.get();
        expect(dt.getDay()).toBe(0);
    });

    it('should set the day to Monday', function() {
        var dt = dateFiddler.init.monday.get();
        expect(dt.getDay()).toBe(1);
    });

    it('should set the day to Tuesday', function() {
        var dt = dateFiddler.init.tuesday.get();
        expect(dt.getDay()).toBe(2);
    });

    it('should set the day to Wednesday', function() {
        var dt = dateFiddler.init.wednesday.get();
        expect(dt.getDay()).toBe(3);
    });

    it('should set the day to Thursday', function() {
        var dt = dateFiddler.init.thursday.get();
        expect(dt.getDay()).toBe(4);
    });

    it('should set the day to Friday', function() {
        var dt = dateFiddler.init.friday.get();
        expect(dt.getDay()).toBe(5);
    });

    it('should set the day to Saturday', function() {
        var dt = dateFiddler.init.saturday.get();
        expect(dt.getDay()).toBe(6);
    });

    it('should set the time to midnight', function() {
        var dt = dateFiddler.init.midnight.get();
        expect(dt.getHours()).toBe(0);
        expect(dt.getMinutes()).toBe(0);
        expect(dt.getSeconds()).toBe(0);
        expect(dt.getMilliseconds()).toBe(0);
    });

    it('should set the time to noon', function() {
        var dt = dateFiddler.init.noon.get();
        expect(dt.getHours()).toBe(12);
        expect(dt.getMinutes()).toBe(0);
        expect(dt.getSeconds()).toBe(0);
        expect(dt.getMilliseconds()).toBe(0);
    });

    it('should set the time to end of day (23:59:59:999)', function() {
        var dt = dateFiddler.init.endOfDay.get();
        expect(dt.getHours()).toBe(23);
        expect(dt.getMinutes()).toBe(59);
        expect(dt.getSeconds()).toBe(59);
        expect(dt.getMilliseconds()).toBe(999);
    });

    it('should set the date to the start of the week (Sunday at midnight)', function() {
        var dt = dateFiddler.init.startOfWeek.get();
        expect(dt.getDay()).toBe(0);
        expect(dt.getHours()).toBe(0);
        expect(dt.getMinutes()).toBe(0);
        expect(dt.getSeconds()).toBe(0);
        expect(dt.getMilliseconds()).toBe(0);
    });

    it('should set the date to the end of the week (Saturday at 23:59:59:999)', function() {
        var dt = dateFiddler.init.endOfWeek.get();
        expect(dt.getDay()).toBe(6);
        expect(dt.getHours()).toBe(23);
        expect(dt.getMinutes()).toBe(59);
        expect(dt.getSeconds()).toBe(59);
        expect(dt.getMilliseconds()).toBe(999);
    });

});