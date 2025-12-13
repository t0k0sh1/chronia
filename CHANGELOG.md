# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.0.0] - YYYY-MM-DD

### Added

#### Core Features

- TypeScript-first API with full type definitions
- Dual ESM/CJS module support
- No-exceptions error handling policy (returns Invalid Date instead of throwing)
- Immutable operations (never mutates input dates)
- Support for Date objects, numeric timestamps, and ISO 8601 strings
- 3500+ automated test cases for reliability

#### Arithmetic Functions (14)

- `addYears` - Add years to a date
- `addMonths` - Add months to a date
- `addDays` - Add days to a date
- `addHours` - Add hours to a date
- `addMinutes` - Add minutes to a date
- `addSeconds` - Add seconds to a date
- `addMilliseconds` - Add milliseconds to a date
- `subYears` - Subtract years from a date
- `subMonths` - Subtract months from a date
- `subDays` - Subtract days from a date
- `subHours` - Subtract hours from a date
- `subMinutes` - Subtract minutes from a date
- `subSeconds` - Subtract seconds from a date
- `subMilliseconds` - Subtract milliseconds from a date

#### Difference Functions (7)

- `diffYears` - Calculate the difference in years between two dates
- `diffMonths` - Calculate the difference in months between two dates
- `diffDays` - Calculate the difference in days between two dates
- `diffHours` - Calculate the difference in hours between two dates
- `diffMinutes` - Calculate the difference in minutes between two dates
- `diffSeconds` - Calculate the difference in seconds between two dates
- `diffMilliseconds` - Calculate the difference in milliseconds between two dates

#### Comparison Functions (18)

- `isAfter` - Check if a date is after another
- `isAfterOrEqual` - Check if a date is after or equal to another
- `isBefore` - Check if a date is before another
- `isBeforeOrEqual` - Check if a date is before or equal to another
- `isBetween` - Check if a date is between two dates
- `isEqual` - Check if two dates are equal
- `isSameYear` - Check if two dates are in the same year
- `isSameMonth` - Check if two dates are in the same month
- `isSameDay` - Check if two dates are on the same day
- `isSameHour` - Check if two dates are in the same hour
- `isSameMinute` - Check if two dates are in the same minute
- `isSameSecond` - Check if two dates are in the same second
- `compare` - Compare two dates (-1, 0, or 1)
- `isFuture` - Check if a date is in the future
- `isPast` - Check if a date is in the past
- `isDate` - Check if a value is a Date object instance
- `isValid` - Check if a date is valid
- `isExists` - Check if year, month, and day represent an existing date

#### Getter Functions (8)

- `getYear` - Get the year
- `getMonth` - Get the month (0-11)
- `getDay` - Get the day of the month
- `getHours` - Get the hours
- `getMinutes` - Get the minutes
- `getSeconds` - Get the seconds
- `getMilliseconds` - Get the milliseconds
- `getTime` - Get the timestamp

#### Setter Functions (8)

- `setYear` - Set the year
- `setMonth` - Set the month
- `setDay` - Set the day of the month
- `setHours` - Set the hours
- `setMinutes` - Set the minutes
- `setSeconds` - Set the seconds
- `setMilliseconds` - Set the milliseconds
- `setTime` - Set the timestamp

#### Boundary Functions (6)

- `startOfYear` - Get the start of the year
- `startOfMonth` - Get the start of the month
- `startOfDay` - Get the start of the day
- `endOfYear` - Get the end of the year
- `endOfMonth` - Get the end of the month
- `endOfDay` - Get the end of the day

#### Truncation Functions (7)

- `truncYear` - Truncate to the start of the year
- `truncMonth` - Truncate to the start of the month
- `truncDay` - Truncate to the start of the day
- `truncHour` - Truncate to the start of the hour
- `truncMinute` - Truncate to the start of the minute
- `truncSecond` - Truncate to the start of the second
- `truncMillisecond` - Truncate to the millisecond

#### Formatting Functions (2)

- `format` - Format a date using Unicode date field symbols
- `createFormatter` - Create a pre-compiled formatter for efficient repeated formatting

#### Parsing Functions (2)

- `parse` - Parse a date string using a format pattern
- `createParser` - Create a pre-compiled parser for efficient repeated parsing

#### Utility Functions (4)

- `now` - Get the current date and time
- `min` - Get the earliest date from an array
- `max` - Get the latest date from an array
- `clamp` - Clamp a date between a minimum and maximum

#### Internationalization (39 locales)

**Core:**

- `en-US` - English (United States)
- `ja` - Japanese

**World Languages:**

- `zh-CN` - Chinese (Simplified)
- `ko` - Korean
- `es` - Spanish
- `fr` - French
- `de` - German
- `pt-BR` - Portuguese (Brazil)
- `ru` - Russian
- `ar` - Arabic

**European Languages:**

- `it` - Italian
- `nl` - Dutch
- `pl` - Polish
- `pt` - Portuguese (Portugal)
- `sv` - Swedish
- `tr` - Turkish

**Asian Languages:**

- `zh-TW` - Chinese (Traditional, Taiwan)
- `zh-HK` - Chinese (Traditional, Hong Kong)
- `vi` - Vietnamese
- `id` - Indonesian
- `ms` - Malay
- `th` - Thai
- `hi` - Hindi

**English Variants:**

- `en-GB` - English (United Kingdom)
- `en-AU` - English (Australia)
- `en-CA` - English (Canada)

**Major European Languages:**

- `da` - Danish
- `fi` - Finnish
- `nb` - Norwegian (Bokmål)
- `cs` - Czech
- `el` - Greek
- `he` - Hebrew
- `hu` - Hungarian
- `ro` - Romanian
- `uk` - Ukrainian
- `sk` - Slovak
- `bg` - Bulgarian
- `hr` - Croatian
- `sr` - Serbian
