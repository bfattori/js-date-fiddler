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

    DateFiddler.prototype = {
        init: function() {
            this.operation = "=";
            this.accumulator = new Date(this.targetDate);
            return this;
        },

        set: function(date) {
            this.operation = "=";
            this.accumulator = date ? new Date(date) : this.accumulator;
            return this;
        },

        get: function() {
            return this.accumulator;
        },

        add: function() {
            this.operation = "+";
            return this;
        },

        subtract: function() {
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
                dt = this.op(dt, date.setMinutes, date.getMinutes, m);
                dt = this.op(dt, date.setSeconds, date.getSeconds, s);
                dt = this.op(dt, date.setMilliseconds, date.getMilliseconds, ms);
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
            return this.doIt(function(date) {
                var dt = this.op(date, date.setMonth, date.getMonth, m);
                dt = this.op(dt, date.setDate, date.getDate, d);
                dt = this.op(dt, date.setFullYear, date.getFullYear, y);
                return dt;
            });
        },

        weeks: function(w) {
            return this.doIt(function(date) {
                return this.op(date, date.setDate, date.getDate, w * 7);
            });
        },

        midnight: function() {
            return this.doIt(function(date) {
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
                return date;
            });
        },

        noon: function() {
            return this.doIt(function(date) {
                date.setHours(12);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
                return date;
            });
        },

        endOfDay: function() {
            return this.doIt(function(date) {
                date.setHours(23);
                date.setMinutes(59);
                date.setSeconds(59);
                date.setMilliseconds(999);
                return date;
            });
        },

        lastMonth: function() {
            return this.doIt(function(date) {
                return date.setMonth(date.getMonth() - 1);
            });
        },

        nextMonth: function() {
            return this.doIt(function(date) {
                return date.setMonth(date.getMonth() + 1);
            });
        },

        startOfWeek: function() {
            return this.doIt(function(date) {
                var sow = new Date(date.setDate(date.getDate() - date.getDay()));
                sow.setHours(0);
                sow.setMinutes(0);
                sow.setSeconds(0);
                sow.setMilliseconds(0);
                return sow;
            });
        },

        endOfWeek: function(/* weekEndDay */) {
            // Defaults to Saturday
            var weekEndDay = arguments[0] ? (arguments[0] + 6) % 6 : 6;
            return this.doIt(function(date) {
                var eow = new Date(date.setDate((date.getDate() + (weekEndDay - date.getDay()))));
                eow.setHours(23);
                eow.setMinutes(59);
                eow.setSeconds(59);
                eow.setMilliseconds(999);
                return eow;
            });
        },

        startOfMonth: function() {
            return this.doIt(function(date) {
                return date.setDate(1);
            });
        },

        endOfMonth: function() {
            return this.doIt(function(date) {
                return new Date(date.setMonth(date.getMonth() + 1)).setDate(date.getDate() - 1);
            });
        },

        sunday: function() {
            return this.doIt(function(date) {
                return date.setDate(date.getDate() - date.getDay());
            });
        },

        monday: function() {
            return this.doIt(function(date) {
                return date.setDate((date.getDate() + (1 - date.getDay())));
            });
        },

        tuesday: function() {
            return this.doIt(function(date) {
                return date.setDate((date.getDate() + (2 - date.getDay())));
            });
        },

        wednesday: function() {
            return this.doIt(function(date) {
                return date.setDate((date.getDate() + (3 - date.getDay())));
            });
        },

        thursday: function() {
            return this.doIt(function(date) {
                return date.setDate((date.getDate() + (4 - date.getDay())));
            });
        },

        friday: function() {
            return this.doIt(function(date) {
                return date.setDate((date.getDate() + (5 - date.getDay())));
            });
        },

        saturday: function() {
            return this.doIt(function(date) {
                return date.setDate((date.getDate() + (6 - date.getDay())));
            });
        }
    };

    root.DateFiddler = DateFiddler;

})(this);