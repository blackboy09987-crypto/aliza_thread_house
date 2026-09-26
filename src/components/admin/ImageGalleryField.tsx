"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type NewImage = { file: File; previewUrl: string };

export default function ImageGalleryField({
  existingImages = [],
}: {
  existingImages?: string[];
}) {
  const [kept, setKept] = useState<string[]>(existingImages);
  const [newImages, setNewImages] = useState<NewImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function syncFileInput(images: NewImage[]) {
    const dt = new DataTransfer();
    images.forEach((img) => dt.items.add(img.file));
    if (fileInputRef.current) fileInputRef.current.files = dt.files;
  }

  function handleFilesSelected(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const added = Array.from(fileList).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    const merged = [...newImages, ...added];
    setNewImages(merged);
    syncFileInput(merged);
  }

  function removeExisting(url: string) {
    setKept((prev) => prev.filter((u) => u !== url));
  }

  function moveExisting(index: number, direction: -1 | 1) {
    setKept((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function removeNew(index: number) {
    const next = newImages.filter((_, i) => i !== index);
    setNewImages(next);
    syncFileInput(next);
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm text-ink-soft">Photos</span>

      <input type="hidden" name="existingImages" value={JSON.stringify(kept)} />

      {(kept.length > 0 || newImages.length > 0) && (
        <div className="flex flex-wrap gap-3">
          {kept.map((url, index) => (
            <div
              key={url}
              className="relative h-24 w-24 overflow-hidden rounded-lg border border-cream-line bg-cream-soft"
            >
              <Image src={url} alt="" fill className="object-cover" unoptimized />
              <div className="absolute inset-x-0 bottom-0 flex justify-between bg-ink/50 px-1 py-0.5">
                <button
                  type="button"
                  onClick={() => moveExisting(index, -1)}
                  disabled={index === 0}
                  className="text-xs text-cream disabled:opacity-30"
                  aria-label="Move earlier"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => removeExisting(url)}
                  className="text-xs text-cream hover:text-rose-soft"
                  aria-label="Remove photo"
                >
                  ✕
                </button>
                <button
                  type="button"
                  onClick={() => moveExisting(index, 1)}
                  disabled={index === kept.length - 1}
                  className="text-xs text-cream disabled:opacity-30"
                  aria-label="Move later"
                >
                  →
                </button>
              </div>
            </div>
          ))}
          {newImages.map((img, index) => (
            <div
              key={img.previewUrl}
              className="relative h-24 w-24 overflow-hidden rounded-lg border border-sage bg-cream-soft"
            >
              <Image src={img.previewUrl} alt="" fill className="object-cover" unoptimized />
              <span className="absolute top-1 left-1 rounded bg-sage-dark px-1 text-[10px] text-cream">
                new
              </span>
              <button
                type="button"
                onClick={() => removeNew(index)}
                className="absolute inset-x-0 bottom-0 bg-ink/50 py-0.5 text-xs text-cream hover:text-rose-soft"
                aria-label="Remove photo"
              >
                ✕ remove
              </button>
            </div>
          ))}
        </div>
      )}

      <label className="flex flex-col gap-1 text-sm text-ink-soft">
        Add photos (JPG, PNG, WEBP — max 2MB each)
        <input
          ref={fileInputRef}
          type="file"
          name="imageFiles"
          multiple
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={(e) => handleFilesSelected(e.target.files)}
          className="text-sm"
        />
      </label>
      {kept.length === 0 && newImages.length === 0 && (
        <p className="text-xs text-ink-soft">
          No photos yet — a default placeholder for the category will be used until you add one.
        </p>
      )}
    </div>
  );
}
