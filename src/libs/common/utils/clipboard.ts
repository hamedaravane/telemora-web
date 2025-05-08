import toast from 'react-hot-toast';

export async function copyToClipboard(text: string): Promise<void> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      toast.success('Link copied to clipboard!');
      return;
    }

    const tempInput = document.createElement('input');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';
    tempInput.value = text;
    document.body.appendChild(tempInput);

    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    toast.success('Link copied to clipboard!');
  } catch (err) {
    console.error('Clipboard operation failed', err);
    toast.error(`Unable to copy text. The content is: ${text}`);
  }
}
