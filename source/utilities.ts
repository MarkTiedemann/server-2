import mimeTypes from "./mime-types.json" with { type: "json" };

export function decodeBase64(text: string) {
	const binary = atob(text);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}
	return bytes;
}

export function determineExtension(pathname: string) {
	const segmentIndex = pathname.lastIndexOf("/");
	if (segmentIndex === -1) {
		return null;
	}
	const segment = pathname.slice(segmentIndex + 1);
	const extensionIndex = segment.lastIndexOf(".");
	if (extensionIndex === -1) {
		return null;
	}
	return segment.slice(extensionIndex + 1);
}

export function determineContentType(extension: string) {
	const mimeMapping = mimeTypes as { [x: string]: string | undefined };
	return mimeMapping[extension] ?? "application/octet-stream";
}

export async function respondWithFile(filePath: string, contentType: string) {
	try {
		const content = await Deno.readFile(filePath);
		return new Response(content, { headers: { "content-type": contentType } });
	} catch {
		return null;
	}
}
