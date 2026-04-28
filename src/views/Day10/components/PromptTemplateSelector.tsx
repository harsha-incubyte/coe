import React from 'react';
import { 
  TemplateSelectorContainer, 
  TemplateCard, 
  TemplateHeader, 
  TemplateIcon, 
  TemplateDescription 
} from '../Day10.styles';
import { MEDICAL_PROMPTS, PromptTemplate } from '@/lib/llm/prompts';

interface PromptTemplateSelectorProps {
  selectedTemplateId: string;
  onSelectTemplate: (template: PromptTemplate) => void;
  disabled?: boolean;
}

export const PromptTemplateSelector: React.FC<PromptTemplateSelectorProps> = ({
  selectedTemplateId,
  onSelectTemplate,
  disabled
}) => {
  return (
    <TemplateSelectorContainer>
      {MEDICAL_PROMPTS.map((template) => (
        <TemplateCard
          key={template.id}
          $isActive={selectedTemplateId === template.id}
          onClick={() => onSelectTemplate(template)}
          disabled={disabled}
          title={template.description}
        >
          <TemplateHeader>
            <TemplateIcon>{template.icon}</TemplateIcon>
            {template.name}
          </TemplateHeader>
          <TemplateDescription>{template.description}</TemplateDescription>
        </TemplateCard>
      ))}
    </TemplateSelectorContainer>
  );
};
