(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.RitmoLogic = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const INITIAL_TASKS = [
    { id: "w1", title: "Turno restobar", type: "work", day: 1, hours: 5, deadline: 1, priority: 3 },
    { id: "s1", title: "Preparar prueba de Economia", type: "study", day: 1, hours: 3, deadline: 2, priority: 3 },
    { id: "s2", title: "Trabajo grupal", type: "study", day: 2, hours: 2, deadline: 3, priority: 2 },
    { id: "p1", title: "Traslado y compras", type: "personal", day: 2, hours: 1, deadline: 2, priority: 1 },
    { id: "w2", title: "Turno restobar", type: "work", day: 4, hours: 5, deadline: 4, priority: 3 }
  ];

  function freshState() {
    return { tasks: INITIAL_TASKS.map(item => ({ ...item })), scenarioApplied: false };
  }

  function totalHours(tasks, day) {
    return tasks.filter(task => task.day === day).reduce((sum, task) => sum + Number(task.hours), 0);
  }

  function addScenarioExtension(state) {
    const next = { tasks: state.tasks.map(item => ({ ...item })), scenarioApplied: true };
    if (!next.tasks.some(task => task.id === "shift-extension")) {
      next.tasks.push({ id: "shift-extension", title: "Extension inesperada de turno", type: "work", day: 1, hours: 3, deadline: 1, priority: 3 });
    }
    return next;
  }

  function buildProposal(tasks, capacity, dayCount) {
    const loads = Array.from({ length: dayCount }, (_, day) => totalHours(tasks, day));
    const moves = [];
    const overloadedDays = loads.map((hours, day) => ({ hours, day })).filter(item => item.hours > capacity);

    overloadedDays.forEach(({ day }) => {
      const candidates = tasks
        .filter(task => task.day === day && task.type !== "work")
        .sort((a, b) => b.priority - a.priority || a.deadline - b.deadline);

      candidates.forEach(task => {
        if (loads[day] <= capacity) return;
        const options = loads
          .map((hours, candidateDay) => ({ hours, day: candidateDay }))
          .filter(option => option.day !== day && option.day <= task.deadline && option.hours + task.hours <= capacity)
          .sort((a, b) => a.hours - b.hours || Math.abs(a.day - day) - Math.abs(b.day - day));

        if (options.length) {
          const destination = options[0].day;
          moves.push({ id: task.id, from: day, to: destination });
          loads[day] -= task.hours;
          loads[destination] += task.hours;
        }
      });
    });
    return moves;
  }

  function applyMoves(tasks, moves) {
    return tasks.map(task => {
      const move = moves.find(candidate => candidate.id === task.id);
      return move ? { ...task, day: move.to } : { ...task };
    });
  }

  function isViable(tasks, capacity, priorityTaskId) {
    const priorityTask = tasks.find(task => task.id === priorityTaskId);
    if (!priorityTask || priorityTask.day > priorityTask.deadline) return false;
    const dayCount = Math.max(5, ...tasks.map(task => task.day + 1));
    return Array.from({ length: dayCount }, (_, day) => totalHours(tasks, day)).every(hours => hours <= capacity);
  }

  return { INITIAL_TASKS, freshState, totalHours, addScenarioExtension, buildProposal, applyMoves, isViable };
});
