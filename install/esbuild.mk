
esbuild.exe := dependencies\esbuild-$(esbuild.version).exe

$(esbuild.exe):
	curl -Lo dependencies\esbuild-$(deno.version).zip https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-$(esbuild.version).tgz
	tar xf dependencies\esbuild-$(deno.version).zip -C dependencies
	move dependencies\package\esbuild.exe $(esbuild.exe)
	rd /q /s dependencies\package
	del /q dependencies\esbuild-$(deno.version).zip

define esbuild
	$(esbuild.exe) $(1)
endef
