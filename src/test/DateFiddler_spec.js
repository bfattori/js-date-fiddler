describe('DateFiddler', function() {

    var DATE = new Date();
    var DATE_TOMORROW = new Date(DATE);
    var DATE_YESTERDAY = new Date(DATE);

    DATE_TOMORROW = new Date(DATE_TOMORROW.setDate(DATE_TOMORROW.getDate() + 1));
    DATE_YESTERDAY = new Date(DATE_YESTERDAY.setDate(DATE_YESTERDAY.getDate() - 1));


    var dateFiddler = new DateFiddler(DATE);

    it('date() should return the DateFiddler with the internal date set to the initial date', function() {
        expect(dateFiddler.init().accumulator).toEqual(DATE);
    });

    it('get() should return the Date object which the fiddler is currently at', function() {
        expect(dateFiddler.get()).toEqual(DATE);
    });

    it('set() should set the date if it is specified', function() {
        expect(dateFiddler.set(DATE_TOMORROW).accumulator).toEqual(DATE_TOMORROW);
        expect(dateFiddler.operation).toBe("=");
    });

    it('add() should change the operation to +', function() {
        expect(dateFiddler.add().operation).toBe("+");
    });

    it('subtract() should change the operation to -', function() {
        expect(dateFiddler.subtract().operation).toBe("-");
    });

    it('doIt() should run the function and modify the accumulator', function() {
        var self, dt;
        function doNothing(date) {
            self = this;
            dt = date;
            return dt;
        }

        dateFiddler.set(DATE);
        dateFiddler.doIt(doNothing);
        expect(self).toBe(dateFiddler);
        expect(dt).toEqual(DATE);
    });

    it('op() should perform an operation on a date based on the operation, setter, and getter methods', function() {
        var dt = new Date(DATE);

        dateFiddler.init().add();
        var oppedDate = new Date(dateFiddler.op(dt, dt.setDate, dt.getDate, 1));
        expect(oppedDate).toEqual(DATE_TOMORROW);
    });

    it('add().days(1) should add a day to the date', function() {
        var tomorrow = dateFiddler.init().add().days(1).get();
        expect(tomorrow).toEqual(DATE_TOMORROW);
    });

    it('subtract().days(1) should subtract a day from the date', function() {
        var tomorrow = dateFiddler.init().subtract().days(1).get();
        expect(tomorrow).toEqual(DATE_YESTERDAY);
    });

    it('chaining operations', function() {
    })
});