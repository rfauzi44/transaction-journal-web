const employeesData = [
  {
    id: 1,
    firstName: "Susan",
    lastName: "Jordon",
    email: "susan@example.com",
    salary: "95000",
    date: "2019-04-11",
  },
  {
    id: 2,
    firstName: "Adrienne",
    lastName: "Doak",
    email: "adrienne@example.com",
    salary: "80000",
    date: "2019-04-17",
  },
  {
    id: 3,
    firstName: "Rolf",
    lastName: "Hegdal",
    email: "rolf@example.com",
    salary: "79000",
    date: "2019-05-01",
  },
  {
    id: 4,
    firstName: "Kent",
    lastName: "Rosner",
    email: "kent@example.com",
    salary: "56000",
    date: "2019-05-03",
  },
  {
    id: 5,
    firstName: "Arsenio",
    lastName: "Grant",
    email: "arsenio@example.com",
    salary: "65000",
    date: "2019-06-13",
  },
  {
    id: 6,
    firstName: "Laurena",
    lastName: "Lurie",
    email: "laurena@example.com",
    salary: "120000",
    date: "2019-07-30",
  },
  {
    id: 7,
    firstName: "George",
    lastName: "Tallman",
    email: "george@example.com",
    salary: "90000",
    date: "2019-08-15",
  },
  {
    id: 8,
    firstName: "Jesica",
    lastName: "Watlington",
    email: "jesica@example.com",
    salary: "60000",
    date: "2019-10-10",
  },
  {
    id: 9,
    firstName: "Matthew",
    lastName: "Warren",
    email: "matthew@example.com",
    salary: "71000",
    date: "2019-10-15",
  },
  {
    id: 10,
    firstName: "Lyndsey",
    lastName: "Follette",
    email: "lyndsey@example.com",
    salary: "110000",
    date: "2020-01-15",
  },
];

const transactionData = [
  {
    id: 2,
    date: "2022-08-15",
    items: [
      {
        id: 9,
        name: "T-shirt",
        qty: 3,
        price: 1500,
      },
      {
        id: 10,
        name: "Jeans",
        qty: 1,
        price: 3000,
      },
    ],
    is_paid: true,
    total: "7500",
  },
  {
    id: 3,
    date: "2023-01-27",
    items: [
      {
        id: 5,
        name: "Headphones",
        qty: 1,
        price: 2500,
      },
    ],
    is_paid: true,
    total: "2500",
  },
  {
    id: 4,
    date: "2023-03-18",
    items: [
      {
        id: 11,
        name: "Keyboard",
        qty: 1,
        price: 4000,
      },
      {
        id: 12,
        name: "Mouse",
        qty: 1,
        price: 2000,
      },
      {
        id: 9,
        name: "T-shirt",
        qty: 2,
        price: 1500,
      },
    ],
    is_paid: true,
    total: "9000",
  },
  {
    id: 5,
    date: "2023-05-01",
    items: [
      {
        id: 7,
        name: "Car",
        qty: 1,
        price: 5000,
      },
      {
        id: 8,
        name: "Bike",
        qty: 1,
        price: 3000,
      },
    ],
    is_paid: false,
    total: "8000",
  },
];


export { employeesData, transactionData };
