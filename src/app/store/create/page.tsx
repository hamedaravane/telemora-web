/**
 * Store Creation Flow
 *
 * This page handles the step-by-step process for users to create a new store.
 * Since store creation requires multiple inputs, the process is broken into
 * several steps to enhance user experience.
 *
 * **Flow Overview:**
 * 1. **Basic Information:**
 *    - User fills in the initial store details:
 *      ```ts
 *      {
 *        name: string;
 *        description: string;
 *        contactNumber?: string;
 *        email?: string;
 *      }
 *      ```
 *    - Each field must be clearly labeled, explaining its necessity and expected format.
 *    - A **Next Step** button advances the user to the next stage.
 *
 * 2. **Store Location:**
 *    - User selects their store's physical location (optional but highly recommended).
 *      ```ts
 *      {
 *        country?: number;
 *        state?: number;
 *        city?: number;
 *      }
 *      ```
 *    - Location selection follows a dependent dropdown flow:
 *      - **Country** selection enables **State** selection.
 *      - **State** selection enables **City** selection.
 *    - The UI should emphasize the benefits of providing this data.
 *    - **Back** and **Next** buttons should be available.
 *
 * 3. **Store Category Selection:**
 *    - User selects a category from `StoreCategories` (a predefined enum).
 *    - The category list is extensive, so the selection must be intuitive.
 *    - **Back** and **Next** buttons should be available.
 *
 * 4. **Store Working Hours (Optional):**
 *    - User sets the store's opening and closing times.
 *      ```ts
 *      workingHours?: Record<string, { open: string; close: string }>;
 *      ```
 *    - Since not all stores require working hours, users should be informed
 *      that this field is optional.
 *    - **Back** and **Next** buttons should be available.
 *
 * 5. **Store Logo Upload (Final Step):**
 *    - User uploads a store logo.
 *    - The UI should display a **button or upload box** clearly instructing the user.
 *    - After selecting an image:
 *      - A **modal** should appear allowing the user to crop it **to a square**.
 *      - The image should then be **compressed and optimized** for web use.
 *    - **Back** and **Submit Store** buttons should be available.
 *
 * **Important Considerations:**
 * - No data is sent to the server until the final **Submit Store** button is pressed.
 * - Data is **persisted in state** throughout the flow to allow navigation between steps.
 * - The UI must be **minimal, intuitive, and user-friendly**.
 * - Users should **clearly understand each step's purpose** and the benefits of providing their data.
 *
 * **Implementation Guidelines:**
 * - Use **HeroUI** components whenever possible.
 * - If necessary, use **TailwindCSS**, but avoid raw CSS unless absolutely required.
 * - Maintain **semantic HTML** for accessibility.
 * - Ensure the code is **clean, modular, and maintainable**.
 *
 * **API Endpoints:**
 * - Basic Info: `${API_BASE_URL}/stores/create/basic`
 * - Location: `${API_BASE_URL}/stores/create/location`
 * - Category: `${API_BASE_URL}/stores/create/category`
 * - Working Hours: `${API_BASE_URL}/stores/create/working_hour`
 * - Logo Upload: `${API_BASE_URL}/stores/create/logo`
 */

export default function StoreCreationPage() {}
