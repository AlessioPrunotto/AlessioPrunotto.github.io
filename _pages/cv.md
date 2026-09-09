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
  <p class="cv-lead__role">Computational Chemist · Chemical Data Scientist</p>
  <p class="cv-lead__contact">
    {% if site.author.location %}{{ site.author.location }}{% endif %}{% if site.author.email %} · <a href="mailto:{{ site.author.email }}">Email</a>{% endif %}{% if site.author.linkedin %} · <a href="https://www.linkedin.com/in/{{ site.author.linkedin }}">LinkedIn</a>{% endif %}{% if site.author.github %} · <a href="https://github.com/{{ site.author.github }}">GitHub</a>{% endif %}{% if site.author.googlescholar %} · <a href="{{ site.author.googlescholar }}">Google Scholar</a>{% endif %}
  </p>
  <a class="btn btn--primary" href="{{ base_path }}/files/cv.pdf"><i class="fa-solid fa-download" aria-hidden="true"></i> Download CV</a>
</header>

<section class="cv-interests" aria-label="Research interests">
  <h2 class="cv-interests__label">Research interests</h2>
  <ul class="cv-interests__pills">
    <li>Computational Chemistry</li>
    <li>Chemoinformatics</li>
    <li>Machine Learning</li>
    <li>Drug Discovery</li>
    <li>Molecular Design</li>
  </ul>
</section>

<section class="cv-highlights" aria-label="Highlights">
  <h2 class="cv-highlights__label">Highlights</h2>
  <div class="cv-highlights__grid">
    <article class="highlight-card">
      <p class="highlight-card__stat">{{ site.publications.size }}+</p>
      <h3 class="highlight-card__title">Publications</h3>
      <p class="highlight-card__text">Peer-reviewed research in computational chemistry and drug discovery.</p>
    </article>
    <article class="highlight-card">
      <h3 class="highlight-card__title">Industry + academic experience</h3>
      <p class="highlight-card__text">Experience spanning pharmaceutical R&D, computational chemistry and academic research.</p>
    </article>
    <article class="highlight-card">
      <h3 class="highlight-card__title">Drug discovery</h3>
      <p class="highlight-card__text">Experience across molecular modeling, docking, molecular dynamics and computational screening.</p>
    </article>
    <article class="highlight-card">
      <h3 class="highlight-card__title">Chemical AI / automation</h3>
      <p class="highlight-card__text">Development of predictive and automated computational workflows.</p>
    </article>
  </div>
</section>

<div class="cv-modern" markdown="1">

<section class="cv-block cv-block--experience" markdown="1">
## Work Experience

### Chemical Data Scientist - [Synple Chem](https://www.synplechem.com/) (Zurich, Switzerland)
*Aug 2025 → present*

- **Build and validate** predictive models for chemical reactivity and solubility, physics-based and ML-based
- **Integrate** model outputs into automated synthesis workflows

### Drug Hunter / Computational Chemist - [Aqemia](https://www.aqemia.com/) (Paris, France)
*Feb 2022 → Jul 2025*

- **Contributed to** early-stage drug discovery programs using protein modeling, molecular docking and molecular dynamics
- **Led initiatives** to automate and scale computational analyses, including MD trajectory analysis and ligand-pose assessment
- **Developed** computational workflows for evaluating protein–ligand interactions and ligand binding poses

### Postdoctoral Researcher - [Computer-aided Molecular Engineering group](https://www.unil.ch/dof/en/home/menuinst/research-labs/zoete.html) (Lausanne, Switzerland)
*Nov 2020 → Jan 2022*

Supervisor: [Prof. Vincent Zoete](https://www.sib.swiss/vincent-zoete-group)

- **Developed** interaction-fingerprint methods to post-process docking outputs and assess ligand-pose quality
- **Built** a Rosetta-based scoring method for pMHC specificity towards T-cell receptors

### Graduate Researcher - [Laboratory for Biomolecular Modeling](https://www.epfl.ch/labs/lbm/) at École Polytechnique Fédérale de Lausanne (EPFL, Lausanne, Switzerland)
*Jul 2015 → Oct 2020*

Supervisor: [Prof. Matteo Dal Peraro](https://people.epfl.ch/matteo.dalperaro?lang=en)

- **Characterized** membrane-binding mechanisms of two peripheral membrane proteins (NDM-1, Golph3), identifying candidate allosteric sites
- **Proposed** experimentally testable hypotheses from simulation data across several collaborative projects

### Research Assistant at the [Laboratory for Biomolecular Modeling](https://www.epfl.ch/labs/lbm/) at École Polytechnique Fédérale de Lausanne (EPFL, Lausanne, Switzerland)
*Jan 2015 → Jun 2015*

Supervisor: [Prof. Matteo Dal Peraro](https://people.epfl.ch/matteo.dalperaro?lang=en)

- **Characterized** aggregating properties of 

### Research Assistant at the [Computational Biophysics group](https://m3.dti.supsi.ch/) at University of Applied Sciences and Arts of Southern Switzerland (Lugano, Switzerland)
*Jan 2013 → Dec 2014*

Supervisor: [Prof. Andrea Danani](https://www.supsi.ch/en/andrea-danani)

- **Contributed to** multiple structure-based drug discovery projects, including TLR7 mechanism-of-action studies
- **Supervised** a potency-optimization project for a GHS-R inverse agonist

### Visiting student at the [Li Ka Shing Institute of Virology](https://www.ualberta.ca/en/li-ka-shing-institute-virology/index.html) at University of Alberta, Edmonton, Canada
*Apr 2012 → Oct 2012*

Supervisors: [Prof. Michael Houghton](https://apps.ualberta.ca/directory/person/mhoughto), [Prof. Jack Tuszynski](https://apps.ualberta.ca/directory/person/jackt)

- **Automated** the search for NS5B (hepatitis C polymerase) inhibitors via docking, homology modelling, MD and free-energy calculations (Master's final project)
</section>

<section class="cv-block cv-block--education" markdown="1">
## Education

- Ph.D in Computational Biology / Computational Chemistry, École Polytechnique Fédérale de Lausanne (EPFL)
- M.Sc. in Biomedical Engineering, Polytechnic University of Turin
- B.Sc. in Biomedical Engineering, Polytechnic University of Turin
</section>

<section class="cv-block cv-block--skills" markdown="1">
## Expertise

**Computational chemistry**

- Molecular docking
- Molecular dynamics
- Protein modeling
- Structure-based drug design

**Cheminformatics & data science**

- Chemical data analysis
- Molecular representations
- Machine learning
- Predictive modeling

**Drug discovery**

- Virtual screening
- Protein–ligand interactions
- Molecular design

**Programming & tools**

- Python
- RDKit
- PyTorch
- scikit-learn
- pandas
- NumPy
- AutoDock Vina
- GROMACS
- Rosetta
- Git
- Linux
- SLURM
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
