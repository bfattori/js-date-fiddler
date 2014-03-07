js-date-fiddler [![Build Status](https://travis-ci.org/bfattori/js-date-fiddler.png?branch=master)](https://travis-ci.org/bfattori/js-date-fiddler)
===============


A JavaScript Library for manipulating dates when testing

## What Is This?
When testing using tools such as Jasmine or QUnit, it becomes necessary to be able to
manipulate dates at times.  However, manipulation of dates in JavaScript isn't simple.
This library aims to make testing with dates a lot simpler by providing a simple DSL
which allows you to describe your dates.  You can manipulate dates with easy to
remember methods and modifiers.

For example, let's say you have a need to test date ranges.  Typically you find yourself
creating dates that you can use to test.

    var DATE = new Date();
    var DATE_TOMORROW = new Date(DATE);
    var DATE_YESTERDAY = new Date(DATE);
    DATE_TOMORROW = DATE_TOMORROW.setDate(DATE_TOMORROW.getDate() + 1);
    DATE_YESTERDAY = DATE_YESTERDAY.setDate(DATE_YESTERDAY.getDate() - 1);

As you can see from this example, it's a complex glop of code to generate these three dates.
With _DateFiddler_ you could achieve the same (and have cleaner, more readable code).

    var dateFiddler = new DateFiddler();
    var DATE = dateFiddler.get();
    var DATE_TOMORROW = dateFiddler.add.days(1).get();
    var DATE_YESTERDAY = dateFiddler.reset.subtract.days(1).get();

Now, obviously my pure JavaScript example is a bit contrived.  I could have achieved it
by using three parsed dates.

    var DATE = new Date('5/5/2013');
    var DATE_TOMORROW = new Date('5/6/2013');
    var DATE_YESTERDAY = new Date('5/4/2013');

However, if I don't know what `DATE` is going to be, in advance, I have to use the first example.
Using _DateFiddler's_ DSL is what makes manipulating and understanding the dates much easier.
When _DateFiddler_ really shines is when you have to do complex, or many, date manipulations. In traditional
JavaScript, you would have to jump through many hoops to generate a complex date.

    var dt = new Date();
    dt.setMonths(dt.getMonths() + 3);
    dt.setDate(dt.getDate() + (5 - dt.getDay()));  // Friday
    dt.setHours(23);
    dt.setMinutes(59);
    dt.setSeconds(59);
    dt.setMilliseconds(999);

    // Give use a variable that describes the date
    var DATE_THREE_MONTHS_AHEAD_FRIDAY_END_OF_DAY = dt;

With _DateFiddler_ this becomes much simpler. You use the DSL to describe the date, which also means
no need for a descriptive variable name.  Plus, imagine having to generate more than just one date
like this.

    var dateFiddler = new DateFiddler();
    var fridayEndOfDay = dateFiddler.add.months(3).friday.endOfDay.get();
    var wednesdayNoon = dateFiddler.wednesday.noon.get();
    var saturdayMidnight = dateFiddler.saturday.midnight.get();
    var saturdayMidnightNextWeek = dateFiddler.add.weeks(1).get();

This is much simpler than the pure JavaScript.

## Installation
_This is only necessary if you plan to rebuild the library_

You will need to install a couple of NodeJS Modules before you can build the library.
For starters, you'll need to install Grunt to use the build system.  It's usually best
to install it globally (if you haven't already)

`npm install -g grunt`

Then you'll need Jasmine to run the test suite:

`npm install grunt-contrib-jasmine`

You'll also need UglifyJS to minify the code for distribution:

`npm install grunt-contrib-uglify`

## Grunt Tasks
To run the tests:

`grunt test`

To create the distribution files:

`grunt dist`

## How Does this Work, Exactly?
To begin, you'll need to create a DateFiddler.  You can either create a `new DateFiddler()` which uses the
current date and time, or you can pass it a seed date with `new DateFiddler(seedDate)`.  The date you pass should be a
valid JavaScript `Date` object.

Then you can begin manipulating the date with the methods provided.  You can advance the day, month, year,
or you can set the time of the day.  You're able to use some of the time methods to set specific times,
plus you can generate complex dates through method chaining.

For example:

    var dateFiddler = new DateFiddler();
    dateFiddler.set.months(1).days(16).years(1969);

This will create the date "Jan 16, 1969".  You could also achieve this effect by using:

    dateFiddler.set.date(1, 16, 1969);

Both achieve the same result.  To get the date as it is currently represented by the fiddler, you call
the `get()` method.  This will return a JavaScript `Date` object:

    var myBirthday = dateFiddler.set.date(12, 25, 1971).get();

This returns a new `Date` object with the date set to "Dec 25, 1971".  However, the time is set to the
time when the `DateFiddler` was created.  When you call it without a date, it uses the current date and
time to initialize the fiddler.  To override this, we could set the time with one of the methods:

    var myBirthday = dateFiddler.set.date(12, 25, 1971).noon.get();

This would return a date object with the time set to "12:00:00:000".  As you can see, you can chain
the methods to create complex dates.  You might want to create a date standard and then always manipulate
the date from that standard:

    // Create the standard
    var dateFiddler = new DateFiddler();

    // Get two different dates from the fiddler
    var date1 = dateFiddler.reset.add.months(2).subtract.days(5).endOfWeek.noon.get();
    var date2 = dateFiddler.reset.lastMonth.startOfWeek.midnight.get();

Using `reset` will always start from the seed date (or current date/time).  You can call `reset` at
any time, but it will just revert the date back to the seed.

## API

The following methods are provided by DateFiddler.

---

### new DateFiddler([seedDate])

This creates a new instance of a fiddler.  The `seedDate` argument is optional - if provided, it will
set the standard to the given date.

---

### .reset

This will reset the fiddler to the seed date.  All subsequent operations begin from the seed date, and the
operation is reset to `.set`.

---

### .get()

Returns a JavaScript `Date` object which represents the current state of the fiddler.  You cannot
chain from the get method.

---

### .set - _operation modifier_

Changes subsequent operations to set the fiddler's date.  For example:

    var fiddler = new DateFiddler();
    fiddler.set.months(1).days(10);

---

### .add - _operation modifier_

Changes subsequent operations to add to the fiddler's date.  For example:

    var fiddler = new DateFiddler();
    fiddler.set.months(1).add.months(5);

This would result in a date in the 6th month of the year (June).

---

### .subtract - _operation modifier_

The inverse of `.add`.

---

### .hours(num)

Depending on the operation, this modifies the hours within the fiddler.

---

### .minutes(num)

Depending on the operation, this modifies the minutes within the fiddler.

---

### .seconds(num)

Depending on the operation, this modifies the seconds within the fiddler.

---

### .milliseconds(num)

Depending on the operation, this modifies the milliseconds within the fiddler.

---

### .time(hours, minutes, seconds [, milliseconds])

Depending on the operation, this will modify the time.  If the operation is `.add`, it will
add the `hour`, `minute`, etc. to the fiddler.  If the operation is `.set`, it sets the time.
If the operation is `.subtract`, it will subtract the components. _Note that hours are ZERO based_.

---

### .days(num)

Depending on the operation, this modifies the date (day of month) within the fiddler.

---

### .months(num)

Depending on the operation, this modifies the month within the fiddler.

---

### .years(num)

Depending on the operation, this modifies the year within the fiddler.

---

### .date([Date | month, day, year])

Depending on the operation, this will modify the date.  If the operation is `.add`, it will
add the `month`, `day`, etc. to the fiddler.  If the operation is `.set`, it sets the date.
If the operation is `.subtract` it will subtract the components.  If you use the `Date` argument instead,
it will act as a date setter. _Note that "month" is ONE based, so January is 1 and December is 12_

---

### .weeks(num)

Depending on the operation, this modifies the week (moving the date by 7 days) within the fiddler.

---

### .midnight

Sets the time component of the fiddler to "00:00:00:000" (exactly midnight).

---

### .noon

Sets the time component of the fiddler to "12:00:00:000" (exactly noon).

---

### .endOfDay

Sets the time component of the fiddler to "23:59:59:999" (The very last millisecond of the day).

---

### .startOfWeek

Helper method to set the date and time to the start of the week (Sunday at midnight).

---

### .endOfWeek

Helper method to set the date and time to the end of the week (Saturday at 23:59:59:999")

---

### .startOfMonth

Helper method to set the date to the first of the month.

---

### .endOfMonth

Helper method to set the date to the last day of the month.

---

### .sunday, .monday, .tuesday, .wednesday, .thursday, .friday, .saturday

Helper methods to set the date to the corresponding day of the current week.


## Questions or Comments?

You can contact me at &#98;f&#97;&#116;&#116;o&#114;&#105;&#64;&#103;m&#97;&#105;&#108;&#46;&#99;o&#109;

