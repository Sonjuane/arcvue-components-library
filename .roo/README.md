# Roo Code Rules Configuration System

**Version:** 1.0.0  
**Last Updated:** 2025-11-09  
**Project:** Vue/Vite Web Component Library

---

## Overview

This directory contains a comprehensive rules configuration system that establishes mandatory user confirmation protocols and overrides all default Roo Code behaviors. The system ensures user control over critical project modifications through a hierarchical rule enforcement mechanism.

---

## Directory Structure

```
.roo/
├── README.md                    # This documentation file
├── enforcement-config.json      # Automated rule processing configuration
└── rules/
    ├── global-rules.md          # Universal mandatory rules
    ├── project-rules.md         # Project-specific rule extensions
    └── rule-hierarchy.md        # Enforcement mechanisms and hierarchy
```

---

## Rule System Components

### 1. Global Rules (`rules/global-rules.md`)

**Enforcement Level:** MANDATORY - Cannot be bypassed or overridden

Universal rules that apply across ALL Roo Code operational modes:

#### Rule 1: Bug Resolution Documentation Updates

- **Trigger:** Bug fixes requiring documentation updates
- **Action:** Mandatory user verification before updating any documentation
- **Workflow:** Stop → Prompt → Wait for approval → Proceed only if approved

#### Rule 2: Test Creation Authorization

- **Trigger:** Any test file creation or modification
- **Action:** Explicit user approval required before creating tests
- **Workflow:** Stop → Detail proposal → Wait for approval → Create only if approved

### 2. Project Rules (`rules/project-rules.md`)

**Enforcement Level:** PROJECT OVERRIDE - Extends global rules

Project-specific rules for the Vue/Vite component library:

#### Rule 1: Component Library File Protection

- **Protected Files:** `src/components/**/*.vue`, `src/composables/**/*.ts`, `vite.config.ts`, etc.
- **Action:** Confirmation required before modifying core library files

#### Rule 2: Build Output Validation

- **Trigger:** Changes affecting build pipeline
- **Action:** User validation of build outputs required

#### Rule 3: Histoire Documentation Sync

- **Trigger:** Component changes
- **Action:** Prompt for documentation updates

#### Rule 4: Server Dependency Management

- **Trigger:** Server integration requirements
- **Action:** Confirmation of server implementation approach

### 3. Rule Hierarchy (`rules/rule-hierarchy.md`)

**Authority:** SYSTEM OVERRIDE CONFIGURATION

Documents the complete enforcement hierarchy and mechanisms:

```
1. GLOBAL RULES (Highest Priority)
   └── Cannot be bypassed by any mode or context
2. PROJECT RULES (Secondary Priority)
   └── Apply when global rules don't conflict
3. DEFAULT ROO CODE BEHAVIORS (Lowest Priority)
   └── Completely overridden by above rules
```

### 4. Enforcement Configuration (`enforcement-config.json`)

**Purpose:** Automated rule processing and validation

Machine-readable configuration for:

- File pattern detection
- Rule trigger conditions
- Workflow automation
- Audit trail requirements
- Compliance monitoring

---

## How It Works

### File Operation Interception

Every file operation is intercepted and validated:

1. **Pre-Operation Check:** Scan file path against rule patterns
2. **Rule Application:** Trigger appropriate rule workflow if match found
3. **User Confirmation:** Block operation until explicit user approval
4. **Audit Logging:** Record all decisions in Memory Bank
5. **Proceed/Abort:** Execute or cancel based on user response

### Cross-Mode Enforcement

Rules apply universally across all Roo Code modes:

- **Code Mode:** Validates every file write operation
- **Architect Mode:** Prompts before implementation
- **Debug Mode:** Enforces bug fix documentation workflow
- **Orchestrator Mode:** Coordinates rule compliance across sub-tasks
- **Ask Mode:** Follows rules when proposing changes

### Command Interception

Build and test commands are intercepted:

- **Build Commands:** `pnpm build`, `vite build`, etc.
- **Test Commands:** `pnpm test`, `vitest`, etc.
- **Validation:** User confirmation required before execution

---

## Rule Enforcement Examples

### Example 1: Test Creation

```
User Request: "Add unit tests for the Button component"

Roo Code Response:
🧪 Test Creation Authorization Required

I'm proposing to add tests to the project...
[Detailed test proposal with framework, scope, rationale]

Do you approve adding these tests to the project?
```

### Example 2: Bug Fix Documentation

```
Scenario: Roo Code fixes a bug in component styling

Roo Code Response:
🐛 Bug Fix Verification Required

I encountered and fixed a bug in the project...
[Detailed bug description, fix applied, testing recommendations]

Please confirm:
1. Have you tested the fix?
2. Is the bug actually resolved?
3. Should I proceed with updating documentation?
```

### Example 3: Component Library Protection

```
User Request: "Modify the Button component"

Roo Code Response:
🔒 Component Library File Modification

I'm about to modify core library files...
[Impact assessment, rationale, proposed changes]

Do you approve these modifications to the component library?
```

---

## Benefits

### 1. Complete User Control

- No operations proceed without explicit user consent
- All critical decisions require user confirmation
- Prevents unwanted modifications to important files

### 2. Audit Trail

- All rule applications logged in Memory Bank
- User decisions tracked and documented
- Complete history of project modifications

### 3. Consistency Across Modes

- Same rules apply regardless of Roo Code mode
- No mode can bypass rule enforcement
- Unified behavior across all operations

### 4. Project-Specific Customization

- Global rules provide universal protection
- Project rules add context-specific safeguards
- Hierarchical system allows fine-tuned control

---

## Configuration Management

### Version Control

- All rule files are version-controlled
- Changes are tracked and documented
- Backward compatibility maintained

### Rule Updates

- Version all rule modifications
- Document rationale for changes
- Test rule changes before deployment

### Emergency Protocols

- Fail-safe mode blocks all operations if rules fail
- Manual override requires explicit user command
- All overrides must be documented and justified

---

## Compliance Verification

### Self-Check Questions

Before any operation, Roo Code must verify:

1. Do any rules apply to this operation?
2. Have I received explicit user approval?
3. Are all decisions properly logged?

### Monitoring

- Real-time rule application tracking
- User response time monitoring
- Rule effectiveness measurement
- Violation attempt detection

---

## Troubleshooting

### Rule Not Triggering

1. Check file patterns in `enforcement-config.json`
2. Verify rule is enabled in configuration
3. Confirm file path matches trigger patterns

### Unexpected Blocking

1. Review rule hierarchy in `rule-hierarchy.md`
2. Check for conflicting rule applications
3. Verify user approval workflow completion

### Configuration Issues

1. Validate JSON syntax in `enforcement-config.json`
2. Check rule file references and paths
3. Ensure Memory Bank integration is active

---

## Support and Maintenance

### Regular Review

- Monthly rule effectiveness assessment
- User feedback collection and analysis
- Rule refinement based on usage patterns

### Updates and Improvements

- Continuous monitoring of rule performance
- Regular updates to match project evolution
- Community feedback integration

### Documentation

- Keep all rule documentation current
- Update examples and use cases
- Maintain clear troubleshooting guides

---

## Authority and Enforcement

This rules system establishes **MANDATORY** enforcement protocols that:

- **CANNOT** be bypassed by any Roo Code mode
- **CANNOT** be overridden by system defaults
- **CANNOT** be ignored for efficiency or convenience
- **MUST** be followed universally across all operations

**Violation of these protocols constitutes a system failure and must be immediately corrected.**

---

## Contact and Support

For questions about the rules system:

1. Review this documentation thoroughly
2. Check rule-specific documentation in `rules/` directory
3. Examine enforcement configuration in `enforcement-config.json`
4. When in doubt, the system defaults to applying the most restrictive rule

**Remember: When in doubt, always ask the user.**
