"use client";

import { useState, useTransition } from "react";
import type { PageSlug } from "@/lib/content/types";
import type { FieldDef } from "./schema";
import { updatePageContent } from "./actions";
import { inputClass, submitButtonClass, secondaryButtonClass } from "../ui";

type Values = Record<string, unknown>;

export function ContentForm({
  slug,
  fields,
  initialValues,
}: {
  slug: PageSlug;
  fields: FieldDef[];
  initialValues: Values;
}) {
  const [values, setValues] = useState<Values>(initialValues);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  function setField(key: string, value: unknown) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    startTransition(async () => {
      await updatePageContent(slug, values);
      setMessage({ ok: true, text: "Saved." });
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {fields.map((field) => (
        <FieldEditor
          key={field.key}
          field={field}
          value={values[field.key]}
          onChange={(v) => setField(field.key, v)}
        />
      ))}

      <div className="flex items-center gap-4">
        <button type="submit" disabled={isPending} className={submitButtonClass + " w-auto px-10"}>
          {isPending ? "Saving…" : "Save changes"}
        </button>
        {message && (
          <span className={message.ok ? "text-sm text-savanna" : "text-sm text-ember"}>
            {message.text}
          </span>
        )}
      </div>
    </form>
  );
}

function FieldEditor({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  if (field.type === "text") {
    return (
      <LabeledField label={field.label} hint={field.hint}>
        <input
          type="text"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      </LabeledField>
    );
  }

  if (field.type === "prose") {
    return (
      <LabeledField label={field.label} hint={field.hint}>
        <textarea
          rows={6}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      </LabeledField>
    );
  }

  if (field.type === "image") {
    return (
      <LabeledField label={field.label} hint={field.hint}>
        <ImageInput value={(value as string) ?? ""} onChange={onChange} />
      </LabeledField>
    );
  }

  if (field.type === "list-strings") {
    const items = (value as string[]) ?? [];
    return (
      <LabeledField label={field.label} hint={field.hint}>
        <textarea
          rows={6}
          value={items.join("\n")}
          onChange={(e) =>
            onChange(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))
          }
          className={inputClass}
        />
      </LabeledField>
    );
  }

  // list-object
  const objectField = field;
  const items = (value as Record<string, string>[]) ?? [];

  function updateItem(index: number, key: string, itemValue: string) {
    const next = items.map((item, i) => (i === index ? { ...item, [key]: itemValue } : item));
    onChange(next);
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function addItem() {
    const blank: Record<string, string> = {};
    for (const f of objectField.fields) blank[f.key] = "";
    onChange([...items, blank]);
  }

  return (
    <div>
      <p className="mb-3 text-sm font-medium text-white/80">{objectField.label}</p>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs uppercase tracking-wide text-white/40">
                {objectField.itemLabel} {index + 1}
              </p>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-xs text-ember hover:text-ember/80"
              >
                Remove
              </button>
            </div>
            <div className="space-y-3">
              {objectField.fields.map((sub) => (
                <LabeledField key={sub.key} label={sub.label}>
                  {sub.type === "prose" ? (
                    <textarea
                      rows={4}
                      value={item[sub.key] ?? ""}
                      onChange={(e) => updateItem(index, sub.key, e.target.value)}
                      className={inputClass}
                    />
                  ) : sub.type === "image" ? (
                    <ImageInput
                      value={item[sub.key] ?? ""}
                      onChange={(v) => updateItem(index, sub.key, v)}
                    />
                  ) : (
                    <input
                      type="text"
                      value={item[sub.key] ?? ""}
                      onChange={(e) => updateItem(index, sub.key, e.target.value)}
                      className={inputClass}
                    />
                  )}
                </LabeledField>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={addItem} className={secondaryButtonClass + " mt-4"}>
        Add {objectField.itemLabel.toLowerCase()}
      </button>
    </div>
  );
}

function ImageInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex items-start gap-4">
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          className="h-20 w-20 shrink-0 rounded-lg border border-white/10 object-cover"
        />
      )}
      <div className="flex-1 space-y-2">
        <input
          type="text"
          value={value}
          placeholder="/path/to/image.jpg"
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="block w-full text-xs text-white/60 file:mr-3 file:rounded-full file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-xs file:text-white hover:file:bg-white/20"
        />
      </div>
    </div>
  );
}

function LabeledField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-white/80">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-white/40">{hint}</span>}
    </label>
  );
}
