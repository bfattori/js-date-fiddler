/*
 js-date-fiddler (DateFiddler)
 A JavaScript library for manipulating dates when testing

 (c)2014 Brett Fattori
 */
(function(root, undefined) {

    function DateFiddler(targetDate) {
        this.targetDate = targetDate || new Date();
        this.operation = "=";
        this.accumulator = new Date(this.targetDate);
    }

    function _midnight(date) {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    }

    function _noon(date) {
        date = _midnight(date);
        date.setHours(12);
        return date;
    }

    function _endOfDay(date) {
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        date.setMilliseconds(999);
        return date;
    }


    DateFiddler.prototype = {
        get init() {
            this.operation = "=";
            this.accumulator = new Date(this.targetDate);
            return this;
        },

        get: function() {
            return this.accumulator;
        },

        get set() {
            this.operation = "=";
            return this;
        },

        get add() {
            this.operation = "+";
            return this;
        },

        get subtract() {
            this.operation = "-";
            return this;
        },

        doIt: function(fn) {
            this.accumulator = new Date(fn.call(this, new Date(this.accumulator)));
            return this;
        },

        op: function(date, setterMethod, getterMethod, val) {
            if (this.operation === "=") {
                return setterMethod.call(date, val);
            } else if (this.operation === "+") {
                return setterMethod.call(date, getterMethod.call(date) + val);
            } else {
                return setterMethod.call(date, getterMethod.call(date) - val);
            }
        },

        hours: function(h) {
            return this.doIt(function(date) {
                return this.op(date, date.setHours, date.getHours, h);
            });
        },

        minutes: function(m) {
            return this.doIt(function(date) {
                return this.op(date, date.setMinutes, date.getMinutes, m);
            });
        },

        seconds: function(s) {
            return this.doIt(function(date) {
                return this.op(date, date.setSeconds, date.getSeconds, s);
            });
        },

        milliseconds: function(ms) {
            return this.doIt(function(date) {
                return this.op(date, date.setMilliseconds, date.getMilliseconds, ms);
            });
        },

        time: function(h, m, s, ms) {
            ms = ms || 0;
            return this.doIt(function(date) {
                var dt = this.op(date, date.setHours, date.getHours, h);
                this.op(dt, date.setMinutes, date.getMinutes, m);
                this.op(dt, date.setSeconds, date.getSeconds, s);
                this.op(dt, date.setMilliseconds, date.getMilliseconds, ms);
                return dt;
            });
        },

        days: function(d) {
            return this.doIt(function(date) {
                return this.op(date, date.setDate, date.getDate, d);
            });
        },

        months: function(m) {
            return this.doIt(function(date) {
                return this.op(date, date.setMonth, date.getMonth, m);
            });
        },

        years: function(y) {
            return this.doIt(function(date) {
                return this.op(date, date.setFullYear, date.getFullYear, y);
            });
        },

        date: function(m, d, y) {
            var dt;
            return this.doIt(function(date) {
                if ((Object.prototype.toString.call(m) === "[object Date]") || m > 12) {
                    dt = new Date(m);
                } else {
                    dt = new Date(this.op(date, date.setMonth, date.getMonth, (m - 1)));
                    dt = new Date(this.op(dt, date.setDate, date.getDate, d));
                    dt = new Date(this.op(dt, date.setFullYear, date.getFullYear, y));
                }

                return dt;
            });
        },

        weeks: function(w) {
            return this.doIt(function(date) {
                return this.op(date, date.setDate, date.getDate, w * 7);
            });
        },

        get midnight() {
            return this.doIt(function(date) {
                return _midnight(date);
            });
        },

        get noon() {
            return this.doIt(function(date) {
                return _noon(date);
            });
        },

        get endOfDay() {
            return this.doIt(function(date) {
                return _endOfDay(date);
            });
        },

        get lastMonth() {
            return this.doIt(function(date) {
                return date.setMonth(date.getMonth() - 1);
            });
        },

        get nextMonth() {
            return this.doIt(function(date) {
                return date.setMonth(date.getMonth() + 1);
            });
        },

        get startOfWeek() {
            return this.doIt(function(date) {
                var sow = new Date(date.setDate(date.getDate() - date.getDay()));
                return _midnight(sow);
            });
        },

        get endOfWeek() {
            // Defaults to Saturday
            var weekEndDay = 6; /* arguments[0] ? (arguments[0] + 6) % 6 : 6;*/
            return this.doIt(function(date) {
                var eow = new Date(date.setDate((date.getDate() + (weekEndDay - date.getDay()))));
                return _endOfDay(eow);
            });
        },

        get startOfMonth() {
            return this.doIt(function(date) {
                var som = date.setDate(1);
                return _midnight(som);
            });
        },

        get endOfMonth() {
            return this.doIt(function(date) {
                var eom = new Date(date.setMonth(date.getMonth() + 1)).setDate(date.getDate() - 1);
                return _endOfDay(eom);
            });
        },

        get sunday() {
            return this.doIt(function(date) {
                return date.setDate(date.getDate() - date.getDay());
            });
        },

        get monday() {
            return this.doIt(function(date) {
                return date.setDate((date.getDate() + (1 - date.getDay())));
            });
        },

        get tuesday() {
            return this.doIt(function(date) {
                return date.setDate((date.getDate() + (2 - date.getDay())));
            });
        },

        get wednesday() {
            return this.doIt(function(date) {
                return date.setDate((date.getDate() + (3 - date.getDay())));
            });
        },

        get thursday() {
            return this.doIt(function(date) {
                return date.setDate((date.getDate() + (4 - date.getDay())));
            });
        },

        get friday() {
            return this.doIt(function(date) {
                return date.setDate((date.getDate() + (5 - date.getDay())));
            });
        },

        get saturday() {
            return this.doIt(function(date) {
                return date.setDate((date.getDate() + (6 - date.getDay())));
            });
        }
    };

    root.DateFiddler = DateFiddler;

})(this);