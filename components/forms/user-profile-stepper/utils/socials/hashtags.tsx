import React, { useState } from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { XIcon } from 'lucide-react';

interface HashtagInputProps {
  form: any; // Form control object from react-hook-form
  loading: boolean; // Loading state
  minHashtags: number; // Minimum number of hashtags required
  maxHashtags: number; // Maximum number of hashtags allowed
  required: boolean; // Whether this field is required
}

const HashtagInput: React.FC<HashtagInputProps> = ({
  form,
  loading,
  minHashtags,
  maxHashtags,
  required
}) => {
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  // Update form state when hashtags change
  const updateFormHashtags = (updatedHashtags: string[]) => {
    setHashtags(updatedHashtags);
    form.setValue('socialMediatags', updatedHashtags); // Set the form state
  };

  // Handle adding a hashtag
  const handleAddHashtag = () => {
    const trimmedValue = inputValue.trim();

    // Prevent adding empty, duplicate, or invalid hashtags (like spaces)
    if (
      !trimmedValue ||
      hashtags.includes(trimmedValue) ||
      trimmedValue.includes(' ')
    ) {
      return;
    }

    // Add hashtag only if limit is not reached
    if (hashtags.length < maxHashtags) {
      const updatedHashtags = [...hashtags, trimmedValue];
      updateFormHashtags(updatedHashtags);
      setInputValue(''); // Reset input after adding
    }
  };

  // Handle removing a hashtag
  const handleRemoveHashtag = (hashtagToRemove: string) => {
    const updatedHashtags = hashtags.filter((tag) => tag !== hashtagToRemove);
    updateFormHashtags(updatedHashtags);
  };

  // Handle Enter key press for adding hashtags
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddHashtag();
    }
  };

  return (
    <FormField
      control={form.control}
      name="socialMediatags" // The name should match the field in your form state
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormLabel>
            {required ? 'Add Hashtags (Required)' : 'Add Hashtags (Optional)'}
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
              {hashtags.length}/{maxHashtags} hashtags
            </span>
          </FormLabel>

          {/* Hashtag Input & Button */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a hashtag and press Enter"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading || hashtags.length >= maxHashtags}
              className="block w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
            />
            <button
              type="button"
              onClick={handleAddHashtag}
              disabled={loading || hashtags.length >= maxHashtags}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              +
            </button>
          </div>

          {/* Display hashtags */}
          <div className="mt-2 flex flex-wrap gap-2">
            {hashtags.map((hashtag, index) => (
              <div
                key={index}
                className="flex items-center rounded-full bg-gray-200 px-2 py-1 dark:bg-gray-700"
              >
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  #{hashtag}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveHashtag(hashtag)}
                  className="ml-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Validation & Error Messages */}
          {hashtags.length < minHashtags && required && (
            <p className="text-sm text-red-500">
              Please add at least {minHashtags} hashtags.
            </p>
          )}
          {error && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
};

export default HashtagInput;
