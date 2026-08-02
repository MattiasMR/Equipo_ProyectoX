# Plantilla 6Z - Log de Evidencia Experimental

## 0) Encabezado

- Equipo / Proyecto: ProyectoX / Ritmo.
- Actualizacion: 2026-08-02.
- Version: v0.2.
- Etapa: MVP.

## 1) Registro acumulado

| Supuesto | ID exp/test | MVP | Hipotesis | Metrica | Umbral | Resultado | Cumple | Insight | Decision parcial | Fuente |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S1 | QA-01 | v0.2 funcional | El flujo tecnico permite ejecutar la tarea | checks funcionales | 5/5 checks | 5/5 | Si, tecnicamente | El flujo es ejecutable; QA no sustituye usuario | Ejecutar EXP-01 | `Evidencia/QA-01.md` |
| S1 | EXP-01 / TST-01..05 | task-based | >=3/5 replanifica sin ayuda <=3 min | completion + tiempo | >=60%, <=3 min, <=1 error | 3/5 (60%); 1 error | Si, justo en umbral | Flujo entrega valor, pero explicacion y secuencia requieren ajuste | Perseverar y refinar | Plantilla 5 + 6B + TST-01..05 |

## 2) Resumen por supuesto

| Supuesto | Tests acumulados | Tests que cumplen | Calidad | Estado | Justificacion |
| --- | ---: | ---: | --- | --- | --- |
| S1 valor | 5 sesiones simuladas | 3 cumplen metrica completa | Media para el ejercicio | Validado provisionalmente bajo simulacion | Cumple exactamente umbral; falta contraste de terreno |
| S2 problema | 0 tests validantes | 0 | Insuficiente | Abierto | Registros academicos solo orientan hipotesis |
| S3 repeticion | 0 | 0 | Sin evidencia | Abierto | Requiere observacion 14 dias |
| S4 pago | 0 | 0 | Sin evidencia | Abierto | No se ha pedido compromiso |
| S5 canal | 0 | 0 | Sin evidencia | Abierto | Outreach no medido |
| S6 B2B | 0 | 0 | Sin evidencia | Abierto | Decisores no entrevistados |

## 3) Cierre por supuesto

- S1: cerrado provisionalmente para el ejercicio; Perseverar y refinar porque cumple exactamente el umbral.
- S2: no cerrado; evidencia insuficiente.
- S3-S6: no cerrados; sin pruebas.

## 4) Regla de decision

No declarar validacion por una senal aislada. Para S1, EXP-01 entrega una primera senal solo si n>=3; ideal n=5. Para cierre provisional se requiere repeticion o evidencia convergente posterior.

## 5) Proximo paso

- Supuesto: S3, repeticion de uso.
- Experimento: EXP-02.
- MVP: Ritmo v0.3 con mejoras de explicacion y flujo.
- Metrica/umbral: >=3/5 vuelve a replanificar al menos una vez durante 14 dias sin recordatorio individual.
- Fecha limite propuesta: siguiente iteracion del curso.

## 6) Checklist

- IDs de supuestos definidos.
- Diseno y fuente vinculados.
- Resultado de EXP-01 comparado con el umbral prerregistrado.
- Memo declara decision provisional dentro del alcance de la simulacion academica.
