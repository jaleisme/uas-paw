const express = require("express");
const multer = require('multer');
const app = express();
const upload = multer(); 
const { db } = require("./firebase");
const port = 5001; // Setting Port

// Date logic
const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${day}-${month}-${year}`;

// ID Maker
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// For parsing application/x-www-form-urlencoded, body, etc
app.use(express.urlencoded({ extended: true })); 
app.use(upload.array()); 
app.use(express.static('public'));
app.use(express.json());

// Setting the app to listen on assigned port
app.listen(port, () => console.log(`Server has started on port: ${port}\nhttp://localhost:${port}\n`));





// TESTS ROUTES [/tests]
app.get("/tests", (req, res) => {
    var multiRef = db.ref('tests');
    multiRef.on('value', (snapshot) => {
    const data = snapshot.val();
    res.status(200).send(data)
    });
})

app.post("/tests/new", (req, res) => {
    let assignedID = makeid(5);
    const data = {
        alias: req.body.alias,
        url: req.body.url,
        note: req.body.note,
        created_at: currentDate
    }
    try{
        db.ref('tests/'+assignedID).set(data);
    } catch(err) {
        console.log(err);
        res.status(400).send(`Request failed! Here's the problem:\n${err}`);
    }
    res.status(200).send('success');
})

app.get('/tests/edit/:ID', (req, res) => {
    let requesting = db.ref();
    requesting.child("tests").child(req.params.ID).get().then((snapshot) => {
        if (snapshot.exists()) {
            res.status(200).send(snapshot.val())
        } else {
            res.status(400).send("Data couln't be found")
        }
    }).catch((error) => {
        console.error(error);
    });
})

app.post("/tests/update/:ID", (req, res) => {
    const data = {
        alias: req.body.alias,
        url: req.body.url,
        note: req.body.note,
        created_at: currentDate
    }
    try{
        db.ref('tests/'+req.params.ID).set(data);
    } catch(err) {
        console.log(err);
        res.status(400).send(`Request failed! Here's the problem:\n${err}`);
    }
    res.status(200).send('success');
})

app.get('/tests/remove/:ID', (req, res) => {
    let requesting = db.ref();
    requesting.child("tests").child(req.params.ID).remove().then(() => {
        res.status(200).send('success');
    }).catch((error) => {
        res.status(400).send("failed");
    });
})





// CATEGORIES ROUTES [/categories]
app.get("/categories", (req, res) => {
    var multiRef = db.ref('categories');
    multiRef.on('value', (snapshot) => {
        const data = snapshot.val();
        res.status(200).send(data)
    });
})

app.post("/categories/new", (req, res) => {
    let assignedID = makeid(5);
    const data = {
        category_name: req.body.name,
        last_modified: currentDate
    }
    try{
        db.ref('categories/'+assignedID).set(data);
    } catch(err) {
        console.log(err);
        res.status(400).send(`Request failed! Here's the problem:\n${err}`);
    }
    res.status(200).send('success');
})

app.get('/categories/edit/:ID', (req, res) => {
    let requesting = db.ref();
    requesting.child("categories").child(req.params.ID).get().then((snapshot) => {
        if (snapshot.exists()) {
            res.status(200).send(snapshot.val())
        } else {
            res.status(400).send("Data couln't be found")
        }
    }).catch((error) => {
        console.error(error);
    });
})

app.post("/categories/update/:ID", (req, res) => {
    const data = {
        category_name: req.body.name,
        last_modified: currentDate
    }
    try{
        db.ref('categories/'+req.params.ID).set(data);
    } catch(err) {
        console.log(err);
        res.status(400).send(`Request failed! Here's the problem:\n${err}`);
    }
    res.status(200).send('success');
})

app.get('/categories/remove/:ID', (req, res) => {
    let requesting = db.ref();
    requesting.child("categories").child(req.params.ID).remove().then(() => {
        res.status(200).send('success');
    }).catch((error) => {
        res.status(400).send("failed");
    });
})





// ITEMS ROUTES [/items]
app.get("/items", (req, res) => {
    var multiRef = db.ref('items');
    multiRef.on('value', (snapshot) => {
        const data = snapshot.val();
        res.status(200).send(data)
    });
})

app.post("/items/new", (req, res) => {
    let assignedID = makeid(5);
    const data = {
        item_name: req.body.name,
        item_description: req.body.description,
        item_image: req.body.image,
        item_category: req.body.category,
        item_type: req.body.type,
        item_shelf: req.body.shelf,
        last_modified: currentDate
    }
    try{
        db.ref('items/'+assignedID).set(data);
    } catch(err) {
        console.log(err);
        res.status(400).send(`Request failed! Here's the problem:\n${err}`);
    }
    res.status(200).send('success');
})

app.get('/items/edit/:ID', (req, res) => {
    let requesting = db.ref();
    requesting.child("items").child(req.params.ID).get().then((snapshot) => {
        if (snapshot.exists()) {
            res.status(200).send(snapshot.val())
        } else {
            res.status(400).send("Data couln't be found")
        }
    }).catch((error) => {
        console.error(error);
    });
})

app.post("/items/update/:ID", (req, res) => {
    const data = {
        item_name: req.body.name,
        item_description: req.body.description,
        item_image: req.body.image,
        item_category: req.body.category,
        item_type: req.body.type,
        item_shelf: req.body.shelf,
        last_modified: currentDate
    }
    try{
        db.ref('items/'+req.params.ID).set(data);
    } catch(err) {
        console.log(err);
        res.status(400).send(`Request failed! Here's the problem:\n${err}`);
    }
    res.status(200).send('success');
})

app.get('/items/remove/:ID', (req, res) => {
    let requesting = db.ref();
    requesting.child("items").child(req.params.ID).remove().then(() => {
        res.status(200).send('success');
    }).catch((error) => {
        res.status(400).send("failed");
    });
})





// TYPE ROUTES [/types]
app.get("/types", (req, res) => {
    var multiRef = db.ref('types');
    multiRef.on('value', (snapshot) => {
        const data = snapshot.val();
        res.status(200).send(data)
    });
})

app.post("/types/new", (req, res) => {
    let assignedID = makeid(5);
    const data = {
        type_name: req.body.name,
        last_modified: currentDate
    }
    try{
        db.ref('types/'+assignedID).set(data);
    } catch(err) {
        console.log(err);
        res.status(400).send(`Request failed! Here's the problem:\n${err}`);
    }
    res.status(200).send('success');
})

app.get('/types/edit/:ID', (req, res) => {
    let requesting = db.ref();
    requesting.child("types").child(req.params.ID).get().then((snapshot) => {
        if (snapshot.exists()) {
            res.status(200).send(snapshot.val())
        } else {
            res.status(400).send("Data couln't be found")
        }
    }).catch((error) => {
        console.error(error);
    });
})

app.post("/types/update/:ID", (req, res) => {
    const data = {
        type_name: req.body.name,
        last_modified: currentDate
    }
    try{
        db.ref('types/'+req.params.ID).set(data);
    } catch(err) {
        console.log(err);
        res.status(400).send(`Request failed! Here's the problem:\n${err}`);
    }
    res.status(200).send('success');
})

app.get('/types/remove/:ID', (req, res) => {
    let requesting = db.ref();
    requesting.child("types").child(req.params.ID).remove().then(() => {
        res.status(200).send('success');
    }).catch((error) => {
        res.status(400).send("failed");
    });
})





// BORROWMENT ROUTES [/borrowments]
app.get("/borrowments", (req, res) => {
    var multiRef = db.ref('borrowments');
    multiRef.on('value', (snapshot) => {
        const data = snapshot.val();
        res.status(200).send(data)
    });
})

app.post("/borrowments/new", (req, res) => {
    let assignedID = makeid(5);
    const data = {
        employee: 'admin',
        start_date: '20-12-2022',
        end_date: '21-12-2022',
        note: 'Test override backend',
        status: 'Ongoing',
        items: [['Projector', 1, 'Good'], ['Printer', 2, 'Empty']],
        last_modified: currentDate
    }
    try{
        db.ref('borrowments/'+assignedID).set(data);
    } catch(err) {
        console.log(err);
        res.status(400).send(`Request failed! Here's the problem:\n${err}`);
    }
    res.status(200).send('success');
})