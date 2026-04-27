import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Model Deployment — FastAPI, Docker, Kubernetes — Chaduvuko',
  description:
    'Wrap your model in a FastAPI endpoint, containerise with Docker, scale with Kubernetes. Full working deployment of the DoorDash delivery time model.',
}

const S = {
  tag: {
    fontSize: 11, fontWeight: 700 as const, letterSpacing: '0.1em',
    textTransform: 'uppercase' as const, color: 'var(--accent)',
    fontFamily: 'var(--font-mono)', display: 'block' as const, marginBottom: 10,
  },
  h2: {
    fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)',
    fontWeight: 900 as const, letterSpacing: '-1.2px',
    color: 'var(--text)', marginBottom: 14, lineHeight: 1.15,
  },
  h3: {
    fontFamily: 'var(--font-display)', fontSize: 17,
    fontWeight: 700 as const, letterSpacing: '-0.4px',
    color: 'var(--text)', marginBottom: 10, marginTop: 28,
  },
  p: { fontSize: 15, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 16 },
  ps: { fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 10 },
  sec: { paddingBottom: 56, paddingTop: 8, borderBottom: '1px solid var(--border)' },
  code: {
    fontFamily: 'var(--font-mono)', fontSize: 12,
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: 4, padding: '1px 6px', color: 'var(--accent)',
  },
}

function Div() { return <div style={{ height: 56 }} /> }

function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 10, overflow: 'hidden', marginBottom: 24,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 16px', borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
      }}>
        <span style={{
          fontSize: 10, fontWeight: 700, color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
        }}>
          {label ?? 'python'}
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
        </div>
      </div>
      <pre style={{
        padding: '18px 20px', margin: 0, overflowX: 'auto',
        fontFamily: 'var(--font-mono)', fontSize: 13,
        lineHeight: 1.75, color: 'var(--text)',
      }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

function VisualBox({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div style={{
      border: '1px solid var(--border)', borderRadius: 10,
      overflow: 'hidden', marginBottom: 24,
    }}>
      <div style={{
        padding: '8px 14px', background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        fontSize: 11, fontWeight: 700, color: 'var(--muted)',
        fontFamily: 'var(--font-mono)', letterSpacing: '0.07em',
        textTransform: 'uppercase' as const,
      }}>
        {label}
      </div>
      <div style={{ padding: '20px', background: 'var(--bg2)' }}>
        {children}
      </div>
    </div>
  )
}

function AnalogyBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: 'rgba(0,230,118,0.04)',
      border: '1px solid rgba(0,230,118,0.2)',
      borderRadius: 8, padding: '16px 20px', marginBottom: 20,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
        textTransform: 'uppercase' as const, color: '#00e676',
        fontFamily: 'var(--font-mono)', marginBottom: 10,
      }}>
        🧠 Analogy — read this first
      </div>
      {children}
    </div>
  )
}

function ConceptBox({ title, children, color = '#7b61ff' }: {
  title: string; children: React.ReactNode; color?: string
}) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: `1px solid ${color}30`,
      borderLeft: `4px solid ${color}`,
      borderRadius: 8, padding: '16px 20px', marginBottom: 20,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
        textTransform: 'uppercase' as const, color,
        fontFamily: 'var(--font-mono)', marginBottom: 10,
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}

function ErrorBlock({ error, cause, fix }: { error: string; cause: string; fix: string }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 8, overflow: 'hidden', marginBottom: 12,
    }}>
      <div style={{
        padding: '9px 14px', background: 'rgba(226,75,74,0.08)',
        borderBottom: '1px solid var(--border)',
        fontFamily: 'var(--font-mono)', fontSize: 12,
        color: '#ff4757', fontWeight: 600,
      }}>
        {error}
      </div>
      <div style={{ padding: '12px 14px' }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
          textTransform: 'uppercase' as const, color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', marginBottom: 4,
        }}>Why it happens</div>
        <p style={{ ...S.ps, marginBottom: 10 }}>{cause}</p>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
          textTransform: 'uppercase' as const, color: '#00e676',
          fontFamily: 'var(--font-mono)', marginBottom: 4,
        }}>Fix</div>
        <p style={{ ...S.ps, marginBottom: 0 }}>{fix}</p>
      </div>
    </div>
  )
}

export default function ModelDeploymentPage() {
  return (
    <LearnLayout
      title="Model Deployment — FastAPI, Docker, Kubernetes"
      description="Wrap your model in a FastAPI endpoint, containerise with Docker, scale with Kubernetes. Full working deployment of the DoorDash delivery time model."
      section="MLOps and Production"
      readTime="55–60 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="mlops" topic="model-deployment" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — the deployment stack</span>
        <h2 style={S.h2}>
          A trained model is a pkl file sitting on your laptop.
          Deployment means turning that pkl file into an API that handles
          thousands of requests per minute, survives crashes,
          and can be updated without downtime.
        </h2>

        <p style={S.p}>
          The standard production ML deployment stack at Indian startups
          is three layers. FastAPI wraps the model in an HTTP endpoint —
          it receives a JSON request, extracts features, runs the model,
          and returns a JSON prediction. Docker packages the API and all
          its dependencies into a container that runs identically on any
          machine. Kubernetes runs many containers in parallel, restarts
          crashed ones, and distributes incoming traffic across all of them.
        </p>

        <p style={S.p}>
          DoorDash's delivery time prediction API serves 200,000 requests
          per minute during dinner peak hours. A single Python process handles
          perhaps 50 requests per second. To handle 200,000 per minute
          (3,333 per second) you need roughly 70 parallel processes.
          Kubernetes manages those 70 containers automatically — scaling up
          during peak hours and down at 3 AM to save compute cost.
          This is the deployment stack this module teaches.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A chef (your model) → a restaurant (FastAPI API) → a restaurant chain
            (Docker) → a restaurant franchise (Kubernetes). One chef cooking in
            their kitchen is a model in a notebook. Opening a restaurant adds
            a standardised environment, a menu (API contract), and a way for
            customers to order. Franchising the restaurant (Docker) means any
            city can run the same restaurant with the same recipe, regardless
            of local conditions. The franchise management company (Kubernetes)
            opens more locations when demand spikes and closes underperforming ones.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            Docker solves "works on my machine." Kubernetes solves "stays running
            at scale." FastAPI solves "speaks HTTP." Together they are how
            every production ML model at Indian tech companies is served.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          Install: <span style={S.code as React.CSSProperties}>pip install fastapi uvicorn pydantic scikit-learn</span>.
          Docker Desktop: docker.com/products/docker-desktop.
          kubectl + minikube for local Kubernetes: minikube.sigs.k8s.io.
          This module shows the full stack — follow along with the code
          even if you only run FastAPI locally.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — FASTAPI MODEL SERVING ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Layer 1 — the API</span>
        <h2 style={S.h2}>FastAPI — production model serving with validation, health checks, and versioning</h2>

        <p style={S.p}>
          FastAPI is the standard for Python model serving — faster than Flask,
          automatic request validation via Pydantic, automatic OpenAPI docs,
          async support, and type hints throughout. A production model API
          needs more than just a predict endpoint: a health check endpoint
          that Kubernetes uses to restart crashed pods, a readiness endpoint
          that signals when the model is loaded and ready, request validation
          that rejects malformed inputs before they reach the model, and
          versioned endpoints so you can deploy a new model without breaking
          existing clients.
        </p>

        <CodeBlock code={`# main.py — production FastAPI model serving
# pip install fastapi uvicorn pydantic scikit-learn numpy

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from contextlib import asynccontextmanager
from typing import Optional
import numpy as np
import pickle, time, logging, os
from datetime import datetime

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s %(levelname)s %(message)s')
logger = logging.getLogger(__name__)

# ── Request and response schemas ──────────────────────────────────────
class DeliveryPredictionRequest(BaseModel):
    restaurant_id:   str    = Field(..., description="Restaurant identifier")
    driver_id:       str    = Field(..., description="Driver identifier")
    distance_km:     float  = Field(..., ge=0.1, le=50.0,
                                     description="Delivery distance in km")
    is_peak_hour:    int    = Field(..., ge=0, le=1,
                                     description="1 if 7-9 PM or 12-2 PM else 0")
    order_value:     float  = Field(..., ge=0.0,
                                     description="Order total in INR")
    # Features fetched from feature store at runtime
    restaurant_avg_delivery_time: Optional[float] = None
    driver_avg_delivery_time:     Optional[float] = None

    @validator('distance_km')
    def distance_must_be_reasonable(cls, v):
        if v > 30:
            logger.warning(f"Unusually large distance: {v} km")
        return v

class DeliveryPredictionResponse(BaseModel):
    predicted_delivery_time_min: float
    confidence_interval_lower:   float
    confidence_interval_upper:   float
    model_version:               str
    prediction_id:               str
    latency_ms:                  float

class HealthResponse(BaseModel):
    status:        str
    model_loaded:  bool
    model_version: str
    uptime_s:      float
    timestamp:     str

# ── Global model state ────────────────────────────────────────────────
class ModelState:
    model           = None
    model_version   = 'unknown'
    scaler          = None
    feature_columns = []
    load_time       = None

state = ModelState()

# ── Feature store client (simulated) ─────────────────────────────────
ONLINE_FEATURE_STORE = {
    'RST001': {'restaurant_avg_delivery_time': 33.2},
    'RST002': {'restaurant_avg_delivery_time': 41.5},
    'DRV01':  {'driver_avg_delivery_time': 29.8},
    'DRV02':  {'driver_avg_delivery_time': 35.1},
}

def fetch_online_features(restaurant_id: str, driver_id: str) -> dict:
    """Fetch latest features from online store (~1ms in production)."""
    features = {}
    features.update(ONLINE_FEATURE_STORE.get(restaurant_id, {}))
    features.update(ONLINE_FEATURE_STORE.get(driver_id, {}))
    # Default values for unknown entities
    features.setdefault('restaurant_avg_delivery_time', 35.0)
    features.setdefault('driver_avg_delivery_time', 32.0)
    return features

# ── Model loading ─────────────────────────────────────────────────────
def load_model():
    """Load model from disk or model registry at startup."""
    model_path = os.environ.get('MODEL_PATH', '/tmp/model.pkl')

    if os.path.exists(model_path):
        with open(model_path, 'rb') as f:
            artifact = pickle.load(f)
        state.model           = artifact.get('model')
        state.scaler          = artifact.get('scaler')
        state.feature_columns = artifact.get('feature_columns', [])
        state.model_version   = artifact.get('version', 'unknown')
        logger.info(f"Model loaded: version={state.model_version}")
    else:
        # For demo: create and use a dummy model
        from sklearn.ensemble import GradientBoostingRegressor
        from sklearn.preprocessing import StandardScaler

        state.feature_columns = [
            'restaurant_avg_delivery_time', 'driver_avg_delivery_time',
            'distance_km', 'is_peak_hour', 'order_value',
        ]
        state.model = GradientBoostingRegressor(n_estimators=100, random_state=42)
        # Fit on tiny synthetic data for demo
        np.random.seed(42)
        X_demo = np.random.randn(200, len(state.feature_columns))
        y_demo = X_demo[:, 2] * 6 + 30 + np.random.randn(200) * 5
        state.model.fit(X_demo, y_demo)
        state.model_version = 'demo-v1.0'
        logger.info("Demo model initialised")

    state.load_time = time.time()

# ── Lifespan: load model at startup ──────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting up — loading model...")
    load_model()
    yield
    logger.info("Shutting down")

# ── FastAPI app ───────────────────────────────────────────────────────
app = FastAPI(
    title='DoorDash Delivery Time Prediction API',
    description='Predicts delivery time for a given order and driver.',
    version='1.0.0',
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],   # restrict in production
    allow_methods=['*'],
    allow_headers=['*'],
)

# ── Request logging middleware ────────────────────────────────────────
@app.middleware('http')
async def log_requests(request: Request, call_next):
    start = time.time()
    response = await call_next(request)
    latency = (time.time() - start) * 1000
    logger.info(
        f"{request.method} {request.url.path} "
        f"status={response.status_code} latency={latency:.1f}ms"
    )
    return response

# ── Health and readiness endpoints ────────────────────────────────────
@app.get('/health', response_model=HealthResponse)
async def health():
    """Kubernetes liveness probe — is the container alive?"""
    return HealthResponse(
        status='healthy',
        model_loaded=state.model is not None,
        model_version=state.model_version,
        uptime_s=time.time() - (state.load_time or time.time()),
        timestamp=datetime.now().isoformat(),
    )

@app.get('/ready')
async def ready():
    """Kubernetes readiness probe — is the model loaded and ready?"""
    if state.model is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail='Model not yet loaded',
        )
    return {'status': 'ready', 'model_version': state.model_version}

# ── Prediction endpoint ────────────────────────────────────────────────
@app.post('/v1/predict', response_model=DeliveryPredictionResponse)
async def predict(request: DeliveryPredictionRequest):
    """Predict delivery time for a given order."""
    if state.model is None:
        raise HTTPException(status_code=503, detail='Model not loaded')

    start = time.time()

    # Fetch features from online store
    online_features = fetch_online_features(
        request.restaurant_id, request.driver_id,
    )

    # Override with request-provided values if present
    if request.restaurant_avg_delivery_time is not None:
        online_features['restaurant_avg_delivery_time'] = request.restaurant_avg_delivery_time
    if request.driver_avg_delivery_time is not None:
        online_features['driver_avg_delivery_time'] = request.driver_avg_delivery_time

    # Build feature vector in correct order
    feature_values = [
        online_features.get('restaurant_avg_delivery_time', 35.0),
        online_features.get('driver_avg_delivery_time', 32.0),
        request.distance_km,
        float(request.is_peak_hour),
        request.order_value,
    ]
    X = np.array(feature_values).reshape(1, -1)

    # Predict
    pred = float(state.model.predict(X)[0])
    pred = max(5.0, min(120.0, pred))   # clip to reasonable range

    # Confidence interval (±1 MAE — simplified)
    ci_margin = 6.0
    latency   = (time.time() - start) * 1000

    import uuid
    return DeliveryPredictionResponse(
        predicted_delivery_time_min=round(pred, 1),
        confidence_interval_lower=round(max(5.0, pred - ci_margin), 1),
        confidence_interval_upper=round(pred + ci_margin, 1),
        model_version=state.model_version,
        prediction_id=str(uuid.uuid4()),
        latency_ms=round(latency, 2),
    )

@app.post('/v1/predict/batch')
async def predict_batch(requests_list: list[DeliveryPredictionRequest]):
    """Batch predictions — up to 100 per call."""
    if len(requests_list) > 100:
        raise HTTPException(status_code=400, detail='Max batch size is 100')
    results = []
    for req in requests_list:
        result = await predict(req)
        results.append(result)
    return results

# ── Run with: uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
if __name__ == '__main__':
    import uvicorn
    uvicorn.run('main:app', host='0.0.0.0', port=8000,
                workers=4, log_level='info')`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — DOCKER ══════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Layer 2 — containerisation</span>
        <h2 style={S.h2}>Docker — package everything so it runs identically everywhere</h2>

        <p style={S.p}>
          "It works on my machine" is not acceptable in production.
          Docker solves this by packaging the application, its dependencies,
          and its runtime environment into a single image that runs identically
          on your laptop, on the CI server, and in production.
          The image is built once and deployed everywhere.
          A production ML Docker image has one additional concern:
          keeping image size small — a 10GB image takes 5 minutes to pull
          on a new node, causing slow cold starts.
        </p>

        <CodeBlock code={`# Dockerfile — production ML model serving
# Multi-stage build: builder installs dependencies, runtime is lean`} label="dockerfile" />

        <CodeBlock code={`# ── Stage 1: Builder — install dependencies ──────────────────────────
FROM python:3.11-slim AS builder

WORKDIR /build

# Install build dependencies (not needed at runtime)
RUN apt-get update && apt-get install -y --no-install-recommends \\
    gcc g++ \\
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# ── Stage 2: Runtime — lean final image ───────────────────────────────
FROM python:3.11-slim AS runtime

WORKDIR /app

# Copy installed packages from builder (not gcc/g++ build tools)
COPY --from=builder /root/.local /root/.local
ENV PATH=/root/.local/bin:$PATH

# Non-root user for security
RUN groupadd -r mluser && useradd -r -g mluser mluser

# Copy application code
COPY main.py .
COPY model/ ./model/

# Model path — overridden via env var or Kubernetes ConfigMap
ENV MODEL_PATH=/app/model/model.pkl
ENV PYTHONUNBUFFERED=1

USER mluser

EXPOSE 8000

# Health check — Docker restarts container if this fails
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \\
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')"

# Use gunicorn in production for multi-worker handling
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]`} label="dockerfile" />

        <CodeBlock code={`# requirements.txt — pin every version for reproducibility
fastapi==0.110.0
uvicorn[standard]==0.29.0
pydantic==2.6.4
scikit-learn==1.4.1
numpy==1.26.4
pandas==2.2.1`} label="requirements.txt" />

        <CodeBlock code={`# ── Docker build and run commands ─────────────────────────────────────

# Build the image
# docker build -t swiggy-delivery-model:v1.0.0 .

# Run locally to test
# docker run -p 8000:8000 \\
#   -e MODEL_PATH=/app/model/model.pkl \\
#   swiggy-delivery-model:v1.0.0

# Test the running container
# curl -X POST http://localhost:8000/v1/predict \\
#   -H "Content-Type: application/json" \\
#   -d '{"restaurant_id":"RST001","driver_id":"DRV01",
#         "distance_km":3.5,"is_peak_hour":1,"order_value":450}'

# Push to container registry (AWS ECR / GCP Artifact Registry / Docker Hub)
# docker tag swiggy-delivery-model:v1.0.0 \\
#   123456789.dkr.ecr.ap-south-1.amazonaws.com/swiggy-delivery-model:v1.0.0
# docker push 123456789.dkr.ecr.ap-south-1.amazonaws.com/swiggy-delivery-model:v1.0.0

# ── Image size optimisation ────────────────────────────────────────────
print("""
Image size reduction techniques:
  Technique                    Before    After     Savings
  ─────────────────────────────────────────────────────────
  python:3.11 (full)           ~1.0 GB   —
  python:3.11-slim             ~180 MB   180 MB    820 MB
  Multi-stage build            180 MB    120 MB     60 MB
  --no-cache-dir in pip        120 MB     95 MB     25 MB
  .dockerignore (tests/docs)    95 MB     90 MB      5 MB

  Total: ~1.0 GB → ~90 MB for a typical scikit-learn model

.dockerignore file:
  __pycache__/
  *.pyc
  .pytest_cache/
  tests/
  notebooks/
  .git/
  mlruns/
  *.egg-info/
""")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — KUBERNETES ══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Layer 3 — orchestration</span>
        <h2 style={S.h2}>Kubernetes — run, scale, and update containers in production</h2>

        <p style={S.p}>
          Kubernetes (K8s) manages containerised applications at scale.
          You tell it what you want (5 replicas of this container, restart if it crashes,
          distribute traffic across all replicas) and it makes it happen.
          Three Kubernetes objects matter most for ML serving: Deployment (define
          the container and how many replicas), Service (expose the deployment
          as a network endpoint), and HorizontalPodAutoscaler (automatically
          add replicas when CPU usage is high, remove them when it drops).
        </p>

        <VisualBox label="Kubernetes deployment architecture for ML serving">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              {
                object: 'Deployment',
                color: '#7b61ff',
                desc: 'Declares: 3 replicas of swiggy-delivery-model:v1.0.0. Handles rolling updates and rollbacks.',
                yaml: 'kind: Deployment → replicas: 3, image: .../model:v1.0.0',
              },
              {
                object: 'Service (LoadBalancer)',
                color: '#378ADD',
                desc: 'Exposes the deployment as a single stable endpoint. Routes traffic to healthy pods. Load balances.',
                yaml: 'kind: Service → type: LoadBalancer, port: 80 → targetPort: 8000',
              },
              {
                object: 'HorizontalPodAutoscaler',
                color: '#1D9E75',
                desc: 'Scales replicas from 3 to 20 when CPU > 70%. Scales back down after peak.',
                yaml: 'kind: HPA → minReplicas: 3, maxReplicas: 20, targetCPU: 70',
              },
              {
                object: 'ConfigMap + Secret',
                color: '#D85A30',
                desc: 'Configuration (model version, feature store URL) and sensitive values (API keys) injected as env vars.',
                yaml: 'kind: ConfigMap → MODEL_PATH, FEATURE_STORE_URL',
              },
            ].map((item) => (
              <div key={item.object} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 6, padding: '9px 12px',
                display: 'grid', gridTemplateColumns: '160px 1fr 280px',
                gap: 10, alignItems: 'start',
                borderLeft: `3px solid ${item.color}`,
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: item.color }}>{item.object}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.desc}</span>
                <span style={{ fontSize: 10, color: item.color, fontFamily: 'var(--font-mono)' }}>{item.yaml}</span>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`# ── Kubernetes YAML manifests ─────────────────────────────────────────
# Apply with: kubectl apply -f deployment.yaml

DEPLOYMENT_YAML = """
apiVersion: apps/v1
kind: Deployment
metadata:
  name: swiggy-delivery-model
  namespace: ml-serving
  labels:
    app: delivery-model
    version: v1.0.0
    team: delivery-ml
spec:
  replicas: 3
  selector:
    matchLabels:
      app: delivery-model
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # temporarily create 1 extra pod during update
      maxUnavailable: 0  # never have fewer than desired replicas
  template:
    metadata:
      labels:
        app: delivery-model
        version: v1.0.0
    spec:
      containers:
        - name: model-server
          image: 123456789.dkr.ecr.ap-south-1.amazonaws.com/swiggy-delivery-model:v1.0.0
          ports:
            - containerPort: 8000
          env:
            - name: MODEL_PATH
              value: /app/model/model.pkl
            - name: WORKERS
              value: "4"
          resources:
            requests:
              cpu: "500m"     # 0.5 CPU core guaranteed
              memory: "512Mi" # 512 MB RAM guaranteed
            limits:
              cpu: "2000m"    # never use more than 2 CPU cores
              memory: "2Gi"   # never use more than 2 GB RAM
          livenessProbe:
            httpGet:
              path: /health
              port: 8000
            initialDelaySeconds: 60   # wait for model to load
            periodSeconds: 30
            failureThreshold: 3       # restart after 3 consecutive failures
          readinessProbe:
            httpGet:
              path: /ready
              port: 8000
            initialDelaySeconds: 30
            periodSeconds: 10
            failureThreshold: 3       # remove from load balancer if not ready
"""

SERVICE_YAML = """
apiVersion: v1
kind: Service
metadata:
  name: delivery-model-service
  namespace: ml-serving
spec:
  type: LoadBalancer   # ClusterIP for internal, LoadBalancer for external
  selector:
    app: delivery-model
  ports:
    - protocol: TCP
      port: 80          # external port
      targetPort: 8000  # container port
"""

HPA_YAML = """
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: delivery-model-hpa
  namespace: ml-serving
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: swiggy-delivery-model
  minReplicas: 3    # always run at least 3 for availability
  maxReplicas: 20   # cap at 20 to control cost
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70   # scale up when avg CPU > 70%
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
"""

print("Kubernetes deployment commands:")
commands = [
    ('kubectl apply -f deployment.yaml',
     'Deploy or update the model serving deployment'),
    ('kubectl get pods -n ml-serving',
     'List all pods and their status'),
    ('kubectl logs -f deployment/swiggy-delivery-model -n ml-serving',
     'Stream logs from the deployment'),
    ('kubectl rollout status deployment/swiggy-delivery-model',
     'Watch rollout progress during update'),
    ('kubectl rollout undo deployment/swiggy-delivery-model',
     'Rollback to previous version instantly'),
    ('kubectl scale deployment/swiggy-delivery-model --replicas=10',
     'Manual scale up during peak'),
    ('kubectl top pods -n ml-serving',
     'CPU and memory usage per pod'),
]
for cmd, desc in commands:
    print(f"  $ {cmd}")
    print(f"    {desc}")
    print()`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — ZERO-DOWNTIME UPDATES ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Updating without breaking anything</span>
        <h2 style={S.h2}>Rolling updates, canary releases, and blue-green deployment</h2>

        <p style={S.p}>
          DoorDash cannot take the delivery time model offline to update it.
          Every second of downtime means delayed delivery estimates, poor user experience,
          and drivers idling without assignments. Production model updates must be
          zero-downtime. Three patterns handle this with increasing safety.
        </p>

        <CodeBlock code={`# ── Update strategies ──────────────────────────────────────────────────

# ── Strategy 1: Rolling Update (default, simplest) ────────────────────
# Kubernetes replaces pods one at a time.
# Old version serves traffic until new version is ready.
# Zero downtime but both versions serve traffic briefly.

ROLLING_UPDATE = """
# Update the image — Kubernetes handles the rest
kubectl set image deployment/swiggy-delivery-model \\
  model-server=.../swiggy-delivery-model:v2.0.0

# Watch the rollout
kubectl rollout status deployment/swiggy-delivery-model
# Waiting for deployment to finish: 1 out of 3 new replicas updated...
# Waiting for deployment to finish: 2 out of 3 new replicas updated...
# deployment "swiggy-delivery-model" successfully rolled out

# Rollback if something goes wrong
kubectl rollout undo deployment/swiggy-delivery-model
"""

# ── Strategy 2: Canary Release (safest for ML models) ─────────────────
# Send 5% of traffic to new model, monitor quality, then promote.
# If new model degrades, only 5% of users are affected before rollback.

CANARY_CONFIG = """
# Canary deployment: v2 gets 5% of traffic (1 of 20 replicas)
# v1 deployment: 19 replicas
# v2 deployment: 1 replica

# Both deployments share the same Service label selector
# Traffic is distributed proportionally to replica count

apiVersion: apps/v1
kind: Deployment
metadata:
  name: swiggy-delivery-model-canary
spec:
  replicas: 1    # 1 of 20 total = 5% of traffic
  selector:
    matchLabels:
      app: delivery-model   # same label — Service routes to both
  template:
    metadata:
      labels:
        app: delivery-model
        track: canary
    spec:
      containers:
        - name: model-server
          image: .../swiggy-delivery-model:v2.0.0   # new version
          # same ports, probes, resources as main deployment
"""

# ── Strategy 3: Blue-Green (instant cutover, instant rollback) ────────
# Two identical deployments (blue=current, green=new).
# Switch Service selector to point from blue to green.
# Rollback = switch back. No gradual rollout.

BLUE_GREEN = """
# Blue deployment (current production): label track=blue
# Green deployment (new version):       label track=green

# Service currently points to blue:
# selector:
#   app: delivery-model
#   track: blue

# Cutover: update Service to point to green
kubectl patch service delivery-model-service \\
  -p '{"spec":{"selector":{"track":"green"}}}'

# Rollback: update Service to point back to blue
kubectl patch service delivery-model-service \\
  -p '{"spec":{"selector":{"track":"blue"}}}'

# After validating green: delete blue deployment
kubectl delete deployment swiggy-delivery-model-blue
"""

print("Deployment strategy comparison:")
strategies = [
    ('Rolling Update', 'Simple, zero downtime', 'Brief mixed traffic', 'Always'),
    ('Canary',         '5% traffic to new, gradual', 'More complex', 'New models'),
    ('Blue-Green',     'Instant cutover/rollback', 'Double resources briefly', 'High-risk updates'),
]
print(f"  {'Strategy':<15} {'Benefit':<35} {'Cost':<25} {'Use when'}")
print("  " + "─" * 85)
for s, b, c, u in strategies:
    print(f"  {s:<15} {b:<35} {c:<25} {u}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — LOAD TESTING ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before going live</span>
        <h2 style={S.h2}>Load testing — verify your deployment handles production traffic before it sees it</h2>

        <CodeBlock code={`# pip install locust httpx

# ── Load test with Locust ─────────────────────────────────────────────
# Save as locustfile.py and run: locust --host http://localhost:8000

LOCUST_FILE = """
import random
from locust import HttpUser, task, between

class DeliveryModelUser(HttpUser):
    wait_time = between(0.1, 0.5)   # 100-500ms between requests per user

    RESTAURANT_IDS = ['RST001', 'RST002', 'RST003', 'RST004', 'RST005']
    DRIVER_IDS     = ['DRV01', 'DRV02', 'DRV03', 'DRV04', 'DRV05']

    @task(10)   # weight 10 = most common
    def predict_single(self):
        payload = {
            "restaurant_id": random.choice(self.RESTAURANT_IDS),
            "driver_id":     random.choice(self.DRIVER_IDS),
            "distance_km":   round(random.uniform(0.5, 15.0), 1),
            "is_peak_hour":  random.randint(0, 1),
            "order_value":   round(random.uniform(100, 2000), 0),
        }
        with self.client.post(
            '/v1/predict',
            json=payload,
            catch_response=True,
        ) as response:
            if response.status_code != 200:
                response.failure(f"Status {response.status_code}")
            elif response.elapsed.total_seconds() > 0.5:
                response.failure("Response time > 500ms")

    @task(1)   # weight 1 = rare
    def health_check(self):
        self.client.get('/health')

# Run: locust --host http://localhost:8000 --users 100 --spawn-rate 10
# Users: 100 concurrent users
# Spawn-rate: 10 new users per second until target reached
"""

# ── Benchmark with httpx directly ────────────────────────────────────
import asyncio
import time
import statistics
import json

async def benchmark_endpoint():
    """Quick async benchmark without locust."""
    try:
        import httpx
        url     = 'http://localhost:8000/v1/predict'
        payload = {
            'restaurant_id': 'RST001',
            'driver_id':     'DRV01',
            'distance_km':   3.5,
            'is_peak_hour':  1,
            'order_value':   450.0,
        }
        latencies = []

        async with httpx.AsyncClient() as client:
            # Warmup
            for _ in range(3):
                await client.post(url, json=payload)

            # Benchmark: 50 concurrent requests
            tasks = [client.post(url, json=payload) for _ in range(50)]
            start     = time.time()
            responses = await asyncio.gather(*tasks, return_exceptions=True)
            total_s   = time.time() - start

            for r in responses:
                if isinstance(r, Exception):
                    continue
                latencies.append(r.elapsed.total_seconds() * 1000)

        if latencies:
            print(f"Benchmark results (50 concurrent requests):")
            print(f"  Throughput:  {50/total_s:.0f} req/s")
            print(f"  p50 latency: {statistics.median(latencies):.1f}ms")
            print(f"  p95 latency: {sorted(latencies)[int(0.95*len(latencies))]:.1f}ms")
            print(f"  p99 latency: {sorted(latencies)[int(0.99*len(latencies))]:.1f}ms")
            print(f"  Success:     {len(latencies)}/50")

    except Exception as e:
        print(f"Benchmark requires running server: {e}")

# asyncio.run(benchmark_endpoint())

# ── SLO targets for DoorDash delivery prediction ────────────────────────
print("Production SLO targets:")
slos = [
    ('Availability',   '99.9%',   '< 45 min downtime per month'),
    ('p50 latency',    '< 50ms',  'Median response under 50ms'),
    ('p95 latency',    '< 200ms', '95th percentile under 200ms'),
    ('p99 latency',    '< 500ms', '99th percentile under 500ms'),
    ('Error rate',     '< 0.1%',  'Less than 1 error per 1000 requests'),
    ('Throughput',     '> 200 RPS', 'Per replica, single core'),
]
for metric, target, desc in slos:
    print(f"  {metric:<18}: {target:<10}  {desc}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common deployment mistake — explained and fixed</h2>

        <ErrorBlock
          error="Pod crashloops — CrashLoopBackOff in kubectl get pods"
          cause="The container starts, crashes immediately, Kubernetes restarts it, and it crashes again. Most common causes: model file not found at MODEL_PATH (wrong path or not mounted), Python import error (dependency missing from requirements.txt), out of memory error (model is larger than the memory limit), or port conflict (container trying to bind to a port that is already in use). The initial delay on the liveness probe is insufficient — probe fires before the model finishes loading and Kubernetes kills the pod."
          fix="Check pod logs immediately: kubectl logs pod-name --previous. The error is always in the last few lines before the crash. For model not found: verify the MODEL_PATH environment variable matches where the model is actually mounted. For OOM: kubectl describe pod pod-name shows 'OOMKilled' — increase memory limit. For liveness probe: set initialDelaySeconds to at least 2× the model load time — for a 500MB model this might be 90-120 seconds."
        />

        <ErrorBlock
          error="Predictions are different between local and production — feature mismatch"
          cause="The features used by the production model differ from what the API computes at inference time. Possible causes: feature columns in a different order than the model was trained on, a feature that was normalised during training but not at inference, or an online feature store returning different values than the offline training data. The model produces numbers but they are wrong numbers."
          fix="Log the exact feature vector as a dict before every prediction: logger.info(f'features: {feature_dict}'). Compare a prediction from the production API with a prediction made using the same features in the training notebook — they should be identical. Add an integration test: take 10 rows from the validation set, run them through the API, compare predictions to the notebook predictions. Any difference reveals the discrepancy. Store the feature_columns list in the model artifact and verify at startup that the API uses the same column order."
        />

        <ErrorBlock
          error="Model update causes p99 latency spike — rolling update is too fast"
          cause="During a rolling update, old pods are terminated while new pods are still warming up. New pods take 60 seconds to load the model (initialDelaySeconds=60) but the rolling update removes old pods before new ones pass readiness checks. Traffic is temporarily served by fewer pods, causing latency spikes. Or the new model is larger/slower than the old model and the resource requests are insufficient."
          fix="Set maxUnavailable: 0 in the rolling update strategy — never terminate a pod until its replacement is fully ready. Set initialDelaySeconds on the readiness probe to the actual model load time (test this with kubectl logs during startup). For model size changes, load-test the new model before deploying to production to catch slowdowns. Add pre-deployment checks in CI: if the new model's p95 inference latency > 1.5× the current model's latency, block the deployment."
        />

        <ErrorBlock
          error="Docker image is 4GB — slow to pull on new nodes, long cold starts"
          cause="The base image includes development tools (gcc, g++, cmake) that are only needed to build Python packages, not to run them. Or the model artifact itself is included in the image — a 2GB PyTorch model baked into the image means every code change requires rebuilding and pushing a 2GB image. Or requirements.txt includes unnecessary packages (Jupyter, matplotlib, seaborn)."
          fix="Use a multi-stage build: install packages in a builder stage with gcc, copy only the installed packages to a slim runtime stage. Use python:3.11-slim not python:3.11 (saves 800MB). Never bake the model artifact into the image — load it at startup from S3/GCS via the MODEL_PATH env var, or mount it as a Kubernetes PerforceVolume. Keep requirements.txt minimal — separate dev-requirements.txt (Jupyter, matplotlib) from production requirements.txt."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          Your model is live. Next: know when it starts degrading
          before your users do.
        </h2>

        <p style={S.p}>
          Deploying a model is not the end — it is the beginning of monitoring.
          Models degrade silently as the world changes around them.
          The fraud patterns Stripe trained on in January look different
          by June. The delivery time patterns from pre-monsoon do not hold
          during monsoon season. Module 72 covers drift detection and monitoring —
          how to know your model is degrading before users notice,
          and how to trigger automatic retraining when it does.
        </p>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '16px 20px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 14,
        }}>
          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase' as const, color: '#7b61ff',
              fontFamily: 'var(--font-mono)', marginBottom: 5,
            }}>
              Next — Module 72 · MLOps
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Model Monitoring — Drift Detection and Retraining
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              How to know your model is degrading before users complain.
              Data drift, concept drift, Evidently AI, and automated retraining triggers.
            </p>
          </div>
          <div style={{
            fontSize: 12, color: 'var(--muted)',
            border: '1px solid var(--border)',
            padding: '7px 14px', borderRadius: 6,
            fontFamily: 'var(--font-mono)',
          }}>
            coming soon
          </div>
        </div>
      </div>

      <KeyTakeaways
        items={[
          'The production ML deployment stack is three layers: FastAPI (wrap model in HTTP endpoint with validation, health checks, and versioning), Docker (package everything into a reproducible container), Kubernetes (run, scale, and update containers without downtime). This is the standard at DoorDash, Amazon, Stripe, and every Indian unicorn.',
          'A production FastAPI model API needs four endpoints beyond /predict: /health (liveness probe — is the container alive), /ready (readiness probe — is the model loaded), /v1/predict (versioned, never break old clients), and /v1/predict/batch (batch endpoint for throughput). Always validate inputs with Pydantic before they reach the model.',
          'Use multi-stage Docker builds to keep images small: build stage installs gcc and dependencies, runtime stage copies only the installed packages. python:3.11-slim not python:3.11. Never bake model artifacts into the image — load from S3/GCS at startup via MODEL_PATH env var. Target: under 200MB for scikit-learn models.',
          'Kubernetes Deployment + Service + HPA is the standard serving setup. Key settings: maxUnavailable: 0 (never drop below desired replicas during update), livenessProbe initialDelaySeconds = model load time (60-120s), readinessProbe removes pod from load balancer if model is not ready, resource requests and limits prevent one pod from starving others.',
          'Three update strategies: Rolling Update (default, simple, zero downtime, brief mixed traffic), Canary (send 5% traffic to new model, monitor, then promote — safest for ML models), Blue-Green (instant cutover by switching Service selector, instant rollback, requires 2× resources briefly). Use canary for new model versions where quality change is uncertain.',
          'Always load-test before going live. SLO targets: p50 < 50ms, p95 < 200ms, p99 < 500ms, error rate < 0.1%, availability 99.9%. The most common deployment error is CrashLoopBackOff — check kubectl logs pod-name --previous immediately. The most dangerous is silent feature mismatch — add integration tests that compare API predictions to notebook predictions on the same input.',
        ]}
      />
    </LearnLayout>
  )
}