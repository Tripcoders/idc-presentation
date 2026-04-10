# IDC Client Portal — Frontend & UX Flow Document

> **Project:** IDC (Industrial Development Corporation of South Africa) Client Portal  
> **Document Type:** Frontend Architecture & User Experience Flow Specification  
> **Version:** 1.0  
> **Date:** 2025-07-09  
> **Classification:** Internal — Development Team  

---

## Table of Contents

1. [Design System](#1-design-system)
2. [Page Structure & Layout](#2-page-structure--layout)
3. [Detailed User Flows](#3-detailed-user-flows)
4. [Key Pages — Wireframe Descriptions](#4-key-pages--wireframe-descriptions)
5. [Responsive Design Strategy](#5-responsive-design-strategy)
6. [Accessibility Requirements](#6-accessibility-requirements)
7. [Performance Targets](#7-performance-targets)
8. [State Management & Data Flow](#8-state-management--data-flow)
9. [Internationalization & Localization](#9-internationalization--localization)
10. [Security UX Patterns](#10-security-ux-patterns)
11. [Error Handling & Edge Cases](#11-error-handling--edge-cases)
12. [Analytics & Tracking](#12-analytics--tracking)

---

## 1. Design System

### 1.1 Design Principles

| Principle | Description |
|---|---|
| **Trust & Authority** | The IDC is a national government entity. Every visual and interaction choice must reinforce credibility — clean typography, generous whitespace, institutional gravitas, and the IDC brand identity. |
| **Accessibility First** | WCAG 2.1 AA compliance is a hard requirement, not an afterthought. All components are built keyboard-navigable and screen-reader compatible from day one. South Africa's National Accessibility Policy is a guiding reference. |
| **Mobile-First Responsive** | Many South African users access the internet primarily via mobile devices. The layout starts at 320px and progressively enhances. Critical flows (application submission, document upload) must be fully functional on mobile. |
| **Performance-Optimized** | Users in regions with limited connectivity (2G/3G) must be served. Lazy loading, code splitting, compressed assets, and offline-capable service workers are mandatory. |
| **Inclusive Design** | Support for all 11 official South African languages. Content must be understandable at a Grade 10 reading level. Use plain language, avoid jargon, and provide contextual help. |

### 1.2 Color System

```
┌─────────────────────────────────────────────────────────┐
│                    PRIMARY PALETTE                       │
├────────────┬──────────────┬──────────────────────────────┤
│ IDC Blue   │ #00838F      │ Primary actions, nav links,  │
│            │              │ active states, brand accent   │
├────────────┼──────────────┼──────────────────────────────┤
│ Dark Navy  │ #0B1220      │ Header, footer, sidebar bg,  │
│            │              │ deep backgrounds             │
├────────────┼──────────────┼──────────────────────────────┤
│ Gold       │ #C19A6B      │ CTA buttons, important       │
│            │              │ highlights, secondary brand  │
├────────────┼──────────────┼──────────────────────────────┤
│ Light Gold │ #E8D5B7      │ Hover states, subtle accents │
└────────────┴──────────────┴──────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   SEMANTIC COLORS                        │
├────────────┬──────────────┬──────────────────────────────┤
│ Success    │ #2E7D32      │ Approved, completed, confirmed│
│ Warning    │ #F57F17      │ Pending review, attention    │
│ Error      │ #C62828      │ Failed, rejected, required   │
│ Info       │ #1565C0      │ Informational, tips          │
└────────────┴──────────────┴──────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   NEUTRAL PALETTE                        │
├────────────┬──────────────┬──────────────────────────────┤
│ Gray 50    │ #FAFAFA      │ Page background              │
│ Gray 100   │ #F5F5F5      │ Card backgrounds             │
│ Gray 200   │ #EEEEEE      │ Dividers, borders            │
│ Gray 300   │ #E0E0E0      │ Disabled states              │
│ Gray 400   │ #BDBDBD      │ Placeholder text             │
│ Gray 500   │ #9E9E9E      │ Secondary text               │
│ Gray 600   │ #757575      │ Body text                    │
│ Gray 700   │ #616161      │ Headings, emphasis           │
│ Gray 800   │ #424242      │ Primary text                 │
│ Gray 900   │ #212121      │ Bold headings                │
│ Background │ #F8FAFC      │ Main content area            │
└────────────┴──────────────┴──────────────────────────────┘
```

**Usage Rules:**
- IDC Blue is used for primary buttons, active navigation items, and interactive elements.
- Dark Navy is reserved for the global header, footer, and sidebar backgrounds.
- Gold is used sparingly — only for the most important call-to-action buttons and critical highlights.
- Semantic colors are never used decoratively; they always convey meaning (success, warning, error, info).
- All text-color-on-background combinations must pass a minimum 4.5:1 contrast ratio (AA standard).

### 1.3 Typography

```
FONT STACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Heading:    'Inter', 'Plus Jakarta Sans', sans-serif
Body:       'Inter', system-ui, sans-serif
Monospace:  'JetBrains Mono', 'Fira Code', monospace

MODULAR TYPE SCALE (1.25 — Major Third)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Display:    48px / 56px  line-height: 1.1    weight: 700
H1:         36px / 44px  line-height: 1.2    weight: 700
H2:         30px / 36px  line-height: 1.25   weight: 600
H3:         24px / 30px  line-height: 1.3    weight: 600
H4:         20px / 26px  line-height: 1.35   weight: 600
H5:         18px / 24px  line-height: 1.4    weight: 500
H6:         16px / 22px  line-height: 1.4    weight: 500
Body Large: 18px / 28px  line-height: 1.55   weight: 400
Body:       16px / 24px  line-height: 1.5    weight: 400
Body Small: 14px / 20px  line-height: 1.5    weight: 400
Caption:    12px / 16px  line-height: 1.4    weight: 400
Overline:   12px / 16px  line-height: 1.33   weight: 500  letter-spacing: 0.08em
```

**Typography Rules:**
- Minimum body text size: 14px (used sparingly for metadata/captions).
- Default body text: 16px for optimal readability.
- Monospace font is used exclusively for reference numbers, codes, and financial figures.
- Font weights are limited to: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold).

### 1.4 Component Library (shadcn/ui Based)

All UI components are built on top of [shadcn/ui](https://ui.shadcn.com/) primitives with Tailwind CSS, customised to the IDC design tokens.

#### Buttons

| Variant | Usage | Style |
|---|---|---|
| **Primary** | Main CTAs (Submit, Apply, Save) | IDC Blue bg, white text, subtle shadow |
| **Secondary** | Supporting actions (Cancel, Back) | White bg, IDC Blue border & text |
| **Ghost** | Inline/minimal actions | Transparent bg, text only, hover bg |
| **Destructive** | Dangerous actions (Delete, Withdraw) | Red bg, white text |
| **Outline** | Tertiary actions | Transparent bg, gray border & text |
| **Gold CTA** | Critical conversion actions | Gold bg, Dark Navy text |
| **Loading** | Any button during async ops | Same as variant + spinner + disabled |

- Size options: `sm` (32px h), `md` (40px h — default), `lg` (48px h).
- All buttons include focus-visible ring, disabled states, and loading spinners.
- Icon-only buttons must have `aria-label` and a minimum 40×40px touch target.

#### Form Inputs

| Component | Features |
|---|---|
| **Text Input** | Floating label, validation states, helper text, prefix/suffix icons |
| **Select** | Searchable dropdown, multi-select, grouped options, clearable |
| **Checkbox** | Label inline, indeterminate state, group with heading |
| **Radio** | Card-style radio groups for complex selections |
| **Textarea** | Character count, auto-resize, markdown support toggle |
| **File Upload** | Drag-and-drop zone, progress indicator, file type validation, multi-file |
| **Date Picker** | Calendar widget, date range mode, SA date format (DD/MM/YYYY) |
| **Currency Input** | R prefix, thousand separators, min/max validation |
| **Phone Input** | +27 prefix, SA number format, phone verification trigger |
| **OTP Input** | Individual digit boxes, auto-advance, paste support |

#### Cards

| Type | Usage |
|---|---|
| **Standard** | General content grouping with header, body, optional footer |
| **Interactive** | Clickable cards with hover lift, pointer cursor, focus ring |
| **Stat** | Dashboard KPI display — large number, label, trend indicator |
| **Alert** | Inline notifications with icon, message, dismiss button |
| **Profile** | User/org summary with avatar, key details, action menu |

#### Modals & Dialogs

- Confirmation dialogs (destructive actions).
- Form dialogs (inline data entry without page navigation).
- Detail dialogs (previewing documents, viewing info).
- All modals trap focus, close on Escape, and have accessible titles.

#### Toast Notifications

- Four variants: success (green), error (red), warning (amber), info (blue).
- Auto-dismiss after 5 seconds with manual close option.
- Positioned bottom-right; stacks up to 3.
- Screen reader announcement via `aria-live="polite"`.

#### Data Tables

- Sortable columns with direction indicators.
- Client-side and server-side pagination (10/25/50/100 rows).
- Column-specific filters (text search, dropdown, date range).
- Row selection with bulk action toolbar.
- Export to CSV and PDF.
- Responsive: horizontal scroll with sticky first column on mobile.

#### Navigation Components

| Component | Usage |
|---|---|
| **Tabs** | Page-level content switching (e.g., Application sections) |
| **Accordion** | FAQ, collapsible form sections, information panels |
| **Breadcrumbs** | Deep page navigation (e.g., Funding > My Applications > APP-2024-0042) |
| **Stepper/Wizard** | Multi-step forms with progress, validation per step, save-and-resume |
| **Pagination** | Lists, search results, document vaults |
| **Sidebar Navigation** | Primary portal navigation, collapsible, badge counts |

#### Feedback & Loading

| Component | Usage |
|---|---|
| **Skeleton** | Content loading placeholders (shimmer animation) |
| **Spinner** | Button/action loading (small circle spinner) |
| **Progress Bar** | Upload progress, step completion |
| **Empty State** | No-data illustrations with helpful CTAs |
| **Error State** | Error illustrations with retry/resolution actions |

### 1.5 Spacing & Layout

```
GRID SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Base unit:        8px
Spacing tokens:   4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px

LAYOUT DIMENSIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Container max-w:       1280px (centered)
Wide container:        1440px (hero sections)
Page padding:          24px desktop | 16px mobile
Sidebar width:         280px (expanded) | 72px (collapsed)
Header height:         64px
Footer min-height:     80px

COMPONENT SPACING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Card padding:          24px (internal)
Card border-radius:    8px
Card gap:              16px
Section gap:           32px (standard) | 48px (major sections)
Form field gap:        16px (vertical) | 24px (horizontal groups)
Button gap:            12px (button groups)
Table cell padding:    12px 16px
Toast width:           380px max
Modal max-width:       560px (default) | 720px (wide) | 90vw (fullscreen on mobile)
```

**Elevation System (box-shadow tokens):**

| Level | Token | Usage |
|---|---|---|
| 0 | none | Flat elements, cards in lists |
| 1 | 0 1px 2px rgba(0,0,0,0.05) | Raised cards, dropdowns |
| 2 | 0 4px 6px rgba(0,0,0,0.07) | Modals, popovers |
| 3 | 0 10px 15px rgba(0,0,0,0.1) | Sticky headers, high-priority modals |
| 4 | 0 20px 25px rgba(0,0,0,0.15) | Full-screen overlays |

---

## 2. Page Structure & Layout

### 2.1 Global Layout

```
┌──────────────────────────────────────────────────────────┐
│  HEADER (64px fixed)                                     │
│  ┌────────┬──────────────────────────┬──────────────────┐ │
│  │  Logo  │    Navigation Links       │ 🔔  👤 User Menu│ │
│  └────────┴──────────────────────────┴──────────────────┘ │
├──────────┬───────────────────────────────────────────────┤
│ SIDEBAR  │  MAIN CONTENT AREA                            │
│ (280px   │                                               │
│  or      │  ┌─────────────────────────────────────────┐  │
│  72px)   │  │  Breadcrumbs                           │  │
│          │  ├─────────────────────────────────────────┤  │
│          │  │                                         │  │
│          │  │  Page Title + Actions                   │  │
│          │  │                                         │  │
│          │  │  Page Content                           │  │
│          │  │                                         │  │
│          │  │                                         │  │
│          │  │                                         │  │
│          │  │                                         │  │
│          │  └─────────────────────────────────────────┘  │
├──────────┴───────────────────────────────────────────────┤
│  FOOTER                                                  │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ Links  │  Legal  │  POPIA  │  IDC © 2025            │ │
│  └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

#### Header
- **Logo:** IDC wordmark (left-aligned), links to Dashboard.
- **Primary Navigation:** Funding, Portfolio, Bursaries, Tenders, Documents, Messages.
- **Utility Area (right):**
  - Global search icon (opens command palette).
  - Notification bell with unread count badge.
  - User avatar dropdown: Profile, Settings, Logout.
- **Mobile:** Hamburger menu triggers slide-out sidebar; no horizontal nav scroll.

#### Sidebar
- **Desktop:** Persistent, collapsible (expanded by default, remembers user preference).
- **Sections:** Grouped with sub-items; collapsible groups.
- **Active state:** IDC Blue left border + light background.
- **Badges:** Unread message count, pending action count.
- **Collapsed state:** Icons only; expand on hover (tooltip labels).
- **Mobile:** Hidden by default; activated via hamburger menu; overlays content with backdrop.

#### Main Content
- Scrollable independently of header/footer.
- Max-width container centered within.
- Padding: 24px desktop, 16px mobile.

#### Footer
- Links: About IDC, Contact, FAQ, Terms & Conditions, Privacy Policy, POPIA Notice.
- Legal text: © 2025 Industrial Development Corporation of South Africa.
- Links to relevant legislation (PFMA, POPIA).
- Responsive: stacks vertically on mobile.

#### Cookie Consent Banner
- Appears on first visit, bottom of page.
- Two buttons: "Accept All" and "Customise".
- Does not block content; dismisses on scroll (desktop only).
- Respects saved preference.

### 2.2 Navigation Structure

```
Home (Dashboard)
├── Funding
│   ├── Apply for Funding          → /funding/apply
│   ├── My Applications             → /funding/applications
│   │   └── [Application Detail]    → /funding/applications/:id
│   ├── Find a Fund                 → /funding/products
│   └── Funding Checklist           → /funding/checklist
├── Portfolio
│   ├── My Loans                    → /portfolio/loans
│   │   └── [Loan Detail]           → /portfolio/loans/:id
│   ├── Repayments                  → /portfolio/repayments
│   ├── Statements                  → /portfolio/statements
│   └── Collateral & Covenants      → /portfolio/collateral
├── Bursaries
│   ├── Available Programmes        → /bursaries/programmes
│   ├── My Applications             → /bursaries/applications
│   │   └── [Application Detail]    → /bursaries/applications/:id
│   ├── Progress Reports            → /bursaries/reports
│   └── Disbursements               → /bursaries/disbursements
├── Tenders
│   ├── Active Tenders              → /tenders/active
│   │   └── [Tender Detail]         → /tenders/active/:id
│   ├── My Bids                     → /tenders/bids
│   ├── Vendor Registration         → /tenders/vendor-register
│   └── Tender Archive              → /tenders/archive
├── Documents
│   ├── My Documents                → /documents
│   ├── Shared With Me              → /documents/shared
│   └── Upload Document             → /documents/upload
├── Messages
│   ├── Inbox                       → /messages/inbox
│   ├── Sent                        → /messages/sent
│   ├── [Message Thread]            → /messages/:id
│   └── Compose                     → /messages/compose
├── Profile
│   ├── Personal Details            → /profile/personal
│   ├── Organisation                → /profile/organisation
│   ├── Security                    → /profile/security
│   ├── Notification Settings       → /profile/notifications
│   └── Active Sessions             → /profile/sessions
└── Help & Support
    ├── FAQ                         → /help/faq
    ├── Contact Us                  → /help/contact
    └── Submit a Ticket             → /help/ticket
```

#### Navigation Rules
- **Role-based visibility:** Menu items are filtered by user role (Applicant, Student, Vendor, IDC Staff).
- **Deep linking:** Every page has a unique, shareable URL.
- **Breadcrumb navigation:** All pages below level 2 display breadcrumbs.
- **Active page highlighting:** Sidebar and header both reflect current page.
- **Route guards:** Protected routes redirect to login; role-restricted routes show 403.

---

## 3. Detailed User Flows

### 3.1 Registration Flow

```
[Entry Point]
    │
    ▼
┌─────────────────────────┐
│ Step 1: Welcome &       │
│ Account Type Selection  │
│                         │
│ ○ Applicant (Funding)   │
│ ○ Student (Bursaries)   │
│ ○ Vendor (Tenders)      │
│                         │
│        [Continue]        │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Step 2: Personal        │
│ Details                 │
│                         │
│ • First Name *          │
│ • Last Name *           │
│ • Email Address *       │
│ • SA ID Number /        │
│   Passport Number *     │
│ • Mobile Number *       │
│                         │
│ [Back]        [Continue]│
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Step 3: Email           │
│ Verification            │
│                         │
│ ✉️ Verification code    │
│    sent to user@...     │
│                         │
│ [_][_][_][_][_][_]      │
│                         │
│ Resend code (60s)       │
│                         │
│ [Back]        [Verify]  │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Step 4: Phone           │
│ Verification (OTP)      │
│                         │
│ 📱 OTP sent to +27...   │
│                         │
│ [_][_][_][_][_][_]      │
│                         │
│ Resend OTP (60s)        │
│ Change number           │
│                         │
│ [Back]        [Verify]  │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Step 5: Create          │
│ Password                │
│                         │
│ Password: [••••••••]    │
│ Confirm:  [••••••••]    │
│                         │
│ Strength: ████░░ Strong │
│ ✓ 8+ characters         │
│ ✓ Uppercase             │
│ ✓ Number                │
│ ✓ Special character     │
│                         │
│ [Back]        [Continue]│
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Step 6: MFA Setup       │
│ (Strongly Recommended)  │
│                         │
│ Scan QR code with       │
│ authenticator app       │
│                         │
│ ┌───────────────┐       │
│ │   [QR Code]   │       │
│ └───────────────┘       │
│                         │
│ Backup codes:           │
│ ABC123 DEF456 GHI789    │
│ [Copy Codes]            │
│                         │
│ [Back]  [Skip] [Confirm]│
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Step 7: Profile         │
│ Completion              │
│                         │
│ Industry: [Select ▼]    │
│ Sector:   [Select ▼]    │
│ Province: [Select ▼]    │
│                         │
│ Organisation (if applicable):│
│ • Company Name          │
│ • Registration Number   │
│ • Role in Organisation  │
│                         │
│ [Back]        [Complete]│
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Step 8: Terms Acceptance│
│                         │
│ ☑ I accept the Terms    │
│   and Conditions        │
│ ☑ I consent to POPIA    │
│   data processing       │
│ ☑ I confirm the         │
│   information is true   │
│                         │
│        [Complete]       │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Registration Complete!  │
│                         │
│ ✓ Account created       │
│                         │
│ [Go to Dashboard]       │
└─────────────────────────┘
```

**UX Details:**
- Progress stepper at top of form (Steps 1–8).
- Save progress as draft — resume via emailed link.
- All fields validated on blur (inline error messages).
- "Back" navigates without data loss.
- Session timeout warning at 20 minutes with extend option.

### 3.2 Login Flow

```
[Entry Point]
    │
    ▼
┌─────────────────────────┐
│ Login Page              │
│                         │
│ IDC Logo                │
│                         │
│ Email/Username:         │
│ [________________]      │
│                         │
│ Password:               │
│ [________________]      │
│                         │
│ [☑ Remember me]         │
│ [Forgot password?]      │
│                         │
│    [Sign In]            │
│                         │
│ Don't have an account?  │
│ [Register]              │
└────────────┬────────────┘
             │
             ├── Invalid credentials → Error shake + message
             │
             ├── Account locked → Message + "Unlock via email" link
             │
             ├── MFA enabled ──┐
             │                 ▼
             │    ┌─────────────────────────┐
             │    │ MFA Challenge           │
             │    │                         │
             │    │ Enter code from your    │
             │    │ authenticator app:      │
             │    │                         │
             │    │ [_][_][_][_][_][_]      │
             │    │                         │
             │    │ [Use backup code]       │
             │    │                         │
             │    │    [Verify]             │
             │    └────────────┬────────────┘
             │                 │
             ├── First login ──┐
             │                 ▼
             │    ┌─────────────────────────┐
             │    │ Terms & Conditions      │
             │    │ (Full page scrollable)  │
             │    │                         │
             │    │ [☑ I Accept]            │
             │    │                         │
             │    │    [Continue]           │
             │    └────────────┬────────────┘
             │                 │
             ├── Password expired ──┐
             │                     ▼
             │    ┌─────────────────────────┐
             │    │ Force Password Change   │
             │    │                         │
             │    │ Current: [________]     │
             │    │ New:     [________]     │
             │    │ Confirm: [________]     │
             │    │                         │
             │    │    [Update Password]    │
             │    └─────────────────────────┘
             │
             ▼
┌─────────────────────────┐
│ Dashboard               │
│ (Redirect with flash    │
│  "Welcome back, [Name]")│
└─────────────────────────┘
```

**Session Management:**
- Session duration: 30 minutes idle timeout (configurable).
- "Remember me" extends to 7 days (refresh token rotation).
- Active sessions visible in Profile > Active Sessions.
- Force-logout capability on any device.
- Concurrent session limit: 3 devices.

### 3.3 Funding Application Flow (Multi-Step Wizard)

This is the most complex and critical flow in the portal. It uses a 7-step wizard with save-and-resume capability.

```
┌──────────────────────────────────────────────────────────┐
│  Funding Application Wizard                              │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐     │
│  │  1   │→│  2   │→│  3   │→│  4   │→│  5   │→ 6 → 7  │
│  │Eli-  │  │Org   │  │Fund  │  │Finan-│  │Busi- │     │
│  │gible │  │Deta- │  │Request│  │cials │  │ness  │     │
│  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘     │
│                                                          │
│  Progress: ████████████░░░░░░░░░░░░ 40%                  │
│  Estimated time remaining: ~20 minutes                   │
└──────────────────────────────────────────────────────────┘
```

---

#### Step 1: Eligibility Check

```
┌──────────────────────────────────────────────────┐
│ Step 1 of 7: Eligibility Check          [Save]  │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ Minimum Funding Amount                       │ │
│ │                                              │ │
│ │ ⚠️ IDC funding starts from R1,000,000.       │ │
│ │    Is your funding requirement at least R1M? │ │
│ │                                              │ │
│ │ ○ Yes, R1,000,000 or more                    │ │
│ │ ○ No, I need less than R1,000,000            │ │
│ │   → [Redirect to SME partners info]          │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ Industry / Sector                            │ │
│ │                                              │ │
│ │ Primary Industry: [Select ▼]                 │ │
│ │ ┌──────────────────────────────────┐         │ │
│ │ │ Manufacturing                   │         │ │
│ │ │ Agro-processing                 │         │ │
│ │ │ Mining & Minerals               │         │ │
│ │ │ Energy                          │         │ │
│ │ │ Tourism                         │         │ │
│ │ │ Information & Technology        │         │ │
│ │ │ Health & Pharmaceuticals        │         │ │
│ │ │ Infrastructure                  │         │ │
│ │ │ Creative Industries             │         │ │
│ │ │ Other: [________]               │         │ │
│ │ └──────────────────────────────────┘         │ │
│ │                                              │ │
│ │ Sub-sector:      [Select ▼]                 │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ Quick Eligibility Questions                  │ │
│ │                                              │ │
│ │ ☑ Is the project located in South Africa?    │ │
│ │ ☑ Is this a new or expansion project?       │ │
│ │ ☑ Does the enterprise have a valid B-BBEE    │ │
│ │   certificate?                               │ │
│ │ ☑ Is the entity registered with CIPC?        │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│                  [Cancel]  [Continue →]           │
└──────────────────────────────────────────────────┘
```

**Validation:**
- If any question is "No," display contextual guidance (not a blocker, but advisory).
- CIPC lookup triggers real-time API validation (company name auto-populates if found).

---

#### Step 2: Organisation Details

```
┌──────────────────────────────────────────────────┐
│ Step 2 of 7: Organisation Details       [Save]  │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ Company Information                          │ │
│ │                                              │ │
│ │ Company Name:   [Auto-filled or manual]      │ │
│ │ Registration #: [CK-20XX/XXXXXX/XX]          │ │
│ │ CIPC Status:    ✓ Verified (green badge)    │ │
│ │                                              │ │
│ │ Entity Type:    [Select ▼]                   │ │
│ │  - Private Company (Pty) Ltd                 │ │
│ │  - Public Company                            │ │
│ │  - Close Corporation                         │ │
│ │  - Trust                                     │ │
│ │  - Non-Profit Company                        │ │
│ │  - Cooperative                               │ │
│ │                                              │ │
│ │ Date of Incorporation: [DD/MM/YYYY]          │ │
│ │ Tax Number (SARS):  [______]  ✓ Verified     │ │
│ │ B-BBEE Level:       [Level ▼]               │ │
│ │ B-BBEE Certificate: [Upload PDF]             │ │
│ │ Annual Turnover:    [R ________]             │ │
│ │ Number of Employees: [____]                  │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ Registered Address                           │ │
│ │                                              │ │
│ │ Street Address:  [__________]                │ │
│ │ City/Town:       [__________]                │ │
│ │ Province:        [Select ▼]                  │ │
│ │ Postal Code:     [______]                    │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ Key Contacts (Add multiple)                  │ │
│ │                                              │ │
│ │ [+ Add Contact]                              │ │
│ │ ┌─────────────────────────────────────────┐  │ │
│ │ │ Name:     John Doe     Role: CEO       │  │ │
│ │ │ Email:    j@corp.co.za  Phone: +27...  │  │ │
│ │ │ [Edit] [Remove]                        │  │ │
│ │ └─────────────────────────────────────────┘  │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│             [← Back]  [Save Draft]  [Continue →] │
└──────────────────────────────────────────────────┘
```

**Integration Points:**
- **CIPC API:** Real-time company registration verification. Returns company name, registration date, entity type, directors.
- **SARS API:** Tax number validation (third-party integration via SARS eFiling).
- **Address autocomplete:** Integration with Google Maps API or SA Post Office address database.

---

#### Step 3: Funding Request

```
┌──────────────────────────────────────────────────┐
│ Step 3 of 7: Funding Request            [Save]  │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ Funding Details                              │ │
│ │                                              │ │
│ │ Amount Requested:  [R _________]             │ │
│ │                    Min: R1,000,000           │ │
│ │                                              │ │
│ │ Funding Product:   [Select ▼]                │ │
│ │ ┌──────────────────────────────────┐         │ │
│ │ │ 📋 View Product Catalog         │         │ │
│ │ │    → Opens "Find a Fund" modal  │         │ │
│ │ └──────────────────────────────────┘         │ │
│ │                                              │ │
│ │ Purpose of Funding: [Select ▼]               │ │
│ │  - New business/start-up                     │ │
│ │  - Expansion/growth                          │ │
│ │  - Asset finance                             │ │
│ │  - Working capital                           │ │
│ │  - Property development                      │ │
│ │  - Refinancing                               │ │
│ │  - Share acquisition                         │ │
│ │                                              │ │
│ │ Project Title:   [__________]                │ │
│ │ Project Description:                         │ │
│ │ [                                    ]       │ │
│ │ [                                    ]       │ │
│ │ [                                    ]       │ │
│ │                              2000/3000 chars │ │
│ │                                              │ │
│ │ Expected Start Date: [DD/MM/YYYY]            │ │
│ │ Expected Completion: [DD/MM/YYYY]            │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ Project Location                             │ │
│ │                                              │ │
│ │ Province:   [Select ▼]                       │ │
│ │ District:   [Select ▼]                       │ │
│ │ Is this a Special Economic Zone?             │ │
│ │   ○ Yes  ○ No                                │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│             [← Back]  [Save Draft]  [Continue →] │
└──────────────────────────────────────────────────┘
```

---

#### Step 4: Financial Information

```
┌──────────────────────────────────────────────────┐
│ Step 4 of 7: Financial Information       [Save]  │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ Financial Statements                         │ │
│ │                                              │ │
│ │ Audited Financial Statements                 │ │
│ │ ┌────────────────────────────────────────┐   │ │
│ │ │ 📤 Drag & drop files here             │   │ │
│ │ │    or click to browse                 │   │ │
│ │ │                                        │   │ │
│ │ │ Accepted: PDF, XLSX, XLS              │   │ │
│ │ │ Max size: 25MB per file               │   │ │
│ │ └────────────────────────────────────────┘   │ │
│ │                                              │ │
│ │ Year 1: [Upload]  Year: [2023 ▼]  ✓ Done    │ │
│ │ Year 2: [Upload]  Year: [2022 ▼]  ✓ Done    │ │
│ │                                              │ │
│ │ Latest Management Accounts:                  │ │
│ │ [Upload] (Max 6 months old)                  │ │
│ │                                              │ │
│ │ Financial Projections (3-5 years):           │ │
│ │ [Upload]                                     │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ Existing Debt Schedule                       │ │
│ │                                              │ │
│ │ Lender:    [________]  Amount: [R____]      │ │
│ │ Monthly:   [R____]     Outstanding: [R____] │ │
│ │                                              │ │
│ │ [+ Add Debt Entry]                           │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ Bank Statements                              │ │
│ │                                              │ │
│ │ Last 3 months bank statements:               │ │
│ │ [Upload]                                     │ │
│ │                                              │ │
│ │ Bank Name:  [Select ▼]                       │ │
│ │ Account #:  [________]                       │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│             [← Back]  [Save Draft]  [Continue →] │
└──────────────────────────────────────────────────┘
```

**Upload Component Features:**
- Drag-and-drop with click fallback.
- File type validation (client + server).
- File size limit with progress bar.
- Virus scanning indicator.
- Preview for PDFs (first page thumbnail).
- Replace/remove after upload.
- Chunked upload for large files (>10MB).
- Resume interrupted uploads.

---

#### Step 5: Business Plan

```
┌──────────────────────────────────────────────────┐
│ Step 5 of 7: Business Plan               [Save]  │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ Business Plan Documents                      │ │
│ │                                              │ │
│ │ Executive Summary:   [Upload PDF]            │ │
│ │ Business Plan:       [Upload PDF]            │ │
│ │ Market Analysis:     [Upload PDF]            │ │
│ │ Management Team Profiles:                    │ │
│ │   [Upload PDF] or fill in below:             │ │
│ │                                              │ │
│ │ ┌────────────────────────────────────────┐   │ │
│ │ │ Team Member 1                         │   │ │
│ │ │ Name: [________]                      │   │ │
│ │ │ Title/Role: [________]                │   │ │
│ │ │ Qualifications: [________]            │   │ │
│ │ │ Experience: [________]                │   │ │
│ │ │ CV: [Upload]                          │   │ │
│ │ └────────────────────────────────────────┘   │ │
│ │ [+ Add Team Member]                          │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│             [← Back]  [Save Draft]  [Continue →] │
└──────────────────────────────────────────────────┘
```

---

#### Step 6: Supporting Documents

```
┌──────────────────────────────────────────────────┐
│ Step 6 of 7: Supporting Documents        [Save]  │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ Required Documents Checklist                 │ │
│ │                                              │ │
│ │ ☑ ID / Passport of all shareholders         │ │
│ │   [Upload]                                    │ │
│ │ ☑ CIPC Registration Certificate              │ │
│ │   [Upload] ✓ uploaded_corp_reg.pdf           │ │
│ │ ☑ Tax Clearance Certificate (SARS)           │ │
│ │   [Upload]                                    │ │
│ │ ☑ B-BBEE Certificate                         │ │
│ │   [Upload] ✓ bbee_cert.pdf                   │ │
│ │ ☑ Shareholder Agreement / MOA                │ │
│ │   [Upload]                                    │ │
│ │ ☑ Contracts / Letters of Intent              │ │
│ │   [Upload]                                    │ │
│ │ ☐ Municipal/Zoning Approvals                 │ │
│ │   [Upload]                                    │ │
│ │ ☐ Environmental Impact Assessment            │ │
│ │   [Upload]                                    │ │
│ │ ☐ Water Use License                          │ │
│ │   [Upload]                                    │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ Additional Documents                          │ │
│ │                                              │ │
│ │ [+ Upload Additional Document]               │ │
│ │                                              │ │
│ │ ┌──────────────────────────────────────┐     │ │
│ │ │ 📄 lease_agreement.pdf  2.3MB  [🗑] │     │ │
│ │ │ 📄 supplier_quote.pdf    1.1MB  [🗑] │     │ │
│ │ └──────────────────────────────────────┘     │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│  Completion: 6 of 9 required documents          │
│  ████████████████░░░░░ 67%                       │
│                                                  │
│             [← Back]  [Save Draft]  [Continue →] │
└──────────────────────────────────────────────────┘
```

---

#### Step 7: Review & Submit

```
┌──────────────────────────────────────────────────┐
│ Step 7 of 7: Review & Submit             [Save]  │
│                                                  │
│ ╔════════════════════════════════════════════╗   │
│ ║  ⚠️ Please review all sections before      ║   │
│ ║     submitting. Changes cannot be made      ║   │
│ ║     after submission.                       ║   │
│ ╚════════════════════════════════════════════╝   │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ Application Summary                          │ │
│ │                                              │ │
│ │ Company:        Apex Manufacturing (Pty) Ltd │ │
│ │ Sector:         Manufacturing                │ │
│ │ Funding Amount: TBD                          │ │
│ │ Product:        Direct Business Investment   │ │
│ │ Purpose:        Expansion                    │ │
│ │                                              │ │
│ │ [Edit Section] (links back to relevant step) │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ Documents Summary                            │ │
│ │                                              │ │
│ │ Financials:       ✓ 3 of 3 uploaded          │ │
│ │ Business Plan:    ✓ 2 of 2 uploaded          │ │
│ │ Supporting Docs:  ⚠ 6 of 9 uploaded         │ │
│ │                                              │ │
│ │ Note: Missing documents can be uploaded      │ │
│ │ after submission via the application page.   │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ Declarations                                  │ │
│ │                                              │ │
│ │ ☑ I declare that all information provided    │ │
│ │   is true and correct.                       │ │
│ │ ☑ I understand that providing false          │ │
│ │   information is a criminal offence.         │ │
│ │ ☑ I consent to the IDC verifying all         │ │
│ │   information with third parties.            │ │
│ │ ☑ I consent to POPIA-compliant processing    │ │
│ │   of my personal information.                │ │
│ │ ☑ I accept the IDC Terms & Conditions.       │ │
│ │                                              │ │
│ │ Digital Signature:                           │ │
│ │ [Type full name as signature]                │ │
│ │ [________________]                           │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│           [← Back]     [Submit Application]      │
│                                                   │
│ ┌──────────────────────────────────────────────┐  │
│ │ ⚠️ SUBMISSION WARNING (Modal)                │  │
│ │                                              │  │
│ │ You are about to submit your funding          │  │
│ │ application to the IDC. Once submitted,       │  │
│ │ you will not be able to make changes to the   │  │
│ │ core application form.                       │  │
│ │                                              │  │
│ │ You can still upload additional documents     │  │
│ │ and communicate with your assigned analyst.   │  │
│ │                                              │  │
│ │ Reference: APP-2025-XXXX                     │  │
│ │                                              │  │
│ │        [Cancel]  [Confirm & Submit]          │  │
│ └──────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘

After submission:
┌──────────────────────────────────────────────────┐
│                                                  │
│          ✅ Application Submitted!                │
│                                                  │
│  Reference Number: APP-2025-00847                 │
│                                                  │
│  Your application has been received and          │
│  assigned to the preliminary review team.        │
│                                                  │
│  What happens next:                               │
│  1. Preliminary review (1-3 business days)       │
│  2. Assigned analyst contact                     │
│  3. Due diligence process                        │
│  4. Credit committee review                      │
│                                                  │
│  📧 Confirmation email sent to                   │
│     applicant@company.co.za                      │
│                                                  │
│  [View Application]  [Go to Dashboard]           │
│                                                  │
└──────────────────────────────────────────────────┘
```

### 3.4 Application Tracking Flow

```
┌──────────────────────────────────────────────────────────┐
│  Application: APP-2025-00847                              │
│  Status: Under Review                                     │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ STATUS TIMELINE                                    │  │
│  │                                                    │  │
│  │  ✓ Submitted        15 Jan 2025                   │  │
│  │  │                                                 │  │
│  │  ✓ Preliminary      18 Jan 2025  (3 days)         │  │
│  │  │   Review                                        │  │
│  │  │                                                 │  │
│  │  ● Under Review     22 Jan 2025                   │  │
│  │  │   Analyst: Sarah Mokoena                         │  │
│  │  │   (In Progress)                                  │  │
│  │  │                                                 │  │
│  │  ○ Due Diligence    —                              │  │
│  │  │                                                 │  │
│  │  ○ Credit Committee —                              │  │
│  │  │                                                 │  │
│  │  ○ Final Decision   —                              │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ ACTION ITEMS                  PRIORITY   DUE BY   │  │
│  │                                                    │  │
│  │  📤 Upload updated         High    28 Jan 2025   │  │
│  │     management accounts    [Upload Now]            │  │
│  │                                                    │  │
│  │  📝 Respond to analyst     Medium  30 Jan 2025   │  │
│  │     query re: equity       [View Query]            │  │
│  │                                                    │  │
│  │  📄 Sign mandate form     Low     05 Feb 2025   │  │
│  │                            [View & Sign]           │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ COMMUNICATION WITH ANALYST                         │  │
│  │                                                    │  │
│  │ Sarah Mokoena (IDC Analyst)                        │  │
│  │ ┌──────────────────────────────────────────────┐  │  │
│  │ │ SM:  Hi, please provide the Q3 management   │  │  │
│  │ │      accounts for the period ending Sep 2024 │  │  │
│  │ │      22 Jan 2025 10:30                      │  │  │
│  │ │                                              │  │  │
│  │ │ You:  Sure, I'll upload them today.         │  │  │
│  │ │      22 Jan 2025 11:15                      │  │  │
│  │ └──────────────────────────────────────────────┘  │  │
│  │ [Type a message...]              [Send]           │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  Tabs: [Overview] [Documents] [Financials] [History]     │
└──────────────────────────────────────────────────────────┘
```

### 3.5 Portfolio Management Flow

```
Dashboard → Portfolio → My Loans
    │
    ▼
┌──────────────────────────────────────────────────────────┐
│  My Loans                                                │
│                                                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐         │
│  │  TBD       │  │  TBD       │  │  TBD       │         │
│  │  Active    │  │  Active    │  │  In Arrears │         │
│  │  ▓▓▓▓░░ 67%│  │  ▓▓░░░░ 33%│  │  ▓▓▓▓▓░ 83%│        │
│  │  Next:     │  │  Next:     │  │  OVERDUE    │         │
│  │  01 Feb    │  │  15 Feb    │  │  since Jan  │         │
│  └────────────┘  └────────────┘  └────────────┘         │
│                                                          │
│  [+ View All Loans]                                      │
└──────────────────────────────────────────────────────────┘

Loan Detail:
┌──────────────────────────────────────────────────────────┐
│  Loan: LN-2021-0347              Status: Active          │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Summary                                           │  │
│  │  Principal:     TBD                               │  │
│  │  Outstanding:   TBD                               │  │
│  │  Interest Rate: TBD                               │  │
│  │  Term:          TBD                               │  │
│  │  Monthly:       TBD                               │  │
│  │  Next Payment:  TBD                               │  │
│  │  Repaid to Date: TBD                               │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Repayment Schedule (Calendar View)               │  │
│  │                                                    │  │
│  │  ◄ Jan 2025 ►                                     │  │
│  │  Mo Tu We Th Fr Sa Su                              │  │
│  │                  1  ●  2   3   4                   │  │
│  │   5   6   7   8   9  10  11                       │  │
│  │  12  13  14  15  ●  16  17  18                    │  │
│  │  19  20  21  22  23  24  25                       │  │
│  │  26  27  28  29  30  31                           │  │
│  │                                                    │  │
│  │  ● = Payment due date                              │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  Tabs: [Schedule] [Statements] [Payments] [Covenants]   │
└──────────────────────────────────────────────────────────┘
```

### 3.6 Bursary Application Flow

```
Bursaries → Available Programmes
    │
    ▼
┌──────────────────────────────────────────────────────────┐
│  Available Bursary Programmes                             │
│                                                          │
│  Filter: [Sector ▼] [Level ▼] [Province ▼]              │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ 🎓 Engineering Bursary Programme                    │  │
│  │                                                    │  │
│  │ Sector: Engineering & Manufacturing                │  │
│  │ Value: To be Discussed                              │  │
│  │ Deadline: 31 March 2025                            │  │
│  │ Status: Open                                       │  │
│  │                                                    │  │
│  │ Requirements:                                      │  │
│  │ • SA citizen, aged 16-35                          │  │
│  │ • Grade 12 with Maths & Science (60%+)            │  │
│  │ • Accepted/registered at SA university             │  │
│  │ • Financial need                                   │  │
│  │                                                    │  │
│  │ Covers: Tuition, Books, Accommodation, Living     │  │
│  │ Allowance, Laptop                                  │  │
│  │                                                    │  │
│  │                      [View Details] [Apply Now]    │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ 🎓 Information Technology Bursary                  │  │
│  │ ...                                                │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘

Application Wizard (5 Steps):
1. Programme Selection & Personal Details
2. Academic History (schools, tertiary, results)
3. Financial Need Assessment (household income, dependents)
4. Document Upload (transcripts, ID, proof of income, acceptance letter)
5. Review & Submit
```

### 3.7 Tender Submission Flow

```
Tenders → Active Tenders
    │
    ▼
┌──────────────────────────────────────────────────────────┐
│  Active Tenders                                          │
│                                                          │
│  Filter: [Category ▼] [Closing Date ▼]                  │
│  Search: [____________]                                  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ IDC-T-2025-012                                     │  │
│  │ Procurement of IT Infrastructure Services           │  │
│  │                                                    │  │
│  │ Category: IT Services                              │  │
│  │ Published: 15 Jan 2025                             │  │
│  │ Closing:   28 Feb 2025 12:00                       │  │
│  │ Briefing:  25 Jan 2025 10:00 (virtual)            │  │
│  │                                                    │  │
│  │ Status: Open                    [View] [Download]  │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘

Submission Flow:
1. Download tender documents (PDF, specs, pricing schedule)
2. Prepare bid response offline
3. Upload completed bid documents
4. Complete vendor declaration form (B-BBEE, tax clearance)
5. Upload supporting documents
6. Submit before closing date
7. Receive acknowledgment with submission reference

┌──────────────────────────────────────────────────────────┐
│  Submit Bid: IDC-T-2025-012                              │
│                                                          │
│  ⚠️ Closing: 28 Feb 2025 12:00   Time remaining: 14d 6h │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Required Documents                                 │  │
│  │                                                    │  │
│  │ ☑ Completed Pricing Schedule    [Upload]  ✓ Done  │  │
│  │ ☑ Technical Proposal           [Upload]  ✓ Done   │  │
│  │ ☑ Company Profile               [Upload]  ✓ Done  │  │
│  │ ☑ B-BBEE Certificate            [Upload]            │  │
│  │ ☑ Tax Clearance Certificate      [Upload]           │  │
│  │ ☑ CIPC Registration             [Upload]  ✓ Done  │  │
│  │ ☑ Declaration of Interest       [Upload]  ✓ Done  │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│                    [Submit Bid]                          │
└──────────────────────────────────────────────────────────┘
```

---

## 4. Key Pages — Wireframe Descriptions

### 4.1 Dashboard (Home)

```
┌──────────────────────────────────────────────────────────┐
│  Good morning, Thabo 👋                       Last login │
│                                         15 Jan, 09:32   │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────────────────────────────────────┐│
│  │ 📢 IDC Announcements                                 ││
│  │ New funding products available for green energy      ││
│  │ projects. [Learn More]                               ││
│  └──────────────────────────────────────────────────────┘│
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐│
│  │  Active   │  │  Loans   │  │ Pending  │  │ Messages ││
│  │  Apps     │  │  Active  │  │  Actions │  │  Unread  ││
│  │          │  │          │  │          │  │          ││
│  │    3     │  │    2     │  │    5     │  │    8     ││
│  │ ▲ +1     │  │    —     │  │ ▼ -2     │  │ ▲ +3     ││
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘│
│                                                          │
│  ┌──────────────────────────┐  ┌────────────────────────┐│
│  │ PENDING ACTION ITEMS     │  │ RECENT ACTIVITY        ││
│  │                          │  │                        ││
│  │ 🔴 Upload management     │  │ 📄 Submitted APP-0042  ││
│  │    accounts - Due 28 Jan │  │    15 Jan 2025         ││
│  │    [Upload Now]          │  │                        ││
│  │                          │  │ ✅ Loan payment         ││
│  │ 🟡 Sign mandate form     │  │    confirmed TBD          ││
│  │    - Due 05 Feb          │  │    14 Jan 2025         ││
│  │    [View & Sign]         │  │                        ││
│  │                          │  │ 💬 New message from     ││
│  │ 🟡 Complete bursary      │  │    Sarah Mokoena       ││
│  │    progress report       │  │    13 Jan 2025         ││
│  │    - Due 10 Feb          │  │                        ││
│  │    [Complete Report]     │  │ 📄 Downloaded tender    ││
│  │                          │  │    IDC-T-2025-012      ││
│  │ 🔴 Respond to analyst    │  │    12 Jan 2025         ││
│  │    query - Due 30 Jan    │  │                        ││
│  │    [View Query]          │  │                        ││
│  └──────────────────────────┘  └────────────────────────┘│
│                                                          │
│  ┌──────────────────────────────────────────────────────┐│
│  │ QUICK ACTIONS                                        ││
│  │ [+ New Funding App] [Upload Document] [Pay Loan]     ││
│  │ [Apply for Bursary] [Browse Tenders] [Contact Us]    ││
│  └──────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────┘
```

### 4.2 Application List Page

```
┌──────────────────────────────────────────────────────────┐
│  My Applications                              [+ New App]│
│                                                          │
│  ┌─ Filters ──────────────────────────────────────────┐ │
│  │ Status:  [All ▼]  Sector: [All ▼]                  │ │
│  │ Date:    [From ▼] [To ▼]   Amount: [Min] [Max]     │ │
│  │ Search:  [________________________]  [Clear] [Go]  │ │
│  └───────────────────────────────────────────────────┘ │
│                                                          │
│  Showing 1-10 of 23 applications    Export: [CSV] [PDF]  │
│                                                          │
│  ┌───────┬────────────┬──────────┬────────┬─────┬──────┐│
│  │ ☐     │ Reference  │ Company  │ Amount │Status│ Date ││
│  ├───────┼────────────┼──────────┼────────┼─────┼──────┤│
│  │ ☐     │ APP-0042   │ Apex Mfg │ TBD   │ 🟡   │15Jan ││
│  │       │            │ (Pty)Ltd │        │Review│      ││
│  ├───────┼────────────┼──────────┼────────┼─────┼──────┤│
│  │ ☐     │ APP-0038   │ GreenSol │ TBD   │ 🔵   │10Dec ││
│  │       │            │ Energy   │        │Draft │      ││
│  ├───────┼────────────┼──────────┼────────┼─────┼──────┤│
│  │ ☐     │ APP-0035   │ TechStart│ TBD   │ 🟢   │01Nov ││
│  │       │            │ SA       │        │Approv│      ││
│  ├───────┼────────────┼──────────┼────────┼─────┼──────┤│
│  │ ☐     │ APP-0031   │ BuildCo  │ TBD   │ 🔴   │15Oct ││
│  │       │            │ (Pty)Ltd │        │Rejec│      ││
│  └───────┴────────────┴──────────┴────────┴─────┴──────┘│
│                                                          │
│  Bulk Actions: [Withdraw] [Export Selected]              │
│                                                          │
│  [< 1] [2] [3] ... [>]     Per page: [10 ▼]             │
└──────────────────────────────────────────────────────────┘
```

### 4.3 Application Detail Page

```
┌──────────────────────────────────────────────────────────┐
│  ← Back to Applications                                   │
│                                                          │
│  APP-2025-00847                      Status: Under Review│
│  Apex Manufacturing (Pty) Ltd                          │
│  TBD — Manufacturing Expansion                           │
│  Submitted: 15 January 2025 | Analyst: Sarah Mokoena     │
│                                                          │
│  [Message Analyst] [Upload Doc] [Print]                  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────┐  ┌──────────────────────────┐│
│  │ STATUS TIMELINE        │  │ OVERVIEW                 ││
│  │                        │  │                          ││
│  │ ✓ Submitted   15 Jan  │  │ Company:  Apex Mfg (Pty) ││
│  │ ✓ Prelim     18 Jan  │  │ Sector:   Manufacturing   ││
│  │ ● Review     22 Jan  │  │ Product:  DBI             ││
│  │ ○ Due Dilig  —       │  │ Amount:   TBD              ││
│  │ ○ Committee  —       │  │ Province: Gauteng         ││
│  │ ○ Decision   —       │  │                          ││
│  │                        │  │ Progress:                 ││
│  │                        │  │ ████████░░ 60%           ││
│  │                        │  │                          ││
│  │                        │  │ Key Dates:               ││
│  │                        │  │ Submitted: 15 Jan        ││
│  │                        │  │ Last Update: 22 Jan      ││
│  │                        │  │ Est. Decision: Mar 2025  ││
│  └────────────────────────┘  └──────────────────────────┘│
│                                                          │
│  Tabs: [Overview] [Documents] [Financials] [History]     │
│  ──────────────────────────────────────────────────────  │
│                                                          │
│  DOCUMENTS                  FINANCIALS                   │
│  ┌────────────────────────┐  ┌────────────────────────┐ │
│  │📄 corp_reg.pdf        │  │ Revenue (2023): TBD    │ │
│  │📄 bbee_cert.pdf       │  │ Net Profit:    TBD    │ │
│  │📄 tax_clearance.pdf   │  │ Total Assets:  TBD    │ │
│  │📄 audited_2023.pdf    │  │ Debt:Equity:   0.4:1   │ │
│  │📄 audited_2022.pdf    │  │                          │ │
│  │📄 business_plan.pdf   │  │                          │ │
│  │📄 [5 more files...]   │  │                          │ │
│  │                        │  │                          │ │
│  │ [+ Upload Document]    │  │                          │ │
│  └────────────────────────┘  └────────────────────────┘ │
│                                                          │
│  ACTIVITY HISTORY                                         │
│  ┌──────────────────────────────────────────────────────┐│
│  │ 22 Jan — Status changed to "Under Review"   — System││
│  │ 18 Jan — Preliminary review completed               ││
│  │         Assigned to Sarah Mokoena       — System    ││
│  │ 15 Jan — Application submitted             — You     ││
│  └──────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────┘
```

### 4.4 Document Vault

```
┌──────────────────────────────────────────────────────────┐
│  My Documents                                [+ Upload]  │
│                                                          │
│  Search: [_______________]  Filter: [Category ▼]        │
│                                                          │
│  ┌──────────────────────────────────────────────────────┐│
│  │  📁 Funding Applications                             ││
│  │  ┌──────────────┬──────────┬─────────┬──────────┐   ││
│  │  │ Name         │ Size     │ Date    │ Shared   │   ││
│  │  ├──────────────┼──────────┼─────────┼──────────┤   ││
│  │  │ APP-0042     │ 12.4 MB  │ 15 Jan  │ IDC      │   ││
│  │  │  Pack        │          │         │ Analyst  │   ││
│  │  │ APP-0038     │ 8.2 MB   │ 10 Dec  │ —        │   ││
│  │  │  Pack        │          │         │          │   ││
│  │  └──────────────┴──────────┴─────────┴──────────┘   ││
│  │                                                       ││
│  │  📁 Loan Documents                                    ││
│  │  ┌──────────────┬──────────┬─────────┬──────────┐   ││
│  │  │ Loan Agree.  │ 2.1 MB   │ 05 Mar   │ —        │   ││
│  │  │ Mandate      │ 340 KB   │ 05 Mar   │ —        │   ││
│  │  └──────────────┴──────────┴─────────┴──────────┘   ││
│  │                                                       ││
│  │  📁 Bursary Documents                                 ││
│  │  ┌──────────────┬──────────┬─────────┬──────────┐   ││
│  │  │ Transcript   │ 1.8 MB   │ 20 Nov  │ IDC      │   ││
│  │  │ ID Copy      │ 450 KB   │ 20 Nov  │ —        │   ││
│  │  └──────────────┴──────────┴─────────┴──────────┘   ││
│  └──────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────┘
```

### 4.5 Messages / Communication Centre

```
┌──────────────────────────────────────────────────────────┐
│  Inbox (8 unread)                              [Compose] │
│                                                          │
│  ┌─ Folders ─────┐  ┌─ Message List ─────────────────┐ │
│  │ 📥 Inbox   (8) │  │                                │ │
│  │ 📤 Sent       │  │ 🔵 Sarah Mokoena       22 Jan  │ │
│  │ ⭐ Starred    │  │    Re: APP-0042 - Document     │ │
│  │ 📁 Drafts     │  │    request for management       │ │
│  │ 🗑 Trash      │  │    accounts                    │ │
│  │               │  │    "Hi Thabo, please provide   │ │
│  │               │  │    the Q3 management..."       │ │
│  │               │  │                                │ │
│  │               │  │ ○ IDC Notifications    20 Jan  │ │
│  │               │  │    Your loan payment has       │ │
│  │               │  │    been processed              │ │
│  │               │  │                                │ │
│  │               │  │ ○ Bursary Division     18 Jan  │ │
│  │               │  │    Progress Report Reminder    │ │
│  └───────────────┘  └────────────────────────────────┘ │
│                                                          │
│  ┌─ Message Detail ────────────────────────────────────┐│
│  │ From: Sarah Mokoena (IDC Analyst)                   ││
│  │ To: Thabo Nkosi                                     ││
│  │ Date: 22 January 2025 10:30                          ││
│  │ Subject: Re: APP-2025-00847 - Document Request       ││
│  │                                                      ││
│  │ Hi Thabo,                                            ││
│  │                                                      ││
│  │ Following our preliminary review, please provide     ││
│  │ the following additional documents:                  ││
│  │                                                      ││
│  │ 1. Management accounts for Q3 2024 (ending Sep)      ││
│  │ 2. Updated debt schedule reflecting current loans    ││
│  │ 3. Letter of intent from your main supplier         ││
│  │                                                      ││
│  │ Please upload these via the application page or      ││
│  │ reply to this message with the attachments.          ││
│  │                                                      ││
│  │ Kind regards,                                        ││
│  │ Sarah Mokoena                                        ││
│  │ IDC Credit Analyst                                   ││
│  │                                                      ││
│  │ ──────────────────────────────────────────────────── ││
│  │ 📎 No attachments                                   ││
│  │                                                      ││
│  │ [Reply] [Forward] [Star] [Delete]                    ││
│  └──────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────┘
```

### 4.6 Profile Settings

```
┌──────────────────────────────────────────────────────────┐
│  Profile                                    [Edit Mode]  │
│                                                          │
│  Tabs: [Personal] [Organisation] [Security] [Notif.] [S.]│
│  ──────────────────────────────────────────────────────  │
│                                                          │
│  ┌──────────────────────────────────────────────────────┐│
│  │  Personal Details                                    ││
│  │                                                      ││
│  │  ┌────────┐                                          ││
│  │  │ Avatar │  Thabo Nkosi                             ││
│  │  │  [TN]  │  thabo@apexmfg.co.za                    ││
│  │  └────────┘  +27 82 345 6789                         ││
│  │  [Change Photo]                                      ││
│  │                                                      ││
│  │  First Name:    Thabo          Last Name:  Nkosi     ││
│  │  Email:         thabo@apexmfg.co.za                  ││
│  │  Phone:         +27 82 345 6789                      ││
│  │  SA ID Number:  850101********1234                   ││
│  │  Account Type:  Applicant                            ││
│  │  Member Since:  12 March 2023                        ││
│  │  Last Login:    15 January 2025, 09:32               ││
│  │                                                      ││
│  │                              [Save Changes]           ││
│  └──────────────────────────────────────────────────────┘│
│                                                          │
│  ┌──────────────────────────────────────────────────────┐│
│  │  Security                                            ││
│  │                                                      ││
│  │  Password:           Last changed 45 days ago        ││
│  │                      [Change Password]               ││
│  │                                                      ││
│  │  Two-Factor Auth:   ✓ Enabled (Authenticator App)    ││
│  │                      [Manage MFA]                     ││
│  │                                                      ││
│  │  Active Sessions:                                    ││
│  │  ┌──────────────────────────────────────────────┐   ││
│  │  │ 🟢 Chrome on Windows    15 Jan 09:32  Cape  │   ││
│  │  │    Town  [Current session]                   │   ││
│  │  │ 🟢 Safari on iPhone     14 Jan 18:10  Cape  │   ││
│  │  │    Town                           [Revoke]   │   ││
│  │  └──────────────────────────────────────────────┘   ││
│  └──────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────┘
```

---

## 5. Responsive Design Strategy

### 5.1 Breakpoints

| Breakpoint | Width | Target Devices |
|---|---|---|
| `xs` | 320px | Small phones (iPhone SE, budget Android) |
| `sm` | 640px | Large phones (iPhone 14, Galaxy S23) |
| `md` | 768px | Tablets portrait (iPad Mini, Galaxy Tab) |
| `lg` | 1024px | Tablets landscape, small laptops |
| `xl` | 1280px | Desktops, laptops |
| `2xl` | 1536px | Large monitors |

### 5.2 Mobile Adaptations

#### Navigation
- **Header:** Simplified — logo + hamburger menu + notification bell.
- **Sidebar:** Hidden by default. Hamburger triggers full-screen slide-out with backdrop overlay. Closes on navigation or backdrop tap.
- **Bottom Navigation Bar (Mobile Only):** Fixed at bottom with 5 key items: Dashboard, Funding, Portfolio, Messages, Profile.
- **Breadcrumb:** Truncated on mobile; last two items shown with "..." prefix.

#### Content
- **Cards:** Stack vertically. Stat cards become 2-column grid instead of 4.
- **Tables:** Horizontal scroll with sticky first column. Alternatively, convert to card-list view on mobile.
- **Forms:** Single column. Stepper collapses to step indicators (number only, no labels).
- **Modals:** Full-screen on mobile with slide-up animation. Close button top-right.
- **Toasts:** Full-width at bottom, stacking vertically.
- **File uploads:** Full-width drag-and-drop area.

#### Touch Targets
- Minimum interactive element size: **44×44px** (iOS HIG) / **48×48dp** (Material Design).
- Adequate spacing between clickable elements (minimum 8px gap).
- Touch-friendly form controls (large select dropdowns, toggle switches, etc.).
- Swipe gestures for message list, document viewer.

### 5.3 Progressive Enhancement

```
┌─────────────────────────────────────────────────┐
│              PROGRESSIVE ENHANCEMENT            │
├─────────────────────────────────────────────────┤
│ Level 1: Core Content                            │
│  • HTML structure, text content                  │
│  • Basic forms and navigation                    │
│  • Works without JavaScript                      │
├─────────────────────────────────────────────────┤
│ Level 2: Enhanced Experience                     │
│  • CSS transitions and animations                │
│  • Client-side form validation                   │
│  • Service worker for caching                    │
│  • Responsive layouts                            │
├─────────────────────────────────────────────────┤
│ Level 3: Full Interactivity                      │
│  • Real-time notifications (WebSocket)           │
│  • Drag-and-drop file uploads                    │
│  • Interactive charts and visualizations         │
│  • Offline form completion and sync              │
└─────────────────────────────────────────────────┘
```

### 5.4 Loading States

| State | Pattern |
|---|---|
| **Initial page load** | Skeleton screens matching page structure |
| **Data fetching** | Shimmer skeletons for cards, tables, lists |
| **Button actions** | Spinner inside button, button disabled |
| **File upload** | Progress bar with percentage, cancel option |
| **Form submission** | Full-page overlay with spinner and message |
| **Lazy-loaded content** | Intersection Observer + blur-up images |
| **Error during load** | Error state with retry button |

### 5.5 Offline Capability (Service Workers)

- Cache static assets (HTML, CSS, JS, fonts) for offline access.
- Cache API responses with stale-while-revalidate strategy.
- Queue form submissions when offline; sync when back online.
- Show "You're offline" banner with queued actions indicator.
- Offline page for completely unreachable scenarios.

---

## 6. Accessibility Requirements

### 6.1 WCAG 2.1 AA Compliance Checklist

| Category | Requirement | Implementation |
|---|---|---|
| **Perceivable** | Text alternatives for non-text content | Alt text on all images, aria-labels on icons |
| **Perceivable** | Captions for audio/video | Closed captions on all multimedia |
| **Perceivable** | Content adaptable to different presentations | Semantic HTML, logical heading hierarchy |
| **Perceivable** | Distinguishable visual presentation | 4.5:1 contrast ratio minimum |
| **Operable** | All functionality via keyboard | Focus management, tab order, skip links |
| **Operable** | Enough time for interactions | Session timeout warnings, extendable timers |
| **Operable** | No content that causes seizures | `prefers-reduced-motion` media query |
| **Operable** | Navigable content | ARIA landmarks, breadcrumbs, sitemap |
| **Understandable** | Readable content | Plain language, consistent terminology |
| **Understandable** | Predictable navigation | Consistent layout, no unexpected context changes |
| **Understandable** | Input assistance | Labels, instructions, error suggestions |
| **Robust** | Compatible with assistive tech | Valid HTML, proper ARIA usage, tested with screen readers |

### 6.2 Keyboard Navigation

- **Tab order:** Logical left-to-right, top-to-bottom flow.
- **Skip links:** "Skip to main content" and "Skip to navigation" hidden links at top.
- **Focus indicators:** 3px solid IDC Blue outline with 2px offset. Never suppress focus rings.
- **Modal focus trap:** Tab cycles within modal; focus returns to trigger on close.
- **Dropdown focus:** Arrow keys navigate options; Enter to select; Escape to close.
- **Stepper:** Arrow keys between steps; Enter to activate.

### 6.3 Screen Reader Support

- Semantic HTML5 elements (`<main>`, `<nav>`, `<article>`, `<section>`).
- ARIA landmarks for page regions.
- `aria-live` regions for dynamic content (toasts, status updates).
- `aria-describedby` for form field help text.
- `aria-expanded` / `aria-controls` for accordions and dropdowns.
- Status messages use `role="status"` or `role="alert"`.
- Tested with: JAWS, NVDA, VoiceOver (macOS/iOS), TalkBack (Android).

### 6.4 Visual Accessibility

- **High contrast mode:** CSS media query `prefers-contrast: more` increases border weights and color contrast.
- **Reduced motion:** `prefers-reduced-motion: reduce` disables animations and transitions.
- **Font size scaling:** Layout breaks gracefully up to 200% zoom.
- **Color independence:** No information conveyed by color alone. Use icons, patterns, or text labels alongside color.
- **Dark mode:** Optional dark mode toggle in profile settings (future enhancement).

---

## 7. Performance Targets

| Metric | Target | Measurement |
|---|---|---|
| **First Contentful Paint (FCP)** | < 1.5s | Lighthouse, Web Vitals |
| **Largest Contentful Paint (LCP)** | < 2.5s | Lighthouse, Web Vitals |
| **First Input Delay (FID)** | < 100ms | Lighthouse, Web Vitals |
| **Interaction to Next Paint (INP)** | < 200ms | Lighthouse, Web Vitals |
| **Cumulative Layout Shift (CLS)** | < 0.1 | Lighthouse, Web Vitals |
| **Time to Interactive (TTI)** | < 3.5s | Lighthouse |
| **Total Blocking Time (TBT)** | < 200ms | Lighthouse |
| **Initial JS Bundle** | < 200KB (gzipped) | Webpack Bundle Analyzer |
| **Initial CSS Bundle** | < 50KB (gzipped) | Build output |
| **Lighthouse Performance Score** | > 90 | Lighthouse CI |
| **Lighthouse Accessibility Score** | 100 | Lighthouse CI |

### Performance Strategy

```
┌─────────────────────────────────────────────────┐
│          PERFORMANCE OPTIMISATION                │
├─────────────────────────────────────────────────┤
│ Loading                                          │
│  • Code splitting by route (Next.js automatic)  │
│  • Tree shaking unused components                │
│  • Dynamic imports for heavy components          │
│    (charts, file viewers, rich editors)         │
│  • Font subsetting (Latin + Latin Extended)      │
│  • Preload critical fonts and hero images       │
│                                                  │
│ Rendering                                        │
│  • Server-side rendering (SSR) for initial page  │
│  • Static generation for marketing/landing pages │
│  • Virtual scrolling for long lists/tables       │
│  • Image optimization (WebP, lazy loading)       │
│  • CSS containment for complex components        │
│                                                  │
│ Caching                                          │
│  • Service worker for static asset caching       │
│  • HTTP cache headers (immutable for hashed)     │
│  • API response caching with SWR                 │
│  • localStorage for user preferences             │
│                                                  │
│ Network                                         │
│  • API response compression (gzip/brotli)        │
│  • Pagination for all list endpoints             │
│  • Debounced search inputs (300ms)               │
│  • Optimistic UI updates where safe              │
└─────────────────────────────────────────────────┘
```

---

## 8. State Management & Data Flow

### 8.1 Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    CLIENT STATE                           │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Server State (React Query / SWR)                   │  │
│  │  • User profile & session                          │  │
│  │  • Applications list & details                     │  │
│  │  • Loan portfolio data                             │  │
│  │  • Messages & notifications                        │  │
│  │  • Documents metadata                              │  │
│  │  → Auto-cached, background refresh, stale-while-   │  │
│  │    revalidate                                       │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Form State (React Hook Form + Zod)                 │  │
│  │  • Multi-step wizard progress                      │  │
│  │  • Field values & validation errors                │  │
│  │  • Dirty/touched state                             │  │
│  │  • Draft auto-save (localStorage)                  │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ UI State (Zustand / Context)                       │  │
│  │  • Sidebar expanded/collapsed                       │  │
│  │  • Active modal/dialog                             │  │
│  │  • Toast queue                                     │  │
│  │  • Theme preference                                │  │
│  │  • Command palette open/closed                     │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ URL State (Next.js Router)                         │  │
│  │  • Current page & route params                     │  │
│  │  • Query filters & pagination                      │  │
│  │  • Active tab                                      │  │
│  │  → Shareable, bookmarkable                         │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

### 8.2 Data Flow Patterns

| Pattern | Usage |
|---|---|
| **Server-driven** | Application data, loan data, messages — fetched from API, cached by React Query |
| **Optimistic updates** | Marking messages as read, starring documents — immediate UI update, reconciled with server |
| **Draft persistence** | Multi-step forms auto-save to localStorage every 30 seconds |
| **Real-time** | Notifications via WebSocket; polling fallback (30s interval) |
| **Cache invalidation** | On mutation (upload, submit), invalidate related query keys |

---

## 9. Internationalization & Localization

### 9.1 Language Support

- **Primary language:** English (default).
- **Supported languages:** All 11 official SA languages (English, isiZulu, isiXhosa, Afrikaans, Sepedi, Setswana, Sesotho, Xitsonga, siSwati, Tshivenda, isiNdebele).
- **Implementation:** `next-intl` or `react-intl` with message catalogs.
- **Language switcher:** In footer and user profile settings.
- **RTL support:** Not required for SA languages (all LTR).

### 9.2 Localization Considerations

| Element | SA Context |
|---|---|
| **Currency** | ZAR (R) with South African number formatting (spaces as thousands separator: R 15 000 000) |
| **Date format** | DD/MM/YYYY (South African standard) |
| **Phone format** | +27 XX XXX XXXX |
| **Address format** | South African postal code system |
| **ID number** | 13-digit SA ID validation (Luhn algorithm) |
| **Provinces** | All 9 SA provinces in dropdowns |
| **B-BBEE** | Levels 1–8 with appropriate terminology |
| **Plain language** | Grade 10 reading level; avoid legal/financial jargon or explain inline |
| **Timezone** | SAST (UTC+2) |

---

## 10. Security UX Patterns

### 10.1 Authentication UX

| Feature | Implementation |
|---|---|
| **Password requirements** | Min 8 chars, uppercase, lowercase, number, special char. Real-time strength meter. |
| **Password reset** | "Forgot password" sends time-limited link (15 min). No hints about which part is wrong. |
| **Account lockout** | 5 failed attempts → 15 min lockout → email unlock link. |
| **MFA** | TOTP authenticator app (primary) + SMS OTP (fallback). Backup codes provided. |
| **Session timeout** | 30 min idle → warning modal with 60s countdown → redirect to login. |
| **Concurrent sessions** | Max 3. Session list in profile with "Revoke" option. |

### 10.2 Data Protection UX

| Feature | Implementation |
|---|---|
| **POPIA consent** | Granular consent collection during registration. Manageable in settings. |
| **Document security** | Watermarked previews. Download logging. Time-limited share links. |
| **Data masking** | ID numbers partially masked (850101****1234). Sensitive fields have reveal toggle. |
| **Audit trail** | All actions logged with timestamp, IP, user agent. Viewable in profile. |

---

## 11. Error Handling & Edge Cases

### 11.1 Error Display Patterns

```
┌──────────────────────────────────────────────────────────┐
│  FORM FIELD ERROR                                        │
│                                                          │
│  Tax Number:                                             │
│  ┌──────────────────────────────────────┐               │
│  │ 1234567890                           │  ← Red border │
│  └──────────────────────────────────────┘               │
│  ⚠️ Invalid tax number format. Please enter your         │
│     10-digit SARS tax number.                            │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  FULL PAGE ERROR                                         │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │                                                   │   │
│  │        ❌ Something went wrong                    │   │
│  │                                                   │   │
│  │  We couldn't load your application data.          │   │
│  │  This might be a temporary issue.                 │   │
│  │                                                   │   │
│  │  Error Reference: ERR-2025-0147                   │   │
|  │                                                   │   │
│  │  [Try Again]  [Go to Dashboard]  [Contact Support]│   │
|  │                                                   │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  NETWORK ERROR (OFFLINE)                                  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │  📡 You appear to be offline                      │   │
|  │                                                   │   │
|  │  Some features may not be available. Your data    │   │
|  │  will be synced when you reconnect.               │   │
|  │                                                   │   │
|  │  Queued actions: 2                                │   │
|  │  • Upload management accounts                     │   │
|  │  • Send message to Sarah Mokoena                  │   │
|  │                                                   │   │
|  │  [Retry Now]                                      │   │
|  └──────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

### 11.2 Edge Cases

| Scenario | Handling |
|---|---|
| **Session expired during form** | Save draft automatically; redirect to login; resume after re-auth |
| **File upload failure** | Auto-retry 3 times with exponential backoff; manual retry button; chunked upload resume |
| **Large file rejection** | Client-side validation before upload; clear error with file size limit |
| **Duplicate submission** | Idempotency keys; disable submit button after click; check server-side |
| **API timeout** | Show loading timeout message after 30s; offer retry or save-as-draft |
| **Maintenance mode** | Scheduled maintenance banner 24h before; full-page maintenance notice during |
| **Concurrent edit** | Last-write-wins with conflict notification; optimistic locking on form submission |

---

## 12. Analytics & Tracking

### 12.1 Tracking Strategy

| Event | Category | Data Captured |
|---|---|---|
| **Page view** | Navigation | URL, referrer, time on page |
| **Registration start** | Conversion | Account type selected |
| **Registration complete** | Conversion | Steps completed, time taken |
| **Application start** | Conversion | Sector, funding amount range |
| **Application submit** | Conversion | Time to complete, steps revisited, documents uploaded |
| **Document upload** | Engagement | File type, size, upload duration |
| **Payment made** | Revenue | Amount, payment method |
| **Error encountered** | Quality | Error code, page, user action |
| **Feature usage** | Engagement | Feature name, frequency |
| **Search queries** | Engagement | Search term, results count, clicks |

### 12.2 Privacy Compliance

- **Cookie consent** required before any non-essential tracking.
- **POPIA-compliant** — data processing purpose declared, retention periods defined.
- **No PII in analytics** — user IDs hashed, no names or ID numbers.
- **Opt-out** available in notification settings and cookie preferences.
- Analytics tools: Google Analytics 4 (with IP anonymisation) or Matomo (self-hosted alternative).

---

## Appendix A: Technology Stack Reference

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Next.js 14+ (App Router) | SSR, SSG, routing, API routes |
| UI Components | shadcn/ui + Tailwind CSS | Component library, styling |
| State Management | React Query + Zustand | Server state + client state |
| Forms | React Hook Form + Zod | Form handling + validation |
| Authentication | NextAuth.js | Auth providers, session management |
| Charts | Recharts / Tremor | Data visualizations |
| File Upload | react-dropzone + tus-js-client | Drag-drop + chunked upload |
| i18n | next-intl | Internationalization |
| Testing | Playwright + Jest + Testing Library | E2E, unit, component tests |

## Appendix B: Icon System

- **Library:** Lucide React (consistent, open-source, well-maintained).
- **Custom icons:** IDC logo and brand marks as inline SVGs.
- **Size tokens:** 16px (inline), 20px (default), 24px (prominent), 32px (feature), 48px (hero).
- **Usage rules:** Every icon must have an accompanying label or `aria-label`. No icon-only buttons without accessibility text.

---

*Document prepared for the IDC Client Portal development team. All specifications are subject to refinement through user testing and stakeholder review.*
