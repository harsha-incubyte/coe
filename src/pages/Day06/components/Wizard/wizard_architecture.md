# Wizard Architecture Diagram

The frontend application uses a **Decoupled Headless Architecture**, separating domain-agnostic step navigation logic from domain-specific device configuration states.

Here is the relationship mapped out visually:

```mermaid
graph TD
    classDef generic fill:#0e4429,stroke:#006d32,stroke-width:2px,color:#fff;
    classDef domain fill:#311c87,stroke:#5843be,stroke-width:2px,color:#fff;
    classDef hooks fill:#0a3069,stroke:#215eba,stroke-width:2px,color:#fff;
    
    subgraph "Day 06 Domain (Device Configuration)"
        DeviceConfigurationWizard["DeviceConfigurationWizard"]
        WizardProvider["WizardProvider"]
        WIZARD_STEPS["WIZARD_STEPS (State)"]
        useWizardState["useWizardState"]
        useWizardDispatch["useWizardDispatch"]
        useWizardDataHooks["useWizard.ts<br/>(useWizard / useWizardActions)"]
    end
    
    subgraph "Generic Components (src/components/Wizard)"
        GenericWizard["Wizard.tsx"]
        GenericWizardStep["WizardStep.tsx"]
        GenericWizardContext["WizardContext.ts"]
    end

    subgraph "Core Hooks"
        useStepNavigation["useStepNavigation.ts"]
    end

    %% Flow of components
    DeviceConfigurationWizard -->|1. Renders| WizardProvider
    DeviceConfigurationWizard -->|2. Renders| GenericWizard
    
    %% Generic Logic
    GenericWizard -->|Manages index via| useStepNavigation
    GenericWizard -->|Provides Context| GenericWizardContext
    GenericWizardStep -->|Consumes Index| GenericWizardContext

    %% Domain Context & Hooks
    WizardProvider -->|Provides Context| useWizardState
    WizardProvider -->|Provides Context| useWizardDispatch
    
    %% Bridges
    useWizardDataHooks -->|Consumes Navigation Action/Index| GenericWizardContext
    useWizardDataHooks -->|Maps current index to| WIZARD_STEPS

    %% Apply Styles
    class GenericWizard,GenericWizardStep,GenericWizardContext generic;
    class DeviceConfigurationWizard,WizardProvider,WIZARD_STEPS domain;
    class useWizardState,useWizardDispatch,useWizardDataHooks,useStepNavigation hooks;

```

### Key Architectural Layers

1. **Top Level Orchestrator**: `DeviceConfigurationWizard` coordinates both the state provider (`WizardProvider`) and the visual wrapper (`Wizard.tsx`).
2. **Domain State Management (`WizardProvider`, `useWizardState`, `useWizardDispatch`)**: Stores and updates domain-specific configuration details like `deviceId` and `networkConfig` cleanly insulated from generic UI navigation logic.
3. **Generic Navigation Engine (`Wizard.tsx`, `useStepNavigation.ts`, `WizardContext.ts`)**: Represents the absolute generic "headless" core. It holds only the `currentStepIndex` and index navigation functions without knowing *what* is being configured.
4. **The Bridges (`useWizard.ts`)**: Serves as the integration point mapping the generic index (from `WizardContext.ts`) to the domain-specific `WIZARD_STEPS` string literals to determine exactly which step we are on (`SCAN`, `NETWORK`, etc.).
