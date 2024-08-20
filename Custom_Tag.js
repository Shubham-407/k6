import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { check, sleep } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<300'],
        'http_req_duration{page:order}': ['p(95)<250'],

        http_errors: ['count==0'],
        'http_errors{page:order}': ['count==0'],

        checks: ['rate>=0.99'],
        'checks{page:order}': ['rate>=0.99'],
    }
}

let httpErrors = new Counter('http_errors');

export default function () {
    let res = http.get('https://run.mocky.io/v3/bf51fb35-4026-4eb9-b4a5-d3614dd5e268');

    if (res.error) {
        httpErrors.add(1);
    }

    check(res, {
        'status is 200': (r) => r.status === 200
    });

    // Submit order
    res = http.get(
        'https://run.mocky.io/v3/cb62c15d-7113-48a2-8e2d-87ec77bbcab7?mocky-delay=2000ms',
        {
            tags: {
                page: 'order'
            }
        }
    );

    if (res.error) {
        httpErrors.add(1, { page: 'order' });
    }

    check(res, { 'status is 201': (r) => r.status === 201 }, { page: 'order' });

    sleep(1);
}