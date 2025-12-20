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
    id: 1,
    slug: "building-linux-distro-from-scratch",
    title: "Building a Linux Distro from Scratch",
    excerpt:
      "A comprehensive guide to compiling the kernel, configuring BusyBox, and creating bootable ISOs with Syslinux. Learn the fundamentals of Linux system architecture.",
    content: `
## Introduction

Building a Linux distribution from scratch is one of the most rewarding learning experiences for any systems programmer. It forces you to understand how all the pieces fit together—from the bootloader to user space.

## Prerequisites

Before we begin, ensure you have:
- A Linux host system (Ubuntu 22.04+ recommended)
- At least 20GB of free disk space
- Basic knowledge of shell scripting
- Patience (this will take time)

## Step 1: Setting Up the Build Environment

First, we need to create a clean build environment. We'll use a chroot to isolate our build:

\`\`\`bash
export LFS=/mnt/lfs
mkdir -pv $LFS
mount /dev/sdb1 $LFS
\`\`\`

## Step 2: Compiling the Kernel

The Linux kernel is the heart of our distribution. We'll compile version 6.1 LTS:

\`\`\`bash
cd /usr/src
wget https://cdn.kernel.org/pub/linux/kernel/v6.x/linux-6.1.tar.xz
tar xf linux-6.1.tar.xz
cd linux-6.1
make menuconfig
make -j$(nproc)
make modules_install
make install
\`\`\`

## Step 3: Configuring BusyBox

BusyBox provides essential Unix utilities in a single executable:

\`\`\`bash
wget https://busybox.net/downloads/busybox-1.36.0.tar.bz2
tar xf busybox-1.36.0.tar.bz2
cd busybox-1.36.0
make defconfig
make CONFIG_STATIC=y -j$(nproc)
make install
\`\`\`

## Step 4: Creating the Root Filesystem

Now we assemble our minimal root filesystem:

\`\`\`bash
mkdir -p $LFS/{bin,sbin,etc,proc,sys,usr/{bin,sbin}}
cp -a busybox-1.36.0/_install/* $LFS/
\`\`\`

## Step 5: Building a Bootable ISO

Finally, we create a bootable ISO using Syslinux:

\`\`\`bash
mkdir -p iso/boot/syslinux
cp /usr/lib/syslinux/bios/*.c32 iso/boot/syslinux/
cp /usr/lib/syslinux/bios/isolinux.bin iso/boot/syslinux/
xorriso -as mkisofs -o mylinux.iso -b boot/syslinux/isolinux.bin iso/
\`\`\`

## Conclusion

You now have a minimal but functional Linux distribution. From here, you can add package management, init systems, and desktop environments. The journey of a thousand miles begins with a single step—and you've just taken yours.
    `,
    date: "Nov 15, 2025",
    readTime: "12 min read",
    category: "systems",
    tags: ["linux", "kernel", "devops"],
    author: {
      name: "Ehsan Ghaffar",
      avatar: "/developer-portrait.png",
      role: "Software Engineer",
    },
    featured: true,
    color: "from-blue-500/20 to-cyan-500/20",
  },
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
