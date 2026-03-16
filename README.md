# Sentinel_Sandbox

Sentinel_Sandbox is a high-fidelity, educational **Intrusion Detection System (IDS)** dashboard and simulator. It provides a real-time SoC (Security Operations Center) experience by monitoring network traffic, host telemetry, and simulating common cyber-attack patterns.

**[🚀 View Live Demo](https://sentinel-sanbox.vercel.app/)**

## Features

- **Real-time Monitoring**: Live network traffic tracking and system telemetry (CPU, connections, packet counts).
- **Attack Simulation**: Trigger synthetic BRUTE_FORCE, PORT_SCAN, and TRAFFIC_FLOOD attacks to test detection logic.
- **Visual Intelligence**: Real-time traffic Area charts using Recharts and a ranked source IP tracking table.
- **Premium UI/UX**:
  - Clean, light-mode project aesthetic with burnt-orange accents.
  - Sophisticated micro-animations (center-expanding lines, glow-lifts, shimmer effects).
  - Custom crosshair mouse tracker and specialized branding icons.
  - Investigative Drill-down: Detailed modals for alert forensic analysis.
- **Heuristic Detection**: Python-based engine using Scapy for packet analysis and psutil for host monitoring.

## Architecture

### Backend (Python/FastAPI)
- **`main.py`**: The central orchestrator handling API routing and WebSocket broadcasts.
- **`DetectionEngine`**: Monitors live traffic (via Scapy) and host metrics (via psutil).
- **`SimulationModule`**: Generates multi-phase synthetic attack patterns.
- **`database.py`**: Manages a persistent SQLite store for alerts, logs, and rules.

### Frontend (React/Vite)
- **State Management**: Real-time synchronization with the backend via WebSockets.
- **UI Components**: Atomic, documented React components styled with Tailwind CSS v4 and Framer Motion.
- **Animations**: CSS-driven premium transitions for an "interactive" feel.

## Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- (Optional) Administrative/Sudo privileges for live packet sniffing with Scapy.

### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python main.py
```
*The API will be available at http://localhost:8000*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*The Dashboard will be live at http://localhost:5173*

## Tech Stack

- **Backend**: FastAPI, Scapy, Psutil, SQLite3, Uvicorn, Pydantic.
- **Frontend**: React 18, Vite, Tailwind CSS v4, Framer Motion, Recharts, Lucide-React, Axios.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
- **Styling**: Modern minimal design with custom SVG iconography and cursor tracking.

---
*Sentinel_Sandbox // v2.0 // Educational Cybersecurity Sandbox*