# Roo Code Rule Hierarchy and Enforcement

**Version:** 1.0.0  
**Last Updated:** 2025-11-09  
**Authority:** SYSTEM OVERRIDE CONFIGURATION

---

## Rule Hierarchy Overview

This document establishes the complete override hierarchy for Roo Code behaviors, ensuring that user-defined rules take absolute precedence over all default system behaviors.

```
┌─────────────────────────────────────────────────────────────┐
│                    RULE HIERARCHY                           │
│                                                             │
│  1. GLOBAL RULES (Highest Priority)                        │
│     └── .roo/rules/global-rules.md                         │
│         ├── Bug Resolution Documentation                   │
│         ├── Test Creation Authorization                    │
│         └── Universal Enforcement Protocols               │
│                                                             │
│  2. PROJECT RULES (Secondary Priority)                     │
│     └── .roo/rules/project-rules.md                        │
│         ├── Component Library File Protection              │
│         ├── Build Output Validation                        │
│         ├── Histoire Documentation Sync                    │
│         └── Server Dependency Management                   │
│                                                             │
│  3. DEFAULT ROO CODE BEHAVIORS (Lowest Priority)           │
│     └── System defaults (OVERRIDDEN by above rules)        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Enforcement Mechanisms

### 1. File Operation Interception

#### Pre-Operation Validation

Before ANY file operation, Roo Code MUST:

1. **Check Global Rules First**
   - Scan target file path against global rule patterns
   - If match found, trigger mandatory workflow
   - BLOCK operation until user confirmation received

2. **Check Project Rules Second**
   - If no global rule applies, check project-specific patterns
   - Apply project rule workflow if pattern matches
   - BLOCK operation until user confirmation received

3. **Proceed Only After Clearance**
   - Only execute file operation after all applicable rules cleared
   - Log all rule applications in Memory Bank
   - Document user decisions for audit trail

#### File Pattern Detection Matrix

| File Pattern                                  | Rule Type | Action Required                    |
| --------------------------------------------- | --------- | ---------------------------------- |
| `*.test.*`, `*.spec.*`, `__tests__/`, `test/` | Global    | Test Creation Authorization        |
| `README.md`, `CHANGELOG.md`, `docs/*.md`      | Global    | Bug Fix Documentation Verification |
| `src/components/**/*.vue`                     | Project   | Component Library Protection       |
| `vite.config.ts`, `package.json`              | Project   | Build Configuration Validation     |
| `histoire.config.ts`, `*.stories.*`           | Project   | Documentation Sync Check           |
| `server/**/*`                                 | Project   | Server Integration Confirmation    |

### 2. Mode Transition Controls

#### Cross-Mode Rule Persistence

- Rules apply regardless of current Roo Code mode
- Mode switches cannot bypass active rule workflows
- Incomplete rule workflows must be resolved before mode changes
- All modes inherit the same rule enforcement protocols

#### Mode-Specific Enforcement

```
Code Mode:
├── Highest likelihood of triggering rules
├── Must validate every file write operation
└── Cannot proceed without rule clearance

Architect Mode:
├── May propose changes requiring rule validation
├── Must prompt before any implementation
└── Cannot bypass rules through planning phase

Debug Mode:
├── Frequently encounters bug fix scenarios
├── Must follow Global Rule 1 for all fixes
└── Cannot update documentation without verification

Orchestrator Mode:
├── Must coordinate rule compliance across sub-tasks
├── Cannot delegate rule responsibility to other modes
└── Must ensure all orchestrated actions follow rules

Ask Mode:
├── Generally exempt from file operation rules
├── Must still follow rules if proposing changes
└── Cannot suggest rule bypasses or workarounds
```

### 3. Command Execution Controls

#### Build Command Interception

Before executing build-related commands:

- `pnpm build`, `npm run build`, `vite build`
- `pnpm dev`, `npm run dev`, `vite dev`
- Any command affecting `dist/` or build outputs

Roo Code MUST:

1. Check if recent changes affect build pipeline
2. Trigger Project Rule 2 (Build Output Validation)
3. Wait for user confirmation before proceeding
4. Document build validation results

#### Test Command Interception

Before executing test-related commands:

- `pnpm test`, `npm test`, `vitest`, `jest`
- Any command running test suites

Roo Code MUST:

1. Verify tests were created with proper authorization
2. Check Global Rule 2 compliance
3. Confirm user approved test execution
4. Log test execution decisions

### 4. Documentation Update Controls

#### Automatic Documentation Detection

Roo Code must scan for documentation updates in:

- Markdown files (`*.md`)
- README files (any case variation)
- Documentation directories (`docs/`, `documentation/`)
- Code comments related to bug fixes
- API documentation files

#### Bug Fix Documentation Workflow

When bug fixes are detected:

1. **Immediate Halt**: Stop all documentation operations
2. **User Notification**: Trigger Global Rule 1 workflow
3. **Verification Wait**: Block until user confirms fix works
4. **Conditional Proceed**: Only update docs after explicit approval
5. **Audit Trail**: Log entire workflow in Memory Bank

---

## Override Mechanisms

### 1. Complete System Override

This rule system provides **COMPLETE OVERRIDE** of default Roo Code behaviors:

- **No Default Assumptions**: System cannot assume user consent
- **No Contextual Bypasses**: Rules apply regardless of context
- **No Efficiency Shortcuts**: Rules cannot be skipped for speed
- **No Mode Exceptions**: All modes must follow rules equally

### 2. Precedence Resolution

When multiple rules apply simultaneously:

```
IF Global Rule applies:
    Execute Global Rule workflow
    BLOCK all other operations
    Wait for user confirmation
    IF approved:
        Check for applicable Project Rules
        Execute Project Rule workflows if needed
    ELSE:
        Abort entire operation

IF only Project Rule applies:
    Execute Project Rule workflow
    BLOCK operation until confirmation
    Proceed only after approval

IF no rules apply:
    Proceed with normal operation
    Log decision for audit trail
```

### 3. Conflict Resolution Protocol

In case of rule conflicts or ambiguity:

1. **Default to Most Restrictive**: Apply the rule requiring most user interaction
2. **Prompt for Clarification**: Use `ask_followup_question` tool
3. **Document Decision**: Record resolution in Memory Bank
4. **Update Rules**: Consider rule refinement for future clarity

---

## Compliance Monitoring

### 1. Real-Time Validation

Every Roo Code operation must pass through:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Operation     │───▶│   Rule Check    │───▶│   User Confirm  │
│   Requested     │    │   Engine        │    │   Required?     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        │
                                                        ▼
                                               ┌─────────────────┐
                                               │   Execute or    │
                                               │   Block         │
                                               └─────────────────┘
```

### 2. Audit Trail Requirements

All rule applications must be logged with:

- Timestamp of rule trigger
- Rule type and specific workflow applied
- User response and decision
- Final action taken (proceed/abort)
- Files affected by the decision

### 3. Memory Bank Integration

Rule enforcement must update Memory Bank files:

- `decisionLog.md`: All rule decisions and rationale
- `activeContext.md`: Current rule enforcement status
- `progress.md`: Rule compliance in task progression

---

## Emergency Protocols

### 1. Rule Violation Detection

If Roo Code attempts to violate rules:

1. **Immediate Block**: Stop the violating operation
2. **Error Notification**: Clearly explain the rule violation
3. **Corrective Action**: Initiate proper rule workflow
4. **Audit Log**: Record the violation attempt

### 2. System Failure Handling

If rule system fails or becomes unresponsive:

1. **Fail Safe**: Default to BLOCKING all operations
2. **User Notification**: Explain system state
3. **Manual Override**: Require explicit user command to proceed
4. **System Recovery**: Restore rule enforcement before continuing

### 3. Rule Update Protocols

When rules need modification:

1. **Version Control**: All rule changes must be versioned
2. **Backward Compatibility**: Ensure existing workflows continue
3. **User Notification**: Inform users of rule changes
4. **Testing**: Validate rule changes don't break enforcement

---

## Implementation Checklist

### For Roo Code System Integration

- [ ] File operation hooks installed
- [ ] Pattern matching engine configured
- [ ] User confirmation workflows implemented
- [ ] Memory Bank logging integrated
- [ ] Cross-mode enforcement verified
- [ ] Command interception active
- [ ] Audit trail system operational
- [ ] Emergency protocols tested

### For User Verification

- [ ] Global rules are enforced universally
- [ ] Project rules apply to protected files
- [ ] No operations proceed without confirmation
- [ ] All decisions are logged and auditable
- [ ] Rule hierarchy is respected
- [ ] Emergency overrides work correctly

---

## Version History

### Version 1.0.0 (2025-11-09)

- Initial rule hierarchy establishment
- Complete override system implementation
- Cross-mode enforcement protocols
- Audit trail and compliance monitoring
- Emergency handling procedures

---

## Authority and Enforcement

This document establishes **MANDATORY** enforcement protocols that:

- **CANNOT** be bypassed by any Roo Code mode
- **CANNOT** be overridden by system defaults
- **CANNOT** be ignored for efficiency or convenience
- **MUST** be followed universally across all operations

**Violation of these protocols constitutes a system failure and must be immediately corrected.**
