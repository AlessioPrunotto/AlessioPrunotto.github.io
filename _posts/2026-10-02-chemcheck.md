---
title: 'Before You Trust the Model, Check the Molecules'
date: 2026-10-02
permalink: /posts/2026/10/chemcheck-dataset-audit/
tags:
  - chemcheck
  - molecular machine learning
  - dataset curation
  - data quality
  - data leakage
---


Modern molecular machine learning can make a weak dataset look remarkably convincing.

Even though your model trains successfully, cross-validation scores look competitive and the test set confirms the result, it may still all be due to duplicated compounds, inconsistent structures, conflicting measurements, or test molecules that are nearly identical to molecules seen during training.

These are not hypothetical edge cases: they have compromised published datasets, modeling challenges, and widely used benchmarks.

That is the motivation behind [`chemcheck`](https://github.com/AlessioPrunotto/chemcheck): an open-source audit tool for molecular datasets. It applies a collection of chemistry-aware and machine-learning-aware checks before a dataset is trained on, published, or trusted.

## Chemical data errors are not rare curiosities

A landmark analysis by Fourches, Muratov, and Tropsha examined how chemical structure curation affects QSAR research. Their examples show how quickly apparently minor data problems become modeling problems.

In the NCI AIDS Antiviral Screen, approximately 4,200 of 42,687 records (about 10%) required special treatment or removal. These included 3,350 mixtures and salts, as well as 741 pairs of exact duplicates or stereoisomers associated with different or even opposite activities.

The same study re-examined an aquatic-toxicity dataset used by multiple modeling teams and later by the CADASTER challenge (a public challenge to predict chemical toxicity from molecular structures). Its external evaluation set contained eight compounds, out of 120, that were structurally identical to compounds in the modeling set but carried different toxicity values.

This creates two problems simultaneously. The test set is no longer independent, and the model is being evaluated against contradictory evidence.

The researchers also described a 7,090-compound Ames mutagenicity dataset containing 518 duplicate pairs. Across repeated random splits, between 229 and 255 of those pairs landed on opposite sides of the training–validation boundary. Models built on the uncurated data consequently received an overly optimistic estimate of predictivity. After curation, the models became more balanced: the gap between specificity and sensitivity decreased from roughly 8–12 percentage points to about 2. The investigation also identified 31 compounds whose original biological annotations were contradicted by published evidence.

These were not abstract recommendations about ideal data hygiene. Duplicates, conflicting annotations, salts, inconsistent representations, and train–test contamination changed the conclusions that could be drawn from real modeling exercises. [Fourches, Muratov, and Tropsha, 2010](https://pmc.ncbi.nlm.nih.gov/articles/PMC2989419/)

## Sometimes the benchmark itself is compromised

The same paper recounts an even more direct failure: the QSARWorld 2008 oral-bioavailability challenge.

The supposedly blind test-set measurements were publicly accessible while the challenge was running. The supplied files also retained identifiers that could be traced back to the source database. Beyond this explicit leakage, the dataset contained chemically identical records under different names and experimental values that differed by 8–43%. The reported best model had an RMSE of approximately 30 percentage points over a response range of 0–100%.

In summary, we can conclude that a sophisticated evaluation protocol cannot save a bad dataset. If the identities, labels, or structures cross the boundary between training and testing, the benchmark will end up being severely compromised.

## Random splitting can reward memorization

Exact duplicates are the most visible form of leakage, whereas molecular similarity makes the problem more subtle.

Medicinal chemistry datasets are rarely collections of independent random molecules. They are often organized around chemical series: many compounds share a core scaffold and differ by one or two substituents. A random split can distribute members of the same series across training and testing.

<img src="/images/blog_figures/leakage.png" alt="Three levels of train–test similarity: an identical molecule crossing the split, close analogues sharing a scaffold, and a genuinely novel test scaffold." width="800">

*A random split can test memorization or interpolation instead of generalization.*

Wallach and Heifets studied seven widely used ligand-classification benchmarks and introduced a measure of training–validation redundancy. They found that benchmark bias strongly correlated with predictive performance across properties, fingerprints, similarity measures, and previously applied debiasing procedures. Their conclusion was that much of the reported performance could plausibly be explained by overfitting to benchmark redundancy rather than by prospective generalization. [Wallach and Heifets, 2018](https://pubs.acs.org/doi/10.1021/acs.jcim.7b00403)

More recently, the authors of DataSAIL compared random and leakage-reduced splits across molecular and biomedical prediction tasks. Lower similarity leakage was associated with harder evaluations and larger performance drops, showing that models struggled when test entities were genuinely dissimilar from their training data. [Joeres, Blumenthal, and Kalinina, 2025](https://www.nature.com/articles/s41467-025-58606-8)

We can therefore say that a high score is meaningful if the question that it's trying to answer is coherent with the split. If the intended application is lead optimization within an existing series, close train–test analogs may be appropriate. If the claim is generalization to new chemotypes, the same split may be seriously misleading.

## Dataset bias can masquerade as learned chemistry

The DUD-E virtual-screening benchmark provides another instructive case.

Researchers testing convolutional neural networks found that apparently strong enrichment performance could be attributed largely to analogue bias and to systematic differences introduced during decoy selection. The models could distinguish actives from decoys without learning the intended physics of protein–ligand recognition. Additional deep-learning models trained on protein–ligand structures did not, on average, outperform AutoDock Vina when tested under the study’s controls.

The model was learning something real, just not general enough to be extended in a real-case scenario. [Chen et al., 2019](https://pmc.ncbi.nlm.nih.gov/articles/PMC6701836/)

This is why chemical-space composition matters. A dataset dominated by a few scaffolds, unusually easy decoys, or a narrow structural domain can support excellent internal metrics while providing little evidence about performance elsewhere.

A 2025 study examining coverage across widely used small-molecule datasets found that many lacked uniform coverage of known biomolecular structure space. The authors emphasized that even scaffold-based evaluation only supports conclusions within the chemical space represented by the dataset. [Kretschmer et al., 2025](https://www.nature.com/articles/s41467-024-55462-w)

## What `chemcheck` does

`chemcheck` provides a preliminary audit for molecular datasets:

![The chemcheck workflow: molecular data passes through five audit areas and produces prioritized findings with evidence and recommended actions, available as terminal, JSON, HTML, or JUnit output.](/images/blog_figures/chemcheck-scheme.svg)

*`chemcheck` connects each finding to affected rows and evidence, then outputs results in both machine-readable and human-readable formats.*

```bash
chemcheck dataset.csv
```

For a predefined train–test split:

```bash
chemcheck train.csv test.csv --label-col activity
```

For fold-based data:

```bash
chemcheck dataset.csv --split-col fold --test-value 0
```

The audit covers five broad areas:

1. **Chemical integrity**  
   Invalid SMILES, valence and aromaticity problems, suspicious charges, disconnected components, isotopes, radicals, unspecified stereochemistry, and tautomer ambiguity.

2. **Duplicate structures**  
   Exact and canonical duplicates, stereochemical collisions, salt and tautomer duplicates, and highly similar molecular pairs.

3. **Split leakage**  
   Identical structures across splits, close train–test analogs, near-duplicates, scaffold overlap, and suspiciously easy test sets.

4. **ML readiness**  
   Repeated measurements, conflicting labels, target-distribution shift, label outliers, and cases in which split membership predicts the target.

5. **Chemical-space coverage**  
   Rare elements and functional groups, unusual ring systems, scaffold concentration, representation bias, and isolated molecules.

Findings contain identifiers of the affected rows, evidence examples, and a recommended next action. Reports can be emitted as terminal output, JSON, HTML, or JUnit XML.

For example:

```bash
chemcheck dataset.sdf \
  --split-col split \
  --fail-on error \
  --format junit \
  --output chemcheck.xml
```

The command returns pytest-like exit codes, making it possible to prevent a dataset with invalid structures, contradictory measurements, or direct split leakage from quietly entering a training pipeline.

## An audit is not an automatic verdict

`chemcheck` **deliberately reports, rather than silently rewriting data**.

A salt is not always an error; scaffold overlap may be acceptable for one application and invalidating for another; two different measurements for the same molecule may reflect a labeling mistake, different assay conditions, or genuine experimental variability.

The tool’s 0–100 score is therefore a prioritization heuristic, not a scientifically validated measure of dataset fitness. Its purpose is to help researchers decide where to investigate first. The row-level evidence remains more important than the number.

Likewise, `chemcheck` cannot prove that a model will generalize prospectively. It does not replace assay review, domain expertise, experimental replication, or a split designed around the intended deployment scenario.

What it can do is make common failure modes visible early, before weeks of modeling turn a data-quality problem into a model-selection problem.

## The cheapest model improvement may happen before training

In molecular machine learning, most attention goes to architectures, representations, hyperparameters, and scale. But no modeling technique can recover information that the dataset does not contain, distinguish contradictory labels without uncertainty information, or make a contaminated test set independent again.

The literature shows that molecular data problems have:

- inflated validation performance;
- caused models to reward memorization;
- hidden benchmark bias behind impressive metrics;
- produced inconsistent or unusable QSAR models;
- compromised supposedly blind challenges;
- and obscured the true domain in which predictions were reliable.

Dataset auditing is therefore not administrative cleanup performed after the interesting work. It is part of the scientific method.

Before asking which model has better performances, it is worth asking a simpler question:

**Are the molecules, measurements, and splits providing the model with an honest test?**
