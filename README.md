### [tandem.km.ua](https://tandem.km.ua)

## Clothes store Tandem

To run project clone repository and run:

```bash
# Install all dependencies
bash install.sh

# Config project for production start
npm run build

# Go to server folder and run start command
npm run start
```

Open http://localhost:5000 with your browser to see the result.

API routes can be accessed on http://localhost:5000/api

Admin panel can be accessed on http://localhost:5000/admin

## About
Clothes store made for Ukrainian entrepreneur.
On client, implemented personal cabinet, ability 
to add item to basket or wish list, basket and wish
list will be saved or in your account or in browser 
local storage if you are not authorized. You can 
order your selected items, choose size and amount 
of each one and see order status in your cabinet.
All client orders are shown in admin panel, there 
they will process by admin. Also on client there 
are different categories of clothes, search by
category or name, sort by price, date or rating 
and at the bottom of each page user can see 
his recently viewed items.
All layout are adaptive and responsible for 
any device. Front end (client and admin) implemented 
on: [React](https://reactjs.org/) with 
[Redux](https://redux.js.org/) 
and [Sass](https://sass-lang.com/). Backend on 
[Express](https://expressjs.com/) 
with [Mongoose](https://mongoosejs.com/).
[Nginx](https://www.nginx.com/) used as reverse proxy server, 
automated backups with rsync and mongodump.