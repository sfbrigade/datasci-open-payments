import { SEARCH } from './actions';

export function search (physician_name) {
    return {
        type: SEARCH,
        physician_name
    }
}