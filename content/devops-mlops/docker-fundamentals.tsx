import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function DockerFundamentals() {
  return (
    <LearnLayout
      title="Docker Fundamentals — Images, Containers and Dockerfiles"
      description="What containers are, writing a Dockerfile for a Python API, layers and caching, volumes, ports, and image hygiene."
      section="DevOps & Cloud Infrastructure — Lesson 04"
      readTime="40 min"
    >
      <Part n={1} label="Why containers" title="Package an App with Its Runtime Expectations">
        <P>
          An application may work on one laptop and fail on another because the Python runtime, system libraries, or
          configuration differ. A container image packages an application filesystem and its dependencies using the host
          operating system's kernel. Docker provides tools to build images and start containers from them. Containers are
          isolated processes, not full virtual machines: they share the host kernel, so kernel-level isolation and host
          security still matter.
        </P>
        <P>
          An <strong>image</strong> is a reusable, built artifact; a <strong>container</strong> is a running (or stopped)
          instance created from that image. One image can start many containers with different names, environment settings,
          and published ports. The container's writable layer is normally ephemeral. Data that must survive replacement
          belongs in a volume or an external data service, not only in the container filesystem.
        </P>
        <Table
          head={['Concept', 'What it is', 'Operational implication']}
          rows={[
            ['Image', 'Read-only layers and metadata used to start containers', 'Build, tag, scan, and publish deliberately'],
            ['Container', 'A process created from an image with runtime settings', 'Replace it rather than editing it by hand'],
            ['Volume', 'Persistent storage managed outside the container layer', 'Back up and protect it separately'],
            ['Port mapping', 'A host port forwarded to a container port', 'Expose only the service that needs access'],
          ]}
        />
        <Callout type="info">
          Containers improve repeatability, but do not make an application secure by default. Keep base images maintained,
          restrict privileges, protect secrets, and patch the host as well as the image.
        </Callout>
      </Part>

      <Part n={2} label="First container" title="Build and Run a Small FastAPI Service">
        <P>
          We will package a tiny FastAPI application. The app listens on port 8000 inside the container. Docker's published
          port mapping connects a host port to that container port; the two numbers need not be the same. A containerized web
          server must listen on an address reachable inside the container, not only the loopback interface.
        </P>
        <Code file="app/main.py" code={`
from fastapi import FastAPI

app = FastAPI(title="Delivery status API")

@app.get("/health")
def health():
    return {"status": "ok"}
`} />
        <Code lang="bash" code={`
# In the project directory containing Dockerfile and app/:
docker build -t delivery-status-api:dev .
docker image ls delivery-status-api
docker run --rm --name delivery-api -p 8000:8000 delivery-status-api:dev

# In another terminal, call the published endpoint.
curl http://localhost:8000/health
`} />
        <P>
          The image tag <code>dev</code> is a local label, not a guarantee of immutable content. For releases, use a deliberate
          version or content digest and record which artifact was deployed. <code>--rm</code> removes the stopped container
          after this local run; it does not delete the image. Keep interactive experiments separate from production run
          configuration.
        </P>
        <Callout type="tip">
          If the API responds inside the container but not from the host, check the app's bind address, the container port,
          the published host port, and local firewall rules as separate things.
        </Callout>
      </Part>

      <Part n={3} label="Dockerfile" title="Describe the Build in a Dockerfile">
        <P>
          A Dockerfile is a recipe for building an image. <code>FROM</code> chooses a base image, <code>WORKDIR</code> sets
          the working directory for later instructions, <code>COPY</code> adds selected files, <code>RUN</code> performs build
          steps, and <code>CMD</code> supplies the default process when a container starts. Choose maintained base images
          appropriate for the app, and review their provenance and update policy rather than relying on an arbitrary image.
        </P>
        <Code lang="dockerfile" file="Dockerfile" code={`
FROM python:3-slim

ENV PYTHONDONTWRITEBYTECODE=1 \\
    PYTHONUNBUFFERED=1
WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY app ./app

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
`} />
        <Code lang="bash" file="requirements.txt" code={`
fastapi
uvicorn
`} />
        <P>
          <code>EXPOSE</code> documents the port the application uses; it does not publish that port to the host. The
          <code> CMD</code> array form runs the process directly and makes signal handling clearer than a shell wrapper.
          Install dependencies from a lock or constraints file for reproducible production builds; an unpinned development
          requirements list can change over time as upstream packages release updates.
        </P>
        <Callout type="warning">
          Do not copy a local <code>.env</code>, cloud credential, or private SSH key into an image. Anything copied into an
          image layer can remain recoverable even if a later layer deletes it. Pass runtime secrets through an approved secret
          mechanism, not a Dockerfile <code>ENV</code> instruction.
        </Callout>
      </Part>

      <Part n={4} label="Layers and cache" title="Order Instructions to Reuse Work">
        <P>
          Many Dockerfile instructions create image layers. If an earlier layer's inputs are unchanged, the build engine can
          reuse its cached result. Copying all source files before installing dependencies means a one-line code edit can
          invalidate the dependency-install layer. Copying dependency manifests first lets ordinary code changes reuse
          dependency installation. Cache behavior depends on the instruction and its inputs; changing a base image or a
          dependency manifest appropriately requires rebuilding the affected steps.
        </P>
        <Code lang="dockerfile" file="Dockerfile layer order" code={`
FROM python:3-slim
WORKDIR /app

# Dependency inputs change less often than application source.
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy code after dependency installation to preserve useful build cache.
COPY app ./app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
`} />
        <P>
          The build context is the set of files sent to the builder, commonly the current directory when using a final dot.
          A smaller context reduces unnecessary transfer and reduces the chance of including local-only files. Add a
          <code> .dockerignore</code> that excludes virtual environments, Git metadata, caches, local secrets, and generated
          artifacts that the image does not need.
        </P>
        <Code lang="bash" file=".dockerignore" code={`
.git
.venv
__pycache__
*.py[cod]
.env
*.log
`} />
        <Callout type="example">
          If a Swiggy-style delivery API changes its Python code every day but dependencies only occasionally, putting the
          requirements copy and install before the source copy avoids reinstalling packages for every code edit.
        </Callout>
      </Part>

      <Part n={5} label="Multi-stage builds" title="Separate Build Dependencies from Runtime">
        <P>
          Multi-stage builds use one stage to prepare artifacts and another stage for the final runtime image. The final stage
          copies only what it needs from the builder, which can reduce image size and avoid shipping build-only tools. The
          example creates an isolated Python installation prefix in a builder stage and copies that prefix into a clean
          runtime stage. Test the resulting image: native dependencies, certificate stores, and runtime shared libraries may
          need to be present in both stages.
        </P>
        <Code lang="dockerfile" file="Dockerfile.multi" code={`
FROM python:3-slim AS builder
WORKDIR /build
COPY requirements.txt ./
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

FROM python:3-slim AS runtime
ENV PYTHONDONTWRITEBYTECODE=1 \\
    PYTHONUNBUFFERED=1
WORKDIR /app
COPY --from=builder /install /usr/local
COPY app ./app
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
`} />
        <P>
          Multi-stage builds are not automatically safer or smaller; verify the final artifact and dependency behavior. Use
          an appropriate non-root runtime user when the application permits it, keep only necessary packages, and avoid
          embedding build credentials. Production build pipelines should also scan images and make rebuilds available when
          upstream vulnerabilities are fixed.
        </P>
        <Steps items={[
          'Build from a small, reviewed context with a .dockerignore.',
          'Install dependencies using an appropriately reproducible manifest.',
          'Copy only application files and runtime artifacts into the final stage.',
          'Run a smoke test against the built image and record its tag or digest.',
        ]} />
      </Part>

      <Part n={6} label="Runtime data and networking" title="Keep State Outside Replaceable Containers">
        <P>
          A container's writable layer is coupled to that container's lifetime. A bind mount maps a host path into the
          container and is convenient for local development; a named volume is managed by Docker and is commonly used for
          persistent container data. Mounts can also expose host files, so do not mount broad paths or credentials without a
          reason. Back up important state and practice restores; persistence alone is not a backup.
        </P>
        <Code lang="bash" code={`
# Development: mount source into the app container for local iteration.
docker run --rm -p 8000:8000 \\
  --mount type=bind,source="$PWD/app",target=/app/app \\
  delivery-status-api:dev

# Named volume example for a service that writes durable data.
docker volume create api-data
docker volume inspect api-data
`} />
        <P>
          Port mapping has the form host port followed by container port. For local-only testing, binding to the loopback host
          interface avoids exposing the port on every network interface. In production, the network boundary should be
          controlled by the platform and firewall policy, not by an assumption that an unpublished container is inherently
          safe. Containers can communicate on a Docker network without publishing every internal service port to the host.
        </P>
        <Code lang="bash" code={`
# Expose the service to this machine only.
docker run --rm -p 127.0.0.1:8000:8000 delivery-status-api:dev

# Inspect the running container and its logs.
docker ps
docker logs delivery-api
docker inspect delivery-api
`} />
        <Callout type="tip">
          Use <code>docker logs</code> to inspect a container's standard output and error. Applications should generally log
          to those streams in containers so the platform can collect and route the logs.
        </Callout>
      </Part>

      <Part n={7} label="Operations" title="Run, Observe, and Stop Containers Intentionally">
        <P>
          Containers should run one main application process and report status through logs and health checks where the
          platform supports them. Use a meaningful container name when useful, inspect logs and exit status, and stop a
          container gracefully before removing it. Avoid editing a running container as a deployment method: those changes
          are not captured in the image and disappear when it is replaced. Change the build inputs, build a new artifact, and
          run that artifact instead.
        </P>
        <Code lang="bash" code={`
docker run -d --name delivery-api -p 127.0.0.1:8000:8000 delivery-status-api:dev
docker ps
docker logs --tail 50 delivery-api
docker stop delivery-api
docker rm delivery-api
`} />
        <P>
          A development bind mount can intentionally replace files from the image during local work; it should not be confused
          with a release artifact. Set container resource limits and restart behavior through the orchestrator or deployment
          configuration appropriate to your environment. Keep runtime configuration separate from the image so the same
          artifact can be promoted through test and production environments.
        </P>
        <Table
          head={['Question', 'Local command or feature', 'What to verify']}
          rows={[
            ['What is running?', 'docker ps', 'Image, command, port mappings, status'],
            ['Why did it stop?', 'docker logs NAME', 'Application error and startup output'],
            ['Which image is this?', 'docker inspect NAME', 'Configured image and runtime settings'],
            ['Where is state stored?', 'docker inspect / volume tools', 'Mount source and backup plan'],
          ]}
        />
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Confusing EXPOSE with publishing a port', cause: 'EXPOSE is image metadata and does not create host access.', fix: 'Use a deliberate port mapping and bind locally when appropriate.' },
          { mistake: 'Storing application state only in the container layer', cause: 'Replacing the container discards its writable layer.', fix: 'Use a volume or managed service and maintain tested backups.' },
          { mistake: 'Copying all files into the build context', cause: 'Secrets, caches, and local artifacts can enter image layers.', fix: 'Use a focused build context and a reviewed .dockerignore.' },
          { mistake: 'Treating an image tag as proof of immutable content', cause: 'Tags can be moved to refer to a different build.', fix: 'Use controlled release tags or digests and record deployed artifacts.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Containerize and Inspect the API">
        <Practice
          title="Build a repeatable local API image"
          tasks={[
            'Create the FastAPI application and requirements file shown above, then build an image from the project directory.',
            'Run the image with a host port that differs from the container port and call the health endpoint.',
            'Change only application source, rebuild, and observe which build steps can reuse cache.',
            'Add a .dockerignore and verify local .env and virtual-environment files are not included in the build context.',
            'Use a named volume with a disposable test container, remove the container, and inspect what data remains.',
            'Build the multi-stage variant and verify that the application starts and answers its health check.',
          ]}
          hint="Use local test data only. Do not copy credentials into the build context or run an unreviewed image as root on a shared host."
        />
      </Part>

      <KeyTakeaways items={[
        'Images are reusable build artifacts; containers are runtime instances of those images.',
        'A container shares the host kernel and is not a full virtual machine or a security boundary by itself.',
        'Dockerfile ordering and build context affect cache reuse, repeatability, and accidental file inclusion.',
        'EXPOSE documents a container port; publish a port explicitly when host access is needed.',
        'Use volumes or external services for state that must survive container replacement.',
        'Keep secrets out of images, review artifacts, and run production containers with least privilege.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/devops-mlops/docker-compose"
        label="Lesson 05 · Docker Compose for Multi-Service Apps"
        text="You have packaged one service. Next, define an API, database, and cache together with Compose so they can be started and tested as a system."
      />
    </LearnLayout>
  )
}
