import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function DomAndEvents() {
  return (
    <LearnLayout
      title="The DOM and Events"
      description="Select and update elements, handle clicks and form input, use event delegation, and build a small interactive to-do list."
      section="JavaScript & TypeScript — Lesson 06"
      readTime="40 min"
    >
      <Part n={1} label="From markup to behaviour" title="The DOM Is the Browser's Page Model">
        <P>
          When a browser loads HTML, it builds a tree of objects called the Document Object Model (DOM). JavaScript can query
          that tree, read or update properties, and respond to user interactions. The DOM is a browser API, not a feature
          available in every JavaScript environment: Node.js scripts do not automatically have a <code>document</code>.
        </P>
        <P>
          We will make an expense tracker for everyday spending: enter a description and a rupee amount, add it to a list, and
          see a running total. This is a learning project, not a payment system or accounting ledger. Its design will keep
          markup, behaviour, and feedback distinct so each piece is easier to inspect.
        </P>
        <Callout type="example">
          Imagine recording a bus fare, lunch, and a mobile recharge. The page can calculate a display total in the browser,
          but a real financial application must validate and persist authoritative records on a trusted server.
        </Callout>
        <P>
          Put the controls and output in HTML first. Labels connect to form controls, and a live region can announce a new
          result to assistive technology. The form has a submit button, so pressing Enter works as well as clicking Add.
        </P>
        <Code lang="html" code={`<form id="expense-form">
  <label for="expense-description">Description</label>
  <input id="expense-description" name="description" required maxlength="80">

  <label for="expense-amount">Amount in rupees</label>
  <input id="expense-amount" name="amount" type="number" min="0.01" step="0.01" required>

  <button type="submit">Add expense</button>
</form>
<p id="expense-total" aria-live="polite">Total: ₹0.00</p>
<ul id="expense-list" aria-label="Expenses"></ul>
<p id="expense-message" role="status"></p>`} />
        <P>
          Connect the script after the relevant markup or use a deferred/module script. This means selectors can find the
          elements when the code executes. In a larger application, modules and bundlers help organize that relationship.
        </P>
      </Part>

      <Part n={2} label="Querying" title="Select the Smallest Useful Set of Elements">
        <P>
          <code>document.querySelector()</code> returns the first matching element or <code>null</code>. Use a specific ID or
          a stable data attribute for a page control. Query once and keep the result instead of searching the whole document
          repeatedly. Check required elements during development so a typo fails close to its cause.
        </P>
        <Code lang="javascript" code={`const form = document.querySelector('#expense-form')
const descriptionInput = document.querySelector('#expense-description')
const amountInput = document.querySelector('#expense-amount')
const list = document.querySelector('#expense-list')
const totalOutput = document.querySelector('#expense-total')
const message = document.querySelector('#expense-message')

if (!form || !descriptionInput || !amountInput || !list || !totalOutput || !message) {
  throw new Error('Expense tracker markup is incomplete')
}`} />
        <P>
          In a TypeScript lesson we will make those element types explicit. In plain JavaScript, the browser APIs return
          general element references, and a selector may fail. Guarding missing elements is more robust than assuming every
          selector will always succeed after markup changes.
        </P>
        <P>
          To create visible rows safely, create DOM nodes and assign user-provided text with <code>textContent</code>. Do not
          concatenate untrusted text into <code>innerHTML</code>; parsing it as markup can create cross-site scripting issues.
        </P>
        <Callout type="warning">
          Never assume form text is trusted or harmless. Use text APIs for display, validate the values you need, and enforce
          important rules again on the server when saving data.
        </Callout>
      </Part>

      <Part n={3} label="Events" title="Respond to User Actions with Listeners">
        <P>
          An event represents something that happened: a form was submitted, a button clicked, or a key pressed. Register a
          listener on the element that owns the action. The browser provides an event object with information about the event.
          Calling <code>preventDefault()</code> stops a form's default page navigation so JavaScript can handle it.
        </P>
        <Code lang="javascript" code={`form.addEventListener('submit', (event) => {
  event.preventDefault()
  console.log('The form was submitted')
})`} />
        <P>
          A submit event is a better foundation than listening only for a button click: keyboard submission is supported too.
          The browser can perform basic constraint validation for fields marked <code>required</code> or given a numeric range.
          JavaScript can add domain-specific checks and helpful messages.
        </P>
        <Table
          head={['Event / API', 'What it tells you', 'Useful for']}
          rows={[
            ['submit', 'The user submitted a form', 'Validate and process a complete set of fields'],
            ['input', 'A control value changed', 'Live search or immediate feedback'],
            ['change', 'A committed value changed', 'Select controls or fields after editing'],
            ['event.target', 'The element associated with an event', 'Read an input or identify a clicked control'],
          ]}
          caption="A few browser event concepts"
        />
        <Callout type="tip">
          Register a listener once when setting up the page. Adding another listener each time a button is clicked creates
          duplicate handlers and can make one action run repeatedly.
        </Callout>
      </Part>

      <Part n={4} label="Form input" title="Validate Text and Amounts at the Boundary">
        <P>
          Input control values are strings, including values from a number input. Trim surrounding spaces from a description,
          and convert the entered amount explicitly. Reject an empty description, non-finite number, or non-positive amount.
          Form attributes improve user experience, but JavaScript checks also provide a clear and testable rule.
        </P>
        <Code lang="javascript" code={`function readExpense(descriptionValue, amountValue) {
  const description = descriptionValue.trim()
  const amount = Number(amountValue)

  if (description.length === 0) {
    return { error: 'Enter a description for this expense.' }
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    return { error: 'Enter an amount greater than ₹0.' }
  }

  return { expense: { description, amount } }
}

console.log(readExpense(' Bus fare ', '35'))`} />
        <P>
          This example keeps values in rupees as JavaScript numbers for a simple demonstration. Binary floating-point can
          represent some decimal fractions approximately. In a real money workflow, use integer paise or a decimal strategy
          consistently, define rounding rules, and let a secure server validate any transaction amount.
        </P>
        <Steps items={[
          'Read the form values only when the user submits.',
          'Trim the description and convert the amount deliberately.',
          'Reject invalid values and show a useful message next to the form.',
          'Only after validation, create a row and update the displayed total.',
        ]} />
        <P>
          Messages should tell the user how to recover, not merely say something went wrong. Use a status region for feedback,
          and do not rely only on colour to indicate an error. When validation fails, focus the field that needs attention if
          you can do so without disrupting the user's flow.
        </P>
      </Part>

      <Part n={5} label="Build the tracker" title="Render Each Expense as a Text Node">
        <P>
          Keep the expenses in an array of objects. A small rendering function creates a list item for every record, formats
          its amount with the internationalisation API, and replaces the list contents. Because descriptions enter through
          <code>textContent</code>, strings such as <code>&lt;script&gt;</code> display as text rather than executable markup.
        </P>
        <Code lang="javascript" code={`const expenses = []
const rupeeFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
})

function renderExpenses() {
  list.replaceChildren()
  let total = 0

  for (const expense of expenses) {
    total += expense.amount
    const item = document.createElement('li')
    const description = document.createElement('span')
    const amount = document.createElement('span')
    description.textContent = expense.description
    amount.textContent = rupeeFormatter.format(expense.amount)
    item.append(description, ' — ', amount)
    list.append(item)
  }

  totalOutput.textContent = 'Total: ' + rupeeFormatter.format(total)
}`} />
        <P>
          Build the submit handler around the validation function. Reset the form after success and restore focus to the
          description field so the next entry is quick. The message should clear after a successful add. These small details
          help make a demo feel like a usable interface.
        </P>
        <Code lang="javascript" code={`form.addEventListener('submit', (event) => {
  event.preventDefault()
  const result = readExpense(descriptionInput.value, amountInput.value)

  if (result.error) {
    message.textContent = result.error
    return
  }

  expenses.push(result.expense)
  message.textContent = 'Expense added.'
  form.reset()
  descriptionInput.focus()
  renderExpenses()
})`} />
        <P>
          At this size, replacing the list is straightforward. If the interface grows, render only the changed row, separate
          state management from DOM updates, and add tests for the formatting and validation rules. Re-rendering every record
          can become wasteful for a very large list.
        </P>
      </Part>

      <Part n={6} label="Event delegation" title="Handle Repeated Controls at a Stable Parent">
        <P>
          Suppose each expense row gets a Remove button. Attaching a separate listener to every button is possible, but the
          list changes as rows are added. Event delegation registers one listener on the stable list parent and inspects the
          event target to find the action. It reduces setup work and also handles buttons added later.
        </P>
        <Code lang="javascript" code={`list.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return
  const button = event.target.closest('button[data-expense-id]')
  if (!button || !list.contains(button)) return

  const id = button.dataset.expenseId
  const index = expenses.findIndex((expense) => expense.id === id)
  if (index === -1) return

  expenses.splice(index, 1)
  renderExpenses()
})`} />
        <P>
          The handler above assumes each expense has a stable <code>id</code> and each row includes a button with the matching
          data attribute. In production code, use a unique ID generated by the application, not an array index that changes
          when items are removed. Check that the selected control really belongs to the list before acting on it.
        </P>
        <Callout type="info">
          Event bubbling is what makes delegation work: an event on a button travels up through its ancestors. Some events do
          not bubble in the same way, so check the event's behaviour when choosing a delegation point.
        </Callout>
        <P>
          A production tracker might also offer categories, undo, deletion confirmation, and persistence. Add them only when
          they solve a real user need. Each new interaction introduces additional states to test, including empty lists,
          repeated clicks, and failed saves.
        </P>
      </Part>

      <Part n={7} label="Accessibility and safety" title="Make the Interface Work Beyond a Mouse Demo">
        <P>
          Use semantic controls, explicit labels, keyboard-operable buttons, and visible focus styles. Give dynamic feedback
          an appropriate live region. Keep reading order logical and ensure all states have text, not colour alone. Test the
          form with keyboard navigation and a screen reader where available.
        </P>
        <P>
          The code in this lesson keeps data in memory, so a refresh clears it. A real application would save expenses to a
          backend or carefully chosen local storage. Browser storage is not a secure database and should not hold sensitive
          financial data without an appropriate design. Avoid presenting a local-only total as a verified account balance.
        </P>
        <Callout type="warning">
          XSS prevention is part of UI correctness. Prefer <code>textContent</code> and safe DOM APIs for user text; only use
          HTML parsing for content you control and have deliberately sanitized.
        </Callout>
        <P>
          Consider empty and error states from the beginning. An empty list should say what to do next; an invalid amount
          should identify the field; and a future network failure should leave the user with a retry path rather than silently
          losing the entry.
        </P>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Querying an element before it exists', cause: 'The script runs before the browser has parsed the markup.', fix: 'Place the script after the markup or defer it, then guard selectors that may be absent.' },
          { mistake: 'Listening only for a button click', cause: 'Keyboard users can submit the form without triggering that click handler.', fix: 'Handle the form submit event and call preventDefault when taking over submission.' },
          { mistake: 'Putting user text in innerHTML', cause: 'The browser parses that string as markup, which can create an injection vulnerability.', fix: 'Use textContent and createElement for user-controlled text.' },
          { mistake: 'Treating an input value as a number already', cause: 'DOM input values are strings and can be empty or invalid.', fix: 'Convert explicitly, validate finite range, and handle errors before updating state.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Extend the Rupee Expense Tracker">
        <Practice
          title="Add a useful interaction and test the edge cases"
          tasks={[
            'Create the labelled form and output regions from Part 1, then query them safely.',
            'Implement validation for a trimmed description and a positive finite amount.',
            'Render descriptions with textContent and amounts using Intl.NumberFormat with INR.',
            'Add a category field and show it in each row without using innerHTML.',
            'Add a remove button per row and handle it with event delegation using a stable ID.',
            'Test keyboard submission, an empty description, an invalid amount, a description containing HTML-like text, and removing the final row.',
          ]}
          hint="Keep the data array as the source of truth; render the visible list from that state after every change."
        />
      </Part>

      <KeyTakeaways items={[
        'The DOM is the browser representation of HTML, and JavaScript uses browser APIs to query and update it.',
        'Use stable selectors, register listeners once, and handle form submission rather than only button clicks.',
        'Treat every input as untrusted text until it has been converted and validated.',
        'Use textContent and safe node creation for user-provided content; avoid untrusted innerHTML.',
        'Event delegation handles actions from dynamic child elements at a stable parent.',
        'Accessible labels, keyboard support, focus, and status messages are part of a complete interface.',
        'A client-side total is a demo display, not an authoritative financial record.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/javascript/browser-storage-json"
        label="Lesson 07 · JSON, localStorage and Browser Storage"
        text="Serialise data with JSON, persist state in localStorage and sessionStorage, understand cookies and IndexedDB, and keep stored data safe."
      />
    </LearnLayout>
  )
}
