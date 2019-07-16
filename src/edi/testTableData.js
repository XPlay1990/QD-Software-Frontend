export const data = [
    {
        id: 232,
        name: 'Public Event 27Dec',
        summary: 'testing1',
        description: null,
        venue: 'tets',
        attendeeLimit: null,
        sponsors: null,
        coOrganizersPartners: null,
        edmPdf: 'ef3d9b74-f5a1-468f-beaf-90a35f976443',
        bannerImageHeight: 0,
        bannerImageWidth: 0,
        bannerImage: 'b7dc249b-b422-4825-8d7c-6017b849a542',
        registrationPageImageHeight: 0,
        registrationPageImageWidth: 0,
        registrationPageImage: 'aebf2cab-3951-4856-a164-3c43cc677658',
        createdOn: '2018-10-21 16:21:47',
        updatedOn: '2018-10-21 20:36:02',
        seriesId: 7,
        updatedById: 738,
        eventTypeId: 1,
        confirmRegRequired: 0,
        eventType: 'Public - Open to everyone',
        guestOfHonour: null,
        eventDates: '2019-01-02',
        actualAttended: 0,
        actualRegistered: 0,
    },
    {
        id: 231,
        name: 'testing 20 Oct 2',
        summary: 'testing1',
        description: null,
        venue: 'tets',
        attendeeLimit: null,
        sponsors: null,
        coOrganizersPartners: null,
        edmPdf: 'null',
        bannerImageHeight: 0,
        bannerImageWidth: 0,
        bannerImage: 'null',
        registrationPageImageHeight: 0,
        registrationPageImageWidth: 0,
        registrationPageImage: 'null',
        createdOn: '2018-10-20 17:18:51',
        updatedOn: '2018-10-20 17:25:09',
        seriesId: 7,
        updatedById: 738,
        eventTypeId: 1,
        confirmRegRequired: 0,
        eventType: 'Public - Open to everyone',
        guestOfHonour: null,
        eventDates: '2018-10-20',
        actualAttended: 0,
        actualRegistered: 0,
    },
    {
        id: 230,
        name: 'Test 20 oct',
        summary: 'test UAT 20 oct',
        description: null,
        venue: 'tanjong Rhu #08-09',
        attendeeLimit: null,
        sponsors: 'testing sponsers',
        coOrganizersPartners: 'coca cola',
        edmPdf: '2fd314c9-126c-476d-a718-b8d63ab4082c',
        bannerImageHeight: 0,
        bannerImageWidth: 0,
        bannerImage: '5157d716-6e46-42ec-b3d1-b569f8766a2a',
        registrationPageImageHeight: 0,
        registrationPageImageWidth: 0,
        registrationPageImage: 'null',
        createdOn: '2018-10-20 17:09:10',
        updatedOn: '2018-10-20 17:15:11',
        seriesId: 2,
        updatedById: 738,
        eventTypeId: 2,
        confirmRegRequired: 1,
        eventType: 'Members - Open to SGBC Members Only',
        guestOfHonour: null,
        eventDates: '2018-10-02',
        actualAttended: 0,
        actualRegistered: 0,
    },
    {
        id: 229,
        name: 'CyderUAT100',
        summary: 'CyderUAT100',
        description: 'CyderUAT100',
        venue: 'CyderUAT100',
        attendeeLimit: null,
        sponsors: '-',
        coOrganizersPartners: '-',
        edmPdf: 'null',
        bannerImageHeight: 0,
        bannerImageWidth: 0,
        bannerImage: 'null',
        registrationPageImageHeight: 0,
        registrationPageImageWidth: 0,
        registrationPageImage: 'null',
        createdOn: '2018-10-18 04:10:56',
        updatedOn: '2018-10-18 16:23:05',
        seriesId: null,
        updatedById: 738,
        eventTypeId: 2,
        confirmRegRequired: 1,
        eventType: 'Members - Open to SGBC Members Only',
        guestOfHonour: null,
        eventDates: '2018-10-25',
        actualAttended: 0,
        actualRegistered: 7,
    },
    {
        id: 228,
        name: 'test event for track',
        summary: 'eadd',
        description: 'daed',
        venue: 'ed',
        attendeeLimit: null,
        sponsors: 'daed',
        coOrganizersPartners: 'dae',
        edmPdf: 'f2aabfa5-e2a9-40f9-a0f4-68f7cdef2f7e',
        bannerImageHeight: 0,
        bannerImageWidth: 0,
        bannerImage: 'c79fdfb4-4573-400b-a3c2-80ed256b6c2f',
        registrationPageImageHeight: 0,
        registrationPageImageWidth: 0,
        registrationPageImage: '0e57a4f3-42e4-4b43-969f-62c2bc8b49ea',
        createdOn: '2018-10-18 02:35:49',
        updatedOn: '2018-10-18 19:18:23',
        seriesId: 3,
        updatedById: 738,
        eventTypeId: 3,
        confirmRegRequired: 1,
        eventType: 'Private - By invitation only',
        guestOfHonour: null,
        eventDates: '0000-00-00',
        actualAttended: 0,
        actualRegistered: 5,
    },
    {
        id: 227,
        name: 'CyderUAt60',
        summary: 'CyderUAt60',
        description: 'CyderUAt60',
        venue: 'CyderUAt60',
        attendeeLimit: null,
        sponsors: '-',
        coOrganizersPartners: null,
        edmPdf: 'null',
        bannerImageHeight: 0,
        bannerImageWidth: 0,
        bannerImage: 'null',
        registrationPageImageHeight: 0,
        registrationPageImageWidth: 0,
        registrationPageImage: 'null',
        createdOn: '2018-10-18 01:42:09',
        updatedOn: '2018-10-18 01:42:09',
        seriesId: 9,
        updatedById: 738,
        eventTypeId: 2,
        confirmRegRequired: 0,
        eventType: 'Members - Open to SGBC Members Only',
        guestOfHonour: null,
        eventDates: '2018-10-18',
        actualAttended: 0,
        actualRegistered: 2,
    },
];


export const columns = [
    {
        Header: 'Customer',
        accessor: 'eventDates',
        headerStyle: { whiteSpace: 'unset' },
        style: { whiteSpace: 'unset' },
    },
    {
        Header: 'Customer',
        accessor: 'customer.name',
        headerStyle: { whiteSpace: 'unset' },
        style: { whiteSpace: 'unset' },
    },
    {
        Header: 'Supplier',
        accessor: 'supplier.name',
        headerStyle: { whiteSpace: 'unset' },
        style: { whiteSpace: 'unset' },
    },
    {
        Header: 'State',
        accessor: 'status',
        headerStyle: { whiteSpace: 'unset' },
        style: { whiteSpace: 'unset' },
        maxWidth: 150,
    },
    {
        Header: 'Last Modified',
        accessor: 'updateTime',
        headerStyle: { whiteSpace: 'unset' },
        style: { whiteSpace: 'unset' },
        // maxWidth: 150,
    },
];