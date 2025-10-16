# Firebase Project Selection Instructions

## Step 1: Create Firebase Project (if not exists)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `invoice-bot-mvp` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Select Project with Firebase CLI

Run the following command in your terminal:

```bash
firebase use --add
```

This will:
1. List your available Firebase projects
2. Prompt you to select a project
3. Ask for an alias (use `default` or `dev`)
4. Set the project as active for this directory

## Step 3: Verify Project Selection

Check that the project is selected:

```bash
firebase use
```

You should see output like:
```
Active Project: invoicebot-mvp (alias: default)
```

## Step 4: Initialize Firebase Services

After selecting the project, initialize the required services:

```bash
firebase init
```

Select the following services:
- ✅ Firestore: Configure security rules and indexes
- ✅ Functions: Configure a Cloud Functions directory
- ✅ Storage: Configure a security rules file for Cloud Storage
- ✅ Hosting: Configure files for Firebase Hosting

## Project Configuration

The Firebase project will be configured with:
- **Project ID**: `invoicebot-mvp` (or your chosen name)
- **Region**: `us-central1` (default)
- **Services**: Firestore, Functions, Storage, Hosting

## Environment Variables Update

After project selection, update your `.env.local` file with the actual project values:
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID=invoicebot-mvp`
- `FIREBASE_PROJECT_ID=invoicebot-mvp`

## Next Steps

After completing project selection:
1. Configure Firebase services (T017)
2. Set up Firestore security rules (T021)
3. Configure Storage bucket (T022)
4. Set up Pub/Sub topics (T023)
