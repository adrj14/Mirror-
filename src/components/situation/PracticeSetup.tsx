import React, { useRef, useState } from 'react';
import { SituationData } from '../../types/mirror';
import { PersonaSelector } from '../persona/PersonaSelector';
import { SAMPLE_SCENARIOS, SampleScenario } from '../../data/sampleScenarios';
import { UploadCloud, Image as ImageIcon, Trash2, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

interface PracticeSetupProps {
  situationData: SituationData;
  onChangeSituationData: (data: SituationData) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const PracticeSetup: React.FC<PracticeSetupProps> = ({
  situationData,
  onChangeSituationData,
  onSubmit,
  isLoading
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImageFile = (file: File) => {
    setErrorMessage(null);
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Please upload a valid image file (PNG, JPG, or WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Image size exceeds 5MB limit. Please upload a smaller file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1];
      onChangeSituationData({
        ...situationData,
        imagePreview: result,
        imageBase64: base64Data,
        imageMimeType: file.type,
        imageName: file.name
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    onChangeSituationData({
      ...situationData,
      imagePreview: null,
      imageBase64: null,
      imageMimeType: null,
      imageName: null
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleApplyPreset = (scenario: SampleScenario) => {
    onChangeSituationData({
      ...situationData,
      text: scenario.description,
      selectedPersonaId: scenario.personaId
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!situationData.text.trim()) {
      setErrorMessage('Please describe the situation or conversation you want to practice.');
      return;
    }
    setErrorMessage(null);
    onSubmit();
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <div className="mirror-chip mx-auto mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          Step 1 of 5
        </div>
        <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-5xl">
          What are you preparing for?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
          Tell MIRROR what is happening, and we will set up a realistic practice session.
        </p>
      </div>

      <div className="soft-panel mb-6 rounded-[1.7rem] p-4">
        <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          <span>Quick start</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_SCENARIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => handleApplyPreset(s)}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">
        <div className="soft-panel rounded-[2rem] p-5 sm:p-6 lg:p-7">
          <div className="mb-3 flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-800">Describe your situation</label>
            <span className="text-xs text-slate-500">{situationData.text.length} characters</span>
          </div>

          <textarea
            rows={5}
            value={situationData.text}
            onChange={(e) => onChangeSituationData({ ...situationData, text: e.target.value })}
            placeholder="Describe the conversation, challenge, or scenario you want to practice..."
            className="w-full resize-y rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-100"
          />

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                <ImageIcon className="h-3.5 w-3.5 text-indigo-500" />
                Screenshot / reference
              </span>
              <span className="text-[10px] text-slate-500">PNG, JPG, WEBP • up to 5MB</span>
            </div>

            {!situationData.imagePreview ? (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`cursor-pointer rounded-[1.5rem] border-2 border-dashed p-6 text-center transition ${
                  dragOver
                    ? 'border-indigo-300 bg-indigo-50'
                    : 'border-slate-200 bg-slate-50/80 hover:border-indigo-200 hover:bg-indigo-50/50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleImageFile(e.target.files[0]);
                    }
                  }}
                />
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <UploadCloud className="h-5 w-5 text-indigo-500" />
                </div>
                <div className="text-sm font-medium text-slate-700">Drop a screenshot here</div>
                <p className="mt-1 text-xs text-slate-500">or browse image</p>
              </div>
            ) : (
              <div className="flex items-center justify-between rounded-[1.5rem] border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <img src={situationData.imagePreview} alt="Preview" className="h-14 w-14 rounded-xl object-cover" />
                  <div className="truncate">
                    <div className="truncate text-sm font-medium text-slate-800">{situationData.imageName || 'image.png'}</div>
                    <div className="mt-0.5 text-[11px] text-emerald-600">Visual context attached</div>
                  </div>
                </div>
                <button type="button" onClick={handleRemoveImage} className="rounded-xl p-2 text-slate-500 transition hover:bg-white hover:text-rose-500" aria-label="Remove image">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="soft-panel rounded-[2rem] p-5 sm:p-6">
          <PersonaSelector
            selectedId={situationData.selectedPersonaId}
            onSelect={(id) => onChangeSituationData({ ...situationData, selectedPersonaId: id })}
            customDetails={situationData.customPersonaDetails}
            onChangeCustomDetails={(details) =>
              onChangeSituationData({
                ...situationData,
                customPersonaDetails: details
              })
            }
          />
        </div>

        {errorMessage && (
          <div className="flex items-center gap-2 rounded-[1.25rem] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            <AlertCircle className="h-4 w-4" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="primary-button w-full px-6 py-3.5 text-base font-semibold sm:w-auto"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
