'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@heroui/react';
import toast from 'react-hot-toast';
import Cropper, { Area } from 'react-easy-crop';
import { getCroppedImg } from '@/utils/imageCropper';
import { compressImage } from '@/utils/imageCompressor';
import { useImmer } from 'use-immer';

const DEFAULT_ACCEPT = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heic-sequence',
];

interface ImageUploaderProps {
  /** max selectable files in one session */
  maxFiles?: number;
  /** megabytes */
  maxFileSizeMB?: number;
  /** mime types accepted */
  acceptTypes?: string[];
  /** aspect ratio for cropper (w / h) */
  cropAspectRatio?: number;
  /** emitted when **all** images successfully uploaded */
  onUpload?: (urls: string[]) => void;
  onError?: (msg: string) => void;
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Upload failed');
  const data = await res.json();
  return data.url as string;
}

export function ImageUploader({
  maxFiles = 1,
  maxFileSizeMB = 5,
  acceptTypes = DEFAULT_ACCEPT,
  cropAspectRatio = 1,
  onUpload,
  onError,
}: ImageUploaderProps) {
  /** <input type="file"> handle */
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /** all picked files (after validation) */
  const [files, setFiles] = useState<File[]>([]);
  /** index of a file being cropped */
  const [idx, setIdx] = useState(0);
  /** cropper params */
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  /** local object URL for current image */
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  /** uploaded urls */
  const [uploadedUrls, updateUrls] = useImmer<string[]>([]);
  /** is cropping dialog visible */
  const cropping = previewUrl !== null;

  const handlePick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const list = e.target.files;
    if (!list) return;

    const accepted: File[] = [];
    Array.from(list).some((file, i) => {
      if (!acceptTypes.includes(file.type)) {
        toast.error(`File ${i + 1}: unsupported type`);
        onError?.('unsupported-type');
        return false;
      }
      if (file.size > maxFileSizeMB * 1024 * 1024) {
        toast.error(`File ${i + 1}: exceeds ${maxFileSizeMB} MB`);
        onError?.('too-large');
        return false;
      }
      accepted.push(file);
      return accepted.length === maxFiles;
    });

    if (!accepted.length) return;

    setFiles(accepted);
    setIdx(0);
  };

  useEffect(() => {
    if (!files[idx]) return;
    const url = URL.createObjectURL(files[idx]);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [files, idx]);

  const finishCrop = useCallback(
    async (_: Area, pixels: Area) => {
      if (!previewUrl) return;
      try {
        const cropped = await getCroppedImg(previewUrl, pixels, 'webp');
        const compressed = await compressImage(cropped);
        const url = await uploadImage(compressed);

        updateUrls((draft) => {
          draft.push(url);
        });

        if (idx + 1 < files.length) {
          setIdx((prev) => prev + 1);
          setCrop({ x: 0, y: 0 });
          setZoom(1);
        } else {
          setPreviewUrl(null);
          onUpload?.([...uploadedUrls, url]);
          setFiles([]);
          setIdx(0);
        }
      } catch (err) {
        console.error(err);
        toast.error('Crop / upload failed');
        onError?.('crop-upload-fail');
      }
    },
    [previewUrl, files.length, idx, onUpload, onError, updateUrls, uploadedUrls],
  );

  const cancelAll = (): void => {
    setPreviewUrl(null);
    setFiles([]);
    setIdx(0);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        multiple={maxFiles > 1}
        accept={acceptTypes.join(',')}
        aria-label="Choose images"
        className="hidden"
        onChange={handlePick}
      />

      <Button onPress={() => fileInputRef.current?.click()} fullWidth>
        {cropping ? 'Pick more' : 'Pick image'}
      </Button>

      {cropping && previewUrl && (
        <div className="relative w-full h-[320px] rounded-xl overflow-hidden bg-black">
          <Cropper
            image={previewUrl}
            crop={crop}
            zoom={zoom}
            aspect={cropAspectRatio}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={finishCrop}
          />
          <div className="absolute bottom-2 inset-x-0 flex justify-around px-4">
            <Button size="sm" variant="shadow" onPress={cancelAll}>
              Cancel
            </Button>
            <Button size="sm" onPress={() => finishCrop({} as Area, {} as Area)}>
              Done
            </Button>
          </div>
        </div>
      )}

      {uploadedUrls.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {uploadedUrls.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Uploaded image ${i + 1}`}
              className="w-full aspect-square rounded border object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}
