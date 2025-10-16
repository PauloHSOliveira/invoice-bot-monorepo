# Speckit Constitution Command

**Command:** `/speckit.constitution`  
**Description:** Create or update the project constitution from interactive or provided principle inputs, ensuring all dependent templates stay in sync.

## Usage

```bash
/speckit.constitution [Project Constitution Content]
```

## Parameters

- **Project Constitution Content** (optional): The constitution content to be processed. If not provided, the command will prompt for interactive input.

## Description

This command manages the project constitution at `.specify/memory/constitution.md`. The constitution serves as the foundational document that defines project principles, governance, and architectural guidelines.

## Execution Flow

1. **Load Existing Constitution**: Reads the current constitution template or creates a new one if it doesn't exist
2. **Process Input**: Extracts constitution content from user input or prompts for interactive input
3. **Validate Content**: Ensures all required sections are present and properly formatted
4. **Update Constitution**: Writes the updated constitution to `.specify/memory/constitution.md`
5. **Sync Templates**: Updates all dependent template files to maintain consistency
6. **Generate Report**: Creates a sync impact report documenting all changes

## Constitution Structure

The constitution must include the following sections:

### Required Sections
- **Project Overview**: High-level project description and objectives
- **MVP Objectives**: Specific goals for the minimum viable product
- **MVP Scope**: Detailed scope including in-scope and out-of-scope items
- **Key Stakeholders**: Primary stakeholders and their roles
- **Architecture & Technology Overview**: Technical stack and architectural decisions
- **Success Criteria**: Measurable success metrics
- **Core Principles**: Fundamental principles governing the project
- **Glossary**: Definitions of key terms and concepts
- **Governance**: Amendment procedures and compliance requirements

### Optional Sections
- **Out of Scope**: Features explicitly excluded from MVP
- **Risk Assessment**: Identified risks and mitigation strategies
- **Timeline**: High-level project timeline
- **Resource Requirements**: Team and tool requirements

## Core Principles

The constitution must define at least 5 core principles that govern the project:

1. **User-Centric Design**: All features MUST prioritize user experience
2. **Scalable Architecture**: System MUST be built for growth and maintainability
3. **Security First**: All data MUST be securely stored and transmitted
4. **MVP Focus**: Development MUST stay within defined scope
5. **Quality Assurance**: All code MUST be properly tested and documented

## Version Management

The constitution follows semantic versioning:

- **MAJOR**: Backward incompatible governance/principle changes
- **MINOR**: New principles or materially expanded guidance
- **PATCH**: Clarifications, wording fixes, non-semantic refinements

## Template Synchronization

After updating the constitution, the following templates are automatically updated:

- **Plan Template** (`.specify/templates/plan-template.md`): Project planning structure
- **Spec Template** (`.specify/templates/spec-template.md`): Technical specification format
- **Tasks Template** (`.specify/templates/tasks-template.md`): Task management structure
- **Command Templates** (`.specify/templates/commands/*.md`): Command documentation

## Sync Impact Report

Each constitution update generates a sync impact report that includes:

- Version change information
- List of modified principles
- Added or removed sections
- Templates requiring updates (with status)
- Follow-up TODOs for deferred items

## Examples

### Basic Usage
```bash
/speckit.constitution InvoiceBot MVP Project Constitution
```

### Interactive Mode
```bash
/speckit.constitution
# Command will prompt for constitution content
```

### With Full Content
```bash
/speckit.constitution "
# InvoiceBot MVP Project Constitution

## Project Overview
InvoiceBot is an innovative solution designed to simplify invoicing...

## MVP Objectives
- Automate Invoice Generation
- Basic Client Management
..."
```

## Validation Rules

The command validates the constitution against these rules:

1. **Required Sections**: All mandatory sections must be present
2. **Principle Count**: At least 5 core principles must be defined
3. **Version Format**: Version must follow semantic versioning
4. **Date Format**: Dates must be in ISO format (YYYY-MM-DD)
5. **No Placeholders**: No unexplained bracket tokens should remain
6. **Consistency**: All templates must align with constitution principles

## Error Handling

The command handles the following error conditions:

- **Missing Constitution**: Creates new constitution if none exists
- **Invalid Format**: Provides specific error messages for format issues
- **Missing Sections**: Lists missing required sections
- **Template Sync Failures**: Reports which templates failed to update
- **Validation Errors**: Provides detailed validation error messages

## Output

The command provides:

1. **Constitution File**: Updated `.specify/memory/constitution.md`
2. **Sync Report**: HTML comment with impact summary
3. **Template Updates**: Updated dependent template files
4. **Validation Results**: Success/failure status for each validation rule
5. **Summary**: Final summary with version info and next steps

## Dependencies

This command depends on:

- `.specify/memory/constitution.md` (target file)
- `.specify/templates/plan-template.md` (for sync)
- `.specify/templates/spec-template.md` (for sync)
- `.specify/templates/tasks-template.md` (for sync)
- `.specify/templates/commands/*.md` (for sync)

## Related Commands

- `/speckit.plan`: Create project plans based on constitution
- `/speckit.spec`: Create technical specifications
- `/speckit.tasks`: Generate task lists and sprint planning
- `/speckit.review`: Review constitution compliance

## Best Practices

1. **Regular Updates**: Update constitution when project scope changes
2. **Stakeholder Review**: Have stakeholders review constitution changes
3. **Version Tracking**: Use meaningful version increments
4. **Template Sync**: Always verify template synchronization
5. **Documentation**: Keep constitution documentation current

## Troubleshooting

### Common Issues

**Issue**: Constitution validation fails
**Solution**: Check that all required sections are present and properly formatted

**Issue**: Template sync fails
**Solution**: Verify template files exist and are writable

**Issue**: Version conflicts
**Solution**: Ensure version increments follow semantic versioning rules

**Issue**: Missing principles
**Solution**: Define at least 5 core principles with clear rationale

### Debug Mode

Enable debug mode by setting `DEBUG=true` in environment variables to get detailed logging of the constitution processing and template synchronization.

## Support

For issues with this command:

1. Check the validation error messages
2. Verify all required files exist
3. Ensure proper file permissions
4. Review the sync impact report
5. Contact the development team if issues persist
