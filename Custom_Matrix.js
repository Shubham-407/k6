import http from 'k6/http';
import { sleep } from 'k6';
import { Counter, Trend } from 'k6/metrics';

export const options = {
    vus: 5,
    duration: '5s',
    thresholds: {
        http_req_duration: ['p(95) < 300'],
        my_counter: ['count >= 10']
    }
}
let myCounter = new Counter('my_counter');
let newsPageResponseTrend = new Trend('response_time_news_page');

export default function () {
    let res = http.get('https://test.k6.io');
    myCounter.add(1);
    sleep(2);

    // https://test.k6.io/news.php
    res = http.get('https://test.k6.io/news.php');
    newsPageResponseTrend.add(res.timings.duration);
    sleep(2);
}