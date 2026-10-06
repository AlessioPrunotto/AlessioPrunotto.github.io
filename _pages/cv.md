---
layout: archive
title: "CV"
permalink: /cv/
author_profile: false
hide_title: true
redirect_from:
  - /resume
---

{% include base_path %}

<header class="cv-lead">
  <h1 class="cv-lead__name">Alessio Prunotto</h1>
  <p class="cv-lead__role">Senior Computational Chemist · Chemical Data Scientist</p>
  <p class="cv-lead__contact">
    {% if site.author.location %}{{ site.author.location }}{% endif %}{% if site.author.email %} · <a href="mailto:{{ site.author.email }}">Email</a>{% endif %}{% if site.author.linkedin %} · <a href="https://www.linkedin.com/in/{{ site.author.linkedin }}">LinkedIn</a>{% endif %}{% if site.author.github %} · <a href="https://github.com/{{ site.author.github }}">GitHub</a>{% endif %}{% if site.author.googlescholar %} · <a href="{{ site.author.googlescholar }}">Google Scholar</a>{% endif %}
  </p>
  <a class="btn btn--primary" href="mailto:{{ site.author.email }}">Full CV available upon request</a>
</header>

<div class="cv-modern" markdown="1">

<section class="cv-block cv-block--summary" aria-label="Professional summary" markdown="1">
  <h2>Professional Summary</h2>
  <p>Computational chemist and chemical data scientist developing physics-based and machine-learning methods for molecular property prediction, compound prioritisation and drug discovery. Experienced in translating chemical data and scientific questions into reproducible computational workflows, models and tools for interdisciplinary teams.</p>
</section>

<section class="cv-block cv-block--experience" markdown="1">
## Work Experience

### Chemical Data Scientist — [Synple Chem](https://www.synplechem.com/) <span class="cv-date">Aug 2025 – Present</span>
Zurich, Switzerland

- Hybrid physics-based and machine-learning models for reaction feasibility and compound properties
- Automate reaction prioritisation and identify compounds unsuitable for synthesis

### Drug Hunter / Computational Chemist — [Aqemia](https://www.aqemia.com/) <span class="cv-date">Feb 2022 – Jul 2025</span>
Paris, France

- Structure-based drug-discovery projects
- Automation of molecular-dynamics trajectory analysis and ligand-pose assessment

### Postdoctoral Researcher <span class="cv-date">Nov 2020 – Jan 2022</span>
[Computer-aided Molecular Engineering group](https://www.unil.ch/dof/en/home/menuinst/research-labs/zoete.html) · Lausanne, Switzerland · Supervisor: [Prof. Vincent Zoete](https://www.sib.swiss/vincent-zoete-group)

- Developed methods to assess protein-peptide specificity

### Doctoral Researcher <span class="cv-date">Jul 2015 – Oct 2020</span>
[Laboratory for Biomolecular Modeling](https://www.epfl.ch/labs/lbm/), EPFL · Lausanne, Switzerland · Supervisor: [Prof. Matteo Dal Peraro](https://people.epfl.ch/matteo.dalperaro?lang=en)

- Elucidated mechanism of action of drug-resistant enzyme NDM-1
- Explained experimental observations related to ligand selectivity and viral-capsid thermostability through molecular simulations

### Research Assistant <span class="cv-date">Jan 2015 – Jun 2015</span>
[Laboratory for Biomolecular Modeling](https://www.epfl.ch/labs/lbm/), EPFL · Lausanne, Switzerland

- Protein aggregation studies through molecular simulations

### Research Assistant <span class="cv-date">Jan 2013 – Dec 2014</span>
[Computational Biophysics group](https://m3.dti.supsi.ch/), University of Applied Sciences and Arts of Southern Switzerland · Lugano, Switzerland · Supervisor: [Prof. Andrea Danani](https://www.supsi.ch/en/andrea-danani)

- Structure-based drug-discovery projects targeting TLR7 and GHS-R

### Visiting Student <span class="cv-date">Apr 2012 – Oct 2012</span>
[Li Ka Shing Institute of Virology](https://www.ualberta.ca/en/li-ka-shing-institute-virology/index.html), University of Alberta · Edmonton, Canada · Supervisors: [Prof. Michael Houghton](https://apps.ualberta.ca/directory/person/mhoughto) (Nobel prize in Medicine 2020), [Prof. Jack Tuszynski](https://apps.ualberta.ca/directory/person/jackt)

- Identified potential inhibitors of hepatitis C NS5B enzyme
</section>

<section class="cv-block cv-block--education" markdown="1">
## Education

<div class="edu-row">
  <p class="edu-degree">Ph.D.</p>
  <div class="edu-detail">
    <p class="edu-field">Computational Chemistry</p>
    <p class="edu-org"><a href="https://www.epfl.ch/">EPFL</a> · Lausanne, Switzerland</p>
  </div>
</div>
<div class="edu-row">
  <p class="edu-degree">M.Sc.</p>
  <div class="edu-detail">
    <p class="edu-field">Biomedical Engineering</p>
    <p class="edu-org"><a href="https://www.polito.it/">Polytechnic University of Turin</a> · Turin, Italy</p>
  </div>
</div>
<div class="edu-row">
  <p class="edu-degree">B.Sc.</p>
  <div class="edu-detail">
    <p class="edu-field">Biomedical Engineering</p>
    <p class="edu-org"><a href="https://www.polito.it/">Polytechnic University of Turin</a> · Turin, Italy</p>
  </div>
</div>
</section>

<section class="cv-block cv-block--skills" markdown="1">
## Technical Skills

**Scientific computing**

*Core skills*

- Workflow automation
- Reproducible analysis
- Data visualisation
- HPC/GPU computing

*Tools*

- Python
- Bash
- SQL
- Git
- Linux
- AWS
- SLURM
- conda

**Chemical data science**

*Core skills*

- Machine learning
- Hybrid physics-based / ML modelling
- Molecular property prediction
- Reactivity prediction
- Cheminformatics

*Tools*

- RDKit
- ChemAxon
- scikit-learn
- XGBoost
- pandas
- NumPy
- SciPy

**Computational chemistry**

*Core skills*

- Structure-based drug design
- Virtual screening
- Docking
- Molecular dynamics
- Binding free-energy calculations
- DFT / semi-empirical methods

*Tools*

- Schrödinger
- GROMACS
- AmberTools
- Rosetta
- AutoDock Vina
- SeeSAR
- PyMOL
- VMD
- xtb
- Gaussian
</section>

<section class="cv-block cv-block--languages" markdown="1">
## Languages

English (C2) · French (C1) · Italian (Native) · Spanish (A2)
</section>

</div>
  
{% comment %}
Talks
======
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html  %}
  {% endfor %}</ul>
  
Teaching
======
  <ul>{% for post in site.teaching reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
Service and leadership
======
* Currently signed in to 43 different slack teams
{% endcomment %}
