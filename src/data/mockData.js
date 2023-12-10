export const mockShoppingLists = [
    {
        id: '1',
        name: 'Grocery List',
        isArchived: false,
        items: [
            { id: '1', name: 'Milk', isCompleted: false },
            { id: '2', name: 'Bread', isCompleted: false },
            { id: '3', name: 'Eggs', isCompleted: false },
            { id: '4', name: 'Cheese', isCompleted: true },
            { id: '5', name: 'Butter', isCompleted: false }
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
        isArchived: false,
        items: [
            { id: '6', name: 'Nails', isCompleted: false },
            { id: '7', name: 'Hammer', isCompleted: true },
            { id: '8', name: 'Ladder', isCompleted: false },
            { id: '9', name: 'Drill', isCompleted: false }
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
        isArchived: false,
        items: [
            { id: '10', name: 'Stapler', isCompleted: false },
            { id: '11', name: 'Markers', isCompleted: false },
            { id: '12', name: 'Note Pads', isCompleted: false },
            { id: '13', name: 'Paper Clips', isCompleted: true }
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
        isArchived: false,
        items: [
            { id: '16', name: 'Paint', isCompleted: false },
            { id: '17', name: 'Brushes', isCompleted: false },
            { id: '18', name: 'Drop Cloth', isCompleted: false },
            { id: '19', name: 'Screws', isCompleted: true },
        ],
        members: [
            { id: '4', name: 'Charlie Davis' },
        ],
        owner: { id: '1', name: 'Jane Doe' },
    },
    {
        id: '5',
        name: 'Electronics Shopping',
        isArchived: false,
        items: [
            { id: '20', name: 'Smartphone', isCompleted: false },
            { id: '21', name: 'Laptop', isCompleted: false },
            { id: '22', name: 'Headphones', isCompleted: false },
            { id: '23', name: 'Charging Cables', isCompleted: false },
        ],
        members: [
            { id: '4', name: 'Charlie Davis' },
            { id: '2', name: 'Alice Smith' },
        ],
        owner: { id: '1', name: 'Jane Doe' },
    },
    {
        id: '6',
        name: 'Past Grocery List',
        isArchived: true,
        items: [
            { id: '14', name: 'Apples', isCompleted: true },
            { id: '15', name: 'Oranges', isCompleted: true },
        ],
        members: [
            { id: '2', name: 'Alice Smith' },
            { id: '3', name: 'Bob Johnson' }
        ],
        owner: { id: '1', name: 'Jane Doe' }
    }
];

export const users = [
    { id: '1', name: 'Jane Doe' },
    { id: '2', name: 'Alice Smith' },
    { id: '3', name: 'Bob Johnson' },
    { id: '4', name: 'Charlie Davis' },
    { id: '5', name: 'Eve Adams' },
    { id: '6', name: 'Franklin Green' },
    { id: '7', name: 'Grace Hopper' }
];
