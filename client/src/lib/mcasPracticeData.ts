/**
 * MCAS Biology Practice Question Data
 * Questions adapted from Massachusetts MCAS Released Items 2022–2025
 * Expanded 2025-26: 10-12 questions per strand, aligned to benchmark priority standards
 * New additions: 10% rule (HS-LS2-4), codon chart reading (HS-LS1-1),
 *   DNA/amino acid sequence comparisons (HS-LS1-1/LS4-1), speciation (HS-LS4-5)
 */

export interface MCASChoice {
  label: string;
  text: string;
}

export interface MCASQuestion {
  num: number;
  text: string;
  choices: MCASChoice[];
  correct: string;
  explanation: string;
}

export interface MCASStrand {
  id: string;
  strand: string;
  std: string;
  topic: string;
  color: string;
  bg: string;
  border: string;
  keyDates: string;
  highlights: string[];
  readingTitle: string;
  readingPassage: string[];
  questions: MCASQuestion[];
  crPrompt: string;
  crModelAnswer: string;
  crRubric: { points: number; description: string }[];
  studentUrl: string;
  keyUrl: string;
}

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663412359612/DMvDiCYoCpTAKstdhKxsmm";

export const MCAS_PRACTICE_STRANDS: MCASStrand[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // LS1 — Molecules to Organisms
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ls1_cell",
    strand: "LS1 — Molecules to Organisms",
    std: "HS-LS1-1, LS1-4, LS1-6, LS1-7",
    topic: "Cell Transport, Protein Synthesis, Photosynthesis & Cellular Respiration",
    color: "#1565C0",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    keyDates: "May 5–8 & May 11–15",
    highlights: [
      "Osmosis & plasmolysis",
      "Active vs. passive transport",
      "Transcription & translation — codon chart",
      "Photosynthesis & cellular respiration (ATP)",
    ],
    readingTitle: "From DNA to Protein: How Cells Build What They Need",
    readingPassage: [
      "Every protein in your body is built according to instructions encoded in DNA. The process begins in the nucleus with transcription: an enzyme reads a gene and produces a complementary strand of messenger RNA (mRNA). Each three-nucleotide sequence on the mRNA is called a codon, and each codon specifies a particular amino acid.",
      "The mRNA travels out of the nucleus to a ribosome, where translation occurs. Transfer RNA (tRNA) molecules carry amino acids to the ribosome. Each tRNA has an anticodon that pairs with the complementary mRNA codon. The ribosome links amino acids together in the order specified by the mRNA, producing a polypeptide chain that folds into a functional protein.",
      "A codon chart (genetic code table) shows which amino acid each of the 64 possible codons specifies. For example, the codon AUG codes for methionine and also serves as the start codon. The codons UAA, UAG, and UGA are stop codons — they signal the ribosome to release the finished polypeptide.",
      "Cells also require energy to carry out all their functions. Cellular respiration breaks down glucose in the presence of oxygen to produce ATP, carbon dioxide, and water. Photosynthesis does the reverse — it uses solar energy, carbon dioxide, and water to produce glucose and oxygen. Both processes are essential to life.",
    ],
    questions: [
      {
        num: 1,
        text: "A red blood cell is placed in a solution that has a higher solute concentration than the inside of the cell. What will most likely happen to the cell?",
        choices: [
          { label: "A", text: "Water will move into the cell, causing it to swell." },
          { label: "B", text: "Water will move out of the cell, causing it to shrink." },
          { label: "C", text: "Solutes will move into the cell, causing it to swell." },
          { label: "D", text: "Solutes will move out of the cell, causing it to shrink." },
        ],
        correct: "B",
        explanation: "When a cell is placed in a hypertonic solution (higher solute concentration outside), water moves out of the cell by osmosis, causing it to shrink. Solutes do not move through the selectively permeable membrane.",
      },
      {
        num: 2,
        text: "The DNA template strand for a gene has the sequence 3′–TAC–GGA–CTT–5′. What is the mRNA sequence produced during transcription?",
        choices: [
          { label: "A", text: "5′–AUG–CCU–GAA–3′" },
          { label: "B", text: "5′–UAC–GGA–CUU–3′" },
          { label: "C", text: "5′–ATG–CCT–GAA–3′" },
          { label: "D", text: "5′–AUG–GGA–CUU–3′" },
        ],
        correct: "A",
        explanation: "During transcription, RNA polymerase reads the DNA template strand 3′ to 5′ and builds the mRNA 5′ to 3′ using complementary base pairing (A→U, T→A, G→C, C→G). TAC→AUG, GGA→CCU, CTT→GAA. The mRNA is 5′–AUG–CCU–GAA–3′.",
      },
      {
        num: 3,
        text: "Using a codon chart, the mRNA sequence AUG–UCA–GAA codes for the amino acid sequence: Met–Ser–Glu. A mutation changes the second codon from UCA to UCG. What is the most likely effect of this mutation?",
        choices: [
          { label: "A", text: "The protein will be shorter than normal." },
          { label: "B", text: "The amino acid sequence will not change because UCG also codes for Ser." },
          { label: "C", text: "A different amino acid will replace Ser, changing the protein's function." },
          { label: "D", text: "Translation will stop at the second codon." },
        ],
        correct: "B",
        explanation: "UCA and UCG are both codons for serine (Ser) — this is an example of a silent mutation. Because the genetic code is redundant (multiple codons can specify the same amino acid), the change from UCA to UCG does not alter the amino acid sequence or the protein's function.",
      },
      {
        num: 4,
        text: "A mutation changes the codon AUG (Met, start codon) to AUA (Ile) at the beginning of a gene. What is the most likely effect on protein synthesis?",
        choices: [
          { label: "A", text: "The protein will be produced normally with isoleucine at the start." },
          { label: "B", text: "Translation will not begin, so no protein will be produced." },
          { label: "C", text: "The ribosome will skip the first codon and start at the next AUG." },
          { label: "D", text: "The protein will be produced but will be longer than normal." },
        ],
        correct: "B",
        explanation: "AUG is the universal start codon. Ribosomes recognize AUG to begin translation. If the start codon is mutated to AUA, the ribosome cannot initiate translation at that site, and no protein (or a severely truncated protein) will be produced.",
      },
      {
        num: 5,
        text: "Scientists are studying a drug to see how effective it is at reducing the production of usable energy in cells. What should the scientists measure to determine whether the drug is effective?",
        choices: [
          { label: "A", text: "the amount of ATP in cells" },
          { label: "B", text: "the amount of RNA in cells" },
          { label: "C", text: "the number of new cells produced by old cells" },
          { label: "D", text: "the number of nerve signals produced by cells" },
        ],
        correct: "A",
        explanation: "ATP (adenosine triphosphate) is the primary molecule that stores and transfers usable energy in cells. If the drug reduces energy production, ATP levels would decrease. RNA is involved in protein synthesis, not energy production directly.",
      },
      {
        num: 6,
        text: "Phytoplankton are microscopic aquatic organisms that perform photosynthesis. Phytoplankton support other aquatic organisms by producing",
        choices: [
          { label: "A", text: "carbon dioxide." },
          { label: "B", text: "oxygen." },
          { label: "C", text: "salt." },
          { label: "D", text: "water." },
        ],
        correct: "B",
        explanation: "Photosynthesis produces oxygen (O2) as a byproduct when water molecules are split during the light reactions. This oxygen is released into the surrounding water and atmosphere, supporting aquatic and terrestrial organisms.",
      },
      {
        num: 7,
        text: "A frog's skin is very thin and has many capillaries. This allows the movement of oxygen and carbon dioxide directly across the frog's skin. The frog's skin performs the same function as which of the following in the human body?",
        choices: [
          { label: "A", text: "alveoli" },
          { label: "B", text: "sweat glands" },
          { label: "C", text: "villi" },
          { label: "D", text: "nephrons" },
        ],
        correct: "A",
        explanation: "The alveoli in human lungs are thin-walled, highly vascularized structures where gas exchange (O2 in, CO2 out) occurs between air and blood — the same function as a frog's skin. Villi absorb nutrients; nephrons filter blood; sweat glands regulate temperature.",
      },
      {
        num: 8,
        text: "The table below shows the amino acid sequences of a protein from four different species. Which two species are most closely related?\n\nSpecies 1: Met–Ala–Gly–Ser–Leu\nSpecies 2: Met–Ala–Gly–Thr–Leu\nSpecies 3: Met–Val–Pro–Ser–Leu\nSpecies 4: Met–Ala–Gly–Ser–Leu",
        choices: [
          { label: "A", text: "Species 1 and Species 2" },
          { label: "B", text: "Species 1 and Species 3" },
          { label: "C", text: "Species 1 and Species 4" },
          { label: "D", text: "Species 2 and Species 3" },
        ],
        correct: "C",
        explanation: "Species 1 and Species 4 have identical amino acid sequences (Met–Ala–Gly–Ser–Leu), indicating they share the most similar DNA and are most closely related. The more similar the amino acid (or DNA) sequence between two species, the more recently they shared a common ancestor.",
      },
      {
        num: 9,
        text: "Which of the following correctly describes the relationship between photosynthesis and cellular respiration?",
        choices: [
          { label: "A", text: "Both processes produce ATP and release carbon dioxide." },
          { label: "B", text: "Photosynthesis produces glucose and oxygen; cellular respiration uses glucose and oxygen to produce ATP." },
          { label: "C", text: "Photosynthesis occurs only in animals; cellular respiration occurs only in plants." },
          { label: "D", text: "Both processes require sunlight to produce energy." },
        ],
        correct: "B",
        explanation: "Photosynthesis (in chloroplasts) converts CO2 + H2O + light energy → glucose + O2. Cellular respiration (in mitochondria) converts glucose + O2 → CO2 + H2O + ATP. The products of photosynthesis are the reactants of cellular respiration, and vice versa — the two processes are complementary.",
      },
      {
        num: 10,
        text: "When a person has pneumonia, fluid accumulates in the alveoli. This fluid accumulation directly results in which of the following problems?",
        choices: [
          { label: "A", text: "limited production of antibodies" },
          { label: "B", text: "decreased ability to regulate body temperature" },
          { label: "C", text: "slower diffusion of glucose into the bloodstream" },
          { label: "D", text: "reduced gas exchange between the lungs and the blood" },
        ],
        correct: "D",
        explanation: "Gas exchange in the alveoli depends on diffusion across thin, moist membranes. Fluid accumulation thickens the barrier and reduces the surface area available for diffusion, directly impairing the exchange of O2 and CO2 between the lungs and blood.",
      },
      {
        num: 11,
        text: "A scientist compares the cytochrome c protein (involved in cellular respiration) from a human, a chimpanzee, a dog, and a yeast cell. The human and chimpanzee sequences differ by 0 amino acids; the human and dog sequences differ by 11 amino acids; the human and yeast sequences differ by 45 amino acids. Which conclusion is best supported by this data?",
        choices: [
          { label: "A", text: "Humans evolved from chimpanzees." },
          { label: "B", text: "Dogs and yeast are more closely related to each other than either is to humans." },
          { label: "C", text: "Humans and chimpanzees share a more recent common ancestor than humans and dogs." },
          { label: "D", text: "Yeast do not perform cellular respiration." },
        ],
        correct: "C",
        explanation: "The fewer amino acid differences between two species, the more similar their DNA, and the more recently they shared a common ancestor. Humans and chimpanzees have identical cytochrome c (0 differences), indicating a very recent common ancestor. Humans and yeast differ by 45 amino acids, indicating a very distant common ancestor.",
      },
      {
        num: 12,
        text: "Active transport differs from diffusion in that active transport",
        choices: [
          { label: "A", text: "moves molecules from high to low concentration." },
          { label: "B", text: "requires the cell to use ATP." },
          { label: "C", text: "only moves water molecules across the membrane." },
          { label: "D", text: "does not require a membrane protein." },
        ],
        correct: "B",
        explanation: "Active transport moves molecules against their concentration gradient (from low to high concentration) and requires energy in the form of ATP. Diffusion and osmosis are passive processes — they move molecules down the concentration gradient without requiring energy.",
      },
    ],
    crPrompt: "A student places a plant cell in a very salty solution. Describe what happens to the cell and explain why. In your answer, use the terms osmosis, concentration gradient, and selectively permeable membrane.",
    crModelAnswer: "When a plant cell is placed in a very salty (hypertonic) solution, water moves out of the cell by osmosis. This occurs because the concentration gradient for water is directed from inside the cell (higher water concentration) to outside the cell (lower water concentration, higher solute concentration). The selectively permeable membrane allows water to pass through but not the large solute molecules. As water leaves, the cell membrane pulls away from the cell wall — a process called plasmolysis — causing the cell to shrink and wilt.",
    crRubric: [
      { points: 4, description: "Correctly states water moves out; uses all three terms accurately; explains direction of osmosis based on concentration gradient; mentions plasmolysis or cell shrinkage." },
      { points: 3, description: "Correctly states water moves out; uses at least two terms accurately; explains the direction of water movement." },
      { points: 2, description: "States water moves out but explanation is incomplete or one term is used incorrectly." },
      { points: 1, description: "Shows partial understanding (e.g., mentions osmosis or concentration gradient) but response is mostly incorrect or incomplete." },
    ],
    studentUrl: `${CDN}/MCAS_Practice_ls1_cell_Student_0a8a03a4.pdf`,
    keyUrl: `${CDN}/MCAS_Practice_ls1_cell_AnswerKey_bbee065f.pdf`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LS3 — Heredity & Genetics
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ls3_heredity",
    strand: "LS3 — Heredity & Genetics",
    std: "HS-LS3-1, LS3-2, LS3-3",
    topic: "Inheritance Patterns, Mutations & Meiosis",
    color: "#6A1B9A",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    keyDates: "May 19–22",
    highlights: [
      "Dominant/recessive & incomplete dominance",
      "Carrier status & pedigrees",
      "Mutations & gene function",
      "Meiosis, crossing over & genetic variation",
    ],
    readingTitle: "Inheritance and Genetic Variation",
    readingPassage: [
      "Heredity is the passing of traits from parents to offspring through genes. Genes are segments of DNA that code for specific proteins, which determine an organism's traits. Each organism inherits two copies of each gene — one from each parent — called alleles.",
      "Some alleles are dominant, meaning they are expressed even when only one copy is present. Recessive alleles are only expressed when two copies are present (homozygous recessive). A person who carries one dominant and one recessive allele for a trait is called a carrier — they do not show the recessive trait but can pass it to their offspring.",
      "Mutations are changes in the DNA sequence. Some mutations alter a single nucleotide (point mutations), while others involve larger changes such as insertions, deletions, or chromosomal rearrangements. Mutations in coding regions of DNA can change the amino acid sequence of a protein, potentially altering its function.",
      "During meiosis, homologous chromosomes separate so that each gamete receives only one allele for each gene. Crossing over during meiosis I exchanges segments of homologous chromosomes, creating new combinations of alleles. Independent assortment further increases genetic variation by randomly distributing chromosomes to gametes.",
    ],
    questions: [
      {
        num: 1,
        text: "In pea plants, the allele for tall plants (T) is dominant over the allele for short plants (t). A tall plant with the genotype Tt is crossed with a short plant with the genotype tt. What fraction of the offspring are expected to be tall?",
        choices: [
          { label: "A", text: "1/4" },
          { label: "B", text: "1/2" },
          { label: "C", text: "3/4" },
          { label: "D", text: "4/4" },
        ],
        correct: "B",
        explanation: "A Tt × tt cross produces offspring in a 1:1 ratio — 50% Tt (tall) and 50% tt (short). Since T is dominant, all Tt offspring are tall. Therefore 1/2 (50%) of offspring are expected to be tall.",
      },
      {
        num: 2,
        text: "A woman who is a carrier for a recessive genetic disorder has children with a man who does not carry the disorder. What is the probability that their child will have the disorder?",
        choices: [
          { label: "A", text: "0%" },
          { label: "B", text: "25%" },
          { label: "C", text: "50%" },
          { label: "D", text: "100%" },
        ],
        correct: "A",
        explanation: "If the mother is a carrier (Aa) and the father is homozygous dominant (AA), the possible offspring are AA and Aa — neither of which has the disorder. The disorder (aa) requires two recessive alleles, which is impossible when the father has no recessive allele.",
      },
      {
        num: 3,
        text: "A mutation occurs in a gene that codes for a digestive enzyme. The mutation changes a single nucleotide in the DNA sequence. Which of the following best explains how this mutation could affect the organism?",
        choices: [
          { label: "A", text: "The mutation will always result in a nonfunctional enzyme." },
          { label: "B", text: "The mutation may change the amino acid sequence of the enzyme." },
          { label: "C", text: "The mutation will cause the organism to produce more of the enzyme." },
          { label: "D", text: "The mutation will have no effect because DNA is always repaired." },
        ],
        correct: "B",
        explanation: "A single nucleotide mutation (point mutation) may change a codon, which could change the amino acid incorporated into the protein. Depending on the change, the enzyme may function normally, have reduced function, or be nonfunctional. Not all mutations cause nonfunctional proteins.",
      },
      {
        num: 4,
        text: "During meiosis, a cell with 46 chromosomes produces gametes. How many chromosomes does each gamete contain?",
        choices: [
          { label: "A", text: "12" },
          { label: "B", text: "23" },
          { label: "C", text: "46" },
          { label: "D", text: "92" },
        ],
        correct: "B",
        explanation: "Meiosis reduces the chromosome number by half. A human cell with 46 chromosomes (diploid, 2n) produces gametes with 23 chromosomes (haploid, n). This ensures that when two gametes fuse at fertilization, the offspring has the correct diploid number of 46.",
      },
      {
        num: 5,
        text: "A pedigree shows that two parents without a genetic disorder have a child with the disorder. Which of the following best explains this result?",
        choices: [
          { label: "A", text: "The disorder is caused by a dominant allele." },
          { label: "B", text: "Both parents are carriers of a recessive allele." },
          { label: "C", text: "The child experienced a new mutation." },
          { label: "D", text: "The disorder skips a generation." },
        ],
        correct: "B",
        explanation: "If two unaffected parents have an affected child, the most likely explanation is that both parents are carriers (Aa × Aa). In this cross, 25% of offspring are expected to be homozygous recessive (aa) and show the disorder.",
      },
      {
        num: 6,
        text: "Which of the following best describes incomplete dominance?",
        choices: [
          { label: "A", text: "Pink flowers from crossing red and white snapdragons" },
          { label: "B", text: "AB blood type where both A and B antigens are expressed" },
          { label: "C", text: "A tall plant crossed with a short plant producing medium-height plants" },
          { label: "D", text: "A recessive trait appearing in every generation" },
        ],
        correct: "A",
        explanation: "Incomplete dominance produces a blended phenotype in the heterozygote. Crossing red (RR) and white (WW) snapdragons produces pink (RW) offspring — neither allele is fully dominant. Choice B describes codominance (both alleles fully expressed).",
      },
      {
        num: 7,
        text: "A deletion mutation removes three consecutive nucleotides from the middle of a gene. Which of the following best describes the effect of this mutation on the protein?",
        choices: [
          { label: "A", text: "The protein will be identical to the normal protein." },
          { label: "B", text: "One amino acid will be missing from the protein, but the rest of the sequence will be unchanged." },
          { label: "C", text: "The reading frame will shift, changing all amino acids after the deletion." },
          { label: "D", text: "The protein will be longer than normal." },
        ],
        correct: "B",
        explanation: "A deletion of exactly three nucleotides (one codon) removes one amino acid from the protein but does not shift the reading frame. The rest of the amino acid sequence remains correct. A frameshift mutation occurs when a number of nucleotides not divisible by three is deleted.",
      },
      {
        num: 8,
        text: "Crossing over during meiosis I increases genetic variation by",
        choices: [
          { label: "A", text: "doubling the number of chromosomes in each gamete." },
          { label: "B", text: "exchanging segments between homologous chromosomes, creating new allele combinations." },
          { label: "C", text: "preventing mutations from occurring during DNA replication." },
          { label: "D", text: "ensuring that all gametes receive identical chromosomes." },
        ],
        correct: "B",
        explanation: "During crossing over, non-sister chromatids of homologous chromosomes exchange segments. This creates chromosomes with new combinations of alleles that did not exist in either parent, increasing genetic diversity in the gametes and offspring.",
      },
      {
        num: 9,
        text: "A scientist examines a karyotype and finds that a cell has 47 chromosomes instead of the normal 46. This most likely occurred because",
        choices: [
          { label: "A", text: "crossing over occurred during meiosis I." },
          { label: "B", text: "homologous chromosomes failed to separate during meiosis (nondisjunction)." },
          { label: "C", text: "a point mutation changed a single nucleotide." },
          { label: "D", text: "the cell underwent mitosis instead of meiosis." },
        ],
        correct: "B",
        explanation: "Nondisjunction occurs when homologous chromosomes (meiosis I) or sister chromatids (meiosis II) fail to separate properly. This results in gametes with an abnormal number of chromosomes. If a gamete with 24 chromosomes is fertilized by a normal gamete (23), the resulting cell has 47 chromosomes (trisomy).",
      },
      {
        num: 10,
        text: "In humans, the allele for attached earlobes (a) is recessive to the allele for free earlobes (A). Two parents with free earlobes have a child with attached earlobes. What are the genotypes of the parents?",
        choices: [
          { label: "A", text: "AA × AA" },
          { label: "B", text: "AA × Aa" },
          { label: "C", text: "Aa × Aa" },
          { label: "D", text: "Aa × aa" },
        ],
        correct: "C",
        explanation: "For two parents with free earlobes to have a child with attached earlobes (aa), both parents must carry the recessive allele. Both parents must be Aa (carriers). An Aa × Aa cross produces 25% AA, 50% Aa, and 25% aa offspring — so 25% of children would have attached earlobes.",
      },
      {
        num: 11,
        text: "Which of the following best explains why offspring produced by sexual reproduction are genetically different from their parents?",
        choices: [
          { label: "A", text: "Sexual reproduction involves mitosis, which produces identical cells." },
          { label: "B", text: "Meiosis, crossing over, and random fertilization produce unique combinations of alleles." },
          { label: "C", text: "Mutations occur in every generation, changing all genes." },
          { label: "D", text: "Offspring always receive more alleles than their parents." },
        ],
        correct: "B",
        explanation: "Sexual reproduction generates genetic variation through three mechanisms: (1) crossing over during meiosis I creates new allele combinations on chromosomes; (2) independent assortment randomly distributes chromosomes to gametes; (3) random fertilization combines gametes from two different individuals. Together, these processes ensure offspring are genetically unique.",
      },
    ],
    crPrompt: "A scientist discovers a mutation in a gene that codes for a protein involved in cell division. Explain how this mutation could lead to uncontrolled cell growth. In your answer, describe the role of the protein in normal cell division and how the mutation changes this function.",
    crModelAnswer: "In normal cell division, proteins called cell cycle regulators control when and how often a cell divides. If a mutation changes the DNA sequence of a gene that codes for one of these proteins, it may alter the protein's shape and function. For example, if the mutation causes the protein to be permanently active, it may continuously signal the cell to divide even when it should not. This uncontrolled cell growth can lead to the formation of a tumor. Alternatively, if the mutation inactivates a tumor suppressor protein, the cell loses the 'brakes' that normally stop cell division.",
    crRubric: [
      { points: 4, description: "Describes the normal role of the protein in cell division; explains how the mutation changes the protein's function; connects the change to uncontrolled cell growth; uses accurate biological vocabulary." },
      { points: 3, description: "Correctly describes the normal role and the mutation's effect, but the connection to uncontrolled growth is incomplete or partially inaccurate." },
      { points: 2, description: "Shows partial understanding — describes either the normal function or the mutation effect, but not both clearly." },
      { points: 1, description: "Shows minimal understanding; response is mostly vague or incorrect." },
    ],
    studentUrl: `${CDN}/MCAS_Practice_ls3_heredity_Student_dd99dda0.pdf`,
    keyUrl: `${CDN}/MCAS_Practice_ls3_heredity_AnswerKey_8406457e.pdf`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LS4 — Evolution & Natural Selection
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ls4_evolution",
    strand: "LS4 — Evolution & Natural Selection",
    std: "HS-LS4-1, LS4-2, LS4-4, LS4-5",
    topic: "Natural Selection, Adaptation, Speciation & Evidence for Evolution",
    color: "#2E7D32",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    keyDates: "May 26–29",
    highlights: [
      "Rock pocket mice & natural selection",
      "Antibiotic resistance",
      "Vestigial structures & molecular evidence",
      "Allopatric speciation & reproductive isolation",
    ],
    readingTitle: "Natural Selection and Adaptation",
    readingPassage: [
      "Natural selection is the process by which individuals with traits that are better suited to their environment survive and reproduce more successfully than individuals with less favorable traits. Over many generations, this leads to changes in the frequency of traits in a population.",
      "For natural selection to occur, four conditions must be met: variation must exist among individuals in the population, the variation must be heritable (passed from parent to offspring), individuals must compete for limited resources, and some variations must increase survival and reproduction.",
      "The rock pocket mouse (Chaetodipus intermedius) lives in the southwestern United States. Populations living on dark lava rock have dark fur, while populations on light sandy soil have light fur. Predators such as owls hunt by sight and more easily spot mice that do not match their background.",
      "Scientists have found that the dark coloration in lava rock populations is caused by a mutation in the Mc1r gene, which affects pigmentation. Mice with the mutation survive better on dark rock because they are harder for predators to see. This is a clear example of natural selection acting on a heritable variation.",
    ],
    questions: [
      {
        num: 1,
        text: "Rock pocket mice living on dark lava rock have dark fur, while those living on light sandy soil have light fur. Which of the following best explains why dark fur is more common in the lava rock population?",
        choices: [
          { label: "A", text: "Dark mice moved to the lava rock because they preferred it." },
          { label: "B", text: "Dark mice survived better on lava rock because predators could not see them as easily." },
          { label: "C", text: "The lava rock caused the mice to change their fur color." },
          { label: "D", text: "Dark mice reproduced more because they were larger and stronger." },
        ],
        correct: "B",
        explanation: "Natural selection explains this pattern: dark mice on dark lava rock are better camouflaged from predators (owls), so they survive and reproduce more. Over generations, the dark allele becomes more common. The environment did not cause the mutation — it selected for it.",
      },
      {
        num: 2,
        text: "Bacteria that cause tuberculosis (TB) have become resistant to many antibiotics. Which of the following best explains how antibiotic resistance develops in a bacterial population?",
        choices: [
          { label: "A", text: "Bacteria learn to avoid antibiotics over time." },
          { label: "B", text: "Antibiotics cause bacteria to mutate and become resistant." },
          { label: "C", text: "Bacteria with resistance mutations survive and reproduce when exposed to antibiotics." },
          { label: "D", text: "Resistant bacteria are produced when two non-resistant bacteria reproduce." },
        ],
        correct: "C",
        explanation: "Antibiotic resistance evolves through natural selection. Random mutations produce some bacteria with resistance. When antibiotics are present, non-resistant bacteria die but resistant ones survive and reproduce, passing the resistance to offspring. The antibiotic selects for the pre-existing resistance — it does not cause the mutation.",
      },
      {
        num: 3,
        text: "Whales have small, non-functional pelvic bones embedded in their bodies. These structures are most likely evidence that",
        choices: [
          { label: "A", text: "whales evolved from land-dwelling ancestors that had legs." },
          { label: "B", text: "whales will develop legs in the future." },
          { label: "C", text: "the pelvic bones help whales swim more efficiently." },
          { label: "D", text: "whales and fish share a recent common ancestor." },
        ],
        correct: "A",
        explanation: "Vestigial structures are remnants of structures that were functional in an ancestor but have reduced or no function in the current organism. Whale pelvic bones are vestigial — they are evidence that whales descended from four-limbed land mammals. The fossil record supports this, showing transitional forms such as Pakicetus.",
      },
      {
        num: 4,
        text: "Two populations of the same bird species are separated by a mountain range for thousands of years. Over time, the populations develop different beak shapes and can no longer interbreed. This is an example of",
        choices: [
          { label: "A", text: "artificial selection." },
          { label: "B", text: "genetic drift." },
          { label: "C", text: "allopatric speciation." },
          { label: "D", text: "convergent evolution." },
        ],
        correct: "C",
        explanation: "Allopatric speciation occurs when a geographic barrier (like a mountain range) separates a population. The two isolated populations evolve independently under different selective pressures. Over time, they accumulate enough genetic differences to become reproductively isolated — a new species has formed.",
      },
      {
        num: 5,
        text: "Scientists compared the DNA sequences of cytochrome c (a protein involved in cellular respiration) across many species. They found that humans and chimpanzees have nearly identical sequences, while humans and yeast have very different sequences. This evidence supports the conclusion that",
        choices: [
          { label: "A", text: "humans and chimpanzees share a more recent common ancestor than humans and yeast." },
          { label: "B", text: "humans evolved from chimpanzees." },
          { label: "C", text: "yeast and humans perform cellular respiration differently." },
          { label: "D", text: "DNA sequences are not reliable evidence for evolution." },
        ],
        correct: "A",
        explanation: "Similar DNA sequences indicate a more recent common ancestor. Humans and chimpanzees have nearly identical cytochrome c sequences, meaning they diverged relatively recently. Humans and yeast have very different sequences, indicating a much more distant common ancestor.",
      },
      {
        num: 6,
        text: "In a population of beetles, green beetles are more easily spotted by birds than brown beetles. Over several generations, what would most likely happen to the population?",
        choices: [
          { label: "A", text: "All beetles would become green." },
          { label: "B", text: "The frequency of brown beetles would increase." },
          { label: "C", text: "The frequency of green and brown beetles would remain equal." },
          { label: "D", text: "The population size would remain the same." },
        ],
        correct: "B",
        explanation: "Brown beetles have a survival advantage because they are harder for birds to see (better camouflage). Brown beetles survive and reproduce more, passing the brown allele to offspring. Over generations, the frequency of brown beetles increases through natural selection.",
      },
      {
        num: 7,
        text: "A cladogram shows that sharks, salmon, lizards, and humans all share a common ancestor. Sharks and salmon are grouped together on one branch, while lizards and humans are grouped on another. Which of the following is best supported by this cladogram?",
        choices: [
          { label: "A", text: "Sharks and salmon are more closely related to each other than either is to humans." },
          { label: "B", text: "Humans evolved from lizards." },
          { label: "C", text: "Sharks are the most recently evolved species." },
          { label: "D", text: "Salmon and lizards share a more recent common ancestor than salmon and sharks." },
        ],
        correct: "A",
        explanation: "On a cladogram, organisms that share a more recent common ancestor are grouped on the same branch. Sharks and salmon are on the same branch, meaning they share a more recent common ancestor with each other than either does with lizards or humans.",
      },
      {
        num: 8,
        text: "A population of squirrels is split when a new highway is built through their habitat. After 200 years, scientists find that the two populations have slightly different fur colors and mating calls. The populations can still interbreed. At this point, the two groups are best described as",
        choices: [
          { label: "A", text: "two separate species because they look different." },
          { label: "B", text: "the same species because they can still interbreed." },
          { label: "C", text: "two separate species because they live in different habitats." },
          { label: "D", text: "the same species because they have the same number of chromosomes." },
        ],
        correct: "B",
        explanation: "The biological species concept defines a species as a group of organisms that can interbreed and produce fertile offspring. Because the two squirrel populations can still interbreed, they remain the same species. Speciation is complete only when reproductive isolation prevents gene flow between populations.",
      },
      {
        num: 9,
        text: "Which of the following is NOT a condition required for natural selection to occur?",
        choices: [
          { label: "A", text: "Variation exists among individuals in the population." },
          { label: "B", text: "Variations are heritable and passed to offspring." },
          { label: "C", text: "All individuals in the population survive and reproduce equally." },
          { label: "D", text: "Some variations increase an individual's ability to survive and reproduce." },
        ],
        correct: "C",
        explanation: "Natural selection requires differential reproductive success — some individuals must survive and reproduce more than others. If all individuals survived and reproduced equally, there would be no selection pressure and allele frequencies would not change. The other three choices are all required conditions for natural selection.",
      },
      {
        num: 10,
        text: "The amino acid sequences of hemoglobin (an oxygen-carrying protein) from four species are compared. Species W and X differ by 2 amino acids; Species W and Y differ by 18 amino acids; Species W and Z differ by 2 amino acids. Which species are most likely most closely related to Species W?",
        choices: [
          { label: "A", text: "Species Y only" },
          { label: "B", text: "Species X and Z" },
          { label: "C", text: "Species Y and Z" },
          { label: "D", text: "Species X only" },
        ],
        correct: "B",
        explanation: "Species X and Z each differ from Species W by only 2 amino acids, indicating very similar DNA sequences and a more recent common ancestor. Species Y differs by 18 amino acids, indicating a more distant relationship. Fewer amino acid differences = more closely related.",
      },
      {
        num: 11,
        text: "A small group of birds from a mainland population is blown by a storm to an isolated island. Over thousands of generations, the island population evolves distinct traits and can no longer interbreed with the mainland population. This scenario best illustrates",
        choices: [
          { label: "A", text: "the bottleneck effect followed by allopatric speciation." },
          { label: "B", text: "sympatric speciation caused by natural selection." },
          { label: "C", text: "the founder effect followed by allopatric speciation." },
          { label: "D", text: "convergent evolution between two populations." },
        ],
        correct: "C",
        explanation: "When a small group colonizes a new area, the founder effect occurs — the new population has reduced genetic diversity because it represents only a subset of the original population's alleles. Geographic isolation then allows the populations to diverge through natural selection and genetic drift, eventually leading to allopatric speciation.",
      },
      {
        num: 12,
        text: "A scientist finds fossils of a species that lived 50 million years ago. The fossils show features intermediate between modern whales and land mammals, including small hind limbs. This fossil is best described as",
        choices: [
          { label: "A", text: "evidence that whales and land mammals are not related." },
          { label: "B", text: "a transitional fossil supporting the common ancestry of whales and land mammals." },
          { label: "C", text: "proof that whales evolved from fish." },
          { label: "D", text: "evidence that natural selection does not occur in aquatic environments." },
        ],
        correct: "B",
        explanation: "Transitional fossils show intermediate features between ancestral and descendant groups, providing evidence for evolution. Fossils like Pakicetus and Ambulocetus show a gradual transition from land-dwelling mammals to fully aquatic whales, supporting the common ancestry of whales and terrestrial mammals.",
      },
    ],
    crPrompt: "The Galapagos finches are a famous example of adaptive radiation. Describe how natural selection could have led to the evolution of different beak shapes in finch populations on different islands. In your answer, include the role of variation, selection pressure, and inheritance.",
    crModelAnswer: "When finches first arrived on the Galapagos Islands, variation in beak shape existed among individuals due to random mutations. On islands where large, hard seeds were the main food source, birds with larger, stronger beaks could crack the seeds and survive better. These birds reproduced more and passed the large-beak alleles to their offspring. On other islands where insects were the main food, birds with thinner, pointed beaks were better at extracting insects and had higher survival and reproduction rates. Over many generations, natural selection acting on heritable variation in beak shape led to populations with distinctly different beaks — each adapted to the food sources available on their island.",
    crRubric: [
      { points: 4, description: "Describes variation in beak shape; explains how selection pressure (food source) favored certain beaks; explains inheritance of the favored trait; connects to divergence over generations." },
      { points: 3, description: "Addresses variation and selection pressure correctly but does not fully explain the role of inheritance or generational change." },
      { points: 2, description: "Shows partial understanding — describes natural selection in general terms but does not apply it specifically to beak shape variation." },
      { points: 1, description: "Minimal understanding; response is mostly vague or contains significant inaccuracies." },
    ],
    studentUrl: `${CDN}/MCAS_Practice_ls4_evolution_Student_10896b17.pdf`,
    keyUrl: `${CDN}/MCAS_Practice_ls4_evolution_AnswerKey_bb4c0394.pdf`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LS2 — Ecosystems
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ls2_ecosystems",
    strand: "LS2 — Ecosystems",
    std: "HS-LS2-1, LS2-2, LS2-4, LS2-6",
    topic: "Food Webs, Energy Flow, the 10% Rule, Carbon Cycle & Population Dynamics",
    color: "#B5600A",
    bg: "#FFF7ED",
    border: "#FED7AA",
    keyDates: "June 1",
    highlights: [
      "Food webs & energy pyramids",
      "10% energy transfer rule",
      "Carbon cycle & photosynthesis",
      "Invasive species & population dynamics",
    ],
    readingTitle: "Energy Flow in Ecosystems",
    readingPassage: [
      "Energy flows through ecosystems in one direction — from the sun through producers to consumers. Producers (plants and other photosynthetic organisms) capture solar energy and convert it to chemical energy stored in organic molecules. Consumers obtain energy by eating producers or other consumers.",
      "At each level of a food chain, only about 10% of the energy is transferred to the next trophic level. The remaining 90% is lost as heat during metabolic processes such as cellular respiration, movement, and maintaining body temperature. This 10% rule explains why energy pyramids are wider at the base — producers store far more energy than primary consumers, which store more than secondary consumers.",
      "Matter, unlike energy, is recycled through ecosystems. Carbon, for example, moves between the atmosphere, living organisms, and the soil through the carbon cycle. Photosynthesis removes CO2 from the atmosphere, while cellular respiration, decomposition, and combustion return CO2 to the atmosphere.",
      "Population size is regulated by limiting factors such as food availability, predation, disease, and space. When a new species is introduced to an ecosystem without natural predators, it can reproduce rapidly and outcompete native species for resources, disrupting the balance of the ecosystem.",
    ],
    questions: [
      {
        num: 1,
        text: "In a food chain, grass → rabbit → fox → decomposer, which organism receives the least amount of energy from the original solar energy captured by the grass?",
        choices: [
          { label: "A", text: "grass" },
          { label: "B", text: "rabbit" },
          { label: "C", text: "fox" },
          { label: "D", text: "decomposer" },
        ],
        correct: "D",
        explanation: "Energy is lost at each trophic level (approximately 90% lost as heat). The decomposer is at the end of the chain and receives energy only from the fox's remains — the smallest fraction of the original solar energy. Grass captures the most energy; each subsequent level receives less.",
      },
      {
        num: 2,
        text: "A meadow ecosystem contains 10,000 kcal of energy stored in grasses. Using the 10% rule, approximately how much energy would be available to a hawk that eats mice that eat the grasses?",
        choices: [
          { label: "A", text: "1,000 kcal" },
          { label: "B", text: "100 kcal" },
          { label: "C", text: "10 kcal" },
          { label: "D", text: "1 kcal" },
        ],
        correct: "B",
        explanation: "Applying the 10% rule: Grasses have 10,000 kcal. Mice (primary consumers) receive 10% of that = 1,000 kcal. Hawks (secondary consumers) receive 10% of the mice's energy = 100 kcal. Each trophic level transfer loses 90% of the energy as heat.",
      },
      {
        num: 3,
        text: "An energy pyramid shows the following values: producers = 500,000 kcal; primary consumers = 50,000 kcal; secondary consumers = 5,000 kcal; tertiary consumers = 500 kcal. Which of the following best explains why the pyramid narrows at each level?",
        choices: [
          { label: "A", text: "Organisms at higher levels eat less food." },
          { label: "B", text: "About 90% of energy is lost as heat at each trophic level." },
          { label: "C", text: "Producers store more energy because they are larger." },
          { label: "D", text: "Consumers convert all food energy into body mass." },
        ],
        correct: "B",
        explanation: "At each trophic level, organisms use most of their energy for metabolism (cellular respiration, movement, maintaining body temperature). Only about 10% of the energy is stored in body tissues and passed to the next level. This is why energy pyramids narrow — each level has roughly 10% of the energy of the level below it.",
      },
      {
        num: 4,
        text: "A scientist removes all the wolves from a forest ecosystem. Which of the following would most likely happen first?",
        choices: [
          { label: "A", text: "The deer population would decrease." },
          { label: "B", text: "The deer population would increase." },
          { label: "C", text: "The plant population would increase." },
          { label: "D", text: "The wolf population would recover on its own." },
        ],
        correct: "B",
        explanation: "Wolves are predators of deer. Removing wolves eliminates a key limiting factor for the deer population. Without predation pressure, deer reproduce more and survive longer, causing the deer population to increase. This is a trophic cascade — the removal of a top predator affects lower trophic levels.",
      },
      {
        num: 5,
        text: "Carbon is returned to the atmosphere as carbon dioxide (CO2) through which of the following processes?",
        choices: [
          { label: "A", text: "photosynthesis only" },
          { label: "B", text: "cellular respiration only" },
          { label: "C", text: "both photosynthesis and cellular respiration" },
          { label: "D", text: "cellular respiration and decomposition" },
        ],
        correct: "D",
        explanation: "CO2 is returned to the atmosphere through cellular respiration (by all living organisms) and decomposition (by bacteria and fungi breaking down dead organic matter). Photosynthesis removes CO2 from the atmosphere — it does not return it. Combustion also returns CO2 but was not listed as a choice.",
      },
      {
        num: 6,
        text: "An invasive plant species is introduced to a wetland. The invasive plant grows much faster than native plants and spreads rapidly. Which of the following would most likely occur?",
        choices: [
          { label: "A", text: "Native plant species would increase in number." },
          { label: "B", text: "The invasive plant would have no effect on native species." },
          { label: "C", text: "Native plant species would decrease due to competition for resources." },
          { label: "D", text: "The invasive plant would help native animals by providing more food." },
        ],
        correct: "C",
        explanation: "Invasive species often outcompete native species for limited resources such as sunlight, water, and nutrients. Because the invasive plant grows faster, it shades out native plants and reduces their access to resources, causing native plant populations to decline. This disrupts the food web that depends on native plants.",
      },
      {
        num: 7,
        text: "A population of rabbits in a meadow grows rapidly until it reaches a stable size. Which of the following best explains why the population stopped growing?",
        choices: [
          { label: "A", text: "The rabbits ran out of space to burrow." },
          { label: "B", text: "Limiting factors such as food and predation balanced birth and death rates." },
          { label: "C", text: "The rabbits evolved to reproduce less frequently." },
          { label: "D", text: "The meadow produced more food to support the larger population." },
        ],
        correct: "B",
        explanation: "When a population reaches its carrying capacity, limiting factors (food availability, predation, disease, space) cause death rates to equal birth rates, stabilizing the population size. This is the logistic growth model — populations grow rapidly when resources are abundant and slow as they approach the carrying capacity.",
      },
      {
        num: 8,
        text: "Which of the following correctly describes the role of decomposers in an ecosystem?",
        choices: [
          { label: "A", text: "Decomposers convert solar energy into chemical energy." },
          { label: "B", text: "Decomposers break down dead organic matter and return nutrients to the soil." },
          { label: "C", text: "Decomposers are the primary food source for herbivores." },
          { label: "D", text: "Decomposers produce oxygen through photosynthesis." },
        ],
        correct: "B",
        explanation: "Decomposers (bacteria and fungi) break down dead organic matter (detritus) into simpler inorganic compounds, returning nutrients such as nitrogen and phosphorus to the soil. This makes nutrients available for producers to absorb, completing the nutrient cycle.",
      },
      {
        num: 9,
        text: "A lake ecosystem has the following food chain: algae → water fleas → small fish → large fish. If a pollutant reduces the algae population by 80%, which of the following would most likely occur?",
        choices: [
          { label: "A", text: "The large fish population would increase because they have less competition." },
          { label: "B", text: "The water flea population would increase because they have fewer predators." },
          { label: "C", text: "The small fish and large fish populations would both decrease due to reduced food availability." },
          { label: "D", text: "The large fish population would be unaffected because they eat small fish, not algae." },
        ],
        correct: "C",
        explanation: "A reduction in algae (the producer) reduces the energy available at the base of the food chain. With less food, the water flea population decreases. With fewer water fleas, the small fish population decreases. With fewer small fish, the large fish population also decreases. This is a trophic cascade — disruption at the base affects all higher levels.",
      },
      {
        num: 10,
        text: "Which of the following best describes a mutualistic relationship?",
        choices: [
          { label: "A", text: "A tapeworm living inside a dog's intestine, absorbing nutrients" },
          { label: "B", text: "A remora fish attaching to a shark and eating its leftover food without harming the shark" },
          { label: "C", text: "Bees collecting nectar from flowers while transferring pollen between plants" },
          { label: "D", text: "A cuckoo bird laying its eggs in another bird's nest" },
        ],
        correct: "C",
        explanation: "Mutualism is a symbiotic relationship where both organisms benefit. Bees benefit by obtaining nectar (food), and flowers benefit by having pollen transferred (pollination), which enables reproduction. Choice A is parasitism (tapeworm benefits, dog is harmed). Choice B is commensalism (remora benefits, shark is unaffected).",
      },
      {
        num: 11,
        text: "A grassland ecosystem has 1,000,000 kcal stored in grasses. Using the 10% rule, how much energy would be available to a tertiary consumer (an organism that eats secondary consumers)?",
        choices: [
          { label: "A", text: "100,000 kcal" },
          { label: "B", text: "10,000 kcal" },
          { label: "C", text: "1,000 kcal" },
          { label: "D", text: "100 kcal" },
        ],
        correct: "C",
        explanation: "Applying the 10% rule three times: Grasses = 1,000,000 kcal → Primary consumers = 100,000 kcal (10%) → Secondary consumers = 10,000 kcal (10%) → Tertiary consumers = 1,000 kcal (10%). Each trophic level transfer retains only 10% of the previous level's energy.",
      },
      {
        num: 12,
        text: "In the carbon cycle, which process removes carbon dioxide from the atmosphere and stores it in organic molecules?",
        choices: [
          { label: "A", text: "cellular respiration" },
          { label: "B", text: "decomposition" },
          { label: "C", text: "photosynthesis" },
          { label: "D", text: "combustion" },
        ],
        correct: "C",
        explanation: "Photosynthesis uses CO2 from the atmosphere, water, and solar energy to produce glucose (an organic molecule) and oxygen. This is the primary process that removes carbon from the atmosphere and stores it in living organisms. Cellular respiration, decomposition, and combustion all release CO2 back into the atmosphere.",
      },
    ],
    crPrompt: "A lake ecosystem contains phytoplankton, zooplankton, small fish, large fish, and decomposers. Describe how energy flows through this ecosystem and explain what would happen to the large fish population if a pollutant killed most of the phytoplankton. Use the 10% energy rule in your answer.",
    crModelAnswer: "Energy flows through the lake ecosystem starting with phytoplankton, which capture solar energy through photosynthesis. Zooplankton eat the phytoplankton and receive about 10% of the energy stored in the phytoplankton. Small fish eat the zooplankton and receive about 10% of the zooplankton's energy. Large fish eat the small fish and receive about 10% of the small fish's energy. If a pollutant killed most of the phytoplankton, the base of the food chain would collapse. With less phytoplankton, zooplankton would have less food and their population would decrease. With fewer zooplankton, small fish would have less food and their population would also decrease. Finally, with fewer small fish, the large fish population would decline due to lack of food. The loss of producers at the base of the food chain would cascade through all trophic levels.",
    crRubric: [
      { points: 4, description: "Correctly describes energy flow from phytoplankton to large fish; applies the 10% rule with specific numbers or percentages; accurately predicts the cascade effect on each trophic level; uses appropriate vocabulary." },
      { points: 3, description: "Correctly describes energy flow and the cascade effect but does not explicitly apply the 10% rule, or the cascade is incomplete." },
      { points: 2, description: "Shows partial understanding — describes some energy flow or some cascade effect but not both clearly." },
      { points: 1, description: "Minimal understanding; response is mostly vague or contains significant inaccuracies." },
    ],
    studentUrl: `${CDN}/MCAS_Practice_ls2_ecosystems_Student_5e7d75d5.pdf`,
    keyUrl: `${CDN}/MCAS_Practice_ls2_ecosystems_AnswerKey_f873250c.pdf`,
  },
];
