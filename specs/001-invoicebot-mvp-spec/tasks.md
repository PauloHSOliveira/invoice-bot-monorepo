# Development Tasks: InvoiceBot MVP

**Project:** InvoiceBot MVP  
**Feature:** MVP Core Functionality  
**Version:** 1.0.0  
**Created:** 2025-10-15  
**Last Updated:** 2025-10-15

## Constitution Check

This task list adheres to the following constitutional principles:
- ✅ User-Centric Design: Tasks prioritize user experience improvements
- ✅ Scalable Architecture: Tasks support scalable implementation patterns
- ✅ Security First: Security-related tasks are properly categorized
- ✅ MVP Focus: Tasks are scoped to MVP requirements
- ✅ Quality Assurance: Testing and quality tasks are mandatory

## Task Organization

Tasks are organized by user story to enable independent implementation and testing. Each story represents a complete, testable increment that can be delivered independently.

## Phase 1: Project Setup

**Objective:** Establish the technical foundation and development environment

### Story: Initial Project Setup
**Description:** Configure the development environment and essential tools to start the project.

- [x] T001 Create project structure per implementation plan
- [x] T002 [P] Install Node.js 20+ and pnpm package manager
- [x] T003 [P] Install Firebase CLI globally
- [x] T004 [P] Install Git and configure credentials
- [x] T005 [P] Install VS Code with recommended extensions
- [x] T006 Clone project repository and initialize git
- [x] T007 [P] Install project dependencies with pnpm install
- [x] T008 [P] Configure local environment variables in .env.local
- [x] T009 [P] Authenticate Firebase CLI with firebase login
- [x] T010 [P] Select Firebase project with firebase use --add

### Story: Initial Setup and Developer Tools
**Description:** Ensure code quality and development consistency using automation and best practices.

- [x] T011 [P] Configure Biome linter and formatter in apps/frontend/
- [x] T012 [P] Configure Husky and Lint Staged for Git hooks
- [x] T013 [P] Configure Commitizen and Commitlint for commit standardization
- [x] T014 [P] Configure Knip for unused code detection
- [x] T015 [P] Configure secure environment variables for API keys

## Phase 2: Foundational Infrastructure

**Objective:** Establish core infrastructure that all user stories depend on

- [x] T016 Initialize Next.js 15+ project with App Router in apps/frontend/
- [x] T017 Configure Firebase project (Auth, Firestore, Storage, Functions)
- [x] T019 Configure TypeScript with strict mode in apps/frontend/
- [x] T020 Set up Firebase Cloud Functions structure in apps/backend/functions/
- [x] T021 Configure Firebase Firestore security rules
- [x] T022 Set up Firebase Storage bucket configuration
- [x] T023 Configure Firebase Pub/Sub topics (generate-invoice, send-notification)

## Phase 3: User Authentication (US1)

**Objective:** Implement secure authentication system for web dashboard access

### Story: Web Dashboard Authentication
**Description:** Provide a robust and flexible authentication system for secure dashboard access.

- [ ] T024 [US1] Configure Firebase Authentication providers in Firebase Console
- [ ] T025 [US1] Create User entity interface in packages/shared/src/types/user.ts
- [ ] T026 [US1] Create FSD auth feature structure in apps/frontend/src/features/auth/
- [ ] T027 [US1] Implement Firebase Auth configuration in apps/frontend/src/lib/firebase.ts
- [ ] T028 [US1] Create authentication context in apps/frontend/src/lib/auth-context.tsx
- [ ] T029 [US1] Implement Google Sign-In in apps/frontend/src/features/auth/ui/google-signin.tsx
- [ ] T030 [US1] Implement Apple Sign-In in apps/frontend/src/features/auth/ui/apple-signin.tsx
- [ ] T031 [US1] Implement Phone Number Authentication in apps/frontend/src/features/auth/ui/phone-signin.tsx
- [ ] T032 [US1] Implement Email/Password Authentication in apps/frontend/src/features/auth/ui/email-signin.tsx
- [ ] T033 [US1] Configure cookie-based authentication in apps/frontend/src/lib/auth-cookies.ts
- [ ] T034 [US1] Create login page in apps/frontend/src/app/auth/login/page.tsx
- [ ] T035 [US1] Create signup page in apps/frontend/src/app/auth/signup/page.tsx
- [ ] T036 [US1] Create password recovery page in apps/frontend/src/app/auth/recover/page.tsx
- [ ] T037 [US1] Implement protected route middleware in apps/frontend/src/middleware.ts
- [ ] T038 [US1] Create user profile management in apps/frontend/src/app/dashboard/profile/page.tsx

## Phase 4: Web Dashboard Management (US2)

**Objective:** Develop essential dashboard features for client and template management

### Story: Web Dashboard – Clients and Templates Management
**Description:** Develop the web admin dashboard for managing clients, invoice templates, and other settings.

- [ ] T039 [US2] Create Client entity interface in packages/shared/src/types/client.ts
- [ ] T040 [US2] Create InvoiceTemplate entity interface in packages/shared/src/types/template.ts
- [x] T041 [US2] Configure Shadcn UI and Tailwind CSS in apps/frontend/
- [ ] T042 [US2] Create FSD clients feature structure in apps/frontend/src/features/clients/
- [ ] T043 [US2] Create FSD templates feature structure in apps/frontend/src/features/templates/
- [ ] T044 [US2] Create client management API endpoints in apps/frontend/src/app/api/clients/
- [ ] T045 [US2] Implement client CRUD operations in apps/frontend/src/features/clients/model/
- [ ] T046 [US2] Create client list component in apps/frontend/src/features/clients/ui/client-list.tsx
- [ ] T047 [US2] Create client form component in apps/frontend/src/features/clients/ui/client-form.tsx
- [ ] T048 [US2] Implement React Hook Form for client management in apps/frontend/src/features/clients/ui/
- [ ] T049 [US2] Create template management API endpoints in apps/frontend/src/app/api/templates/
- [ ] T050 [US2] Implement template CRUD operations in apps/frontend/src/features/templates/model/
- [ ] T051 [US2] Create template list component in apps/frontend/src/features/templates/ui/template-list.tsx
- [ ] T052 [US2] Create template form component in apps/frontend/src/features/templates/ui/template-form.tsx
- [ ] T053 [US2] Implement logo upload to Firebase Storage in apps/frontend/src/shared/ui/upload/logo-upload.tsx
- [ ] T054 [US2] Create dashboard layout in apps/frontend/src/app/dashboard/layout.tsx
- [ ] T055 [US2] Create clients page in apps/frontend/src/app/dashboard/clients/page.tsx
- [ ] T056 [US2] Create templates page in apps/frontend/src/app/dashboard/templates/page.tsx

## Phase 5: WhatsApp Message Processing (US3)

**Objective:** Enable InvoiceBot to receive and process WhatsApp messages

### Story: WhatsApp Message Intake
**Description:** Enable InvoiceBot to receive and process WhatsApp messages, initiating the invoice generation workflow.

- [ ] T057 [US3] Configure WhatsApp Webhook (Twilio Sandbox) in Firebase Console
- [ ] T058 [US3] Create WhatsApp message processing Cloud Function in apps/backend/functions/src/webhooks/whatsapp.ts
- [ ] T059 [US3] Implement message parsing logic in apps/backend/functions/src/shared/message-parser.ts
- [ ] T060 [US3] Create Firestore interaction service in apps/backend/functions/src/shared/firestore-service.ts
- [ ] T061 [US3] Implement client lookup logic in apps/backend/functions/src/shared/client-service.ts
- [ ] T062 [US3] Create Pub/Sub publisher service in apps/backend/functions/src/shared/pubsub-service.ts
- [ ] T063 [US3] Implement generate-invoice topic publisher in apps/backend/functions/src/webhooks/whatsapp.ts
- [ ] T064 [US3] Add error handling and logging in apps/backend/functions/src/webhooks/whatsapp.ts
- [ ] T065 [US3] Create webhook validation middleware in apps/backend/functions/src/shared/webhook-validator.ts

## Phase 6: PDF Invoice Generation (US4)

**Objective:** Implement PDF invoice generation with customizable templates

### Story: PDF Invoice Generation
**Description:** Implement the functionality to generate invoices in PDF format based on received data and defined templates.

- [ ] T066 [US4] Create Invoice entity interface in packages/shared/src/types/invoice.ts
- [ ] T067 [US4] Create PDF generation Cloud Function in apps/backend/functions/src/invoices/generate-pdf.ts
- [ ] T068 [US4] Implement data retrieval logic in apps/backend/functions/src/invoices/generate-pdf.ts
- [ ] T069 [US4] Install and configure Puppeteer in apps/backend/functions/package.json
- [ ] T070 [US4] Create HTML invoice template in apps/backend/functions/src/templates/invoice-template.html
- [ ] T071 [US4] Implement PDF customization logic in apps/backend/functions/src/invoices/pdf-generator.ts
- [ ] T072 [US4] Create Firebase Storage service in apps/backend/functions/src/shared/storage-service.ts
- [ ] T073 [US4] Implement PDF upload to Firebase Storage in apps/backend/functions/src/invoices/generate-pdf.ts
- [ ] T074 [US4] Create invoice record in Firestore in apps/backend/functions/src/invoices/generate-pdf.ts
- [ ] T075 [US4] Implement send-notification topic publisher in apps/backend/functions/src/invoices/generate-pdf.ts
- [ ] T076 [US4] Add error handling for PDF generation failures in apps/backend/functions/src/invoices/generate-pdf.ts

## Phase 7: Multi-Channel Delivery (US5)

**Objective:** Connect InvoiceBot with external services for invoice delivery

### Story: Delivery Integrations (WhatsApp and Email)
**Description:** Connect InvoiceBot with external services to deliver generated invoices to clients.

- [ ] T077 [US5] Create notification delivery Cloud Function in apps/backend/functions/src/notifications/send-notification.ts
- [ ] T078 [US5] Implement delivery data processing in apps/backend/functions/src/notifications/send-notification.ts
- [ ] T079 [US5] Configure Twilio WhatsApp API integration in apps/backend/functions/src/integrations/whatsapp-service.ts
- [ ] T080 [US5] Implement WhatsApp delivery logic in apps/backend/functions/src/integrations/whatsapp-service.ts
- [ ] T081 [US5] Configure SendGrid/Resend email API integration in apps/backend/functions/src/integrations/email-service.ts
- [ ] T082 [US5] Implement email delivery logic in apps/backend/functions/src/integrations/email-service.ts
- [ ] T083 [US5] Create delivery status tracking in apps/backend/functions/src/notifications/send-notification.ts
- [ ] T084 [US5] Add retry logic for failed deliveries in apps/backend/functions/src/notifications/send-notification.ts
- [ ] T085 [US5] Implement delivery method selection logic in apps/backend/functions/src/notifications/send-notification.ts

## Phase 8: Recurring Invoice Scheduling (US6)

**Objective:** Implement automated recurring invoice generation

### Story: Automatic Recurring Invoices
**Description:** Allow users to configure invoices for automatic generation and delivery at regular intervals.

- [ ] T086 [US6] Create RecurringSchedule entity interface in packages/shared/src/types/schedule.ts
- [ ] T087 [US6] Create scheduled Cloud Function in apps/backend/functions/src/scheduler/recurrence-scheduler.ts
- [ ] T088 [US6] Implement recurring invoice identification logic in apps/backend/functions/src/scheduler/recurrence-scheduler.ts
- [ ] T089 [US6] Create FSD schedules feature structure in apps/frontend/src/features/schedules/
- [ ] T090 [US6] Create schedule management API endpoints in apps/frontend/src/app/api/schedules/
- [ ] T091 [US6] Implement schedule CRUD operations in apps/frontend/src/features/schedules/model/
- [ ] T092 [US6] Create schedule form component in apps/frontend/src/features/schedules/ui/schedule-form.tsx
- [ ] T093 [US6] Create schedule list component in apps/frontend/src/features/schedules/ui/schedule-list.tsx
- [ ] T094 [US6] Create schedules page in apps/frontend/src/app/dashboard/schedules/page.tsx
- [ ] T095 [US6] Implement next run date calculation in apps/backend/functions/src/scheduler/recurrence-scheduler.ts
- [ ] T096 [US6] Add schedule status management in apps/backend/functions/src/scheduler/recurrence-scheduler.ts

## Phase 9: Integration and Testing

**Objective:** Complete end-to-end integration and comprehensive testing

- [ ] T097 Create FSD invoices feature structure in apps/frontend/src/features/invoices/
- [ ] T098 Create invoice list component in apps/frontend/src/features/invoices/ui/invoice-list.tsx
- [ ] T099 Create invoice detail component in apps/frontend/src/features/invoices/ui/invoice-detail.tsx
- [ ] T100 Create invoices page in apps/frontend/src/app/dashboard/invoices/page.tsx
- [ ] T101 Implement end-to-end WhatsApp to PDF workflow testing
- [ ] T102 Implement end-to-end dashboard to invoice generation testing
- [ ] T103 Implement end-to-end recurring invoice testing
- [ ] T104 Add comprehensive error handling across all components
- [ ] T105 Implement performance monitoring and logging
- [ ] T106 Add input validation and sanitization across all endpoints
- [ ] T107 Implement rate limiting for Cloud Functions
- [ ] T108 Add comprehensive unit tests for all services
- [ ] T109 Add integration tests for all API endpoints
- [ ] T110 Add E2E tests for complete user workflows

## Phase 10: Deployment and Launch

**Objective:** Deploy to production and prepare for MVP launch

- [ ] T111 Configure Vercel deployment for frontend
- [ ] T112 Configure Firebase deployment for backend
- [ ] T113 Set up production environment variables
- [ ] T114 Configure production Firebase project
- [ ] T115 Set up monitoring and alerting
- [ ] T116 Deploy to staging environment
- [ ] T117 Perform staging environment testing
- [ ] T118 Deploy to production environment
- [ ] T119 Perform production smoke tests
- [ ] T120 Create user documentation and quickstart guide
- [ ] T121 Prepare MVP launch announcement

## Dependencies

### Story Completion Order
1. **Phase 1**: Project Setup (T001-T015) - Must complete first
2. **Phase 2**: Foundational Infrastructure (T016-T023) - Blocks all user stories
3. **Phase 3**: User Authentication (US1) - T024-T038 - Independent
4. **Phase 4**: Web Dashboard Management (US2) - T039-T056 - Depends on US1
5. **Phase 5**: WhatsApp Message Processing (US3) - T057-T065 - Independent
6. **Phase 6**: PDF Invoice Generation (US4) - T066-T076 - Depends on US3
7. **Phase 7**: Multi-Channel Delivery (US5) - T077-T085 - Depends on US4
8. **Phase 8**: Recurring Invoice Scheduling (US6) - T086-T096 - Depends on US2, US4
9. **Phase 9**: Integration and Testing (T097-T110) - Depends on all user stories
10. **Phase 10**: Deployment and Launch (T111-T121) - Depends on Phase 9

### Parallel Execution Opportunities

**Phase 1 Tasks (T002-T010)**: Can be executed in parallel
**Phase 1 Developer Tools (T011-T015)**: Can be executed in parallel
**Phase 2 Infrastructure (T016-T023)**: Can be executed in parallel
**US1 Authentication (T025-T038)**: Can be executed in parallel after T024
**US2 Dashboard (T040-T056)**: Can be executed in parallel after T039
**US3 WhatsApp (T058-T065)**: Can be executed in parallel after T057
**US4 PDF Generation (T067-T076)**: Can be executed in parallel after T066
**US5 Delivery (T078-T085)**: Can be executed in parallel after T077
**US6 Scheduling (T088-T096)**: Can be executed in parallel after T087

## Implementation Strategy

### MVP Scope
**Primary MVP**: User Authentication (US1) + Web Dashboard Management (US2) + WhatsApp Message Processing (US3) + PDF Invoice Generation (US4)

**Secondary MVP**: Multi-Channel Delivery (US5) + Recurring Invoice Scheduling (US6)

### Incremental Delivery
1. **Week 1**: Complete Phases 1-2 (Setup + Infrastructure)
2. **Week 2**: Complete Phase 3 (Authentication)
3. **Week 3**: Complete Phase 4 (Dashboard Management)
4. **Week 4**: Complete Phase 5 (WhatsApp Processing)
5. **Week 5**: Complete Phase 6 (PDF Generation)
6. **Week 6**: Complete Phases 7-8 (Delivery + Scheduling)
7. **Week 7**: Complete Phases 9-10 (Testing + Deployment)

### Independent Test Criteria

**US1 - Authentication**: Users can sign up, log in, and access protected routes
**US2 - Dashboard Management**: Users can manage clients and templates through web interface
**US3 - WhatsApp Processing**: System can receive and parse WhatsApp messages
**US4 - PDF Generation**: System can generate professional PDF invoices
**US5 - Multi-Channel Delivery**: System can deliver invoices via WhatsApp and email
**US6 - Recurring Scheduling**: System can automatically generate recurring invoices

## Task Summary

- **Total Tasks**: 121
- **Completed Tasks**: 25 (20.7%)
- **Setup Tasks**: 15 (T001-T015) - **15 completed**
- **Infrastructure Tasks**: 7 (T016-T023) - **7 completed**
- **US1 Authentication Tasks**: 15 (T024-T038) - **0 completed**
- **US2 Dashboard Tasks**: 18 (T039-T056) - **1 completed**
- **US3 WhatsApp Tasks**: 9 (T057-T065) - **0 completed**
- **US4 PDF Generation Tasks**: 11 (T066-T076) - **0 completed**
- **US5 Delivery Tasks**: 9 (T077-T085) - **0 completed**
- **US6 Scheduling Tasks**: 11 (T086-T096) - **0 completed**
- **Integration Tasks**: 14 (T097-T110) - **0 completed**
- **Deployment Tasks**: 11 (T111-T121) - **0 completed**

**Completed Tasks**: T001, T002, T003, T004, T005, T006, T007, T008, T009, T010, T011, T012, T013, T014, T015, T016, T017, T019, T020, T021, T022, T023, T041
**Next Priority**: Begin User Stories (US1 Authentication) with FSD structure creation

**Parallel Opportunities**: 8 phases with parallel execution within each phase
**MVP Scope**: 55 tasks (Phases 1-6) for core functionality
**Full Scope**: 121 tasks for complete MVP with all features
