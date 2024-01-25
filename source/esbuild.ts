import esbuild from "./esbuild.json" with { type: "json" };
import { decodeBase64 } from "./utilities.ts";

const esbuildExePath = `${Deno.env.get("temp")}\\esbuild-${esbuild.version}.exe`;

export async function initEsbuild() {
	try {
		await Deno.stat(esbuildExePath);
	} catch {
		await Deno.writeFile(esbuildExePath, decodeBase64(esbuild.exeBase64Encoded));
	}
}

export async function respondWithCompiledFile(filePath: string) {
	try {
		await Deno.stat(filePath);
	} catch {
		return new Response(null, { status: 404 });
	}
	const output = await new Deno.Command(esbuildExePath, { args: [filePath] }).output();
	if (output.success) {
		return new Response(output.stdout, { headers: { "content-type": "text/javascript" } });
	} else {
		return new Response(null, { status: 500 });
	}
}
