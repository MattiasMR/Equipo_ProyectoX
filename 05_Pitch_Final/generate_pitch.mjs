import path from "node:path";
import { pathToFileURL } from "node:url";

const runtimeModules = process.env.RUNTIME_NODE_MODULES;
if (!runtimeModules) {
  throw new Error("RUNTIME_NODE_MODULES debe apuntar al node_modules del runtime de Codex.");
}
const artifactToolUrl = pathToFileURL(
  path.join(runtimeModules, "@oai", "artifact-tool", "dist", "artifact_tool.mjs"),
).href;
const { Presentation, PresentationFile } = await import(artifactToolUrl);

const W = 1280;
const H = 720;
const C = {
  ink: "#111317",
  panel: "#1B1F25",
  panel2: "#242A32",
  line: "#3B424D",
  paper: "#F7F5F0",
  white: "#FFFFFF",
  text: "#F4F1EA",
  muted: "#A8AFB9",
  darkMuted: "#59616B",
  coral: "#E36D5B",
  yellow: "#E7B85B",
  green: "#61A77B",
  blue: "#65A6C8",
  danger: "#EF8879",
};

const deck = Presentation.create({ slideSize: { width: W, height: H } });

function box(slide, name, left, top, width, height, fill, line = "none", radius = 6) {
  return slide.shapes.add({
    name,
    geometry: radius ? "roundRect" : "rect",
    position: { left, top, width, height },
    fill,
    line: { style: "solid", fill: line, width: line === "none" ? 0 : 1 },
    borderRadius: radius,
  });
}

function rule(slide, name, x1, y1, x2, y2, color = C.line, width = 1) {
  return slide.shapes.add({
    name,
    geometry: "line",
    position: {
      left: Math.min(x1, x2),
      top: Math.min(y1, y2),
      width: Math.abs(x2 - x1),
      height: Math.abs(y2 - y1),
    },
    line: { style: "solid", fill: color, width },
  });
}

function txt(slide, name, value, left, top, width, height, opts = {}) {
  const shape = slide.shapes.add({
    name,
    geometry: "textbox",
    position: { left, top, width, height },
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });
  shape.text = value;
  shape.text.style = {
    fontSize: opts.size ?? 22,
    typeface: opts.font ?? "Aptos",
    color: opts.color ?? C.ink,
    bold: opts.bold ?? false,
    alignment: opts.align ?? "left",
    verticalAlignment: opts.valign ?? "top",
    autoFit: opts.autoFit ?? "shrinkText",
    wrap: "square",
    insets: opts.insets ?? { top: 0, right: 0, bottom: 0, left: 0 },
  };
  return shape;
}

function addHeader(slide, title, number, dark = false, kicker = "RITMO") {
  txt(slide, `kicker-${number}`, kicker, 48, 28, 180, 22, {
    size: 12, bold: true, color: dark ? C.yellow : C.coral,
  });
  txt(slide, `title-${number}`, title, 48, 58, 1138, 74, {
    size: 38, bold: true, color: dark ? C.text : C.ink,
  });
  txt(slide, `num-${number}`, String(number).padStart(2, "0"), 1190, 666, 42, 18, {
    size: 11, bold: true, color: dark ? C.muted : C.darkMuted, align: "right",
  });
}

function note(slide, script, sources = []) {
  const sourceBlock = sources.length
    ? `\n\n[Sources]\n${sources.map((s) => `- ${s}`).join("\n")}\n[/Sources]`
    : "";
  slide.speakerNotes.textFrame.setText(`${script}${sourceBlock}`);
  slide.speakerNotes.setVisible(true);
}

function metric(slide, x, y, w, h, value, label, accent, dark = false) {
  box(slide, `metric-${value}-${x}`, x, y, w, h, dark ? C.panel : C.white, dark ? C.line : "#D8D4CC", 6);
  box(slide, `metric-accent-${value}-${x}`, x, y, 8, h, accent, "none", 4);
  txt(slide, `metric-value-${value}-${x}`, value, x + 28, y + 24, w - 52, 64, {
    size: 42, bold: true, color: dark ? C.text : C.ink,
  });
  txt(slide, `metric-label-${value}-${x}`, label, x + 28, y + 94, w - 52, h - 112, {
    size: 17, color: dark ? C.muted : C.darkMuted,
  });
}

// 1. Hook
{
  const s = deck.slides.add();
  s.background.fill = C.ink;
  txt(s, "brand", "RITMO", 52, 36, 180, 28, { size: 15, bold: true, color: C.yellow });
  txt(s, "hook", "Un turno cambia.\nTu semana no debería colapsar.", 52, 126, 688, 218, {
    size: 54, bold: true, color: C.text,
  });
  txt(s, "subhook", "Replanificación semanal para estudiantes que trabajan con turnos variables.", 55, 372, 620, 70, {
    size: 24, color: C.muted,
  });
  box(s, "ask-line", 54, 492, 210, 5, C.coral, "none", 0);
  txt(s, "team", "ProyectoX · Pitch final 2026", 55, 520, 420, 28, { size: 16, color: C.text });

  box(s, "week-frame", 790, 82, 418, 548, C.panel, C.line, 6);
  txt(s, "week-label", "MARTES · 18:00", 824, 112, 210, 20, { size: 12, bold: true, color: C.muted });
  txt(s, "week-title", "El turno se extendió", 824, 145, 340, 45, { size: 26, bold: true, color: C.text });
  const days = ["L", "M", "X", "J", "V"];
  days.forEach((d, i) => {
    const x = 824 + i * 67;
    txt(s, `day-${d}`, d, x, 218, 42, 20, { size: 12, bold: true, color: i === 1 ? C.coral : C.muted, align: "center" });
    box(s, `day-col-${d}`, x, 246, 42, 292, C.panel2, i === 1 ? C.coral : C.line, 4);
  });
  box(s, "work-base", 896, 268, 32, 128, C.coral, "none", 3);
  box(s, "work-extra", 896, 403, 32, 76, C.danger, "none", 3);
  box(s, "study-lost", 964, 436, 32, 78, C.yellow, "none", 3);
  txt(s, "work-tag", "+3 h", 888, 493, 50, 20, { size: 11, bold: true, color: C.danger, align: "center" });
  txt(s, "week-result", "Ritmo mueve el estudio\nantes del plazo.", 824, 557, 330, 46, { size: 17, bold: true, color: C.green });
  note(s, "[Mattias · 0:00–0:18] Un turno cambia. Tu semana no debería colapsar. Somos Ritmo: una herramienta para estudiantes que trabajan y necesitan reparar su planificación cuando el trabajo cambia sin aviso.");
}

// 2. Problem and segment
{
  const s = deck.slides.add();
  s.background.fill = C.paper;
  addHeader(s, "El problema no es recordar la prueba. Es decidir qué sacrificar.", 2);

  txt(s, "segment-label", "SEGMENTO INICIAL", 52, 150, 250, 22, { size: 12, bold: true, color: C.coral });
  txt(s, "segment", "Estudiantes de educación superior que trabajan 15–30 horas semanales en turnos variables.", 52, 181, 540, 110, {
    size: 29, bold: true,
  });

  const events = [
    { t: "18:00", label: "Comienza el turno", color: C.blue },
    { t: "23:30", label: "Falta un compañero", color: C.coral },
    { t: "00:10", label: "Avisan que debe quedarse", color: C.danger },
    { t: "03:00", label: "Sale; pierde el bloque de estudio", color: C.yellow },
  ];
  rule(s, "timeline", 654, 185, 654, 558, "#CBC6BC", 2);
  events.forEach((e, i) => {
    const y = 178 + i * 105;
    box(s, `dot-${i}`, 644, y, 20, 20, e.color, "none", 10);
    txt(s, `time-${i}`, e.t, 688, y - 3, 92, 25, { size: 15, bold: true, color: e.color });
    txt(s, `event-${i}`, e.label, 782, y - 3, 402, 48, { size: 19, bold: i === 3 });
  });

  box(s, "impact", 52, 346, 540, 212, C.white, "#D8D4CC", 6);
  txt(s, "impact-title", "Costo observado", 78, 374, 220, 28, { size: 16, bold: true, color: C.darkMuted });
  txt(s, "impact-copy", "Tiempo · sueño · desempeño académico", 78, 418, 458, 44, { size: 27, bold: true });
  txt(s, "impact-evidence", "7 registros de entrevista convergen en cambios avisados tarde, recuperación manual y choques frecuentes con clases o estudio.", 78, 484, 458, 55, { size: 17, color: C.darkMuted });
  txt(s, "footnote", "Evidencia del proyecto: síntesis transversal y entrevistas INT-01 a INT-07.", 52, 630, 760, 22, { size: 11, color: C.darkMuted });
  note(s, "[Mattias · 0:18–0:50] Partimos por un segmento concreto: estudiantes de educación superior que trabajan entre quince y treinta horas semanales con turnos variables. En siete registros de entrevista se repitió el mismo episodio: un cambio se avisa durante el turno y el plan académico deja de ser viable. El costo no es sólo desorden. Es perder sueño, faltar a clases o llegar peor preparado a una evaluación.", ["Repositorio del proyecto: 01_Discovery/E2_Plantilla4_Sintesis_Evidencia_2026-08-02.md"]);
}

// 3. Solution and MVP
{
  const s = deck.slides.add();
  s.background.fill = C.paper;
  addHeader(s, "Ritmo repara la semana en tres decisiones.", 3);
  const steps = [
    ["01", "Registra", "la extensión laboral"],
    ["02", "Prioriza", "plazo y capacidad"],
    ["03", "Confirma", "un plan viable"],
  ];
  steps.forEach((st, i) => {
    const y = 174 + i * 128;
    txt(s, `step-n-${i}`, st[0], 52, y, 46, 26, { size: 14, bold: true, color: C.coral });
    txt(s, `step-t-${i}`, st[1], 112, y - 4, 190, 31, { size: 23, bold: true });
    txt(s, `step-b-${i}`, st[2], 112, y + 31, 220, 25, { size: 16, color: C.darkMuted });
    if (i < 2) rule(s, `step-line-${i}`, 74, y + 37, 74, y + 116, "#CBC6BC", 2);
  });
  box(s, "three-min", 52, 568, 278, 58, C.yellow, "none", 4);
  txt(s, "three-min-text", "Objetivo: menos de 3 minutos", 67, 585, 248, 24, { size: 16, bold: true, color: "#241B08", align: "center" });

  // Editable reconstruction of the actual MVP v0.2 screen.
  box(s, "mvp-frame", 382, 148, 850, 484, C.ink, C.line, 6);
  box(s, "mvp-head", 382, 148, 850, 58, "#15181D", C.line, 6);
  box(s, "mvp-logo", 407, 162, 30, 30, "none", C.yellow, 15);
  txt(s, "mvp-r", "R", 415, 168, 14, 15, { size: 12, bold: true, color: C.yellow, align: "center" });
  txt(s, "mvp-name", "Ritmo", 450, 161, 100, 23, { size: 16, bold: true, color: C.text });
  txt(s, "mvp-version", "MVP v0.2 · Replanificación semanal", 450, 183, 240, 15, { size: 10, color: C.muted });
  txt(s, "mvp-scenario", "Tu turno se extendió. Repara la semana.", 407, 226, 440, 31, { size: 22, bold: true, color: C.text });
  box(s, "mvp-action", 1016, 226, 187, 36, C.coral, "none", 4);
  txt(s, "mvp-action-t", "Extensión registrada", 1031, 237, 157, 16, { size: 11, bold: true, color: "#1D0B08", align: "center" });
  const dayNames = ["LUN", "MAR", "MIÉ", "JUE", "VIE"];
  dayNames.forEach((d, i) => {
    const x = 407 + i * 156;
    box(s, `mvp-day-${i}`, x, 286, 142, 205, C.panel, i === 1 ? C.danger : C.line, 4);
    txt(s, `mvp-day-h-${i}`, d, x + 12, 300, 48, 18, { size: 10, bold: true, color: C.text });
    txt(s, `mvp-load-${i}`, i === 1 ? "11/8 h" : `${[5, 0, 6, 4, 3][i]}/8 h`, x + 76, 300, 52, 18, { size: 9, bold: i === 1, color: i === 1 ? C.danger : C.muted, align: "right" });
    const bars = i === 1 ? [[C.coral, 338, 52], [C.danger, 398, 56], [C.yellow, 462, 20]] : [[i % 2 ? C.blue : C.yellow, 342, 42], [C.green, 397, 30]];
    bars.forEach((b, j) => box(s, `mvp-bar-${i}-${j}`, x + 12, b[1], 118, b[2], C.panel2, "none", 3));
    bars.forEach((b, j) => box(s, `mvp-accent-${i}-${j}`, x + 12, b[1], 4, b[2], b[0], "none", 2));
  });
  box(s, "mvp-result", 407, 514, 796, 88, C.panel, C.green, 4);
  txt(s, "mvp-result-title", "Plan viable confirmado", 428, 532, 260, 22, { size: 15, bold: true, color: C.text });
  txt(s, "mvp-result-copy", "La prueba mantiene un bloque antes del plazo y no quedan días sobrecargados.", 428, 558, 548, 26, { size: 12, color: C.muted });
  box(s, "mvp-apply", 1027, 537, 150, 38, C.green, "none", 4);
  txt(s, "mvp-apply-t", "Aplicar propuesta", 1042, 549, 120, 15, { size: 10, bold: true, color: "#08170E", align: "center" });
  txt(s, "mvp-caption", "Reconstrucción editable de la interfaz real del MVP v0.2", 946, 640, 286, 18, { size: 10, color: C.darkMuted, align: "right" });
  note(s, "[Ariel · 0:50–1:25] La solución no intenta adivinar toda la vida del usuario. Hace una tarea concreta en tres pasos: registra el cambio laboral, prioriza por plazo y capacidad, y deja al usuario confirmar una propuesta. El MVP v0.2 ya ejecuta ese flujo sobre una semana realista y muestra por qué una tarea se mueve. La promesa es recuperar un plan viable en menos de tres minutos.", ["Repositorio del proyecto: 03_MVP_Experimentos/MVP_v0.2/index.html"]);
}

// 4. Experiment and traction
{
  const s = deck.slides.add();
  s.background.fill = C.ink;
  addHeader(s, "La primera señal conductual cumplió el umbral, justo.", 4, true, "EXPERIMENTO EXP-01");
  metric(s, 52, 160, 260, 178, "5/5", "completaron la tarea", C.green, true);
  metric(s, 340, 160, 260, 178, "4/5", "terminaron sin ayuda", C.blue, true);
  metric(s, 628, 160, 260, 178, "3/5", "sin ayuda en ≤3 min", C.yellow, true);
  metric(s, 916, 160, 264, 178, "2:51", "tiempo promedio", C.coral, true);

  txt(s, "threshold-label", "CRITERIO DE ÉXITO", 52, 390, 220, 22, { size: 12, bold: true, color: C.yellow });
  txt(s, "threshold-copy", "≥60% sin ayuda y en menos de 3 minutos", 52, 422, 518, 34, { size: 24, bold: true, color: C.text });
  box(s, "bar-bg", 52, 486, 760, 28, C.panel2, "none", 4);
  box(s, "bar-fill", 52, 486, 456, 28, C.yellow, "none", 4);
  txt(s, "bar-60", "60%", 520, 488, 70, 24, { size: 15, bold: true, color: C.yellow });
  txt(s, "friction-title", "Lo que aprendimos", 872, 390, 300, 25, { size: 17, bold: true, color: C.text });
  txt(s, "friction-list", "• La secuencia no era obvia\n• Faltaba explicar el porqué\n• El plazo debía verse siempre", 872, 427, 308, 115, { size: 18, color: C.muted });
  txt(s, "decision", "Decisión: perseverar con el núcleo y rediseñar la guía.", 52, 574, 760, 36, { size: 20, bold: true, color: C.green });
  txt(s, "traction-note", "Evidencia temprana de uso; todavía no hay retención ni pagos observados.", 52, 626, 760, 22, { size: 12, color: C.muted });
  note(s, "[Ariel · 1:25–1:55] Probamos una tarea: incorporar una extensión de tres horas y conservar un bloque de estudio antes de la prueba. Cinco de cinco completaron; cuatro lo hicieron sin ayuda; tres, además, en menos de tres minutos. Eso equivale al sesenta por ciento, exactamente el umbral. No lo llamamos tracción comercial: es evidencia conductual temprana. Aprendimos que debemos hacer visible el porqué de cada cambio.", ["Repositorio del proyecto: 03_MVP_Experimentos/E2_Plantilla6Z_Log_Evidencia_2026-08-02.md"]);
}

// 5. Market
{
  const s = deck.slides.add();
  s.background.fill = C.paper;
  addHeader(s, "Empezamos con 343 mil estudiantes en Chile.", 5, false, "MERCADO · BOTTOM-UP");

  const tiers = [
    { y: 170, w: 1128, fill: "#E7E2D9", label: "TAM", users: "1.372.167", value: "$49,2 mil MM ARR", note: "pregrado Chile 2026" },
    { y: 290, w: 848, fill: "#C9DCE6", label: "SAM", users: "343.042", value: "$12,3 mil MM ARR", note: "25% con trabajo/turnos variables · supuesto" },
    { y: 410, w: 568, fill: "#F1D49A", label: "SOM", users: "3.430", value: "$123 MM ARR", note: "1% del SAM a 3 años · objetivo" },
  ];
  tiers.forEach((t, i) => {
    box(s, `tier-${i}`, 52, t.y, t.w, 92, t.fill, "none", 6);
    txt(s, `tier-label-${i}`, t.label, 76, t.y + 20, 80, 28, { size: 17, bold: true, color: C.ink });
    txt(s, `tier-users-${i}`, t.users, 174, t.y + 14, 220, 36, { size: 27, bold: true });
    txt(s, `tier-note-${i}`, t.note, 174, t.y + 53, 360, 20, { size: 12, color: C.darkMuted });
    txt(s, `tier-value-${i}`, t.value, 768, t.y + 26, Math.max(250, t.w - 740), 32, { size: 23, bold: true, align: "right" });
  });
  txt(s, "market-formula", "Precio anual: $2.990 × 12 = $35.880 por usuario", 52, 548, 540, 28, { size: 17, bold: true });
  txt(s, "market-caveat", "La proporción de estudiantes con turnos variables es la hipótesis de mercado que sigue en validación.", 52, 587, 780, 42, { size: 14, color: C.darkMuted });
  txt(s, "source", "Fuente base: SIES, matrícula total de pregrado 2026.", 52, 650, 600, 20, { size: 11, color: C.darkMuted });
  note(s, "[Francisco · 1:55–2:23] Construimos el mercado desde abajo. En Chile hay un millón trescientos setenta y dos mil estudiantes de pregrado. A un precio anual de treinta y cinco mil ochocientos ochenta pesos, ese es un TAM de cuarenta y nueve mil doscientos millones. Para el SAM usamos una hipótesis conservadora: veinticinco por ciento con trabajo y turnos variables. El SOM a tres años es captar uno por ciento de ese grupo: tres mil cuatrocientos treinta usuarios.", ["https://educacionsuperior.mineduc.cl/2026/07/30/matricula-en-educacion-superior-crece-por-quinto-ano-consecutivo/", "https://educacionsuperior.mineduc.cl/wp-content/uploads/sites/49/2026/07/Informe-de-Matricula-2026.pdf"]);
}

// 6. Business model
{
  const s = deck.slides.add();
  s.background.fill = C.paper;
  addHeader(s, "$2.990 al mes, con economics objetivo de 4×.", 6, false, "MODELO DE NEGOCIO");
  box(s, "free-tier", 52, 168, 300, 382, C.white, "#D8D4CC", 6);
  txt(s, "free-name", "Ritmo Free", 78, 198, 220, 31, { size: 22, bold: true });
  txt(s, "free-price", "$0", 78, 247, 160, 55, { size: 44, bold: true, color: C.darkMuted });
  txt(s, "free-list", "3 replanificaciones al mes\nCarga manual de actividades\nPlan semanal básico", 78, 330, 230, 120, { size: 17, color: C.darkMuted });
  txt(s, "free-job", "Adquisición y aprendizaje", 78, 494, 220, 22, { size: 13, bold: true, color: C.coral });

  box(s, "plus-tier", 378, 146, 350, 426, C.ink, C.ink, 6);
  txt(s, "plus-name", "Ritmo Plus", 408, 180, 250, 31, { size: 22, bold: true, color: C.text });
  txt(s, "plus-price", "$2.990", 408, 226, 250, 57, { size: 46, bold: true, color: C.yellow });
  txt(s, "plus-month", "CLP / mes", 410, 285, 130, 22, { size: 14, color: C.muted });
  txt(s, "plus-list", "Replanificación ilimitada\nExplicación de cada cambio\nIntegración con calendario\nHistorial y recordatorios", 408, 340, 270, 142, { size: 18, color: C.text });
  txt(s, "plus-note", "Precio por validar con señal de pago", 408, 520, 270, 20, { size: 12, color: C.muted });

  txt(s, "economics-label", "UNIT ECONOMICS OBJETIVO", 784, 162, 320, 22, { size: 12, bold: true, color: C.coral });
  const economics = [
    ["Margen bruto", "85%"],
    ["CAC blended", "$8.000"],
    ["Churn mensual", "8%"],
    ["LTV bruto", "$31.769"],
  ];
  economics.forEach((e, i) => {
    const y = 206 + i * 70;
    txt(s, `eco-label-${i}`, e[0], 784, y, 190, 25, { size: 16, color: C.darkMuted });
    txt(s, `eco-value-${i}`, e[1], 1010, y - 2, 170, 30, { size: 22, bold: true, align: "right" });
    rule(s, `eco-rule-${i}`, 784, y + 38, 1180, y + 38, "#D8D4CC", 1);
  });
  box(s, "ratio", 784, 500, 396, 72, C.green, "none", 5);
  txt(s, "ratio-text", "LTV / CAC = 4,0×", 806, 520, 352, 30, { size: 25, bold: true, color: "#08170E", align: "center" });
  txt(s, "economics-caveat", "Modelo objetivo; CAC, churn y margen aún no observados.", 784, 590, 396, 34, { size: 12, color: C.darkMuted });
  note(s, "[Francisco · 2:23–2:55] El modelo parte freemium. La versión gratuita permite tres replanificaciones al mes; Ritmo Plus cuesta dos mil novecientos noventa pesos e incorpora uso ilimitado, explicación e integración con calendario. Los unit economics todavía son objetivos, no resultados: margen bruto de ochenta y cinco por ciento, CAC de ocho mil pesos y churn mensual de ocho por ciento producen un LTV bruto de treinta y un mil setecientos sesenta y nueve pesos, cuatro veces el CAC.", ["Repositorio del proyecto: 02_Modelo/E2_Plantilla7_LeanCanvas_v2_2026-08-02.md"]);
}

// 7. Competition and why now
{
  const s = deck.slides.add();
  s.background.fill = C.paper;
  addHeader(s, "Las agendas registran. Ritmo replanifica.", 7, false, "COMPETENCIA · POR QUÉ AHORA");
  box(s, "matrix", 52, 154, 730, 472, C.white, "#D8D4CC", 4);
  rule(s, "x-axis", 125, 553, 730, 553, C.ink, 2);
  rule(s, "y-axis", 125, 553, 125, 207, C.ink, 2);
  txt(s, "x-left", "Genérico", 126, 571, 130, 20, { size: 12, color: C.darkMuted });
  txt(s, "x-right", "Estudio + trabajo", 566, 571, 164, 20, { size: 12, bold: true, color: C.darkMuted, align: "right" });
  txt(s, "y-low", "Registra", 66, 520, 50, 20, { size: 11, color: C.darkMuted, align: "right" });
  txt(s, "y-high", "Replanifica", 52, 206, 64, 20, { size: 11, bold: true, color: C.darkMuted, align: "right" });
  const players = [
    { x: 225, y: 481, label: "Google Calendar", fill: "#D7DDE3" },
    { x: 310, y: 432, label: "Notion / Trello", fill: "#D7DDE3" },
    { x: 596, y: 454, label: "MyStudyLife", fill: C.blue },
    { x: 335, y: 282, label: "Motion", fill: C.coral },
    { x: 610, y: 245, label: "RITMO", fill: C.yellow },
  ];
  players.forEach((p, i) => {
    box(s, `player-${i}`, p.x, p.y, i === 4 ? 102 : 128, 38, p.fill, "none", 19);
    txt(s, `player-t-${i}`, p.label, p.x + 8, p.y + 11, (i === 4 ? 86 : 112), 16, { size: 11, bold: i === 4, align: "center" });
  });

  txt(s, "now-label", "VENTANA DE OPORTUNIDAD", 838, 166, 320, 22, { size: 12, bold: true, color: C.coral });
  const now = [
    ["1,37 M", "estudiantes de pregrado en Chile"],
    ["API", "calendarios e integración disponibles"],
    ["IA", "menor costo para explicar y priorizar"],
  ];
  now.forEach((n, i) => {
    const y = 216 + i * 118;
    txt(s, `now-v-${i}`, n[0], 838, y, 130, 40, { size: 30, bold: true, color: [C.blue, C.green, C.yellow][i] });
    txt(s, `now-l-${i}`, n[1], 980, y + 4, 214, 50, { size: 17, bold: true });
    if (i < 2) rule(s, `now-r-${i}`, 838, y + 78, 1194, y + 78, "#D8D4CC", 1);
  });
  txt(s, "positioning", "Ventaja inicial: flujo especializado, local y explicable.", 838, 578, 356, 34, { size: 17, bold: true, color: C.green });
  note(s, "[Carlos · 2:55–3:25] El mapa usa dos criterios del cliente: cuánto entiende la herramienta la vida estudio-trabajo y cuánto reacciona cuando algo cambia. Calendarios y planners registran; Motion replanifica, pero está pensado para profesionales y cobra diecinueve dólares mensuales. MyStudyLife entiende lo académico, pero no el conflicto laboral. Ritmo ocupa el cuadrante especializado y reactivo. Ahora es viable por la escala del segmento, las APIs de calendario y el menor costo de priorizar y explicar con IA.", ["https://www.usemotion.com/", "https://www-dev.usemotion.com/pricing", "https://mystudylife.com/tour/", "https://educacionsuperior.mineduc.cl/2026/07/30/matricula-en-educacion-superior-crece-por-quinto-ano-consecutivo/"]);
}

// 8. Team
{
  const s = deck.slides.add();
  s.background.fill = C.paper;
  addHeader(s, "Construimos desde el problema, no desde el calendario.", 8, false, "EQUIPO");
  txt(s, "fit", "El equipo ya recorrió discovery, síntesis, modelo, prototipo y experimento. Los roles siguen ese trabajo.", 52, 143, 1010, 42, { size: 19, color: C.darkMuted });
  const members = [
    ["MM", "Mattias Morales", "Producto y research", "Mantiene el foco en el episodio y la evidencia."],
    ["AV", "Ariel Van Kilsdonk", "Discovery y alianzas", "Convierte entrevistas en pilotos accesibles."],
    ["FP", "Francisco Polo", "Negocio y growth", "Valida precio, canal y economía por usuario."],
    ["CO", "Carlos Orellana", "Tecnología y experimento", "Convierte hipótesis en flujos medibles."],
  ];
  members.forEach((m, i) => {
    const x = 52 + i * 290;
    box(s, `member-${i}`, x, 230, 258, 326, C.white, "#D8D4CC", 6);
    box(s, `avatar-${i}`, x + 24, 256, 62, 62, [C.yellow, C.blue, C.green, C.coral][i], "none", 31);
    txt(s, `avatar-t-${i}`, m[0], x + 34, 276, 42, 22, { size: 16, bold: true, align: "center" });
    txt(s, `member-name-${i}`, m[1], x + 24, 342, 210, 54, { size: 21, bold: true });
    txt(s, `member-role-${i}`, m[2], x + 24, 414, 210, 44, { size: 15, bold: true, color: C.coral });
    txt(s, `member-fit-${i}`, m[3], x + 24, 474, 210, 60, { size: 15, color: C.darkMuted });
  });
  txt(s, "camera-note", "En esta lámina, cada integrante toma 7 segundos y aparece en cámara.", 52, 610, 700, 22, { size: 12, color: C.darkMuted });
  note(s, "[Equipo · 3:25–3:53] Mattias: Yo lidero producto y research, manteniendo el foco en el episodio real. Ariel: Yo conduzco discovery y alianzas para convertir entrevistas en pilotos. Francisco: Yo valido pricing, canales y economía por usuario. Carlos: Yo llevo tecnología y experimentos, transformando hipótesis en flujos medibles. Nuestro fit no es un CV: es haber recorrido juntos el problema, la evidencia y el MVP.");
}

// 9. Roadmap and ask
{
  const s = deck.slides.add();
  s.background.fill = C.paper;
  addHeader(s, "18 meses para demostrar repetición y pago.", 9, false, "ROADMAP · ASK");
  const phases = [
    ["0–3 m", "Producto", "v0.3 + piloto de 30", C.blue],
    ["4–6 m", "Integración", "Calendar + 100 MAU", C.green],
    ["7–12 m", "Pago", "100 pagos + 2 IES", C.yellow],
    ["13–18 m", "Escala", "1.000 MAU + 30% R8", C.coral],
  ];
  phases.forEach((p, i) => {
    const x = 52 + i * 220;
    txt(s, `phase-time-${i}`, p[0], x, 158, 170, 22, { size: 12, bold: true, color: C.darkMuted });
    box(s, `phase-bar-${i}`, x, 194, 190, 14, p[3], "none", 7);
    txt(s, `phase-title-${i}`, p[1], x, 232, 190, 30, { size: 21, bold: true });
    txt(s, `phase-out-${i}`, p[2], x, 276, 190, 52, { size: 16, color: C.darkMuted });
  });
  rule(s, "roadmap-rule", 52, 354, 908, 354, "#CBC6BC", 2);
  txt(s, "unlock-title", "Hito que desbloquea la siguiente ronda", 52, 389, 430, 25, { size: 16, bold: true, color: C.coral });
  txt(s, "unlock", "30% de retención en semana 8 · 100 usuarios pagados · 2 pilotos institucionales", 52, 430, 824, 52, { size: 24, bold: true });

  box(s, "ask-panel", 934, 142, 298, 474, C.ink, C.ink, 6);
  txt(s, "ask-label", "ASK", 962, 176, 80, 22, { size: 12, bold: true, color: C.yellow });
  txt(s, "ask-value", "$25 MM", 962, 214, 236, 58, { size: 44, bold: true, color: C.text });
  txt(s, "ask-term", "CLP · 18 meses", 964, 277, 220, 23, { size: 15, color: C.muted });
  const uses = [
    ["45%", "Producto e integración", C.blue],
    ["30%", "Pilotos y research", C.green],
    ["15%", "Cloud, datos y seguridad", C.yellow],
    ["10%", "Legal y operación", C.coral],
  ];
  let yy = 334;
  uses.forEach((u, i) => {
    box(s, `use-dot-${i}`, 963, yy + 3, 10, 10, u[2], "none", 5);
    txt(s, `use-pct-${i}`, u[0], 985, yy, 48, 20, { size: 13, bold: true, color: C.text });
    txt(s, `use-label-${i}`, u[1], 1042, yy, 160, 34, { size: 13, color: C.muted });
    yy += 55;
  });
  txt(s, "ask-partner", "Además: 2 instituciones para pilotos de 100 estudiantes.", 962, 558, 238, 44, { size: 13, bold: true, color: C.green });
  note(s, "[Mattias + Francisco · 3:53–4:35] Mattias: En los primeros tres meses refinamos el producto y corremos un piloto de treinta estudiantes. Luego integramos calendario y buscamos cien usuarios activos. Francisco: Entre los meses siete y doce probamos pago con cien usuarios y dos instituciones. A dieciocho meses, el hito es mil usuarios activos, treinta por ciento de retención en semana ocho y dos pilotos institucionales. Pedimos veinticinco millones de pesos para producto, pilotos, infraestructura y operación, además de dos instituciones dispuestas a abrir pilotos de cien estudiantes.");
}

// 10. Close
{
  const s = deck.slides.add();
  s.background.fill = C.ink;
  txt(s, "close-brand", "RITMO", 52, 42, 160, 24, { size: 14, bold: true, color: C.yellow });
  txt(s, "close-hook", "Que cambie el turno,\nno el futuro.", 52, 142, 792, 170, { size: 62, bold: true, color: C.text });
  txt(s, "close-ask", "Agendemos 30 minutos la próxima semana para abrir un piloto de 100 estudiantes.", 55, 361, 776, 84, { size: 25, color: C.muted });
  box(s, "close-cta", 55, 500, 508, 66, C.yellow, "none", 5);
  txt(s, "close-cta-text", "PILOTO · 100 ESTUDIANTES · 8 SEMANAS", 76, 523, 466, 22, { size: 15, bold: true, color: "#241B08", align: "center" });
  box(s, "close-mark", 986, 166, 146, 146, "none", C.yellow, 73);
  txt(s, "close-r", "R", 1024, 190, 70, 80, { size: 60, bold: true, color: C.yellow, align: "center" });
  txt(s, "close-team", "Mattias · Ariel · Francisco · Carlos", 55, 625, 620, 24, { size: 14, color: C.text });
  note(s, "[Carlos + equipo · 4:35–5:00] Carlos: Ritmo convierte un cambio inesperado en una decisión posible, antes de que se transforme en una mala nota o una noche sin dormir. Que cambie el turno, no el futuro. Equipo: Buscamos dos instituciones para un piloto de cien estudiantes durante ocho semanas. Agendemos una reunión de treinta minutos la próxima semana para definir el primer grupo.");
}

async function main() {
  const pptx = await PresentationFile.exportPptx(deck);
  await pptx.save("05_Pitch_Final/Ritmo_Pitch_Final_5min.pptx");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
