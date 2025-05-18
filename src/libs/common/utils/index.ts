export const isDev = process.env.NODE_ENV === 'development';

export function escapeHtml(str: string) {
    return str.replace(/[&<>'"`]/g, (tag) => ({'&':'&amp;','<':'&lt;','>':'&gt;','\'':'&#39;','"':'&quot;','`':'&#96;'}[tag]||tag));
}