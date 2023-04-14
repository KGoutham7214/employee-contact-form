const connection = require('./connection.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html');
});

app.post('/', (req, res) => {

    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var address = req.body.address;
    var sec_name = req.body.secName;
    var sec_phone = req.body.secPhone;
    var sec_relation = req.body.secRelation;

    // connection.connect(function(err) {
    //   if (err) throw err;
      var query = "INSERT INTO `employees` (`name`, `email`, `phone`, `address`, `sec_name`, `sec_phone`, `sec_relation`) VALUES ('"+name+"', '"+email+"', '"+phone+"', '"+address+"', '"+sec_name+"', '"+sec_phone+"', '"+sec_relation+"')";
      connection.query(query, function (err, result) {
        if (err) throw err;
        console.log("1 employee record added");
        res.redirect('/employees');
      });

  // });
    
    
     
});

app.get('/employees', (req, res) => {
    // connection.connect(function(err) {
    //     if (err) throw err;
        connection.query("SELECT * FROM employees", function (err, result, fields) {
          if(err) console.log(err);
          res.render(__dirname+'/employees' , {employees: result});
        });
      // });
});
   
app.get('/delete-employee', (req, res) => {
    // connection.connect(function(err) {
    //     if (err) throw err;
    var sql = "DELETE FROM employees WHERE id=?";
    var id = req.query.id;
        connection.query(sql, [id], function (err, result, fields) {
          if(err) console.log(err);
          res.redirect('/employees');
        });
      // });
});
  
app.get('/update-employee', (req, res) => {
  var sql  = "Select * from employees where id=?";
  var id = req.query.id;
  connection.query(sql,[id], function (err, result) {
    if(err) console.log(err);
    res.render(__dirname+'/update-employee' , {employees: result});
  });
});

app.post('/update-employee', (req,res)=>{
    
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var address = req.body.address;
    var sec_name = req.body.secName;
    var sec_phone = req.body.secPhone;
    var sec_relation = req.body.secRelation;
    var id = req.body.id;

  var sql  = "Update employees set name=?, email=?, phone=?, address=?, sec_name=?, sec_phone=?, sec_relation=? where id=?";
  
  connection.query(sql,[name, email, phone,address,sec_name,sec_phone,sec_relation,id ], function (err, result) {
    if(err) console.log(err);
    res.redirect('/employees');
  });
});


app.listen(3000, () => {
  console.log(`Server listening on port port`);
});