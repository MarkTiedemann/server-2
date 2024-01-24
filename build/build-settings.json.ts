
const settings = JSON.parse(await Deno.readTextFile(".vscode/settings.template.json"));
settings["deno.path"] = Deno.execPath();
await Deno.writeTextFile(".vscode/settings.json", JSON.stringify(settings, null, "\t") + "\n");
