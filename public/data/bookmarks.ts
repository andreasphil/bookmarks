import { BookmarkCollection } from "./types";

export const bookmarks: BookmarkCollection[] = [
  {
    title: "Development",
    icon: "🧑‍💻",
    collections: [
      {
        title: "Hosting & cloud",
        items: [
          {
            title: "Cloudflare Pages",
            url: "https://pages.cloudflare.com",
            description:
              "JAMstack platform for frontend developers to collaborate and deploy websites",
          },
          {
            title: "Cloudflare Workers",
            url: "https://workers.cloudflare.com",
            description:
              "Deploy serverless code instantly across the globe to give it exceptional performance, reliability, and scale",
          },
          {
            title: "Deta",
            url: "https://deta.space",
            description: "Where web apps are yours",
          },
          {
            title: "Fauna",
            url: "https://fauna.com",
            description:
              "Flexible, developer-friendly, transactional database delivered as a secure and scalable cloud API with native GraphQL",
          },
          {
            title: "Firebase",
            url: "https://firebase.google.com",
            description: "Build and run successful apps",
          },
          {
            title: "Fly.io",
            url: "https://fly.io",
            description:
              "Run your full stack apps (and databases!) all over the world",
          },
          {
            title: "GitHub",
            url: "https://github.com",
            icon: "🐱",
            description: "Where the world builds software",
          },
          {
            title: "Hover",
            url: "https://hover.com",
            description:
              "Making it easy to find and register the perfect domain and providing you with the tools you need to manage your domains, email and DNS with ease",
          },
          {
            title: "Magic",
            url: "https://magic.link",
            description:
              "Secure, extensible passwordless authentication that’s built to scale",
          },
          {
            title: "Netlify",
            url: "https://app.netlify.com",
            description:
              "An intuitive Git-based workflow and powerful serverless platform to build, deploy, and collaborate on web apps",
          },
          {
            title: "Supabase",
            url: "https://supabase.io",
            description: "The open source Firebase alternative",
          },
          {
            title: "Vercel",
            url: "https://vercel.com",
            description:
              "The best developer experience with an obsessive focus on end-user performance",
          },
        ],
      },
      {
        title: "Tools",
        items: [
          {
            title: "Better Placeholder",
            url: "https://betterplaceholder.com",
            description: "Placeholdit's missing UI",
          },
          {
            title: "Box Shadows",
            url: "https://box-shadow.dev",
            icon: "🌚",
            description: "Web app to help you create awesome box shadows",
          },
          {
            title: "Bundlephobia",
            url: "https://bundlephobia.com",
            description: "Find the cost of adding a npm package to your bundle",
          },
          {
            title: "Can I Use ...?",
            url: "https://caniuse.com",
            description: "Browser support tables for modern web technologies",
          },
          {
            title: "Carbon",
            url: "https://carbon.now.sh",
            description:
              "Create and share beautiful images of your source code",
          },
          {
            title: "Easy Colour",
            url: "https://easycolour.app",
            icon: "🎨",
            description:
              "Colour conversion and variation tool built to be as flexible as possible with the inputted colour",
          },
          {
            title: "Google Fonts",
            url: "https://google.com/fonts",
            icon: "✍️",
            description:
              "Making the web more beautiful, fast, and open through great typography and iconography",
          },
          {
            title: "Hound",
            url: "https://houndci.com",
            description: "Automated code review for GitHub pull requests",
          },
          {
            title: "JavaScript Event KeyCodes",
            url: "http://keycode.info",
            icon: "⌨️",
            description: "Press any key to get the JavaScript event keycode",
          },
          {
            title: "JSFiddle",
            url: "https://jsfiddle.net",
            description: "Your humble code playground",
          },
          {
            title: "Lighthouse Report Viewer",
            url: "https://googlechrome.github.io/lighthouse/viewer",
            icon: "🚨",
            description:
              "Automated auditing, performance metrics, and best practices for the web",
          },
          {
            title: "npm",
            url: "https://npmjs.com",
            description: "Build amazing things",
          },
          {
            title: "Omatsuri",
            url: "https://omatsuri.app",
            description: "Open source browser tools for everyday use",
          },
          {
            title: "Open Source Insights",
            url: "https://deps.dev",
            description: "Understand your dependencies",
          },
          {
            title: "Paste to Markdown",
            url: "https://euangoddard.github.io/clipboard2markdown",
            description: "Convert rich-text on your clipbaord to markdown",
          },
          {
            title: "PostCSS.parts",
            url: "https://www.postcss.parts",
            description: "A searchable catalog of PostCSS plugins",
          },
          {
            title: "Ray.so",
            url: "https://ray.so",
            description: "Create beautiful images of your code",
          },
          {
            title: "readme.so",
            url: "https://readme.so",
            description:
              "Quickly add and customize all the sections you need for your project's readme",
          },
          {
            title: "Regex 101",
            url: "https://regex101.com",
            description:
              "Regular expression tester with syntax highlighting, explanation, cheat sheet for PHP/PCRE, Python, GO, JavaScript, Java",
          },
          {
            title: "Skypack",
            url: "https://skypack.dev",
            description:
              "Load optimized npm packages with no install and no build tools",
          },
          {
            title: "Snyk Open Source Advisor",
            url: "https://snyk.io/advisor",
            description:
              "Search and compare over 1 million open source packages",
          },
          {
            title: "Stargaze",
            url: "https://stargaze.andreasphil.com",
            description:
              "A faster way of browsing and searching your starred repositories on GitHub",
          },
          {
            title: "Tiny Helpers",
            url: "https://tiny-helpers.dev",
            description:
              "A collection of free single-purpose online tools for web developers",
          },
          {
            title: "UNPKG",
            url: "https://unpkg.com",
            description:
              "A fast, global content delivery network for everything on npm",
          },
          {
            title: "W3C Markup Validation Service",
            url: "http://validator.w3.org",
            description: "Check the markup (HTML, XHTML, …) of Web documents",
          },
          {
            title: "Web.dev Measure",
            url: "https://web.dev/measure",
            description:
              "See how well your website performs. Then, get tips to improve your user experience.",
          },
        ],
      },
      {
        title: "Cheatsheets, guides, specs & docs",
        items: [
          {
            title:
              "`export default thing` is different to `export { thing as default }`",
            url: "https://jakearchibald.com/2021/export-default-thing-vs-thing-as-default",
          },
          {
            title: "A complete guide to custom properties",
            url: "https://css-tricks.com/a-complete-guide-to-custom-properties",
            description:
              "Everything important and useful to know about CSS Custom Properties",
          },
          {
            title: "A complete guide to grid",
            url: "https://css-tricks.com/snippets/css/complete-guide-grid",
            description:
              "Comprehensive guide to CSS grid, focusing on all the settings both for the grid parent container and the grid child elements",
          },
          {
            title: "Head",
            url: "https://htmlhead.dev",
            description: "A simple guide to HTML <head> elements",
          },
          {
            title: "Accessible Rich Internet Applications (WAI-ARIA) 1.1",
            url: "https://w3.org/TR/wai-aria-1.1",
            description: "W3C Recommendation",
          },
          {
            title: "All CSS specifications",
            url: "https://w3.org/Style/CSS/specs.en.html",
            description:
              "Descriptions of all specifications that the CSS WG is working on",
          },
          {
            title: "An introduction to shaders",
            url: "https://frontend.horse/articles/intro-to-shaders",
            icon: "🐴",
            description:
              "Main shader concepts and serves as a gentle introduction to the wide world of shaders",
          },
          {
            title: "basecs",
            url: "https://medium.com/basecs",
            description: "Exploring the basics of computer science",
          },
          {
            title: "baseds",
            url: "https://medium.com/baseds",
            description: "Exploring the basics of distributed systems",
          },
          {
            title: "Conventional Commits",
            url: "https://conventionalcommits.org",
            icon: "🔀",
            description:
              "A specification for adding human and machine readable meaning to commit messages",
          },
          {
            title: "Deep JavaScript",
            url: "https://exploringjs.com/deep-js/toc.html",
            icon: "🤿",
            description:
              "Teaches practical techniques for using the language better",
          },
          {
            title: "Devhints",
            url: "https://devhints.io",
            description: "A modest collection of cheatsheets",
          },
          {
            title: "Does it mutate?",
            url: "https://doesitmutate.xyz",
            description:
              "List of array methods and whether they mutate the array",
          },
          {
            title: "ECMAScript 6 compatibility table",
            url: "http://kangax.github.io/compat-table/es6",
            description: "ECMAScript 5/6/7 compatibility tables",
          },
          {
            title: "Effective Go",
            url: "https://golang.org/doc/effective_go",
            description: "Tips for writing clear, idiomatic Go code",
          },
          {
            title: "Eloquent JavaScript",
            url: "https://eloquentjavascript.net",
            description:
              "A book about JavaScript, programming, and the wonders of the digital",
          },
          {
            title: "Essential Go",
            url: "https://essential-go.programming-books.io",
            description:
              "Clear and concise explanation of topics for both beginner and advanced programmers",
          },
          {
            title: "Flex visual cheatsheet",
            url: "http://flexbox.malven.co",
            description:
              "Learn all about the properties available in flexbox through simple visual examples",
          },
          {
            title: "Git Documentation",
            url: "https://git-scm.com/doc",
          },
          {
            title: "Grid visual cheatsheet",
            url: "http://grid.malven.co",
            description:
              "Learn all about the properties available in CSS Grid Layout through simple visual examples",
          },
          {
            title: "How to cancel pending API requests to show correct data",
            url: "https://css-tricks.com/how-to-cancel-pending-api-requests-to-show-correct-data",
          },
          {
            title: "How to write fast, memory-efficient JavaScript",
            url: "https://smashingmagazine.com/2012/11/writing-fast-memory-efficient-javascript",
            icon: "💨",
          },
          {
            title: "HTML Standard",
            url: "https://html.spec.whatwg.org/multipage",
            description: "Living standard",
            icon: "🌎",
          },
          {
            title: "Inclusive Components",
            url: "https://inclusive-components.design",
            description: "A blog trying to be a pattern library",
          },
          {
            title: "Keep a Changelog",
            url: "https://keepachangelog.com/en/1.0.0",
            description: "Don’t let your friends dump git logs into changelogs",
          },
          {
            title: "Links on typography",
            url: "https://css-tricks.com/links-on-typography-2",
          },
          {
            title: "Loading performance",
            url: "https://developers.google.com/web/fundamentals/performance/get-started",
          },
          {
            title: "Mozilla Developer Network",
            url: "https://developer.mozilla.org/en-US",
            description: "Resources for developers, by developers",
          },
          {
            title: "Rendering performance",
            url: "https://developers.google.com/web/fundamentals/performance/rendering",
          },
          {
            title: "Solid Start",
            url: "https://solidstart.info",
            description:
              "Four ways you can improve your creation for everybody",
          },
          {
            title: "System things",
            url: "https://css-tricks.com/system-things",
          },
          {
            title: "The rules of margin collapse",
            url: "https://joshwcomeau.com/css/rules-of-margin-collapse",
          },
          {
            title: "The State of CSS survey",
            url: "https://stateofcss.com",
          },
          {
            title: "The State of JavaScript survey",
            url: "https://stateofjs.com",
          },
          {
            title: "The state of web workers",
            url: "https://smashingmagazine.com/2021/06/web-workers-2021",
            icon: "👷",
          },
          {
            title: "TypeScript",
            url: "https://www.typescriptlang.org",
            description: "Typed JavaScript at any scale",
            icon: "🐡",
          },
          {
            title: "W3Schools",
            url: "https://w3schools.com",
            description:
              "A school for web developers, covering all the aspects of web development",
          },
          {
            title: "Web fundamentals",
            url: "https://developers.google.com/web/fundamentals",
            description:
              "Google's opinionated reference for building amazing web experiences",
          },
        ],
      },
    ],
  },
  {
    title: "Design",
    icon: "🧑‍🎨",
    collections: [
      {
        title: "Tools",
        items: [
          {
            title: "Blobmaker",
            url: "https://www.blobmaker.app",
            description:
              "Quickly create random, unique, and organic-looking SVG shapes",
          },
          {
            title: "Color Hunt",
            url: "http://colorhunt.co",
            description: "Color palettes for designers and artists",
          },
          {
            title: "ContrastRatio",
            url: "http://contrast-ratio.com",
            icon: "🌓",
            description:
              "A tool to calculate the contrast ratio between any two valid CSS colors",
          },
          {
            title: "Coolors.co",
            url: "https://coolors.co",
            description: "The super fast color schemes generator",
          },
          {
            title: "Deep learning color generator",
            url: "https://colors.eva.design",
          },
          {
            title: "Devices by Facebook Design",
            url: "https://facebook.design/devices",
            description: "Images and Sketch files of popular devices",
          },
          {
            title: "Favicon.io",
            url: "https://favicon.io",
            description:
              "The only favicon generator you need for your next project",
          },
          {
            title: "Figma",
            url: "https://figma.com",
            description:
              "Connects everyone in the design process so teams can deliver better products, faster",
          },
          {
            title: "Haikei",
            url: "https://app.haikei.app",
            icon: "⚫️",
            description: "Generate unique SVG shapes, backgrounds, and pattern",
          },
          {
            title: "Photopea",
            url: "https://photopea.com",
            description: "Advanced image editor",
          },
          {
            title: "Picular",
            url: "https://picular.co",
            description: "The color of anything",
          },
          {
            title: "Shape Divider App",
            url: "https://shapedivider.app",
            description:
              "Make it easier for designers and developers to export a beautiful SVG shape divider",
          },
        ],
      },
      {
        title: "Resources",
        items: [
          {
            title: "Akar Icons",
            url: "https://akaricons.com",
            description:
              "Perfectly rounded icon library made for designers and developers",
          },
          {
            title: "Contra",
            url: "https://contrauikit.com",
            description: "Open source wireframe kit",
          },
          {
            title: "DrawKit",
            url: "https://drawkit.io",
            description: "Hand-drawn vector illustration and icon resources",
          },
          {
            title: "Dribbble",
            url: "https://dribbble.com",
            description: "Find & showcase creative work",
          },
          {
            title: "Feather",
            url: "https://feathericons.com",
            description: "Simply beautiful open source icons",
          },
          {
            title: "Get Waves",
            url: "https://getwaves.io",
          },
          {
            title: "Hero Patterns",
            url: "http://heropatterns.com",
            icon: "🦸",
            description: "A collection of repeatable SVG background patterns",
          },
          {
            title: "Heroicons",
            url: "https://heroicons.com",
            description: "Beautiful hand-crafted SVG icons",
          },
          {
            title: "Iconic",
            url: "https://iconic.app",
            description: 'Free, "do wtf you want with" pixel-perfect icons',
          },
          {
            title: "illlustrations",
            url: "https://illlustrations.co",
            description: "Open source illustrations kit",
          },
          {
            title: "Ionicons",
            url: "https://ionic.io/ionicons",
            description:
              "Premium designed icons for use in web, iOS, Android, and desktop apps",
          },
          {
            title: "Ira Design",
            url: "https://iradesign.io",
            description: "Build your own amazing illustrations",
            icon: "🦎",
          },
          {
            title: "Old Book Illustrations",
            url: "https://oldbookillustrations.com",
          },
          {
            title: "Phosphor Icons",
            url: "https://phosphoricons.com",
            icon: "🧪",
            description:
              "A flexible icon family for interfaces, diagrams, presentations — whatever, really",
          },
          {
            title: "Simple Icons",
            url: "https://simpleicons.org",
            description: "Free SVG icons for popular brands",
          },
          {
            title: "Skribbl",
            url: "https://weareskribbl.com",
            description:
              "A growing collection of freely-usable, hand-drawn illustrations",
          },
          {
            title: "SVG Repo",
            url: "https://svgrepo.com",
            description:
              "Explore, search and find the best fitting icons or vectors for your projects",
          },
          {
            title: "uiprint",
            url: "https://uiprint.co",
            description: "Get printable wireframes, mockup and sketchpads",
          },
          {
            title: "uiwtf",
            url: "https://uiw.tf",
            description:
              "An experimental laboratory of user interface patterns and interactions",
          },
          {
            title: "unDraw",
            url: "https://undraw.co",
            description:
              "Open-source illustrations for any idea you can imagine and create",
          },
          {
            title: "Unsplash",
            url: "https://unsplash.com/?grid=multi",
            description: "The internet’s source of freely-usable images",
          },
        ],
      },
      {
        title: "Design systems & guides",
        items: [
          {
            title: "Design Systems",
            url: "https://designsystems.com",
            description:
              "A Figma publication for design systems creators, designers, developers, and managers",
          },
          {
            title: "Humane by design",
            url: "https://humanebydesign.com",
            description:
              "Guidance for designing ethically humane digital products",
          },
          {
            title: "Laws of UX",
            url: "https://lawsofux.com",
            description:
              "Best practices that designers can consider when building user interfaces",
          },
          {
            title: "Carbon design system",
            url: "https://carbondesignsystem.com",
            icon: "🪨",
            description:
              "IBM’s open source design system for products and digital experiences",
          },
          {
            title: "Heroku design systems",
            url: "https://design.herokai.com",
          },
          {
            title: "Material design",
            url: "https://material.io",
          },
          {
            title: "Vercel design",
            url: "https://vercel.com/design",
          },
        ],
      },
    ],
  },
  {
    title: "Other tools",
    icon: "🛠",
    items: [
      {
        title: "CloudConvert",
        url: "https://cloudconvert.com",
        description: "Online file converter",
      },
      {
        title: "Gridzzly",
        url: "http://gridzzly.com",
        description: "Make your own grid paper",
      },
      {
        title: "LanguageTool",
        url: "https://languagetool.org",
        description: "Multilingual grammar, style, and spell checker",
      },
      {
        title: "Privacy Policies",
        url: "https://privacypolicies.com",
        description: "Generate custom-made Privacy Policies in seconds",
      },
      {
        title: "Witeboard",
        url: "https://witeboard.com",
        description: "Shareable online whiteboard",
      },
    ],
  },
  {
    title: "Learning platforms & courses",
    icon: "🚀",
    items: [
      {
        title: "Exercism",
        url: "https://exercism.io",
        description: "Code practice and mentorship for everyone",
      },
      {
        title: "FreeCodeCamp",
        url: "https://freecodecamp.org",
        description: "Learn to code — for free",
      },
      {
        title: "FreeCodeCamp on YouTube",
        url: "https://youtube.com/channel/UC8butISFwT-Wl7EV0hUK0BQ",
      },
      {
        title: "Khan Academy",
        url: "https://khanacademy.org",
        description:
          "Nonprofit with the mission to provide a free, world-class education for anyone, anywhere",
      },
      {
        title: "Project Euler",
        url: "https://projecteuler.net",
        description:
          "A series of challenging mathematical/computer programming problems ",
      },
      {
        title: "The modern JavaScript tutorial",
        url: "https://javascript.info",
        description:
          "From the basics to advanced topics with simple, but detailed explanations",
      },
      {
        title: "Recurse Center",
        url: "https://recurse.com",
        description:
          "A self-directed, community-driven educational retreat for programmers",
      },
      {
        title: "Upcase",
        url: "https://thoughtbot.com/upcase",
        description: "Educational content for intermediate developers",
      },
      {
        title: "Web.dev Learn",
        url: "https://web.dev/learn",
        description:
          "Structured learning paths to discover everything you need to know about building for the modern web",
      },
    ],
  },
  {
    title: "Miscellaneous",
    icon: "📦",
    items: [
      {
        title: "80,000 Hours",
        url: "https://80000hours.org",
        description:
          "Free advice and support to help you have a greater impact with your career",
      },
      {
        title: "Basecamp's communication guidelines",
        url: "https://basecamp.com/guides/how-we-communicate",
        description: "The Basecamp guide to internal communication",
      },
      {
        title: "Basecamp's handbook",
        url: "https://basecamp.com/handbook",
        description: "The Basecamp employee handbook",
      },
      {
        title: "Character Lab",
        url: "https://characterlab.org",
        icon: "😌",
        description:
          "Knowledge about the conditions that lead to social, emotional, academic, and physical well-being",
      },
      {
        title: "CORE",
        url: "https://core-econ.org",
        description:
          "Understand the economics of innovation, inequality, environmental sustainability, and more",
      },
      {
        title: "Darebee",
        url: "https://darebee.com",
        description: "An independent global fitness resource",
      },
      {
        title: "Good Books",
        url: "https://goodbooks.io",
        description: "Books recommended by successful people",
      },
      {
        title: "James Clear's book summaries",
        url: "https://jamesclear.com/book-summaries",
        description: "Popular books summarized in 3 sentences or less",
      },
      {
        title: "Shape Up",
        url: "https://basecamp.com/shapeup/webbook",
        description: "Stop running in circles and ship work that matters",
      },
      {
        title: "StaffEng",
        url: "https://staffeng.com",
        description:
          "Stories of folks who are operating in Staff, Principal or Distinguished Engineer roles",
      },
      {
        title: "Standard Ebooks",
        url: "https://standardebooks.org",
        description: "New editions of public domain ebooks ",
      },
      {
        title: "Thoughtbot playbook",
        url: "https://thoughtbot.com/playbook",
        description: "How Thoughtbot makes successful web and mobile products",
      },
    ],
  },
];
