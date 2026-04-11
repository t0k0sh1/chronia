## [1.0.4] - 2026-04-11

### Changed

- Update `vite` from 7.1.12 to 7.3.2 (indirect dev dependency)
- Update `brace-expansion` from 2.0.2 to 2.0.3 (indirect dev dependency)
- Update `picomatch` from 4.0.3 to 4.0.4 (indirect dev dependency)

### Fixed

- Override `yaml` to `^2.8.3` to drop the vulnerable `yaml@2.8.1` (GHSA-48c2-rrv3-qjmp); `yaml` is only an optional peer dependency of `postcss-load-config`, which this project does not use

