import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 2,
    duration: '10s',
    Thresholds: {
        http_req_duration: ['p(95)<300'],
        http_req_failed: ['rate<0.01']
    }
    // stages: [
    //     { duration: '5s', target: 2 },
    //     { duration: '30s', target: 2 },
    //     { duration: '5s', target: 0 }
    // ]
    
}

export default function () {
    // Define an array of requests
    const requests = [
        {
            method: 'GET',
            url: 'https://test.k6.io',
        },
        {
            method: 'POST',
            url: 'https://test.k6.io/flip_coin.php',
            body: { name: 'John Doe', message: 'Hello' },
            params: { headers: { 'Content-Type': 'application/json' } },
        },
        {
            method: 'GET',
            url: 'https://test.k6.io/news.php',
        }
    ];

    // Send the batch request
    const responses = http.batch(requests);

    // Handle the responses
    responses.forEach((response, index) => {
        console.log(`Response ${index + 1} status: ${response.status}`);
    });

    sleep(1);
}
