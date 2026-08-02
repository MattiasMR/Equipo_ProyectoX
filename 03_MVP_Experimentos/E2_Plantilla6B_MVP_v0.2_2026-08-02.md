# Plantilla 6B - MVP Task-Based Ritmo v0.2

## 0) Encabezado

- Equipo / Proyecto: ProyectoX / Ritmo.
- Fecha: 2026-08-02.
- Version: v0.2.
- Artefacto: `MVP_v0.2/index.html`.
- Segmento: estudiantes de pregrado que trabajan >=12 h/semana y sufren cambios/extensiones laborales de baja anticipacion.
- Hipotesis: ver EXP-01.
- Metrica/umbral: >=60% completa sin ayuda en <=3 min y <=1 error critico agregado.

## 1) Diseno del test

- Tarea core: "Tu turno del martes se extendio tres horas. Ajusta la semana para que la prueba de Economia siga preparada antes del miercoles".
- Completado: la extension queda registrada, se aplica una propuesta y la tarea academica prioritaria queda en un dia <= deadline sin sobrecarga critica.
- Sin ayuda: el moderador no explica controles ni sugiere movimiento.
- Script: "Esto no es una prueba de ti, sino del prototipo. Piensa en voz alta; no te ayudare salvo que decidas abandonar".

## 2) Registro por participante

| Test | Segmento | Completion | Sin ayuda | Tiempo | Fricciones | Error critico | Cita literal |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| TST-01 Camila | Si | Si | Si | 02:18 | 1 | No | "Quiero saber por que eligio el lunes." |
| TST-02 Diego | Si | Si | Si | 02:47 | 2 | No | "Necesito ver que cambia exactamente." |
| TST-03 Valentina | Si | Si | No | 04:12 | 3 | Si: no encontro el siguiente paso | "Trate de mover la tarjeta." |
| TST-04 Benjamin | Si | Si | Si | 01:36 | 0 | No | "La propuesta tiene sentido y se puede deshacer." |
| TST-05 Fernanda | Si | Si | Si | 03:24 | 2 | No | "Necesito que diga que no va a borrar nada." |

## 3) Metricas agregadas

- Completion: 5/5 = 100%.
- Sin ayuda: 4/5 = 80%.
- Completion sin ayuda en <=3:00: 3/5 = 60%.
- Tiempo promedio: 02:51.
- Errores criticos: 1.
- Calidad de muestra: 100% dentro del segmento definido para la simulacion.
- Resultado vs umbral: cumple exactamente (>=60% en <=3:00 y <=1 error critico).

## 4) Top fricciones

1. Secuencia poco explicita entre detectar, generar y aplicar. TST-02, TST-03 y TST-05.
2. Falta explicar por que se elige el dia de destino y mostrar antes/despues. TST-01, TST-02 y TST-05.
3. El resumen no repite deadline ni confirma que no se eliminan tareas. TST-03 y TST-05.

## 5) Cambios v0.3

1. Incorporar indicador de tres pasos: registrar cambio -> generar propuesta -> confirmar. Motivo: friccion 1, TST-02/03/05.
2. Mostrar comparacion antes/despues y razon del movimiento. Motivo: friccion 2, TST-01/02/05.
3. Confirmar deadline protegido y que ninguna tarea sera eliminada. Motivo: friccion 3, TST-03/05.

## 6) Debrief

- Parte mas clara: deteccion visual de sobrecarga (TST-01, 03, 04, 05).
- Parte mas confusa: siguiente paso y diferencia entre generar/aplicar (TST-02, 03, 05).
- Valor percibido: obtener una recomendacion reversible sin rehacer toda la semana.
- Faltante dominante: explicacion del movimiento, deadline visible y confirmacion de que no se borran tareas.

## 7) Decision

- Decision: perseverar con la tarea core y refinar interfaz.
- Justificacion: 3/5 (60%) completo sin ayuda en <=3:00 y hubo un error critico, cumpliendo exactamente el umbral. No se escala aun porque el margen es minimo y tres fricciones se repiten.

## 8) Evidencia

- MVP v0.2 incluido.
- QA-01 tecnica: 5/5.
- Registros TST-01..05 completos como sesiones simuladas del ejercicio.
- Capturas: pendientes; el navegador integrado bloqueo la apertura local `file://`.

## 9) Costo

- Plan: 7 horas.
- Real simulado para documentacion y analisis: 6,5 horas equivalentes.
- Mayor consumo: registro de observaciones y consolidacion de fricciones.
