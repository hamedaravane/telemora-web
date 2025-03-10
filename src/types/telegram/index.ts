export interface ThemeParams {
  /** Background color in the `#RRGGBB` format */
  bg_color?: string;
  /** Main text color in the `#RRGGBB` format */
  text_color?: string;
  /** Hint text color in the `#RRGGBB` format */
  hint_color?: string;
  /** Link color in the `#RRGGBB` format */
  link_color?: string;
  /** Button color in the `#RRGGBB` format */
  button_color?: string;
  /** Button text color in the `#RRGGBB` format */
  button_text_color?: string;
  /** Secondary background color (Bot API 6.1+) in the `#RRGGBB` format */
  secondary_bg_color?: string;
  /** Header background color (Bot API 7.0+) in the `#RRGGBB` format */
  header_bg_color?: string;
  /** Bottom bar background color (Bot API 7.10+) in the `#RRGGBB` format */
  bottom_bar_bg_color?: string;
  /** Accent text color (Bot API 7.0+) in the `#RRGGBB` format */
  accent_text_color?: string;
  /** Section background color (Bot API 7.0+) in the `#RRGGBB` format */
  section_bg_color?: string;
  /** Section header text color (Bot API 7.0+) in the `#RRGGBB` format */
  section_header_text_color?: string;
  /** Section separator color (Bot API 7.6+) in the `#RRGGBB` format */
  section_separator_color?: string;
  /** Subtitle text color (Bot API 7.0+) in the `#RRGGBB` format */
  subtitle_text_color?: string;
  /** Destructive text color (Bot API 7.0+) in the `#RRGGBB` format */
  destructive_text_color?: string;
}

export interface StoryWidgetLink {
  url: string;
  name?: string;
}

export interface StoryShareParams {
  /** Optional caption text (0-200/2048 characters) */
  text?: string;
  widget_link?: StoryWidgetLink;
}

export interface ScanQrPopupParams {
  /** Optional text to be displayed (0-64 characters) */
  text?: string;
}

export interface PopupButton {
  /** Optional button identifier (0-64 characters) */
  id?: string;
  /**
   * Button type. Can be one of:
   * - "default"
   * - "ok"
   * - "close"
   * - "cancel"
   * - "destructive"
   */
  type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
  /** Button text (0-64 characters); required if type is "default" or "destructive" */
  text?: string;
}

export interface PopupParams {
  /** Optional popup title (0-64 characters) */
  title?: string;
  /** Popup message (1-256 characters) */
  message: string;
  /** Optional list of buttons (1-3 items); if omitted defaults to [{ type: 'close' }] */
  buttons?: PopupButton[];
}

export interface EmojiStatusParams {
  /** Optional duration (in seconds) for which the status is set */
  duration?: number;
}

export interface DownloadFileParams {
  /** HTTPS URL of the file to be downloaded */
  url: string;
  /** Suggested filename for the download */
  file_name: string;
}

export interface SafeAreaInset {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface ContentSafeAreaInset {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

/** Back button for the Mini App header */
export interface BackButton {
  isVisible: boolean;

  onClick(callback: () => void): BackButton;

  offClick(callback: () => void): BackButton;

  show(): BackButton;

  hide(): BackButton;
}

/** Parameters for updating a BottomButton */
export interface BottomButtonParams {
  text?: string;
  color?: string;
  text_color?: string;
  has_shine_effect?: boolean;
  position?: 'left' | 'right' | 'top' | 'bottom';
  is_active?: boolean;
  is_visible?: boolean;
}

/**
 * BottomButton controls the button displayed at the bottom of the Mini App.
 * There are two types: "main" and "secondary".
 */
export interface BottomButton {
  readonly type: 'main' | 'secondary';
  text: string;
  color: string;
  textColor: string;
  isVisible: boolean;
  isActive: boolean;
  hasShineEffect: boolean;
  /** For secondary button, position can be defined */
  position?: 'left' | 'right' | 'top' | 'bottom';
  readonly isProgressVisible: boolean;

  setText(text: string): BottomButton;

  onClick(callback: () => void): BottomButton;

  offClick(callback: () => void): BottomButton;

  show(): BottomButton;

  hide(): BottomButton;

  enable(): BottomButton;

  disable(): BottomButton;

  showProgress(leaveActive?: boolean): BottomButton;

  hideProgress(): BottomButton;

  setParams(params: BottomButtonParams): BottomButton;
}

/** Settings button in the Mini App context menu */
export interface SettingsButton {
  isVisible: boolean;

  onClick(callback: () => void): SettingsButton;

  offClick(callback: () => void): SettingsButton;

  show(): SettingsButton;

  hide(): SettingsButton;
}

export type HapticStyle = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft';
export type HapticNotificationType = 'error' | 'success' | 'warning';

export interface HapticFeedback {
  impactOccurred(style: HapticStyle): HapticFeedback;

  notificationOccurred(type: HapticNotificationType): HapticFeedback;

  selectionChanged(): HapticFeedback;
}

export interface CloudStorage {
  setItem(
    key: string,
    value: string,
    callback?: (error: any, success?: boolean) => void,
  ): CloudStorage;

  getItem(key: string, callback: (error: any, value?: string) => void): void;

  getItems(
    keys: string[],
    callback: (error: any, values?: { [key: string]: string }) => void,
  ): void;

  removeItem(key: string, callback?: (error: any, success?: boolean) => void): CloudStorage;

  removeItems(keys: string[], callback?: (error: any, success?: boolean) => void): CloudStorage;

  getKeys(callback: (error: any, keys?: string[]) => void): void;
}

export type BiometricType = 'finger' | 'face' | 'unknown';

export interface BiometricManager {
  isInited: boolean;
  isBiometricAvailable: boolean;
  biometricType: BiometricType;
  isAccessRequested: boolean;
  isAccessGranted: boolean;
  isBiometricTokenSaved: boolean;
  deviceId: string;

  init(callback?: () => void): BiometricManager;

  requestAccess(
    params?: BiometricRequestAccessParams,
    callback?: (granted: boolean) => void,
  ): BiometricManager;

  authenticate(
    params?: BiometricAuthenticateParams,
    callback?: (isAuthenticated: boolean, biometricToken?: string) => void,
  ): BiometricManager;

  updateBiometricToken(token: string, callback?: (isUpdated: boolean) => void): BiometricManager;

  openSettings(): BiometricManager;
}

export interface BiometricRequestAccessParams {
  /** Optional reason text (0-128 characters) */
  reason?: string;
}

export interface BiometricAuthenticateParams {
  /** Optional reason text (0-128 characters) */
  reason?: string;
}

export interface AccelerometerStartParams {
  /**
   * Refresh rate in milliseconds (20–1000).
   * Default is 1000.
   */
  refresh_rate?: number;
}

export interface Accelerometer {
  isStarted: boolean;
  x: number;
  y: number;
  z: number;

  start(params?: AccelerometerStartParams, callback?: (started: boolean) => void): Accelerometer;

  stop(callback?: (stopped: boolean) => void): Accelerometer;
}

export interface DeviceOrientationStartParams {
  refresh_rate?: number;
  /** Set true to receive absolute orientation data (if supported) */
  need_absolute?: boolean;
}

export interface DeviceOrientation {
  isStarted: boolean;
  absolute: boolean;
  alpha: number;
  beta: number;
  gamma: number;

  start(
    params?: DeviceOrientationStartParams,
    callback?: (started: boolean) => void,
  ): DeviceOrientation;

  stop(callback?: (stopped: boolean) => void): DeviceOrientation;
}

export interface GyroscopeStartParams {
  refresh_rate?: number;
}

export interface Gyroscope {
  isStarted: boolean;
  x: number;
  y: number;
  z: number;

  start(params?: GyroscopeStartParams, callback?: (started: boolean) => void): Gyroscope;

  stop(callback?: (stopped: boolean) => void): Gyroscope;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  altitude: number | null;
  course: number | null;
  speed: number | null;
  horizontal_accuracy: number | null;
  vertical_accuracy: number | null;
  course_accuracy: number | null;
  speed_accuracy: number | null;
}

export interface LocationManager {
  isInited: boolean;
  isLocationAvailable: boolean;
  isAccessRequested: boolean;
  isAccessGranted: boolean;

  init(callback?: () => void): LocationManager;

  getLocation(callback: (locationData: LocationData | null) => void): LocationManager;

  openSettings(): LocationManager;
}

export interface WebAppUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  added_to_attachment_menu?: boolean;
  allows_write_to_pm?: boolean;
  photo_url?: string;
}

export interface WebAppChat {
  id: number;
  type: 'group' | 'supergroup' | 'channel';
  title: string;
  username?: string;
  photo_url?: string;
}

export interface WebAppInitData {
  query_id?: string;
  user?: WebAppUser;
  receiver?: WebAppUser;
  chat?: WebAppChat;
  chat_type?: 'sender' | 'private' | 'group' | 'supergroup' | 'channel';
  chat_instance?: string;
  start_param?: string;
  can_send_after?: number;
  auth_date: number;
  hash: string;
  signature?: string;
}

export interface WebApp {
  initData: string;
  initDataUnsafe: WebAppInitData;
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: ThemeParams;
  isActive?: boolean;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  bottomBarColor: string;
  isClosingConfirmationEnabled: boolean;
  isVerticalSwipesEnabled: boolean;
  isFullscreen?: boolean;
  isOrientationLocked?: boolean;
  safeAreaInset?: SafeAreaInset;
  contentSafeAreaInset?: ContentSafeAreaInset;
  BackButton: BackButton;
  MainButton: BottomButton;
  SecondaryButton: BottomButton;
  SettingsButton: SettingsButton;
  HapticFeedback: HapticFeedback;
  CloudStorage: CloudStorage;
  BiometricManager: BiometricManager;
  Accelerometer: Accelerometer;
  DeviceOrientation: DeviceOrientation;
  Gyroscope: Gyroscope;
  LocationManager: LocationManager;

  /** Checks if the current Bot API version is at least the given version. */
  isVersionAtLeast: (version: string) => boolean;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  setBottomBarColor: (color: string) => void;
  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;
  enableVerticalSwipes: () => void;
  disableVerticalSwipes: () => void;
  requestFullscreen?: () => void;
  exitFullscreen?: () => void;
  lockOrientation?: () => void;
  unlockOrientation?: () => void;
  addToHomeScreen?: () => void;
  checkHomeScreenStatus?: (
    callback?: (status: 'unsupported' | 'unknown' | 'added' | 'missed') => void,
  ) => void;
  onEvent: (eventType: string, eventHandler: (params?: any) => void) => void;
  offEvent: (eventType: string, eventHandler: (params?: any) => void) => void;
  sendData: (data: string) => void;
  switchInlineQuery: (query: string, choose_chat_types?: string) => void;
  openLink: (url: string, options?: { try_instant_view?: boolean }) => void;
  openTelegramLink: (url: string) => void;
  openInvoice: (url: string, callback?: (status: any) => void) => void;
  shareToStory?: (media_url: string, params?: StoryShareParams) => void;
  shareMessage?: (msg_id: number, callback?: (success: boolean) => void) => void;
  setEmojiStatus?: (
    custom_emoji_id: string,
    params?: EmojiStatusParams,
    callback?: (success: boolean) => void,
  ) => void;
  requestEmojiStatusAccess?: (callback?: (granted: boolean) => void) => void;
  downloadFile?: (params: DownloadFileParams, callback?: (accepted: boolean) => void) => void;
  showPopup: (params: PopupParams, callback?: (button_id: string | null) => void) => void;
  showAlert: (message: string, callback?: () => void) => void;
  showConfirm: (message: string, callback?: (result: boolean) => void) => void;
  showScanQrPopup?: (
    params: ScanQrPopupParams,
    callback?: (qrText: string) => boolean | void,
  ) => void;
  closeScanQrPopup?: () => void;
  readTextFromClipboard?: (callback?: (text: string | null) => void) => void;
  requestWriteAccess?: (callback?: (granted: boolean) => void) => void;
  requestContact?: (callback?: (shared: boolean) => void) => void;
  ready: () => void;
  expand: () => void;
  close: () => void;
}
