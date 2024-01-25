import { determineExtension, determineContentType, respondWithFile } from "./utilities.ts";
import { initEsbuild, respondWithCompiledFile } from "./esbuild.ts";

const port = parseInt(Deno.env.get("port") ?? "80");
const root = Deno.env.get("root")?.replaceAll("\\", "/") ?? ".";

await initEsbuild();

Deno.serve({ port, onListen: () => {} }, async (request) => {
	const { pathname } = new URL(request.url);
	if (pathname.endsWith("/")) {
		let response = await respondWithFile(`${root}${pathname.slice(0, -1)}.html`, "text/html");
		if (response !== null) {
			return response;
		}
		response = await respondWithFile(`${root}${pathname}index.html`, "text/html");
		if (response !== null) {
			return response;
		}
		return new Response(null, { status: 404 });
	} else {
		const extension = determineExtension(pathname);
		if (extension === null) {
			let response = await respondWithFile(`${root}${pathname}.html`, "text/html");
			if (response !== null) {
				return response;
			}
			response = await respondWithFile(`${root}${pathname}/index.html`, "text/html");
			if (response !== null) {
				return response;
			}
			return new Response(null, { status: 404 });
		} else if (extension === "ts" || extension === "mts") {
			return await respondWithCompiledFile(`${root}${pathname}`);
		} else {
			const contentType = determineContentType(extension);
			const response = await respondWithFile(`${root}${pathname}`, contentType);
			if (response !== null) {
				return response;
			}
			return new Response(null, { status: 404 });
		}
	}
});
