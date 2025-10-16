# Firebase CLI Authentication Instructions

## Step 1: Authenticate Firebase CLI

Run the following command in your terminal:

```bash
firebase login
```

This will:
1. Open your browser
2. Prompt you to sign in with your Google account
3. Authorize Firebase CLI to access your Firebase projects

## Step 2: Verify Authentication

After authentication, verify it worked by listing your projects:

```bash
firebase projects:list
```

You should see a list of your Firebase projects.

## Step 3: Select Project (Next Task)

Once authenticated, you can proceed to select your Firebase project for this InvoiceBot MVP.

## Troubleshooting

If you encounter issues:

1. **Clear existing authentication:**
   ```bash
   firebase logout
   firebase login
   ```

2. **Use non-interactive mode:**
   ```bash
   firebase login --no-localhost
   ```

3. **Check authentication status:**
   ```bash
   firebase projects:list
   ```

## Security Notes

- Firebase CLI stores authentication tokens locally
- Tokens are automatically refreshed
- Use `firebase logout` to clear authentication when done
