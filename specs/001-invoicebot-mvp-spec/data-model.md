# Data Model: InvoiceBot MVP

**Project:** InvoiceBot MVP  
**Created:** 2025-10-15  
**Purpose:** Define the complete data model for InvoiceBot MVP including entities, relationships, and validation rules

## Entity Overview

The InvoiceBot MVP data model consists of five main entities that support the core functionality:

1. **User** - System users (SMBs and freelancers)
2. **Client** - Customer information for invoicing
3. **Invoice** - Generated invoices with PDFs
4. **InvoiceTemplate** - Reusable invoice templates
5. **RecurringSchedule** - Automated recurring invoice schedules

## Entity Definitions

### 1. User Entity

**Purpose:** Represents system users who can create and manage invoices

```typescript
interface User {
  id: string;                    // Firebase Auth UID
  email: string;                 // User's email address
  name: string;                  // User's full name
  companyName: string;           // Company/business name
  logoUrl?: string;             // URL to company logo in Firebase Storage
  phoneNumber?: string;         // User's phone number
  address?: Address;            // User's business address
  whatsappNumber?: string;      // WhatsApp number for notifications
  createdAt: Date;              // Account creation timestamp
  updatedAt: Date;              // Last profile update timestamp
  lastLoginAt?: Date;           // Last login timestamp
  isActive: boolean;            // Account status
}

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
```

**Validation Rules:**
- `email`: Required, valid email format, unique
- `name`: Required, 2-100 characters
- `companyName`: Required, 2-100 characters
- `logoUrl`: Optional, valid Firebase Storage URL
- `phoneNumber`: Optional, valid phone format
- `whatsappNumber`: Optional, valid phone format

**State Transitions:**
- `isActive`: true → false (account deactivation)
- `isActive`: false → true (account reactivation)

### 2. Client Entity

**Purpose:** Represents customers/clients for whom invoices are generated

```typescript
interface Client {
  id: string;                   // Unique client identifier
  userId: string;               // Owner user ID (Firebase Auth UID)
  name: string;                // Client's name or company name
  email: string;               // Client's email address
  phone?: string;              // Client's phone number
  address?: Address;           // Client's address
  taxId?: string;             // Client's tax identification number
  notes?: string;              // Additional client notes
  createdAt: Date;            // Client creation timestamp
  updatedAt: Date;            // Last update timestamp
  isActive: boolean;          // Client status
}

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
```

**Validation Rules:**
- `userId`: Required, valid Firebase Auth UID
- `name`: Required, 2-100 characters
- `email`: Required, valid email format
- `phone`: Optional, valid phone format
- `taxId`: Optional, valid tax ID format
- `notes`: Optional, max 500 characters

**State Transitions:**
- `isActive`: true → false (client deactivation)
- `isActive`: false → true (client reactivation)

### 3. Invoice Entity

**Purpose:** Represents generated invoices with PDF documents

```typescript
interface Invoice {
  id: string;                  // Unique invoice identifier
  userId: string;              // Owner user ID
  clientId: string;           // Client ID
  templateId: string;          // Template ID used
  invoiceNumber: string;       // Human-readable invoice number
  amount: number;              // Invoice amount (in cents)
  currency: string;            // Currency code (e.g., 'USD', 'EUR')
  description: string;         // Invoice description/items
  status: InvoiceStatus;       // Current invoice status
  pdfUrl: string;             // URL to PDF in Firebase Storage
  dueDate: Date;              // Payment due date
  sentAt?: Date;              // When invoice was sent
  paidAt?: Date;              // When invoice was paid
  createdAt: Date;            // Invoice creation timestamp
  updatedAt: Date;            // Last update timestamp
  recurringScheduleId?: string; // If part of recurring schedule
}

type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
```

**Validation Rules:**
- `userId`: Required, valid Firebase Auth UID
- `clientId`: Required, valid client ID
- `templateId`: Required, valid template ID
- `invoiceNumber`: Required, unique per user, format: INV-YYYY-NNNN
- `amount`: Required, positive number (in cents)
- `currency`: Required, valid ISO currency code
- `description`: Required, 10-1000 characters
- `dueDate`: Required, future date
- `pdfUrl`: Required, valid Firebase Storage URL

**State Transitions:**
- `draft` → `sent` (invoice sent to client)
- `sent` → `paid` (payment received)
- `sent` → `overdue` (past due date)
- `draft` → `cancelled` (invoice cancelled)
- `sent` → `cancelled` (invoice cancelled)

### 4. InvoiceTemplate Entity

**Purpose:** Represents reusable invoice templates for consistent formatting

```typescript
interface InvoiceTemplate {
  id: string;                  // Unique template identifier
  userId: string;              // Owner user ID
  name: string;               // Template name
  description?: string;        // Template description
  isDefault: boolean;         // Whether this is the default template
  templateData: TemplateData; // Template configuration
  createdAt: Date;            // Template creation timestamp
  updatedAt: Date;            // Last update timestamp
  isActive: boolean;          // Template status
}

interface TemplateData {
  header: {
    showLogo: boolean;
    logoPosition: 'left' | 'center' | 'right';
    companyInfo: {
      showName: boolean;
      showAddress: boolean;
      showPhone: boolean;
      showEmail: boolean;
    };
  };
  invoiceDetails: {
    showInvoiceNumber: boolean;
    showDate: boolean;
    showDueDate: boolean;
    showTerms: boolean;
  };
  items: {
    showDescription: boolean;
    showQuantity: boolean;
    showRate: boolean;
    showAmount: boolean;
  };
  footer: {
    showNotes: boolean;
    showTerms: boolean;
    customFooter?: string;
  };
  styling: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    fontSize: number;
  };
}
```

**Validation Rules:**
- `userId`: Required, valid Firebase Auth UID
- `name`: Required, 2-50 characters, unique per user
- `description`: Optional, max 200 characters
- `templateData`: Required, valid template configuration
- `isDefault`: Only one template per user can be default

**State Transitions:**
- `isActive`: true → false (template deactivation)
- `isActive`: false → true (template reactivation)

### 5. RecurringSchedule Entity

**Purpose:** Represents automated recurring invoice schedules

```typescript
interface RecurringSchedule {
  id: string;                  // Unique schedule identifier
  userId: string;              // Owner user ID
  clientId: string;            // Client ID
  templateId: string;          // Template ID to use
  name: string;                // Schedule name
  description: string;         // Invoice description
  amount: number;              // Invoice amount (in cents)
  currency: string;            // Currency code
  frequency: ScheduleFrequency; // Recurrence frequency
  interval: number;            // Interval between occurrences
  startDate: Date;             // Schedule start date
  endDate?: Date;              // Schedule end date (optional)
  nextRunDate: Date;           // Next scheduled run
  lastRunDate?: Date;          // Last successful run
  status: ScheduleStatus;      // Schedule status
  createdAt: Date;            // Schedule creation timestamp
  updatedAt: Date;             // Last update timestamp
}

type ScheduleFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';
type ScheduleStatus = 'active' | 'paused' | 'completed' | 'cancelled';
```

**Validation Rules:**
- `userId`: Required, valid Firebase Auth UID
- `clientId`: Required, valid client ID
- `templateId`: Required, valid template ID
- `name`: Required, 2-50 characters
- `description`: Required, 10-500 characters
- `amount`: Required, positive number (in cents)
- `currency`: Required, valid ISO currency code
- `frequency`: Required, valid frequency type
- `interval`: Required, positive integer
- `startDate`: Required, future date
- `nextRunDate`: Required, future date

**State Transitions:**
- `active` → `paused` (schedule paused)
- `paused` → `active` (schedule resumed)
- `active` → `completed` (schedule finished)
- `active` → `cancelled` (schedule cancelled)

## Relationships

### 1. User Relationships
- **One-to-Many**: User → Clients
- **One-to-Many**: User → Invoices
- **One-to-Many**: User → InvoiceTemplates
- **One-to-Many**: User → RecurringSchedules

### 2. Client Relationships
- **Many-to-One**: Client → User
- **One-to-Many**: Client → Invoices
- **One-to-Many**: Client → RecurringSchedules

### 3. Invoice Relationships
- **Many-to-One**: Invoice → User
- **Many-to-One**: Invoice → Client
- **Many-to-One**: Invoice → InvoiceTemplate
- **Many-to-One**: Invoice → RecurringSchedule (optional)

### 4. InvoiceTemplate Relationships
- **Many-to-One**: InvoiceTemplate → User
- **One-to-Many**: InvoiceTemplate → Invoices
- **One-to-Many**: InvoiceTemplate → RecurringSchedules

### 5. RecurringSchedule Relationships
- **Many-to-One**: RecurringSchedule → User
- **Many-to-One**: RecurringSchedule → Client
- **Many-to-One**: RecurringSchedule → InvoiceTemplate
- **One-to-Many**: RecurringSchedule → Invoices

## Database Design Considerations

### 1. Firestore Collections
```
/users/{userId}
/clients/{clientId}
/invoices/{invoiceId}
/templates/{templateId}
/schedules/{scheduleId}
```

### 2. Security Rules
- All documents are user-scoped (userId field)
- Users can only access their own data
- Public read access for invoice PDFs (with secure URLs)

### 3. Indexes
- Composite indexes for common query patterns
- Single-field indexes for filtering and sorting
- Array indexes for tags and categories (future use)

### 4. Data Volume Estimates
- **Users**: 1,000 users (MVP target)
- **Clients**: 10,000 clients (10 per user average)
- **Invoices**: 50,000 invoices (50 per user average)
- **Templates**: 5,000 templates (5 per user average)
- **Schedules**: 1,000 schedules (1 per user average)

## Validation and Business Rules

### 1. Cross-Entity Validation
- Invoice amount must be positive
- Due date must be in the future
- Recurring schedule start date must be in the future
- Only one default template per user

### 2. Data Integrity
- Cascade delete when user is deleted
- Soft delete for clients and templates
- Hard delete for invoices (audit trail)

### 3. Performance Considerations
- Pagination for large result sets
- Real-time listeners for dashboard updates
- Batch operations for bulk updates
- Caching for frequently accessed data

## Future Extensibility

### 1. Additional Entities (Post-MVP)
- **Payment**: Payment tracking and processing
- **Tax**: Tax calculation and reporting
- **Reports**: Financial reports and analytics
- **Notifications**: Notification preferences and history

### 2. Enhanced Relationships
- **Multi-user accounts**: Team collaboration
- **Client categories**: Client grouping and filtering
- **Invoice items**: Detailed line items
- **Attachments**: Additional document support

### 3. Advanced Features
- **Workflow**: Invoice approval workflows
- **Integration**: Accounting system integration
- **API**: Third-party API access
- **Mobile**: Mobile app support
