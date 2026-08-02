const assert = require("node:assert/strict");
const logic = require("./logic.js");

const base = logic.freshState();
assert.equal(base.tasks.length, 5, "Carga cinco actividades iniciales");
assert.equal(logic.totalHours(base.tasks, 1), 8, "Martes parte al limite de 8 h");

const disrupted = logic.addScenarioExtension(base);
assert.equal(logic.totalHours(disrupted.tasks, 1), 11, "La extension sobrecarga el martes");
assert.equal(disrupted.tasks.filter(task => task.id === "shift-extension").length, 1, "No duplica la extension");

const moves = logic.buildProposal(disrupted.tasks, 8, 5);
assert.equal(moves.length, 1, "Genera un movimiento suficiente");
assert.equal(moves[0].id, "s1", "Prioriza la prueba de Economia");
assert.ok(moves[0].to <= 2, "Mantiene la tarea antes del deadline");

const replanned = logic.applyMoves(disrupted.tasks, moves);
assert.equal(logic.isViable(replanned, 8, "s1"), true, "El plan final es viable");

const reset = logic.freshState();
assert.equal(reset.scenarioApplied, false, "Restablece el escenario");
assert.equal(logic.totalHours(reset.tasks, 1), 8, "Restablece la carga inicial");

console.log("QA-01 PASS: 5/5 checks funcionales");
