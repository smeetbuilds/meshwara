# Security policy

Please report suspected vulnerabilities privately rather than opening a public issue with exploit details, tokens or user data. The project's publicly listed contact is **hi@aahavlabs.in**.

## Supported scope

Review the current `main` code and its dependencies. There is no promise of backports to older revisions. The project has a local-first editor that stores imported 3D files and projects in browser IndexedDB, a public archive/CLI downloader and an offline codec runtime.

## Reporting guidelines

Describe the affected file/feature, steps to reproduce with **synthetic non-sensitive fixtures**, expected vs actual behavior, severity and any safe mitigation. Do not attach real private models or secrets. If you suspect a credential has been committed, do not paste its value; revoke it and notify the maintainer with path/commit identifiers only.

## Known review limits

A deployed build is not a security audit. For the pre-application review and current open limitations see `docs/PRE_APPLICATION_AUDIT.md`. Do not enable any vulnerable-framework deployment bypass variable.
