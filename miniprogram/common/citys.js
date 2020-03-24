export const Citys = [
  {
    province: '江西省', id: 100000, citys: [
      {
        city: '南昌市', id: 120000, towns: [
          {town: '东湖区', id: 120001},
          {town: '西湖区', id: 120002}
        ]
      },
      {
        city: '萍乡市', id: 110000, towns: [
          {town: '上栗县', id: 110001},
          {town: '莲花县', id: 110002}
        ]
      }
    ]
  },
  {
    province: '上海市', id: 200000, citys: [
      {
        city: '上海市', id: 210000, towns: [
          {town: '杨浦区', id: 210001},
          {town: '虹口区', id: 210002}
        ]
      }
    ]
  }
]


export let Apartments = {
  "120001": [
    {apartment: "东湖区-小区1", id: 1200010001},
    {apartment: "东湖区-小区2", id: 1200010002},
    {apartment: "东湖区-小区3", id: 1200010003},
    {apartment: "东湖区-小区4", id: 1200010004},
    {apartment: "东湖区-小区5", id: 1200010005},
  ],
  "120002": [
    {apartment: "西湖区-小区1", id: 1200020001},
    {apartment: "西湖区-小区2", id: 1200020002},
    {apartment: "西湖区-小区3", id: 1200020003},
    {apartment: "西湖区-小区4", id: 1200020004},
    {apartment: "西湖区-小区5", id: 1200020005},
  ],
}


export const Houses = [
  {
    building: '1', id: 100000, units: [
      {
        unit: '1', id: 120000, rooms: [
          {room: '1001', id: 120001},
          {room: '1002', id: 120002},
          {room: '2002', id: 120003},
          {room: '2002', id: 120004},
          {room: '3002', id: 120005},
          {room: '3002', id: 120006}
        ]
      },
      {
        unit: '2', id: 110000, towns: [
          {room: '1001', id: 110001},
          {room: '1002', id: 110002},
          {room: '2002', id: 110003},
          {room: '2002', id: 110004},
          {room: '3002', id: 110005},
          {room: '3002', id: 110006}
        ]
      }
    ]
  },
  {
    building: '2', id: 200000, units: [
      {
        unit: '1', id: 220000, rooms: [
          {room: '1001', id: 220001},
          {room: '1002', id: 220002},
          {room: '2002', id: 220003},
          {room: '2002', id: 220004},
          {room: '3002', id: 220005},
          {room: '3002', id: 220006}
        ]
      },
      {
        unit: '2', id: 210000, towns: [
          {room: '1001', id: 210001},
          {room: '1002', id: 210002},
          {room: '2002', id: 210003},
          {room: '2002', id: 210004},
          {room: '3002', id: 210005},
          {room: '3002', id: 210006}
        ]
      }
    ]
  }
]
