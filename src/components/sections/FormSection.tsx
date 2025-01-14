import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSubmissionsStore } from '@/lib/store/submissions';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox' | 'radio';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface FormSectionProps {
  content: {
    title?: string;
    description?: string;
    fields: FormField[];
    submitText?: string;
    successMessage?: string;
    style?: {
      layout: 'simple' | 'card';
      submitButtonAlign?: 'left' | 'center' | 'right';
      submitButtonWidth?: 'auto' | 'full';
    };
  };
  pageId: string;
}

export function FormSection({ content, pageId }: FormSectionProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const addSubmission = useSubmissionsStore((state) => state.addSubmission);
  const { toast } = useToast();

  const {
    style = {
      layout: 'simple',
      submitButtonAlign: 'left',
      submitButtonWidth: 'auto'
    }
  } = content;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submission = {
      id: crypto.randomUUID(),
      formId: pageId,
      data: formData,
      status: 'pending' as const,
      submittedAt: new Date().toISOString()
    };

    addSubmission(submission);

    toast({
      title: 'Formulario enviado',
      description: content.successMessage || 'Tu respuesta ha sido registrada correctamente.',
    });

    setFormData({});
    (e.target as HTMLFormElement).reset();
  };

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            id={field.id}
            placeholder={field.placeholder}
            required={field.required}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        );

      case 'select':
        return (
          <Select
            value={formData[field.id] || ''}
            onValueChange={(value) => handleInputChange(field.id, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={formData[field.id] || false}
              onCheckedChange={(checked) => handleInputChange(field.id, checked)}
            />
            <label htmlFor={field.id} className="text-sm">
              {field.label}
            </label>
          </div>
        );

      case 'radio':
        return (
          <RadioGroup
            value={formData[field.id] || ''}
            onValueChange={(value) => handleInputChange(field.id, value)}
          >
            {field.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${field.id}-${option}`} />
                <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      default:
        return (
          <Input
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        );
    }
  };

  const FormContent = (
    <>
      {content.title && (
        <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
      )}
      {content.description && (
        <p className="text-gray-600 mb-6">{content.description}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {content.fields.map((field) => (
          <div key={field.id} className="space-y-2">
            {field.type !== 'checkbox' && (
              <Label htmlFor={field.id}>{field.label}</Label>
            )}
            {renderField(field)}
          </div>
        ))}

        <div className={`flex ${
          style.submitButtonAlign === 'center' ? 'justify-center' :
          style.submitButtonAlign === 'right' ? 'justify-end' : 'justify-start'
        }`}>
          <Button
            type="submit"
            className={style.submitButtonWidth === 'full' ? 'w-full' : ''}
          >
            {content.submitText || 'Enviar'}
          </Button>
        </div>
      </form>
    </>
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {style.layout === 'card' ? (
        <Card className="p-6">{FormContent}</Card>
      ) : (
        FormContent
      )}
    </div>
  );
}