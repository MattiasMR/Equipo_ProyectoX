import { useState, useEffect } from "react";

const DAYS = [
  { id: 0, label: "Lunes", short: "LUN" },
  { id: 1, label: "Martes", short: "MAR" },
  { id: 2, label: "Miércoles", short: "MIÉ" },
  { id: 3, label: "Jueves", short: "JUE" },
  { id: 4, label: "Viernes", short: "VIE" },
  { id: 5, label: "Sábado", short: "SÁB" },
  { id: 6, label: "Domingo", short: "DOM" },
];

const CATEGORIES = [
  { id: "estudio", label: "Estudio", var: "--amber" },
  { id: "trabajo", label: "Trabajo", var: "--teal" },
  { id: "personal", label: "Personal", var: "--sage" },
];

const STORAGE_KEY = "ritmo:tasks";

export default function Organizador() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("estudio");
  const [day, setDay] = useState(0);
  const [hours, setHours] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get(STORAGE_KEY);
        if (result && result.value) {
          setTasks(JSON.parse(result.value));
        }
      } catch (e) {
        // clave inexistente en primer uso, no es un error real
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persist = async (next) => {
    setTasks(next);
    try {
      await window.storage.set(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      setError("No se pudo guardar. Intenta de nuevo.");
    }
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      title: title.trim(),
      category,
      day,
      hours: Math.max(0.5, Number(hours) || 1),
      completed: false,
    };
    persist([...tasks, newTask]);
    setTitle("");
    setHours(1);
  };

  const toggleTask = (id) => {
    persist(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    persist(tasks.filter((t) => t.id !== id));
  };

  const tasksForDay = (d) => tasks.filter((t) => t.day === d);
  const hoursForDay = (d) => tasksForDay(d).reduce((sum, t) => sum + t.hours, 0);
  const categoryOf = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const loadStyle = (d) => {
    const hrs = hoursForDay(d);
    if (hrs === 0) return { background: "var(--surface-alt)" };
    const alpha = Math.min(0.28 + hrs * 0.11, 1);
    return { background: `rgba(193,72,63,${alpha})` };
  };

  return (
    <div className="ritmo-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Manrope:wght@400;600;800&display=swap');

        .ritmo-root {
          --bg: #12161d;
          --surface: #1c222c;
          --surface-alt: #262e3a;
          --text: #ece8df;
          --text-muted: #8b93a3;
          --amber: #e8b14c;
          --teal: #5b8fa8;
          --sage: #7bae7f;
          --rule: #c1483f;
          font-family: 'Manrope', sans-serif;
          background: var(--bg);
          color: var(--text);
          padding: 28px 20px 40px;
          min-height: 100%;
          box-sizing: border-box;
        }
        .ritmo-root * { box-sizing: border-box; }

        .header { margin-bottom: 22px; position: relative; padding-left: 16px; }
        .header::before {
          content: ''; position: absolute; left: 0; top: 2px; bottom: 2px; width: 3px;
          background: var(--rule);
        }
        .eyebrow {
          font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 0.14em;
          color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;
        }
        .header h1 {
          font-family: 'Space Mono', monospace; font-weight: 700; font-size: 32px;
          margin: 0 0 6px 0; letter-spacing: -0.01em;
        }
        .subtitle { margin: 0; color: var(--text-muted); font-size: 14px; }

        .gauge { margin-bottom: 22px; }
        .gauge-label {
          font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 0.12em;
          color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;
        }
        .ticket-row { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; }
        .ticket-stub {
          border-radius: 6px; padding: 10px 4px; text-align: center;
          display: flex; flex-direction: column; gap: 4px;
          border: 1px dashed rgba(255,255,255,0.12);
        }
        .ticket-day { font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 0.06em; color: var(--text-muted); }
        .ticket-hours { font-family: 'Space Mono', monospace; font-size: 13px; font-weight: 700; }

        .add-task {
          background: var(--surface); border-radius: 10px; padding: 14px;
          margin-bottom: 24px; display: flex; flex-wrap: wrap; gap: 8px; align-items: flex-end;
        }
        .field { display: flex; flex-direction: column; gap: 4px; }
        .field label {
          font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 0.08em;
          color: var(--text-muted); text-transform: uppercase;
        }
        .field input, .field select {
          background: var(--surface-alt); border: 1px solid rgba(255,255,255,0.08);
          color: var(--text); border-radius: 6px; padding: 8px 10px; font-size: 14px;
          font-family: 'Manrope', sans-serif;
        }
        .field input:focus, .field select:focus, button:focus-visible {
          outline: 2px solid var(--amber); outline-offset: 1px;
        }
        .field-title { flex: 1 1 160px; }
        .add-btn {
          background: var(--amber); color: #1c1607; border: none; border-radius: 6px;
          padding: 9px 16px; font-weight: 800; font-size: 13px; cursor: pointer;
          font-family: 'Manrope', sans-serif;
        }
        .add-btn:hover { filter: brightness(1.08); }

        .board {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 10px; margin-bottom: 22px;
        }
        .day-column { background: var(--surface); border-radius: 10px; padding: 12px; min-height: 90px; }
        .day-header { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
        .margin-rule { width: 3px; height: 14px; background: var(--rule); border-radius: 2px; flex-shrink: 0; }
        .day-header h3 {
          font-family: 'Space Mono', monospace; font-size: 13px; margin: 0;
          text-transform: uppercase; letter-spacing: 0.04em;
        }
        .task-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px; }
        .task {
          display: flex; align-items: center; gap: 7px; background: var(--surface-alt);
          border-radius: 6px; padding: 7px 8px; font-size: 13px;
        }
        .task.done .task-title { text-decoration: line-through; color: var(--text-muted); }
        .check {
          width: 16px; height: 16px; border-radius: 4px; border: 1px solid var(--text-muted);
          background: transparent; color: var(--text); font-size: 10px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; padding: 0; flex-shrink: 0;
        }
        .task.done .check { background: var(--sage); border-color: var(--sage); }
        .dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .task-title { flex: 1; }
        .task-hours { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--text-muted); }
        .delete {
          background: none; border: none; color: var(--text-muted); cursor: pointer;
          font-size: 14px; padding: 0 2px; line-height: 1;
        }
        .delete:hover { color: var(--rule); }
        .empty { color: var(--text-muted); font-size: 12px; font-style: italic; }

        .stats {
          font-family: 'Space Mono', monospace; font-size: 12px; color: var(--text-muted);
          display: flex; gap: 18px; border-top: 1px dashed rgba(255,255,255,0.12); padding-top: 12px;
        }
        .stats strong { color: var(--text); }
        .error { color: var(--rule); font-size: 12px; margin-top: 8px; }
        .loading { color: var(--text-muted); font-family: 'Space Mono', monospace; font-size: 13px; }

        @media (max-width: 480px) {
          .ticket-row { grid-template-columns: repeat(4, 1fr); }
          .board { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="header">
        <div className="eyebrow">Planner · Semana actual</div>
        <h1>Ritmo</h1>
        <p className="subtitle">Organiza estudio, pega y vida en una sola vista.</p>
      </div>

      {loading ? (
        <div className="loading">Cargando tu semana...</div>
      ) : (
        <>
          <div className="gauge">
            <div className="gauge-label">Carga semanal</div>
            <div className="ticket-row">
              {DAYS.map((d) => (
                <div key={d.id} className="ticket-stub" style={loadStyle(d.id)}>
                  <span className="ticket-day">{d.short}</span>
                  <span className="ticket-hours">{hoursForDay(d.id)}h</span>
                </div>
              ))}
            </div>
          </div>

          <form className="add-task" onSubmit={addTask}>
            <div className="field field-title">
              <label htmlFor="title">Tarea</label>
              <input
                id="title"
                type="text"
                placeholder="Ej: leer capítulo 3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="category">Categoría</label>
              <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="day">Día</label>
              <select id="day" value={day} onChange={(e) => setDay(Number(e.target.value))}>
                {DAYS.map((d) => (
                  <option key={d.id} value={d.id}>{d.label}</option>
                ))}
              </select>
            </div>
            <div className="field" style={{ width: 70 }}>
              <label htmlFor="hours">Horas</label>
              <input
                id="hours"
                type="number"
                min="0.5"
                step="0.5"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>
            <button type="submit" className="add-btn">Agregar</button>
          </form>
          {error && <div className="error">{error}</div>}

          <div className="board">
            {DAYS.map((d) => (
              <div key={d.id} className="day-column">
                <div className="day-header">
                  <span className="margin-rule" />
                  <h3>{d.label}</h3>
                </div>
                <ul className="task-list">
                  {tasksForDay(d.id).length === 0 && <li className="empty">Sin tareas</li>}
                  {tasksForDay(d.id).map((t) => {
                    const cat = categoryOf(t.category);
                    return (
                      <li key={t.id} className={"task" + (t.completed ? " done" : "")}>
                        <button
                          className="check"
                          onClick={() => toggleTask(t.id)}
                          aria-label={t.completed ? "Marcar como pendiente" : "Marcar como completada"}
                        >
                          {t.completed ? "✓" : ""}
                        </button>
                        <span className="dot" style={{ background: `var(${cat.var})` }} />
                        <span className="task-title">{t.title}</span>
                        <span className="task-hours">{t.hours}h</span>
                        <button className="delete" onClick={() => deleteTask(t.id)} aria-label="Eliminar tarea">×</button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="stats">
            <span><strong>{completedTasks}/{totalTasks}</strong> tareas completadas</span>
            <span><strong>{completionRate}%</strong> avance</span>
          </div>
        </>
      )}
    </div>
  );
}
