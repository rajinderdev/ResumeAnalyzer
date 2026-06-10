# CVPilot — AI-Powered Resume Analysis Platform

CVPilot is a full-stack web application that helps job seekers optimize their resumes through AI-powered analysis, a multi-template resume builder, real-time chat support, and a comprehensive admin panel.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Laravel 13 (PHP 8.3+) |
| Frontend | React 18, Inertia.js 2 |
| Styling | Tailwind CSS 3, Headless UI |
| Build | Vite 8 |
| PDF Generation | barryvdh/laravel-dompdf |
| PDF Parsing | smalot/pdfparser |
| DOCX Parsing | phpoffice/phpword |
| Database | SQLite / MySQL |
| Auth | Laravel Breeze (Inertia + React) |

---

## Features

### 1. Resume Analysis Engine

Upload a PDF or DOCX resume and receive an instant, detailed analysis scored across four dimensions:

| Dimension | Weight | What It Checks |
|-----------|--------|----------------|
| ATS Compatibility | 30% | Standard section headers, contact info detection, date formatting, text quality |
| Keyword Matching | 25% | Resume content vs. curated professional and technical keyword libraries |
| Formatting | 20% | Word count, bullet point usage, section organization, paragraph structure |
| Content Quality | 25% | Action verbs, quantifiable metrics, date presence, overall length |

- Produces an overall weighted score (0-100)
- Generates contextual suggestions with severity levels (warning, info, success)
- Stores analysis history so users can track improvement over time

**Key files:** `app/Services/ResumeAnalysisService.php`, `app/Http/Controllers/ResumeController.php`, `app/Models/Resume.php`

---

### 2. Resume Builder

A drag-and-drop resume editor with six professional templates and live preview.

**Templates:**

| # | Template | Description |
|---|----------|-------------|
| 1 | Classic | Traditional single-column with dark gray headings |
| 2 | Modern | Two-column layout with teal sidebar |
| 3 | Minimal | Clean design with maximum whitespace |
| 4 | Creative | Bold header block with accent bars |
| 5 | Professional | Navy accents with formal rules |
| 6 | Blank Canvas | Minimal formatting as a starting point |

**Editable sections:** Personal Info, Professional Summary, Work Experience, Education, Skills, Certifications, Projects, Languages, Awards, Volunteer Work, and Custom Sections.

**Capabilities:**
- Drag-and-drop section reordering
- Auto-save with debounce (1-second delay)
- Real-time preview panel
- Switch templates mid-edit without losing data
- Download as PDF (A4 portrait via DomPDF)

**Key files:** `app/Http/Controllers/ResumeBuilderController.php`, `app/Services/TemplateRegistry.php`, `app/Services/ResumeBuilderPdfService.php`, `resources/views/pdf/resume-templates/`, `resources/js/Components/ResumeBuilder/`

---

### 3. User Dashboard

The central hub after login:

- **Drag-and-drop upload zone** for PDF/DOCX files (max 5 MB) with a real-time progress bar
- **Resume history** showing recent uploads with filename, date, score, and quick delete
- **Score breakdown panel** with an animated circular gauge for overall score plus bar charts for each sub-score (color-coded: green >= 70, yellow >= 50, red < 50)
- **Keywords panel** displaying found vs. missing keywords as tags
- **Formatting suggestions** as an actionable recommendation list
- **Pro tips banner** with resume optimization advice

**Key files:** `app/Http/Controllers/DashboardController.php`, `resources/js/Pages/Dashboard.jsx`

---

### 4. Chat Support System

Bidirectional messaging between users and admin support agents.

**User side (`/chat`):**
- Lists available support admins/agents
- Conversation history grouped by date
- Text messages up to 2,000 characters
- Read receipts (single/double check indicators)
- Auto-refresh via 5-second polling

**Admin side (`/admin/chat`):**
- Dashboard of all active conversations
- Per-user unread message counts
- Sorted by most recent activity
- Full thread view per user

**Key files:** `app/Http/Controllers/ChatController.php`, `app/Models/ChatMessage.php`, `resources/js/Pages/Chat/`

---

### 5. Admin Panel

Accessible only to users with admin or super-admin roles.

**Admin Dashboard (`/admin/dashboard`):**
- Total users, active users, new registrations (today/week/month)
- Unread support message count
- Role distribution breakdown
- Recent registrations list
- 30-day user growth sparkline chart

**User Management (`/admin/users`):**
- Paginated user list with search (name/email) and filters (role, active/inactive)
- Change user role, toggle active/inactive status, delete accounts

**User Impersonation:**
- Admin can log in as any user for debugging or support
- Session-tracked with `impersonator_id`
- One-click "Stop Impersonating" to return to admin account

**Role & Permission Management (`/admin/roles`):**
- Create, edit, and delete custom roles
- System roles are protected from deletion
- Assign permissions to roles via grouped UI

**Key files:** `app/Http/Controllers/Admin/`, `app/Http/Middleware/AdminMiddleware.php`, `resources/js/Pages/Admin/`, `resources/js/Layouts/AdminLayout.jsx`

---

### 6. Role-Based Access Control (RBAC)

**Default roles:**

| Role | Description |
|------|-------------|
| Super Admin | Full system access |
| Admin | Administrative access with all permissions |
| Editor | Content management with limited permissions |
| User | Default role, no special permissions |

**11 permissions across 4 groups:**

| Group | Permissions |
|-------|-------------|
| Users | view, create, edit, delete, impersonate |
| Roles | manage roles, manage permissions |
| Dashboard | view dashboard, view stats |
| Chat | manage chat, reply to chat |

**Key files:** `app/Models/Role.php`, `app/Models/Permission.php`, `app/Models/User.php`

---

### 7. Authentication

Built on Laravel Breeze with Inertia.js:

- Registration with email validation
- Login / logout
- Email verification workflow
- Password reset via email
- Confirm password flow
- Profile management (edit info, change password, delete account)
- Session-based auth with remember-me token

**Key files:** `routes/auth.php`, `resources/js/Pages/Auth/`

---

### 8. Profile Setup Wizard

First-time user onboarding flow at `/create-profile`:

- Step-based progress indicator (Details > Upload > Calibrate)
- Collects: name, email, phone, target job title, experience level, industry
- Optional resume upload triggers immediate analysis
- Completion tracking with animated checkmarks

**Key files:** `resources/js/Pages/CreateProfile.jsx`

---

### 9. Public Pages

| Page | Route | Description |
|------|-------|-------------|
| Landing Page | `/` | Marketing homepage with hero, stats, features, how-it-works, testimonials, CTA |
| Privacy Policy | `/privacy-policy` | Full privacy policy with 10 content sections |
| Terms of Service | `/terms-of-service` | Full terms of service with 12 content sections |

---

## API Routes

### Public

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Landing page |
| GET | `/privacy-policy` | Privacy Policy |
| GET | `/terms-of-service` | Terms of Service |

### Authenticated

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/dashboard` | User dashboard |
| GET | `/create-profile` | Profile setup wizard |
| POST | `/create-profile` | Submit profile + resume |
| GET | `/profile` | Edit profile |
| PATCH | `/profile` | Update profile |
| DELETE | `/profile` | Delete account |
| POST | `/resumes/upload` | Upload and analyze resume |
| GET | `/resumes/{id}` | View analysis details |
| DELETE | `/resumes/{id}` | Delete resume |
| GET | `/resumes/{id}/download` | Download original file |
| GET | `/chat` | Chat interface |
| GET | `/chat/messages/{user}` | Fetch conversation |
| POST | `/chat/send` | Send message |
| GET | `/chat/unread-count` | Unread message count |
| GET | `/resume-builder` | Builder index with templates |
| POST | `/resume-builder` | Create resume from template |
| GET | `/resume-builder/{id}/edit` | Resume editor |
| PUT | `/resume-builder/{id}` | Update resume |
| DELETE | `/resume-builder/{id}` | Delete built resume |
| GET | `/resume-builder/{id}/download` | Download as PDF |
| POST | `/impersonate/stop` | Stop impersonation |

### Admin (prefix: `/admin`)

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/admin/dashboard` | Admin statistics |
| GET | `/admin/users` | User management |
| PATCH | `/admin/users/{id}/role` | Change user role |
| PATCH | `/admin/users/{id}/toggle-active` | Toggle active status |
| DELETE | `/admin/users/{id}` | Delete user |
| POST | `/admin/impersonate/{user}` | Impersonate user |
| GET | `/admin/roles` | Role management |
| POST | `/admin/roles` | Create role |
| PUT | `/admin/roles/{id}` | Update role |
| DELETE | `/admin/roles/{id}` | Delete role |
| GET | `/admin/chat` | Admin chat dashboard |
| GET | `/admin/chat/messages/{user}` | View conversation |
| POST | `/admin/chat/send` | Reply to user |

---

## Database Schema

| Table | Description |
|-------|-------------|
| `users` | User accounts with role_id, is_active, last_login_at |
| `resumes` | Uploaded resumes with scores, keywords, suggestions, parsed content |
| `built_resumes` | Builder resumes with template, sections (JSON), settings (JSON) |
| `chat_messages` | Messages with sender_id, receiver_id, is_read, read_at |
| `roles` | Roles with name, slug, description |
| `permissions` | Permissions with name, slug, group |
| `role_user` | Many-to-many role assignments |
| `permission_role` | Many-to-many permission assignments |

---

## Installation

### Prerequisites

- PHP 8.3+
- Composer
- Node.js 18+
- npm

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd ResumeAnalyzer

# Install PHP dependencies
composer install

# Install JS dependencies
npm install

# Create environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate

# Seed default roles, permissions, and test users
php artisan db:seed

# Build frontend assets
npm run dev
```

### Default Seeded Accounts

| Email | Role |
|-------|------|
| superadmin@resumeexpert.com | Super Admin |
| admin@resumeexpert.com | Admin |
| test@example.com | User |

---

## Development

```bash
# Start Laravel dev server
php artisan serve

# Start Vite dev server (separate terminal)
npm run dev

# Build for production
npm run build
```

---

## Project Structure

```
app/
  Http/
    Controllers/
      Admin/                  # Admin panel controllers
      Auth/                   # Authentication controllers (Breeze)
      ChatController.php      # Chat support system
      DashboardController.php # User dashboard
      ResumeBuilderController.php
      ResumeController.php    # Resume upload & analysis
    Middleware/
      AdminMiddleware.php     # Admin role gate
      HandleInertiaRequests.php
  Models/
    User.php                  # User with role & permission helpers
    Resume.php                # Uploaded resume with analysis data
    BuiltResume.php           # Builder-created resume
    ChatMessage.php           # Support chat message
    Role.php                  # RBAC role
    Permission.php            # RBAC permission
  Services/
    ResumeAnalysisService.php    # Core analysis engine
    ResumeBuilderPdfService.php  # PDF generation for builder
    TemplateRegistry.php         # Template definitions & metadata

resources/
  js/
    Components/
      ResumeBuilder/           # Builder UI (toolbar, forms, preview, templates)
      Navbar.jsx               # Main navigation bar
      Footer.jsx               # Site footer with legal links
      Modal.jsx                # Reusable modal dialog
      ScrollReveal.jsx         # Intersection Observer animations
      AnimatedCounter.jsx      # Animated number counter
      AnimatedScoreGauge.jsx   # Circular score gauge
      Toast.jsx                # Notification component
      PasswordStrength.jsx     # Password validation indicator
      ScrollToTop.jsx          # Scroll-to-top button
      ResumeDetailModal.jsx    # Resume analysis detail modal
    Layouts/
      AuthenticatedLayout.jsx  # Dashboard layout with sidebar
      AdminLayout.jsx          # Admin panel layout
    Pages/
      Admin/                   # Admin dashboard, users, roles
      Auth/                    # Login, register, password reset, etc.
      Chat/                    # User & admin chat interfaces
      ResumeBuilder/           # Builder index & editor
      Dashboard.jsx            # Main user dashboard
      Welcome.jsx              # Marketing landing page
      CreateProfile.jsx        # Onboarding wizard
      PrivacyPolicy.jsx        # Privacy policy page
      TermsOfService.jsx       # Terms of service page
  views/
    pdf/
      resume-templates/        # 6 Blade PDF templates
      resume-sections/         # Reusable section partials

database/
  migrations/                  # All table migrations
  seeders/                     # Roles, permissions, test users
```

---

## License

This project is proprietary software. All rights reserved.
