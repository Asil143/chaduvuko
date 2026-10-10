import type { LessonQuick } from '@/lib/lesson-quick'

const H = '/learn/html-css'

// HTML and CSS examples are markup, shown as code; nothing here is run.
export const HTML_CSS_QUICK: Record<string, LessonQuick> = {
  [`${H}/what-is-html-how-the-web-works`]: {
    answer: 'HTML (HyperText Markup Language) describes the structure and meaning of a web page with tags such as <h1>, <p> and <a>. Your browser looks up the site\'s address with DNS, requests the HTML over HTTP, then fetches the CSS, scripts and images it references and draws the page.',
    points: [
      'The server only sends files; the browser turns them into the page you see.',
      'DNS turns a domain name into an IP address before any request is sent.',
      'One page load is many HTTP requests: the HTML, then each stylesheet, script, image and font.',
    ],
    example: {
      label: 'The smallest useful HTML page',
      lang: 'html',
      code: `<!DOCTYPE html>
<html lang="en">
  <head><meta charset="utf-8"><title>Hello</title></head>
  <body>
    <h1>Hello, web</h1>
    <p>This paragraph came from a server as plain text.</p>
  </body>
</html>`,
      static: true,
    },
    check: {
      question: 'What happens first when you type a domain name into the browser?',
      options: ['The browser renders the HTML', 'A DNS lookup finds the server\'s IP address', 'The CSS is downloaded', 'JavaScript runs'],
      answer: 1,
      explanation: 'The browser cannot request anything until DNS has translated the name into an IP address.',
    },
  },

  [`${H}/document-structure`]: {
    answer: 'Every HTML document has the same skeleton: <!DOCTYPE html> on the first line, an <html lang="…"> element, a <head> with metadata such as the charset and title, and a <body> with everything visitors see.',
    points: [
      'A missing or misplaced DOCTYPE switches the browser to quirks mode.',
      'Nothing in <head> shows on the page; <body> holds the visible content.',
      'Put <meta charset="utf-8"> first in <head>.',
    ],
    example: {
      label: 'The standard document skeleton',
      lang: 'html',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Order history · FreshCart</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <!-- everything the visitor sees -->
</body>
</html>`,
      static: true,
    },
    check: {
      question: 'What does a missing <!DOCTYPE html> cause?',
      options: ['A blank page', 'Quirks mode, with older layout rules', 'A server error', 'Nothing at all'],
      answer: 1,
      explanation: 'Without the DOCTYPE the browser falls back to quirks mode, which uses different box-model and layout maths.',
    },
  },

  [`${H}/text-semantic-structure`]: {
    answer: 'Headings (<h1>–<h6>) form a page\'s outline, <p> marks paragraphs, and semantic sections such as <header>, <nav>, <main>, <article>, <section>, <aside> and <footer> say what each part of the page is, not how it looks.',
    points: [
      'Use one <h1> per page and do not skip heading levels.',
      'Pick heading levels for structure; change their size with CSS.',
      '<div> is for grouping with no meaning; prefer a semantic tag when one fits.',
    ],
    example: {
      label: 'A page outlined with semantic tags',
      lang: 'html',
      code: `<header><nav>…</nav></header>
<main>
  <article>
    <h1>How to read a SQL query plan</h1>
    <section>
      <h2>Start at the innermost step</h2>
      <p>Plans run from the inside out.</p>
    </section>
  </article>
  <aside>Related lessons</aside>
</main>
<footer>© 2026 Chaduvuko</footer>`,
      static: true,
    },
    check: {
      question: 'You want smaller text for a subheading under an <h2>. What should you use?',
      options: ['<h5>, because it is smaller', '<h3>, sized with CSS if needed', '<p> with bold text', 'Any heading; levels do not matter'],
      answer: 1,
      explanation: 'Headings describe structure. The next level down is <h3>; its size is a CSS decision.',
    },
  },

  [`${H}/links-navigation`]: {
    answer: 'The anchor element <a href="…"> makes a link. href can be absolute (https://…), root-relative (/learn), relative to the current page (../about), or a fragment (#section) that jumps within a page.',
    points: [
      'Use <a> for anything that navigates; it gets keyboard and screen-reader support for free.',
      'Root-relative links (starting with /) keep working when a page moves.',
      'Pair target="_blank" with rel="noopener noreferrer".',
    ],
    example: {
      label: 'Internal, external and in-page links',
      lang: 'html',
      code: `<nav aria-label="Main">
  <a href="/learn/sql">SQL lessons</a>
  <a href="#pricing">Jump to pricing</a>
  <a href="https://www.postgresql.org/docs/"
     target="_blank" rel="noopener noreferrer">PostgreSQL docs</a>
</nav>

<h2 id="pricing">Pricing</h2>`,
      static: true,
    },
    check: {
      question: 'Which href always resolves from the site\'s root?',
      options: ['about.html', '../about.html', '/about', '#about'],
      answer: 2,
      explanation: 'An href starting with / is root-relative; the others depend on the current page\'s location.',
    },
  },

  [`${H}/images-media`]: {
    answer: '<img src="…" alt="…"> embeds an image; alt is the text alternative read by screen readers and shown when the image fails. <figure> and <figcaption> caption media, and <video> and <audio> embed playable media with fallbacks via <source>.',
    points: [
      'Write meaningful alt text; use alt="" only for purely decorative images.',
      'Set width and height so the browser reserves space and the layout does not jump.',
      'loading="lazy" delays offscreen images until they are needed.',
    ],
    example: {
      label: 'An accessible, lazy-loaded figure',
      lang: 'html',
      code: `<figure>
  <img src="/img/pipeline.png" width="800" height="450" loading="lazy"
       alt="Data flows from the app database to S3, then to the warehouse">
  <figcaption>A nightly batch pipeline.</figcaption>
</figure>`,
      static: true,
    },
    check: {
      question: 'What should a purely decorative image use?',
      options: ['No alt attribute', 'alt=""', 'alt="image"', 'alt="decorative"'],
      answer: 1,
      explanation: 'An empty alt tells screen readers to skip it. Leaving alt out makes them read the file name instead.',
    },
  },

  [`${H}/lists`]: {
    answer: '<ul> is a list where order does not matter, <ol> a list where it does (steps, rankings), and <dl> pairs terms (<dt>) with descriptions (<dd>). Each item in <ul> or <ol> is an <li>.',
    points: [
      'Ask: would shuffling the items make it wrong? If yes, use <ol>.',
      '<ol> accepts start, reversed and type attributes.',
      'Only <li> may be a direct child of <ul> or <ol>; nest lists inside an <li>.',
    ],
    example: {
      label: 'Ordered steps with a nested list',
      lang: 'html',
      code: `<ol>
  <li>Install Python</li>
  <li>Create a virtual environment
    <ul>
      <li>macOS / Linux: python3 -m venv .venv</li>
      <li>Windows: py -m venv .venv</li>
    </ul>
  </li>
  <li>Install packages</li>
</ol>`,
      static: true,
    },
    check: {
      question: 'Where must a nested list go?',
      options: ['Directly inside the outer <ul>', 'Inside an <li> of the outer list', 'After the outer list closes', 'Inside a <dl>'],
      answer: 1,
      explanation: 'Only <li> may be a direct child of <ul> or <ol>, so a sub-list lives inside an <li>.',
    },
  },

  [`${H}/tables`]: {
    answer: 'HTML tables present tabular data: <table> holds rows (<tr>) of cells, <th> for headers and <td> for data, grouped into <thead>, <tbody> and <tfoot>. Use them for data, never for page layout.',
    points: [
      '<th scope="col"> and scope="row" tell screen readers which cells they label.',
      'colspan and rowspan merge cells across columns or rows.',
      'Add a <caption> to name the table.',
    ],
    example: {
      label: 'A small accessible data table',
      lang: 'html',
      code: `<table>
  <caption>Orders by status</caption>
  <thead>
    <tr><th scope="col">Status</th><th scope="col">Orders</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Delivered</th><td>23</td></tr>
    <tr><th scope="row">Processing</th><td>3</td></tr>
  </tbody>
</table>`,
      static: true,
    },
    check: {
      question: 'Why use <th> instead of a bold <td> for headers?',
      options: ['<th> is faster to render', 'It marks the cell as a header for assistive technology', 'It is required for colspan', 'There is no difference'],
      answer: 1,
      explanation: '<th> carries meaning: screen readers announce it as the header for the cells it labels.',
    },
  },

  [`${H}/forms-inputs-validation`]: {
    answer: 'A <form> collects input and submits it; each <input> needs a name to be sent, a <label> to be accessible, and a type that sets its keyboard and validation, such as email, tel, date or number. Attributes such as required, minlength and pattern add free browser validation.',
    points: [
      'An input without name is silently left out of the submission.',
      'Placeholder text is not a label.',
      'Use type="text" with inputmode="numeric" for ZIP codes, not type="number".',
    ],
    example: {
      label: 'Labelled inputs with built-in validation',
      lang: 'html',
      code: `<form action="/signup" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required>

  <label for="zip">ZIP code</label>
  <input id="zip" name="zip" inputmode="numeric" pattern="[0-9]{5}" required>

  <button type="submit">Sign up</button>
</form>`,
      static: true,
    },
    check: {
      question: 'An input has no name attribute. What happens on submit?',
      options: ['It is sent with a default name', 'Its value is not submitted', 'The form refuses to submit', 'The browser shows an error'],
      answer: 1,
      explanation: 'Only inputs with a name are included in the submitted data, and nothing warns you when one is missing.',
    },
  },

  [`${H}/forms-advanced`]: {
    answer: '<select> offers a list of <option>s, <textarea> takes multi-line text, radio buttons that share a name allow one choice, checkboxes allow many, and <fieldset> with <legend> groups related controls under a caption.',
    points: [
      'An option\'s value is what is submitted, not its visible text.',
      'A textarea\'s initial text goes between its tags, not in a value attribute.',
      'Screen readers announce the legend for every control in a fieldset.',
    ],
    example: {
      label: 'A grouped radio choice, a select and a textarea',
      lang: 'html',
      code: `<fieldset>
  <legend>Delivery speed</legend>
  <label><input type="radio" name="speed" value="std" checked> Standard</label>
  <label><input type="radio" name="speed" value="exp"> Express</label>
</fieldset>

<label for="state">State</label>
<select id="state" name="state">
  <option value="WA">Washington</option>
  <option value="TX">Texas</option>
</select>

<label for="note">Note</label>
<textarea id="note" name="note">Leave at the door</textarea>`,
      static: true,
    },
    check: {
      question: 'How do you make radio buttons mutually exclusive?',
      options: ['Give them the same id', 'Give them the same name', 'Put them in a <select>', 'Add the exclusive attribute'],
      answer: 1,
      explanation: 'Radio buttons with the same name form one group, so selecting one deselects the others.',
    },
  },

  [`${H}/semantic-html-accessibility-basics`]: {
    answer: 'Semantic HTML uses the element that means what you are building, such as <button>, <nav>, <main> and <label>, so browsers, screen readers and search engines understand the page. ARIA attributes fill gaps only where no native element fits.',
    points: [
      'Landmarks (header, nav, main, aside, footer) let screen-reader users jump between regions.',
      'First rule of ARIA: use a native element before adding role and aria-*.',
      'A <div> with a click handler is not a button: no keyboard, focus or announcement.',
    ],
    example: {
      label: 'Native elements do the accessibility work',
      lang: 'html',
      code: `<!-- Avoid: looks like a button, behaves like nothing -->
<div class="btn" onclick="save()">Save</div>

<!-- Prefer: focusable, works with Enter and Space, announced as a button -->
<button type="button" onclick="save()">Save</button>`,
      static: true,
    },
    check: {
      question: 'What is the first rule of ARIA?',
      options: ['Add role to every element', 'Use a native HTML element with the behaviour you need before reaching for ARIA', 'Always use aria-label', 'Hide decorative content with aria-hidden'],
      answer: 1,
      explanation: 'Native elements come with keyboard handling, focus and semantics. ARIA only describes; it adds no behaviour.',
    },
  },

  [`${H}/html5-apis-overview`]: {
    answer: 'HTML5 added browser features beyond markup: data-* attributes store custom data on elements (read in JavaScript through dataset), contenteditable makes an element editable, and the drag-and-drop API lets users drag elements.',
    points: [
      'data-item-id in HTML is element.dataset.itemId in JavaScript.',
      'Every dataset value is a string; convert numbers and booleans yourself.',
      'data-* attributes are always valid HTML.',
    ],
    example: {
      label: 'Custom data read through dataset',
      lang: 'html',
      code: `<button data-product-id="42" data-in-stock="true">Add to cart</button>

<script>
  const button = document.querySelector("button");
  const id = Number(button.dataset.productId);   // "42" → 42
  const inStock = button.dataset.inStock === "true";
</script>`,
      static: true,
    },
    check: {
      question: 'What does element.dataset.count return for data-count="5"?',
      options: ['The number 5', 'The string "5"', 'undefined', 'true'],
      answer: 1,
      explanation: 'dataset values are always strings. Convert with Number() when you need a number.',
    },
  },

  [`${H}/embedding-content`]: {
    answer: '<iframe> embeds a separate web page, such as a map or video, inside yours; <object> and <embed> embed files such as PDFs. Every embed is outside content, so restrict it: the sandbox attribute removes capabilities and adds back only what you list.',
    points: [
      'Give every iframe a descriptive title for screen readers.',
      'allow-scripts with allow-same-origin can undo the sandbox for same-origin pages.',
      '<object> supports fallback content for viewers that cannot show the file.',
    ],
    example: {
      label: 'A titled, sandboxed iframe',
      lang: 'html',
      code: `<iframe src="https://www.openstreetmap.org/export/embed.html?bbox=-122.35,47.6,-122.32,47.62"
        title="Map of the Seattle store" width="600" height="400"
        loading="lazy" sandbox="allow-scripts"></iframe>`,
      static: true,
    },
    check: {
      question: 'What does an empty sandbox attribute on an iframe do?',
      options: ['Nothing until you list rules', 'Applies every restriction, such as no scripts and no forms', 'Allows everything', 'Hides the iframe'],
      answer: 1,
      explanation: 'sandbox starts from maximum restriction; each allow-* token re-enables one capability.',
    },
  },

  [`${H}/metadata-seo-fundamentals`]: {
    answer: 'The <head> describes the page to browsers, search engines and social apps: <title> and meta description for search results, the viewport meta tag for phones, Open Graph tags for link previews, and link tags for icons.',
    points: [
      '<title> is the strongest on-page SEO signal; the description affects click-through.',
      'Without the viewport meta tag, phones render a shrunken 980px desktop layout.',
      'Never disable pinch-zoom in the viewport tag.',
    ],
    example: {
      label: 'A useful <head>',
      lang: 'html',
      code: `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>INNER JOIN explained | Chaduvuko</title>
  <meta name="description" content="What INNER JOIN returns, with runnable examples.">
  <meta property="og:title" content="INNER JOIN explained">
  <meta property="og:image" content="https://chaduvuko.com/og/inner-join.png">
  <link rel="icon" href="/favicon.ico">
</head>`,
      static: true,
    },
    check: {
      question: 'What does the viewport meta tag fix?',
      options: ['Search ranking', 'Phones rendering a shrunken desktop-width page', 'Slow image loading', 'Broken links'],
      answer: 1,
      explanation: 'width=device-width tells mobile browsers to lay the page out at the real screen width.',
    },
  },

  [`${H}/html-entities-special-characters`]: {
    answer: 'Some characters mean something to the HTML parser, so in text you write them as entities: &lt; for <, &gt; for >, &amp; for &, and &quot; inside double-quoted attributes. Named entities (&copy;, &nbsp;) and numeric ones (&#169;) cover other symbols.',
    points: [
      'An unescaped < can start a tag and swallow the text after it.',
      'Escape a quote that matches the attribute\'s own quote character.',
      '&nbsp; is a space that never breaks a line.',
    ],
    example: {
      label: 'Showing code and symbols safely',
      lang: 'html',
      code: `<p>Use &lt;strong&gt; for importance, not just bold.</p>
<p>Fish &amp; Chips — &copy; 2026 · 10&nbsp;km</p>
<input value="She said &quot;hi&quot;">`,
      static: true,
    },
    check: {
      question: 'How do you display a literal < in HTML text?',
      options: ['\\<', '&lt;', '&less;', '<<'],
      answer: 1,
      explanation: '&lt; is the entity for <, so the parser shows it as text instead of starting a tag.',
    },
  },

  [`${H}/html-best-practices-validation`]: {
    answer: 'Browsers quietly repair invalid HTML, so a page can look right and still be broken for screen readers or another browser. Check markup with the W3C validator (validator.w3.org), and follow the rules it enforces, such as never closing void elements like <img> and <br>.',
    points: [
      '"Renders correctly" does not mean "valid".',
      'Void elements (img, br, hr, input, meta, link) never have closing tags.',
      'The validator reports errors and warnings by line and column.',
    ],
    example: {
      label: 'Common validator errors, fixed',
      lang: 'html',
      code: `<!-- Invalid: <p> cannot contain a <div>, and <img> has no alt -->
<p>Intro <div>Note</div></p>
<img src="chart.png">

<!-- Valid -->
<p>Intro</p>
<div>Note</div>
<img src="chart.png" alt="Revenue by month, rising from January to March">`,
      static: true,
    },
    check: {
      question: 'Which element is a void element with no closing tag?',
      options: ['<p>', '<img>', '<span>', '<section>'],
      answer: 1,
      explanation: '<img> cannot contain content, so it never has a closing tag.',
    },
  },

  [`${H}/building-a-complete-static-page`]: {
    answer: 'Building a full page means planning its sections first, then writing semantic markup for each: a header with navigation, a main area with one <h1> and sections under <h2>s, media with alt text, a form with labels, and a footer, plus complete <head> metadata.',
    points: [
      'Sketch the sections before writing any tags.',
      'One <h1>; each section gets its own <h2>.',
      'Every technique comes from an earlier lesson in this track.',
    ],
    example: {
      label: 'The outline of a complete page',
      lang: 'html',
      code: `<body>
  <header>
    <a href="/">FreshCart</a>
    <nav aria-label="Main"><a href="#menu">Menu</a> <a href="#contact">Contact</a></nav>
  </header>
  <main>
    <h1>Fresh groceries in 2 hours</h1>
    <section id="menu"><h2>This week</h2>…</section>
    <section id="contact"><h2>Contact us</h2><form>…</form></section>
  </main>
  <footer><p>&copy; 2026 FreshCart</p></footer>
</body>`,
      static: true,
    },
    check: {
      question: 'How many <h1> elements should the page have?',
      options: ['One per section', 'Exactly one', 'None; use <h2>', 'As many as needed'],
      answer: 1,
      explanation: 'One <h1> names the page\'s main topic; sections below it use <h2> and <h3>.',
    },
  },

  [`${H}/what-is-css-syntax-selectors-cascade`]: {
    answer: 'CSS styles HTML with rules: a selector picks elements and a declaration block sets properties, as in p { color: navy; }. When rules conflict, the cascade decides by importance, then specificity, then which comes last.',
    points: [
      'Link an external stylesheet with <link rel="stylesheet"> for real projects.',
      'Specificity: inline style > #id > .class, :pseudo-class, [attr] > element.',
      'Some properties, such as color and font, are inherited by children.',
    ],
    example: {
      label: 'Which colour wins?',
      lang: 'css',
      code: `p        { color: gray; }    /* element: lowest specificity */
.note    { color: navy; }    /* class beats element */
#warning { color: crimson; } /* id beats class */

/* <p class="note" id="warning"> is crimson */`,
      static: true,
    },
    check: {
      question: 'p.note and #intro both set color on the same paragraph. Which wins?',
      options: ['p.note, because it has two parts', '#intro, because an id is more specific', 'Whichever comes first', 'Neither; the colours mix'],
      answer: 1,
      explanation: 'One id outweighs any number of classes and elements in specificity.',
    },
  },

  [`${H}/the-box-model`]: {
    answer: 'Every element is a box made of four layers: content, padding, border and margin. By default width sets only the content, so padding and border are added on top; box-sizing: border-box makes width include them.',
    points: [
      'Padding and border show the background; margin is always transparent.',
      'Most projects set * { box-sizing: border-box; } globally.',
      'Vertical margins between blocks can collapse into one.',
    ],
    example: {
      label: 'The same width, two box-sizing rules',
      lang: 'css',
      code: `.card { width: 300px; padding: 20px; border: 2px solid; }

.content-box { box-sizing: content-box; } /* renders 344px wide */
.border-box  { box-sizing: border-box; }  /* renders 300px wide */`,
      static: true,
    },
    check: {
      question: 'width: 200px, padding: 10px, border: 1px, box-sizing: content-box. How wide is the box?',
      options: ['200px', '211px', '222px', '220px'],
      answer: 2,
      explanation: 'content-box adds padding and border on both sides: 200 + 10 + 10 + 1 + 1 = 222px.',
    },
  },

  [`${H}/colors-units-typography`]: {
    answer: 'CSS sizes come in absolute px and relative units: % (of the parent), em (of the font size), rem (of the root font size), vw and vh (of the viewport). Colours can be named, hex, rgb() or hsl(), and fonts are set with a font-family stack ending in a generic family.',
    points: [
      'rem is the safe default for font sizes; em compounds when nested.',
      'vw and vh are fractions of the browser window.',
      'End every font stack with a generic family such as sans-serif.',
    ],
    example: {
      label: 'Relative units and a font stack',
      lang: 'css',
      code: `html { font-size: 100%; }          /* usually 16px */
body {
  font-family: "Inter", system-ui, sans-serif;
  color: hsl(220 15% 20%);
}
h1     { font-size: 2.5rem; }        /* 40px */
.hero  { min-height: 60vh; }         /* 60% of the window height */
.badge { padding: 0.25em 0.5em; }    /* scales with the badge's text */`,
      static: true,
    },
    check: {
      question: 'The root font size is 16px. What is 1.5rem?',
      options: ['15px', '24px', '1.5px', '16px'],
      answer: 1,
      explanation: 'rem multiplies the root font size: 1.5 × 16px = 24px.',
    },
  },

  [`${H}/css-selectors-deep-dive`]: {
    answer: 'Selectors go far beyond tags and classes: combinators (space, >, +, ~) target relationships, pseudo-classes (:hover, :focus, :nth-child()) target states and positions, and pseudo-elements (::before, ::after, ::first-letter) target parts of an element.',
    points: [
      'A space means any descendant; > means direct child only.',
      'Pseudo-classes use one colon; pseudo-elements use two.',
      '::before and ::after render nothing without a content property.',
    ],
    example: {
      label: 'Relationships, states and generated content',
      lang: 'css',
      code: `nav > a          { padding: 8px; }        /* direct child links only */
li:nth-child(odd) { background: #f5f5f5; } /* zebra rows */
a:hover,
a:focus-visible  { text-decoration: underline; }
.required::after { content: " *"; color: crimson; }`,
      static: true,
    },
    check: {
      question: 'Why might a ::before rule show nothing?',
      options: ['::before only works on images', 'It has no content property', 'It needs a single colon', 'It must be inline'],
      answer: 1,
      explanation: 'Generated content needs content, even content: "", before the pseudo-element is created.',
    },
  },

  [`${H}/display-positioning`]: {
    answer: 'display decides how a box flows: block takes the full width, inline flows within text and ignores width and height, inline-block flows inline but accepts sizes. position moves boxes: relative offsets from its normal place, absolute from its positioned ancestor, fixed from the viewport, and sticky until a scroll point.',
    points: [
      'Offsets (top, left, …) and z-index do nothing on position: static.',
      'An absolute box is placed against its nearest positioned ancestor.',
      'sticky needs a threshold such as top: 0.',
    ],
    example: {
      label: 'A badge pinned to a card\'s corner',
      lang: 'css',
      code: `.card  { position: relative; }     /* the reference box */
.badge {
  position: absolute;
  top: 8px;
  right: 8px;
}
.toolbar { position: sticky; top: 0; }`,
      static: true,
    },
    check: {
      question: 'You set top: 20px on an element with no position declared. What happens?',
      options: ['It moves down 20px', 'Nothing; static elements ignore offsets', 'It moves up 20px', 'It becomes fixed'],
      answer: 1,
      explanation: 'The default position is static, which ignores top, right, bottom, left and z-index.',
    },
  },

  [`${H}/backgrounds-borders`]: {
    answer: 'Backgrounds paint behind an element\'s content and padding: a colour, images, or gradients (linear-gradient, radial-gradient), sized with cover or contain. Borders draw the edge, border-radius rounds it, and box-shadow adds outer or inset shadows.',
    points: [
      'background-color shows while the image loads, or if it fails.',
      'cover fills and crops; contain fits the whole image and may leave gaps.',
      'The background shorthand resets every part it does not mention.',
    ],
    example: {
      label: 'A gradient hero with a rounded, shadowed card',
      lang: 'css',
      code: `.hero {
  background: #0b3d2e url("/img/field.jpg") center / cover no-repeat;
}
.card {
  background: linear-gradient(135deg, #e6f9ed, #ffffff);
  border: 1px solid #cfd8dc;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
}`,
      static: true,
    },
    check: {
      question: 'Which background-size shows the whole image without cropping?',
      options: ['cover', 'contain', 'auto', '100% 100%'],
      answer: 1,
      explanation: 'contain scales the image to fit entirely inside the box; cover fills it and crops the overflow.',
    },
  },

  [`${H}/flexbox-complete-guide`]: {
    answer: 'display: flex lays children out along a main axis (a row by default) and a cross axis. justify-content spreads items along the main axis, align-items aligns them on the cross axis, and flex-grow, flex-shrink and flex-basis decide how each item takes or gives up space.',
    points: [
      'flex-direction: column swaps which way the main axis runs.',
      'align-content only matters when items wrap onto several lines.',
      'flex-grow shares leftover space as a ratio between items.',
    ],
    example: {
      label: 'A toolbar: logo left, actions right',
      lang: 'css',
      code: `.toolbar {
  display: flex;
  justify-content: space-between;  /* main axis */
  align-items: center;             /* cross axis */
  gap: 12px;
}
.search { flex: 1; }               /* takes all leftover space */`,
      static: true,
    },
    check: {
      question: 'With flex-direction: column, what does justify-content control?',
      options: ['Horizontal placement', 'Vertical placement', 'Text alignment', 'Nothing'],
      answer: 1,
      explanation: 'justify-content always works on the main axis, which runs vertically in a column.',
    },
  },

  [`${H}/flexbox-in-practice`]: {
    answer: 'Most everyday layouts are a few Flexbox patterns: centring something in a box, a navbar with groups pushed apart, rows of equal-height cards, and a footer that stays at the bottom of short pages, with gap handling the spacing.',
    points: [
      'gap adds space only between items, not at the edges.',
      'Centring needs the parent to have a height to centre within.',
      'Sticky footer: a column flex body with flex: 1 on <main>.',
    ],
    example: {
      label: 'Centre a box, and keep the footer down',
      lang: 'css',
      code: `.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

body { display: flex; flex-direction: column; min-height: 100vh; }
main { flex: 1; }   /* pushes the footer to the bottom */`,
      static: true,
    },
    check: {
      question: 'Your flex centring does not centre vertically. What is the likely cause?',
      options: ['gap is missing', 'The parent has no height beyond its content', 'flex-wrap is off', 'The child is inline'],
      answer: 1,
      explanation: 'align-items centres within the parent\'s height. If the parent is only as tall as its content, there is nothing to centre in.',
    },
  },

  [`${H}/css-grid-complete-guide`]: {
    answer: 'CSS Grid lays out rows and columns at the same time. Define tracks with grid-template-columns and grid-template-rows, size them with fr units, minmax() and repeat(), and place items by line numbers or named areas.',
    points: [
      'fr shares the space left after fixed tracks and gaps.',
      'repeat(auto-fill, minmax(200px, 1fr)) makes a responsive grid with no media queries.',
      'Items can span tracks: grid-column: 1 / 3.',
    ],
    example: {
      label: 'A responsive card grid with no media queries',
      lang: 'css',
      code: `.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
.cards .featured { grid-column: span 2; }`,
      static: true,
    },
    check: {
      question: 'grid-template-columns: 200px 1fr 1fr in a 600px-wide grid with no gap. How wide is each 1fr column?',
      options: ['200px', '300px', '133px', '400px'],
      answer: 0,
      explanation: '600 − 200 = 400px is left, shared equally by the two fr columns: 200px each.',
    },
  },

  [`${H}/css-grid-in-practice`]: {
    answer: 'grid-template-areas lets you draw a layout as named regions, such as header, sidebar, content and footer, and assign elements to them. A media query can redraw the areas to rebuild the page for another screen size without touching the HTML.',
    points: [
      'Sketch the regions first; the CSS then reads like the wireframe.',
      'A holy-grail page needs min-height: 100vh and a 1fr middle row.',
      'Image galleries use auto-fill tracks and span for featured items.',
    ],
    example: {
      label: 'A page shell drawn with named areas',
      lang: 'css',
      code: `.page {
  display: grid;
  min-height: 100vh;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header"
    "sidebar content"
    "footer  footer";
}
header { grid-area: header; }
aside  { grid-area: sidebar; }
main   { grid-area: content; }
footer { grid-area: footer; }`,
      static: true,
    },
    check: {
      question: 'How do you move the sidebar below the content on phones?',
      options: ['Reorder the HTML', 'Redefine grid-template-areas inside a media query', 'Use position: absolute', 'Switch to tables'],
      answer: 1,
      explanation: 'Redrawing the areas in a media query rearranges the layout without changing the markup.',
    },
  },

  [`${H}/flexbox-vs-grid`]: {
    answer: 'Use Flexbox for one-dimensional layouts, where items sit in a single row or column and size to their content (navbars, toolbars, button groups). Use Grid for two-dimensional layouts that must line up in rows and columns at once (page shells, card grids, dashboards). Most pages use both.',
    points: [
      'Ask: does alignment need to hold across rows and columns? Then Grid.',
      'Flexbox lets content decide sizes; Grid lets the container decide.',
      'A Grid layout often contains Flexbox components inside its cells.',
    ],
    example: {
      label: 'Grid for the page, Flexbox for the nav row',
      lang: 'css',
      code: `.layout { display: grid; grid-template-columns: 240px 1fr; }
.nav    { display: flex; align-items: center; gap: 16px; }`,
      static: true,
    },
    check: {
      question: 'Which fits a row of buttons that should size to their labels?',
      options: ['Grid', 'Flexbox', 'Tables', 'Floats'],
      answer: 1,
      explanation: 'A single row of content-sized items is a one-dimensional problem, which Flexbox handles naturally.',
    },
  },

  [`${H}/responsive-design-media-queries`]: {
    answer: 'A media query applies CSS only when a condition is true, usually the viewport width: @media (min-width: 768px) { … }. Responsive design uses them to adapt one layout to every screen size.',
    points: [
      'min-width queries build up from mobile; max-width queries cut down from desktop. Pick one.',
      'Choose breakpoints where your content breaks, not from a list.',
      'Test at real device widths, including 320px.',
    ],
    example: {
      label: 'One column on phones, three from 900px',
      lang: 'css',
      code: `.products { display: grid; gap: 16px; }

@media (min-width: 600px) {
  .products { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 900px) {
  .products { grid-template-columns: repeat(3, 1fr); }
}`,
      static: true,
    },
    check: {
      question: 'When does @media (min-width: 768px) apply?',
      options: ['Below 768px', 'At 768px and wider', 'Only at exactly 768px', 'On print only'],
      answer: 1,
      explanation: 'min-width means "at least this wide", so it applies from 768px up.',
    },
  },

  [`${H}/mobile-first-design`]: {
    answer: 'Mobile-first means writing the base CSS for the smallest screen, then adding min-width media queries that enhance the layout as space grows. You only ever add rules; you rarely have to undo desktop rules for phones.',
    points: [
      'Base styles have no media query and target phones.',
      'The viewport meta tag is required for phones to report their real width.',
      'Desktop-first CSS piles up overrides that only cancel earlier rules.',
    ],
    example: {
      label: 'Base styles for phones, enhanced for larger screens',
      lang: 'css',
      code: `.nav-links { display: none; }          /* phones: menu button instead */
.menu-button { display: block; }

@media (min-width: 768px) {
  .nav-links { display: flex; gap: 16px; }
  .menu-button { display: none; }
}`,
      static: true,
    },
    check: {
      question: 'Which media feature does mobile-first CSS mainly use?',
      options: ['max-width', 'min-width', 'orientation', 'hover'],
      answer: 1,
      explanation: 'Mobile-first starts small and adds styles as the viewport gets wider, which is min-width.',
    },
  },

  [`${H}/css-custom-properties`]: {
    answer: 'Custom properties are CSS variables: declare --name: value; on a selector (often :root) and read it with var(--name). They follow the cascade and inheritance, so a component or a dark theme can override them, and they can change at runtime.',
    points: [
      'Declare global design tokens on :root.',
      'var(--x, fallback) uses the fallback only when --x is not declared.',
      'Changing a variable on a parent restyles everything that reads it.',
    ],
    example: {
      label: 'Design tokens with a dark-theme override',
      lang: 'css',
      code: `:root {
  --bg: #ffffff;
  --text: #1a1a1a;
  --space: 16px;
}
[data-theme="dark"] {
  --bg: #0f1115;
  --text: #e8e8e8;
}
body { background: var(--bg); color: var(--text); padding: var(--space); }`,
      static: true,
    },
    check: {
      question: 'When does the fallback in var(--gap, 8px) apply?',
      options: ['When --gap is 0', 'When --gap is not declared', 'Always on mobile', 'When --gap is an empty string'],
      answer: 1,
      explanation: 'The fallback is used only when the custom property is undeclared in that scope.',
    },
  },

  [`${H}/css-transitions`]: {
    answer: 'A transition animates a property smoothly when its value changes, for example on hover. Set which property, how long, the timing curve and an optional delay; transform and opacity are the cheapest properties to animate.',
    points: [
      'Put transition on the base rule so it runs both ways.',
      'ease-out suits things entering; ease-in suits things leaving.',
      'Animating width, height or top forces layout work; prefer transform.',
    ],
    example: {
      label: 'A smooth hover lift',
      lang: 'css',
      code: `.card {
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgb(0 0 0 / 0.15);
}`,
      static: true,
    },
    check: {
      question: 'Where should the transition property go so the effect also plays when the mouse leaves?',
      options: ['On :hover only', 'On the base selector', 'On :active', 'On the parent'],
      answer: 1,
      explanation: 'A transition on the base rule applies to every change of the property, in both directions.',
    },
  },

  [`${H}/css-animations-keyframes`]: {
    answer: '@keyframes defines the steps of an animation and the animation property runs it, with a duration, timing, repeat count, direction and fill mode. Unlike transitions, animations need no trigger and can have many steps and loop forever.',
    points: [
      'Use percentages (0%, 50%, 100%) or from and to for keyframes.',
      'animation-fill-mode: forwards keeps the final frame after the animation ends.',
      'Respect prefers-reduced-motion for users who turn motion off.',
    ],
    example: {
      label: 'A pulsing loader that honours reduced motion',
      lang: 'css',
      code: `@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.4; }
}
.loader { animation: pulse 1.2s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .loader { animation: none; }
}`,
      static: true,
    },
    check: {
      question: 'An element snaps back to its start state when its animation ends. Which fixes it?',
      options: ['animation-iteration-count: 1', 'animation-fill-mode: forwards', 'animation-direction: reverse', 'transition: all'],
      answer: 1,
      explanation: 'forwards keeps the styles of the last keyframe after the animation finishes.',
    },
  },

  [`${H}/css-transforms`]: {
    answer: 'transform moves, rotates, scales and skews an element visually, with translate(), rotate(), scale() and skew(), plus 3D variants with perspective. It never affects the layout of other elements, which also makes it cheap to animate.',
    points: [
      'translate() percentages are relative to the element\'s own size.',
      'transform-origin sets the pivot for rotate and scale.',
      'Several transforms apply right to left, so order matters.',
    ],
    example: {
      label: 'Centre with translate, and flip a card in 3D',
      lang: 'css',
      code: `.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.card       { transition: transform 400ms; transform-style: preserve-3d; }
.card:hover { transform: perspective(800px) rotateY(180deg); }`,
      static: true,
    },
    check: {
      question: 'What is translateX(50%) relative to?',
      options: ['The parent\'s width', 'The element\'s own width', 'The viewport width', 'The font size'],
      answer: 1,
      explanation: 'translate percentages use the element\'s own dimensions, which is why translate(-50%, -50%) centres it.',
    },
  },

  [`${H}/modern-css-selectors`]: {
    answer: ':has() selects an element by what it contains, so CSS finally has a parent selector. :is() and :where() group selectors (they differ only in specificity), and container queries style a component by the size of its container instead of the viewport.',
    points: [
      ':where() always has zero specificity; :is() takes its most specific argument.',
      'Use :where() for base styles that should be easy to override.',
      'Container queries need container-type on the parent.',
    ],
    example: {
      label: 'Style a field by its input\'s state, and a card by its container',
      lang: 'css',
      code: `.field:has(input:invalid) label { color: crimson; }

:where(ul, ol) { margin: 0; padding-left: 1.25rem; }

.sidebar { container-type: inline-size; }
@container (min-width: 400px) {
  .card { display: grid; grid-template-columns: 120px 1fr; }
}`,
      static: true,
    },
    check: {
      question: 'What specificity does :where(.a, #b) have?',
      options: ['That of #b', 'That of .a', 'Zero', 'The sum of both'],
      answer: 2,
      explanation: ':where() always contributes zero specificity, whatever its arguments.',
    },
  },

  [`${H}/css-architecture-naming`]: {
    answer: 'CSS architecture keeps stylesheets maintainable as they grow. BEM is the most common naming system: a Block (.card), its Elements (.card__title) and Modifiers (.card--featured), each targeted with a single flat class.',
    points: [
      'Elements join with __; modifiers join with --.',
      'Flat single-class selectors keep specificity low and even.',
      'The class name carries the context that nested selectors used to.',
    ],
    example: {
      label: 'A BEM component',
      lang: 'css',
      code: `.card { padding: 16px; border-radius: 12px; }
.card__title { font-weight: 700; }
.card__price { color: #0a8c3e; }
.card--featured { border: 2px solid #0a8c3e; }

/* <article class="card card--featured">
     <h3 class="card__title">…</h3>
   </article> */`,
      static: true,
    },
    check: {
      question: 'In BEM, what does .menu__item--active describe?',
      options: ['A block named item', 'The item element of the menu block, in its active variant', 'An active menu block', 'A nested selector'],
      answer: 1,
      explanation: 'Block menu, element item (after __), modifier active (after --).',
    },
  },

  [`${H}/intro-to-sass`]: {
    answer: 'Sass is a CSS preprocessor: you write .scss with variables ($name), nesting, mixins and partials, and it compiles to plain CSS at build time. Browsers only ever see the compiled CSS.',
    points: [
      'Sass $variables are fixed at build time; CSS custom properties change at runtime.',
      'Keep nesting to two or three levels, or selectors grow too specific.',
      'Mixins reuse groups of declarations, optionally with arguments.',
    ],
    example: {
      label: 'Variables, nesting and a mixin',
      lang: 'css',
      code: `$brand: #0a8c3e;

@mixin card($pad: 16px) {
  padding: $pad;
  border-radius: 12px;
}

.product {
  @include card(20px);
  &__price { color: $brand; }
  &:hover  { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
}`,
      static: true,
    },
    check: {
      question: 'Can a Sass $variable change in the browser, for a dark mode toggle?',
      options: ['Yes, with JavaScript', 'No, it is replaced with its value at build time', 'Only inside media queries', 'Only in Chrome'],
      answer: 1,
      explanation: 'Sass variables do not exist in the output CSS. Use custom properties for values that change at runtime.',
    },
  },

  [`${H}/responsive-images-performance`]: {
    answer: 'srcset and sizes let the browser choose the right file size of the same image for each screen; <picture> with <source> swaps in different crops or formats (such as AVIF or WebP). Together with lazy loading and fixed dimensions, they keep pages fast.',
    points: [
      'srcset with w descriptors needs sizes, or the browser assumes 100vw.',
      'Use <picture> for different crops (art direction) or formats.',
      'Set width and height to prevent layout shift.',
    ],
    example: {
      label: 'Resolution switching plus a modern format',
      lang: 'html',
      code: `<picture>
  <source type="image/avif" srcset="/hero-800.avif 800w, /hero-1600.avif 1600w"
          sizes="(min-width: 900px) 50vw, 100vw">
  <img src="/hero-800.jpg" srcset="/hero-800.jpg 800w, /hero-1600.jpg 1600w"
       sizes="(min-width: 900px) 50vw, 100vw"
       width="1600" height="900" alt="Fresh produce on a market stall">
</picture>`,
      static: true,
    },
    check: {
      question: 'What does the browser assume when srcset uses w descriptors but sizes is missing?',
      options: ['50vw', '100vw', 'The smallest file', 'The image\'s natural width'],
      answer: 1,
      explanation: 'Without sizes the browser assumes the image fills the viewport and often downloads a larger file than needed.',
    },
  },

  [`${H}/css-accessibility-best-practices`]: {
    answer: 'Accessible CSS keeps the page usable for everyone: visible focus indicators for keyboard users, enough colour contrast (4.5:1 for normal text under WCAG AA), honouring prefers-reduced-motion, and never conveying meaning with colour alone.',
    points: [
      'Never remove outlines without a visible replacement.',
      ':focus-visible shows focus for keyboard users without flashing on mouse clicks.',
      'Check contrast with a tool, not by eye.',
    ],
    example: {
      label: 'A keyboard focus ring and reduced motion',
      lang: 'css',
      code: `button:focus { outline: none; }
button:focus-visible {
  outline: 3px solid #1a73e8;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}`,
      static: true,
    },
    check: {
      question: 'What contrast ratio does WCAG AA require for normal-size body text?',
      options: ['2:1', '3:1', '4.5:1', '7:1'],
      answer: 2,
      explanation: 'AA requires 4.5:1 for normal text; 3:1 applies to large text and UI components.',
    },
  },

  [`${H}/cross-browser-compatibility-debugging`]: {
    answer: 'Browsers use different engines (Blink in Chrome and Edge, WebKit in Safari, Gecko in Firefox) that ship features at different times. Autoprefixer adds any vendor prefixes your target browsers need, @supports provides fallbacks for missing features, and DevTools helps find the difference.',
    points: [
      'Do not hand-write vendor prefixes; let Autoprefixer and browserslist do it.',
      '@supports tests whether a feature works before you use it.',
      'Test in Safari: it is the engine most often behind.',
    ],
    example: {
      label: 'A fallback, then the modern feature where supported',
      lang: 'css',
      code: `.gallery { display: flex; flex-wrap: wrap; gap: 12px; }

@supports (grid-template-rows: masonry) {
  .gallery { display: grid; grid-template-rows: masonry; }
}`,
      static: true,
    },
    check: {
      question: 'Which engine powers Safari?',
      options: ['Blink', 'Gecko', 'WebKit', 'Trident'],
      answer: 2,
      explanation: 'Safari uses WebKit; Chrome and Edge use Blink; Firefox uses Gecko.',
    },
  },

  [`${H}/building-a-responsive-website`]: {
    answer: 'The capstone builds a complete responsive site: semantic HTML landmarks first, mobile-first CSS with custom-property design tokens, Grid for the page and card layouts, Flexbox for rows such as the navigation, and min-width media queries to enhance larger screens.',
    points: [
      'Plan the landmarks and sections before writing CSS.',
      'Use each layout tool for what it suits.',
      'Test at 320px, a tablet width and desktop.',
    ],
    example: {
      label: 'The layout skeleton of the capstone',
      lang: 'css',
      code: `:root { --space: 16px; --max: 1100px; }
.container { max-width: var(--max); margin: 0 auto; padding: 0 var(--space); }
.site-nav  { display: flex; justify-content: space-between; align-items: center; }
.projects  { display: grid; gap: var(--space); }

@media (min-width: 768px) {
  .projects { grid-template-columns: repeat(2, 1fr); }
}`,
      static: true,
    },
    check: {
      question: 'Which tool suits the site\'s horizontal navigation row?',
      options: ['Grid with named areas', 'Flexbox', 'A table', 'Absolute positioning'],
      answer: 1,
      explanation: 'A row of links is one-dimensional, which is what Flexbox is built for.',
    },
  },

  [`${H}/css-best-practices-common-mistakes`]: {
    answer: 'Maintainable CSS uses one naming convention everywhere, a spacing and colour scale held in custom properties instead of magic numbers, flat low-specificity selectors, and no !important arms races. Most beginner bugs come from specificity, the box model and fixed heights.',
    points: [
      'Consistency matters more than which naming system you pick.',
      'Replace one-off pixel values with a shared scale.',
      'Each !important makes the next override harder.',
    ],
    example: {
      label: 'A spacing scale instead of magic numbers',
      lang: 'css',
      code: `:root { --space-1: 4px; --space-2: 8px; --space-3: 16px; --space-4: 24px; }

/* Avoid */
.card { margin-top: 13px; padding: 17px 9px; }

/* Prefer */
.card { margin-top: var(--space-3); padding: var(--space-3) var(--space-2); }`,
      static: true,
    },
    check: {
      question: 'What usually makes CSS specificity problems worse?',
      options: ['Using one class per style', 'Adding !important to win a conflict', 'Using custom properties', 'Using BEM'],
      answer: 1,
      explanation: '!important wins today but forces the next change to escalate further. Flat, single-class selectors avoid the fight.',
    },
  },

  [`${H}/html-css-interview-prep`]: {
    answer: 'Front-end interviews return to a few fundamentals: semantic HTML, the box model, specificity and the cascade, Flexbox versus Grid, centring, responsive design, stacking contexts and accessibility. Explaining why a solution works matters as much as the code.',
    points: [
      'Know three ways to centre an element and when each fits.',
      'Explain specificity order and how box-sizing changes widths.',
      'Talk through accessibility: semantics, focus and contrast.',
    ],
    example: {
      label: 'Centring, three ways',
      lang: 'css',
      code: `/* Flexbox */
.a { display: flex; justify-content: center; align-items: center; }
/* Grid */
.b { display: grid; place-items: center; }
/* Positioning */
.c > .child { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }`,
      static: true,
    },
    check: {
      question: 'What does place-items: center do in a grid container?',
      options: ['Centres the grid on the page', 'Centres each item in its cell on both axes', 'Centres text only', 'Nothing without justify-content'],
      answer: 1,
      explanation: 'place-items is shorthand for align-items and justify-items, centring each item within its grid area.',
    },
  },
}
