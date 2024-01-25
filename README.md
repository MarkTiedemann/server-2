# server (2)

**_A minimal HTTP file server for Windows – with TypeScript support_**

- No dependencies, no installation, just download the `.exe` file
- If a TypeScript file is requested, compiled JavaScript will be served
- Licensed as [CC0](https://creativecommons.org/publicdomain/zero/1.0/), no copyright

**Download:**

```bat
curl -O https://media.githubusercontent.com/media/MarkTiedemann/server-2/master/server.exe
```

**Configuration:**

To configure the server, you may set the following environment variables:

- `port`, default: `80`
- `root`, default: `.`

**Example usage:**

`dev.cmd`:

```bat
@echo off
setlocal

if not exist server.exe (
	curl -O https://media.githubusercontent.com/media/MarkTiedemann/server-2/master/server.exe
)

set port=80
set root=%cd%

.\server.exe
```
