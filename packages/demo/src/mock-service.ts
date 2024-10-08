import { Service } from '../../lib/src/shared/utils/service';

export class MockService implements Service {
  getReport() {
    return Promise.resolve({
      Bpercentile: '78',
      Bxaverage: '0.107',
      Bxmax: '0.176',
      Bxmin: '0.074',
      Byourscore: '0.100',
      G0percentile: '55',
      G0xaverage: '0.162',
      G0xmax: '0.288',
      G0xmin: '0.078',
      G0yourscore: '0.169',
      G1percentile: '33',
      G1xaverage: '0.396',
      G1xmax: '0.432',
      G1xmin: '0.331',
      G1yourscore: '0.370',
      G2percentile: '49',
      G2xaverage: '0.272',
      G2xmax: '0.384',
      G2xmin: '0.188',
      G2yourscore: '0.23',
      P1: '0.795198487617464',
      P10: '0.688451198005985',
      P11: '0.30706820434896',
      P12: '14.5317034121714',
      P12percentile: '50',
      P12xaverage: '0.14',
      P12xmax: '0.214',
      P12xmin: '0.088',
      P12yourscore: '0.14',
      P13: '2.26161322679925',
      P14: '0.378630669940839',
      P15: '10.9546554141134',
      P15percentile: '38',
      P15xaverage: '0.139',
      P15xmax: '0.245',
      P15xmin: '0.051',
      P15yourscore: '0.126',
      P16: '0.395983097414075',
      P17: '0.275257706683302',
      P18: '1.87949107662989',
      P18percentile: '93',
      P18xaverage: '0.023',
      P18xmax: '0.05',
      P18xmin: '0.013',
      P18yourscore: '0.029',
      P19: '0.172164248699096',
      P2: '0.361821744506497',
      P20: '0.416961207937129',
      P21: '17.4905077157188',
      P21percentile: '23',
      P21xaverage: '0.213',
      P21xmax: '0.25',
      P21xmin: '0.176',
      P21yourscore: '0.201',
      P22: '10.7184385730859',
      P22percentile: '49',
      P22xaverage: '0.117',
      P22xmax: '0.154',
      P22xmin: '0.084',
      P22yourscore: '0.116',
      P23: '4.1967011171428',
      P23percentile: '12',
      P23xaverage: '0.062',
      P23xmax: '0.091',
      P23xmin: '0.042',
      P23yourscore: '0.050',
      P24: '0.466264259989257',
      P25: '0.102834875191135',
      P26: '23.9627004313025',
      P26percentile: '11',
      P26xaverage: '0.25',
      P26xmax: '0.35',
      P26xmin: '0.164',
      P26yourscore: '0.240',
      P27: '1.36732493468647 ',
      P27percentile: '7',
      P27xaverage: '0.02',
      P27xmax: '0.03',
      P27xmin: '0.013',
      P27yourscore: '0.016',
      P3: '3.28939088349932',
      P4: '2.31762950292178',
      P5: '0.2439007038734',
      P6: '0.0422525067180154',
      P7: '0.320442202186485',
      P8: '2.35752286224233',
      P8percentile: '77',
      P8xaverage: '0.023',
      P8xmax: '0.035',
      P8xmin: '0.015',
      P8yourscore: '0.027',
      P9: '0.238153518130527',
      Spercentile: '20',
      Sxaverage: '0.165',
      Sxmax: '0.236',
      Sxmin: '0.109',
      Syourscore: '0.120',
      baselinePopulation: 'White - British',
      bsr: 'DRIED BLOOD SPOT',
      chronologicalage: '32',
      createdOn: 1697553488249,
      dob: '19910717',
      dos: '20231005',
      ethnicity: 'Any other White background',
      glycanage: '20',
      kind: '',
      name: 'Test Test',
      patient: '',
      qcp: 'YES',
      resultStatus: 'Release - No Specialist',
      sample: 'GA-RW-1111111',
      test: 'K3xj1BTVFWUTaL9BvfHa',
      trrd: '20231017',
      type: 'regular',
      userId: 'some-id',
      sex: 'F'
    });
  }

  getScatterData() {
    return Promise.resolve({
      data: [
        {
          x: 0.1,
          y: 0.2
        },
        {
          x: 0.2,
          y: 0.3
        },
        {
          x: 0.3,
          y: 0.4
        },
        {
          x: 0.4,
          y: 0.5
        },
        {
          x: 0.5,
          y: 0.6
        },
        {
          x: 0.6,
          y: 0.7
        },
        {
          x: 0.7,
          y: 0.8
        },
        {
          x: 0.8,
          y: 0.9
        },
        {
          x: 0.9,
          y: 1.0
        },
        {
          x: 1.0,
          y: 1.1
        }
      ]
    });
  }
}
