import esbuild from "./esbuild.json" with { type: "json" };
import mimeTypes from "./mime-types.json" with { type: "json" };
import { decodeBase64 } from "./decode-base64.ts";

const esbuildExePath = `${Deno.env.get("temp")}\\esbuild-${esbuild.version}.exe`;

try {
	await Deno.stat(esbuildExePath);
} catch {
	await Deno.writeFile(esbuildExePath, decodeBase64(esbuild.exeBase64Encoded));
}

const _out = await new Deno.Command(esbuildExePath, { args: ["--help"] }).output();
console.log(_out.success);

console.log(mimeTypes.html);
