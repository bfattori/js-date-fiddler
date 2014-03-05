describe('DateFiddler', function() {

    var DATE = new Date();
    var DATE_TOMORROW = new Date(DATE);
    var DATE_YESTERDAY = new Date(DATE);

    DATE_TOMORROW = new Date(DATE_TOMORROW.setDate(DATE_TOMORROW.getDate() + 1));
    DATE_YESTERDAY = new Date(DATE_YESTERDAY.setDate(DATE_YESTERDAY.getDate() - 1));


    var dateFiddler = new DateFiddler(DATE);

    it('date() should return the DateFiddler with the internal date set to the initial date', function() {
        expect(dateFiddler.reset.accumulator).toEqual(DATE);
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

        dateFiddler.reset.add;
        var oppedDate = new Date(dateFiddler.op(dt, dt.setDate, dt.getDate, 1));
        expect(oppedDate).toEqual(DATE_TOMORROW);
    });

    it('add().days(1) should add a day to the date', function() {
        var tomorrow = dateFiddler.reset.add.days(1).get();
        expect(tomorrow).toEqual(DATE_TOMORROW);
    });

    it('subtract().days(1) should subtract a day from the date', function() {
        var tomorrow = dateFiddler.reset.subtract.days(1).get();
        expect(tomorrow).toEqual(DATE_YESTERDAY);
    });

    it('chaining operations', function() {
    });

    it('should set the date to 6/1/1954 as a Date', function() {
        var dt = dateFiddler.reset.set.date(new Date("6/1/1954")).get();
        expect(dt.getMonth()).toBe(5);
        expect(dt.getDate()).toBe(1);
        expect(dt.getFullYear()).toBe(1954);
    });

    it('should set the date to 6/1/1954 as components', function() {
        var dt = dateFiddler.reset.set.date(6, 1, 1954).get();
        expect(dt.getMonth()).toBe(5);
        expect(dt.getDate()).toBe(1);
        expect(dt.getFullYear()).toBe(1954);
    });

    it('should set the time to 4:30:00:000', function() {
        var dt = dateFiddler.reset.set.time(4, 30, 0, 0).get();
        expect(dt.getHours()).toBe(4);
        expect(dt.getMinutes()).toBe(30);
        expect(dt.getSeconds()).toBe(0);
        expect(dt.getMilliseconds()).toBe(0);
    });

    it('should set the day to Sunday', function() {
        var dt = dateFiddler.reset.sunday.get();
        expect(dt.getDay()).toBe(0);
    });

    it('should set the day to Monday', function() {
        var dt = dateFiddler.reset.monday.get();
        expect(dt.getDay()).toBe(1);
    });

    it('should set the day to Tuesday', function() {
        var dt = dateFiddler.reset.tuesday.get();
        expect(dt.getDay()).toBe(2);
    });

    it('should set the day to Wednesday', function() {
        var dt = dateFiddler.reset.wednesday.get();
        expect(dt.getDay()).toBe(3);
    });

    it('should set the day to Thursday', function() {
        var dt = dateFiddler.reset.thursday.get();
        expect(dt.getDay()).toBe(4);
    });

    it('should set the day to Friday', function() {
        var dt = dateFiddler.reset.friday.get();
        expect(dt.getDay()).toBe(5);
    });

    it('should set the day to Saturday', function() {
        var dt = dateFiddler.reset.saturday.get();
        expect(dt.getDay()).toBe(6);
    });

    it('should set the time to midnight', function() {
        var dt = dateFiddler.reset.midnight.get();
        expect(dt.getHours()).toBe(0);
        expect(dt.getMinutes()).toBe(0);
        expect(dt.getSeconds()).toBe(0);
        expect(dt.getMilliseconds()).toBe(0);
    });

    it('should set the time to noon', function() {
        var dt = dateFiddler.reset.noon.get();
        expect(dt.getHours()).toBe(12);
        expect(dt.getMinutes()).toBe(0);
        expect(dt.getSeconds()).toBe(0);
        expect(dt.getMilliseconds()).toBe(0);
    });

    it('should set the time to end of day (23:59:59:999)', function() {
        var dt = dateFiddler.reset.endOfDay.get();
        expect(dt.getHours()).toBe(23);
        expect(dt.getMinutes()).toBe(59);
        expect(dt.getSeconds()).toBe(59);
        expect(dt.getMilliseconds()).toBe(999);
    });

    it('should set the date to the start of the week (Sunday at midnight)', function() {
        var dt = dateFiddler.reset.startOfWeek.get();
        expect(dt.getDay()).toBe(0);
        expect(dt.getHours()).toBe(0);
        expect(dt.getMinutes()).toBe(0);
        expect(dt.getSeconds()).toBe(0);
        expect(dt.getMilliseconds()).toBe(0);
    });

    it('should set the date to the end of the week (Saturday at 23:59:59:999)', function() {
        var dt = dateFiddler.reset.endOfWeek.get();
        expect(dt.getDay()).toBe(6);
        expect(dt.getHours()).toBe(23);
        expect(dt.getMinutes()).toBe(59);
        expect(dt.getSeconds()).toBe(59);
        expect(dt.getMilliseconds()).toBe(999);
    });

});