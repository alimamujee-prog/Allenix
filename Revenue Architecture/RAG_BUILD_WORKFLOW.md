# WbD RAG Pipeline — Build Retrospective

> **What:** A recap of the L3 contextual retrieval pipeline build — what was done, what was learned, and what worked.
> **Date:** 2026-04-18
> **Status:** Complete and operational

---

## What We Built

A fully local RAG (Retrieval-Augmented Generation) pipeline that indexes 547,176 words of WbD Revenue Architecture source material across three pillars (PDF book, website research, YouTube transcripts) into 889 searchable chunks. The pipeline uses hybrid retrieval (dense embeddings + BM25 keyword search) with cross-encoder reranking, all running on local hardware with zero recurring pipeline costs.

---

## The Steps We Took

### Step 1: Source Collection (Phases 1-3 of RESEARCH_WORKFLOW.md)

Before the RAG pipeline, we extracted and collected content from three source pillars:

**Pillar A — PDF (Revenue Architecture Visual Guide)**
- Extracted full text using `pdftotext` from the first-edition book by Jacco van der Kooij
- Created diagram inventory and structural mapping of all figures
- Identified gaps between the PDF and the existing Revenue Arch Summary
- Result: ~80K words in a single text file

**Pillar B — Website Research (winningbydesign.com)**
- Fetched 43 research papers, blueprints, and blog posts using web scraping
- Extracted full text from each resource and saved as individual files
- Performed delta analysis to identify content that evolved since the book was published
- Result: ~163K words across 43 files

**Pillar C — YouTube Transcripts (@WinningbyDesign)**
- Pulled full channel inventory and scored videos by relevance (weighted formula: title relevance, speaker authority, recency, length, views)
- Extracted transcripts for top-scored videos using `yt-dlp`
- Cleaned SRT formatting into structured markdown
- Result: ~187K words across 20 processed transcripts

### Step 2: Knowledge Synthesis (Phase 4)

- Built a cross-source reconciliation report comparing all three pillars against the existing L2 knowledge base
- Identified 5 discrepancies and 16+ coverage gaps
- Applied 3 critical fixes to the L2 knowledge base:
  1. NRR starting point corrected from 126% to 123%
  2. Freemium win rate expanded to 1:8 to 1:100 range with consumption model note
  3. GRR targets corrected to 80/85/90/95/98% from PDF Table 10.10
- Created system prompt v2 and L2 knowledge base optimized for Claude

### Step 3: Chunking (pipeline/chunker.py)

- Built a document-aware semantic chunker that handles each source type differently:
  - PDF: splits on chapter headers, preserves figure/table context
  - Website: splits on document boundaries, uses first-line sections
  - YouTube: splits on paragraph boundaries
- Target: 800 tokens per chunk with 15% (~120 token) overlap
- Produced 889 chunks: 88 PDF, 317 website, 484 YouTube
- Each chunk includes metadata: chunk_id, source_type, title, section, word_count, has_table, has_formula

### Step 4: Contextual Summaries (pipeline/contextual.py)

- Implemented Anthropic's contextual retrieval technique: each chunk gets a 2-3 sentence summary explaining what it's about and how it relates to the broader document
- Initially tried sequential processing — got stuck on a broken pipe, produced 0 summaries
- Rewrote with `ThreadPoolExecutor` for parallel processing (10 workers)
- Used Claude Haiku API via user's proxy (api.z.ai) for generation
- Hit rate limits on ~37 chunks (4.2%), which fell back to auto-generated summaries
- Final result: 852 real summaries, 37 fallbacks, generated in ~3 minutes

### Step 5: Embedding (pipeline/embedder.py)

- Embedded all 889 chunks using `nomic-embed-text-v1.5` via LM Studio's OpenAI-compatible API at localhost:1234
- Prepends contextual_summary to chunk text before embedding (Anthropic's recommended approach)
- Batch size: 32 chunks per request
- 768-dimensional vectors
- Completed in ~2 minutes

### Step 6: BM25 Index (rank_bm25)

- Built a BM25Okapi sparse index for keyword retrieval
- Simple whitespace tokenization with lowercasing
- Serialized to disk via pickle (2.8 MB)
- Also saved chunk metadata separately as JSON for retrieval lookup
- Completed in ~10 seconds

### Step 7: LanceDB Vector Store

- Stored all 889 vectors + metadata in LanceDB (zero-infrastructure, file-based)
- Each record includes: chunk_id, source_type, source_file, title, section, text, contextual_summary, vector, word_count, has_table, has_formula
- Database size: ~3 MB
- Completed in ~10 seconds

### Step 8: Hybrid Retrieval + Reranking (pipeline/retriever.py)

- Built full retrieval pipeline:
  1. Dense retrieval via LanceDB cosine search (top 20)
  2. BM25 keyword retrieval (top 20)
  3. Reciprocal Rank Fusion to merge results (k=60)
  4. Cross-encoder reranking via `BAAI/bge-reranker-base`
- All models lazy-loaded as singletons
- Reranker auto-downloads from HuggingFace on first use (~420 MB)

### Step 9: CLI Interface (query.py)

- Built command-line query tool with flags: `--top`, `--source`, `--no-rerank`, `--format`, `--stats`
- Tested successfully with "SPICED framework" query — returned 3 highly relevant results from website + PDF sources

---

## What We Learned

### Architecture Decisions That Worked

**LM Studio for embeddings was the right call.** Already installed, already had nomic-embed-text loaded, OpenAI-compatible API made integration trivial. No need for Ollama as a separate service.

**LanceDB over ChromaDB/Weaviate/Milvus.** Zero infrastructure. No Docker, no server process, just a directory. Perfect for a single-user knowledge base on a powerful local machine.

**Hybrid retrieval (BM25 + dense) matters for this domain.** WbD content has lots of specific terminology (CR4, VM1, SPICED, Bowtie) that pure semantic search misses. BM25 catches exact keyword matches that dense retrieval can miss.

**Contextual summaries dramatically improve retrieval quality.** By prepending a summary of what each chunk is about before embedding, the dense vectors capture not just what the text says but what it means in context. This is the core insight from Anthropic's contextual retrieval paper.

### Things That Broke

**Sequential contextual summaries were a dead end.** The first run attempted to generate 889 summaries one at a time, but the background process got stuck (broken pipe from `head -10` in the launch command) and produced 0 summaries. Switching to parallel processing with `ThreadPoolExecutor` fixed this and cut generation time from theoretical hours to 3 minutes.

**Rate limiting is real.** Even with the user's API proxy, 10 parallel workers hit rate limits on ~4% of requests. The fallback mechanism (auto-generated summaries from title + section) was essential. For a production system, exponential backoff would be better.

**Embed + Store must run together.** The original `build_index.py` had a design gap: `--embed` generates vectors in memory but `--store` reads from disk. Running them as separate steps loses the vectors. The fix was to combine them into a single script that embeds, saves to JSON, then stores in LanceDB.

**First query is slow (~100 seconds).** The cross-encoder model downloads from HuggingFace on first use (~420 MB). Subsequent queries run in ~2-3 seconds.

### Performance Benchmarks

| Metric | Result |
|---|---|
| Total source text | 547,176 words |
| Total chunks | 889 |
| Contextual summaries (real) | 852 (95.8%) |
| Contextual summaries (fallback) | 37 (4.2%) |
| Embedding dimensions | 768 |
| LanceDB rows | 889 |
| BM25 index size | 2.8 MB |
| LanceDB size | ~3 MB |
| Full build time | ~8 minutes (chunking + summaries + embedding + indexing) |
| Query latency (warm) | ~2-3 seconds |
| Query latency (cold, first run) | ~100 seconds (model download) |
| Pipeline cost | $0/month (all local) |

---

## File Map

```
~/wbd-rag/
├── venv/                               # Python 3.14 environment
├── pipeline/
│   ├── chunker.py                      # Source text → 889 chunks
│   ├── contextual.py                   # Parallel contextual summary generation
│   ├── embedder.py                     # LM Studio embedding client (nomic-embed-text)
│   └── retriever.py                    # Hybrid retrieval: BM25 + dense + RRF + rerank
├── data/
│   ├── chunks/
│   │   ├── all_chunks.json             # 889 raw chunks (3.4 MB)
│   │   ├── pdf_chunks.json             # 88 PDF chunks
│   │   ├── website_chunks.json         # 317 website chunks
│   │   └── youtube_chunks.json         # 484 YouTube chunks
│   ├── contextual/
│   │   └── contextual_chunks.json      # Chunks + summaries + vectors (22.1 MB)
│   ├── bm25.pkl                        # Serialized BM25 index (2.8 MB)
│   └── bm25_meta.json                  # Chunk metadata for BM25 lookup (3.4 MB)
├── lancedb/                            # LanceDB vector database
├── build_index.py                      # Pipeline orchestration (5 steps)
└── query.py                            # CLI query interface

Google Drive (source files):
Revenue Architecture/
├── 01_pdf_extraction/pdf_full_text.txt
├── 02_website_research/research_*.txt
├── 03_youtube_transcripts/processed/*.md
├── 04_synthesis/reconciliation_report.md
├── 05_rag_output/
│   ├── L2_knowledge_base.md            # L2 cached knowledge (20.8K words)
│   ├── L3_pipeline_spec.md             # Original pipeline specification
│   ├── RAG_AGENT_GUIDE.md              # Agent instruction guide
│   ├── RAG_BUILD_RETROSPECTIVE.md      # This document
│   └── system_prompt_v2.md             # L1 system prompt
```

---

## What's Left

The pipeline is fully operational. Potential next steps:

1. **Evaluation harness** — Build a test set of 20-30 known-answer queries and measure recall/precision
2. **Query expansion** — Use a local LLM to expand single queries into multiple search queries for better coverage
3. **L1/L2/L3 integration** — Wire the retrieval pipeline into a Claude API call that assembles L1 prompt + L2 cached context + L3 retrieved chunks
4. **Incremental updates** — Add support for adding new source files without rebuilding the entire index
5. **Agent-Zero integration** — Expose the retrieval pipeline to Agent-Zero for agentic RAG workflows
