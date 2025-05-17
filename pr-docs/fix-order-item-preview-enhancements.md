# PR: Improve Order Item Preview Card Robustness and Accessibility

## Summary
This PR addresses six key issues in the `order-item-preview.tsx` component to enhance reliability, accessibility, and user experience in the order history UI.

## Changes Made

1. **Missing Image Fallback**
   - Added optional chaining and a fallback image to prevent crashes if `orderItem.product.image[0]` is undefined.

2. **No alt Text Sanitization**
   - Introduced sanitization and truncation for alt and UI strings to prevent layout breaks and XSS risks.

3. **Missing loading="lazy" on <Image />**
   - Ensured all images use `loading="lazy"` to improve performance on order history pages.

4. **Inconsistent Alignment & Overflow**
   - Applied `truncate`, `max-w`, and `clamp` styling to long product names to prevent overflow on small screens.

5. **Lack of Product Link / CTA**
   - Wrapped product name and image in a `Link` to product details, providing a clear CTA from order history.

6. **Accessibility (a11y) Gaps**
   - Improved semantic structure with heading tags and added `aria-label` attributes for better accessibility.

## Impact
- Prevents runtime errors and broken layouts
- Improves accessibility and SEO
- Enhances user navigation and performance

---

**Please review the changes for correctness and completeness.**