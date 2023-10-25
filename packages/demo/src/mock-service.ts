import {Service} from '../../lib/src/shared/utils/service';

export class MockService implements Service {
    getReport(id: string) {
        return Promise.resolve({
            G0xmin: "0.081",
            G0xmax: "0.185",
            G0xaverage: "0.133",
            G0yourscore: "0.082",
            G0percentile: "1",
            G1xmin: "0.091",
            G1xmax: "0.216",
            G1xaverage: "0.150",
            G1yourscore: "0.151",
            G1percentile: "51",
            G2xmin: "0.109",
            G2xmax: "0.175",
            G2xaverage: "0.150",
            G2yourscore: "0.175",
            G2percentile: "99",
        });

    }
}