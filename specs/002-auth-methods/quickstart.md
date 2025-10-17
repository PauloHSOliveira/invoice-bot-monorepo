# Quick Start Guide: Authentication Methods

**Project:** InvoiceBot MVP  
**Feature:** Authentication Methods  
**Version:** 1.0.0  
**Created:** 2025-01-27  
**Last Updated:** 2025-01-27

## Overview

This quick start guide provides step-by-step instructions for implementing the Authentication Methods feature for InvoiceBot MVP. This feature establishes foundational architecture patterns that will be reused across all InvoiceBot features.

## Prerequisites

- Node.js 18+ and npm/pnpm
- Firebase project with Authentication enabled
- Google Cloud Console project for OAuth
- Next.js 15+ project setup
- TypeScript configuration

## Setup Instructions

### 1. Firebase Configuration

#### 1.1 Create Firebase Project
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Create new project
firebase projects:create invoicebot-mvp

# Initialize Firebase in your project
firebase init
```

#### 1.2 Enable Authentication Providers
1. Go to Firebase Console → Authentication → Sign-in method
2. Enable Email/Password provider
3. Enable Phone provider
4. Enable Google provider
5. Configure OAuth consent screen

#### 1.3 Configure Firebase Environment
```bash
# Install Firebase SDK
npm install firebase

# Create environment file
touch .env.local
```

Add to `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 2. Project Structure Setup

#### 2.1 Create Modular Directory Structure
```bash
mkdir -p src/modules/auth/sign-in/{form,actions,types,constants}
mkdir -p src/modules/auth/sign-up/{form,actions,types,constants}
mkdir -p src/modules/auth/profile/{form,actions,types,constants}
mkdir -p src/modules/form-builder/{providers,components,types}
mkdir -p src/modules/ui/{components,hooks}
mkdir -p src/lib/{api,firebase,session,analytics}
mkdir -p packages/shared/src
```

#### 2.2 Install Required Dependencies
```bash
# Core dependencies
npm install firebase react-hook-form @hookform/resolvers zod
npm install @radix-ui/react-toast @radix-ui/react-slot
npm install lucide-react class-variance-authority clsx tailwind-merge

# Development dependencies
npm install -D @types/node @types/react @types/react-dom
npm install -D typescript eslint prettier biome
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D jest jest-environment-jsdom
```

### 3. Firebase Configuration Setup

#### 3.1 Create Firebase Configuration
```typescript
// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
```

#### 3.2 Create Firebase Abstraction Layer
```typescript
// packages/shared/src/auth-service.ts
export interface AuthServiceInterface {
  signInWithEmail(email: string, password: string): Promise<UserCredential>;
  signUpWithEmail(email: string, password: string): Promise<UserCredential>;
  signInWithGoogle(): Promise<UserCredential>;
  signInWithPhone(phoneNumber: string): Promise<ConfirmationResult>;
  signOut(): Promise<void>;
  resetPassword(email: string): Promise<void>;
}

export class FirebaseAuthService implements AuthServiceInterface {
  // Implementation details
}
```

### 4. Form Builder Architecture Setup

#### 4.1 Create Form Builder Provider
```typescript
// src/modules/form-builder/providers/form-builder-provider.tsx
'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';

interface FormBuilderState {
  currentPage: number;
  isCompleted: boolean;
  isSubmitted: boolean;
}

interface FormBuilderAction {
  type: 'submit-success' | 'page-change' | 'form-reset';
  payload?: any;
}

const FormBuilderContext = createContext<{
  state: FormBuilderState;
  dispatch: (action: FormBuilderAction) => void;
} | null>(null);

export const FormBuilderProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(formBuilderReducer, initialState);
  
  return (
    <FormBuilderContext.Provider value={{ state, dispatch }}>
      {children}
    </FormBuilderContext.Provider>
  );
};

export const useFormBuilderState = () => {
  const context = useContext(FormBuilderContext);
  if (!context) throw new Error('useFormBuilderState must be used within FormBuilderProvider');
  return context.state;
};

export const useFormBuilderDispatch = () => {
  const context = useContext(FormBuilderContext);
  if (!context) throw new Error('useFormBuilderDispatch must be used within FormBuilderProvider');
  return context.dispatch;
};
```

#### 4.2 Create Form Builder Components
```typescript
// src/modules/form-builder/components/layout/form-page.tsx
'use client';

import { ComponentProps } from 'react';
import { cn } from '@/modules/ui/lib/utils';

interface FormPageProps {
  isEnabled?: boolean;
  isInitiallyHidden?: boolean;
  onContinue?: () => Promise<void | boolean>;
}

export interface FormBuilderPageProps extends ComponentProps<'div'> & FormPageProps {
  id: string;
}

export const FormBuilderPage = ({ 
  id, 
  isEnabled = true, 
  isInitiallyHidden = false, 
  className, 
  ...rest 
}: FormBuilderPageProps) => {
  return (
    <div 
      id={id} 
      data-initially-hidden={isInitiallyHidden} 
      data-page-id={id} 
      className={cn(
        'flex h-full w-full flex-col',
        className, 
        !isEnabled && 'hidden'
      )} 
      {...rest} 
    />
  );
};
```

### 5. Generic TypeScript Form Components

#### 5.1 Create Base Form Input Component
```typescript
// src/modules/ui/components/form-input.tsx
'use client';

import { ComponentProps, useId } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { cn } from '@/modules/ui/lib/utils';

interface BaseFormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const BaseFormInput = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  required = false,
  disabled = false,
  className,
  ...rest
}: BaseFormInputProps<T>) => {
  const id = useId();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn(className, 'space-y-1')}>
          {label && (
            <FormLabel htmlFor={id} className="text-base text-black font-medium">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <input
              {...rest}
              {...field}
              id={id}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                fieldState.error && 'border-red-500 focus:border-red-500',
                disabled && 'bg-gray-100 cursor-not-allowed'
              )}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
```

#### 5.2 Create Password Input Component
```typescript
// src/modules/ui/components/password-input.tsx
'use client';

import { Eye, EyeOff } from 'lucide-react';
import { ComponentProps, useId, useState } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { cn } from '@/modules/ui/lib/utils';
import { BaseFormInput } from './form-input';

interface PasswordInputProps<T extends FieldValues> extends BaseFormInputProps<T> {
  showStrengthIndicator?: boolean;
  minLength?: number;
  showToggle?: boolean;
  autoComplete?: 'new-password' | 'current-password';
}

export const PasswordInput = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  className,
  showStrengthIndicator = false,
  minLength = 8,
  showToggle = true,
  autoComplete = 'new-password',
  ...rest
}: PasswordInputProps<T>) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormField
      control={control}
      name={name}
      rules={{
        required: 'Password is required',
        minLength: {
          value: minLength,
          message: `Password must be at least ${minLength} characters`,
        },
      }}
      render={({ field, fieldState }) => (
        <FormItem className={cn(className, 'space-y-1')}>
          {label && (
            <FormLabel htmlFor={id} className="text-base text-black font-medium">
              {label}
            </FormLabel>
          )}
          <FormControl>
            <div className="relative">
              <input
                {...rest}
                {...field}
                id={id}
                type={showPassword ? 'text' : 'password'}
                autoComplete={autoComplete}
                className={cn(
                  'w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                  fieldState.error && 'border-red-500 focus:border-red-500'
                )}
              />
              {showToggle && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
```

### 6. Zod Schema Integration

#### 6.1 Create Zod Schemas
```typescript
// src/modules/auth/types/schemas.ts
import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  displayName: z.string().min(2, 'Display name must be at least 2 characters').optional(),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const phoneAuthSchema = z.object({
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  verificationCode: z.string().length(6, 'Verification code must be 6 digits').optional(),
});

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type PhoneAuthFormData = z.infer<typeof phoneAuthSchema>;
```

#### 6.2 Create useZodForm Hook
```typescript
// src/modules/ui/hooks/use-zod-form.ts
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormProps } from 'react-hook-form';

export interface UseZodFormProps<TSchema extends z.ZodType<any, any>>
  extends UseFormProps<z.infer<TSchema>> {
  zodSchema: TSchema;
}

export function useZodForm<TSchema extends z.ZodType<any, any>>({
  zodSchema,
  ...useFormProps
}: UseZodFormProps<TSchema>) {
  const form = useForm<z.infer<TSchema>>({
    resolver: zodResolver(zodSchema),
    ...useFormProps,
  });
  
  return form;
}
```

### 7. Server Actions Implementation

#### 7.1 Create Sign-In Server Action
```typescript
// src/modules/auth/actions/sign-in.ts
'use server';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { SignInFormData } from '../types/schemas';

export async function signInAction(data: SignInFormData) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    
    return {
      success: true,
      user: userCredential.user,
      message: 'Sign in successful',
    };
  } catch (error) {
    return {
      success: false,
      error: 'Invalid email or password',
    };
  }
}
```

#### 7.2 Create Sign-Up Server Action
```typescript
// src/modules/auth/actions/sign-up.ts
'use server';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { SignUpFormData } from '../types/schemas';

export async function signUpAction(data: SignUpFormData) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    
    return {
      success: true,
      user: userCredential.user,
      message: 'Account created successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to create account',
    };
  }
}
```

### 8. Authentication Pages Implementation

#### 8.1 Create Sign-In Page
```typescript
// src/app/auth/signin/page.tsx
import { SignInForm } from '@/modules/auth/sign-in/form';
import { signInAction } from '@/modules/auth/actions/sign-in';

export default async function SignInPage() {
  const handleSignIn = async (data: SignInFormData) => {
    'use server';
    const result = await signInAction(data);
    return result;
  };

  return <SignInForm onSubmit={handleSignIn} />;
}
```

#### 8.2 Create Sign-In Form Component
```typescript
// src/modules/auth/sign-in/form/index.tsx
'use client';

import { FormBuilderProvider } from '@/modules/form-builder/providers/form-builder-provider';
import { SignInMainFormContent } from './main/form';
import { SignInFormData } from '../types/schemas';

export type SignInFormProps = {
  onSubmit: (data: SignInFormData) => Promise<ServerActionResult<void>>;
};

export const SignInForm = (props: SignInFormProps) => {
  return (
    <FormBuilderProvider>
      <SignInMainFormContent {...props} />
    </FormBuilderProvider>
  );
};
```

### 9. Testing Setup

#### 9.1 Create Test Configuration
```typescript
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
```

#### 9.2 Create Test Setup File
```typescript
// jest.setup.js
import '@testing-library/jest-dom';
```

#### 9.3 Create Component Test Example
```typescript
// src/modules/auth/sign-in/form/__tests__/sign-in-form.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SignInForm } from '../index';
import { SignInFormData } from '../../types/schemas';

const mockOnSubmit = jest.fn();

describe('SignInForm', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders sign-in form correctly', () => {
    render(<SignInForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    render(<SignInForm onSubmit={mockOnSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
```

### 10. Configuration and Environment Setup

#### 10.1 Create Configuration Service
```typescript
// src/lib/config.ts
export const authConfig = {
  providers: {
    emailPassword: process.env.NEXT_PUBLIC_ENABLE_EMAIL_PASSWORD === 'true',
    phoneNumber: process.env.NEXT_PUBLIC_ENABLE_PHONE_NUMBER === 'true',
    google: process.env.NEXT_PUBLIC_ENABLE_GOOGLE === 'true',
    googleOneTap: process.env.NEXT_PUBLIC_ENABLE_GOOGLE_ONE_TAP === 'true',
  },
  settings: {
    requireEmailVerification: process.env.NEXT_PUBLIC_REQUIRE_EMAIL_VERIFICATION === 'true',
    sessionTimeout: parseInt(process.env.NEXT_PUBLIC_SESSION_TIMEOUT || '60'),
  },
  paths: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    profile: '/auth/profile',
  },
};
```

#### 10.2 Update Environment Variables
```env
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Authentication Configuration
NEXT_PUBLIC_ENABLE_EMAIL_PASSWORD=true
NEXT_PUBLIC_ENABLE_PHONE_NUMBER=true
NEXT_PUBLIC_ENABLE_GOOGLE=true
NEXT_PUBLIC_ENABLE_GOOGLE_ONE_TAP=true
NEXT_PUBLIC_REQUIRE_EMAIL_VERIFICATION=true
NEXT_PUBLIC_SESSION_TIMEOUT=60
```

## Next Steps

1. **Implement Google OAuth**: Set up Google OAuth provider and One Tap integration
2. **Implement Phone Authentication**: Set up SMS verification with Firebase
3. **Create User Profile Management**: Implement profile viewing and editing
4. **Add Error Handling**: Implement comprehensive error handling and user feedback
5. **Add Accessibility**: Ensure WCAG 2.1 AA compliance
6. **Add Internationalization**: Implement i18n support for error messages
7. **Create Architecture Documentation**: Document all established patterns
8. **Set up Biome Rules**: Configure automated pattern enforcement
9. **Create Code Templates**: Generate templates for new features
10. **Set up CI/CD**: Configure automated testing and deployment

## Troubleshooting

### Common Issues

1. **Firebase Configuration**: Ensure all environment variables are correctly set
2. **TypeScript Errors**: Check that all imports and types are correctly defined
3. **Form Validation**: Verify Zod schemas match form data structures
4. **Server Actions**: Ensure 'use server' directive is properly placed
5. **Testing**: Check that test environment is properly configured

### Support Resources

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Next.js Server Actions Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Conclusion

This quick start guide provides the foundation for implementing the Authentication Methods feature. The established patterns will be reused across all InvoiceBot features, ensuring consistency and maintainability. Follow the steps sequentially and refer to the detailed specifications for complete implementation guidance.
