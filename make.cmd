@echo off
if not exist dependencies md dependencies
if not exist dependencies\make-4.2.exe curl -o dependencies\make-4.2.exe https://raw.githubusercontent.com/MarkTiedemann/make-for-windows/master/make-4.2/64/make.exe
dependencies\make-4.2 %*
