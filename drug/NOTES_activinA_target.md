# Activin A / INHBA — target briefing

Handoff notes for writing website copy. Every factual claim below is tagged with
where it came from so the copy can be written without re-deriving anything.
Nothing here is a recommendation to make a therapeutic claim.

---

## TL;DR

We have a **solid, well-evidenced target-biology story** and **essentially no drug story**.
The website copy should reflect that asymmetry. The compounds in the structures are
fragment-screening artefacts from a *chemistry methodology* paper, not drug candidates,
and the only agents that have reached patients are antibodies and Fc traps developed for
entirely different diseases.

The defensible headline is **"INHBA marks a CAF-derived, activin A–driven stromal
phenotype in gastric cancer"** — a biomarker/mechanism claim. It is *not*
"we found a drug for gastric cancer."

---

## 1. The evidence chain (all verified in this project)

| Step | Finding | Source |
|---|---|---|
| Bulk DE | INHBA log2FC ≈ 3.5, −log10 p_adj ≈ 52, tumour vs normal | TCGA-STAD, DESeq2 (already on site) |
| Replication | Independent confirmation, Wilcoxon p < 0.0001 | GSE66229 ACRG microarray (already on site) |
| Survival | High INHBA → worse 5-yr OS, log-rank p = 0.023 | TCGA-STAD median split (already on site) |
| Co-expression | EMT is the top co-regulated Hallmark set, NES = 3.76 | fgsea on INHBA Spearman ranks (already on site) |
| **Cell of origin** | **Fibroblasts 1.52% → 20.97% INHBA+, 13.4×, Fisher FDR = 4.7e-191** | Kumar et al. 2022, this analysis |
| Not the tumour | Malignant epithelium 0.80% → 1.34%, n.s. | same |
| Constitutive source | Macrophages ~18% in *both* tissues, n.s. | same |
| Subunit fate | INHA ~0.12% → βA cannot become inhibin A; it must homodimerise to activin A | same |
| Receiver | ACVR1B on epithelium (13.8% of malignant cells vs 0.9% of T cells) | same |
| Autocrine loop | Fibroblasts carry ACVR1 20.1%, TGFBR2 42.8%, SERPINE1 40.8% | same |
| Built-in brake | Among INHBA+ CAFs: FSTL3 46%, FST 20% co-expressed | same |
| Parallel ligand | Endothelium expresses INHBB 20.8% → activin B via the same ALK4/SMAD2/3 route | same |

**The single most useful thing this project added:** the bulk INHBA signal is *stromal*.
That resolves the Module 3 paradox (INHBA anti-correlates with E2F/MYC/OxPhos) — a sample
rich in INHBA is rich in activated stroma and therefore proportionally poorer in
proliferating epithelium. It is a compartment effect, not a tumour-cell program.

---

## 2. What ODQ and OCK actually are — read this before writing anything

These are **not drugs**. They are not even a drug programme.

- **ODQ** — (3R)-3,4-dimethyl-3-propyl-1H-1,4-benzodiazepine-2,5-dione, C14H18N2O2, 246.31 Da → PDB **6Y6N**, 2.03 Å
- **OCK** — (3R)-4-ethyl-3-methyl-3-propyl-1H-1,4-benzodiazepine-2,5-dione, C15H20N2O2, 260.33 Da → PDB **6Y6O**, 2.04 Å

Primary citation for both: **Kidd, Fowler, Reinhardt, Compton, Mateu, Newman et al.,
_"Demonstration of the utility of DOS-derived fragment libraries for rapid hit
derivatisation in a multidirectional fashion"_, Chem Sci, 2020.**

That title matters. This is a paper about **diversity-oriented-synthesis fragment library
design**. Activin A was the demonstration target used to show the library produces
derivatisable hits. The compounds exist to prove a chemistry method works, not because
anyone was trying to drug activin A for cancer.

Corroborating: **ChEMBL has no quantitative potency for any small molecule against the
human inhibin βA chain.** The human target (CHEMBL3588735) returns one molecule across
three activity records, and every `standard_value` is null. The assay is an
activin A / ActRIIA-ECD interaction disruption assay — so a PPI-disruption readout exists,
but no number is public.

**Therefore:** we can say these compounds *bind activin A*, because there is a 2.03 Å
crystal structure showing exactly where. We cannot say they *inhibit* it, how potently,
whether they are selective, or whether they do anything in a cell.

---

## 3. Clinical landscape — everything real is a biologic

| Agent | Modality | Status | Indication |
|---|---|---|---|
| **Garetosmab** | anti-activin A monoclonal antibody (Regeneron) | BLA accepted for FDA Priority Review, Aug 2026 target date; reporting indicates approval as garetosmab-grts — **verify current status before publishing** | Fibrodysplasia ossificans progressiva |
| **Sotatercept** (Winrevair) | ActRIIA-Fc ligand trap | FDA approved | Pulmonary arterial hypertension |
| **Luspatercept** (Reblozyl) | modified ActRIIB-Fc trap | FDA approved | Anaemia in MDS / β-thalassaemia |
| Follistatin, FSTL3 | endogenous antagonists | n/a | — |

Neither approved agent was developed for cancer. What they establish is **pathway
drugability and tolerability in humans**, not efficacy in gastric cancer.

Downstream alternative: ALK4/ACVR1B kinase inhibitors (SB-431542, A-83-01, vactosertib,
galunisertib) are conventional small molecules, but they hit the *receptor kinase*, are
generally cross-reactive with ALK5/TGF-βR1, and lose the cell-type specificity that makes
the CAF finding interesting.

---

## 4. My assessment

### What is genuinely strong

1. **Convergence.** Bulk expression, independent-cohort replication, survival association,
   pathway co-expression, and single-cell cell-of-origin all point the same way. That is
   more than most target hypotheses have.
2. **The mechanism is specific and falsifiable.** "CAFs secrete activin A; malignant
   epithelium carries ACVR1B" is a concrete paracrine claim that can be tested directly
   (co-culture, conditioned medium, receptor knockdown).
3. **Subunit commitment.** INHA being absent is a real piece of luck — βA has nowhere to go
   but activin A, so the target isn't diluted across inhibin.
4. **Extracellular target.** A secreted ligand needs no cell penetration, which is exactly
   why the antibody/trap route worked clinically.

### What I would push back on

1. **The survival association is probably confounded with stromal content.** Stroma-rich
   tumours have worse prognosis across many cancers. Since INHBA is a CAF marker here, the
   log-rank p = 0.023 may be reporting *how much stroma the tumour has* rather than
   *activin A dependency*. This is the weakest link in the chain and the copy should not
   lean on survival as evidence of causality. A Cox model adjusted for stromal/purity
   estimates would settle it, and is not yet done.
2. **Small-molecule tractability looks poor.** Secreted cytokine, PPI interface, no active
   site, one compound and zero potency values in ChEMBL, and the only structures come from
   a library-methodology paper. The absence of a competitive small-molecule literature
   after the structures were released in 2021 is itself informative.
3. **Redundancy.** Endothelium supplies activin B through the same ALK4/SMAD2/3 route.
   Blocking activin A alone may be routed around.
4. **The tumour already brakes this pathway.** 46% of INHBA+ CAFs co-express FSTL3, a
   direct SMAD2/3 target — endogenous negative feedback is already engaged. Free rather
   than total activin A is the quantity that matters, and we have not measured it.
5. **Cohort mismatch.** Kumar et al. is independent of TCGA-STAD. We explain the bulk
   result mechanistically; we do not re-derive it in the same patients.
6. **On-target systemic risk.** Activin A is broadly physiological — erythropoiesis,
   reproduction, inflammation, bone. Sotatercept and luspatercept both have haematologic
   effects. Systemic blockade is not free.

### Where I would actually take this

The differentiated contribution here is **not** a therapeutic. It is that INHBA is a
**CAF-derived marker of an invasive, inflamed, stroma-high gastric tumour state**, and that
single-cell data explains a bulk observation that looked paradoxical. That is a real,
publishable, defensible result and it is what the website should foreground.

If a therapeutic angle is wanted, the honest framing is: the pathway is clinically
validated in other diseases by agents that already exist, and the interesting open
question is whether a CAF-high gastric subgroup would be the right population to test
one in — a **stratification hypothesis**, not a discovery claim.

---

## 5. Copy guidance — safe vs unsafe

**Safe to state:**
- INHBA is among the most upregulated genes in gastric tumour vs normal, replicated across two cohorts
- High INHBA expression is associated with worse 5-year overall survival (association)
- Single-cell data localise the source to cancer-associated fibroblasts, not malignant cells
- Activin A is the protein product; crystal structures with bound fragments exist at ~2 Å
- Activin A blockade is clinically validated in other indications by garetosmab and sotatercept
- The fragments bind activin A (a crystal structure shows where)

**Do not state:**
- That we identified, designed, or proposed a drug for gastric cancer
- That ODQ/OCK "inhibit" activin A, or any potency/IC50/Kd figure — none is public
- That INHBA "drives" or "causes" gastric cancer — the data are associative
- That docking was run or produced results — it was never executed
- That garetosmab/sotatercept are used in gastric cancer — they are not
- Anything implying a development programme exists

**Tone:** the strength of this work is that it explains something. Lead with the
explanation, present the chemistry as context for what a target would involve, and let
the caveats do their job — they make the rest more credible, not less.

---

## 6. Open questions worth flagging on the site

1. Does the survival association survive adjustment for tumour purity / stromal fraction?
2. Is free (non-FST/FSTL3-bound) activin A what varies between tumours?
3. Does activin B from endothelium provide a bypass?
4. Would blocking activin A change tumour-cell behaviour in co-culture with CAFs, or is
   the phenotype fibroblast-autonomous?

---

## 7. Provenance of every number

- Bulk DE, survival, GSEA: pre-existing site analyses (TCGA-STAD, GSE66229)
- All single-cell percentages: `website/data/Kumar_INHBA_panel_percell.csv.gz`, derived in
  `website/scripts/01_extract_INHBA_panel.R`; stats in `INHBA_source_stats.csv`
- Ligand identity, formula, MW: RCSB chemical component API (ODQ, OCK)
- Structures/resolutions: RCSB entries 6Y6N, 6Y6O
- Citation: RCSB primary citation for 6Y6N (Chem Sci, 2020)
- ChEMBL counts: target CHEMBL3588735 (human), CHEMBL3588734 (mouse)
- Drug status: see Sources in the session log; **re-verify garetosmab approval before publishing**

Caveats that must survive into any copy: single-cell fractions reflect what dissociates
and is captured; droplet scRNA-seq undercounts, so "% expressing" is comparative not
absolute; only the malignant compartment clears FDR < 0.05 in the composition test
(26 tumour vs 10 normal samples).
