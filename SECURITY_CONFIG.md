# Environment Variables Security Configuration

## Production Environment Variables

For production deployments, use Firebase Secret Manager or your cloud provider's secret management service.

### Firebase Secret Manager Setup

1. **Install Firebase Admin SDK**:
   ```bash
   pnpm add firebase-admin
   ```

2. **Set up secrets in Firebase Console**:
   - Go to Firebase Console > Project Settings > Service Accounts
   - Generate a new private key
   - Store sensitive values in Secret Manager

3. **Access secrets in Cloud Functions**:
   ```typescript
   import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
   
   const client = new SecretManagerServiceClient();
   
   async function getSecret(secretName: string) {
     const [version] = await client.accessSecretVersion({
       name: `projects/${process.env.GOOGLE_CLOUD_PROJECT}/secrets/${secretName}/versions/latest`,
     });
     return version.payload?.data?.toString();
   }
   ```

## Development Environment Variables

### Frontend (.env.local)
```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Backend Functions (.env)
```bash
# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your_service_account@your_project.iam.gserviceaccount.com

# WhatsApp Integration
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_NUMBER=your_whatsapp_number

# Email Service
SENDGRID_API_KEY=your_sendgrid_api_key
# OR
RESEND_API_KEY=your_resend_api_key

# Security
JWT_SECRET=your_jwt_secret_here
ENCRYPTION_KEY=your_encryption_key_here

# Logging
LOG_LEVEL=debug
```

## Security Best Practices

### 1. Environment Variable Validation
```typescript
// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  FIREBASE_PROJECT_ID: z.string().min(1),
  TWILIO_ACCOUNT_SID: z.string().min(1),
  TWILIO_AUTH_TOKEN: z.string().min(1),
});

export const env = envSchema.parse(process.env);
```

### 2. Secret Rotation
- Rotate API keys every 90 days
- Use different keys for development and production
- Monitor secret usage and access logs

### 3. Access Control
- Limit secret access to necessary services only
- Use IAM roles and policies
- Enable audit logging for secret access

### 4. Development Guidelines
- Never commit `.env*` files to version control
- Use different values for each environment
- Document required environment variables
- Validate all environment variables at startup

## Deployment Configuration

### Vercel (Frontend)
```bash
# Set environment variables in Vercel dashboard
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID
# ... other variables
```

### Firebase Functions (Backend)
```bash
# Set secrets in Firebase Secret Manager
firebase functions:secrets:set TWILIO_AUTH_TOKEN
firebase functions:secrets:set SENDGRID_API_KEY
# ... other secrets
```

## Monitoring and Alerting

### 1. Secret Access Monitoring
- Monitor secret access patterns
- Alert on unusual access attempts
- Track secret usage metrics

### 2. Environment Variable Validation
- Validate all required variables at startup
- Fail fast if critical variables are missing
- Log validation errors for debugging

### 3. Security Scanning
- Regular security audits
- Dependency vulnerability scanning
- Secret detection in code reviews
