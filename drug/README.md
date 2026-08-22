# Website figures — gastric-cancer-atlas / results.html

Fills the scRNA-seq placeholders at the bottom of
<https://fangchiliu.github.io/gastric-cancer-atlas/results.html> with real figures
from `so_Kumar_clustered.rds` (Kumar et al. 2022, 147,181 cells, 25 cell types,
36 samples from 27 donors), plus a new INHBA target-biology section.

## Deploy

```bash
cp website/plots/*.jpg   <site-repo>/real_data/plots/
```

Two HTML fragments to paste, each with instructions at its top:
`results_scRNA_sections.html` (Modules 4 + 5) and `results_module6_structure.html`
(Module 6, the 3D structure viewer — needs one extra `<script>` before `</body>`).

Then open `website/results_scRNA_sections.html` and follow the paste instructions
at the top: delete the existing `<!-- ── 4. scRNA-seq Deconvolution ── -->`
section from `results.html` and paste the file's contents in its place, inside
`<main>`. It uses only classes that already exist in `assets/style.css`
(`.result-section`, `.figure-card`, `.chart-placeholder`, `.finding-chip`, …), so
no CSS changes are needed. Images drop into the existing lightbox automatically.

## Figures

| File | Fills | What it shows |
|---|---|---|
| `sc_umap_celltypes.jpg` | "UMAP — Cell Type Clusters" | 2D Harmony UMAP, 25 cell types, same hexes as the interactive 3D UMAP |
| `sc_tme_composition.jpg` | "TME Composition — Stacked Bar" | Compartment fractions per sample; immune 52% → 71%, epithelium 33% → 16% |
| `sc_composition_shift.jpg` | (new, replaces nothing) | Log2 FC in cell-type proportion, tumour vs normal, Wilcoxon on sample-level proportions |
| `sc_INHBA_umap.jpg` | Module 5 | INHBA on the UMAP, normal vs tumour |
| `sc_INHBA_celltype_dotplot.jpg` | Module 5 | % expressing × mean level, per cell type × tissue |
| `sc_INHBA_source.jpg` | Module 5 | Fold change in % INHBA+ per type (Fisher exact) + composition of the INHBA+ pool |
| `sc_INHBA_signaling_axis.jpg` | Module 5 | Ligand / receptor / SMAD-target panel across tumour cell types |

### Pipeline QC / PCA panels (restyled from `plots/*.png`)

Title only, no subtitles, same theme as above. Originals in `plots/*.png` are left untouched.

| File | Shows |
|---|---|
| `QC_violin_by_disease.jpg` | Genes, UMIs, mito %, ribo % by tissue; medians labelled |
| `QC_scatter.jpg` | UMI vs mito % and UMI vs genes, Pearson r annotated |
| `PCA_elbow.jpg` | Elbow, all studies, 30 PCs retained marked |
| `PCA_by_study_disease.jpg` | PC1/PC2 by study and by tissue |
| `Kumar_PCA_elbow.jpg` | Elbow, Kumar subset |
| `Kumar_PCA_donor_disease.jpg` | PC1/PC2 by donor (27) and by tissue |
| `Kumar_UMAP_clusters_disease.jpg` | 27 Harmony clusters + tissue of origin |
| `Kumar_UMAP_celltype_donor.jpg` | Cell types + donor mixing |

Deliberate changes from the Seurat defaults:

- **Log10 axes** on UMI count and genes detected — the raw scale collapsed both into a spike at zero (UMIs reach 160,000).
- **Elbow plots mark the 30 PCs** actually retained by the pipeline.
- **`PCA_by_study_disease` title states the confound.** Study x disease is not merely correlated, it is complete: Kumar contributes all 116,284 tumour cells, and Nowicki-Osuch (51,677), Sathe (12,157) and Wang (12,804) are 100% normal. The "by tissue" panel is therefore close to a "Kumar vs not-Kumar" panel, which is why the analysis is later restricted to Kumar.
- Two scRNA-seq figures were **re-encoded** so they stay decodable with no caption:
  `sc_composition_shift` maps significance to bar fill instead of asterisks, and
  `sc_INHBA_umap` puts the zero-expression grey on the colourbar itself.
- Kumar PCA axes are **not clipped** despite a long PC1 tail to 48.6 — the tail is a real sparse population, not outliers, so clipping would misrepresent it.

All rendered 300 dpi JPEG on white via `save_site()`, matching the existing
`real_data/plots/*.jpg` panels (bold black title, grey subtitle, light grid, no
panel border, red `#E84C5B` / blue `#3D7EA6` / orange `#F5A623` palette).
**All 15 figures are title-only** — no subtitles, no captions.

## Module 6 — activin A structure viewer

No figures, no GPU, no docking: an interactive 3Dmol.js panel that streams
coordinates live from RCSB.

- **6Y6N** — mature activin A + ODQ, X-ray 2.03 A
- **6Y6O** — mature activin A + OCK, X-ray 2.04 A

ODQ and OCK are benzodiazepine-2,5-diones (246 and 260 Da) that differ by a single
methylene (N-methyl vs N-ethyl). Both are **co-crystallised ligands with experimental
poses** — the SMILES in `drug_discovery/repos/DiffDock/batch.csv` match the PDB
chemical components exactly, and `activinA_6Y6N.pdb` there has its HETATM records
stripped, so that planned DiffDock run was a re-docking validation, not discovery.
For display purposes the crystal pose is strictly better than a prediction.

Left viewer: dimer cartoon (chain A teal, chain B blue) with the ligand in sticks
plus a translucent VDW halo so a 250 Da fragment is findable inside a dimer;
optional 4.5 A contact residues. Right viewer: ligand alone, ball-and-stick, slow
spin. Same scroll-safe "Enable 3D Interaction" gate as the existing 3D panels.

Context worth keeping in the copy: activin A is a protein-protein-interaction target
with only 3 compounds in ChEMBL against the human inhibin beta A chain. Everything
clinical is a biologic — garetosmab (anti-activin A mAb, FOP) and sotatercept
(ActRIIA-Fc trap, approved for PAH).

## Headline result

INHBA is **stromal, not epithelial**:

| Cell type | % INHBA+ normal | % INHBA+ tumour | Fold | FDR |
|---|---|---|---|---|
| Fibroblasts | 1.52% | **20.97%** | 13.4× | 4.7e-191 |
| Endothelial | 0.06% | 1.03% | 10.2× | 2.9e-05 |
| T-Cells | 0.06% | 0.30% | 3.2× | 3.8e-04 |
| Macrophages | 17.98% | 18.41% | 1.02× | n.s. (constitutive) |
| Malignant epithelium | 0.80% | 1.34% | 1.6× | n.s. (not a source) |

This explains the Module 3 paradox on the page: INHBA correlates with EMT/stroma
and anti-correlates with E2F/MYC/OxPhos because a bulk sample high in INHBA is a
sample high in activated stroma, hence proportionally lower in proliferating
malignant epithelium. Receiver side: `ACVR1B` tracks epithelial lineages (13.8%
of malignant cells vs 0.9% of T cells) while fibroblasts carry `ACVR1`/`TGFBR2`
and high `SERPINE1` — a paracrine fibroblast→tumour axis plus a fibroblast
autocrine loop.

## Scripts

Run in order. R 4.4.2 at `/gsc/software/linux-x86_64-rocky9/R-4.4.2/bin/Rscript`,
from the `GC_N_CellXGene` directory.

| Script | Runtime | Notes |
|---|---|---|
| `scripts/00_theme_site.R` | — | sourced by the others; theme, palette, `save_site()` |
| `scripts/01_extract_INHBA_panel.R` | ~10 min | loads the 1.5 GB Seurat object **once**, writes a 70-gene per-cell panel to `data/Kumar_INHBA_panel_percell.csv.gz` |
| `scripts/02_module4_atlas.R` | ~2 min | reads `exports/Kumar_UMAP_coords_labels.csv` only |
| `scripts/03_module5_INHBA.R` | ~1 min | reads the panel CSV only |
| `scripts/04_extract_qc_pca.R` | ~12 min | loads the three big objects once (unfiltered, GC-vs-N PCA, Kumar); writes QC + PCA CSVs |
| `scripts/05_qc_pca_figures.R` | ~4 min | the eight restyled QC/PCA/UMAP panels; reads CSVs only |

Only step 01 touches the big object, so iterating on figure design is fast.

## Data written

- `data/Kumar_INHBA_panel_percell.csv.gz` — 147,181 cells × (UMAP 2D/3D, metadata, 70 panel genes)
- `data/INHBA_panel_gene_groups.csv` — gene → group map (ligand / receptor / downstream / CAF / EMT / …)
- `data/INHBA_by_celltype_disease.csv`, `data/INHBA_source_stats.csv`, `data/INHBA_axis_stats.csv`
- `data/celltype_composition_stats.csv`
- `data/qc_gcvn_unfiltered.csv.gz` — 228,770 cells x QC metrics + disease
- `data/pca_gcvn.csv.gz`, `data/pca_gcvn_stdev.csv` — PC1/PC2 + Study + disease, 50 PC stdevs
- `data/pca_kumar.csv.gz`, `data/pca_kumar_stdev.csv` — same for the Kumar subset

## Caveats

The figures no longer carry captions, so these live in the prose of
`results_scRNA_sections.html` (figure-card text, the Key Finding boxes, and the
small-print Caveats paragraph at the end of Module 5). Keep them there.

- Single-cell fractions reflect what dissociates and is captured — they index but
  do not equal tissue composition.
- Droplet scRNA-seq is shallow, so "% expressing" understates prevalence for every
  gene; the tumour/normal contrast is the interpretable quantity.
- Only the malignant compartment clears FDR < 0.05 in the composition test
  (26 tumour vs 10 normal samples); the rest of that ranking is descriptive.
- Kumar et al. is independent of TCGA-STAD — it explains the bulk result
  mechanistically, it does not re-derive it in the same patients.
