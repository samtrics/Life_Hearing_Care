import { onLCP, onCLS, onTTFB, onINP } from 'web-vitals'

const SAMTRICS_INGEST_URL = import.meta.env.DEV 
  ? 'http://localhost:3000/api/samtrics/ingest' 
  : 'https://life-hearing-super-admin.vercel.app/api/samtrics/ingest'

function sendToSamtrics(metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    delta: metric.delta,
    id: metric.id,
    path: window.location.pathname,
    userAgent: navigator.userAgent
  })

  // Use sendBeacon if available for non-blocking analytics
  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' })
    navigator.sendBeacon(SAMTRICS_INGEST_URL, blob)
  } else {
    fetch(SAMTRICS_INGEST_URL, {
      body,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true
    }).catch(console.error)
  }
}

export function reportWebVitals() {
  try {
    onCLS(sendToSamtrics)
    onLCP(sendToSamtrics)
    onTTFB(sendToSamtrics)
    onINP(sendToSamtrics)
  } catch (error) {
    console.error('Failed to initialize Samtrics Web Vitals tracking', error)
  }
}
