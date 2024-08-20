import http from 'k6/http';
import { check, group, sleep} from 'k6';

export const options ={
    thresholds: {
        http_req_duration: ['p(95)<300'],
        'http_req_duration{group:::main page}': ['p(95)<500'],
        'http_req_duration{group:::main page::assest}': ['p(95)<1000']
    }
}

export default function (){
     group('main page', function (){
        let res = http.get('https://test.k6.io');
        check(res, { 'status is 200': (r) => r.status === 200});

        group('assest', function (){
            http.get('https://test.k6.io/static/css/site.css');
            http.get('https://test.k6.io/static/js/prisms.js');
        });
    });

    group('News page', function (){
        http.get('https://test.k6.io/news.php');
    });

    sleep(1);
}