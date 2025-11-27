# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

#### Comparison Functions
- `isFuture` - Check if a date is in the future relative to current time
- `isPast` - Check if a date is in the past relative to current time
- `isDate` - Check if a value is a Date object instance
- `isExists` - Check if year, month, and day represent an existing date

### Changed

### Fixed

### Removed

## [0.1.11] - 2025-11-01

### Added

#### Arithmetic Functions
- `addDays` - Add days to a date
- `addHours` - Add hours to a date
- `addMilliseconds` - Add milliseconds to a date
- `addMinutes` - Add minutes to a date
- `addMonths` - Add months to a date
- `addSeconds` - Add seconds to a date
- `addYears` - Add years to a date
- `subDays` - Subtract days from a date
- `subHours` - Subtract hours from a date
- `subMilliseconds` - Subtract milliseconds from a date
- `subMinutes` - Subtract minutes from a date
- `subMonths` - Subtract months from a date
- `subSeconds` - Subtract seconds from a date
- `subYears` - Subtract years from a date

#### Comparison Functions
- `compare` - Compare two dates (-1, 0, or 1)
- `isAfter` - Check if a date is after another
- `isAfterOrEqual` - Check if a date is after or equal to another
- `isBefore` - Check if a date is before another
- `isBeforeOrEqual` - Check if a date is before or equal to another
- `isBetween` - Check if a date is between two dates
- `isEqual` - Check if two dates are equal
- `isSameDay` - Check if two dates are on the same day
- `isSameHour` - Check if two dates are in the same hour
- `isSameMinute` - Check if two dates are in the same minute
- `isSameMonth` - Check if two dates are in the same month
- `isSameSecond` - Check if two dates are in the same second
- `isSameYear` - Check if two dates are in the same year

#### Difference Functions
- `diffDays` - Calculate the difference in days between two dates
- `diffHours` - Calculate the difference in hours between two dates
- `diffMilliseconds` - Calculate the difference in milliseconds between two dates
- `diffMinutes` - Calculate the difference in minutes between two dates
- `diffMonths` - Calculate the difference in months between two dates
- `diffSeconds` - Calculate the difference in seconds between two dates
- `diffYears` - Calculate the difference in years between two dates

#### Getter Functions
- `getDay` - Get the day of the month
- `getHours` - Get the hours
- `getMilliseconds` - Get the milliseconds
- `getMinutes` - Get the minutes
- `getMonth` - Get the month (0-11)
- `getSeconds` - Get the seconds
- `getTime` - Get the timestamp
- `getYear` - Get the year

#### Setter Functions
- `setDay` - Set the day of the month
- `setHours` - Set the hours
- `setMilliseconds` - Set the milliseconds
- `setMinutes` - Set the minutes
- `setMonth` - Set the month
- `setSeconds` - Set the seconds
- `setTime` - Set the timestamp
- `setYear` - Set the year

#### Boundary Functions
- `startOfDay` - Get the start of the day
- `startOfMonth` - Get the start of the month
- `startOfYear` - Get the start of the year
- `endOfDay` - Get the end of the day
- `endOfMonth` - Get the end of the month
- `endOfYear` - Get the end of the year

#### Truncation Functions
- `truncDay` - Truncate to the start of the day
- `truncHour` - Truncate to the start of the hour
- `truncMillisecond` - Truncate to the millisecond
- `truncMinute` - Truncate to the start of the minute
- `truncMonth` - Truncate to the start of the month
- `truncSecond` - Truncate to the start of the second
- `truncYear` - Truncate to the start of the year

#### Formatting Functions
- `format` - Format a date using Unicode date field symbols
- `parse` - Parse a date string using a format pattern

#### Utility Functions
- `now` - Get the current date and time
- `max` - Get the latest date from an array
- `min` - Get the earliest date from an array
- `clamp` - Clamp a date between a minimum and maximum
- `isValid` - Check if a date is valid

#### Internationalization
- English (en-US) locale support
- Japanese (ja) locale support

#### Core Features
- No-exceptions error handling policy
- TypeScript-first API with full type definitions
- Dual ESM/CJS module support
- Immutable operations (never mutates input dates)
- Support for both Date objects and numeric timestamps
