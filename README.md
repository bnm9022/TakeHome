**TASK**

- This is a node app that implements a set of REST APIs allowing CRUD functionality for an employee resource using MongoDB

** Running **
Run "npm install" to install the essential node modules for the app
Download MongoDB Compass Community software, and connect locally
Create a local database EmployeeDatabase with a collection called Employees
Run "npm start" to start the app

Run the following command for the api controller part:

curl -X "POST" -H "Content-Type: application/json" -d [{\"firstName\":\"A\",\"lastName\":\"D\",\"hireDate\":\"2019-11-12\",\"role\":\"VP\"}] http://localhost:3000/api/employees

curl -X "PUT" -H "Content-Type: application/json" -d {\"firstName\":\"A\",\"lastName\":\"B\",\"hireDate\":\"2019-01-01\",\"role\":\"VP\"} http://localhost:3000/api/employees/5dbdbf5bac37cf25b4758465

curl -X "GET" -H "Content-Type: application/json" http://localhost:3000/api/employees

curl -X "DELETE" -H "Content-Type: application/json" http://localhost:3000/api/employees/5dbdbf33ac37cf25b4758464

**Expected Endpoints**

POST http://localhost:3000/api/employees

- Create a new record using a randomly generated value as the unique identifier (i.e. _id field).  Validate that the following fields are included in the POST body and have the right type/format as posted below:
    - firstName (String)
    - lastName (String)
    - hireDate (YYYY-MM-DD format must be in the past)
    - role (String) - must be one of the following (case-insensitive):
        - CEO (can only be one of these)
        - VP
        - MANAGER
        - LACKEY

    - In addition to the fields included in the POST body, include two fields in each new record that are populated by different external APIs.  For example, a favorite joke and a favorite quote, or a favorite joke and a second favorite joke.  As long as the two external APIs are different.
        - Possible API endpoints:

            https://ron-swanson-quotes.herokuapp.com/v2/quotes

            https://icanhazdadjoke.com

            https://quotes.rest/qod

PUT http://localhost:3000/api/employees/:id

- Replace the record corresponding to :id with the contents of the PUT body


GET http://localhost:3000/api/employees/:id

- Return the record corresponding to the id parameter


GET http://localhost:3000/api/employees

- Return all current records


DELETE http://localhost:3000/api/employees/:id

- delete the record corresponding to the id parameter


