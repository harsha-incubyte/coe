import { setupWorker } from 'msw/browser';
import { authHandlers, taskHandlers } from './handlers';

export const worker = setupWorker(...authHandlers, ...taskHandlers);
