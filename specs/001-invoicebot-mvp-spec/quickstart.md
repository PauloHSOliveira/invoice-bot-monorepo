# Quickstart Guide: InvoiceBot MVP

**Project:** InvoiceBot MVP  
**Created:** 2025-01-15  
**Purpose:** Get started with InvoiceBot MVP development quickly

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm/pnpm
- **Firebase CLI** (`npm install -g firebase-tools`)
- **Git** for version control
- **VS Code** (recommended) with extensions:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Firebase for VS Code

## Project Setup

### 1. Clone and Initialize

```bash
# Clone the repository
git clone <repository-url>
cd invoice-bot

# Install dependencies
pnpm install

# Initialize Firebase (if not already done)
firebase login
firebase init
```

### 2. Environment Configuration

Create environment files:

```bash
# Frontend environment
cp apps/frontend/.env.example apps/frontend/.env.local

# Backend environment
cp apps/backend/.env.example apps/backend/.env
```

Configure the following environment variables:

**Frontend (.env.local):**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Backend (.env):**
```env
FIREBASE_PROJECT_ID=your_project_id
WHATSAPP_API_KEY=your_whatsapp_api_key
EMAIL_API_KEY=your_email_api_key
```

### 3. Firebase Project Setup

```bash
# Enable required Firebase services
firebase projects:list
firebase use <your-project-id>

# Enable services
firebase functions:config:set whatsapp.api_key="your_key"
firebase functions:config:set email.api_key="your_key"
```

## Development Workflow

### 1. Start Development Servers

```bash
# Start all services in development mode
pnpm dev

# Or start individually:
# Frontend only
cd apps/frontend && pnpm dev

# Backend only (Firebase emulators)
cd apps/backend && pnpm dev
```

### 2. Project Structure

```
invoice-bot/
├── apps/
│   ├── frontend/          # Next.js 15+ frontend
│   │   ├── src/
│   │   │   ├── app/       # App Router pages
│   │   │   ├── components/ # React components
│   │   │   ├── lib/       # Utilities and config
│   │   │   └── types/     # TypeScript types
│   │   └── public/        # Static assets
│   └── backend/           # Firebase Cloud Functions
│       ├── functions/
│       │   ├── src/
│       │   │   ├── webhooks/    # WhatsApp webhooks
│       │   │   ├── invoices/    # Invoice processing
│       │   │   ├── notifications/ # Email/WhatsApp sending
│       │   │   └── shared/      # Shared utilities
│       │   └── package.json
│       └── firebase.json
├── packages/
│   └── shared/            # Shared types and utilities
└── specs/                 # Project specifications
    └── 001-invoicebot-mvp-spec/
        ├── spec.md        # Technical specification
        ├── plan.md        # Implementation plan
        ├── data-model.md  # Database schema
        └── contracts/     # API contracts
```

### 3. Feature Sliced Design (FSD)

The frontend follows FSD architecture:

```
src/
├── app/                   # Next.js App Router
├── pages/                 # FSD pages layer
├── widgets/               # FSD widgets layer
├── features/              # FSD features layer
│   ├── auth/              # Authentication feature
│   ├── clients/           # Client management
│   ├── invoices/          # Invoice management
│   └── templates/         # Template management
├── entities/              # FSD entities layer
│   ├── user/              # User entity
│   ├── client/            # Client entity
│   └── invoice/           # Invoice entity
└── shared/                # FSD shared layer
    ├── ui/                # UI components
    ├── lib/               # Utilities
    └── api/               # API client
```

## Key Development Tasks

### 1. Authentication Setup

```typescript
// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Your config
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

### 2. Database Operations

```typescript
// lib/firestore.ts
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';

const db = getFirestore();

export async function getUser(userId: string) {
  const userDoc = doc(db, 'users', userId);
  const userSnap = await getDoc(userDoc);
  return userSnap.data();
}
```

### 3. Cloud Functions

```typescript
// functions/src/webhooks/whatsapp.ts
import { onRequest } from 'firebase-functions/v2/https';

export const whatsappWebhook = onRequest(async (req, res) => {
  // Process WhatsApp message
  const { from, message } = req.body;
  
  // Parse message and generate invoice
  // ...
  
  res.json({ success: true });
});
```

## Testing

### 1. Unit Tests

```bash
# Run all tests
pnpm test

# Run tests for specific package
cd apps/frontend && pnpm test
cd apps/backend && pnpm test
```

### 2. Integration Tests

```bash
# Start Firebase emulators
firebase emulators:start

# Run integration tests
pnpm test:integration
```

### 3. E2E Tests

```bash
# Run Playwright tests
pnpm test:e2e
```

## Deployment

### 1. Frontend Deployment (Vercel)

```bash
# Deploy to Vercel
vercel --prod

# Or connect GitHub for automatic deployments
```

### 2. Backend Deployment (Firebase)

```bash
# Deploy Cloud Functions
firebase deploy --only functions

# Deploy all services
firebase deploy
```

## Common Commands

```bash
# Development
pnpm dev                 # Start all services
pnpm build              # Build all packages
pnpm lint               # Lint all code
pnpm type-check         # TypeScript checking

# Testing
pnpm test               # Run all tests
pnpm test:watch         # Watch mode
pnpm test:coverage      # Coverage report

# Deployment
pnpm deploy:staging     # Deploy to staging
pnpm deploy:prod        # Deploy to production

# Database
pnpm db:seed            # Seed development data
pnpm db:migrate         # Run migrations
```

## Troubleshooting

### Common Issues

1. **Firebase Authentication Issues**
   - Check environment variables
   - Verify Firebase project configuration
   - Ensure proper CORS settings

2. **Cloud Functions Not Deploying**
   - Check Firebase CLI version
   - Verify project permissions
   - Check function logs: `firebase functions:log`

3. **Frontend Build Issues**
   - Clear Next.js cache: `rm -rf .next`
   - Check TypeScript errors: `pnpm type-check`
   - Verify environment variables

### Getting Help

- Check the [Firebase Documentation](https://firebase.google.com/docs)
- Review [Next.js Documentation](https://nextjs.org/docs)
- Consult the project specification in `specs/001-invoicebot-mvp-spec/`

## Next Steps

1. **Complete Phase 1**: Environment setup and base architecture
2. **Implement Authentication**: User management and security
3. **Build Dashboard**: Client and template management
4. **Add Backend Logic**: WhatsApp processing and PDF generation
5. **Integrate Services**: External API integrations
6. **Test and Deploy**: Comprehensive testing and production deployment

## Resources

- [Project Constitution](../.specify/memory/constitution.md)
- [Technical Specification](./spec.md)
- [Implementation Plan](./plan.md)
- [Data Model](./data-model.md)
- [API Contracts](./contracts/api.yaml)
