# Formatting

There are several properties throughout the `@hpcc-js` packages that rely on `d3-format` and `d3-time-format`. This is a brief summary explaining how to create formatting strings to be used with these properties.

## Number formatting

This is the default number formatting rule in many widget properties within `@hpcc-js`: `,.2f`

The comma (,) option enables the use of a group separator, such as a comma for thousands.

The period (.) option followed by `2` indicates the number of digits that follow the decimal point for the following two types:
* `f` - fixed point notation.
* `%` - multiply by 100, and then decimal notation with a percent sign.

Or the number of significant digits for the following types:
* `e` - exponent notation.
* `g` - either decimal or exponent notation, rounded to significant digits.
* `r` - decimal notation, rounded to significant digits.
* `s` - decimal notation with an SI prefix, rounded to significant digits.
* `p` - multiply by 100, round to significant digits, and then decimal notation with a percent sign.

The following types are also available:
* `b` - binary notation, rounded to integer.
* `o` - octal notation, rounded to integer.
* `d` - decimal notation, rounded to integer.
* `x` - hexadecimal notation, using lower-case letters, rounded to integer.
* `X` - hexadecimal notation, using upper-case letters, rounded to integer.
* `c` - converts the integer to the corresponding unicode character before printing.

## Date and time formatting
* `%a` - abbreviated weekday name.
* `%A` - full weekday name.
* `%b` - abbreviated month name.
* `%B` - full month name.
* `%c` - the locale’s date and time, such as `%x, %X`.
* `%d` - zero-padded day of the month as a decimal number [01,31].
* `%e` - space-padded day of the month as a decimal number [ 1,31]; equivalent to `%_d`.
* `%f` - microseconds as a decimal number [000000, 999999].
* `%H` - hour (24-hour clock) as a decimal number [00,23].
* `%I` - hour (12-hour clock) as a decimal number [01,12].
* `%j` - day of the year as a decimal number [001,366].
* `%m` - month as a decimal number [01,12].
* `%M` - minute as a decimal number [00,59].
* `%L` - milliseconds as a decimal number [000, 999].
* `%p` - either AM or PM.
* `%Q` - milliseconds since UNIX epoch.
* `%s` - seconds since UNIX epoch.
* `%S` - second as a decimal number [00,61].
* `%u` - Monday-based (ISO 8601) weekday as a decimal number [1,7].
* `%U` - Sunday-based week of the year as a decimal number [00,53].
* `%V` - ISO 8601 week of the year as a decimal number [01, 53].
* `%w` - Sunday-based weekday as a decimal number [0,6].
* `%W` - Monday-based week of the year as a decimal number [00,53].
* `%x` - the locale’s date, such as `%-m/%-d/%Y`.
* `%X` - the locale’s time, such as `%-I:%M:%S %p`.
* `%y` - year without century as a decimal number [00,99].
* `%Y` - year with century as a decimal number.
* `%Z` - time zone offset, such as -0700, -07:00, -07, or Z.
* `%%` - a literal percent sign (%).