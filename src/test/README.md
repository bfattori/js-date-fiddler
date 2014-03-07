# TimezoneJS Testing

If you wish to test with TimezoneJS, you'll need to set a few things up first.  Create the lib
folder where you need to download date.js from the [TimezoneJS GitHub page](https://github.com/mde/timezone-js) and
jquery.js from the [jQuery Site](http://jquery.com).  The files are not included in this archive due to the
volatility of such libraries.

    mkdir lib

Then you'll need to put the timezone files (instructions on the TimezoneJS site) into the 'tz' folder.

    mkdir tz


That should be it.  Then you can run the 'jasmine:withTZ' test option.