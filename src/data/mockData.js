export const mockShoppingLists = [
    {
        id: '1',
        name: 'Grocery List',
        items: [
            { id: '1', name: 'Milk', resolved: false },
            { id: '2', name: 'Bread', resolved: false },
            { id: '3', name: 'Eggs', resolved: false },
            { id: '4', name: 'Cheese', resolved: true },
            { id: '5', name: 'Butter', resolved: false }
        ],
        members: [
            { id: '2', name: 'Alice Smith' },
            { id: '3', name: 'Bob Johnson' }
        ],
        owner: { id: '1', name: 'Jane Doe' }
    },
    {
        id: '2',
        name: 'Hardware Store Run',
        items: [
            { id: '6', name: 'Nails', resolved: false },
            { id: '7', name: 'Hammer', resolved: true },
            { id: '8', name: 'Ladder', resolved: false },
            { id: '9', name: 'Drill', resolved: false }
        ],
        members: [
            { id: '4', name: 'Charlie Davis' },
            { id: '5', name: 'Eve Adams' }
        ],
        owner: { id: '2', name: 'John Doe' }
    },
    {
        id: '3',
        name: 'Office Supplies',
        items: [
            { id: '10', name: 'Stapler', resolved: false },
            { id: '11', name: 'Markers', resolved: false },
            { id: '12', name: 'Note Pads', resolved: false },
            { id: '13', name: 'Paper Clips', resolved: true }
        ],
        members: [
            { id: '6', name: 'Franklin Green' },
            { id: '1', name: 'Jane Doe' }
        ],
        owner: { id: '3', name: 'Grace Hopper' }
    },
    {
        id: '4',
        name: 'Home Improvement',
        items: [
            { id: '16', name: 'Paint', resolved: false },
            { id: '17', name: 'Brushes', resolved: false },
            { id: '18', name: 'Drop Cloth', resolved: false },
            { id: '19', name: 'Screws', resolved: true },
        ],
        members: [
            { id: '4', name: 'Charlie Davis' },
        ],
        owner: { id: '1', name: 'Jane Doe' },
    },
    {
        id: '5',
        name: 'Electronics Shopping',
        items: [
            { id: '20', name: 'Smartphone', resolved: false },
            { id: '21', name: 'Laptop', resolved: false },
            { id: '22', name: 'Headphones', resolved: false },
            { id: '23', name: 'Charging Cables', resolved: false },
        ],
        members: [
            { id: '4', name: 'Charlie Davis' },
            { id: '2', name: 'Alice Smith' },
        ],
        owner: { id: '1', name: 'Jane Doe' },
    }
];

export const mockArchivedLists = [
    // Add your archived lists here, following the same structure as your mockShoppingLists
    {
        id: '6',
        name: 'Past Grocery List',
        items: [
            { id: '14', name: 'Apples', resolved: true },
            { id: '15', name: 'Oranges', resolved: true },
        ],
        members: [
            { id: '2', name: 'Alice Smith' },
            { id: '3', name: 'Bob Johnson' }
        ],
        owner: { id: '1', name: 'Jane Doe' }
    },
];

export const users = [
    { id: '1', name: 'Jane Doe' },
    { id: '2', name: 'Alice Smith' },
    { id: '3', name: 'Bob Johnson' },
    { id: '4', name: 'Charlie Davis' },
    { id: '5', name: 'Eve Adams' },
    { id: '6', name: 'Franklin Green' },
    { id: '3', name: 'Grace Hopper' }
];
