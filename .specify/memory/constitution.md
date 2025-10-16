<!-- Sync Impact Report:
Version change: 0.0.0 → 1.0.0 (initial constitution)
Added sections: Project Overview, MVP Objectives, MVP Scope, Out of Scope, Key Stakeholders, Architecture & Technology Overview, Success Criteria, Glossary, Governance
Modified principles: N/A (initial creation)
Templates requiring updates: ✅ plan-template.md, ✅ spec-template.md, ✅ tasks-template.md, ✅ commands/*.md
Follow-up TODOs: None
-->

# InvoiceBot MVP Project Constitution

**Version:** 1.0.0  
**Ratification Date:** 2025-10-15  
**Last Amended Date:** 2025-10-15  
**Author:** Paulo Oliveira

## Project Overview

InvoiceBot is an innovative solution designed to simplify the invoicing and billing process for small and medium-sized businesses (SMBs) and freelancers. Using the convenience of WhatsApp as the primary interface, InvoiceBot will allow users to quickly generate and send invoices, automating repetitive tasks and optimizing financial workflows.

The MVP will focus on essential functionalities to validate the product's value proposition and establish a solid foundation for future expansion.

## MVP Objectives

- **Automate Invoice Generation**: Allow users to create PDF invoices through simple WhatsApp commands
- **Basic Client and Template Management**: Provide a web dashboard where users can register clients and create/manage invoice templates
- **Simplified Delivery**: Enable users to send generated invoices directly via WhatsApp and/or email
- **Recurring Invoices**: Implement the ability to schedule automatic recurring invoices
- **User Experience (UX)**: Deliver an intuitive, efficient interface across both WhatsApp and the web dashboard
- **Scalability & Maintainability**: Build a robust architecture designed for growth and easy maintenance

## MVP Scope

### 3.1 WhatsApp Interaction
- Receive user messages with commands to generate invoices (e.g., "Generate invoice for $500 for Client X")
- Parse and extract relevant data (amount, client, description)
- Send confirmations and links to generated invoices via WhatsApp

### 3.2 PDF Invoice Generation
- Create invoices in PDF format using pre-defined templates
- Enable basic customization (company logo, client info, invoice items)
- Securely store generated invoices

### 3.3 Web Dashboard for Management
- **User Authentication**: Secure login to access the dashboard
- **Client Management**: Register, edit, and view client information
- **Template Management**: Create, edit, and select invoice templates
- **Invoice View**: List and access generated invoices
- **Logo Upload**: Upload company logos for inclusion in invoices

### 3.4 Recurring Invoice Scheduling
- Allow configuration of invoices to be automatically generated and sent on defined intervals (monthly, weekly, etc.)

### 3.5 Integrations
- **WhatsApp Business API**: Use a provider (e.g., Twilio, 360dialog) for WhatsApp communication
- **Email Service**: Integrate with an email provider (e.g., SendGrid, Resend) for invoice delivery

## Out of Scope (for MVP)

The following features are not part of the initial MVP but may be included in later releases:
- Multiple users per account
- Advanced financial reports
- Integration with accounting systems
- Payment processing through the platform
- Advanced invoice template customization (visual editor)
- Multi-language support

## Key Stakeholders

- **End Users**: SMBs and freelancers seeking efficient invoicing solutions
- **Development Team**: Responsible for implementing technical components
- **Product Management**: Defines vision, roadmap, and product priorities

## Architecture & Technology Overview

InvoiceBot's MVP architecture will be built on a modern, scalable foundation, leveraging Next.js and Firebase. The codebase will follow the Feature Sliced Design (FSD) pattern to ensure modularity, scalability, and maintainability.

- **Frontend**: Next.js 15+ (App Router, Server Components, Client Components)
- **Backend**: Firebase Cloud Functions & Firebase Pub/Sub (serverless, event-driven)
- **Database**: Firebase Firestore (NoSQL, real-time)
- **Authentication**: Firebase Authentication (Google, Apple, Phone, Email/Password, Cookie-based)
- **Storage**: Firebase Storage (logos, PDFs)
- **Design System**: Shadcn UI + Tailwind CSS
- **Dev Tools**: Knip, Commitizen, Biome, CZ Changelog, Husky, Lint Staged, Commitlint

## Success Criteria

- MVP launched within scope, timeline, and budget
- Core features fully operational and stable
- Positive feedback from early users
- Demonstrated ability to scale to more users and invoices
- Clean, testable, and maintainable codebase

## Core Principles

### Principle 1: User-Centric Design
All features MUST prioritize user experience and simplicity. The WhatsApp interface MUST be intuitive for non-technical users, and the web dashboard MUST provide clear navigation and functionality.

### Principle 2: Scalable Architecture
The system MUST be built using serverless technologies (Firebase Cloud Functions) and MUST follow Feature Sliced Design patterns to ensure maintainability and scalability as the user base grows.

### Principle 3: Security First
All user data, including client information and invoices, MUST be securely stored and transmitted. Authentication MUST be implemented using Firebase Auth with proper session management.

### Principle 4: MVP Focus
Development MUST stay within the defined MVP scope. Features outside the scope MUST be documented for future releases but MUST NOT be implemented in the initial version.

### Principle 5: Quality Assurance
All code MUST be properly tested, linted, and follow established coding standards. The codebase MUST be maintainable and well-documented.

## Glossary

- **MVP**: Minimum Viable Product
- **FSD**: Feature Sliced Design
- **Next.js**: React-based framework for modern web apps
- **Firebase**: Google's app development platform
- **Cloud Functions**: Firebase serverless compute engine
- **Firestore**: Firebase's NoSQL real-time database
- **Pub/Sub**: Firebase asynchronous messaging service
- **Shadcn UI**: React component library
- **Tailwind CSS**: Utility-first CSS framework

## Governance

### Amendment Procedure
Constitution amendments require:
1. Proposal submission with rationale
2. Review by project stakeholders
3. Approval by project lead
4. Version increment following semantic versioning
5. Update of all dependent templates and documentation

### Versioning Policy
- **MAJOR**: Backward incompatible governance/principle removals or redefinitions
- **MINOR**: New principle/section added or materially expanded guidance
- **PATCH**: Clarifications, wording, typo fixes, non-semantic refinements

### Compliance Review
All project decisions and implementations MUST be evaluated against these principles. Regular compliance reviews MUST be conducted to ensure adherence to the constitution.