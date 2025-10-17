# Data Model: Authentication Methods

**Project:** InvoiceBot MVP  
**Feature:** Authentication Methods  
**Version:** 1.0.0  
**Created:** 2025-01-27  
**Last Updated:** 2025-01-27

## Entity Overview

This document defines the data model for the Authentication Methods feature, establishing the foundational data structures that will be reused across all InvoiceBot features.

## Core Entities

### 1. UserProfile

**Description:** Represents a user's profile information and authentication state

**Fields:**
- `uid` (string, required): Unique user identifier from Firebase Auth
- `email` (string, required): User's primary email address
- `displayName` (string, required): User's display name
- `photoURL` (string, optional): URL to user's profile photo
- `phoneNumber` (string, optional): User's phone number in E.164 format
- `emailVerified` (boolean, required): Whether email is verified
- `phoneVerified` (boolean, required): Whether phone number is verified
- `createdAt` (Timestamp, required): Account creation timestamp
- `updatedAt` (Timestamp, required): Last profile update timestamp
- `authProviders` (string[], required): Array of linked authentication providers
- `preferences` (object, optional): User preferences and settings
- `lastLoginAt` (Timestamp, optional): Last login timestamp
- `isActive` (boolean, required): Whether account is active

**Validation Rules:**
- `uid`: Must be valid Firebase Auth UID format
- `email`: Must be valid email format
- `displayName`: Minimum 2 characters, maximum 100 characters
- `phoneNumber`: Must be valid E.164 format if provided
- `authProviders`: Must contain at least one provider
- `createdAt`: Must be before `updatedAt`
- `updatedAt`: Must be after `createdAt`

**State Transitions:**
- `created` → `active`: Account activation
- `active` → `suspended`: Account suspension
- `suspended` → `active`: Account reactivation
- `active` → `deleted`: Account deletion

**Relationships:**
- One-to-many with `AuthenticationSession`
- One-to-many with `UserPreference`
- One-to-many with `AuditLog`

### 2. AuthenticationSession

**Description:** Represents an active authentication session

**Fields:**
- `sessionId` (string, required): Unique session identifier
- `userId` (string, required): Reference to UserProfile.uid
- `provider` (string, required): Authentication provider used
- `createdAt` (Timestamp, required): Session creation timestamp
- `expiresAt` (Timestamp, required): Session expiration timestamp
- `lastActivityAt` (Timestamp, required): Last activity timestamp
- `ipAddress` (string, optional): Client IP address
- `userAgent` (string, optional): Client user agent
- `isActive` (boolean, required): Whether session is active
- `refreshToken` (string, optional): Refresh token for session renewal

**Validation Rules:**
- `sessionId`: Must be unique across all sessions
- `userId`: Must reference existing UserProfile.uid
- `provider`: Must be valid authentication provider
- `expiresAt`: Must be after `createdAt`
- `lastActivityAt`: Must be between `createdAt` and `expiresAt`

**State Transitions:**
- `created` → `active`: Session activation
- `active` → `expired`: Session expiration
- `active` → `revoked`: Session revocation
- `expired` → `renewed`: Session renewal

**Relationships:**
- Many-to-one with `UserProfile`

### 3. UserPreference

**Description:** Represents user preferences and settings

**Fields:**
- `preferenceId` (string, required): Unique preference identifier
- `userId` (string, required): Reference to UserProfile.uid
- `category` (string, required): Preference category (e.g., 'notifications', 'privacy')
- `key` (string, required): Preference key
- `value` (any, required): Preference value
- `createdAt` (Timestamp, required): Preference creation timestamp
- `updatedAt` (Timestamp, required): Last preference update timestamp

**Validation Rules:**
- `preferenceId`: Must be unique across all preferences
- `userId`: Must reference existing UserProfile.uid
- `category`: Must be valid preference category
- `key`: Must be valid preference key for category
- `value`: Must be valid value type for key

**State Transitions:**
- `created` → `updated`: Preference modification
- `updated` → `deleted`: Preference removal

**Relationships:**
- Many-to-one with `UserProfile`

### 4. AuditLog

**Description:** Represents audit trail for authentication events

**Fields:**
- `logId` (string, required): Unique log identifier
- `userId` (string, optional): Reference to UserProfile.uid (null for anonymous events)
- `event` (string, required): Event type (e.g., 'login', 'logout', 'password_reset')
- `provider` (string, optional): Authentication provider used
- `timestamp` (Timestamp, required): Event timestamp
- `ipAddress` (string, optional): Client IP address
- `userAgent` (string, optional): Client user agent
- `metadata` (object, optional): Additional event metadata
- `success` (boolean, required): Whether event was successful
- `errorMessage` (string, optional): Error message if event failed

**Validation Rules:**
- `logId`: Must be unique across all logs
- `userId`: Must reference existing UserProfile.uid if provided
- `event`: Must be valid event type
- `timestamp`: Must be current or past timestamp
- `success`: Must be boolean value

**State Transitions:**
- `created`: Immutable after creation

**Relationships:**
- Many-to-one with `UserProfile` (optional)

## Form Data Models

### 1. SignInFormData

**Description:** Data structure for sign-in form

**Fields:**
- `email` (string, required): User's email address
- `password` (string, required): User's password

**Validation Rules:**
- `email`: Must be valid email format
- `password`: Minimum 8 characters

**Zod Schema:**
```typescript
const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
```

### 2. SignUpFormData

**Description:** Data structure for sign-up form

**Fields:**
- `email` (string, required): User's email address
- `password` (string, required): User's password
- `confirmPassword` (string, required): Password confirmation
- `displayName` (string, optional): User's display name
- `acceptTerms` (boolean, required): Terms acceptance

**Validation Rules:**
- `email`: Must be valid email format
- `password`: Minimum 8 characters, must contain letters and numbers
- `confirmPassword`: Must match password
- `displayName`: Minimum 2 characters if provided
- `acceptTerms`: Must be true

**Zod Schema:**
```typescript
const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  displayName: z.string().min(2, 'Display name must be at least 2 characters').optional(),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
```

### 3. PhoneAuthFormData

**Description:** Data structure for phone authentication form

**Fields:**
- `phoneNumber` (string, required): Phone number in E.164 format
- `verificationCode` (string, optional): SMS verification code

**Validation Rules:**
- `phoneNumber`: Must be valid E.164 format
- `verificationCode`: Must be 6 digits if provided

**Zod Schema:**
```typescript
const phoneAuthSchema = z.object({
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  verificationCode: z.string().length(6, 'Verification code must be 6 digits').optional(),
});
```

### 4. ProfileUpdateFormData

**Description:** Data structure for profile update form

**Fields:**
- `displayName` (string, optional): User's display name
- `phoneNumber` (string, optional): User's phone number
- `photoURL` (string, optional): User's profile photo URL

**Validation Rules:**
- `displayName`: Minimum 2 characters if provided
- `phoneNumber`: Must be valid E.164 format if provided
- `photoURL`: Must be valid URL format if provided

**Zod Schema:**
```typescript
const profileUpdateSchema = z.object({
  displayName: z.string().min(2, 'Display name must be at least 2 characters').optional(),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number').optional(),
  photoURL: z.string().url('Invalid URL format').optional(),
});
```

## Configuration Models

### 1. AuthConfiguration

**Description:** Configuration for authentication providers and settings

**Fields:**
- `providers` (object, required): Provider configuration
  - `emailPassword` (boolean, required): Enable email/password authentication
  - `phoneNumber` (boolean, required): Enable phone number authentication
  - `google` (boolean, required): Enable Google OAuth authentication
  - `googleOneTap` (boolean, required): Enable Google One Tap
- `settings` (object, required): Authentication settings
  - `requireEmailVerification` (boolean, required): Require email verification
  - `enableMultiFactorAuth` (boolean, required): Enable multi-factor authentication
  - `useRedirectStrategy` (boolean, required): Use redirect strategy for OAuth
  - `sessionTimeout` (number, required): Session timeout in minutes
- `paths` (object, required): Authentication paths
  - `signIn` (string, required): Sign-in page path
  - `signUp` (string, required): Sign-up page path
  - `profile` (string, required): Profile page path
  - `callback` (string, required): OAuth callback path

**Validation Rules:**
- At least one provider must be enabled
- All paths must be valid URL paths
- Session timeout must be between 15 and 1440 minutes

## State Management Models

### 1. FormBuilderState

**Description:** State for Form Builder components

**Fields:**
- `currentPage` (number, required): Current form page number
- `isCompleted` (boolean, required): Whether form is completed
- `isSubmitted` (boolean, required): Whether form is submitted
- `errors` (object, optional): Form validation errors
- `isLoading` (boolean, required): Whether form is loading

**Validation Rules:**
- `currentPage`: Must be positive integer
- `isCompleted`: Must be boolean
- `isSubmitted`: Must be boolean
- `isLoading`: Must be boolean

### 2. AuthContextState

**Description:** State for authentication context

**Fields:**
- `user` (UserProfile | null, required): Current user profile
- `loading` (boolean, required): Whether authentication is loading
- `error` (string | null, optional): Authentication error message
- `isAuthenticated` (boolean, required): Whether user is authenticated

**Validation Rules:**
- `user`: Must be UserProfile object or null
- `loading`: Must be boolean
- `error`: Must be string or null
- `isAuthenticated`: Must be boolean

## API Response Models

### 1. AuthResponse

**Description:** Response for authentication operations

**Fields:**
- `user` (UserProfile, required): User profile information
- `token` (string, required): Authentication token
- `expiresAt` (number, required): Token expiration timestamp
- `refreshToken` (string, optional): Refresh token

**Validation Rules:**
- `user`: Must be valid UserProfile object
- `token`: Must be valid JWT token
- `expiresAt`: Must be future timestamp
- `refreshToken`: Must be valid refresh token if provided

### 2. ServerActionResult<T>

**Description:** Generic result type for server actions

**Fields:**
- `success` (boolean, required): Whether operation was successful
- `data` (T, optional): Operation result data
- `error` (string, optional): Error message if operation failed
- `message` (string, optional): Success message

**Validation Rules:**
- `success`: Must be boolean
- `data`: Must be of type T if provided
- `error`: Must be string if provided
- `message`: Must be string if provided

## Database Indexes

### Firestore Indexes

**UserProfile Collection:**
- `email` (ascending) - For email-based queries
- `createdAt` (descending) - For chronological queries
- `authProviders` (array-contains) - For provider-based queries
- `isActive` (ascending) - For active user queries

**AuthenticationSession Collection:**
- `userId` (ascending) - For user session queries
- `expiresAt` (ascending) - For session cleanup
- `isActive` (ascending) - For active session queries
- `createdAt` (descending) - For chronological queries

**AuditLog Collection:**
- `userId` (ascending) - For user audit queries
- `timestamp` (descending) - For chronological queries
- `event` (ascending) - For event-based queries
- `success` (ascending) - For success/failure queries

## Data Relationships

### Entity Relationship Diagram

```
UserProfile (1) ←→ (N) AuthenticationSession
UserProfile (1) ←→ (N) UserPreference
UserProfile (1) ←→ (N) AuditLog
```

### Relationship Rules

1. **UserProfile ↔ AuthenticationSession**: One user can have multiple active sessions
2. **UserProfile ↔ UserPreference**: One user can have multiple preferences
3. **UserProfile ↔ AuditLog**: One user can have multiple audit log entries

## Data Validation Rules

### Global Validation Rules

1. **Timestamps**: All timestamps must be valid Date objects
2. **IDs**: All IDs must be unique within their collection
3. **References**: All foreign key references must point to existing entities
4. **Required Fields**: All required fields must have non-null values
5. **Format Validation**: All fields must conform to their specified formats

### Business Rules

1. **Email Uniqueness**: Email addresses must be unique across all users
2. **Phone Uniqueness**: Phone numbers must be unique across all users
3. **Session Limits**: Users can have maximum 5 active sessions
4. **Password Requirements**: Passwords must meet security requirements
5. **Account Status**: Inactive accounts cannot create new sessions

## Migration Strategy

### Version 1.0.0 to 1.1.0

**New Fields:**
- `UserProfile.preferences` - User preferences object
- `UserProfile.lastLoginAt` - Last login timestamp
- `AuthenticationSession.refreshToken` - Refresh token for session renewal

**Deprecated Fields:**
- None in initial version

**Migration Steps:**
1. Add new fields to existing documents
2. Update validation rules
3. Update indexes
4. Test migration with sample data

## Security Considerations

### Data Protection

1. **Encryption**: All sensitive data encrypted in transit and at rest
2. **Access Control**: Role-based access control for data operations
3. **Audit Trail**: All data modifications logged in AuditLog
4. **Data Validation**: Comprehensive input validation and sanitization
5. **Session Security**: Secure session management with proper token handling

### Privacy Compliance

1. **Data Minimization**: Only collect necessary user data
2. **Consent Management**: User consent for data collection and processing
3. **Data Retention**: Automatic cleanup of expired sessions and logs
4. **Right to Deletion**: Support for user data deletion requests
5. **Data Portability**: Support for user data export requests

## Performance Considerations

### Optimization Strategies

1. **Indexing**: Proper database indexes for common queries
2. **Caching**: Cache frequently accessed user data
3. **Pagination**: Implement pagination for large data sets
4. **Lazy Loading**: Load data only when needed
5. **Connection Pooling**: Efficient database connection management

### Scalability Considerations

1. **Horizontal Scaling**: Design for horizontal scaling
2. **Data Partitioning**: Partition data by user ID for better performance
3. **Load Balancing**: Distribute load across multiple instances
4. **CDN Integration**: Use CDN for static assets
5. **Monitoring**: Implement comprehensive performance monitoring
