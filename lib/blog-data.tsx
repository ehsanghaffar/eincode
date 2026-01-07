export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  tags: string[]
  author: {
    name: string
    avatar: string
    role: string
  }
  featured: boolean
  color: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 2,
    slug: "mcp-protocol-llm-applications",
    title: "MCP Protocol in LLM Applications",
    excerpt:
      "Implementing Model Context Protocol for seamless AI model interactions with vector databases in RAG applications. Building smarter conversational systems.",
    content: `
## What is MCP?

The Model Context Protocol (MCP) is an emerging standard for managing context in Large Language Model applications. It provides a structured way to handle conversation history, external knowledge, and tool interactions.

## Why MCP Matters for RAG

Retrieval-Augmented Generation (RAG) applications face a fundamental challenge: how do you efficiently combine retrieved documents with conversation context while staying within token limits?

MCP solves this with:
- **Context Windows**: Structured management of what the model "sees"
- **Priority Queues**: Important context stays, less relevant context is pruned
- **Streaming Updates**: Real-time context modification during generation

## Implementation with Vector Databases

Here's how to integrate MCP with a vector database like Pinecone:

\`\`\`typescript
import { MCPClient } from '@mcp/core';
import { PineconeClient } from '@pinecone-database/pinecone';

const mcp = new MCPClient({
  maxTokens: 8192,
  strategy: 'sliding-window'
});

async function queryWithContext(query: string) {
  const embeddings = await generateEmbedding(query);
  const results = await pinecone.query({
    vector: embeddings,
    topK: 5
  });

  mcp.addContext({
    type: 'retrieved',
    priority: 'high',
    content: results.matches.map(m => m.metadata.text)
  });

  return mcp.generate(query);
}
\`\`\`

## Best Practices

1. **Prioritize Recent Context**: User's last few messages should have highest priority
2. **Chunk Retrieved Documents**: Don't dump entire documents; use relevant sections
3. **Monitor Token Usage**: Always leave headroom for the model's response
4. **Cache Embeddings**: Recompute only when necessary

## Conclusion

MCP provides the structure needed to build production-grade RAG applications. As LLMs become more capable, efficient context management becomes the differentiator between good and great AI products.
    `,
    date: "Apr 28, 2025",
    readTime: "8 min read",
    category: "ai",
    tags: ["llm", "rag", "mcp"],
    author: {
      name: "Ehsan Ghaffar",
      avatar: "/developer-portrait.png",
      role: "Software Engineer",
    },
    featured: false,
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 3,
    slug: "nextjs-16-tailwind-v4-migration",
    title: "Next.js 16 + Tailwind CSS v4 Migration Guide",
    excerpt:
      "Exploring the new features in Next.js 16 and migrating to Tailwind CSS v4's new configuration system. A practical guide to modern frontend tooling.",
    content: `
## What's New in Next.js 16

Next.js 16 brings significant changes that improve both developer experience and application performance:

### Turbopack as Default

Turbopack is now the default bundler, offering near-instant hot module replacement:

\`\`\`bash
# No configuration needed - it's automatic!
npm run dev
\`\`\`

### Cache Components with "use cache"

The new directive makes caching explicit and flexible:

\`\`\`tsx
'use cache'

export default async function ProductPage({ id }) {
  const product = await fetchProduct(id);
  return <ProductDisplay product={product} />;
}
\`\`\`

## Migrating to Tailwind CSS v4

Tailwind v4 introduces a CSS-first configuration approach:

### Before (tailwind.config.js)

\`\`\`javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#3b82f6'
      }
    }
  }
}
\`\`\`

### After (globals.css)

\`\`\`css
@import 'tailwindcss';

@theme inline {
  --color-brand: #3b82f6;
  --font-sans: 'Inter', sans-serif;
}
\`\`\`

## Step-by-Step Migration

1. **Update dependencies**:
\`\`\`bash
npm install next@16 tailwindcss@4
\`\`\`

2. **Remove tailwind.config.js** and move configuration to CSS

3. **Update font imports** in layout.tsx

4. **Test thoroughly** - some utility classes may have changed

## Common Gotchas

- \`@apply\` works differently in v4
- Custom plugins need updates
- Some deprecated utilities are removed

## Conclusion

The migration takes effort but the improved DX and performance are worth it. Start with a fresh branch and migrate incrementally.
    `,
    date: "Dec 10, 2024",
    readTime: "10 min read",
    category: "frontend",
    tags: ["nextjs", "tailwind", "react"],
    author: {
      name: "Ehsan Ghaffar",
      avatar: "/developer-portrait.png",
      role: "Software Engineer",
    },
    featured: true,
    color: "from-primary/20 to-emerald-500/20",
  },
  {
    id: 4,
    slug: "self-hosting-llms-fastapi",
    title: "Self-Hosting LLMs with FastAPI",
    excerpt:
      "Running Llama2 locally and building a personal chatbot API for natural language tasks. Complete guide from model setup to production deployment.",
    content: `
## Why Self-Host?

Self-hosting LLMs gives you complete control over your AI infrastructure:
- **Privacy**: Data never leaves your servers
- **Cost**: No per-token charges after initial setup
- **Customization**: Fine-tune for your specific use case

## Hardware Requirements

For Llama2-7B:
- 16GB+ RAM
- NVIDIA GPU with 8GB+ VRAM (or CPU with patience)
- 50GB disk space

## Setting Up the Environment

\`\`\`bash
python -m venv llm-env
source llm-env/bin/activate
pip install torch transformers fastapi uvicorn
\`\`\`

## Loading the Model

\`\`\`python
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

model_id = "meta-llama/Llama-2-7b-chat-hf"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    torch_dtype=torch.float16,
    device_map="auto"
)
\`\`\`

## Building the FastAPI Server

\`\`\`python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class ChatRequest(BaseModel):
    message: str
    max_tokens: int = 256

@app.post("/chat")
async def chat(request: ChatRequest):
    inputs = tokenizer(request.message, return_tensors="pt")
    outputs = model.generate(**inputs, max_new_tokens=request.max_tokens)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"response": response}
\`\`\`

## Production Deployment

Use Gunicorn with Uvicorn workers:

\`\`\`bash
gunicorn main:app -w 2 -k uvicorn.workers.UvicornWorker
\`\`\`

## Conclusion

You now have a private, scalable LLM API. Consider adding rate limiting, authentication, and monitoring for production use.
    `,
    date: "Oct 5, 2024",
    readTime: "15 min read",
    category: "ai",
    tags: ["llm", "python", "fastapi"],
    author: {
      name: "Ehsan Ghaffar",
      avatar: "/developer-portrait.png",
      role: "Software Engineer",
    },
    featured: false,
    color: "from-orange-500/20 to-amber-500/20",
  },
  {
    id: 5,
    slug: "rust-wasm-performance",
    title: "Rust + WebAssembly Performance Deep Dive",
    excerpt:
      "Benchmarking Rust compiled to WebAssembly vs native JavaScript. When does WASM shine and when to stick with JS?",
    content: `
## The Performance Question

WebAssembly promises near-native performance in the browser. But is it always faster than JavaScript? Let's find out with real benchmarks.

## Test Setup

We'll compare three scenarios:
1. Pure JavaScript
2. Rust compiled to WASM
3. Rust WASM with JS interop

## Benchmark 1: Fibonacci (CPU-bound)

\`\`\`rust
// Rust
#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2)
    }
}
\`\`\`

\`\`\`javascript
// JavaScript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
\`\`\`

**Results (fib(40), 100 iterations)**:
- JavaScript: 1,245ms
- Rust WASM: 892ms
- **WASM wins by 28%**

## Benchmark 2: Array Processing

Processing 1M elements with map/reduce operations.

**Results**:
- JavaScript: 45ms
- Rust WASM: 52ms (with copy overhead)
- Rust WASM SharedArrayBuffer: 23ms
- **WASM wins only with shared memory**

## When to Use WASM

**Use WASM for**:
- Heavy computation (image processing, cryptography)
- Games and simulations
- Porting existing C/C++/Rust codebases

**Stick with JS for**:
- DOM manipulation
- Light data processing
- When bundle size matters

## Conclusion

WASM isn't a silver bullet. The overhead of crossing the JS-WASM boundary can negate performance gains for small operations. Profile first, optimize second.
    `,
    date: "Sep 18, 2024",
    readTime: "11 min read",
    category: "systems",
    tags: ["rust", "wasm", "performance"],
    author: {
      name: "Ehsan Ghaffar",
      avatar: "/developer-portrait.png",
      role: "Software Engineer",
    },
    featured: false,
    color: "from-red-500/20 to-orange-500/20",
  },
  {
    id: 6,
    slug: "design-tokens-system",
    title: "Building a Design Token System",
    excerpt:
      "Creating a scalable design token architecture that works across platforms. From CSS variables to Figma tokens and everything in between.",
    content: `
## What Are Design Tokens?

Design tokens are the atomic values of your design system—colors, spacing, typography, shadows. They're platform-agnostic and enable consistency across web, mobile, and design tools.

## Token Hierarchy

A well-structured token system has three layers:

### 1. Primitive Tokens (Raw Values)

\`\`\`json
{
  "blue-500": "#3b82f6",
  "space-4": "16px",
  "font-size-lg": "18px"
}
\`\`\`

### 2. Semantic Tokens (Purpose)

\`\`\`json
{
  "color-primary": "{blue-500}",
  "spacing-component": "{space-4}",
  "text-body": "{font-size-lg}"
}
\`\`\`

### 3. Component Tokens (Specific Use)

\`\`\`json
{
  "button-background": "{color-primary}",
  "button-padding": "{spacing-component}",
  "button-font-size": "{text-body}"
}
\`\`\`

## Implementation in CSS

\`\`\`css
:root {
  /* Primitives */
  --blue-500: #3b82f6;

  /* Semantic */
  --color-primary: var(--blue-500);

  /* Component */
  --button-bg: var(--color-primary);
}

.button {
  background: var(--button-bg);
}
\`\`\`

## Syncing with Figma

Use the Tokens Studio plugin to export tokens:

1. Define tokens in Figma using Tokens Studio
2. Export as JSON
3. Transform with Style Dictionary
4. Generate platform-specific outputs

## Conclusion

Design tokens bridge the gap between design and development. Invest in the foundation, and your design system scales effortlessly.
    `,
    date: "Aug 22, 2024",
    readTime: "9 min read",
    category: "frontend",
    tags: ["design-systems", "css", "tokens"],
    author: {
      name: "Ehsan Ghaffar",
      avatar: "/developer-portrait.png",
      role: "Software Engineer",
    },
    featured: false,
    color: "from-teal-500/20 to-cyan-500/20",
  },
  {
    id: 7,
    slug: "lti-learning-platforms-integration",
    title: "Understanding LTI: Integrating Learning Tools with Educational Platforms",
    excerpt:
      "A comprehensive guide to Learning Tools Interoperability (LTI) 1.3 - the standard protocol that enables seamless integration between learning management systems and external educational tools.",
    content: `
## Introduction

Learning Tools Interoperability (LTI) is the global standard for integrating learning applications with platforms like Canvas, Moodle, Blackboard, and other Learning Management Systems (LMS). If you're building educational technology, understanding LTI is essential for creating tools that educators can easily adopt.

## What is LTI?

LTI is a standard developed by IMS Global Learning Consortium that defines how learning tools communicate with platforms. Think of it as OAuth for education - it handles authentication, user data transfer, and grade passback in a secure, standardized way.

### Key Benefits

- **Single Sign-On**: Students and teachers access tools without additional logins
- **Automatic Rostering**: User information flows seamlessly from LMS to tool
- **Grade Passback**: Tools can send grades directly to the LMS gradebook
- **Privacy & Security**: Built on OAuth 2.0 and OpenID Connect standards

## LTI 1.3 Architecture

LTI 1.3 represents a major upgrade from earlier versions, replacing custom security schemes with industry-standard protocols.

### The Launch Flow

1. **User Initiates Launch**: Student clicks on an LTI link in the LMS
2. **Platform Creates JWT**: LMS generates a signed JSON Web Token containing user/context data
3. **Tool Validates Token**: External tool verifies the JWT signature and processes claims
4. **Tool Renders Content**: Application displays personalized content for the user

## Understanding the Launch Request

Here's what a typical LTI 1.3 launch request looks like:

\`\`\`http
POST https://example.tool.com/lti/launch
Content-Type: application/x-www-form-urlencoded

id_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

The JWT payload contains rich contextual information:

\`\`\`json
{
  "iss": "https://platform.example.edu",
  "sub": "a6d5c443-1f51-4783-ba1a-7686ffe3b54a",
  "aud": ["962fa4d8-bcbf-49a0-94b2-2de05ad274af"],
  "https://purl.imsglobal.org/spec/lti/claim/message_type": "LtiResourceLinkRequest",
  "https://purl.imsglobal.org/spec/lti/claim/version": "1.3.0",
  "https://purl.imsglobal.org/spec/lti/claim/roles": [
    "http://purl.imsglobal.org/vocab/lis/v2/membership#Learner"
  ],
  "https://purl.imsglobal.org/spec/lti/claim/context": {
    "id": "c1d887f0-a1a3-4bca-ae25-c375edcc131a",
    "label": "ECON 1010",
    "title": "Economics as a Social Science"
  }
}
\`\`\`

### Key Claims Explained

- **iss** (issuer): The platform URL
- **sub** (subject): Unique user identifier
- **aud** (audience): Your tool's client ID
- **roles**: User's role in the course (student, instructor, admin)
- **context**: Course information
- **resource_link**: The specific link being launched

## Security Model

LTI 1.3 security is built on three pillars:

### 1. Platform Registration

Tools must register with platforms, receiving:
- **Client ID**: Identifies your tool
- **Deployment ID**: Identifies specific tool installations
- **Public Key URL**: Where the platform publishes keys for JWT validation

### 2. OIDC Login Flow

Before the actual launch, a lightweight OIDC flow establishes the session:

\`\`\`
1. Platform → Tool: Login initiation request
2. Tool → Platform: Authentication request
3. Platform → Tool: Launch request with signed JWT
\`\`\`

### 3. JWT Validation

Your tool MUST validate:
- Signature using platform's public key
- Issuer matches registered platform
- Audience contains your client ID
- Token hasn't expired (exp claim)
- Nonce hasn't been used before

## Implementing LTI in Your Application

### Backend Implementation (Node.js Example)

\`\`\`typescript
import { JWK, JWT } from 'jose';

async function validateLaunchToken(idToken: string) {
  // 1. Decode without verification first
  const decoded = JWT.decode(idToken, { complete: true });
  
  // 2. Fetch platform's public key
  const platformKeys = await fetchPlatformKeys(decoded.payload.iss);
  
  // 3. Verify signature
  const verified = await JWT.verify(idToken, platformKeys, {
    issuer: decoded.payload.iss,
    audience: process.env.LTI_CLIENT_ID
  });
  
  // 4. Validate required claims
  if (!verified['https://purl.imsglobal.org/spec/lti/claim/message_type']) {
    throw new Error('Invalid LTI message type');
  }
  
  return verified;
}
\`\`\`

### Grade Passback with Assignment and Grade Services

One of LTI's most powerful features is sending grades back to the LMS:

\`\`\`typescript
async function sendGrade(userId: string, score: number) {
  const lineItemUrl = launch.claims[
    'https://purl.imsglobal.org/spec/lti-ags/claim/endpoint'
  ].lineitem;
  
  // Get OAuth2 access token
  const accessToken = await getAccessToken();
  
  // Submit score
  await fetch(\`\${lineItemUrl}/scores\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Content-Type': 'application/vnd.ims.lis.v1.score+json'
    },
    body: JSON.stringify({
      userId: userId,
      scoreGiven: score,
      scoreMaximum: 100,
      activityProgress: 'Completed',
      gradingProgress: 'FullyGraded'
    })
  });
}
\`\`\`

## Deep Link: Dynamic Content Selection

Deep Linking allows instructors to select specific content from your tool to add to their course:

\`\`\`typescript
// Respond to deep link request
function createDeepLinkResponse(contentItems: ContentItem[]) {
  const jwt = JWT.sign({
    iss: clientId,
    aud: platformUrl,
    exp: Math.floor(Date.now() / 1000) + 600,
    iat: Math.floor(Date.now() / 1000),
    nonce: generateNonce(),
    'https://purl.imsglobal.org/spec/lti/claim/message_type': 
      'LtiDeepLinkingResponse',
    'https://purl.imsglobal.org/spec/lti-dl/claim/content_items': 
      contentItems
  }, privateKey, { algorithm: 'RS256' });
  
  return jwt;
}
\`\`\`

## Best Practices

### Security

- **Always validate JWT signatures** - Never trust unverified tokens
- **Check nonce uniqueness** - Store used nonces to prevent replay attacks
- **Use HTTPS everywhere** - LTI requires secure communication
- **Rotate keys regularly** - Update your public/private key pairs periodically

### User Experience

- **Handle missing claims gracefully** - Not all platforms send optional claims
- **Implement loading states** - LTI launches can take a few seconds
- **Provide fallback authentication** - For development and testing
- **Cache platform keys** - Don't fetch public keys on every request

### Testing

- **Use LTI Advantage Test Suite** - IMS provides certification tools
- **Test with multiple platforms** - Canvas, Moodle, Blackboard all have quirks
- **Mock launch requests** - Create test JWTs for development

## Common Pitfalls

1. **Clock Skew**: JWT exp/iat validation fails if server clocks aren't synchronized
2. **Nonce Storage**: Forgetting to store nonces opens replay attack vulnerabilities  
3. **Role Mapping**: Different platforms use different role vocabularies
4. **Deep Link State**: Not preserving state during multi-step content selection flows

## Real-World Use Cases

- **Interactive Assessments**: Quiz tools that automatically grade and send scores
- **Video Platforms**: Embedding educational videos with progress tracking
- **Collaboration Tools**: Discussion boards that sync with course rosters
- **Content Libraries**: Allowing instructors to select and embed resources
- **Adaptive Learning**: Personalized learning paths that integrate with course structure

## Tools and Libraries

- **ltijs** (Node.js): Full-featured LTI 1.3 library
- **pylti1p3** (Python): LTI 1.3 implementation for Python/Django
- **lti-1-3-php-library** (PHP): PHP implementation of LTI 1.3
- **IMS Reference Implementation**: Official Java-based reference

## Conclusion

LTI 1.3 is a robust, secure standard that solves the complex problem of integrating third-party tools into learning platforms. While the initial setup requires understanding OAuth 2.0 and JWT, the payoff is enormous: your educational tool becomes instantly compatible with hundreds of institutions worldwide.

The education technology landscape is rapidly evolving, and LTI provides the interoperability foundation that allows innovation to flourish. Whether you're building assessment tools, content libraries, or collaborative platforms, implementing LTI opens doors to millions of students and educators.

Start with a simple launch implementation, add grade passback when needed, and explore advanced features like Deep Linking and Names and Role Provisioning Service as your integration matures. The investment in understanding LTI pays dividends in market reach and user adoption.
    `,
    date: "Jan 7, 2026",
    readTime: "18 min read",
    category: "systems",
    tags: ["lti", "education", "integration", "oauth", "jwt"],
    author: {
      name: "Ehsan Ghaffar",
      avatar: "/developer-portrait.png",
      role: "Software Engineer",
    },
    featured: true,
    color: "from-indigo-500/20 to-blue-500/20",
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug)
  if (!currentPost) return []

  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => post.category === currentPost.category || post.tags.some((tag) => currentPost.tags.includes(tag)))
    .slice(0, limit)
}
