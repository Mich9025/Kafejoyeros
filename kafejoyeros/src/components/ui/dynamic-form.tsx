"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "@/components/ui/phone-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { z } from "zod";
import { useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
type FieldType = {
  name: string;
  label: string | React.ReactNode;
  type: "text" | "email" | "tel" | "textarea" | "checkbox" | "select" | "section-header" | "number" | "image" | "date";
  placeholder?: string;
  required?: boolean;
  validation?: z.ZodSchema<unknown>;
  span?: "full" | "half";
  autoComplete?: string;
  options?: { value: string; label: string }[];  // Add this line
  className?: string;
  peerclassName?: string;
  helpText?: string;
  onChange?: (value: string | boolean | File | number | null) => void;
  isPolicyCheckbox?: boolean;
  policyLink?: string;
};

type FormProps = {
  className?: string;
  peerclassName?: string;
  fields: FieldType[];
  onSubmit: (data: Record<string, string | boolean | File | number | null>) => Promise<void>;
  onChange?: (data: Record<string, string | boolean | File | number | null>) => Promise<void>;
  defaultValues?: Record<string, string | boolean | File | number | null>; // Añadir esta propiedad
  submitText?: string;
  loadingText?: string;
  successMessage?: string;
  successDescription?: string;
  retryText?: string;
  schema?: z.ZodSchema<Record<string, unknown>>;
  hideLabels?: boolean;
  submitClassName?: string;  
};

export function DynamicForm({
  className,
  fields,
  onSubmit,
  onChange,
  defaultValues = {}, // Añadir valor por defecto
  submitText = "Submit",
  submitClassName = "w-full",
  loadingText = "Submitting...",  
  successMessage = "Thank you!",
  successDescription = "We'll get back to you soon.",
  retryText = "Send another message",
  schema,
}: FormProps) {
  // Update the state definition
  const [phoneInputValues, setPhoneInputValues] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<Record<string, string>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement>>({});

  // Create a more type-safe schema generation
  const createFieldSchema = (field: FieldType): z.ZodSchema<unknown> => {
    if (field.validation) {
      return field.validation;
    }

    switch (field.type) {
      case "checkbox":
        return field.required 
          ? z.boolean().refine(val => val === true, "Este campo es obligatorio")
          : z.boolean().optional();
      case "number":
        return field.required 
          ? z.number().min(1, "Este Campo es Obligatorio")
          : z.number().optional();
      case "email":
        return field.required 
          ? z.string().min(1, "Este Campo es Obligatorio").email("Email inválido")
          : z.string().email("Email inválido").optional().or(z.literal(""));
      case "tel":
        return field.required 
          ? z.string().min(1, "Este Campo es Obligatorio")
          : z.string().optional();
      case "image":
        return field.required 
          ? z.instanceof(File, { message: "Este Campo es Obligatorio" })
          : z.instanceof(File).optional();
      default:
        return field.required 
          ? z.string().min(1, "Este Campo es Obligatorio")
          : z.string().optional();
    }
  };

  const schemaFields = fields.reduce((acc, field) => {
    if (field.type !== "section-header") {
      acc[field.name] = createFieldSchema(field);
    }
    return acc;
  }, {} as Record<string, z.ZodSchema<unknown>>);

  const formSchema = schema || z.object(schemaFields);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setValue,
    watch,
    reset,
  } = useForm({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema as any),
    defaultValues: defaultValues, // Usar los valores por defecto
  });

  // Establecer los valores por defecto cuando cambian
  useEffect(() => {
    if (defaultValues) {
      Object.entries(defaultValues).forEach(([key, value]) => {
        if (value !== undefined) {
          setValue(key, value);
        }
      });
    }
  }, [defaultValues, setValue, fields]);

  // Añadir este useEffect para manejar los cambios en el formulario

useEffect(() => {
    if (onChange) {
      const subscription = watch((value) => {
        onChange(value);
      });
      return () => subscription.unsubscribe();
    }
  }, [watch, onChange]);

  // In the renderField function, add the select case
  const renderField = (field: FieldType) => {
    const commonProps = {
      id: field.name,
      placeholder: field.placeholder,
      autoComplete: field.autoComplete,
      className: field.className,
      ...register(field.name),
    };

    switch (field.type) {     
      case "textarea":
        return (
          <Textarea
            {...commonProps}
            rows={4}
          />
        );
      // Update the PhoneInput component
      case "tel":
        return (
          <PhoneInput
            placeholder={field.placeholder || "Ingresa tu número de teléfono"}
            className={field.className}             
            value={phoneInputValues[field.name] || ""}
            defaultCountry="CO"            
            onChange={(value) => {
              setPhoneInputValues(prev => ({
                ...prev,
                [field.name]: value
              }));
              setValue(field.name, value, { shouldValidate: true });
            }}
          />
        );
      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.name}
              className={field.peerclassName}
              checked={watch(field.name)}
              onCheckedChange={(checked) => {
                setValue(field.name, Boolean(checked));
              }}
            />
            <label
              htmlFor={field.name}
              className={field.className}
              data-checked={watch(field.name)}
              //text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70
            >
              {field.isPolicyCheckbox && field.policyLink ? (
                <span>
                  Acepto la {' '}
                  <a 
                    href={field.policyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:underline"
                  >
                    política de tratamiento de datos personales
                  </a>
                </span>
              ) : (
                field.label
              )}
            </label>
          </div>
        );
      case "select":
        return (
          <Select
            onValueChange={(value) => {
              setValue(field.name, value);
              // Llamar a onChange del campo si existe
              if (field.onChange) {
                field.onChange(value);
              }
            }}
            value={watch(field.name)}
          >
            <SelectTrigger className={cn("bg-white text-sm placeholder:text-xs", field.className)}>
              <SelectValue placeholder={field.placeholder} className="text-xs" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value} className="bg-white hover:bg-gray-50 text-sm">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "date":
        return (
          <Input
            {...commonProps}
            type="date"
            max={new Date().toISOString().split('T')[0]}
          />
        );
      case "image":
        return (
          <div className="flex flex-col gap-2">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (file.type !== "image/jpeg" && file.type !== "image/png") {
                    e.target.value = "";
                    alert("Por favor, selecciona una imagen en formato JPG o PNG");
                    return;
                  }
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImagePreview(prev => ({
                      ...prev,
                      [field.name]: reader.result as string
                    }));
                  };
                  reader.readAsDataURL(file);
                  setValue(field.name, file);
                }
              }}
              className={field.className}
              ref={(el) => {
                if (el) {
                  fileInputRefs.current[field.name] = el;
                }
              }}
            />
            {imagePreview[field.name] && (
              <div className="relative w-full h-40">
                <Image
                  src={imagePreview[field.name]}
                  alt="Vista previa"
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>
        );
      case "section-header":
        return (          
            <h2 className={field.className}>
              {field.placeholder}
            </h2>               
        );  
      // case "number":
      //   return (
      //     <Input
      //       {...commonProps}
      //       type={field.type}
      //     />
      //   );       
      default:
        return (
          <Input
            {...commonProps}
            type={field.type}
            min="0"
          />
        );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => await onSubmit(data as Record<string, string | boolean | File | number | null>))}
      className={cn("relative", className)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div
            key={field.name}            
            className={cn(
              field.span === "full" ? "sm:col-span-2" : "",
              field.type === "checkbox" ? "" : ""
            )}
          >
            {field.type !== "checkbox" && (
              <label
                htmlFor={field.name}
                className="block text-sm/6 font-semibold text-gray-900"
              >
                {field.label}
              </label>
            )}            
            <div className="mt-2.5">
              {renderField(field)}
            </div>
            {field.helpText && (
              <p className="mt-1 text-sm text-gray-500">{field.helpText}</p>
            )}
            {errors[field.name]?.message && (
              <p className="mt-2 text-sm text-red-700">
                {errors[field.name]?.message as string}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 py-4 flex justify-center">
        <Button className={submitClassName} type="submit" disabled={isSubmitting}>
          {isSubmitting ? loadingText : submitText}
        </Button>
      </div>

      {isSubmitSuccessful && (
        <div className="absolute inset-0 flex items-center justify-center bg-white p-8">
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-border bg-background px-6 py-8 shadow-xl">
            <div className="flex items-center gap-2">
              <HiOutlineCheckCircle className="size-5 text-green-500" />
              <p className="text-sm font-medium text-green-800">
                {successMessage}
              </p>
              <p className="text-sm text-foreground/50">
                {successDescription}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="mt-4 text-primary"
              onClick={() => {
                reset();
                setPhoneInputValues({});
              }}
            >
              {retryText}
            </Button>
          </div>
        </div>
      )}

      {isSubmitting && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-20">
          <div role="status">
            <svg
              aria-hidden="true"
              className="size-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </form>
  );
}