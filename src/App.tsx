import { useEffect, useRef, useState } from 'react';
import { accounts, activity, samples, courseLinks, game, content, peerFeedback, ratingLabels, recommendations, references, rubric, team, teamPlaceholder, themes, trial } from './data';
import { freshActivity, readActivity, weightedGrade } from './scoring';
import type { ActivityState, Ratings } from './scoring';

function Icon({ name, size = 20 }: { name: 'arrow' | 'print' | 'flask' | 'plus' | 'reset' | 'check' | 'external' | 'edit'; size?: number }) {
  const paths = { arrow: 'M4 12h15m-6-6 6 6-6 6', print: 'M7 8V3h10v5M6 17H3V8h18v9h-3M7 14h10v7H7zM17 11h1', flask: 'M9 3h6m-5 0v7L4 20q-1 1 1 1h14q2 0 1-1l-6-10V3M7 16h10', plus: 'M5 12h14M12 5v14', reset: 'M4 10a8 8 0 1 1 1 8M4 4v6h6', check: 'm5 12 4 4 10-10', external: 'M13 4h7v7M20 4l-10 10M10 4H4v16h16v-6', edit: 'm14 4 6 6M3 21l5-1L21 7l-5-5L3 15z' };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{number}</span>{children}</div>;
}

function GradeIllustration() {
  const [open, setOpen] = useState(false);
  return <div className={`grade-exhibit ${open ? 'unfolded' : ''}`}>
    <div className="exhibit-top"><span className="live-dot" />ANATOMY OF A GRADE<span>FIG. 01</span></div>
    <div className="grade-stage">
      <div className="orbit orbit-one" /><div className="orbit orbit-two" />
      <div className="grade-core"><span className="grade-number">72<span className="grade-star">*</span></span><span className="grade-denominator">OUT OF 100</span></div>
      <span className="diagram-label label-one"><i />What was assessed?</span>
      <span className="diagram-label label-two"><i />How was it judged?</span>
      <span className="diagram-label label-three"><i />What happens next?</span>
      <div className="grade-layers" aria-hidden={!open}><div><span>01</span>Criteria<small>What counts?</small></div><div><span>02</span>Evidence<small>What does the work show?</small></div><div><span>03</span>Feedback<small>What could improve?</small></div></div>
    </div>
    <div className="exhibit-bottom"><span>*Illustrative mark,<br />not a model answer.</span><button className="unfold-button" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? 'Fold back the layers' : 'Look behind the grade'}<Icon name={open ? 'reset' : 'plus'} size={17} /></button></div>
  </div>;
}

function Assessor() {
  const [state, setState] = useState<ActivityState>(() => { try { return readActivity(sessionStorage.getItem('assessment-lab:activity:v1')); } catch { return freshActivity(); } });
  const [storageAvailable, setStorageAvailable] = useState(true);
  const pickSample = (avoid = -1) => { let i = Math.floor(Math.random() * samples.length); if (samples.length > 1 && i === avoid) i = (i + 1) % samples.length; return i; };
  const [sampleIndex, setSampleIndex] = useState<number>(() => { try { const v = Number(sessionStorage.getItem('assessment-lab:sample:v1')); if (Number.isInteger(v) && v >= 1 && v <= samples.length) return v - 1; } catch { /* storage blocked */ } return pickSample(); });
  useEffect(() => { try { sessionStorage.setItem('assessment-lab:sample:v1', String(sampleIndex + 1)); } catch { /* storage blocked */ } }, [sampleIndex]);
  const sample = samples[sampleIndex];
  const panel = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  useEffect(() => { try { sessionStorage.setItem('assessment-lab:activity:v1', JSON.stringify(state)); } catch { setStorageAvailable(false); } }, [state]);
  useEffect(() => { if (firstRender.current) { firstRender.current = false; return; } panel.current?.focus({ preventScroll: true }); }, [state.step]);
  const update = (patch: Partial<ActivityState>) => setState(s => ({ ...s, ...patch }));
  const score = weightedGrade(state.ratings, rubric.map(r => r.weight));
  const difference = score === null ? 0 : Math.round((score - state.initial) * 10) / 10;
  const rate = (index: number, value: number) => { const next = [...state.ratings] as Ratings; next[index] = value; update({ ratings: next }); };
  return <section id="activity" className="activity-section section-wrap">
    <div className="section-heading"><div><SectionLabel number="01">THE INTERACTIVE EXPERIMENT</SectionLabel><h2>You are the assessor.</h2></div><p>A random student response. Two ways of looking.<br />What will shape your decision?</p></div>
    <div className="activity-shell">
      <div className="activity-toolbar"><span className="tag"><span className="live-dot" />FICTIONAL CLASSROOM EXAMPLE</span><button className="text-button" onClick={() => { setState(freshActivity()); setSampleIndex(pickSample(sampleIndex)); }}><Icon name="reset" size={15} />New response</button></div>
      <ol className="steps" aria-label="Activity progress">{['First impression', 'Look closer', 'Compare & reflect'].map((label, i) => <li key={label} className={state.step === i + 1 ? 'current' : state.step > i + 1 ? 'complete' : ''} aria-current={state.step === i + 1 ? 'step' : undefined}><span>{state.step > i + 1 ? <Icon name="check" size={15} /> : `0${i + 1}`}</span>{label}</li>)}</ol>
      <div className="experiment-body">
        <div className="student-work"><p className="eyebrow">THE TASK</p><h3>{activity.task}</h3><div className="response-sheet"><span className="eyebrow">SAMPLE STUDENT RESPONSE · {sampleIndex + 1} OF {samples.length}</span><span className="quote-mark" aria-hidden="true">“</span><blockquote>{sample.response}</blockquote><div className="sheet-footer"><span>Read the reasoning.<br />Then make your judgment.</span><span className="handdrawn" aria-hidden="true">↗</span></div></div><p className="small-note">This response is fictional. It is not an interview quotation or a research finding.</p></div>
        <div className="assessor-panel" key={state.step}>
          {state.step === 1 && <>
            <p className="eyebrow">YOUR FIRST IMPRESSION</p><h3 ref={panel} tabIndex={-1}>What grade would you give?</h3><p>Choose an overall grade before seeing the rubric. Use your own judgment.</p>
            <div className="initial-grade"><label htmlFor="initial-grade">Your grade</label><div><output htmlFor="initial-grade">{state.initial}</output><span>/100</span></div></div>
            <input id="initial-grade" aria-label="Initial overall grade" type="range" min="0" max="100" step="1" value={state.initial} onChange={e => update({ initial: Number(e.target.value) })} style={{ '--range-value': `${state.initial}%` } as React.CSSProperties} />
            <div className="range-labels"><span>0</span><span>50</span><span>100</span></div>
            <button className="button primary full" onClick={() => update({ step: 2 })}>Save grade & reveal rubric<Icon name="arrow" /></button><p className="privacy-note">No right answer is hidden here.<br />Your judgment is the starting point.</p>
          </>}
          {state.step === 2 && <>
            <div className="panel-kicker"><p className="eyebrow">NOW MAKE THE CRITERIA EXPLICIT</p><span>Initial: <b>{state.initial}/100</b></span></div><h3 ref={panel} tabIndex={-1}>Reassess the same response.</h3><p className="small-note">Demonstration rubric created for this website. Select 0–4 for each criterion; no ratings are preselected.</p>
            <details className="feedback-box" open><summary>Constructive feedback <Icon name="plus" size={17} /></summary><div className="feedback-content">{sample.feedback.map(item => <p key={item.title}><strong>{item.title}.</strong> {item.text}</p>)}</div></details>
            <div className="rubric-fields">{rubric.map((criterion, index) => <fieldset key={criterion.id}><legend>{criterion.title}<span>{criterion.weight}%</span></legend><div className="rating-options">{ratingLabels.map((label, value) => <label key={value} className={state.ratings[index] === value ? 'selected' : ''}><input type="radio" name={criterion.id} value={value} checked={state.ratings[index] === value} onChange={() => rate(index, value)} aria-describedby={`${criterion.id}-descriptor`} /><b>{value}</b><span>{label}</span></label>)}</div><p id={`${criterion.id}-descriptor`} className="descriptor" aria-live="polite">{state.ratings[index] === null ? 'Choose a rating to see its descriptor.' : criterion.descriptors[state.ratings[index]!]}</p><details className="descriptor-details"><summary>View all descriptors</summary><ol start={0}>{criterion.descriptors.map((d, i) => <li key={d}><strong>{ratingLabels[i]}:</strong> {d}</li>)}</ol></details></fieldset>)}</div>
            <p className="calculation-note">Weighted grade = (clarity ÷ 4 × 30) + (evidence ÷ 4 × 40) + (alternatives ÷ 4 × 30).</p>
            <button className="button primary full" disabled={score === null} onClick={() => update({ step: 3 })}>Compare my decisions<Icon name="arrow" /></button>{score === null && <p className="privacy-note" role="status">Rate all three criteria to continue.</p>}
          </>}
          {state.step === 3 && <>
            <p className="eyebrow">TWO JUDGMENTS, ONE RESPONSE</p><h3 ref={panel} tabIndex={-1}>What influenced your decision?</h3><div className="comparison" aria-live="polite"><div><span>Initial grade</span><b>{state.initial}<small>/100</small></b></div><Icon name="arrow" /><div><span>With the rubric</span><b>{score}<small>/100</small></b></div></div><div className="difference">{difference === 0 ? 'Your numerical grade stayed the same.' : `${difference > 0 ? '+' : '−'}${Math.abs(difference)} points from your initial grade.`}</div>
            <p className="result-explanation">{difference === 0 ? 'A stable grade can still rest on more explicit reasoning.' : 'A different grade is a conversation starter.'} This change—or lack of change—does not prove improved fairness or learning.</p>
            <div className="score-breakdown">{rubric.map((r, i) => <div key={r.id}><span>{r.title}</span><b>{state.ratings[i]}/4 × {r.weight}% = {state.ratings[i]! / 4 * r.weight}</b></div>)}</div>
            <label className="reflection-label" htmlFor="reflection">Your reflection <span>(optional)</span></label><textarea id="reflection" value={state.reflection} maxLength={2000} onChange={e => update({ reflection: e.target.value })} placeholder="The criteria, the weights, the feedback, my assumptions…" rows={3} /><p className="small-note">Did the rubric clarify your decision? Would you challenge any of its criteria or weights?</p>
            <button className="text-button" onClick={() => update({ step: 2 })}>Return to my ratings<Icon name="arrow" size={17} /></button>
          </>}
        </div>
      </div>
      <div className="experiment-footer"><span><span className="tiny-lock" aria-hidden="true">◇</span>{storageAvailable ? 'Your responses stay in this browser session. Nothing is submitted.' : 'Browser storage is unavailable. Responses stay in memory until you leave or reload.'}</span><span>Illustration, not a research experiment.</span></div>
    </div>
    <p className="experiment-takeaway"><span>THE POINT</span>Criteria make assessment decisions more explicit. They do not make judgment disappear.</p>
  </section>;
}

type TeamInfo = { contributions: string[]; changes: string };
const defaultTeam = (): TeamInfo => ({ contributions: team.map(t => t.contribution), changes: peerFeedback.changes });


function GameSection() {
  const [open, setOpen] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden';
    frameRef.current?.focus();
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; openerRef.current?.focus(); };
  }, [open]);
  return <section id="play" className="game-section"><div className="section-wrap">
    <div className="section-heading"><div><SectionLabel number="07">NOW IT’S YOUR TURN</SectionLabel><h2>Run the semester <em>yourself.</em></h2></div><p className="game-tagline">{game.tagline}</p></div>
    <div className="game-layout">
      <button ref={openerRef} className="game-preview" onClick={() => setOpen(true)} aria-label={`Play ${game.title} on this page`}><img src="./game-preview.png" alt={`${game.title} title screen: a lecture hall drawn in pixel art`} loading="lazy" /><span className="game-play-badge"><Icon name="arrow" size={18} />Play</span></button>
      <div className="game-info">
        <span className="eyebrow">THE COMPANION GAME</span><h3>{game.title}</h3><p>{game.intro}</p>
        <ol className="game-chapters">{game.chapters.map(c => <li key={c.week}><b>{c.week}</b><span>{c.title}</span></li>)}</ol>
        <ul className="game-facts">{game.facts.map(f => <li key={f}>{f}</li>)}</ul>
        <div className="game-actions"><button className="button game-primary" onClick={() => setOpen(true)}>Play on this page<Icon name="arrow" /></button><a className="text-button game-newtab" href={game.url} target="_blank" rel="noreferrer">Open in a new tab<Icon name="external" size={15} /><span className="sr-only"> (opens in a new tab)</span></a></div>
      </div>
    </div>
    {open && <div className="game-modal" role="dialog" aria-modal="true" aria-label={game.title} onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="game-frame-wrap"><div className="game-modal-bar"><span>{game.title}</span><a href={game.url} target="_blank" rel="noreferrer">New tab<Icon name="external" size={14} /></a><button onClick={() => setOpen(false)} aria-label="Close the game">✕ Close</button></div>
        <iframe ref={frameRef} onLoad={e => e.currentTarget.focus()} src={game.url} title={`${game.title} — playable game`} allow="autoplay; fullscreen" allowFullScreen /></div>
    </div>}
  </div></section>;
}

function PrintPoster({ info }: { info: TeamInfo }) {
  return <article className="print-poster" aria-label="A3 academic poster">
    <header className="print-header"><div><p>{content.institution}</p><h1>{content.title}</h1><h2>{content.subtitle}</h2></div><div className="print-argument"><strong>{content.argument}</strong><p>{content.conclusion}</p></div></header>
    <div className="print-columns"><div>
      <h2>The assessment problem</h2><p>{content.introduction}</p><h2>Our approach</h2><p>{content.approach}</p><p>{content.approachNote}</p>
      <h2>Five evidence themes</h2>{themes.map(t => <div className="print-theme" key={t.id}><h3>{t.number} / {t.label} <small>{t.kind}</small></h3><p>{t.summary} <em>{t.boundary}</em> <span>({t.citation})</span></p></div>)}
      <div className="print-limit"><h2>Limitations</h2><p>{content.limitations}</p></div>
    </div><div>
      <h2>Individual perspectives</h2>{accounts.map(a => <p key={a.id}><strong>{a.id}:</strong> {a.text}</p>)}
      <h2>Proposed teaching practices</h2>{recommendations.map((r, i) => <p key={r.title}><strong>{i + 1}. {r.title}</strong> {r.text}</p>)}<p>{trial}</p>
      <h2>You are the assessor</h2><p>{activity.explanation}</p><p><strong>Task:</strong> {activity.task}</p><p><strong>Fictional response:</strong> “{activity.response}”</p><p><strong>Weights:</strong> Clarity 30%; evidence 40%; alternative perspectives 30%. Each criterion is rated 0–4. Sum (rating ÷ 4 × weight) for a result out of 100.</p><p><strong>Feedback:</strong> Keep the clear position; qualify broad claims; add relevant evidence; address another perspective.</p>
    </div><div>
      <h2>References</h2><div className="print-references">{references.map(r => <p key={r.id}>{r.text}{r.doi && <> <a href={r.doi}>{r.doi}</a></>}</p>)}</div>
      <h2>Poster contributions</h2>{team.map((member, i) => <p className="print-contribution" key={member.name}><strong>{member.name}:</strong> {info.contributions[i].trim() || teamPlaceholder}</p>)}
      {info.changes.trim() && <><h2>Changes after peer feedback</h2><p className="preserve-lines">{info.changes}</p></>}
    </div></div><footer className="print-footer"><span>Based on: {content.essayTitle} · Play the companion game: {game.url}</span><span>{content.checkedBy}</span></footer>
  </article>;
}

export default function App() {
  const [active, setActive] = useState('overview');
  const info = defaultTeam();
  const nav = [['overview', 'Overview'], ['activity', 'The activity'], ['evidence', 'Evidence'], ['recommendations', 'Recommendations'], ['course', 'Course links'], ['references', 'References'], ['team', 'The team'], ['play', 'Play the game']];
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { for (const e of entries) if (e.isIntersecting) setActive(e.target.id); }, { rootMargin: '-100px 0px -60% 0px', threshold: 0 });
    nav.forEach(([id]) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="screen-site">
      <header className="site-header"><a href="#overview" className="wordmark" aria-label="Assessment Lab home"><span className="brand-icon"><Icon name="flask" size={22} /></span>assessment<span>lab</span><span className="brand-dot">.</span></a><nav aria-label="Poster navigation">{nav.map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} aria-current={active === id ? 'location' : undefined}>{label}</a>)}</nav><a className="print-button" href="./assessment-lab-poster.pdf" download="Assessment-Lab-poster.pdf"><Icon name="print" size={17} /><span>Download poster</span></a></header>
      <main id="main">
        <section id="overview" className="hero section-wrap">
          <div className="hero-copy"><div className="eyebrow hero-eyebrow"><span className="live-dot" />AN INTERACTIVE ACADEMIC POSTER</div><h1>What does a grade<br />actually <em>tell us?</em></h1><p className="hero-intro">{content.introduction}</p><div className="hero-actions"><a className="button primary" href="#activity">Step into the assessor’s shoes<Icon name="arrow" size={19} /></a><a className="quiet-link" href="#evidence">Explore the evidence<span>↗</span></a></div><div className="hero-meta"><span>ASTANA IT UNIVERSITY</span><span>MT-2601M</span><span>ASSESSMENT & LEARNING</span></div></div><GradeIllustration />
        </section>
        <section className="argument-band"><div className="section-wrap argument-inner"><span className="eyebrow">OUR CENTRAL ARGUMENT</span><h2>Fairness is in the <em>design.</em></h2><p>{content.argument}</p><div className="principles">{content.principles.map((p, i) => <span key={p}><b>0{i + 1}</b>{p}</span>)}</div><p className="balanced-position">{content.conclusion}</p></div></section>
        <Assessor />
        <section id="evidence" className="evidence-section section-wrap"><div className="section-heading"><div><SectionLabel number="02">THE EVIDENCE</SectionLabel><h2>Five lenses on fairness.</h2></div><p>Different sources answer different questions.<br />Keep their strengths—and limits—in view.</p></div>
          <div className="approach"><div><span className="eyebrow">OUR APPROACH</span><p>{content.approach}</p></div><div className="source-counts"><div><b>5</b><span>scholarly<br />publications</span></div><span>+</span><div><b>5</b><span>reflective<br />notes</span></div><span>+</span><div><b>3</b><span>interview<br />accounts</span></div></div></div>
          <div className="evidence-rows">{themes.map(t => <article className="evidence-row" key={t.id}><span className="row-number">{t.number}</span><div className="theme-heading"><span className="eyebrow">{t.label}</span><h3>{t.title}</h3></div><div className="theme-copy"><span className={`source-tag ${t.id === 'circumstances' ? 'amber' : ''}`}>{t.kind}</span><p>{t.summary}</p><p className="boundary">{t.boundary}</p><details><summary>Read the context <Icon name="plus" size={16} /></summary><div className="detail-body"><p>{t.detail}</p><a href={`#ref-${t.ref}`}>{t.citation}<Icon name="arrow" size={15} /></a>{t.id === 'feedback' && <a href="#ref-double">Double et al., 2020<Icon name="arrow" size={15} /></a>}</div></details></div></article>)}</div>
          <div className="interviews"><div className="interview-intro"><span className="eyebrow">PERSONAL ACCOUNTS</span><h3>Three voices.<br />Not a survey.</h3><p>{content.approachNote}</p></div><div className="interview-accounts">{accounts.map(a => <article key={a.id}><span className="account-id">{a.id}</span><div><h4>{a.heading}</h4><p>{a.text}</p><span className="small-note">Paraphrase from the essay</span></div></article>)}</div></div>
          <aside className="limitations"><span className="limitation-symbol" aria-hidden="true">↳</span><div><h3>What this evidence cannot tell us</h3><p>{content.limitations}</p></div><span className="eyebrow">LIMITATIONS</span></aside>
        </section>
        <section id="recommendations" className="recommendations-section"><div className="section-wrap"><div className="section-heading"><div><SectionLabel number="03">FROM ARGUMENT TO PRACTICE</SectionLabel><h2>Better assessment,<br /><em>by design.</em></h2></div><div className="recommendation-intro"><span className="source-tag">OUR PROPOSALS</span><p>Teaching practices drawn from the essay.<br />These are proposals to evaluate, not interventions tested by our project.</p></div></div><div className="recommendation-list">{recommendations.map((r, i) => <article key={r.title}><span>0{i + 1}</span><h3>{r.title}</h3><p>{r.text}</p><Icon name="arrow" /></article>)}</div><div className="trial-note"><span className="eyebrow">TRY. LISTEN. REVISE.</span><p>{trial}</p></div></div></section>
        <section id="course" className="course-section section-wrap"><div className="section-heading"><div><SectionLabel number="04">CONNECTING TO THE COURSE</SectionLabel><h2>What the course readings add.</h2></div><p>Six links between our essay and the<br />Weeks 6–10 readings of Higher Education Pedagogy.</p></div>
          <div className="course-grid">{courseLinks.map(c => <article key={c.title} className="course-card"><div className="course-meta"><span className="course-week">{c.week}</span><span className="course-essay">Essay: {c.essay}</span></div><h3>{c.title}</h3><p>{c.text}</p><p className="course-link"><b>For our argument:</b> {c.link}</p><span className="course-source">{c.source}</span></article>)}</div>
          <p className="small-note course-note">Course materials are summarised from the readings and slides provided in the course. They extend the essay’s argument; they were not part of the essay’s original evidence base.</p></section>
        <section id="references" className="references-section section-wrap"><div className="section-heading"><div><SectionLabel number="05">FOLLOW THE SOURCES</SectionLabel><h2>The reading behind the reasoning.</h2></div><p>Bibliographic details reproduced from the essay.<br />Five publications and five course reflections.</p></div><div className="reference-list">{references.map((r, i) => <article id={`ref-${r.id}`} key={r.id}><span className="reference-number">[{String(i + 1).padStart(2, '0')}]</span><div><span className="eyebrow">{r.kind}</span><p>{r.text}</p>{r.doi && <a href={r.doi} target="_blank" rel="noreferrer">{r.doi}<Icon name="external" size={14} /><span className="sr-only"> (opens in a new tab)</span></a>}</div></article>)}</div></section>
        <section id="team" className="team-section section-wrap"><div className="section-heading"><div><SectionLabel number="06">THE PEOPLE BEHIND THE POSTER</SectionLabel><h2>A shared argument.<br />Visible contributions.</h2></div></div><p className="team-explanation">{content.institution}<br />{content.checkedBy}</p>
          <div className="team-list">{team.map((m, i) => <article key={m.name}><span>0{i + 1}</span><div><h3>{m.name}</h3><span className="team-role">{team[i].role}</span></div><p className="preserve-lines">{info.contributions[i].trim() || teamPlaceholder}</p></article>)}</div>
          {info.changes.trim() && <div className="peer-feedback"><div><span className="eyebrow">A POSTER IS A WORK IN PROGRESS</span><h3>Changes after peer feedback</h3></div><p className="preserve-lines">{info.changes}</p></div>}
        </section>
        <GameSection />
      </main><footer className="site-footer"><div className="section-wrap"><a className="wordmark" href="#overview"><Icon name="flask" />assessment<span>lab.</span></a><p>A grade is a starting point.<br /><span>Make the reasoning visible.</span></p><a href="#overview">Back to the top ↑</a></div></footer>
    </div><PrintPoster info={info} />
  </>;
}
