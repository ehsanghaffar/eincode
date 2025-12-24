# Accessibility Guidelines

## Accessibility Status

### WCAG 2.1 Compliance Target: Level AA

Current Status: **Partial Compliance** ⚠️

## Current Issues

### 1. Missing ARIA Labels

#### Theme Changer (High Priority)
\`\`\`tsx
// ❌ components/theme-changer.tsx
<button onClick={() => setIsOpen(!isOpen)}>
  <Palette className="size-4" />
</button>
\`\`\`

**Issue**: No accessible name for screen readers

**Fix**:
\`\`\`tsx
// ✅ Fixed
<button
  onClick={() => setIsOpen(!isOpen)}
  aria-label="Change theme color"
  aria-expanded={isOpen}
  aria-haspopup="menu"
>
  <Palette className="size-4" />
</button>
\`\`\`

#### Social Links in Footer
\`\`\`tsx
// ❌ components/footer.tsx
<a href={link.href} target="_blank" rel="noopener noreferrer">
  <link.icon className="h-5 w-5" />
</a>
\`\`\`

**Fix**:
\`\`\`tsx
// ✅ Fixed
<a
  href={link.href}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={`Visit ${link.label} profile`}
>
  <link.icon className="h-5 w-5" />
</a>
\`\`\`

### 2. Keyboard Navigation

#### Mobile Menu (High Priority)
\`\`\`tsx
// ❌ components/header.tsx
<div className={cn(
  "transition-all duration-400 md:hidden",
  isMobileMenuOpen ? "max-h-96" : "max-h-0"
)}>
  {/* Menu items */}
</div>
\`\`\`

**Issues**:
- Not keyboard accessible
- No focus trapping
- No escape key handler
- Focus not returned after close

**Fix**:
\`\`\`tsx
// ✅ Fixed with proper focus management
'use client'
import { useEffect, useRef } from 'react'

export function MobileMenu({ isOpen, onClose }) {
  const menuRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      // Save current focus
      previousFocusRef.current = document.activeElement as HTMLElement
      // Focus first item
      const firstItem = menuRef.current?.querySelector('a')
      firstItem?.focus()
    } else {
      // Return focus
      previousFocusRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
      
      // Trap focus within menu
      if (e.key === 'Tab') {
        const focusableElements = menuRef.current?.querySelectorAll(
          'a, button, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusableElements) return

        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <div
      ref={menuRef}
      role="navigation"
      aria-label="Mobile navigation"
      className={cn(
        "transition-all duration-400 md:hidden",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}
    >
      {/* Menu items */}
    </div>
  )
}
\`\`\`

#### Theme Dropdown
**Issues**:
- No keyboard navigation for color picker
- Arrow keys don't work
- Enter/Space don't activate
- Focus not visible

**Fix**: Use Radix UI Dropdown Menu (already installed):
\`\`\`tsx
// ✅ Fixed with Radix UI
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export function ThemeChanger() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="..."
          aria-label="Change theme color"
        >
          <Palette className="size-4" />
        </button>
      </DropdownMenu.Trigger>
      
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="..."
          sideOffset={5}
        >
          {themes.map((theme) => (
            <DropdownMenu.Item
              key={theme.name}
              onSelect={() => handleThemeChange(theme.name)}
              className="..."
            >
              <div className="..." style={{ backgroundColor: theme.color }} />
              <span>{theme.name}</span>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
\`\`\`

### 3. Color Contrast

Run contrast checker on all theme colors:

\`\`\`bash
# Install contrast checker
npm install -g accessibility-checker

# Check colors
npx wcag-color-contrast-checker
\`\`\`

**Colors to check**:
\`\`\`css
/* app/globals.css */
:root {
  --foreground: oklch(0.12 0.015 260);     /* Dark gray on light */
  --muted-foreground: oklch(0.48 0.01 260); /* Medium gray */
  --primary: oklch(0.5 0.22 170);          /* Teal/cyan */
}

.dark {
  --foreground: oklch(0.96 0 0);           /* Near white */
  --muted-foreground: oklch(0.58 0 0);     /* Light gray */
  --primary: oklch(0.72 0.2 170);          /* Bright teal */
}
\`\`\`

**WCAG AA Requirements**:
- Normal text: **4.5:1** minimum contrast ratio
- Large text (18pt+): **3:1** minimum contrast ratio
- UI components: **3:1** minimum contrast ratio

**Potential Issues**:
- `muted-foreground` might not meet 4.5:1 on `background`
- Check primary buttons in light mode

### 4. Semantic HTML

#### Current Status: Mostly Good ✅

Good examples:
\`\`\`tsx
// ✅ Good: Semantic nav
<nav className="...">
  <Link href="/">Home</Link>
</nav>

// ✅ Good: Semantic header
<header className="...">
  {/* navigation */}
</header>

// ✅ Good: Article for blog posts
<article className="...">
  <h1>{post.title}</h1>
  <p>{post.content}</p>
</article>
\`\`\`

**Minor improvements needed**:
\`\`\`tsx
// ⚠️ Could be better
<div className="hero">  // Should be <section>
  
// ⚠️ Missing landmark
<div className="footer">  // Should be <footer>

// ⚠️ Missing heading hierarchy
<h3>Title</h3>  // If there's no h1 or h2 before this
\`\`\`

### 5. Focus Indicators

**Current**: Default browser focus

**Improvement**: Custom focus styles
\`\`\`css
/* app/globals.css */
@layer base {
  *:focus-visible {
    @apply outline-2 outline-offset-2 outline-ring;
  }
  
  /* Remove outline for mouse users */
  *:focus:not(:focus-visible) {
    outline: none;
  }
}
\`\`\`

### 6. Skip Links

**Missing**: Skip to main content link

**Add**:
\`\`\`tsx
// app/layout.tsx
<body>
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
  >
    Skip to main content
  </a>
  
  <ThemeProvider>
    {children}
  </ThemeProvider>
</body>

// app/(public)/layout.tsx
<main id="main-content">
  {children}
</main>
\`\`\`

### 7. Screen Reader Announcements

**Missing**: Live region for dynamic content

**Add**:
\`\`\`tsx
// components/screen-reader-announcer.tsx
'use client'

import { useState, useEffect } from 'react'

export function ScreenReaderAnnouncer() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Listen for route changes
    const handleRouteChange = () => {
      setMessage('Page loaded')
      setTimeout(() => setMessage(''), 100)
    }
    
    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  )
}
\`\`\`

## Accessibility Testing Checklist

### Automated Testing

\`\`\`bash
# Install axe DevTools
# Chrome/Firefox extension
# https://www.deque.com/axe/devtools/

# Or use axe-core CLI
npx @axe-core/cli http://localhost:3000
\`\`\`

### Manual Testing

#### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Test navigation menu with keyboard
- [ ] Test dropdowns with Arrow keys
- [ ] Test modal/dialog focus trapping
- [ ] Ensure visible focus indicators
- [ ] Test Escape key to close modals

#### Screen Reader Testing
- [ ] Test with NVDA (Windows) or VoiceOver (Mac)
- [ ] Verify all images have alt text
- [ ] Check heading hierarchy (h1 → h2 → h3)
- [ ] Verify form labels are associated
- [ ] Check live regions announce changes
- [ ] Verify skip links work

#### Visual Testing
- [ ] Test color contrast with tool
- [ ] Test with high contrast mode
- [ ] Test with Windows High Contrast
- [ ] Test with dark mode
- [ ] Zoom to 200% - ensure usability
- [ ] Test with reduced motion preference

#### Mobile Testing
- [ ] Test touch targets (min 44x44px)
- [ ] Test with screen reader (TalkBack/VoiceOver)
- [ ] Test landscape orientation
- [ ] Test with zoom enabled

## ARIA Patterns to Implement

### Navigation Menu
\`\`\`tsx
<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="none">
      <a role="menuitem" href="/">Home</a>
    </li>
  </ul>
</nav>
\`\`\`

### Dropdown Menu
\`\`\`tsx
<div>
  <button
    aria-haspopup="true"
    aria-expanded={isOpen}
    aria-controls="dropdown-menu"
  >
    Menu
  </button>
  
  <ul
    id="dropdown-menu"
    role="menu"
    hidden={!isOpen}
  >
    <li role="menuitem">Item</li>
  </ul>
</div>
\`\`\`

### Loading States
\`\`\`tsx
<div
  role="status"
  aria-live="polite"
  aria-busy={isLoading}
>
  {isLoading ? 'Loading...' : 'Content loaded'}
</div>
\`\`\`

## Accessibility Resources

### Tools
- **axe DevTools**: Browser extension for automated testing
- **WAVE**: Web accessibility evaluation tool
- **Lighthouse**: Includes accessibility audits
- **Color Contrast Analyzer**: Desktop app for contrast checking
- **NVDA/VoiceOver**: Free screen readers

### Guidelines
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Articles](https://webaim.org/articles/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

## Implementation Priority

### High Priority (P0)
1. Add ARIA labels to theme changer
2. Fix keyboard navigation in mobile menu
3. Ensure color contrast meets WCAG AA
4. Add focus indicators
5. Add skip links

### Medium Priority (P1)
6. Improve dropdown keyboard navigation
7. Add screen reader announcements
8. Fix heading hierarchy
9. Ensure proper semantic HTML
10. Add focus trapping in modals

### Low Priority (P2)
11. Add reduced motion support
12. Implement better loading announcements
13. Add touch target size checks
14. Improve mobile screen reader experience

---

**Testing Schedule**: Before each major release  
**Compliance Target**: WCAG 2.1 Level AA  
**Next Review**: After implementing P0 fixes
