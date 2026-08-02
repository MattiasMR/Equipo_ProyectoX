# Plantilla 4 - Sintesis de Evidencia

## 0) Encabezado

- Equipo / Proyecto: ProyectoX / Ritmo.
- Segmento: estudiantes de pregrado que trabajan >=12 h/semana con turnos variables o extensiones de jornada de baja anticipacion.
- Registros analizados: 7 (INT-01 piloto; INT-02..07 ejercicios academicos no validantes).
- Fecha: 2026-08-02.

## 1) Mapa de muestra

- Perfiles: gastronomia/restobar, comida rapida, cafeteria, eventos, retail vespertino, call center y supermercado.
- Distribucion: 7 perfiles laborales; 6 cumplen plenamente el segmento y 1 parcialmente.
- Sesgo: INT-01 tiene informacion parcial y citas reconstruidas; INT-02..07 no son evidencia levantada en terreno. Los patrones siguientes sirven para orientar EXP-01, no para afirmar validacion.

## 2) Tabla minima de evidencia

| ID | Segmento | Episodio registrado | Friccion | Costo registrado | Alternativa |
| --- | --- | --- | --- | --- | --- |
| INT-01 Nicolas | Si | Extension de turno antes de prueba de Economia | Hora de salida incierta | Menos estudio, sueno y nota percibida | Improvisar al salir |
| INT-02 Camila | Si | Cierre extendido antes de control | Pierde bloque de preparacion | 4 h y poco sueno | Calendario + WhatsApp |
| INT-03 Diego | Si | Extension antes de entrega grupal | Reasignacion tardia | 90 min, trasnoche y tension grupal | Calendar + WhatsApp |
| INT-04 Valentina | Si | Evento aceptado 24 h antes de taller | Conflicto ingreso/calidad | 2 h y entrega menos revisada | Notion + decision manual |
| INT-05 Benjamin | Parcial | Hora extra antes de clase vespertina | Llega tarde y recupera despues | 40 min de clase + 3 h recuperacion | Trello + grabaciones |
| INT-06 Paula | Si | Cambio de turno antes de informe | Subestima tarea larga | 4 h y cancelacion familiar | Agenda + alarmas |
| INT-07 Fernanda | Si | Reemplazo antes de practica | Acepta por ingreso/temor laboral | 2 h, poco sueno y culpa | Calendario + apoyo humano |

INT-02..07 se mantienen identificados como registros academicos no validantes; los valores de sus filas no se usan como resultados experimentales.

## 3) Patrones

### Patron 1 - La friccion es priorizar, no recordar

- Enunciado: las fechas suelen estar registradas; el quiebre ocurre al decidir que mover cuando desaparece un bloque disponible.
- Evidencia exploratoria: INT-01, INT-02, INT-03 e INT-06. Parafrasis INT-01: el horario formal no garantiza la hora real de salida y cualquier plan posterior puede caer.
- Implicancia: EXP-01 debe medir replanificacion bajo una restriccion inesperada, no creacion de listas.

### Patron 2 - El costo combina tiempo, sueno y riesgo academico

- Enunciado: reorganizar tarde desplaza estudio hacia la madrugada y reduce revision o asistencia.
- Evidencia exploratoria: INT-01, INT-02, INT-05, INT-06 e INT-07.
- Implicancia: el MVP debe hacer visible el riesgo de fecha limite y la carga diaria, no solo horas libres.

### Patron 3 - El cambio de turno puede ser una extension durante la jornada

- Enunciado: incluso con horario base fijo, la salida real puede cambiar con cero anticipacion por falta de personal o demanda.
- Evidencia exploratoria: INT-01, INT-02, INT-03 e INT-05.
- Implicancia: el segmento se refina desde "turnos variables" a "turnos variables o extensiones de jornada de baja anticipacion".

### Patron 4 - Las alternativas registran, pero no recomiendan

- Enunciado: Calendar, WhatsApp, Notion, Trello, agenda y alarmas ayudan a recordar, pero no proponen una nueva distribucion viable.
- Evidencia exploratoria: INT-02..07.
- Implicancia: la propuesta de valor se centra en detectar conflicto y proponer movimientos explicables.

## 4) Ranking de dolores

| Rank | Dolor | Senal observable | IDs exploratorios |
| ---: | --- | --- | --- |
| 1 | Repriorizacion tardia | mueve o abandona una tarea despues de conocer el cambio | INT-01, 02, 03, 06, 07 |
| 2 | Perdida de descanso/preparacion | estudia despues de medianoche o llega cansado | INT-01, 02, 03, 07 |
| 3 | Riesgo academico/social | menor revision, atraso, clase perdida o tension grupal | INT-01, 03, 04, 05, 06 |

## 5) Alternativas actuales

- Calendarios, agendas y alarmas: registran fechas, pero no recalculan prioridades ante cambios. IDs: INT-02, 03, 05, 06, 07.
- WhatsApp y apoyo de companeros: permiten coordinar, pero dependen de terceros y generan carga social. IDs: INT-02, 03, 07.
- Notion/Trello/listas: ordenan tareas, pero requieren replanificacion manual y estimaciones de duracion. IDs: INT-04, 05, 06.

## 6) Decision

- Opcion: Refinar.
- Justificacion: se mantiene el segmento estudiante-trabajador, pero el problema se especifica como replanificacion despues de cambios o extensiones de jornada. Los patrones 1 y 3 muestran que la incertidumbre de salida y la decision de sacrificio son mas centrales que recordar fechas.

## 7) Hipotesis prioritaria

- Hipotesis: si Ritmo detecta el conflicto y propone una redistribucion por prioridad y fecha limite, >=60% de participantes del segmento completara una replanificacion sin ayuda en <=3 minutos.
- MVP/experimento: prototipo funcional task-based, EXP-01.

## 8) Calidad de evidencia

- Calidad global: C para validacion; B como insumo de diseno.
- Mejora siguiente: ejecutar al menos 3 sesiones reales (ideal 5), guardar tiempos, pantallazos y observaciones por ID TST-##.
