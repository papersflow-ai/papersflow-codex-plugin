import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function readJson(relPath) {
  const absPath = path.join(root, relPath);
  return JSON.parse(fs.readFileSync(absPath, "utf8"));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertFileExists(relPath, label) {
  const absPath = path.join(root, relPath);
  assert(fs.existsSync(absPath), `${label} does not exist: ${relPath}`);
}

function assertPrefixedRelative(relPath, label) {
  assert(typeof relPath === "string", `${label} must be a string`);
  assert(relPath.startsWith("./"), `${label} must start with "./": ${relPath}`);
}

function assertString(obj, key, scope) {
  assert(typeof obj[key] === "string" && obj[key].trim().length > 0, `${scope}.${key} must be a non-empty string`);
}

function assertArray(obj, key, scope) {
  assert(Array.isArray(obj[key]) && obj[key].length > 0, `${scope}.${key} must be a non-empty array`);
}

const manifest = readJson(".codex-plugin/plugin.json");
const marketplace = readJson(".agents/plugins/marketplace.json");
const mcpConfig = readJson(".mcp.json");

for (const key of ["name", "version", "description", "homepage", "repository", "license", "skills", "mcpServers"]) {
  assertString(manifest, key, "manifest");
}

assert(typeof manifest.author === "object" && manifest.author !== null, "manifest.author must be an object");
for (const key of ["name", "email", "url"]) {
  assertString(manifest.author, key, "manifest.author");
}
assertArray(manifest, "keywords", "manifest");

assertPrefixedRelative(manifest.skills, "manifest.skills");
assertPrefixedRelative(manifest.mcpServers, "manifest.mcpServers");
assertFileExists(manifest.skills, "Skills path");
assertFileExists(manifest.mcpServers, "MCP config");

assert(typeof manifest.interface === "object" && manifest.interface !== null, "manifest.interface must be an object");
for (const key of [
  "displayName",
  "shortDescription",
  "longDescription",
  "developerName",
  "category",
  "websiteURL",
  "privacyPolicyURL",
  "termsOfServiceURL",
  "brandColor",
  "composerIcon",
  "logo",
]) {
  assertString(manifest.interface, key, "manifest.interface");
}
for (const key of ["capabilities", "defaultPrompt", "screenshots"]) {
  assertArray(manifest.interface, key, "manifest.interface");
}

for (const assetField of ["composerIcon", "logo"]) {
  assertPrefixedRelative(manifest.interface[assetField], `manifest.interface.${assetField}`);
  assertFileExists(manifest.interface[assetField], `Interface asset ${assetField}`);
}
for (const screenshotPath of manifest.interface.screenshots) {
  assertPrefixedRelative(screenshotPath, "manifest.interface.screenshots[]");
  assertFileExists(screenshotPath, "Interface screenshot");
}

const skillsDir = path.join(root, manifest.skills);
const skillEntries = fs.readdirSync(skillsDir, { withFileTypes: true }).filter((entry) => entry.isDirectory());
assert(skillEntries.length > 0, "At least one skill directory is required");
for (const skillEntry of skillEntries) {
  const relSkillPath = path.join(manifest.skills, skillEntry.name, "SKILL.md");
  assertFileExists(relSkillPath, "Skill file");
}

assertString(marketplace, "name", "marketplace");
assert(typeof marketplace.interface === "object" && marketplace.interface !== null, "marketplace.interface must be an object");
assertString(marketplace.interface, "displayName", "marketplace.interface");
assertArray(marketplace, "plugins", "marketplace");

const pluginEntry = marketplace.plugins[0];
assert(pluginEntry.name === manifest.name, "marketplace.plugins[0].name must match manifest.name");
assert(typeof pluginEntry.source === "object" && pluginEntry.source !== null, "marketplace.plugins[0].source must be an object");
assert(pluginEntry.source.source === "local", 'marketplace.plugins[0].source.source must be "local"');
assertPrefixedRelative(pluginEntry.source.path, "marketplace.plugins[0].source.path");
assertFileExists(pluginEntry.source.path, "Marketplace source path");
assert(typeof pluginEntry.policy === "object" && pluginEntry.policy !== null, "marketplace.plugins[0].policy must be an object");
assertString(pluginEntry.policy, "installation", "marketplace.plugins[0].policy");
assertString(pluginEntry.policy, "authentication", "marketplace.plugins[0].policy");
assertString(pluginEntry, "category", "marketplace.plugins[0]");

assert(typeof mcpConfig.mcpServers === "object" && mcpConfig.mcpServers !== null, ".mcp.json must contain mcpServers");
assert(Object.keys(mcpConfig.mcpServers).length > 0, ".mcp.json must define at least one MCP server");

console.log("Plugin manifest, marketplace metadata, assets, and skills validated successfully.");
