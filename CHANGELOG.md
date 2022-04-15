# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## **[1.0.0]** - 2022-04-15
### Added
- Logos icon for files
- Web support

### Changed
- Reorganized the Git Project
- Cleaned up the plugin structure
- Switched packaging to PNPM

## Removed
- Deleted unnecessary runtime dependencies

## **[0.5.1]** - 2020-07-08
### Removed
- Unused disposable from a boilerplate method

## **[0.5.0]** - 2020-07-07
### Changed
- Rewrote the entire extension from the ground up
- Fixed a few issues with syntax highlighting

### Added
- Code Snippets and autocompletion for generic style code
- Hover support for information on keywords and code

### Removed
- Clang format utility (maybe it'll be back later)
- Terrible code

## **[0.2.6]** - 2020-07-07
### Changed
- Added `hookf` syntax support because it was apparently forgotten
- Begin planning a language server (check the project boards)

## **[0.2.5]** - 2020-06-01
### Added
- Internal support for a prepackaged clang binary (this is coming soon)
- Cleaned up the codebase slightly for future modifications.

## **[0.2.4]** - 2020-05-08
### Changed
- Updated `package.json` with the removal of the `tslint` dependency as it is now deprecated
- Switched to using **PNPM** over **Yarn** and added the according lock-files to the `.gitignore` file

- Completely rewrote the Logos Syntax highlighting to actually work and not break. *Special thanks to [cxnder](https://github.com/cxnder).*

## **[0.2.3]** - 2020-05-07
### Changed
- Updated `package.json` with the removal of the enable/disable entries

### Removed
- The abililty to enable/disable formatting for languages as that should be done in *VS Code User Settings*

## **[0.2.2]** - 2020-05-06
### Changed
- Updated `package.json` with preference entries and project dependencies

### Added
- Support for formatting *Logos*, *Objective-C*, & *Objective-C++*
- Added preferences to specify `clang-format` executable path along with styling
- Extension source with formatting code *(written in Typescript)*

## **[0.2.1]** - 2020-05-05
### Added
- Main Project Boilerplate
- Logos Syntax Highlighting
