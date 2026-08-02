# Tabla de Supuestos Criticos

| Prioridad | ID | Bloque | Enunciado falseable | Riesgo | Evidencia disponible | Proxima prueba | Senal/metrica | Criterio de decision |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | S3 | Uso | >=3/5 vuelve a usar la replanificacion dentro de 14 dias sin recordatorio individual | Producto | EXP-01 solo midio primera tarea | EXP-02 Wizard/concierge de 14 dias | repeat usage | Perseverar si >=60% repite al menos una vez |
| 2 | S2 | Problema | >=4/5 registra al menos un cambio/extension que afecte estudio durante 14 dias | Cliente | Patrones INT-01..07, aun sin observacion longitudinal | EXP-02 diario de episodios | episodios registrados por perfil | Mantener segmento si >=4/5 y mediana >=2 episodios/mes |
| 3 | S4 | Ingresos | >=2/5 estudiantes acepta reservar/pagar CLP 2.990 mensual o deja senal equivalente | Mercado | Sin evidencia de pago | Fake door con precio y lista de espera | conversion con senal de compromiso | Seguir B2C si >=40%; si no, explorar B2B |
| 4 | S1 | Solucion/UVP | >=60% del segmento puede replanificar sin ayuda en <=3 min con Ritmo | Producto | EXP-01: 3/5 (60%), 02:51 promedio, 1 error | Repetir con v0.3 despues de cambios | completion sin ayuda + tiempo | Mantener provisional si v0.3 iguala o supera 60% y reduce fricciones |
| 5 | S5 | Canal | Outreach por comunidades estudiantiles consigue >=20% de respuesta calificada | Mercado | Acceso informal descrito en Discovery | 25 mensajes con filtro de segmento | reply rate calificado | Mantener canal si >=5 respuestas calificadas |
| 6 | S6 | Comprador B2B | >=2/5 decisores universitarios acepta segunda reunion para piloto | Mercado | Hipotesis institucional del PS | Entrevistas B2B + propuesta de piloto | reuniones de avance | Priorizar B2B si >=2/5 acepta definir piloto |

## Orden experimental

1. EXP-01 redujo provisionalmente S1 y motivo tres cambios de interfaz.
2. EXP-02 prioriza repeticion S3 y frecuencia S2 durante 14 dias.
3. Despues se testean precio/canal S4-S6 para evitar vender una utilidad que aun no demuestra repeticion.
