# Gastric Cancer Transcriptomic Atlas

A static research portfolio presenting a multi-modal bioinformatics study of gastric cancer (stomach adenocarcinoma, STAD).

## Study overview

- **Bulk RNA-seq**: TCGA-STAD cohort (N = 375 patients) accessed via UCSC Xena
- **Single-cell RNA-seq**: CZ CELLxGENE gastric cancer datasets
- **Goal**: Integrate bulk and single-cell transcriptomics to characterize tumor heterogeneity, identify cell-type-specific gene programs, and map their clinical relevance in STAD

## Site structure

| Page | Description |
|------|-------------|
| `index.html` | Overview & key findings |
| `methods.html` | Data sources, preprocessing, and analytical pipeline |
| `results.html` | Figures, UMAP embeddings, survival analyses |
| `about.html` | Study authors and contact |

## Live site

Deployed via GitHub Pages: **https://fangchiliu.github.io/gastric-cancer-atlas/**

## Local development

No build step required — open any `.html` file directly in a browser, or serve locally:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.
