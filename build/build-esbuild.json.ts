import { encodeBase64 } from "https://deno.land/std@0.212.0/encoding/base64.ts";

const esbuildVersion = Deno.args[0];
const esbuildExePath = Deno.args[1];

const json = {
	version: esbuildVersion,
	exeBase64Encoded: encodeBase64(await Deno.readFile(esbuildExePath))
};
await Deno.writeTextFile("source/esbuild.json", JSON.stringify(json, null, "\t"));
