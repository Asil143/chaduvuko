import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'PyTorch Fundamentals — Tensors, Autograd and Modules — Chaduvuko',
  description: 'Learn PyTorch tensors, devices, automatic differentiation, nn.Module, and data loading by building the foundation for a reliable neural-network workflow.',
}

const S = {
  tag: { fontSize: 11, fontWeight: 700 as const, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--accent)', fontFamily: 'var(--font-mono)', display: 'block' as const, marginBottom: 10 },
  h2: { fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900 as const, letterSpacing: '-1.2px', color: 'var(--text)', marginBottom: 14, lineHeight: 1.15 },
  h3: { fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700 as const, letterSpacing: '-0.4px', color: 'var(--text)', marginBottom: 10, marginTop: 28 },
  p: { fontSize: 15, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 16 },
  ps: { fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 10 },
  sec: { paddingBottom: 56, paddingTop: 8, borderBottom: '1px solid var(--border)' },
}

function Div() { return <div style={{ height: 56 }} /> }
function CodeBlock({ code, label = 'python' }: { code: string; label?: string }) {
  return <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', marginBottom: 24 }}>
    <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--border)', background: 'var(--surface)', fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>{label}</div>
    <pre style={{ padding: '18px 20px', margin: 0, overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.75, color: 'var(--text)' }}><code>{code}</code></pre>
  </div>
}

function Note({ title, children }: { title: string; children: React.ReactNode }) {
  return <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent)', borderRadius: 8, padding: '16px 20px', marginBottom: 20 }}>
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>{title}</div>{children}
  </div>
}

export default function PyTorchFundamentalsPage() {
  return <LearnLayout title="PyTorch Fundamentals — Tensors, Autograd and Modules" description="Build a practical mental model of PyTorch tensors, automatic differentiation, modules, and data loading before writing a complete training loop." section="Deep Learning" readTime="24–30 min">
    <div style={S.sec}>
      <span style={S.tag}>A framework that keeps the math visible</span>
      <h2 style={S.h2}>PyTorch gives you tensor operations, gradients, and reusable layers—not a black box that trains itself.</h2>
      <p style={S.p}>In the neural-network lessons, you computed a forward pass and used the chain rule to understand how parameters change. PyTorch does the bookkeeping for those derivatives. You describe operations on tensors, mark the values that should be learned, calculate a loss, and ask autograd for gradients. You still choose the model, objective, optimizer, data split, and checks that make training trustworthy.</p>
      <p style={S.p}>This lesson lays the groundwork: what a tensor represents, how shape and dtype affect an operation, how data moves between CPU and accelerators, what autograd records, and how <code>nn.Module</code> organizes trainable components. We finish by building a Dataset and DataLoader for a small tabular problem. The next lesson assembles these pieces into a full training and validation loop.</p>
      <Callout type="tip">Prerequisite: be comfortable with Python functions, NumPy-style arrays, matrix multiplication, derivatives, and the forward/backward pass of a small neural network. You do not need to memorize every PyTorch method; learn to inspect shapes and read the API documentation when details matter.</Callout>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>01 — The tensor model</span>
      <h2 style={S.h2}>A tensor is an n-dimensional array with explicit shape, dtype, and device.</h2>
      <p style={S.p}>A scalar is a zero-dimensional tensor, a vector has one axis, a matrix has two, and images or batches add more axes. The shape tells you the size of each axis; it does not tell you what those axes mean. For a batch of tabular examples, a common convention is <code>[batch, features]</code>. For an image batch, a common channel-first layout is <code>[batch, channels, height, width]</code>. Read the operation's expected layout rather than assuming every library uses the same convention.</p>
      <CodeBlock code={`import torch

score = torch.tensor(0.7)                        # scalar: []
features = torch.tensor([2.0, 5.0, 1.0])        # [3]
rows = torch.tensor([[2.0, 5.0], [1.0, 4.0]])  # [2, 2]

print(rows.shape)       # torch.Size([2, 2])
print(rows.ndim)        # 2
print(rows.dtype)       # commonly torch.float32 when specified below

# Prefer explicit dtype for model inputs and targets.
x = torch.tensor([[2, 5], [1, 4]], dtype=torch.float32)
y = torch.tensor([0, 1], dtype=torch.long)      # class-index labels`}/>
      <h3 style={S.h3}>Shape errors are meaning errors in disguise</h3>
      <p style={S.p}>Suppose there are 64 customers and each has 12 numeric features. The input has shape <code>[64, 12]</code>. A linear layer with 32 output units maps it to <code>[64, 32]</code>: the batch axis stays in place, while the feature axis changes. If you accidentally transpose the input to <code>[12, 64]</code>, the model may fail loudly—or worse, produce a plausible but semantically wrong computation if dimensions happen to line up. Print shapes at boundaries while developing.</p>
      <Note title="Read dimensions left to right"><p style={S.p}>Write down what each axis means next to important tensors: <code>batch × features</code>, <code>batch × classes</code>, or <code>batch × channels × height × width</code>. This small habit catches many broadcasting and reshape mistakes before they become training mysteries.</p></Note>
      <h3 style={S.h3}>Dtypes determine which values and operations are representable</h3>
      <p style={S.p}>Neural-network inputs and weights are usually floating-point tensors such as <code>float32</code>. Integer class labels for losses such as cross entropy are usually <code>int64</code> (shown as <code>torch.long</code>). A mismatch can trigger a useful error, but implicit conversions can also hide bugs. Keep labels in the dtype expected by the objective: class indices are integer targets; regression targets are floating point.</p>
      <CodeBlock code={`logits = torch.randn(4, 3, dtype=torch.float32)  # 4 rows, 3 class scores
class_ids = torch.tensor([0, 2, 1, 0], dtype=torch.long)
regression_targets = torch.tensor([1.2, 0.3, 0.8, 2.1], dtype=torch.float32)

assert logits.shape[0] == class_ids.shape[0]
assert logits.dtype.is_floating_point
assert class_ids.dtype == torch.long`}/>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>02 — Devices and movement</span>
      <h2 style={S.h2}>CPU, CUDA GPUs, and Apple MPS are different execution devices; all tensors in one operation must be compatible.</h2>
      <p style={S.p}>A tensor's device tells PyTorch where its storage and operations live. CPU is the reliable baseline. CUDA enables supported NVIDIA GPUs, while MPS enables supported Apple silicon GPU operations through Metal. Availability depends on the installed PyTorch build, hardware, operating system, and operation support. Detect a usable device at runtime; do not assume a GPU exists because the code runs on a developer machine.</p>
      <CodeBlock code={`if torch.cuda.is_available():
    device = torch.device("cuda")
elif torch.backends.mps.is_available():
    device = torch.device("mps")
else:
    device = torch.device("cpu")

model = model.to(device)
x_batch = x_batch.to(device)
print(device, x_batch.device)`}/>
      <p style={S.p}>Moving a model does not automatically move separately created input tensors. Move the model and each batch to the same device before the forward pass. Moving data between CPU and accelerator has a cost, so load and transfer batches deliberately. Keep data loading, metric collection, and checkpoints mindful of CPU/GPU memory.</p>
      <Note title="Device mismatch"><p style={S.p}>If a tensor on <code>cpu</code> is combined with one on <code>cuda</code> or <code>mps</code>, PyTorch will report a device mismatch. Inspect both <code>tensor.device</code> and <code>model</code>'s parameter devices; move the missing object explicitly rather than copying all tensors repeatedly inside individual layers.</p></Note>
      <h3 style={S.h3}>Views, reshapes, and in-place operations</h3>
      <p style={S.p}>Operations such as indexing and reshaping can return views that share storage with the original tensor when the layout permits; <code>reshape</code> may return a copy when needed. In-place operations mutate existing storage and can invalidate values autograd needs to compute gradients. Prefer ordinary out-of-place expressions while learning, and use in-place updates only when you understand their memory and gradient implications.</p>
      <CodeBlock code={`matrix = torch.arange(12).reshape(3, 4)
column = matrix[:, 1]
print(matrix.shape, column.shape)  # [3, 4] and [3]

# A safe, explicit transfer for a batch:
x_batch = x_batch.to(device=device, dtype=torch.float32)
# Avoid .item() or .cpu() on every inner-loop step; they can synchronize devices.`}/>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>03 — Autograd follows the computation</span>
      <h2 style={S.h2}>Autograd records operations involving gradient-tracked tensors, then applies the chain rule backward.</h2>
      <p style={S.p}>A trainable parameter has <code>requires_grad=True</code>. When operations combine it with inputs, PyTorch builds a dynamic computation graph. Calling <code>backward()</code> on a scalar objective computes gradients of that objective with respect to the participating leaf tensors. The gradients are accumulated in each leaf's <code>.grad</code> field. Accumulation is intentional—for example, gradient accumulation can simulate a larger batch—but a normal training iteration clears gradients before computing the next update.</p>
      <CodeBlock code={`w = torch.tensor(3.0, requires_grad=True)
x = torch.tensor(2.0)
loss = (w * x - 5.0) ** 2
loss.backward()

print(loss.item())  # 1.0
print(w.grad)       # derivative: 2 * (3*2 - 5) * 2 = 4`}/>
      <p style={S.p}>In a model, autograd handles a much larger expression graph: matrix multiplications, nonlinearities, and loss calculation. It does not choose the update rule. An optimizer reads the gradients and updates parameters; this distinction is why <code>backward()</code> and <code>optimizer.step()</code> are separate operations in the next lesson.</p>
      <h3 style={S.h3}>Clear gradients and distinguish training from inference</h3>
      <CodeBlock code={`optimizer.zero_grad(set_to_none=True)  # clear previous accumulated gradients
logits = model(x_batch)
loss = loss_fn(logits, y_batch)
loss.backward()                      # populate parameter .grad values
optimizer.step()                     # update parameters using those gradients`}/>
      <p style={S.p}>Gradient tracking can be disabled for validation and prediction to reduce memory use and computation. Use <code>torch.no_grad()</code> or inference mode for computations where gradients are not needed. Do not wrap a training forward pass in a no-gradient context: that prevents autograd from recording the graph needed by backpropagation.</p>
      <Callout type="warning">A common bug is forgetting to clear gradients. Then gradients from earlier batches add to the current batch's gradients. This is correct only when accumulation is intentional and the loss is scaled appropriately; otherwise, call <code>optimizer.zero_grad()</code> once per update.</Callout>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>04 — Organising a model with nn.Module</span>
      <h2 style={S.h2}>An nn.Module registers layers and parameters so PyTorch can find, move, save, and optimize them.</h2>
      <p style={S.p}>A module's <code>__init__</code> defines submodules and parameters; <code>forward</code> describes how inputs flow through them. Assigning a layer to an attribute registers it with the module. Registered parameters appear in <code>model.parameters()</code>, move with <code>model.to(device)</code>, and are included in a state dictionary. A plain Python list of layers is not automatically registered—use <code>nn.Sequential</code>, <code>nn.ModuleList</code>, or module attributes for components that should be tracked.</p>
      <CodeBlock code={`from torch import nn

class SalesRegressor(nn.Module):
    def __init__(self, n_features: int):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(n_features, 64),
            nn.ReLU(),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Linear(32, 1),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.network(x)

model = SalesRegressor(n_features=12)
print(sum(p.numel() for p in model.parameters()))`}/>
      <p style={S.p}>The forward method returns raw model outputs. For multi-class classification, the final layer typically returns logits—unnormalized class scores—and a suitable loss function combines those logits with class-index labels. Do not apply softmax before a loss that expects logits. For a one-output regressor, the output shape is often <code>[batch, 1]</code>; align the target shape intentionally rather than relying on broadcasting.</p>
      <h3 style={S.h3}>Parameters versus buffers</h3>
      <p style={S.p}>Learnable weights are parameters. Some modules also maintain state that should be saved but not optimized, such as BatchNorm's running statistics; these are buffers. Register a persistent non-learned tensor with <code>register_buffer</code> rather than assigning a tensor and hoping the optimizer treats it correctly. Inspect a module's named parameters and buffers when debugging model state.</p>
      <CodeBlock code={`for name, parameter in model.named_parameters():
    print(name, tuple(parameter.shape), parameter.requires_grad)

state = model.state_dict()  # tensors for parameters and persistent buffers
# Save/load state_dicts in a controlled training checkpoint (next lesson).`}/>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>05 — Dataset and DataLoader</span>
      <h2 style={S.h2}>Separate how one example is represented from how batches are sampled and delivered.</h2>
      <p style={S.p}>A <code>Dataset</code> defines the mapping from an index to an example. A <code>DataLoader</code> groups those examples into batches and can shuffle training examples, use worker processes, and collate individual samples. This separation lets the model consume batches without knowing where the records came from. For a small in-memory dataset, a TensorDataset may be enough; custom datasets are useful for files, images, and on-demand transforms.</p>
      <CodeBlock code={`from torch.utils.data import DataLoader, TensorDataset

# X_train and y_train must be derived after a train/validation split.
train_dataset = TensorDataset(
    torch.as_tensor(X_train, dtype=torch.float32),
    torch.as_tensor(y_train, dtype=torch.float32).reshape(-1, 1),
)
train_loader = DataLoader(
    train_dataset,
    batch_size=64,
    shuffle=True,
    drop_last=False,
)

for features, target in train_loader:
    print(features.shape, target.shape)
    break`}/>
      <p style={S.p}>The example uses a numeric sales target, so the labels are floating point and shaped <code>[batch, 1]</code>. A classification dataset may instead return an integer class index per example. Shuffle training batches to reduce dependence on record order; keep validation and test evaluation deterministic. Fit preprocessing—imputation values, category encoders, and scalers—on training data only, then apply those fitted transformations to validation and test data.</p>
      <Note title="Reproducibility is more than a seed"><p style={S.p}>Random seeds help compare experiments, but exact reproducibility can still depend on device kernels, workers, library versions, and nondeterministic operations. Record data splits, preprocessing, model configuration, and the environment. The goal is to make the experiment traceable, not to promise identical results across every machine.</p></Note>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>06 — Put the pieces together</span>
      <h2 style={S.h2}>A small model sanity check catches shape and gradient bugs before a long run.</h2>
      <p style={S.p}>Before full training, run one batch through the model, calculate the intended loss, backpropagate, and confirm that trainable parameters receive finite gradients. This is not a quality evaluation. It confirms the plumbing: inputs and targets have expected shapes and dtypes, the model output matches the objective, and the graph reaches the parameters.</p>
      <CodeBlock code={`features, target = next(iter(train_loader))
features = features.to(device)
target = target.to(device)
model = model.to(device)

prediction = model(features)
loss = nn.functional.mse_loss(prediction, target)
loss.backward()

assert prediction.shape == target.shape
assert torch.isfinite(loss)
assert any(p.grad is not None for p in model.parameters())`}/>
      <p style={S.p}>A finite loss on one batch does not mean the model is learning well. It only rules out a class of wiring errors. The next lesson adds epochs, optimizer updates, evaluation mode, validation metrics, early stopping, checkpointing, and a complete tabular example.</p>
      <Callout type="tip">When an operation fails, reduce the example to one batch and inspect <code>shape</code>, <code>dtype</code>, <code>device</code>, and whether gradients are enabled. Small executable checks are faster to reason about than a full training run.</Callout>
    </div>
    <Div />

    <div style={{ paddingBottom: 48, paddingTop: 8 }}>
      <span style={S.tag}>What comes next</span>
      <h2 style={S.h2}>Turn the tensor and module foundations into a disciplined training loop.</h2>
      <p style={S.p}>Next, train a neural network end to end: compute batch losses, update parameters, switch correctly between training and evaluation, measure validation performance, stop when generalisation stalls, and save the best checkpoint.</p>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
        <div><div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', fontFamily: 'var(--font-mono)', marginBottom: 5 }}>Next — Deep Learning</div><div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>Training Neural Networks in PyTorch — The Training Loop</div><p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>Build and validate a reproducible tabular training workflow.</p></div>
        <Link href="/learn/ai-ml/deep-learning/pytorch-training-loop" style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 700, border: '1px solid var(--accent)', padding: '7px 14px', borderRadius: 6, fontFamily: 'var(--font-mono)', textDecoration: 'none', whiteSpace: 'nowrap' }}>Start →</Link>
      </div>
    </div>
    <KeyTakeaways items={[
      'A tensor is an array with a shape, dtype, and device. Name the meaning of each axis and check shape compatibility at model boundaries.',
      'Use floating-point tensors for model inputs and regression targets, and integer class-index labels where the loss expects class IDs. Make conversions explicit.',
      'CPU is the baseline; CUDA and Apple MPS are optional accelerators whose availability and supported operations depend on the environment. Put model and batch tensors on compatible devices.',
      'Autograd records operations involving gradient-tracked tensors. backward() computes gradients and accumulates them; optimizers use those gradients to update parameters.',
      'nn.Module registers layers, parameters, and buffers so they can be inspected, moved, saved, and optimized. Define the data flow in forward().',
      'Dataset describes individual examples; DataLoader batches and samples them. Fit preprocessing on training data only and reuse the fitted transformation elsewhere.',
      'Before training, run one batch through the full path and verify output-target shapes, finite loss, and parameter gradients.',
    ]} />
  </LearnLayout>
}
