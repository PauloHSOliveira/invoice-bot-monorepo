import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin
admin.initializeApp();

// Export all functions
export { processWhatsAppMessage } from './src/webhooks/whatsapp';
export { generateInvoicePDF } from './src/invoices/generate-pdf';
export { sendNotification } from './src/notifications/send-notification';
export { recurrenceScheduler } from './src/scheduler/recurrence-scheduler';

// Health check endpoint
export const healthCheck = functions.https.onRequest((req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'InvoiceBot MVP Functions'
  });
});
