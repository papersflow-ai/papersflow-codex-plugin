# papersflow-codex-plugin

`papersflow-codex-plugin` packages guided PapersFlow research workflows for Codex on top of the hosted `papersflow-mcp` server.

It is designed for:

- Codex users who want guided research workflows instead of raw tool discovery
- teams that want one installable package for PapersFlow skills plus hosted MCP access
- local plugin testing through a repo marketplace before wider distribution

## What Is Included

- a Codex plugin manifest in `.codex-plugin/plugin.json`
- a bundled remote MCP configuration in `.mcp.json`
- a repo-local marketplace entry in `.agents/plugins/marketplace.json`
- no bundled `.app.json` yet; this first version ships guided skills plus hosted MCP access, not a separate app or connector mapping
- four skills:
  - `research-briefing`
  - `citation-verifier`
  - `deepscan-monitor`
  - `comparative-synthesis`

## Included MCP Server

This plugin points Codex at the production PapersFlow MCP server:

- `https://doxa.papersflow.ai/mcp`

The bundled `.mcp.json` uses the hosted remote MCP endpoint so Codex can authenticate with OAuth when needed.

## Skill Summary

### `research-briefing`

Use when the user wants:

- literature search
- related-paper discovery
- citation graph exploration
- a concise research brief from PapersFlow data

### `citation-verifier`

Use when the user wants:

- a DOI, URL, arXiv ID, PubMed ID, citation string, or paper title checked
- a normalized paper record from a raw identifier
- a fast verification workflow instead of topic discovery

### `deepscan-monitor`

Use when the user wants:

- a DeepScan started
- progress checks while it runs
- key findings before completion
- the final report or a follow-up plot

### `comparative-synthesis`

Use when the user wants:

- cross-run comparison of multiple DeepScan reports
- a unified summary across previous research sessions
- trend analysis or gap identification across finished runs

## Tool Access Model

Public tools:

- `search`
- `fetch`
- `verify_citation`
- `search_literature`
- `find_related_papers`
- `get_citation_graph`
- `get_paper_neighbors`
- `expand_citation_graph`

Signed-in tools:

- `summarize_evidence`

Paid tools:

- `run_deepscan`
- `get_deepscan_status`
- `get_deepscan_live_snapshot`
- `get_deepscan_report`
- `run_python_plot`

## Local Testing In Codex

Place this repository on disk, restart Codex, and open the plugin directory. Codex should discover the repo-local marketplace at `.agents/plugins/marketplace.json`, where the plugin source points to `./`.

If you prefer to install through a personal marketplace instead, copy the plugin to your preferred plugin directory and add a marketplace entry that points at the plugin root.

Before publishing or sharing changes, run:

```bash
npm run validate
```

This checks the plugin manifest, marketplace metadata, MCP config, skill files, and referenced assets.

## OAuth And Access

Public PapersFlow tools can be used without account access in some flows, but Codex should authenticate with PapersFlow to unlock the full surface:

- `summarize_evidence`
- `run_deepscan`
- `get_deepscan_status`
- `get_deepscan_live_snapshot`
- `get_deepscan_report`
- `run_python_plot`

## Support

- Website: `https://papersflow.ai`
- MCP server: `https://doxa.papersflow.ai/mcp`
- Privacy: `https://papersflow.ai/privacy`
- Terms: `https://papersflow.ai/terms`
- Support: `https://papersflow.ai/contact`
- Support email: `developer@papersflow.ai`
