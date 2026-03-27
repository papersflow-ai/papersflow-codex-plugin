# papersflow-codex-plugin

Website: [papersflow.ai](https://papersflow.ai)

Hosted MCP server: [doxa.papersflow.ai/mcp](https://doxa.papersflow.ai/mcp)

`papersflow-codex-plugin` packages PapersFlow for Codex as an installable plugin. It combines:

- a hosted MCP server for live PapersFlow tools
- guided workflow agents implemented as Codex skills
- install-surface metadata for local marketplace testing and future distribution

It is designed for:

- Codex users who want research workflows rather than raw tool discovery
- teams that want one installable package for PapersFlow skills and MCP access
- plugin development and local marketplace testing before broader distribution

## What Is Included

- a Codex plugin manifest in `.codex-plugin/plugin.json`
- a bundled remote MCP configuration in `.mcp.json`
- a repo-local marketplace entry in `.agents/plugins/marketplace.json`
- no bundled `.app.json` yet; this first version ships guided skills plus hosted MCP access, not a separate app or connector mapping
- four workflow agents implemented as skills:
  - `research-briefing`
  - `citation-verifier`
  - `deepscan-monitor`
  - `comparative-synthesis`

## Hosted MCP Server

This plugin points Codex at the production PapersFlow MCP server:

- `https://doxa.papersflow.ai/mcp`

The bundled `.mcp.json` uses the hosted remote MCP endpoint so Codex can authenticate with OAuth when needed.

What the MCP server provides:

- a narrow research-focused tool surface rather than a general-purpose tool bundle
- guest-safe public tools for paper discovery and citation exploration
- signed-in tools for evidence synthesis across a user's saved research history
- paid tools for long-running DeepScan research jobs and report plotting

In practice, the MCP is the execution layer. The skills in this plugin tell Codex when to use which PapersFlow tools and how to present the results clearly.

## Workflow Agents

These "agents" are implemented as Codex skills. Each one gives Codex a guided workflow for a common PapersFlow task instead of forcing the model to infer the right tool sequence from scratch.

### `research-briefing`

Best for:

- literature search
- related-paper discovery
- citation graph exploration
- a concise research brief from PapersFlow data

What it does:

- starts with topic or seed-paper discovery
- normalizes uncertain citations before deeper exploration
- branches into grouped neighbors or full citation graph views
- returns a compact research brief instead of raw MCP output

### `citation-verifier`

Best for:

- a DOI, URL, arXiv ID, PubMed ID, citation string, or paper title checked
- a normalized paper record from a raw identifier
- a fast verification workflow instead of topic discovery

What it does:

- validates the identifier or citation string
- resolves it to a canonical paper record
- fetches richer metadata for a clean final citation card

### `deepscan-monitor`

Best for:

- a DeepScan started
- progress checks while it runs
- key findings before completion
- the final report or a follow-up plot

What it does:

- launches long-running DeepScan research jobs
- polls progress and live findings deliberately
- surfaces partial insights while the run is still active
- switches to final-report summarization and plotting once the job completes

### `comparative-synthesis`

Best for:

- cross-run comparison of multiple DeepScan reports
- a unified summary across previous research sessions
- trend analysis or gap identification across finished runs

What it does:

- compares completed DeepScan runs
- identifies overlaps, divergences, and gaps
- generates side-by-side views when report data supports it

## Tool Surface

The MCP tool catalog is intentionally split by access level.

Public tools:

- `search`: broad PapersFlow search entry point for paper and research discovery
- `fetch`: get a richer single-paper record after search or verification
- `verify_citation`: normalize a DOI, URL, arXiv ID, PubMed ID, or citation string
- `search_literature`: topic-first literature discovery
- `find_related_papers`: find papers near a seed paper
- `get_citation_graph`: build a seed-centered citation graph
- `get_paper_neighbors`: return grouped one-hop references, citations, and similar papers
- `expand_citation_graph`: grow an existing graph from known node ids

Signed-in tools:

- `summarize_evidence`: synthesize evidence across a user's stored PapersFlow research history

Paid tools:

- `run_deepscan`: start a long-running research run
- `get_deepscan_status`: lightweight progress checks
- `get_deepscan_live_snapshot`: richer live progress plus partial findings
- `get_deepscan_report`: retrieve the final DeepScan report
- `run_python_plot`: generate plots from finished report data

## Local Testing In Codex

Place this repository on disk, restart Codex, and open the plugin directory. Codex should discover the repo-local marketplace at `.agents/plugins/marketplace.json`, where the plugin source points to `./`.

If you prefer to install through a personal marketplace instead, copy the plugin to your preferred plugin directory and add a marketplace entry that points at the plugin root.

Before publishing or sharing changes, run:

```bash
npm run validate
```

This checks the plugin manifest, marketplace metadata, MCP config, skill files, and referenced assets.

The current install-surface assets intentionally use the welcome-email visuals from `public/email/...`:

- `search-papers.png` from `public/email/mcp`
- `verify-citation.png` from `public/email/mcp`
- `citation-graph.png` from `public/email/mcp`
- `deep-research-branded.webp` from `public/email/features`
- `plugin-icon.png` as the install-surface icon
- `plugin-icon.svg` as the editable vector source for future refinements

## OAuth And Access

Public PapersFlow tools can be used without account access in some flows, but Codex should authenticate with PapersFlow to unlock the full surface:

- `summarize_evidence`
- `run_deepscan`
- `get_deepscan_status`
- `get_deepscan_live_snapshot`
- `get_deepscan_report`
- `run_python_plot`

## Why This Plugin Exists

Without the plugin, a model can still connect to the PapersFlow MCP server, but it has to infer how to sequence the tools and how to present the results. This plugin packages that operational knowledge directly into Codex:

- the MCP server provides the live tool execution surface
- the workflow agents define how Codex should use those tools
- the manifest and marketplace metadata make the package installable and discoverable

## Support

- Website: `https://papersflow.ai`
- MCP server: `https://doxa.papersflow.ai/mcp`
- Privacy: `https://papersflow.ai/privacy`
- Terms: `https://papersflow.ai/terms`
- Support: `https://papersflow.ai/contact`
- Support email: `developer@papersflow.ai`
