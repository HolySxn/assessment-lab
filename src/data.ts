// Central source of academic content and permanent team information.
// Academic summaries are drawn from Fair Assessment Group Essay(1).docx.
// Website demonstrations and proposed practices are explicitly identified.
export const content = {
  title: 'Assessment Lab',
  subtitle: 'What does a grade actually tell us?',
  institution: 'Astana IT University — MT-2601M',
  checkedBy: 'Checked by: Dr. Peter Shon, Assistant Professor',
  essayTitle: 'Fair Assessment and Student Learning in Higher Education',
  introduction: 'A number can record a result. On its own, it cannot explain what a student understands, how a decision was made, or what to do next. We look behind the grade to ask how assessment can better support learning.',
  argument: 'Fair assessment requires clear outcomes, relevant tasks, useful feedback, transparent criteria, and reasoned flexibility.',
  conclusion: 'Our evidence supports improving assessment. It does not establish that abolishing grades is the best solution.',
  approach: 'We synthesised five scholarly publications, five group members’ reflective notes, and three external interview accounts. We compared what research can establish with how particular students experience assessment.',
  approachNote: 'P1, P2, and P3 answered six common questions. Their Russian responses are paraphrased in the essay. These individual perspectives are not a representative survey.',
  limitations: 'Five selected publications, five reflections, and three interview accounts cannot establish how common these experiences are or predict the effects of reform at our university. Studies differ in setting, intervention, and outcome. Personal accounts do not verify institutional policies. Our proposed teaching practices and this demonstration have not been tested by this project.',
  principles: ['Clear outcomes', 'Relevant tasks', 'Useful feedback', 'Transparent criteria', 'Reasoned flexibility'],
};

export const themes = [
  {
    id: 'competence', number: '01', title: 'Assess the capability.', label: 'Competence', kind: 'Framework', citation: 'Biggs, 1996', ref: 'biggs',
    summary: 'Align the intended learning outcome, teaching activity, and assessment task. Recall alone cannot show every kind of understanding.',
    detail: 'Biggs provides a constructive alignment framework, not experimental proof that a particular format always works. The essay connects it to Saparbek’s concern about assessing analysis through memorised definitions and Sagatove’s concern about unverified workplace skills.',
    boundary: 'Course improvement and the accuracy of its grades are separate questions.',
  },
  {
    id: 'motivation', number: '02', title: 'Look beyond the points.', label: 'Motivation', kind: 'Research finding', citation: 'Koenka et al., 2021', ref: 'koenka',
    summary: 'Grades versus no feedback showed higher achievement but poorer motivation; comments generally outperformed grades on both outcomes.',
    detail: 'These meta-analyses concern elementary and secondary education. Transfer to universities requires caution. P1 associates strict teachers with more study, while P3 describes pursuing points. Effort, interest, and understanding are different outcomes.',
    boundary: 'School evidence does not directly establish effects in higher education.',
  },
  {
    id: 'feedback', number: '03', title: 'Make the next step visible.', label: 'Feedback & peers', kind: 'Research finding', citation: 'Wisniewski et al., 2020; Double et al., 2020', ref: 'wisniewski',
    summary: 'Feedback can support learning, but effects vary with its information. Peer assessment shows a performance benefit, not proof of emotional safety.',
    detail: 'Wisniewski et al. synthesised 435 studies with over 61,000 participants; the average effect after removing extreme effects was d = 0.48, with substantial variation. Double et al. found g = 0.31 across 54 experimental and quasi-experimental studies, including tertiary settings. Shpringer’s reflection raises a separate question about feeling safe when peers judge work.',
    boundary: 'The two syntheses study different interventions; their effects are not interchangeable.',
  },
  {
    id: 'criteria', number: '04', title: 'Show what counts.', label: 'Transparent criteria', kind: 'Research finding', citation: 'Panadero et al., 2023', ref: 'panadero',
    summary: 'Rubrics showed a positive pooled effect on performance after adjusting for publication bias. Wider benefits were less conclusive.',
    detail: 'Confidence intervals for self-regulation and self-efficacy included zero. A rubric can make expectations discussable, but teachers still need to justify the relevance of its criteria. P2 values knowing what an assessment expects.',
    boundary: 'A rubric’s presence does not establish that every decision is fair.',
  },
  {
    id: 'circumstances', number: '05', title: 'Keep standards. Explain flexibility.', label: 'Individual circumstances', kind: 'Personal accounts → proposal', citation: 'P1–P3; Shpringer, 2026; Sagatove, n.d.', ref: 'shpringer',
    summary: 'All three interviewees support considering serious circumstances. We propose reasoned accommodations while keeping the learning outcome clear.',
    detail: 'P2 separates common knowledge requirements from flexibility in demonstrating them. We propose explaining a changed deadline after illness, recording the reason without disclosing another student’s private details, and allowing written questions about assessment decisions.',
    boundary: 'The cited meta-analyses do not directly test the fairness of these accommodations.',
  },
];

export const accounts = [
  { id: 'P1', heading: 'Discipline can help. Context still matters.', text: 'Values strict teaching and improvement through Public Speaking, yet describes an unfamiliar football task as confusing. Wants creativity recognised and warns about corruption.' },
  { id: 'P2', heading: 'Common standards, clearer expectations.', text: 'Values explicit criteria and flexibility in how knowledge is demonstrated. Favours retaining grades while increasing practical work and feedback.' },
  { id: 'P3', heading: 'A mark may miss the work behind it.', text: 'Questions point chasing, one-off examinations, and equal group marks for unequal contributions. Favours retaining grades with more practical work and feedback.' },
];

export const recommendations = [
  { title: 'Start with the intended learning.', text: 'For evaluating educational arguments, ask students to analyse a claim and justify their evaluation with evidence. Align practice and assessment with that outcome.' },
  { title: 'Make reasoning observable.', text: 'Combine a written critique with a brief explanation. Let students choose accessible topics while using common standards for evidence, alternatives, and clarity.' },
  { title: 'Build in a feedback and revision cycle.', text: 'Comment on a draft, support peer discussion, and give students a chance to revise. Ask which comments they used rather than assuming all feedback helps.' },
  { title: 'Explain decisions and accommodations.', text: 'Share criteria, record group contributions, offer a written clarification route, and explain flexibility without disclosing private circumstances.' },
];

export const trial = 'Evaluate a classroom trial using initial and revised work against the same criteria, alongside students’ experiences of barriers. Improvement would be local evidence; practice and extra study could also explain it, so a simple before-and-after comparison would not establish causation.';

export const activity = {
  task: 'Should universities replace numerical grades with written feedback? Give a reasoned answer, use evidence, and consider another perspective.',
  response: 'Universities should remove grades because students only study for points. Practical projects show skills better than exams. Teachers should give comments instead, because comments help students improve.',
  feedback: [
    { title: 'A clear position', text: 'You take an identifiable position and offer reasons for it. Keep that direct opening.', tone: 'strength' },
    { title: 'Qualify the generalisations', text: '“Students only study for points” and “projects show skills better” are broad claims. Explain when they might hold and where they might not.', tone: 'develop' },
    { title: 'Bring evidence into the argument', text: 'Use a relevant source or concrete example, explain how it supports your claim, and acknowledge the limits of applying school research to universities.', tone: 'develop' },
    { title: 'Consider another perspective', text: 'Address a reason for retaining grades, such as communicating achievement, then explain whether grades and useful comments could work together.', tone: 'develop' },
  ],
  explanation: 'This fictional classroom example and illustrative rubric were created for the website. Visitors give an initial grade, read criteria and feedback, rate three criteria from 0 to 4, and compare their decisions. There is no predetermined correct grade. A changed grade does not prove improved fairness or learning; criteria make the reasoning behind a decision more explicit.',
};

export const rubric = [
  { id: 'clarity', title: 'Clarity of argument', weight: 30, descriptors: ['No identifiable position or argument.', 'A position is hinted at but is difficult to follow.', 'A clear position with some connected reasons.', 'A clear, coherent argument with well-connected reasons.', 'A precise, nuanced argument with consistently developed reasoning.'] },
  { id: 'evidence', title: 'Use of evidence', weight: 40, descriptors: ['No supporting evidence is provided.', 'General assertions or examples are offered without support.', 'Some relevant evidence is given, with limited explanation.', 'Relevant evidence supports the claims and is explained.', 'Well-chosen evidence is critically evaluated, including its limits.'] },
  { id: 'alternatives', title: 'Consideration of alternative perspectives', weight: 30, descriptors: ['No alternative perspective is considered.', 'Another view is mentioned but not explained.', 'A relevant alternative is explained briefly.', 'A relevant alternative is weighed against the main argument.', 'Alternatives are evaluated fairly and integrated into a reasoned conclusion.'] },
];

export const ratingLabels = ['Absent', 'Emerging', 'Developing', 'Secure', 'Accomplished'];

export const team = [
  { name: 'Kamaliden Akmaral', role: 'Argument & writing', contribution: 'Co-wrote the group essay and contributed a reflective note on disciplined practice versus room for creativity. For the poster, shaped the central argument and conclusion wording and proofread the final content.' },
  { name: 'Saparbek Makhambet', role: 'Website & interviews', contribution: 'Built the Assessment Lab website and its interactive assessor activity. Collected the P1–P3 interview accounts with Rakhat and wrote the Week 6 reflective note on assessing analysis rather than recall.' },
  { name: 'Sagatove Madiyar', role: 'Evidence & limitations', contribution: 'Wrote reflective notes on workplace onboarding, Bildung, and whether consistency equals fairness. For the poster, drafted the competence and circumstances lenses and the “What this evidence cannot tell us” limitations panel.' },
  { name: 'Shpringer Artyom', role: 'Finalisation & release', contribution: 'Wrote the reflective note on teaching dilemmas and trust, used for the peer-assessment and practical-wisdom arguments. Finalised the website: contribution records, content review, testing, and the published build.' },
  { name: 'Yesmukhametov Rakhat', role: 'Interviews & grading accounts', contribution: 'Collected the P1–P3 interview accounts with Makhambet and paraphrased them for the “Three voices” section. Wrote the reflective note on grade ceilings and administrative expectations used in the motivation lens.' },
];
export const teamPlaceholder = 'Poster contribution to be completed by the team.';
export const peerFeedback = { changes: '', placeholder: 'Awaiting the team’s actual peer feedback and completed changes.' };

// Exact bibliographic text and DOI URLs from the supplied essay.
export const references = [
  { id: 'biggs', kind: 'Scholarly publication', text: 'Biggs, J. (1996). Enhancing teaching through constructive alignment. Higher Education, 32(3), 347–364.', doi: 'https://doi.org/10.1007/BF00138871' },
  { id: 'double', kind: 'Scholarly publication', text: 'Double, K. S., McGrane, J. A., & Hopfenbeck, T. N. (2020). The impact of peer assessment on academic performance: A meta-analysis of control group studies. Educational Psychology Review, 32(2), 481–509.', doi: 'https://doi.org/10.1007/s10648-019-09510-3' },
  { id: 'kamaliden', kind: 'Course reflection', text: 'Kamaliden, A. (n.d.). Reflective note [Unpublished course reflection]. Astana IT University.', doi: '' },
  { id: 'koenka', kind: 'Scholarly publication', text: 'Koenka, A. C., Linnenbrink-Garcia, L., Moshontz, H., Atkinson, K. M., Sanchez, C. E., & Cooper, H. (2021). A meta-analysis on the impact of grades and comments on academic motivation and achievement: A case for written feedback. Educational Psychology, 41(7), 922–947.', doi: 'https://doi.org/10.1080/01443410.2019.1659939' },
  { id: 'panadero', kind: 'Scholarly publication', text: 'Panadero, E., Jonsson, A., Pinedo, L., & Fernández-Castilla, B. (2023). Effects of rubrics on academic performance, self-regulated learning, and self-efficacy: A meta-analytic review. Educational Psychology Review, 35(4), Article 113.', doi: 'https://doi.org/10.1007/s10648-023-09823-4' },
  { id: 'sagatove', kind: 'Course reflection', text: 'Sagatove, M. (n.d.). Reflective notes [Unpublished course reflection]. Astana IT University.', doi: '' },
  { id: 'saparbek', kind: 'Course reflection', text: 'Saparbek, M. (n.d.). Week 6 reflective notes [Unpublished course reflection]. Astana IT University.', doi: '' },
  { id: 'shpringer', kind: 'Course reflection', text: 'Shpringer, A. (2026). Teaching dilemmas and trust in learning [Unpublished course reflection]. Astana IT University.', doi: '' },
  { id: 'wisniewski', kind: 'Scholarly publication', text: 'Wisniewski, B., Zierer, K., & Hattie, J. (2020). The power of feedback revisited: A meta-analysis of educational feedback research. Frontiers in Psychology, 10, Article 3087.', doi: 'https://doi.org/10.3389/fpsyg.2019.03087' },
  { id: 'yesmukhametov', kind: 'Course reflection', text: 'Yesmukhametov, R. (n.d.). [Reflective note on grading and administrative expectations]. Astana IT University.', doi: '' },
];
