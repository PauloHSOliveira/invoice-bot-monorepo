# Technical Specification: Authentication Methods

**Project:** InvoiceBot MVP  
**Feature:** Authentication Methods  
**Version:** 1.0.0  
**Created:** 2025-01-27  
**Last Updated:** 2025-01-27

## Constitution Check

This specification adheres to the following constitutional principles:
- ✅ User-Centric Design: Feature prioritizes user experience with multiple authentication options
- ✅ Scalable Architecture: Uses Firebase Authentication for scalable user management
- ✅ Security First: Implements secure authentication flows with proper validation
- ✅ MVP Focus: Focuses on essential authentication methods for MVP launch
- ✅ Quality Assurance: Includes comprehensive testing and validation requirements

## Feature Overview

Implement a comprehensive authentication system for the InvoiceBot web dashboard that supports three primary authentication methods: Google OAuth (including Google One Tap), email/password, and phone number authentication. The system will provide a seamless user experience with secure session management and proper error handling.

**InvoiceBot MVP Context:**
This authentication system serves as the foundation for InvoiceBot's core features:
- **Invoice Management**: Create, edit, send, and track invoices
- **Client Management**: Manage client information and relationships
- **Template Management**: Create and manage invoice templates
- **Scheduling**: Automated invoice scheduling and recurring billing

**MVP Scope and Prioritization:**
For the initial MVP launch, we focus on essential features that demonstrate the established architecture patterns:
- **Essential MVP Features**: Authentication, Invoice Management, Client Management, Basic Templates
- **Deferred Features**: Advanced Templates, Scheduling, Advanced Analytics
- **MVP Value Proposition**: Create, send, and track invoices with professional templates
- **Architecture Demonstration**: All MVP features showcase Form Builder, Server Actions, Firebase abstraction, and modular organization patterns

The authentication patterns established here will be reused across all InvoiceBot features, ensuring consistent user experience and maintainable codebase architecture.

## Clarifications

### Session 2025-01-27

- Q: Authentication state management architecture for Next.js App Router → A: Hybrid approach - Server-side auth with cookies + client context for interactive features
- Q: Session management strategy for hybrid authentication → A: Firebase Auth tokens in HTTP-only cookies with server-side validation
- Q: Google One Tap integration scope and placement → A: One Tap on login page + optional global integration for returning users
- Q: Phone authentication verification flow and SMS handling → A: Firebase Auth phone verification with SMS codes (6-digit)
- Q: Error handling and user feedback strategy for hybrid auth → A: Toast notifications + inline form errors + server-side error pages
- Q: Authentication provider configuration strategy and architecture → A: Configuration-driven provider strategy with environment-based enablement
- Q: Form input component strategy and architecture → A: Reusable form components with React Hook Form integration (loosely coupled)
- Q: Component architecture and separation of concerns → A: Feature-based organization with shared UI components + compound components pattern (Auth.Header, Auth.Row, Auth.Column, Auth.Footer, Auth.Content, Auth.Form)
- Q: Configuration management strategy and validation → A: Centralized configuration with environment variable validation
- Q: Testing strategy for compound components and loosely coupled architecture → A: Component composition testing with integration tests
- Q: Form component implementation pattern and TypeScript integration → A: Generic TypeScript form components with React Hook Form integration (following PasswordInputForm pattern)
- Q: Form validation strategy and implementation approach → A: Built-in validation rules with custom validation functions (following PasswordInputForm pattern)
- Q: Accessibility implementation standards and compliance requirements → A: WCAG 2.1 AA compliance with comprehensive accessibility features
- Q: Error message localization strategy and internationalization approach → A: Built-in error messages with i18n support for multiple languages
- Q: Component testing strategy for sophisticated form components → A: Unit tests for individual components + integration tests for form compositions
- Q: Page architecture pattern and server-side form handling → A: Server Actions with Form Builder architecture (following SignInPage pattern)
- Q: Service layer architecture and API client organization → A: Centralized API client with service factories (implemented in packages directory)
- Q: Zod schema integration strategy and form validation approach → A: Centralized schemas with useZodForm integration (following your pattern)
- Q: Analytics integration strategy and event tracking approach → A: Event-based analytics with authentication tracking (following sendAnalyticsEvent pattern)
- Q: Error handling and toast notification integration strategy → A: Toast notifications with server action error handling (following your pattern)
- Q: Firebase backend architecture with future API migration strategy → A: Firebase SDK with abstraction layer for future API migration
- Q: Form Builder layout system architecture and component structure → A: Form Builder layout components with page-based structure (following your pattern)
- Q: Form state management strategy and provider architecture → A: Form Builder Provider with state management (following your pattern)
- Q: Component organization and module structure strategy → A: Modular organization with feature-based structure (following your pattern)
- Q: Testing strategy for modular architecture and complex integrations → A: Module-based testing with integration tests
- Q: Project architecture foundation and reusable patterns alignment → A: Establish foundational architecture patterns for InvoiceBot MVP (Form Builder, Server Actions, Firebase abstraction, modular organization)
- Q: InvoiceBot MVP feature alignment and scope focus → A: Focus on core InvoiceBot MVP features with established patterns (invoices, clients, templates, scheduling)
- Q: Main plan/spec alignment with established patterns → A: Update main plan/spec to reflect established patterns (Form Builder, Server Actions, Firebase abstraction, modular organization)
- Q: MVP scope and feature prioritization strategy → A: Focus on essential MVP features with established patterns (auth, invoices, clients, basic templates)
- Q: Architecture pattern documentation and enforcement strategy → A: Create comprehensive architecture documentation and enforcement (style guides, linting rules, templates)

## Requirements

### Functional Requirements

#### FR-001: Google OAuth Authentication
**Description:** Users can authenticate using their Google account through OAuth2 flow  
**Priority:** High  
**Acceptance Criteria:**
- [ ] Users can sign in with Google account
- [ ] Users can sign up with Google account (creates new user if not exists)
- [ ] Google profile information is properly retrieved and stored
- [ ] Authentication state persists across browser sessions
- [ ] Users can sign out from Google authentication

#### FR-002: Google One Tap Authentication
**Description:** Implement Google One Tap for seamless authentication experience with strategic placement  
**Priority:** High  
**Acceptance Criteria:**
- [ ] One Tap prompt appears on login page for all users
- [ ] Optional One Tap integration available globally for returning authenticated users
- [ ] Toast notification shows when user is identified as logged in to Google
- [ ] One Tap integrates seamlessly with existing Google OAuth flow
- [ ] One Tap respects user privacy preferences and can be dismissed
- [ ] One Tap works across different browsers and devices

#### FR-003: Email/Password Authentication
**Description:** Users can authenticate using email address and password  
**Priority:** High  
**Acceptance Criteria:**
- [ ] Users can sign up with email and password
- [ ] Users can sign in with email and password
- [ ] Password requirements are enforced (minimum 8 characters, complexity)
- [ ] Users can reset forgotten passwords via email
- [ ] Email verification is required for new accounts
- [ ] Users can change their password when authenticated

#### FR-004: Phone Number Authentication
**Description:** Users can authenticate using their phone number via Firebase Auth SMS verification  
**Priority:** High  
**Acceptance Criteria:**
- [ ] Users can sign up with phone number using Firebase Auth
- [ ] Firebase sends 6-digit SMS verification code to provided phone number
- [ ] Users can verify phone number with received SMS code
- [ ] Phone number format validation is implemented (E.164 format)
- [ ] Firebase rate limiting prevents SMS abuse
- [ ] Users can update their phone number when authenticated

#### FR-005: Authentication State Management
**Description:** Proper management of user authentication state across the application using hybrid server-side and client-side approach  
**Priority:** High  
**Acceptance Criteria:**
- [ ] Server-side authentication state managed via secure HTTP-only cookies
- [ ] Client-side React context provides interactive authentication features
- [ ] Protected routes redirect unauthenticated users to login
- [ ] Authentication state persists across page refreshes via server-side validation
- [ ] Users are automatically signed out after session timeout
- [ ] Multiple authentication methods can be linked to same account

#### FR-006: User Profile Management
**Description:** Authenticated users can manage their profile information  
**Priority:** Medium  
**Acceptance Criteria:**
- [ ] Users can view their profile information
- [ ] Users can update their profile details
- [ ] Users can manage linked authentication methods
- [ ] Users can delete their account
- [ ] Profile changes are properly validated and saved

#### FR-007: Toast Notifications with Server Action Error Handling
**Description:** Sophisticated error handling with toast notifications and server action error management  
**Priority:** High  
**Acceptance Criteria:**
- [ ] Toast notifications with useToast hook integration
- [ ] Server action error handling with proper error propagation
- [ ] Default error form toast for consistent error display
- [ ] Inline form errors show validation issues in real-time
- [ ] Server-side error pages handle authentication failures gracefully
- [ ] Error messages are user-friendly and actionable
- [ ] Loading states provide clear feedback during authentication processes
- [ ] Network errors are handled with appropriate retry mechanisms
- [ ] Error handling integration with FormBuilderSubmitResult types

#### FR-008: Authentication Provider Configuration
**Description:** Flexible configuration system for enabling/disabling authentication providers  
**Priority:** High  
**Acceptance Criteria:**
- [ ] Configuration-driven provider strategy allows dynamic enablement/disablement
- [ ] Environment variables control which providers are available
- [ ] Provider configuration is centralized and maintainable
- [ ] Strategy pattern implementation allows easy addition of new providers
- [ ] Configuration validation ensures only enabled providers are rendered
- [ ] Provider-specific settings are configurable per environment

#### FR-009: Generic TypeScript Form Components
**Description:** Sophisticated form components with generic TypeScript typing and React Hook Form integration  
**Priority:** High  
**Acceptance Criteria:**
- [ ] Generic TypeScript form components (EmailInputForm, PasswordInputForm, PhoneInputForm) with Control<T> and FieldPath<T>
- [ ] Components follow PasswordInputForm pattern with proper type safety
- [ ] React Hook Form integration with validation rules and error handling
- [ ] WCAG 2.1 AA compliance with comprehensive accessibility features
- [ ] Advanced UI patterns (password visibility toggle, strength indicators)
- [ ] Composition support with optional components (ResetPasswordComponent)
- [ ] Consistent styling with error states and focus management

#### FR-012: Accessibility Compliance
**Description:** WCAG 2.1 AA compliance with comprehensive accessibility features for all authentication components  
**Priority:** High  
**Acceptance Criteria:**
- [ ] All form components meet WCAG 2.1 AA standards
- [ ] Proper ARIA labels, roles, and descriptions for all interactive elements
- [ ] Keyboard navigation support for all authentication flows
- [ ] Screen reader compatibility with proper semantic markup
- [ ] Focus management and visual focus indicators
- [ ] Color contrast ratios meet WCAG AA standards (4.5:1 for normal text)
- [ ] Error messages are accessible and properly associated with form fields

#### FR-013: Internationalization Support
**Description:** Built-in error messages with i18n support for multiple languages  
**Priority:** Medium  
**Acceptance Criteria:**
- [ ] Form components support multiple languages through i18n integration
- [ ] Error messages are localized and customizable per locale
- [ ] Built-in default error messages with translation key support
- [ ] Locale-specific validation messages and form labels
- [ ] RTL (Right-to-Left) language support for Arabic/Hebrew
- [ ] Date and number formatting respects locale settings
- [ ] Translation keys follow consistent naming conventions

#### FR-014: Server Actions with Form Builder Architecture
**Description:** Server Actions pattern with Form Builder architecture for authentication pages  
**Priority:** High  
**Acceptance Criteria:**
- [ ] Server Actions pattern implemented with 'use server' functions
- [ ] Form Builder Provider and Wrapper architecture for form management
- [ ] Zod schema integration with useZodForm hook
- [ ] Modular organization following @/modules/auth/sign-in/form structure
- [ ] Server-side form handling with proper error management
- [ ] Analytics integration for authentication events
- [ ] Type-safe form data handling with ServerActionResult types

#### FR-015: Firebase Backend with Abstraction Layer
**Description:** Firebase SDK with abstraction layer for future API migration implemented in packages directory  
**Priority:** High  
**Acceptance Criteria:**
- [ ] Firebase SDK integration with abstraction layer for future API replacement
- [ ] Service abstraction interfaces for authentication, forms, and other services
- [ ] Firebase Auth integration with token management abstraction
- [ ] Error handling abstraction for future API compatibility
- [ ] Environment-based configuration for Firebase and future API endpoints
- [ ] Type-safe service interfaces with proper error handling
- [ ] Modular service organization in packages directory with easy migration path

#### FR-016: Zod Schema Integration with useZodForm
**Description:** Centralized schemas with useZodForm integration for type-safe form validation  
**Priority:** High  
**Acceptance Criteria:**
- [ ] Centralized Zod schemas for all authentication forms
- [ ] useZodForm hook integration with zodResolver
- [ ] Type-safe form data handling with schema inference
- [ ] Consistent validation rules across all authentication forms
- [ ] Schema-based error message generation
- [ ] Form data transformation and parsing with Zod
- [ ] Integration with React Hook Form for seamless validation

#### FR-017: Event-Based Analytics Integration
**Description:** Event-based analytics with authentication tracking following sendAnalyticsEvent pattern  
**Priority:** Medium  
**Acceptance Criteria:**
- [ ] Event-based analytics integration with sendAnalyticsEvent function
- [ ] Authentication event tracking (login_requested, login_completed, etc.)
- [ ] User behavior tracking for authentication flows
- [ ] Analytics metadata collection with user context
- [ ] Privacy-compliant analytics implementation
- [ ] Analytics event validation and error handling
- [ ] Integration with authentication success/failure callbacks

#### FR-018: Form Builder Layout System
**Description:** Form Builder layout components with page-based structure following your pattern  
**Priority:** High  
**Acceptance Criteria:**
- [ ] FormBuilderPage component with page-based structure and enablement control
- [ ] FormBuilderWrapper and FormBuilderForm layout components
- [ ] FormBuilderContent, FormBuilderSection, and FormBuilderSectionContent components
- [ ] FormBuilderRow with maxColumns configuration for responsive layouts
- [ ] FormBuilderTitle and FormBuilderFooter components
- [ ] Form field components (FormFieldInput, FormFieldRadioGroup, FormFieldInputMask)
- [ ] Form action components (FormContinueButton) with proper integration
- [ ] Page constants and form state management integration

#### FR-019: Form Builder Provider with State Management
**Description:** Form Builder Provider with sophisticated state management following your pattern  
**Priority:** High  
**Acceptance Criteria:**
- [ ] FormBuilderProvider with context-based state management
- [ ] useFormBuilderState hook for accessing form state
- [ ] useFormBuilderDispatch hook for form state actions
- [ ] Form state management for currentPage, isCompleted, isSubmitted
- [ ] Form progress tracking and page navigation
- [ ] Integration with React Hook Form and Zod schemas
- [ ] Form state persistence and error handling

#### FR-020: Modular Organization with Feature-Based Structure
**Description:** Modular organization with feature-based structure following your pattern  
**Priority:** High  
**Acceptance Criteria:**
- [ ] Modular organization following @/modules/auth/sign-in/form structure
- [ ] Feature-based module organization (auth, form-builder, ui, documents)
- [ ] Consistent module structure with form/, actions/, types/, constants/ subdirectories
- [ ] Module-level exports with proper index.tsx files
- [ ] Shared modules for reusable components and utilities
- [ ] Clear separation between feature modules and shared modules
- [ ] Module-specific constants and configuration management
- [ ] Type-safe module imports and exports

#### FR-021: Foundational Architecture Patterns for InvoiceBot MVP
**Description:** Establish foundational architecture patterns for InvoiceBot MVP that will be reused across all features  
**Priority:** High  
**Acceptance Criteria:**
- [ ] Form Builder architecture pattern established as project standard
- [ ] Server Actions pattern with 'use server' functions as project standard
- [ ] Firebase abstraction layer pattern established for all backend services
- [ ] Modular organization pattern (@/modules/{feature}/{subfeature}/form) as project standard
- [ ] Generic TypeScript form components pattern as project standard
- [ ] Zod schema integration with useZodForm as project standard
- [ ] Event-based analytics pattern as project standard
- [ ] Toast notifications with server action error handling as project standard
- [ ] Configuration-driven provider strategy as project standard
- [ ] Module-based testing strategy as project standard
- [ ] Architecture patterns documented and enforced across all InvoiceBot features
- [ ] Consistent implementation patterns for invoices, clients, templates, and scheduling features

#### FR-022: Main Plan/Spec Alignment with Established Patterns
**Description:** Update main InvoiceBot MVP specification to reflect established architecture patterns  
**Priority:** High  
**Acceptance Criteria:**
- [ ] Main InvoiceBot MVP specification updated with Form Builder architecture patterns
- [ ] Main specification includes Server Actions pattern for all features
- [ ] Main specification reflects Firebase abstraction layer for backend services
- [ ] Main specification includes modular organization pattern (@/modules/{feature}/{subfeature}/form)
- [ ] Main specification includes generic TypeScript form components pattern
- [ ] Main specification includes Zod schema integration with useZodForm
- [ ] Main specification includes event-based analytics pattern
- [ ] Main specification includes toast notifications with server action error handling
- [ ] Main specification includes configuration-driven provider strategy
- [ ] Main specification includes module-based testing strategy
- [ ] All InvoiceBot features (invoices, clients, templates, scheduling) follow established patterns
- [ ] Main specification serves as architectural foundation for all feature implementations

#### FR-023: MVP Scope and Feature Prioritization
**Description:** Focus on essential MVP features with established patterns for InvoiceBot launch  
**Priority:** High  
**Acceptance Criteria:**
- [ ] Essential MVP features identified: Authentication, Invoice Management, Client Management, Basic Templates
- [ ] Advanced features deferred: Advanced Templates, Scheduling, Advanced Analytics
- [ ] MVP features demonstrate all established architecture patterns
- [ ] MVP delivers core InvoiceBot value proposition (create, send, track invoices)
- [ ] MVP features are sufficient for user validation and feedback collection
- [ ] MVP scope allows for rapid iteration and feedback incorporation
- [ ] MVP features provide foundation for future feature expansion
- [ ] MVP focuses on user experience and core functionality over advanced features
- [ ] MVP features are prioritized based on user value and technical feasibility
- [ ] MVP scope is clearly defined and communicated to stakeholders

#### FR-024: Architecture Pattern Documentation and Enforcement
**Description:** Create comprehensive architecture documentation and enforcement for consistent pattern application  
**Priority:** High  
**Acceptance Criteria:**
- [ ] Architecture style guide documenting all established patterns
- [ ] Biome rules enforcing Form Builder architecture patterns
- [ ] Biome rules enforcing Server Actions pattern usage
- [ ] Biome rules enforcing modular organization pattern (@/modules/{feature}/{subfeature}/form)
- [ ] Biome rules enforcing generic TypeScript form components pattern
- [ ] Biome rules enforcing Zod schema integration with useZodForm
- [ ] Biome rules enforcing event-based analytics pattern
- [ ] Biome rules enforcing toast notifications with server action error handling
- [ ] Biome rules enforcing configuration-driven provider strategy
- [ ] Biome rules enforcing module-based testing strategy
- [ ] Code templates for new features following established patterns
- [ ] Pre-commit hooks enforcing architecture pattern compliance
- [ ] CI/CD pipeline checks for architecture pattern adherence
- [ ] Documentation for onboarding new developers to established patterns
- [ ] Architecture decision records (ADRs) for pattern evolution

#### FR-010: Compound Component Architecture
**Description:** Feature-based organization with compound components pattern for decoupled architecture  
**Priority:** High  
**Acceptance Criteria:**
- [ ] Compound components pattern implemented (Auth.Header, Auth.Row, Auth.Column, Auth.Footer, Auth.Content, Auth.Form)
- [ ] Feature-based organization with shared UI components
- [ ] Components are composable and can be used independently
- [ ] Clear separation of concerns between authentication logic and UI presentation
- [ ] Shared UI components library for consistent design system
- [ ] Components follow single responsibility principle

#### FR-011: Configuration Management System
**Description:** Centralized configuration management with environment variable validation  
**Priority:** High  
**Acceptance Criteria:**
- [ ] Centralized configuration file with all authentication settings
- [ ] Environment variable validation at application startup
- [ ] Type-safe configuration with TypeScript interfaces
- [ ] Configuration validation prevents invalid provider combinations
- [ ] Environment-specific configuration overrides
- [ ] Configuration errors provide clear, actionable error messages

### Non-Functional Requirements

#### NFR-001: Performance
**Description:** Authentication flows must be fast and responsive  
**Metrics:** 
- Login process completes within 3 seconds
- One Tap authentication completes within 1 second
- Page load time for authenticated users under 2 seconds

#### NFR-002: Security
**Description:** Implement robust security measures for user authentication  
**Implementation:**
- HTTPS enforcement for all authentication flows
- Secure session management with proper token handling
- Input validation and sanitization for all user inputs
- Rate limiting to prevent brute force attacks
- Secure password storage with Firebase Auth

#### NFR-003: Scalability
**Description:** Authentication system must support growing user base  
**Constraints:**
- Support for 10,000+ concurrent users
- Firebase Authentication handles scaling automatically
- Efficient database queries for user data retrieval

## Technical Design

### Architecture Overview

The authentication system establishes foundational architecture patterns for the InvoiceBot MVP project. It uses Firebase Authentication as the primary authentication provider, integrated with a React frontend using Firebase SDK. The system supports multiple authentication methods through Firebase's built-in providers and custom implementations. A configuration-driven strategy pattern allows dynamic enablement/disablement of authentication providers based on environment settings.

**Foundational Patterns Established:**
- **Form Builder Architecture**: Page-based structure with FormBuilderPage, FormBuilderWrapper, FormBuilderContent components
- **Server Actions Pattern**: 'use server' functions with proper error handling and analytics integration
- **Firebase Abstraction Layer**: Service interfaces for future API migration (packages/shared)
- **Modular Organization**: @/modules/{feature}/{subfeature}/form structure with consistent patterns
- **Generic TypeScript Components**: Form components with Control<T> and FieldPath<T> typing
- **Zod Schema Integration**: Centralized schemas with useZodForm hook integration
- **Event-Based Analytics**: sendAnalyticsEvent pattern for user behavior tracking
- **Toast Notifications**: Server action error handling with useToast integration
- **Configuration-Driven Strategy**: Environment-based provider enablement patterns
- **Module-Based Testing**: Comprehensive testing strategy across modules

These patterns will be reused across all InvoiceBot features (invoices, clients, templates, scheduling) ensuring consistency and maintainability.

**Main Plan/Spec Alignment:**
The main InvoiceBot MVP specification (`specs/001-invoicebot-mvp-spec/`) will be updated to reflect these established architecture patterns, ensuring:
- All features follow the same Form Builder architecture
- All features use Server Actions with 'use server' functions
- All features use Firebase abstraction layer for backend services
- All features follow modular organization pattern (@/modules/{feature}/{subfeature}/form)
- All features use generic TypeScript form components
- All features integrate Zod schemas with useZodForm
- All features implement event-based analytics
- All features use toast notifications with server action error handling
- All features follow configuration-driven provider strategy
- All features implement module-based testing strategy

**Architecture Documentation and Enforcement:**
To ensure consistent application of established patterns across all InvoiceBot features:
- **Architecture Style Guide**: Comprehensive documentation of all established patterns
- **Biome Rules**: Automated enforcement of architecture patterns in code
- **Code Templates**: Pre-built templates for new features following established patterns
- **Pre-commit Hooks**: Automated checks for architecture pattern compliance
- **CI/CD Pipeline**: Continuous validation of architecture pattern adherence
- **Developer Onboarding**: Documentation for new developers to learn established patterns
- **Architecture Decision Records (ADRs)**: Documentation for pattern evolution and decisions

### Component Design

#### Frontend Components
```typescript
// Authentication Configuration
interface AuthConfiguration {
  providers: {
    emailPassword: boolean;
    phoneNumber: boolean;
    google: boolean;
    googleOneTap: boolean;
  };
  settings: {
    requireEmailVerification: boolean;
    enableMultiFactorAuth: boolean;
    useRedirectStrategy: boolean;
  };
  paths: {
    signIn: string;
    signUp: string;
    profile: string;
  };
}

// Authentication Context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithPhone: (phoneNumber: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

// Google One Tap Component
interface GoogleOneTapProps {
  onSuccess: (credential: string) => void;
  onError: (error: string) => void;
  autoSelect?: boolean;
}

// Provider Strategy Interface
interface AuthProviderStrategy {
  isEnabled(): boolean;
  render(): React.ReactNode;
  getProviderId(): string;
}

// Form Component Interfaces (Generic TypeScript with React Hook Form)
interface BaseFormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  locale?: string;
  errorMessages?: {
    required?: string;
    pattern?: string;
    minLength?: string;
    custom?: string;
  };
}

interface EmailInputFormProps<T extends FieldValues> extends BaseFormInputProps<T> {
  autoComplete?: 'email' | 'username';
  validation?: {
    required?: boolean | string;
    pattern?: {
      value: RegExp;
      message: string;
    };
    custom?: (value: string) => string | undefined;
  };
}

interface PasswordInputFormProps<T extends FieldValues> extends BaseFormInputProps<T> {
  showStrengthIndicator?: boolean;
  minLength?: number;
  showToggle?: boolean;
  autoComplete?: 'new-password' | 'current-password';
  ResetPasswordComponent?: React.ReactNode;
  validation?: {
    required?: boolean | string;
    minLength?: {
      value: number;
      message: string;
    };
    custom?: (value: string) => string | undefined;
  };
}

interface PhoneInputFormProps<T extends FieldValues> extends BaseFormInputProps<T> {
  countryCode?: string;
  format?: 'E.164' | 'national' | 'international';
  validation?: {
    required?: boolean | string;
    pattern?: {
      value: RegExp;
      message: string;
    };
    custom?: (value: string) => string | undefined;
  };
}

// Compound Components Pattern
interface AuthCompoundProps {
  children: React.ReactNode;
  className?: string;
}

interface AuthHeaderProps extends AuthCompoundProps {
  title?: string;
  subtitle?: string;
}

interface AuthRowProps extends AuthCompoundProps {
  gap?: 'sm' | 'md' | 'lg';
  direction?: 'row' | 'column';
}

interface AuthColumnProps extends AuthCompoundProps {
  span?: number;
  align?: 'left' | 'center' | 'right';
}

interface AuthFooterProps extends AuthCompoundProps {
  links?: Array<{
    href: string;
    label: string;
  }>;
}

interface AuthContentProps extends AuthCompoundProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

interface AuthFormProps extends AuthCompoundProps {
  onSubmit?: (data: any) => void;
  validation?: any;
}

// Zod Schema Integration
interface UseZodFormProps<TSchema extends z.ZodType<any, any>>
  extends UseFormProps<z.infer<TSchema>> {
  zodSchema: TSchema;
}

// Authentication Form Schemas
const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const phoneAuthSchema = z.object({
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  verificationCode: z.string().length(6, 'Verification code must be 6 digits'),
});

type SignInFormData = z.infer<typeof signInSchema>;
type SignUpFormData = z.infer<typeof signUpSchema>;
type PhoneAuthFormData = z.infer<typeof phoneAuthSchema>;

// Form Builder Layout Components
interface FormPageProps {
  isEnabled?: boolean;
  isInitiallyHidden?: boolean;
  onContinue?: () => Promise<void | boolean>;
}

interface FormBuilderPageProps extends ComponentProps<'div'> & FormPageProps {
  id: string;
}

interface FormBuilderRowProps extends ComponentProps<'div'> {
  maxColumns?: number;
}

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  mask?: string;
  items?: Array<{ value: string; label: string }>;
}

// Form Builder Provider and State Management
interface FormBuilderState {
  currentPage: number;
  isCompleted: boolean;
  isSubmitted: boolean;
}

interface FormBuilderAction {
  type: 'submit-success' | 'page-change' | 'form-reset';
  payload?: any;
}

interface FormBuilderContextType {
  state: FormBuilderState;
  dispatch: (action: FormBuilderAction) => void;
}

interface FormBuilderProviderProps {
  children: React.ReactNode;
}

interface FormBuilderSubmitResult<T> {
  pdfURL?: string;
  data?: T;
  error?: string;
}
```

#### Backend Services
```typescript
// Centralized API Client (packages/shared)
class ApiClient {
  private axiosClient: AxiosInstance;
  
  constructor(config: CreateAxiosDefaults);
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  setAuthTokenInterceptor(callback: APIClientAuthTokenInterceptorCallback): void;
  setAuthErrorInterceptor(callback: APIClientAuthErrorInterceptorCallback): void;
}

// Service Factories (packages/shared)
export const createAPIClient = (config: CreateAxiosDefaults): APIClient;
export const createAuthService = (config: { client: APIClient }): AuthService;
export const createFormsService = (config: { client: APIClient }): FormsService;

// Configuration Service
class ConfigurationService {
  private config: AuthConfiguration;
  
  constructor() {
    this.config = this.loadAndValidateConfig();
  }
  
  private loadAndValidateConfig(): AuthConfiguration;
  private validateEnvironmentVariables(): void;
  getConfig(): AuthConfiguration;
  isProviderEnabled(provider: string): boolean;
}

// Firebase Auth Service
class AuthService {
  private config: ConfigurationService;
  
  constructor(config: ConfigurationService) {
    this.config = config;
  }
  
  async signInWithGoogle(): Promise<UserCredential>;
  async signInWithEmail(email: string, password: string): Promise<UserCredential>;
  async signInWithPhone(phoneNumber: string): Promise<ConfirmationResult>;
  async verifyPhoneCode(confirmationResult: ConfirmationResult, code: string): Promise<UserCredential>;
  async signUpWithEmail(email: string, password: string): Promise<UserCredential>;
  async resetPassword(email: string): Promise<void>;
  async signOut(): Promise<void>;
  onAuthStateChanged(callback: (user: User | null) => void): () => void;
}
```

#### Database Schema
```typescript
// User Profile Model
interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  authProviders: string[]; // ['google.com', 'password', 'phone']
}
```

### API Design

#### Endpoints
| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | /api/auth/signup | Create new user account | `{email, password}` | `{user, token}` |
| POST | /api/auth/signin | Sign in existing user | `{email, password}` | `{user, token}` |
| POST | /api/auth/reset-password | Send password reset email | `{email}` | `{message}` |
| POST | /api/auth/verify-phone | Verify phone number | `{phoneNumber}` | `{verificationId}` |
| POST | /api/auth/confirm-phone | Confirm phone verification | `{verificationId, code}` | `{user, token}` |
| GET | /api/auth/profile | Get user profile | - | `{profile}` |
| PUT | /api/auth/profile | Update user profile | `{displayName, phoneNumber}` | `{profile}` |

#### Data Models
```typescript
// Authentication Request/Response
interface SignUpRequest {
  email: string;
  password: string;
  displayName?: string;
}

interface SignInRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  user: UserProfile;
  token: string;
  expiresAt: number;
}

interface PhoneVerificationRequest {
  phoneNumber: string;
}

interface PhoneConfirmationRequest {
  verificationId: string;
  code: string;
}
```

### Integration Points

#### External Services
- **Google OAuth API**: For Google authentication and One Tap
- **Firebase Authentication**: Primary authentication provider
- **SMS Service**: For phone number verification (via Firebase)

#### Internal Services
- **User Profile Service**: Manages user data and preferences
- **Session Management**: Handles authentication state and tokens
- **Notification Service**: Sends verification emails and SMS

## Implementation Details

### Frontend Implementation

#### Component Structure
```
src/
├── modules/
│   ├── auth/                    # Authentication module (foundational)
│   │   ├── sign-in/
│   │   │   ├── form/
│   │   │   │   ├── index.tsx (SignInForm)
│   │   │   │   └── main/
│   │   │   │       └── form.tsx (SignInMainFormContent)
│   │   │   ├── actions/
│   │   │   │   ├── sign-in-send-otp.ts
│   │   │   │   └── sign-in-validate-otp.ts
│   │   │   └── types/
│   │   │       └── schemas.ts
│   │   ├── sign-up/
│   │   │   ├── form/
│   │   │   │   ├── index.tsx (SignUpForm)
│   │   │   │   └── main/
│   │   │   │       └── form.tsx (SignUpMainFormContent)
│   │   │   ├── actions/
│   │   │   │   ├── sign-up-send-otp.ts
│   │   │   │   └── sign-up-validate-otp.ts
│   │   │   └── types/
│   │   │       └── schemas.ts
│   │   └── profile/
│   │       ├── form/
│   │       │   ├── index.tsx (ProfileForm)
│   │       │   └── main/
│   │       │       └── form.tsx (ProfileMainFormContent)
│   │       ├── actions/
│   │       │   └── update-profile.ts
│   │       └── types/
│   │           └── schemas.ts
│   ├── invoices/                # Invoice management module
│   │   ├── create/
│   │   │   ├── form/
│   │   │   │   ├── index.tsx (CreateInvoiceForm)
│   │   │   │   └── main/
│   │   │   │       └── form.tsx (CreateInvoiceMainFormContent)
│   │   │   ├── actions/
│   │   │   │   └── create-invoice.ts
│   │   │   └── types/
│   │   │       └── schemas.ts
│   │   ├── edit/
│   │   │   ├── form/
│   │   │   │   ├── index.tsx (EditInvoiceForm)
│   │   │   │   └── main/
│   │   │   │       └── form.tsx (EditInvoiceMainFormContent)
│   │   │   ├── actions/
│   │   │   │   └── update-invoice.ts
│   │   │   └── types/
│   │   │       └── schemas.ts
│   │   └── list/
│   │       ├── components/
│   │       │   └── invoice-list.tsx
│   │       └── types/
│   │           └── schemas.ts
│   ├── clients/                 # Client management module
│   │   ├── create/
│   │   │   ├── form/
│   │   │   │   ├── index.tsx (CreateClientForm)
│   │   │   │   └── main/
│   │   │   │       └── form.tsx (CreateClientMainFormContent)
│   │   │   ├── actions/
│   │   │   │   └── create-client.ts
│   │   │   └── types/
│   │   │       └── schemas.ts
│   │   └── list/
│   │       ├── components/
│   │       │   └── client-list.tsx
│   │       └── types/
│   │           └── schemas.ts
│   ├── templates/               # Template management module
│   │   ├── create/
│   │   │   ├── form/
│   │   │   │   ├── index.tsx (CreateTemplateForm)
│   │   │   │   └── main/
│   │   │   │       └── form.tsx (CreateTemplateMainFormContent)
│   │   │   ├── actions/
│   │   │   │   └── create-template.ts
│   │   │   └── types/
│   │   │       └── schemas.ts
│   │   └── list/
│   │       ├── components/
│   │       │   └── template-list.tsx
│   │       └── types/
│   │           └── schemas.ts
│   ├── scheduling/              # Scheduling module
│   │   ├── create/
│   │   │   ├── form/
│   │   │   │   ├── index.tsx (CreateScheduleForm)
│   │   │   │   └── main/
│   │   │   │       └── form.tsx (CreateScheduleMainFormContent)
│   │   │   ├── actions/
│   │   │   │   └── create-schedule.ts
│   │   │   └── types/
│   │   │       └── schemas.ts
│   │   └── list/
│   │       ├── components/
│   │       │   └── schedule-list.tsx
│   │       └── types/
│   │           └── schemas.ts
│   ├── form-builder/            # Shared Form Builder module
│   │   ├── providers/
│   │   │   └── form-builder-provider.tsx
│   │   ├── components/
│   │   │   ├── form-wrapper.tsx
│   │   │   └── form-progress-indicator.tsx
│   │   └── types/
│   │       └── form.ts
│   └── ui/                      # Shared UI module
│       ├── components/
│       │   ├── form.tsx (FormProvider)
│       │   ├── Button.tsx
│       │   └── Toast.tsx
│       └── hooks/
│           └── use-zod-form.ts
├── lib/
│   ├── api/
│   │   ├── client.ts (createAPIClient)
│   │   └── services.ts (authService, invoiceService, clientService, etc.)
│   ├── firebase.ts
│   ├── session.ts
│   └── analytics.ts
└── app/
    ├── auth/
    │   ├── login/
    │   │   └── page.tsx (Server Action page)
    │   ├── signup/
    │   │   └── page.tsx (Server Action page)
    │   └── profile/
    │       └── page.tsx (Server Action page)
    ├── invoices/
    │   ├── create/
    │   │   └── page.tsx (Server Action page)
    │   ├── edit/
    │   │   └── page.tsx (Server Action page)
    │   └── list/
    │       └── page.tsx (Server Action page)
    ├── clients/
    │   ├── create/
    │   │   └── page.tsx (Server Action page)
    │   └── list/
    │       └── page.tsx (Server Action page)
    ├── templates/
    │   ├── create/
    │   │   └── page.tsx (Server Action page)
    │   └── list/
    │       └── page.tsx (Server Action page)
    └── scheduling/
        ├── create/
        │   └── page.tsx (Server Action page)
        └── list/
            └── page.tsx (Server Action page)
```

#### State Management
- Hybrid authentication state management:
  - Server-side: Secure HTTP-only cookies for authentication tokens
  - Client-side: React Context for interactive features (sign in/out, profile updates)
- Firebase Auth state persistence with server-side validation
- Local storage for user preferences (non-sensitive data only)
- Multi-layered user feedback system:
  - Toast notifications for global messages
  - Inline form errors for validation feedback
  - Server-side error pages for authentication failures

#### Routing
- Protected routes with authentication middleware
- Redirect logic for authenticated/unauthenticated users
- Route guards for profile management

### Backend Implementation

#### Cloud Functions Structure
```
functions/
├── src/
│   ├── auth/
│   │   ├── user-profile.ts
│   │   ├── auth-middleware.ts
│   │   └── auth-utils.ts
│   └── shared/
│       ├── firebase-admin.ts
│       └── validation.ts
```

#### Database Operations
- User profile CRUD operations
- Authentication state tracking
- Session management and cleanup

#### Authentication & Authorization
- Firebase Authentication integration
- Custom claims for user roles
- JWT token validation and refresh

### Testing Strategy

#### Unit Tests
- **Frontend**: Component testing with React Testing Library
- **Backend**: Function testing with Jest
- **Coverage Target**: 85% minimum

#### Integration Tests
- **Component Composition Testing**: Test compound components (Auth.Header, Auth.Row, Auth.Column, Auth.Footer, Auth.Content, Auth.Form) working together
- **Authentication Flow**: End-to-end authentication testing with real component interactions
- **API Testing**: Authentication endpoint testing
- **Firebase Testing**: Firebase emulator testing
- **Configuration Testing**: Environment variable validation and provider enablement testing

#### Module-Based Testing Strategy
- **Individual Module Components**: Unit tests for each module component
  - Test auth module components (SignInForm, SignUpForm, ProfileForm)
  - Test form-builder module components (FormBuilderPage, FormBuilderWrapper)
  - Test ui module components (FormFieldInput, FormFieldRadioGroup)
  - Test TypeScript generic typing with different form schemas
  - Test React Hook Form integration and validation rules
  - Test accessibility features (ARIA labels, keyboard navigation)
- **Module Integration Tests**: Integration tests for module interactions
  - Test auth module with form-builder module integration
  - Test form-builder module with ui module integration
  - Test server actions with module components
  - Test FormBuilderProvider with module state management
- **Cross-Module Testing**: Integration tests for complex module compositions
  - Test complete authentication flows across modules
  - Test form validation and error handling across modules
  - Test analytics integration across modules
- **Module-Specific Testing**: 
  - Test Firebase abstraction layer with auth module
  - Test Zod schema integration with form modules
  - Test toast notifications with error handling modules
- **Accessibility Testing**: Automated accessibility testing with axe-core across modules
- **Internationalization Testing**: Test i18n integration and locale-specific behavior across modules

#### Test Data
- Mock Google OAuth responses
- Test user accounts for different scenarios
- SMS verification testing with test phone numbers
- Configuration test data for different environments

## Security Considerations

### Data Protection
- **Encryption**: All authentication data encrypted in transit and at rest
- **Access Control**: Role-based access control for user data
- **Data Validation**: Comprehensive input validation and sanitization

### Authentication & Authorization
- **User Authentication**: Multi-factor authentication support
- **Session Management**: Firebase Auth tokens stored in HTTP-only cookies with server-side validation
- **Token Security**: Firebase ID tokens with proper signing and validation

### API Security
- **Rate Limiting**: Prevents brute force attacks and abuse
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Secure error responses without information leakage

## Performance Considerations

### Frontend Performance
- **Code Splitting**: Lazy loading of authentication components
- **Caching**: Authentication state caching
- **Optimization**: Minimized bundle size for auth components

### Backend Performance
- **Function Optimization**: Efficient Cloud function execution
- **Database Indexing**: Optimized Firestore queries
- **Caching**: User profile data caching

### Monitoring
- **Performance Metrics**: Authentication flow timing
- **Error Tracking**: Authentication failure monitoring
- **User Analytics**: Authentication method usage tracking

## Deployment & DevOps

### Environment Setup
- **Development**: Firebase emulator for local testing
- **Staging**: Firebase project for staging environment
- **Production**: Firebase project for production environment

### CI/CD Pipeline
- **Build Process**: Automated build and deployment
- **Testing**: Automated authentication flow testing
- **Deployment**: Firebase deployment automation

### Monitoring & Logging
- **Application Monitoring**: Firebase Analytics integration
- **Error Logging**: Firebase Crashlytics for error tracking
- **Performance Monitoring**: Firebase Performance Monitoring

## Risk Assessment

### Technical Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Google OAuth API changes | Medium | High | Version pinning and fallback mechanisms |
| SMS delivery failures | Medium | Medium | Multiple SMS providers and retry logic |
| Firebase service outages | Low | High | Multi-region deployment and fallbacks |

### Business Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| User adoption resistance | Medium | Medium | Multiple authentication options |
| Security breaches | Low | High | Comprehensive security testing and monitoring |
| Compliance issues | Low | High | Regular security audits and compliance checks |

## Dependencies

### External Dependencies
- [ ] Firebase Authentication SDK: Latest stable version
- [ ] Google OAuth API: v2 for authentication and One Tap
- [ ] React Firebase Hooks: For React integration

### Internal Dependencies
- [ ] Firebase project configuration: Must be completed before implementation
- [ ] User profile data model: Required for user management
- [ ] Protected route middleware: Required for route protection

## Success Criteria

- [ ] All three authentication methods (Google, Email, Phone) implemented and functional
- [ ] Google One Tap integration working with toast notifications
- [ ] Authentication flows complete within performance targets
- [ ] Security requirements satisfied with comprehensive testing
- [ ] User experience is seamless across all authentication methods
- [ ] Test coverage meets 85% minimum requirement
- [ ] Documentation complete for all authentication flows

## Appendices

### A. Google One Tap Implementation
[Detailed implementation guide for Google One Tap integration]

### B. Firebase Authentication Setup
[Firebase project configuration and provider setup]

### C. SMS Verification Flow
[Phone number verification implementation details]

### D. Security Checklist
[Comprehensive security validation checklist]