const data = {
  suppliers: [
    {
      id: 'd2b0335b-4bfa-4dba-92ad-964b945b0386',
      code: 'S1TOR',
      name: 'Supplier 1',
      displayName: 'Supplier 1',
      address: 'Akabe Toki',
      cityId: '3c7c8563-abab-4ed7-8624-a68a1ce50aad',
      countryId: '4a17f4cb-f876-4b81-82a1-acd1ba8f0ffa',
      supplierTypeId: 1,
      supplierType: {
        name: 'ST 1',
      },
    },
  ],
  cities: [
    {
      id: '3c7c8563-abab-4ed7-8624-a68a1ce50aad',
      name: 'Kentucky',
      countryId: '4a17f4cb-f876-4b81-82a1-acd1ba8f0ffa',
      country: {
        name: 'USA',
        id: '4a17f4cb-f876-4b81-82a1-acd1ba8f0ffa',
      },
    },
  ],
  countries: [
    {
      id: '4a17f4cb-f876-4b81-82a1-acd1ba8f0ffa',
      name: 'USA',
    },
    {
      id: '22b55b76-1916-4eea-b9c2-7fda43d93be1',
      name: 'Italy',
    },
    {
      id: 'ae21455e-f4ba-4987-901a-1a186fb62930',
      name: 'Turkey',
    },
  ],
  supplierTypes: [
    {
      name: 'ST 1',
      filledByUser: false,
      minValue: 2,
      maxValue: 10,
      id: 1,
    },
    {
      name: 'ST 2',
      filledByUser: true,
      minValue: 5,
      maxValue: 20,
      id: 2,
    },
    {
      name: 'ST 3',
      filledByUser: true,
      minValue: 60,
      maxValue: 300,
      id: 4,
    },
    {
      name: 'Trder',
      filledByUser: true,
      minValue: 0,
      maxValue: 411,
      id: 10,
    },
    {
      name: 'ST 4',
      filledByUser: true,
      minValue: 10,
      maxValue: 200,
      id: 11,
    },
  ],
};

export default data;
