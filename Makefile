SHELL := cmd.exe

.PHONY: make
.DEFAULT_GOAL := make

deno.version := 1.39.4
esbuild.version := 0.19.12

include install\deno.mk
include install\esbuild.mk

.vscode\settings.json: $(deno.exe)
	$(call deno,run -A build/build-settings.json.ts)

source\esbuild.json: $(esbuild.exe)
	$(call deno,run -A build/build-esbuild.json.ts $(esbuild.version) $(esbuild.exe))

make: .vscode\settings.json source\esbuild.json
	$(call deno,compile -A source\server.ts)
