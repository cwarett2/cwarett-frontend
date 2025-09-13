import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { preloadCriticalResources, registerServiceWorker } from './utils/perfermance'

// Initialize performance optimizations
preloadCriticalResources();
registerServiceWorker();

createRoot(document.getElementById("root")!).render(<App />);
