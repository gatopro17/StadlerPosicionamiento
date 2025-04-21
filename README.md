# 🛤️ Sistema de Simulación de Trackers, Agujas y Transbordadores vía MQTT

Este repositorio contiene una aplicación de simulación que permite recrear escenarios ferroviarios con transbordadores, agujas y activos utilizando balizas Bluetooth y el protocolo MQTT. Está diseñado para facilitar el desarrollo y prueba de algoritmos de localización y control de tráfico ferroviario en tiempo real.

---

## 📦 Tecnologías Utilizadas

- **Node.js** – Motor principal de la lógica de simulación.
- **Mosquitto (MQTT Broker)** – Comunicación de eventos en tiempo real.
- **MySQL** – Almacenamiento de datos y registros históricos.
- **Sequelize** – ORM para modelos y servicios.
- **Express.js** – API backend para controladores (si aplica).

---

## 🧠 Arquitectura General

La aplicación está dividida en:

1. **Simulación MQTT** (`/mqtt-simulation`)
   - `transbordador-simulation/`: simula señales de balizas asociadas a los transbordadores.
   - `aguja-simulation/`: simula cambios de estado de agujas y analiza su impacto en el trayecto de los trackers.
2. **Modelos y Servicios** (`/models`, `/services`)
   - Define entidades como `TrackerTransbordador`, `BalizasTransbordador`, `Agujas` y `TrackerActivos`.
   - Registra logs de posición y eventos de acoplamiento o montaje.
3. **Scripts SQL** (`/sqlScripts`)
   - Scripts para crear e insertar datos en las tablas base y de logs.

---

## 📁 Estructura del Proyecto

```
mqtt-simulation/
  ├── transbordador-simulation/
  │   ├── publisher.js
  │   ├── listener.js
  │   └── utils.js
  └── aguja-simulation/
      ├── cases/
      ├── publisher.js
      ├── listener.js
      └── utils.js

models/
  ├── TrackerTransbordador.js
  ├── BalizasTransbordador.js
  ├── TrackerActivos.js
  ├── Aguja.js
  └── TrackerLogs.js, CouplingLogs.js, AssetMountLogs.js

services/
  ├── TrackerTransbordador.Service.js
  ├── BalizasTransbordador.Service.js
  ├── Aguja.Service.js
  └── Logs Services...

sqlScripts/
  ├── Creacion_tablas_tracker_agujas_activos_balizas.sql
  ├── Insertar_tablas_tracker_agujas_activos_balizas.sql
  └── Creacion_tablas_logs.sql
```

---

## 🔁 Lógica de Localización por Agujas

Cuando un tracker se detiene:
1. Se recibe la intensidad de varias balizas.
2. Se identifica la señal más fuerte como vía candidata.
3. Se valida esa vía según la última aguja pasada:
   - Si la aguja permite el desvío, se confirma la vía.
   - Si no, se retrocede y analiza la aguja anterior.

Reglas específicas por aguja incluidas en `aguja-simulation/utils`.

---

## 📡 MQTT Topics Utilizados

| Topic                 | Descripción                                 |
|-----------------------|---------------------------------------------|
| `position/tracker`    | Señales de trackers montados                |
| `position/asset`      | Señales de activos                          |
| `simulation/tracker`  | Cambios de estado de las agujas             |

---

## ▶️ Cómo Ejecutar la Simulación

### 1. Ejecutar Servidor y MQTT

```bash
cd backend
npm install
npm start
```

### 2. Simulación de Transbordadores

```bash
cd mqtt-simulation/transbordador-simulation
node runAll.js
```

### 3. Simulación de Agujas

**Opción completa**:

```bash
cd mqtt-simulation/aguja-simulation
node runAguja.js
```

**Casos individuales**:

```bash
cd mqtt-simulation/aguja-simulation/cases
node simulateCase1.js
```

---

## 🧪 Registro de Logs

El sistema registra automáticamente:

- Logs de posición de trackers (`trackerPositionLogs`)
- Acoplamientos entre transbordadores (`couplingLogs`)
- Montajes de activos (`assetMountLogs`)

Estos datos se insertan desde los listeners MQTT correspondientes, utilizando funciones auxiliares centralizadas en los servicios `/services/`.

---

## 🚧 Próximos Pasos

- Implementar la inserción de logs desde listeners.
- Mejorar lógica de verificación de rutas vía agujas.
- Desarrollar interfaz web para visualizar ubicación en tiempo real.

---



---

## 📜 Licencia

MIT License.