# Environment Variables Configuration Guide

## Required Environment Variables

Create a `.env.local` file in the `apps/frontend/` directory with the following variables:

### Firebase Configuration
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

### Firebase Admin SDK (for backend functions)
```
FIREBASE_PROJECT_ID=your_project_id_here
FIREBASE_PRIVATE_KEY=your_private_key_here
FIREBASE_CLIENT_EMAIL=your_client_email_here
```

### WhatsApp Integration
```
TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
TWILIO_WHATSAPP_NUMBER=your_whatsapp_number_here
```

### Email Service
```
SENDGRID_API_KEY=your_sendgrid_api_key_here
# OR
RESEND_API_KEY=your_resend_api_key_here
```

### Application Configuration
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Security
```
JWT_SECRET=your_jwt_secret_here
ENCRYPTION_KEY=your_encryption_key_here
```

## Instructions

1. Copy the Firebase configuration from your Firebase Console
2. Set up Twilio account for WhatsApp integration
3. Choose either SendGrid or Resend for email service
4. Generate secure random strings for JWT_SECRET and ENCRYPTION_KEY
5. Update NEXT_PUBLIC_APP_URL for production deployment

## Security Notes

- Never commit `.env.local` to version control
- Use different values for development and production
- Rotate secrets regularly
- Use Firebase Secret Manager for production deployments
