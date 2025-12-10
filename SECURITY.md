# Security Policy

## Overview

The Chronia project takes security seriously. We are committed to providing a safe and reliable date/time utility library for the JavaScript and TypeScript community.

If you discover a security vulnerability, we appreciate your help in disclosing it to us responsibly.

## Supported Versions

We provide security updates for the following versions:

| Version | Supported          | Notes                           |
| ------- | ------------------ | ------------------------------- |
| 0.x.x   | :white_check_mark: | Current beta (pre-v1.0.0)       |
| < 0.1.0 | :x:                | Early development versions      |

**Post-v1.0.0 Support Policy:**

Once Chronia reaches v1.0.0, we will follow these support guidelines:

- **Latest Major Version Only**: Security patches will be released only for the latest major version.
- **Patch Versions**: Security fixes will be applied to the latest minor and patch versions within the supported major version.

For example, if v2.0.0 is released, security patches will only be provided for v2.x.x. Users on v1.x.x will be encouraged to upgrade to v2.x.x.

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please use one of the following methods:

### GitHub Security Advisories (Recommended)

We strongly encourage you to report vulnerabilities using GitHub Security Advisories, which allows for private disclosure:

1. Go to the [Report a Vulnerability page](https://github.com/t0k0sh1/chronia/security/advisories/new).
2. Fill out the vulnerability report form with as much detail as possible.

Using this method ensures that the vulnerability remains private until a fix is released, reducing the risk of exploitation.

### What to Include in Your Report

To help us understand and address the issue quickly, please include as much of the following information as possible:

- **Description**: A clear description of the vulnerability
- **Steps to Reproduce**: Detailed steps to reproduce the issue, including a proof-of-concept (PoC) if available
- **Impact**: What the vulnerability affects (e.g., specific versions, environments, or use cases)
- **Potential Fix**: If you have suggestions for a fix, please include them

## Response Process

When you report a vulnerability, here's what you can expect:

1. **Acknowledgment**: We will acknowledge receipt of your vulnerability report within **48 hours**.

2. **Investigation & Assessment**: We will investigate the issue and assess its severity using the Common Vulnerability Scoring System (CVSS) as a guideline.

3. **Fix Development**: Based on the severity, we will prioritize the fix:
   - **Critical**: Patch release within **7 days** (target)
   - **High**: Patch release within **30 days** (target)
   - **Medium/Low**: Addressed in the next regular release

4. **Disclosure**: Once a fix is released, we will publicly disclose the vulnerability through a GitHub Security Advisory, giving credit to the reporter (unless you prefer to remain anonymous).

## Security Update Policy

Chronia employs several tools and practices to maintain security:

- **Dependabot**: Automatically checks for vulnerable dependencies and creates pull requests to update them. This project has Dependabot enabled for automated dependency updates.
- **Snyk**: Continuous vulnerability scanning is enabled for known security issues in our dependencies.
- **npm Trusted Publishing**: We use OIDC-based authentication for secure, tokenless publishing to npm, reducing the risk of compromised credentials.

## Scope

### In Scope

The following are considered in scope for security vulnerability reports:

- **Chronia Core Code**: Any security issues in the source code of the `chronia` package.
- **Published Dependencies**: Security issues in production dependencies (listed in `dependencies` in `package.json`).

### Out of Scope

The following are generally considered out of scope:

- **Development Dependencies**: Issues in `devDependencies` that do not affect production users.
- **Documentation & Examples**: Typos, formatting issues, or minor errors in documentation or example code.
- **Theoretical Attacks**: Hypothetical vulnerabilities without a practical proof-of-concept.

## Contact

For any questions or concerns regarding this security policy, please open a discussion in the [GitHub Discussions](https://github.com/t0k0sh1/chronia/discussions) section.

Thank you for helping keep Chronia and its users safe!
