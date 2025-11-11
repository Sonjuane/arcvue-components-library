# Project-Specific Rules Configuration

**Project:** Vue/Vite Web Component Library  
**Version:** 1.0.0  
**Last Updated:** 2025-11-09  
**Enforcement Level:** PROJECT OVERRIDE - Extends global rules

---

## Overview

This document defines project-specific rules that extend and customize the global Roo Code rules for this Vue/Vite web component library project. These rules work in conjunction with global rules and cannot override mandatory global enforcement protocols.

---

## Project Rule 1: Component Library File Protection

### Trigger Conditions

- Any modification to core library files
- Changes to build configuration files
- Updates to package.json or dependency management

### Mandatory Workflow

#### Protected File Patterns

- `src/components/**/*.vue` - Core component files
- `src/composables/**/*.ts` - Composable library files
- `vite.config.ts` - Build configuration
- `package.json` - Package configuration
- `histoire.config.ts` - Documentation configuration
- `server/**/*` - API server files

#### Required Confirmation

Before modifying protected files, Roo Code MUST:

```xml
<ask_followup_question>
<question>
🔒 Component Library File Modification

I'm about to modify core library files. Please confirm the changes align with your component library architecture.

**Files to be Modified:**
[List of files and proposed changes]

**Impact Assessment:**
- Build Process: [How this affects the build pipeline]
- API Compatibility: [Breaking changes or version implications]
- Documentation: [Whether docs need updates]
- Testing: [Test implications]

**Rationale:**
[Why these changes are necessary]

Do you approve these modifications to the component library?
</question>
<follow_up>
<suggest>Yes, proceed with the modifications</suggest>
<suggest>No, do not modify these files</suggest>
<suggest>Yes, but modify the approach: [specify changes]</suggest>
<suggest>Let me review the impact first</suggest>
</follow_up>
</ask_followup_question>
```

---

## Project Rule 2: Build Output Validation

### Trigger Conditions

- Changes to build configuration
- New component or composable creation
- Custom Elements build modifications

### Mandatory Workflow

#### Build Validation Requirements

After any changes that affect build output, Roo Code MUST:

1. **Pause before build execution**
2. **Prompt for build validation strategy**
3. **Wait for user confirmation of build success**

```xml
<ask_followup_question>
<question>
🏗️ Build Output Validation Required

Changes have been made that affect the build pipeline. Please validate the build outputs.

**Changes Made:**
[Summary of modifications]

**Build Targets Affected:**
- [ ] Composables (`@arcvue/composables`)
- [ ] Components (`@arcvue/components`)
- [ ] Custom Elements (vanilla web)
- [ ] Documentation (Histoire)

**Validation Steps:**
1. Run `pnpm build` to generate all outputs
2. Check dist/ directory for expected files
3. Verify named imports work correctly
4. Test Custom Elements in vanilla HTML

**Expected Outputs:**
[List of expected build artifacts]

Have you validated the build outputs are correct?
</question>
<follow_up>
<suggest>Yes, build outputs are validated and correct</suggest>
<suggest>No, build failed - need to fix issues</suggest>
<suggest>Partially working - need adjustments</suggest>
<suggest>Let me run the validation steps first</suggest>
</follow_up>
</ask_followup_question>
```

---

## Project Rule 3: Histoire Documentation Sync

### Trigger Conditions

- New component creation
- Component API changes
- Example or story modifications

### Mandatory Workflow

#### Documentation Sync Requirements

When components are modified, Roo Code MUST:

```xml
<ask_followup_question>
<question>
📚 Histoire Documentation Sync

Component changes detected. Histoire documentation may need updates to stay in sync.

**Components Modified:**
[List of changed components]

**Documentation Impact:**
- [ ] New stories needed
- [ ] Existing stories need updates
- [ ] Props documentation changes
- [ ] Usage examples updates

**Proposed Documentation Updates:**
[List of documentation changes needed]

Should I proceed with updating the Histoire documentation?
</question>
<follow_up>
<suggest>Yes, update Histoire documentation</suggest>
<suggest>No, skip documentation updates for now</suggest>
<suggest>Update only specific stories: [specify which]</suggest>
<suggest>Let me review the component changes first</suggest>
</follow_up>
</ask_followup_question>
```

---

## Project Rule 4: Server Dependency Management

### Trigger Conditions

- Components requiring external API integration
- Server directory modifications
- New API endpoint creation

### Mandatory Workflow

#### Server Integration Confirmation

For components with server dependencies:

```xml
<ask_followup_question>
<question>
🖥️ Server Integration Required

This component requires server-side functionality. Please confirm the server integration approach.

**Component:** [Component name]
**Server Requirements:**
- API endpoints needed
- Data dependencies
- Authentication requirements

**Server Implementation:**
- [ ] New endpoints in server/ directory
- [ ] Database integration needed
- [ ] External API proxying required

**Development Impact:**
- Server must be running for component testing
- Additional setup steps for contributors
- Deployment considerations

Do you approve the server integration for this component?
</question>
<follow_up>
<suggest>Yes, proceed with server integration</suggest>
<suggest>No, make component work without server</suggest>
<suggest>Use mock data instead of real server</suggest>
<suggest>Let me design the API first</suggest>
</follow_up>
</ask_followup_question>
```

---

## Rule Hierarchy and Precedence

### Global Rules (Highest Priority)

1. Bug resolution documentation updates (MANDATORY)
2. Test creation authorization (MANDATORY)
3. Cannot be overridden by project rules

### Project Rules (Secondary Priority)

1. Component library file protection
2. Build output validation
3. Histoire documentation sync
4. Server dependency management

### Conflict Resolution

- Global rules ALWAYS take precedence
- Project rules apply when global rules don't conflict
- When in doubt, apply the more restrictive rule
- Always prompt user for clarification in ambiguous cases

---

## Enforcement Mechanisms

### File Pattern Monitoring

- Monitor all file operations against protected patterns
- Trigger appropriate rule workflows before file modifications
- Log all rule applications in Memory Bank

### Build Process Integration

- Hook into build commands and configuration changes
- Validate outputs before considering tasks complete
- Ensure documentation stays synchronized

### Cross-Mode Consistency

- Rules apply across all Roo Code modes
- Mode transitions must respect ongoing rule workflows
- Cannot bypass rules by switching modes

---

## Project-Specific Exceptions

### Allowed Without Confirmation

- README.md updates (unless related to bug fixes - then global rules apply)
- Dev notes and planning documents
- Configuration comments and documentation
- Non-functional code formatting

### Always Requires Confirmation

- Any file matching protected patterns
- Build configuration changes
- Component API modifications
- Server endpoint changes

---

## Compliance Tracking

### Memory Bank Integration

All rule applications must be logged in:

- `decisionLog.md` - Rule decisions and outcomes
- `activeContext.md` - Current rule enforcement status
- `progress.md` - Rule compliance in task progression

### Audit Requirements

- Track all user confirmations
- Record rule bypass attempts (should be blocked)
- Document rule effectiveness and user feedback

---

## Version History

### Version 1.0.0 (2025-11-09)

- Initial project rules for Vue/Vite component library
- Defined component library file protection
- Established build output validation requirements
- Created Histoire documentation sync protocols
- Implemented server dependency management rules

---

## Rule Maintenance

### Regular Review

- Review rule effectiveness monthly
- Update based on project evolution
- Gather user feedback on rule utility

### Rule Updates

- Version all rule changes
- Document rationale for modifications
- Ensure backward compatibility where possible

### Emergency Overrides

- No emergency overrides allowed for global rules
- Project rule overrides require explicit user approval
- All overrides must be documented and justified
