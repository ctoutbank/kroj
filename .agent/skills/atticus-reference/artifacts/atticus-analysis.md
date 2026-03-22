# 🔬 Análise Exaustiva do Atticus.io — Relatório para Kroj

> **Data:** 2026-03-21 | **Analista:** IA Antigravity | **Objetivo:** Blueprint de engenharia reversa para o projeto Kroj

---

## 📋 Resumo Executivo

O Atticus é uma plataforma de editoração de livros baseada em web, com modelo de pagamento único (sem assinatura recorrente). Opera em dois modos principais: **Writing** (escrita) e **Formatting** (design/formatação). Oferece 18 temas pré-configurados, exportação para ePub/PDF/docx, preview multi-dispositivo e colaboração em tempo real.

---

## 1. Dashboard & Navegação

### 1.1 Tela Inicial (Home)

![Dashboard do Atticus](/Users/denisonzimmerdaluz/.gemini/antigravity/brain/71799c84-1d3b-451c-b864-b6eac8fd4b45/atticus-analysis/screenshots/01_dashboard.png)

**Quick Action Cards (3):**
| Card | Ação | Ícone |
|------|------|-------|
| Upload a book | Importar documento existente | ↑ (upload) |
| Start a new book | Criar projeto do zero | 📄 (documento) |
| Create a new boxset | Agrupar múltiplos livros | 📊 (grid) |

**Elementos adicionais:**
- Tutorial card com vídeo e link "See tutorials"
- **Recent work**: cards horizontais com capa, título, autor, data, menu (⋮)
- Ações por item: **Duplicate** e **Delete**

### 1.2 Navegação Principal

| Tab | Função | Subtabs |
|-----|--------|---------|
| **Home** | Dashboard com ações rápidas | — |
| **My books** | Lista de projetos | All, Books, Master Pages |
| **Collaboration** | Trabalho compartilhado | All, Co-Write, Track Change Edits, Comments |

**Header icons (direita):** Sync ☁️ · Save 💾 · Help ❓ · Notifications 🔔 · Profile (DL)

### 1.3 My Books

![My Books](/Users/denisonzimmerdaluz/.gemini/antigravity/brain/71799c84-1d3b-451c-b864-b6eac8fd4b45/atticus-analysis/screenshots/02_my_books.png)

- Search: por título, autor, versão ou projeto
- Sort: Date modified (dropdown)
- View: Grid ⊞ ou List ☰
- Tabs: All (count) · Books (count) · Master Pages (count)

### 1.4 Collaboration

![Collaboration](/Users/denisonzimmerdaluz/.gemini/antigravity/brain/71799c84-1d3b-451c-b864-b6eac8fd4b45/atticus-analysis/screenshots/03_collaboration.png)

- Empty state com citação literária (Steinbeck)
- Tabs: All · Co-Write · Track Change Edits · Comments

---

## 2. Editor de Texto (Writing Mode)

![Editor completo](/Users/denisonzimmerdaluz/.gemini/antigravity/brain/71799c84-1d3b-451c-b864-b6eac8fd4b45/atticus-analysis/screenshots/17_editor_full_view.png)

### 2.1 Layout do Editor

| Área | Conteúdo |
|------|----------|
| **Top bar** | Título do livro · "Edit book details" · Writing / Formatting toggle · Invite · Icons |
| **Left sidebar** | Front Matter → Body → Back Matter (capítulos com drag-and-drop) |
| **Main area** | Toolbar + Chapter header (imagem, título, subtítulo) + Área de texto |
| **Right sidebar** | 5 ícones verticais de ferramentas |
| **Bottom bar** | Export docx · Timer · Word count |

### 2.2 Toolbar de Formatação

| Grupo | Ferramentas |
|-------|-------------|
| **Estilos básicos** | **B** (Bold) · *I* (Italic) · <u>U</u> (Underline) |
| **Estilos avançados** (dropdown ~~S~~) | Strikethrough · Monospace · Smallcaps · Sans Serif · Subscript · Superscript |
| **Estrutura** (dropdown ¶) | Paragraph · Heading 2 · Heading 3 · Heading 4 · Heading 5 · Heading 6 |
| **Alinhamento** (dropdown ≡) | Left · Center · Right · Justified |
| **Inserções** | Scene Break ✱ · Unordered List · Ordered List · Link 🔗 · Image 🖼 · Callout/Blockquote 💬 · Mentions @ |
| **Layout** | Indent ⟫ · Outdent ⟪ · List indent → · List outdent ← |
| **Ações** | Undo ↶ · Redo ↷ · Fullscreen ⛶ |

### 2.3 Gestão de Capítulos (Left Sidebar)

**Front Matter disponível:**
- Title Page
- Copyright  
- Contents (Table of Contents)

**Body:** Capítulos numerados com drag handles

**Back Matter:** Conteúdo de encerramento

**Menu "..." (sidebar footer):**
- Preset layouts
- Copyright templates
- Add specials: Title Page, Full Page Image, Import Chapters

**Chapter Settings (ícone ⚙ por capítulo):**
- Hide/Show: chapter image, chapter heading, page numbers, header/footer
- First sentence formatting toggle
- Table of Contents visibility
- Use smaller chapter title
- Invert text color

### 2.4 Right Sidebar Tools

| Ícone | Ferramenta | Funcionalidade |
|-------|------------|----------------|
| **T** | Typography | Font Family, Size, Line Height, Paragraph layout (Indented/Spaced, Justified) |
| **🔍** | Find & Replace | Scope: Chapter ou Book · Match Case · Whole Word |
| **👥** | Collaboration | Comments (count) · Edits (count) · Filtro por capítulo |
| **🎯** | Goals | Word count goal, Due date, Writing schedule (weekly checkboxes) |
| **❝** | Smart Quotes | Convert all quotes to curly · Inconsistencies checker por capítulo |

### 2.5 Bottom Bar

| Elemento | Descrição |
|----------|-----------|
| **Export docx** | Exportação rápida para .docx |
| **Timer** | Cronômetro de sessão de escrita |
| **Word count** | "Chapter - XXX words" (toggle Chapter/Book) |

---

## 3. 🎨 Formatação e Design (PRIORIDADE MÁXIMA)

### 3.1 Temas Disponíveis (18)

![Galeria de temas](/Users/denisonzimmerdaluz/.gemini/antigravity/brain/71799c84-1d3b-451c-b864-b6eac8fd4b45/atticus-analysis/screenshots/04_formatting_themes.png)

![Todos os temas](/Users/denisonzimmerdaluz/.gemini/antigravity/brain/71799c84-1d3b-451c-b864-b6eac8fd4b45/atticus-analysis/screenshots/08_formatting_all_themes.png)

| # | Tema | Estilo Visual |
|---|------|---------------|
| 1 | **Aether** | Limpo, serif clássico |
| 2 | **Atreides** | Serif com linha pontilhada no título |
| 3 | **Bonkers Books** | Moderno, número de capítulo destacado |
| 4 | **Clairmont** | Linha horizontal superior no título |
| 5 | **Delphini** | Decorativo com ornamento no título |
| 6 | **Delta** | Bold, número grande + título |
| 7 | **Elinor** | Cursiva elegante |
| 8 | **Finch** | Serif com ornamento de personagem |
| 9 | **Hughes** | Monospace art-deco |
| 10 | **Intratech** | Sem-número, apenas título serif |
| 11 | **Minax** | Compacto, SMALL CAPS |
| 12 | **Minerva** | SMALL CAPS com número em romano |
| 13 | **Penelope** | Linha pontilhada decorativa |
| 14 | **Scarlett** | Cursiva decorativa |
| 15 | **Seraphina** | Coração decorativo como separador |
| 16 | **Titus** | Número + ornamento + SMALL CAPS |
| 17 | **Watts** | Monospace bold typewriter |
| 18 | **Custom** | Criado pelo usuário |

**Funcionalidades de tema:**
- ✅ Criar tema personalizado do zero
- ✅ Preview em tempo real
- ❤️ Favoritar temas
- ⋮ Menu contextual por tema

### 3.2 Preview Multi-Dispositivo

| Categoria | Dispositivos |
|-----------|-------------|
| **Apple** | iPhone, iPad |
| **Android** | Galaxy Tab 7, Galaxy S21 |
| **Kindle** | Fire, Paperwhite, Oasis |
| **Print** | Layout de livro impresso |

**Preview Fonts:** Palatino, Georgia, San Francisco, Athelas, Iowan, New York, Seravek, Charter

### 3.3 Seções de Configuração de Tema (9 seções)

#### 3.3.1 Chapter Heading

![Chapter Heading Config](/Users/denisonzimmerdaluz/.gemini/antigravity/brain/71799c84-1d3b-451c-b864-b6eac8fd4b45/atticus-analysis/screenshots/09_chapter_heading_config.png)

**Chapter Number View:**

| Formato | Exemplo |
|---------|---------|
| Numérico | `1` |
| Prefixed | `Chapter 1` |
| Word | `One` |
| Full text | `Chapter One` |

**Controles por elemento (Number, Title, Subtitle):**
- ✅ Toggle on/off
- Font (dropdown)
- Align: Left / Center / Right
- Style: Regular / Italic / Bold / Bold Italic
- Size: slider (15–54)
- Width %: slider (20%–100%)

**Chapter Image:** Toggle com upload

#### 3.3.2 Paragraph

![Paragraph Config](/Users/denisonzimmerdaluz/.gemini/antigravity/brain/71799c84-1d3b-451c-b864-b6eac8fd4b45/atticus-analysis/screenshots/10_paragraph_config.png)

**First Sentence Options:**
| Opção | Descrição |
|-------|-----------|
| **Drop Caps** | Letra inicial grande (múltiplas linhas) |
| **Lead-in Small Caps** | Primeiras palavras em SMALL CAPS |
| **Nenhum** | Sem formatação especial |

**Drop Cap Fonts:** Seleção de fontes decorativas dedicadas

**Usage:** Só no início de capítulos OU após cada scene break

**Subsequent Paragraphs:**
| Opção | Descrição |
|-------|-----------|
| **Indented** | Recuo na primeira linha (estilo livro tradicional) |
| **Spaced** | Espaço entre parágrafos (estilo web/moderno) |

#### 3.3.3 Subheading

**Headings H2 a H6:**
- Font individual por nível
- Size multiplier: 0.75x a 2.00x

#### 3.3.4 Scene Break

![Scene Break Config](/Users/denisonzimmerdaluz/.gemini/antigravity/brain/71799c84-1d3b-451c-b864-b6eac8fd4b45/atticus-analysis/screenshots/11_scene_break_config.png)

| Opção | Descrição |
|-------|-----------|
| **Com imagem** | Upload custom, gallery, ou Book Brush |
| **Sem imagem (texto)** | Caracteres personalizados (ex: * * *) |
| **Sem separador visível** | Apenas espaço em branco |

**Width slider** para controle de tamanho do separador

#### 3.3.5 Notes

![Notes Config](/Users/denisonzimmerdaluz/.gemini/antigravity/brain/71799c84-1d3b-451c-b864-b6eac8fd4b45/atticus-analysis/screenshots/12_notes_config.png)

| Formato | PDF | ePub |
|---------|-----|------|
| **Footnotes** | ✅ | ❌ |
| **End of chapter** | ✅ | ✅ |
| **End of book** | ✅ | ✅ |

**Font size:** Slider 0.75x a 2.00x

#### 3.3.6 Print Layout

![Print Layout Config](/Users/denisonzimmerdaluz/.gemini/antigravity/brain/71799c84-1d3b-451c-b864-b6eac8fd4b45/atticus-analysis/screenshots/13_print_layout_config.png)

| Configuração | Opções |
|-------------|--------|
| **Units** | inches / mm |
| **Inside margin** | input numérico |
| **Outside margin** | input numérico |
| **Hanging indent** | input numérico |
| **Justified text** | Toggle on/off |
| **Hyphenation** | Toggle on/off |
| **Layout priority** | Widows & Orphans / Balanced page spread / Hybrid |

#### 3.3.7 Typography

![Typography Config](/Users/denisonzimmerdaluz/.gemini/antigravity/brain/71799c84-1d3b-451c-b864-b6eac8fd4b45/atticus-analysis/screenshots/14_typography_config.png)

| Configuração | Range |
|-------------|-------|
| **Body font** | EB Garamond, Palatino, Georgia, e mais |
| **Font size** | 9pt – 18pt (slider) |
| **Line spacing** | Single – Double (presets: 1.25, 1.5, 1.75) |
| **Large print** | Toggle para acessibilidade |

#### 3.3.8 Header/Footer

![Header/Footer Config](/Users/denisonzimmerdaluz/.gemini/antigravity/brain/71799c84-1d3b-451c-b864-b6eac8fd4b45/atticus-analysis/screenshots/15_header_footer_config.png)

**Layouts presets:** Múltiplas combinações de posição para:
- Page number
- Book title
- Author name

**Posições:** Top/Bottom × Left/Center/Right
**Alternância par/ímpar:** Mirrored headers
**Font & size:** Controles separados para header e footer

#### 3.3.9 Trim Sizes

![Trim Sizes Config](/Users/denisonzimmerdaluz/.gemini/antigravity/brain/71799c84-1d3b-451c-b864-b6eac8fd4b45/atticus-analysis/screenshots/16_trim_sizes_config.png)

| Categoria | Tamanhos |
|-----------|----------|
| **Trade** | 5×8, 5.25×8, 5.5×8.5, 6×9 |
| **International** | A5, B5 |
| **Mass Market** | 4.25×6.87 |
| **Children's** | Tamanhos especiais |
| **Custom** | Input personalizado (W×H) |

---

## 4. Exportação

![Book Details & Export](/Users/denisonzimmerdaluz/.gemini/antigravity/brain/71799c84-1d3b-451c-b864-b6eac8fd4b45/atticus-analysis/screenshots/05_book_details.png)

### 4.1 Metadados do Livro

| Tab | Campos |
|-----|--------|
| **Book details** | Title, Subtitle, Author, Project, Version, Language, Start Page |
| **Publisher details** | Publisher Name, Link, Print ISBN, E-book ISBN, Logo |

### 4.2 Formatos de Exportação

| Formato | Uso | Processo |
|---------|-----|----------|
| **ePub** | E-readers, Apple Books, Kobo | Direto |
| **PDF** | Print-ready (KDP, IngramSpark) | Background process |
| **docx** | Word, edição externa | Quick export (bottom bar) |

### 4.3 Snapshots

- Download snapshot = backup pontual do projeto
- Versionamento manual

### 4.4 Book Statistics

- Chapters count (ex: 21)
- Integrado na página de detalhes

---

## 5. Conta e Configurações

![Account](/Users/denisonzimmerdaluz/.gemini/antigravity/brain/71799c84-1d3b-451c-b864-b6eac8fd4b45/atticus-analysis/screenshots/06_account.png)

### 5.1 Profile Settings

| Seção | Conteúdo |
|-------|----------|
| **My account** | First name, Last name, Email, Website, Avatar |
| **Password** | Atualização de senha |
| **Preferences** | Light / Dark mode |
| **Version Options** | Configurações de versionamento |

### 5.2 Modelo de Negócio

> **Pagamento único** — sem subscription recorrente. Acesso completo a todas as funcionalidades após compra.

---

## 6. Ferramentas Adicionais

### 6.1 Colaboração

![Collaboration Panel](/Users/denisonzimmerdaluz/.gemini/antigravity/brain/71799c84-1d3b-451c-b864-b6eac8fd4b45/atticus-analysis/screenshots/19_collaboration_panel.png)

- **Invite:** Botão no header para convidar colaboradores
- **Comments:** Contagem por capítulo, filtro por tipo
- **Track Changes:** Edições rastreadas com contagem
- **Mentions:** @ menções inline no editor

### 6.2 Goals & Timer

- **Word count goal:** Meta total do projeto
- **Due date:** Prazo de conclusão
- **Writing schedule:** Checkboxes semanais (S, M, T, W, T, F, S)
- **Timer:** Cronômetro de sessão no bottom bar

### 6.3 Smart Quotes

- Conversão automática para aspas tipográficas (curly quotes) 
- **Inconsistencies checker:** Identifica mix de estilos por capítulo

### 6.4 Find & Replace

![Find & Replace](/Users/denisonzimmerdaluz/.gemini/antigravity/brain/71799c84-1d3b-451c-b864-b6eac8fd4b45/atticus-analysis/screenshots/18_find_replace.png)

- Scope: Chapter ou Book inteiro
- Match Case (toggle)
- Whole Word (toggle)

### 6.5 Book Brush Integration

- Ferramenta integrada para criação de assets visuais (capas, marketing)
- Acessível pela galeria de imagens

---

## 7. Análise Técnica & UX

### 7.1 Stack Identificado

| Tecnologia | Evidência |
|------------|-----------|
| **Framework** | React (SPA) |
| **Rendering** | HTML/CSS para preview, Canvas para PDF |
| **API** | REST (cloud sync) |
| **Hosting** | Cloud (auto-sync com indicador) |

### 7.2 UX Patterns

| Pattern | Implementação |
|---------|--------------|
| **Modais** | Book details, export warnings, discard confirmations |
| **Side panels** | Right sidebar deslizante com ferramentas |
| **Tabs** | Horizontal tabs para navegação secundária |
| **Toggles** | Switches para configurações booleanas |
| **Sliders** | Size, width, spacing controls |
| **Dropdowns** | Font selection, alignment, device preview |
| **Drag & drop** | Reordenação de capítulos |
| **WYSIWYG** | Preview em tempo real nas configurações |

### 7.3 Responsividade

- Desktop-first (otimizado para telas grandes)
- Sem evidência de versão mobile nativa

---

## 8. 📊 Feature Matrix Consolidada

| # | Funcionalidade | Categoria | Personalizável | Prioridade Kroj |
|---|----------------|-----------|----------------|-----------------|
| 1 | Login com email/senha | Auth | — | ✅ Replicar |
| 2 | Dashboard com quick actions | Nav | — | ✅ Replicar |
| 3 | Upload de livro (DOCX) | Import | — | ✅ Replicar |
| 4 | Criar novo livro | Project | — | ✅ Replicar |
| 5 | Boxset (agrupamento de livros) | Project | — | 🔄 Fase 2 |
| 6 | My Books (grid/list) | Nav | Sort, Filter | ✅ Replicar |
| 7 | Master Pages | Project | — | 🚀 Inovar |
| 8 | Writing mode (editor) | Editor | — | ✅ Replicar |
| 9 | Formatting mode (design) | Design | — | ✅ Replicar |
| 10 | Bold / Italic / Underline | Editor | — | ✅ Replicar |
| 11 | Strikethrough / Monospace | Editor | — | ✅ Replicar |
| 12 | Smallcaps / Sans Serif | Editor | — | ✅ Replicar |
| 13 | Subscript / Superscript | Editor | — | ✅ Replicar |
| 14 | Headings H2–H6 | Editor | Font, size multiplier | ✅ Replicar |
| 15 | Text alignment (4 opções) | Editor | — | ✅ Replicar |
| 16 | Scene breaks | Editor | Image, text, none | ✅ Replicar |
| 17 | Lists (ordered/unordered) | Editor | — | ✅ Replicar |
| 18 | Hyperlinks | Editor | — | ✅ Replicar |
| 19 | Image insertion | Editor | — | ✅ Replicar |
| 20 | Blockquotes / Callouts | Editor | — | ✅ Replicar |
| 21 | @ Mentions | Editor | — | 🔄 Fase 2 |
| 22 | Indent / Outdent | Editor | — | ✅ Replicar |
| 23 | Undo / Redo | Editor | — | ✅ Replicar |
| 24 | Fullscreen mode | Editor | — | ✅ Replicar |
| 25 | Chapter sidebar (Front/Body/Back) | Structure | Drag reorder | ✅ Replicar |
| 26 | Chapter settings (per-chapter) | Structure | 8+ toggles | ✅ Replicar |
| 27 | Preset layouts | Structure | — | ✅ Replicar |
| 28 | Copyright templates | Structure | — | ✅ Replicar |
| 29 | Full page image | Structure | — | ✅ Replicar |
| 30 | Import chapters | Import | — | ✅ Replicar |
| 31 | 18 formatting themes | Design | Full customization | ✅ Replicar |
| 32 | Custom theme creation | Design | All parameters | ✅ Replicar |
| 33 | Chapter number view (4 formatos) | Design | Font, align, style, size | ✅ Replicar |
| 34 | Drop caps | Design | Font, lines | ✅ Replicar |
| 35 | Lead-in small caps | Design | — | ✅ Replicar |
| 36 | Paragraph style (indent/spaced) | Design | — | ✅ Replicar |
| 37 | Scene break image upload | Design | Width, gallery, Book Brush | ✅ Replicar |
| 38 | Footnotes / Endnotes | Design | Position, size | ✅ Replicar |
| 39 | Print layout (margins, indent) | Design | Units, values | ✅ Replicar |
| 40 | Justified text + Hyphenation | Design | Toggle | ✅ Replicar |
| 41 | Widows & Orphans control | Design | 3 modes | ✅ Replicar |
| 42 | Body font selection | Design | Múltiplas fontes | ✅ Replicar |
| 43 | Font size (9–18pt) | Design | Slider | ✅ Replicar |
| 44 | Line spacing (1.0–2.0) | Design | Presets + slider | ✅ Replicar |
| 45 | Large print mode | Design | Toggle | ✅ Replicar |
| 46 | Header/Footer layouts | Design | Presets, fonts, sizes | ✅ Replicar |
| 47 | Trim sizes (trade/intl/mass) | Design | Standard + custom | ✅ Replicar |
| 48 | Multi-device preview | Design | 8+ devices | ✅ Replicar |
| 49 | ePub export | Export | — | ✅ Replicar |
| 50 | PDF export (print-ready) | Export | Background process | ✅ Replicar |
| 51 | docx export | Export | Quick export | ✅ Replicar |
| 52 | Snapshots (version backup) | Export | — | ✅ Replicar |
| 53 | Book cover management | Metadata | Upload, preview | ✅ Replicar |
| 54 | Publisher metadata & ISBN | Metadata | — | ✅ Replicar |
| 55 | Collaboration (invite, comments) | Collab | — | 🔄 Fase 2 |
| 56 | Track Changes | Collab | — | 🔄 Fase 2 |
| 57 | Word count goals | Tools | Per project | ✅ Replicar |
| 58 | Writing timer | Tools | — | ✅ Replicar |
| 59 | Find & Replace | Tools | Scope, match options | ✅ Replicar |
| 60 | Smart Quotes converter | Tools | + inconsistency checker | 🚀 Inovar |
| 61 | Dark/Light mode | UX | — | ✅ Replicar |
| 62 | Auto-save (cloud sync) | UX | — | ✅ Replicar |
| 63 | Book Brush integration | External | — | 🚀 Inovar |

---

## 📹 Gravações das Sessões

````carousel
![Dashboard e navegação](/Users/denisonzimmerdaluz/.gemini/antigravity/brain/71799c84-1d3b-451c-b864-b6eac8fd4b45/atticus_dashboard_1774116712124.webp)
<!-- slide -->
![Editor e ferramentas de escrita](/Users/denisonzimmerdaluz/.gemini/antigravity/brain/71799c84-1d3b-451c-b864-b6eac8fd4b45/atticus_editor_explore_1774116945535.webp)
<!-- slide -->
![Formatação e temas — deep dive](/Users/denisonzimmerdaluz/.gemini/antigravity/brain/71799c84-1d3b-451c-b864-b6eac8fd4b45/atticus_formatting_themes_1774117550929.webp)
<!-- slide -->
![Exportação e conta](/Users/denisonzimmerdaluz/.gemini/antigravity/brain/71799c84-1d3b-451c-b864-b6eac8fd4b45/atticus_export_account_1774124268970.webp)
````

---

## 🎯 Conclusão para o Kroj

### O que Replicar (MVP)
- Editor WYSIWYG com Writing/Formatting split
- Sistema de temas com todas as 9 seções configuráveis
- Preview multi-dispositivo
- Exportação ePub/PDF/docx
- Chapter management com front/back matter

### O que Melhorar (Oportunidades)
- **AI-assisted writing** — Atticus não tem IA
- **Real-time co-editing** — Atticus tem apenas comentários/track changes
- **Version history visual** — Atticus tem apenas snapshots manuais
- **Template marketplace** — Atticus temas são fixos (sem marketplace)
- **Mobile responsiveness** — Atticus é desktop-only

### O que Inovar (Diferenciação)
- 🧠 IA integrada para formatação automatica inteligente
- 📊 Analytics de escrita (produtividade, legibilidade)
- 🎨 Marketplace de temas da comunidade
- 📱 App mobile nativo
- 🔗 Publicação direta para KDP/Apple Books/Kobo
