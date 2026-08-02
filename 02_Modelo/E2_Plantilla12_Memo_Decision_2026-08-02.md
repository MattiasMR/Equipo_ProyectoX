# Plantilla 12 - Memo Pivot / Persevere

## 0) Encabezado

- Equipo / Proyecto: ProyectoX / Ritmo.
- Fecha: 2026-08-02.
- Etapa: MVP.
- Decision: Perseverar y refinar interfaz.
- Cambia: flujo y explicacion de la propuesta; se mantienen segmento, problema y UVP.

## 1) Hipotesis critica

- Hipotesis: >=60% del segmento puede replanificar una semana afectada por una extension de turno, sin ayuda y en <=3 minutos, usando Ritmo v0.2.
- Experimento: EXP-01, task-based.
- Metrica: completion sin ayuda dentro de 3 minutos.
- Umbral previo: >=3/5 y <=1 error critico agregado.

## 2) Evidencia

- Muestra simulada: n=5, todos dentro del segmento definido para el ejercicio.
- Completion total: 5/5 (100%).
- Sin ayuda: 4/5 (80%).
- Completion sin ayuda en <=3 minutos: 3/5 (60%).
- Tiempo promedio: 02:51.
- Errores criticos: 1.
- Cumple umbral: si, exactamente.
- Evidencia cualitativa: TST-01 pidio explicacion del dia elegido; TST-03 intento arrastrar la tarjeta; TST-05 necesito confirmacion de que no se borraban tareas.

## 3) Aprendizaje

- El flujo principal es ejecutable: los cinco perfiles terminaron y tres cumplieron la metrica completa.
- La explicacion importa tanto como la automatizacion: tres perfiles dudaron por falta de razon, vista previa o seguridad.
- Queda refutado: detectar sobrecarga por si solo no guia a todos hacia el siguiente paso (TST-03).
- Queda fortalecido: propuesta reversible + carga diaria visible permiten replanificar en pocos minutos.

## 4) Decision y justificacion

Decidimos perseverar con la tarea core y refinar la interfaz porque 3/5 (60%) completo sin ayuda en <=3:00 frente a un umbral de 60%, con un error critico permitido. El cumplimiento es justo, no holgado: la version siguiente debe aclarar la secuencia, explicar el movimiento y proteger visualmente deadline/datos antes de probar repeticion.

## 5) Actualizacion del modelo

- Solucion: flujo sin guia -> indicador de tres pasos.
- Propuesta: movimiento simple -> comparacion antes/despues con razon.
- Confianza: confirmacion generica -> deadline protegido + ninguna tarea eliminada.

## 6) Proximo experimento

- Hipotesis: >=3/5 perfiles vuelve a usar la replanificacion al menos una vez en 14 dias sin recordatorio individual.
- EXP-02: Wizard/concierge de 14 dias con Ritmo v0.3.
- Muestra: n=5.
- Metrica/umbral: repeat usage >=60% (3/5).
- Fecha limite: siguiente iteracion del curso.

## Estado del memo

Completo como decision derivada de la simulacion academica EXP-01. Su alcance no se extiende a demanda, pago ni uso repetido.
