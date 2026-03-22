---
name: atticus-reference
description: Exhaustive reverse-engineering reference of the Atticus.io book editing platform. Use when building Kroj features that need to match or surpass Atticus capabilities.
---

# Atticus.io Reference Skill

> **Purpose:** Provide complete feature parity reference for building Kroj — a premium book editing and formatting platform.

## When to Use

- When implementing ANY Kroj feature, consult this reference first
- When designing UI/UX for Kroj editor, formatting, or export features
- When making architecture decisions about the rendering engine, theme system, or export pipeline
- When prioritizing features for sprint planning

## Key Artifacts

| File | Purpose |
|------|---------|
| `artifacts/atticus-analysis.md` | Full analysis report with screenshots and feature matrix |
| `artifacts/feature-matrix.md` | Standalone 63-feature comparison matrix |
| `artifacts/formatting-spec.md` | Deep specification of the formatting/theme system |

## Quick Reference

### Atticus Architecture (2 Modes)

```
┌────────────────────────────────────┐
│           ATTICUS EDITOR           │
├──────────────┬─────────────────────┤
│  WRITING     │  FORMATTING         │
│  (Text Edit) │  (Design/Preview)   │
├──────────────┼─────────────────────┤
│  Toolbar     │  18 Themes          │
│  Chapter Mgmt│  9 Config Sections  │
│  Right Tools │  Multi-device Preview│
│  Word Count  │  Print Layout       │
└──────────────┴─────────────────────┘
```

### 9 Formatting Config Sections

1. **Chapter Heading** — Number format, title/subtitle font/align/style/size/width
2. **Paragraph** — Drop caps, lead-in small caps, indent vs spaced
3. **Subheading** — H2–H6 individual font and size multiplier
4. **Scene Break** — Image, text, or invisible; custom upload
5. **Notes** — Footnotes/endnotes; PDF vs ePub positioning; size
6. **Print Layout** — Units, margins, indent, justified, hyphenation, widows/orphans
7. **Typography** — Body font, size (9–18pt), line spacing, large print
8. **Header/Footer** — Layout presets, fonts, mirrored pages
9. **Trim Sizes** — Trade, international, mass market, custom

### Export Formats
- **ePub** (direct) — E-readers
- **PDF** (background process) — Print-ready
- **docx** (quick export) — Word editing

### Business Model
One-time purchase, no subscription. Full access to all features.
