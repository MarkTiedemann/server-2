
deno.exe := dependencies\deno-$(deno.version)\bin\deno.exe

$(deno.exe):
	md dependencies\deno-$(deno.version)\bin
	curl -Lo dependencies\deno-$(deno.version)\deno.zip https://github.com/denoland/deno/releases/download/v$(deno.version)/deno-x86_64-pc-windows-msvc.zip
	tar xf dependencies\deno-$(deno.version)\deno.zip -C dependencies\deno-$(deno.version)\bin
	del /q dependencies\deno-$(deno.version)\deno.zip

define deno
	set DENO_DIR=dependencies\deno-$(deno.version)& $(deno.exe) $(1)
endef
