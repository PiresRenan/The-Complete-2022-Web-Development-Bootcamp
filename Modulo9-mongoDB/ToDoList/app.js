//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const _ = require("lodash")

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {useNewUrlParser: true});

const itemSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "Welcome to your todolist"
});

const item2 = new Item({
  name: "Hit the + button to add a new item"
});

const item3 = new Item({
  name: "Hit the delete a item"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name:String,
  items: [itemSchema]
}

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {

  Item.find({}, 
    (err, foundItem) => {

    if (foundItem.length === 0) {
      Item.insertMany(defaultItems, (err) => {
         if (err) {
           console.log(err);
         } else {
           console.log("Success");
         }
      });
      res.redirect("/");
    } else {
      res.render("list", {listTitle: "Today", newListItems: foundItem});
    }
  });

});

app.post("/", function(req, res){
  const listName = req.body.list;
  const itemName = new Item({
    name: req.body.newItem
  });

  if (listName === "Today") {
    itemName.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, (err, foundList)=>{
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    })
  }

});

app.post("/delete", (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName == "Today"){
    Item.findByIdAndRemove(checkedItemId, (err)=>{
      if (!err) {
        console.log("Success");
        res.redirect("/")
      }
    });
  }else {
    List.findOneAndRemove({ name: listName }, {$pull: {items: {__id: checkedItemId}}}, (err, foundList) => {
      if(!err){
        res.redirect("/" + listName);
      }
    });
  }
});

app.get("/:customListName", (req,res) => {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, (err, foundList) => {
    if (!err) {
      if (!foundList) {
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName)
      }else {
        console.log(customListName.name);
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items})
      }
    }
  });

});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
