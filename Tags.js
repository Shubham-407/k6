import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{status: 200}': ['p(95)<1000'],
        'http_req_duration{status: 201}': ['p(95)<1000']
    }
}

export default function (){
    http.get('https://run.mocky.io/v3/bf51fb35-4026-4eb9-b4a5-d3614dd5e268');
    http.get('https://run.mocky.io/v3/cb62c15d-7113-48a2-8e2d-87ec77bbcab7?mocky-delay=2000ms');

}