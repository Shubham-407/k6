import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 10 },
    ]
}

export default function () {
    const res = http.get('https://test.k6.io');
    console.log(res.body);
    sleep(1);
}

