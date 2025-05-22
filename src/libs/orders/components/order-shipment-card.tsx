'use client';

import clsx from 'clsx';
import { format } from 'date-fns';
import { FaExternalLinkAlt, FaTruck } from 'react-icons/fa';

import { OrderShipment } from '@/libs/orders/types';

const SHIPMENT_STATUS_STYLES: Record<NonNullable<OrderShipment['status']>, string> = {
  created: 'bg-gray-200 text-gray-800',
  in_transit: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
};

export function OrderShipmentCard({ shipment, collapsed = false }: { shipment: OrderShipment, collapsed?: boolean }) {
  const {
    trackingNumber,
    courierService,
    status = 'created',
    deliveryEstimate,
    shippedAt,
    carrierTrackingUrl,
  } = shipment || {};

  const statusStyle = SHIPMENT_STATUS_STYLES[status] || 'bg-gray-100 text-gray-600 border border-dashed border-gray-400';
  const statusLabel = typeof status === 'string' ? status.replace('_', ' ') : 'unknown';

  if (collapsed) {
    return (
      <section className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 p-3 border rounded-md bg-white shadow-sm" aria-label="Shipment Summary">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <FaTruck aria-hidden="true" className="text-gray-500" />
          <span className={clsx('rounded-full px-2 py-1 text-xs capitalize', statusStyle)} aria-label={`Status: ${statusLabel}`}>
            {statusLabel}
          </span>
          <span className="truncate max-w-[100px] text-xs text-gray-700" title={trackingNumber || ''} aria-label={trackingNumber || ''}>
            {trackingNumber ? escapeHtml(trackingNumber) : <span className="text-gray-400">No Tracking</span>}
          </span>
          <span className="text-xs text-gray-500">{courierService ? escapeHtml(courierService) : <span className="text-gray-400">No Courier</span>}</span>
        </div>
        {carrierTrackingUrl && (
          <a
            href={escapeHtml(carrierTrackingUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs text-blue-600 hover:underline"
            aria-label="Track shipment external link"
          >
            Track
            <FaExternalLinkAlt className="ml-1 h-3 w-3" aria-hidden="true" />
          </a>
        )}
      </section>
    );
  }
  return (
    <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6" aria-label="Shipment Information">
      <div className="flex-1 space-y-3">
        <header className="flex items-center justify-between">
          <div className="mb-2 flex items-center gap-x-2 text-lg font-semibold">
            <FaTruck aria-hidden="true" />
            <h2 className="text-lg font-semibold" id="shipment-info-heading">
              <span className="sr-only">Section: </span>Shipment Info
            </h2>
          </div>
          <span className={clsx('rounded-full px-2 py-1 text-xs capitalize', statusStyle)} aria-label={`Status: ${statusLabel}`}>
            {statusLabel}
          </span>
        </header>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs">
          <ShipmentDetail label="Tracking:">
            {trackingNumber ? (
              <span title={trackingNumber} className="inline-flex items-center gap-1">
                <span className="truncate max-w-[120px] align-middle" aria-label={trackingNumber}>{escapeHtml(trackingNumber)}</span>
                <button
                  type="button"
                  aria-label="Copy tracking number"
                  className="ml-1 text-gray-400 hover:text-blue-600 focus:outline-none"
                  onClick={() => navigator.clipboard.writeText(trackingNumber)}
                  tabIndex={0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><title>Copy</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8a2 2 0 002-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v6a2 2 0 002 2zm0 0v2a2 2 0 002 2h6a2 2 0 002-2v-2" /></svg>
                </button>
              </span>
            ) : (
              <span className="text-gray-400">Not available</span>
            )}
          </ShipmentDetail>
          <ShipmentDetail label="Courier:">
            {courierService ? (
              <span title={courierService}>{escapeHtml(courierService)}</span>
            ) : (
              <span className="text-gray-400">Not available</span>
            )}
          </ShipmentDetail>
          <ShipmentDetail label="Shipped:">
            {isValidDate(shippedAt) ? (
              <time dateTime={shippedAt}>{format(new Date(shippedAt!), 'PPP')}</time>
            ) : (
              <span className="text-gray-400">Not available</span>
            )}
          </ShipmentDetail>
          <ShipmentDetail label="Est. Delivery:">
            {isValidDate(deliveryEstimate) ? (
              <time dateTime={deliveryEstimate}>{format(new Date(deliveryEstimate!), 'PPP')}</time>
            ) : (
              <span className="text-gray-400">Not available</span>
            )}
          </ShipmentDetail>
        </dl>
        {carrierTrackingUrl && (
          <div>
            <a
              href={escapeHtml(carrierTrackingUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:underline"
              aria-label="Track shipment external link"
            >
              Track Shipment
              <FaExternalLinkAlt className="ml-1 h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function isValidDate(date: unknown): date is string {
  if (!date || typeof date !== 'string') return false;
  const parsed = new Date(date);
  return !isNaN(parsed.getTime());
}

function ShipmentDetail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-1">
      <dt className="font-semibold min-w-[70px]">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
export function escapeHtml(str: string) {
  return str.replace(/[&<>'"`]/g, (tag) => ({'&':'&amp;','<':'&lt;','>':'&gt;','\'':'&#39;','"':'&quot;','`':'&#96;'}[tag]||tag));
}