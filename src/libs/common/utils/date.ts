import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (date: Date | string, fallback = '-') =>
  date ? format(new Date(date), 'dd MMM yyyy') : fallback;

export const formatDateTime = (date: Date | string, fallback = '-') =>
  date ? format(new Date(date), 'dd MMM yyyy HH:mm') : fallback;

export const formatRelative = (date: Date | string, fallback = '-') =>
  date ? formatDistanceToNow(new Date(date), { addSuffix: true }) : fallback;
