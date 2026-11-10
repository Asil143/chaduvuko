import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Training Neural Networks in PyTorch — The Training Loop — Chaduvuko',
  description: 'Build a complete PyTorch training workflow with losses, optimizers, train/eval modes, validation, early stopping, checkpointing, and an introduction to mixed precision.',
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
  return <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', marginBottom: 24 }}><div style={{ padding: '8px 16px', borderBottom: '1px solid var(--border)', background: 'var(--surface)', fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div><pre style={{ padding: '18px 20px', margin: 0, overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.75, color: 'var(--text)' }}><code>{code}</code></pre></div>
}

export default function PyTorchTrainingLoopPage() {
  return <LearnLayout title="Training Neural Networks in PyTorch — The Training Loop" description="Train a tabular neural network with correct gradient updates, train/eval modes, validation, early stopping, checkpointing, and an introduction to mixed precision." section="Deep Learning" readTime="28–35 min">
    <div style={S.sec}>
      <span style={S.tag}>From model definition to a trustworthy experiment</span>
      <h2 style={S.h2}>Training is a repeated experiment: predict, measure error, compute gradients, update, then test on data the model did not train on.</h2>
      <p style={S.p}>A neural network's forward method only produces outputs. A complete training workflow must define how examples are split, how batches are loaded, which loss matches the task, which optimizer updates parameters, and how performance is checked on held-out data. A loop that lowers training loss is not automatically a useful model: it may be overfitting, leaking information from validation, or optimizing the wrong objective.</p>
      <p style={S.p}>We will use a fictional Indian retail demand dataset: each row contains store and product attributes plus calendar features, and the target is next-period units sold. Assume the data has already been split chronologically or by the intended deployment boundary, categorical data is encoded using training-fitted transformations, and numeric values are scaled without looking at validation outcomes. The example focuses on the mechanics that apply to other tabular regression tasks too.</p>
      <Callout type="tip">Prerequisite: tensors, autograd, nn.Module, Dataset/DataLoader, and basic neural-network losses. Start with the PyTorch fundamentals lesson if moving a model to a device or differentiating a computation is still unfamiliar.</Callout>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>01 — Define the task and model</span>
      <h2 style={S.h2}>Match the final output, target shape, and loss to the prediction problem.</h2>
      <p style={S.p}>For one continuous demand target, a regression network can emit one value per example. Mean squared error penalizes large residuals more strongly; mean absolute error is less sensitive to extreme residuals and is often useful as a reporting metric. It is common to optimize one loss and report several business-relevant metrics. The choice should reflect the cost of errors, not habit.</p>
      <CodeBlock code={`import torch
from torch import nn

class DemandRegressor(nn.Module):
    def __init__(self, input_features: int):
        super().__init__()
        self.layers = nn.Sequential(
            nn.Linear(input_features, 128),
            nn.ReLU(),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Linear(64, 1),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.layers(x)

model = DemandRegressor(input_features=24)
loss_fn = nn.MSELoss()
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-3, weight_decay=1e-4)`}/>
      <p style={S.p}>The final layer is linear: negative predictions are possible. Whether to constrain predictions depends on how the target is defined and how the model will be used. Do not add a clamp simply because demand cannot be negative without considering what it does to gradients and evaluation; model the target and constraints deliberately. For classification, change the output dimension and loss/target convention rather than reusing regression code unchanged.</p>
      <h3 style={S.h3}>Loss is not a business metric by itself</h3>
      <p style={S.p}>MSE is measured in squared target units, so its scale is not directly interpretable as units sold. Track metrics in the original target scale when that is meaningful. If targets or inputs were transformed, invert the target transformation before calculating human-readable metrics, and fit any transformation using training data only.</p>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>02 — One optimizer update</span>
      <h2 style={S.h2}>The core sequence is clear because each operation has one job.</h2>
      <CodeBlock code={`model.train()                         # training behavior for modules like Dropout
for features, target in train_loader:
    features = features.to(device)
    target = target.to(device)

    optimizer.zero_grad(set_to_none=True)
    prediction = model(features)
    loss = loss_fn(prediction, target)
    loss.backward()
    optimizer.step()`}/>
      <p style={S.p}><code>zero_grad</code> clears accumulated gradients; the model computes predictions; the loss compares predictions with targets; <code>backward</code> fills parameter gradients; and <code>step</code> changes parameter values. Each batch produces an update. One pass over all training batches is an epoch, not necessarily a meaningful unit of progress if the data pipeline repeats examples or drops records.</p>
      <h3 style={S.h3}>Aggregate batch metrics with the correct weighting</h3>
      <p style={S.p}>Averaging batch means equally can be slightly wrong when the final batch is smaller. Weight each batch loss by its example count, or accumulate a sum-reduced loss. For reporting MAE, accumulate the sum of absolute errors and divide by the number of examples. Convert values to Python scalars for periodic logging rather than synchronizing the accelerator on every operation.</p>
      <CodeBlock code={`total_loss = 0.0
examples = 0

for features, target in train_loader:
    features, target = features.to(device), target.to(device)
    optimizer.zero_grad(set_to_none=True)
    prediction = model(features)
    loss = loss_fn(prediction, target)
    loss.backward()
    optimizer.step()

    count = features.size(0)
    total_loss += loss.detach().item() * count
    examples += count

epoch_train_loss = total_loss / examples`}/>
      <Callout type="warning">If loss becomes NaN or explodes, stop and inspect input ranges, target scaling, learning rate, and the first batch. Check tensors with <code>torch.isfinite</code>; do not hide invalid values by replacing them blindly.</Callout>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>03 — Train mode, eval mode, and validation</span>
      <h2 style={S.h2}>Evaluation changes both the module behavior and the gradient context.</h2>
      <p style={S.p}>Some layers behave differently during learning and prediction. Dropout randomly masks activations in training mode but not evaluation mode. Batch normalization uses batch statistics during training and stored running statistics during evaluation. Call <code>model.train()</code> before training batches and <code>model.eval()</code> before validation or inference.</p>
      <p style={S.p}>Evaluation does not update weights. Pair <code>model.eval()</code> with <code>torch.no_grad()</code> (or inference mode) so PyTorch avoids building a gradient graph. Then calculate validation metrics over the complete validation set. Validation guides model and hyperparameter choices; reserve a separate test set for a final, limited-use estimate after those choices are settled.</p>
      <CodeBlock code={`def evaluate(model, loader, loss_fn, device):
    model.eval()
    loss_sum = 0.0
    absolute_error_sum = 0.0
    examples = 0

    with torch.no_grad():
        for features, target in loader:
            features, target = features.to(device), target.to(device)
            prediction = model(features)
            count = features.size(0)
            loss_sum += loss_fn(prediction, target).item() * count
            absolute_error_sum += (prediction - target).abs().sum().item()
            examples += count

    return {
        "loss": loss_sum / examples,
        "mae": absolute_error_sum / examples,
    }`}/>
      <p style={S.p}>When training resumes after validation, explicitly call <code>model.train()</code>. A metric averaged over batches should be weighted by the number of examples, as above. Make sure a validation dataset does not use a training-only random augmentation and that its preprocessing is identical to inference preprocessing.</p>
      <h3 style={S.h3}>Choose splits that mirror the way predictions will be made</h3>
      <p style={S.p}>For independent rows, a random split may be suitable if it respects groups and duplicate records. For repeat observations by customer, store, or product, random row splitting can put near-identical entities on both sides. For future demand forecasts, use a chronological split so validation occurs after training time. Split design is part of the evaluation claim: it defines what the reported metric can reasonably predict.</p>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>04 — Epochs, early stopping, and the best checkpoint</span>
      <h2 style={S.h2}>Use validation to decide when to stop, and save the best model—not simply the final epoch.</h2>
      <p style={S.p}>Training loss usually keeps improving as a model fits the training examples. Validation loss may improve, then flatten or worsen as generalisation declines. Early stopping tracks the best validation score and stops after a chosen patience window with no improvement. The patience and minimum improvement threshold are hyperparameters, not universal constants.</p>
      <CodeBlock code={`best_val = float("inf")
best_state = None
patience = 8
stale_epochs = 0

for epoch in range(max_epochs):
    model.train()
    train_metrics = train_one_epoch(model, train_loader, loss_fn, optimizer, device)
    val_metrics = evaluate(model, valid_loader, loss_fn, device)
    val_loss = val_metrics["loss"]

    if val_loss < best_val:
        best_val = val_loss
        best_state = {k: v.detach().cpu().clone()
                      for k, v in model.state_dict().items()}
        stale_epochs = 0
    else:
        stale_epochs += 1

    print(epoch, train_metrics, val_metrics)
    if stale_epochs >= patience:
        break

if best_state is not None:
    model.load_state_dict(best_state)`}/>
      <p style={S.p}>Cloning the state dictionary matters: a state dictionary references tensors that continue changing during training. For an in-memory best-weight snapshot, clone them. For a resumable checkpoint, save model state, optimizer state, epoch, best validation score, and any scheduler or gradient-scaler state. Store preprocessing metadata and the feature order alongside the model in a controlled, versioned artifact.</p>
      <CodeBlock label="checkpointing" code={`checkpoint = {
    "epoch": epoch,
    "model_state_dict": model.state_dict(),
    "optimizer_state_dict": optimizer.state_dict(),
    "best_validation_loss": best_val,
    "feature_names": feature_names,
    "preprocessing": preprocessing_metadata,
}
torch.save(checkpoint, checkpoint_path)

# Loading requires reconstructing the same model and optimizer first.
checkpoint = torch.load(checkpoint_path, map_location=device)
model.load_state_dict(checkpoint["model_state_dict"])
optimizer.load_state_dict(checkpoint["optimizer_state_dict"])`}/>
      <Callout type="tip">Treat checkpoint files as trusted artifacts. Keep model architecture and preprocessing definitions available, record the data and code provenance, and test that a loaded model produces the same predictions as the saved model.</Callout>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>05 — A reusable training epoch</span>
      <h2 style={S.h2}>Extract the update and measurement logic so experiments stay readable.</h2>
      <p style={S.p}>The following function keeps the training-only operations together. In a real project, annotate inputs and return types, add structured logging, and define how non-finite batches are handled. Avoid hiding data-dependent behavior inside an opaque helper: training code should make it easy to see when gradients are enabled and when parameter updates occur.</p>
      <CodeBlock code={`def train_one_epoch(model, loader, loss_fn, optimizer, device):
    model.train()
    loss_sum = 0.0
    examples = 0

    for features, target in loader:
        features, target = features.to(device), target.to(device)
        optimizer.zero_grad(set_to_none=True)

        prediction = model(features)
        loss = loss_fn(prediction, target)
        if not torch.isfinite(loss):
            raise RuntimeError("Non-finite training loss")

        loss.backward()
        optimizer.step()

        count = features.size(0)
        loss_sum += loss.detach().item() * count
        examples += count

    return {"loss": loss_sum / examples}`}/>
      <p style={S.p}>A learning-rate scheduler may adjust optimizer learning rates over epochs or batches. Follow the scheduler's documented stepping convention: some schedulers step after each epoch, others after an optimizer update, and plateau-based schedulers take a validation metric. Log the actual learning rate so a schedule that is not advancing does not go unnoticed.</p>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>06 — Mixed precision and practical performance</span>
      <h2 style={S.h2}>Use mixed precision as a measured optimization, not as a substitute for a correct baseline.</h2>
      <p style={S.p}>Mixed precision performs selected operations using lower-precision floating-point formats while retaining precision where needed. On supported hardware it can reduce memory use and improve throughput. The appropriate dtype and APIs depend on device, operation, and PyTorch release. CUDA training commonly combines autocasting with gradient scaling for float16; bfloat16 often has a wider exponent range and may not need scaling, depending on the workflow. Benchmark before keeping the added complexity.</p>
      <CodeBlock code={`# Illustrative CUDA pattern; enable only on a supported CUDA device.
use_amp = device.type == "cuda"
scaler = torch.amp.GradScaler("cuda", enabled=use_amp)

for features, target in train_loader:
    features, target = features.to(device), target.to(device)
    optimizer.zero_grad(set_to_none=True)

    with torch.autocast(device_type=device.type, enabled=use_amp):
        prediction = model(features)
        loss = loss_fn(prediction, target)

    scaler.scale(loss).backward()
    scaler.step(optimizer)
    scaler.update()`}/>
      <p style={S.p}>The snippet is illustrative and assumes a current PyTorch API that accepts a device type for autocast and a CUDA GradScaler. Check the installed version's official documentation before adapting it. Keep a full-precision baseline, compare task metrics, and test numerical stability. Do not enable a CUDA-specific scaler for CPU or MPS simply because it appears in an example.</p>
      <h3 style={S.h3}>Other performance checks</h3>
      <p style={S.p}>Profile the input pipeline and model before optimizing. Small batches, repeated CPU-to-device copies, synchronous logging, and expensive preprocessing can dominate training. A faster kernel does not help if the accelerator waits for data. Reproducible benchmarks use the same data, batch size, warm-up, and measurement procedure.</p>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>07 — Debugging failure scenarios</span>
      <h2 style={S.h2}>When training looks wrong, investigate the data path and evaluation assumptions first.</h2>
      <p style={S.p}>A falling training loss with flat validation performance may indicate overfitting, a mismatched split, distribution shift, or an uninformative feature set. A constant loss can mean the learning rate is too small, gradients are missing, targets are misaligned, or parameters are not in the optimizer. Compare a tiny-batch overfit test: a sufficiently expressive model should often fit a very small clean sample. If it cannot, verify the labels, loss, output shape, and gradient flow.</p>
      <CodeBlock code={`# Useful first checks
print(features.shape, features.dtype, features.device)
print(target.shape, target.dtype, target.min().item(), target.max().item())
print(prediction.shape, loss.item())

for name, parameter in model.named_parameters():
    if parameter.grad is not None:
        print(name, parameter.grad.norm().item())`}/>
      <p style={S.p}>For retail demand, inspect seasonality, stockouts, promotions, and zero-heavy targets before interpreting a model metric. Randomly splitting future observations into training rows can leak information into the evaluation. A low average error may still hide poor performance on important stores or products; report slices that reflect operational consequences.</p>
      <Callout type="warning">Do not use the test set for repeated tuning. Every decision informed by a test score makes it part of the development process. Keep validation for iteration and make the final test evaluation a deliberate, documented step.</Callout>
    </div>
    <Div />

    <div style={{ paddingBottom: 48, paddingTop: 8 }}>
      <span style={S.tag}>What comes next</span>
      <h2 style={S.h2}>With the training mechanics in place, explore architectures that use image structure.</h2>
      <p style={S.p}>A fully connected network sees an image as a flat feature vector. Convolutional networks preserve local spatial patterns and share filters across image locations. The CNN lesson applies PyTorch training to a visual classification problem and introduces the architectural ideas behind image models.</p>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
        <div><div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', fontFamily: 'var(--font-mono)', marginBottom: 5 }}>Next — Deep Learning</div><div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>CNNs — Shopify Product Image Classification</div><p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>Learn how convolutions turn pixels into useful spatial features.</p></div>
        <Link href="/learn/ai-ml/deep-learning/cnns-image-classification" style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 700, border: '1px solid var(--accent)', padding: '7px 14px', borderRadius: 6, fontFamily: 'var(--font-mono)', textDecoration: 'none', whiteSpace: 'nowrap' }}>Start →</Link>
      </div>
    </div>
    <KeyTakeaways items={[
      'A training update clears gradients, runs the forward pass, computes a task-appropriate loss, calls backward(), and steps the optimizer.',
      'Use model.train() for optimization and model.eval() plus a no-gradient context for validation and inference.',
      'Weight batch-level metrics by example count, especially when the final batch is smaller.',
      'Validation informs model choices; the test set is for a final limited-use estimate. Choose splits that match deployment, including chronological splits for forecasting.',
      'Early stopping monitors validation performance and restores the best checkpoint, not automatically the last epoch.',
      'A resumable checkpoint includes model and optimizer state plus relevant scheduler/scaler state, epoch, preprocessing, and provenance.',
      'Mixed precision can improve throughput on supported hardware. Benchmark it against a stable full-precision baseline and verify the installed API.',
    ]} />
  </LearnLayout>
}
