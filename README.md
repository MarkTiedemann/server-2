# server (2)

**_A modern HTTP server for Windows_**

- No dependencies, no installation, just download the `.exe` file
- Customizable features
- Licensed as [CC0](https://creativecommons.org/publicdomain/zero/1.0/), no copyright

**Features:**

- Clean URLs:
  - `/` -> `/index.html`
  - `/example` | `/example/` -> `/example.html` | `/example/index.html`
- Auto-TypeScript:
  - `/script.js` -> `/script.ts`
  - `/script.mjs` -> `/script.mts`
- Auto-reload:
	- If a file is changed, the server will ask all affected clients to reload

**Installation:**

```bat
curl -O https://raw.githubusercontent.com/MarkTiedemann/server-2/master/server.exe
```

**Configuration:**

- `port`, default: `80`
- `root`, default: `.`
- `clean_urls`, default: `true`
- `auto_typescript`, default: `true`
- `auto_reload`, default: `true`

**Example usage:**

`dev.cmd`:

```bat
@echo off
setlocal

if not exist server.exe (
	curl -O https://raw.githubusercontent.com/MarkTiedemann/server-2/master/server.exe
)

set port=80
set root=%cd%
set clean_urls=true
set auto_typescript=true
set auto_reload=true

.\server.exe
```
