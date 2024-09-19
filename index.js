// import express module
const express = require('express');

//create an express application
const app = express();

let customer = [
  {
    id:1,
    name:"Leo Dass",
    phone:"650-253-0000"
  },
  {
    id:2,
    name:"Antony Dass",
    phone:"450-253-0000"
  },
  {
    id:3,
    name:"Harold Dass",
    phone:"850-253-0000"
  }
];

let rooms = [
  {
    id:1,
    name:"Pent House",
    seats:700,
    amenities:["SuiteRoom","tabletennis","balcony","campfire"],
    roomId:1001
  },
  {
    id:2,
    name:"Deluxe Room",
    seats:150,
    amenities:["DoubleBed","balcony","campfire"],
    roomId:1002
  },
  {
    id:3,
    name:"Connecting Room",
    seats:700,
    amenities:["Standard"],
    roomId:1003
  }
]

let bookings = [
  {
    roomId:1001,
    customerId:1,
    booked:true,
    date:"2024-09-20",
    startTime:"10.00",
    endtime:"15.00"
  },
  {
    roomId:1002,
    customerId:2,
    booked:true,
    date:"2024-09-20",
    startTime:"09.00",
    endtime:"12.00"
  },
  {
    roomId:1003,
    customerId:3,
    booked:false,
    date:null,
    startTime:null,
    endtime:null
  }
]

//use the express middleware to parse JSON bodies
app.use(express.json()) ;

//list all customers with booked data
app.get('/customer',(req,res) =>{
  let customerBookings = bookings.map(booking => {
    let cust = customer.find(cust => cust.id === booking.customerId) || {};
    let room = rooms.find(room => room.roomId=== bookings.roomId) || {};

    return {
      customerName: cust.name || "N/A",
      roomName: room.name || "N/A",
      date: booking.date || "N/A",
      startTime : booking.startTime || "N/A",
      endTime: booking.endtime || "N/A"
    }
  })
  res.json(customerBookings);
})

//get all rooms
app.get('/rooms',(req,res) =>{
  res.json(rooms);
})

//Creating room
app.post('/rooms',(req,res) =>{
  let room = req.body;
  room.id = rooms[rooms.length -1].id + 1;
  room.seats = 100;
  room.price = 500;
  room.amenities = "";
  rooms.push(room);
  res.json({message:"rooms created successfully"});
})

//deleting a room using url parameter
app.delete('/rooms/:id',(req,res) =>{
  let id = parseInt(req.params.id);
  rooms = rooms.filter( roo => roo.id !== id);
  res.json({message:"rooms deleted successfully"})
})

//list all rooms with booked data
app.get('/bookings',(req,res) =>{
  let bookingDetails = rooms.map(room =>{
    let booking = bookings.find( book => book.roomId === room.roomId) || {};
    let cust = customer.find(cust => cust.id ===booking.customerId) || {};

    return {
      roomName:room.name,
      customerName: customer.name,
      bookedStatus:booking.booked ? "Booked" : "Available",
      date: booking.date || "N/A",
      satrtTime: booking.startTime || "N/A",
      endTime: booking.endTime || "N/A"
    };
  });
  res.json(bookingDetails);
})

app.get("/noofbookings",(req,res) =>{
  let nofBookings = bookings.map( (booking,index) => {
    let cust = customer.find(cust => cust.id === booking.customerId) || {};
    let room = rooms.find(room => room.roomId === booking.roomId) || {};

    return {
      customerName: cust.name,
      roomName: room.name,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endtime,
      bookiId: index +1,
      bookingDate: booking.date,
      bookingStatus: booking.booked ? "Booked" : "Available"
    }
  })

  let customerBookingCount = customer.map(cust => {
    let bookingsForCustomer = nofBookings.filter(b => b.customerName === cust.name);
    return {
      customerName: cust.name,
      totalBookings: bookingsForCustomer.length, 
      bookings: bookingsForCustomer 
    };
  });

  res.json(customerBookingCount);
})


//start the server by listening on the port for incoming requests
app.listen(3001, ()=> {
  console.log("Server is running on http://localhost:3001");
  });