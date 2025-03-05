/**
 * User Profile Page Component
 *
 * This file is responsible for developing the user profile page.
 * The user navigates to this page by tapping the "Profile" button in the bottom navigation.
 *
 * ## Purpose
 * The primary goal of this page is to allow users to view and update their personal information
 * and account settings. However, since this app is a Telegram Mini App, some user data is
 * retrieved directly from Telegram and cannot be modified.
 *
 * ## User Data Structure
 * The following object represents the user data model, containing all retrievable user information:
 *
 * ```ts
 * {
 *   id: number;
 *   telegramId: string;
 *   firstName: string;
 *   lastName?: string;
 *   username?: string;
 *   languageCode?: string;
 *   hasTelegramPremium?: boolean;
 *   photoUrl?: string;
 *   phoneNumber?: string;
 *   email?: string;
 *   role: UserRole;
 *   walletAddress?: string;
 *   country?: Country;
 *   state?: State;
 *   city?: City;
 *   orders: Order[];
 *   reviews: Review[];
 *   stores: Store[];
 *   payments: Payment[];
 *   createdAt: Date;
 * }
 * ```
 *
 * Some fields, such as `photoUrl`, are fetched from Telegram and cannot be modified by the user.
 *
 * ## Editable User Data
 * Users can update certain aspects of their profile by submitting objects with the following formats:
 *
 * ```ts
 * export interface UpdateContactLocationDto {
 *   phoneNumber: string;
 *   email: string;
 *   countryId: number;
 *   stateId: number;
 *   cityId: number;
 * }
 *
 * export interface UpdateLanguageDto {
 *   languageCode: string;
 * }
 *
 * export interface UpdateProfileDto {
 *   firstName?: string;
 *   lastName?: string;
 * }
 * ```
 *
 * Each update type corresponds to a separate API endpoint. The UI should ensure a user-friendly
 * experience for modifying these details.
 *
 * ## Additional Features
 * - The user should have easy access to the following pages:
 *   - Terms & Conditions
 *   - FAQ (Frequently Asked Questions)
 *   - Privacy Policy
 * - The app version should be displayed on this page to inform users that the app is continuously
 *   improving.
 *
 * ## UI/UX Guidelines
 * - Use pre-built components from **HeroUI** whenever possible.
 * - If custom components are necessary, implement them using **TailwindCSS** (avoid raw CSS).
 * - Maintain a **minimal and clean** design focused on **user-friendliness**.
 * - Ensure every feature is intuitive, providing clear guidance on actions users can take.
 * - The entire UI should be designed exclusively for **mobile devices**.
 *
 * TODO: Implement this page based on above specifications.
 */
