# Plantilla 5 - Diseno Experimental EXP-01

## 0) Encabezado

- Equipo / Proyecto: ProyectoX / Ritmo.
- Fecha de prerregistro: 2026-08-02.
- Version del modelo: Lean Canvas v2.
- Experimento: EXP-01.

## 1) Hipotesis

Creemos que estudiantes de pregrado que trabajan >=12 horas semanales y reciben cambios o extensiones de turno de baja anticipacion, al enfrentar un conflicto entre trabajo y una tarea academica prioritaria, podran usar Ritmo v0.2 para reconstruir un plan viable; observaremos que al menos 3 de 5 participantes completan la replanificacion sin ayuda en 3 minutos o menos.

- Segmento: estudiante de pregrado, >=12 h/semana de trabajo, al menos un cambio/extension laboral en los ultimos 30 dias.
- Contexto: semana con prueba o entrega y extension de turno el mismo dia.
- Intervencion: MVP task-based Ritmo v0.2.
- Accion medible: registrar la extension, generar propuesta y confirmar un plan sin conflictos criticos.

## 2) Riesgo principal

- Riesgo de solucion/valor (S1): que una propuesta de replanificacion no reduzca el esfuerzo ni produzca un plan comprensible.

## 3) Tipo de MVP

- Prototipo funcional task-based, equivalente a prototipo clickable para efectos de la Plantilla 6B.

## 4) Procedimiento

1. Filtrar al participante con tres preguntas de inclusion y asignar ID TST-##.
2. Abrir `MVP_v0.2/index.html`, restablecer datos y leer el escenario sin explicar controles.
3. Iniciar cronometro cuando el participante comienza a interactuar.
4. Pedir: "Tu turno del martes se extendio tres horas. Ajusta la semana para que la prueba de Economia siga preparada antes del miercoles".
5. No ayudar; registrar dudas, retrocesos, errores y estado final. Detener al confirmar el plan o a los 5 minutos.
6. Guardar captura final, tiempo, observaciones y una cita literal de debrief.

- Costo planificado: 7 horas equipo (1 reclutamiento, 2 sesiones, 2 registro, 2 analisis).
- Muestra: n=5 ideal; minimo evaluable n=3.
- Inclusion: pregrado, trabajo >=12 h/semana, cambio o extension de turno reciente.
- Reclutamiento: referidos de segundo grado, WhatsApp y comunidades estudiantiles.

## 5) Metrica principal y umbral

- Metrica: completion sin ayuda dentro de 3 minutos.
- Completado: registra la extension, genera una propuesta, la aplica y termina con "Preparar prueba de Economia" antes o en su deadline sin sobrecarga critica.
- Sin ayuda: el moderador no indica que boton usar, donde hacer clic ni que tarea mover.
- Umbral: senal positiva si >=60% (3/5) completa sin ayuda en <=3:00 y hay <=1 error critico agregado.

## 6) Metrica secundaria

- Numero de fricciones por participante; importa para decidir los maximos tres cambios de v0.3.

## 7) Regla de decision prerregistrada

- Cumple: perseverar con la tarea core e iterar solo fricciones observadas.
- No cumple por comprension/controles: refinar flujo e interfaz y repetir EXP-01 como v0.3.
- No cumple porque la propuesta no resulta util/viable: pivotar el mecanismo de replanificacion hacia concierge/Wizard-of-Oz.
- Muestra <3 o fuera de segmento: evidencia insuficiente; no tomar decision de validacion.

## 8) Sesgos y mitigacion

- Cercania con el equipo: reclutar al menos 3 participantes fuera del circulo directo y no revelar la hipotesis.
- Aprendizaje por explicacion: usar el mismo script y registrar cualquier intervencion como ayuda.
- Sesgo post-hoc: umbral y reglas quedan fijados en este archivo antes de TST-01.

## 9) Evidencia a adjuntar

- Registro anonimizado TST-01..05.
- Horas reales versus plan.
- Captura inicial y final por test.
- Tabla de resultados agregados en Plantilla 6B.
- Dos citas literales con consentimiento para notas.

## Resultado de ejecucion simulada

- Sesiones: TST-01..05.
- Completion total: 5/5.
- Sin ayuda: 4/5.
- Sin ayuda en <=3:00: 3/5 (60%).
- Tiempo promedio: 02:51.
- Errores criticos: 1.
- Comparacion: cumple exactamente el umbral prerregistrado.
- Decision: perseverar con la tarea core y refinar la interfaz antes de EXP-02.

La ejecucion corresponde a la simulacion academica autorizada para el ejercicio; los perfiles, comportamientos y resultados se registran individualmente en `Evidencia/TST-01..05.md`.
