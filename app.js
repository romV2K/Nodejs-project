//---------------------------------------Modules---------------------------------------------------------
const  
     path = require('path'),
     express = require('express'),
     bodyParser = require('body-parser'),
     mongoose=require('mongoose'),
     scripts=require('./public/js/script'),
     multer=require('multer'),
     app= express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '')));
app.use(express.static(path.join(__dirname, 'public/js/script')));
app.use( bodyParser.urlencoded({extended: true}));
app.use( bodyParser.json());

async function start(){
     try{
          await mongoose.connect(
               'mongodb+srv://romV2:29111999k@cluster0-2xdfq.mongodb.net/content',
               {
               useNewUrlParser:true,
               useFindAndModify:false
          })
          app.listen(3000, ()=>{
               console.log('Server has been started')
          })
     }catch(e){
          console.log(e)
     }
}
// ------------------------------Upload files-------------------------------------------------
// Storage Engine
const storage = multer.diskStorage({
     destination: './public/uploads/',
     filename: function(req,file,cb){
          cb(null,file.fieldname + '-' + getCurrentDate() + 
          path.extname(file.originalname));
     }
});

// Upload Initialization
const upload = multer({
     storage: storage,
     limits: {fileSize:10000000},
     fileFilter: function(req,file,cb){
          checkFileType(file,cb);
     }
}).single('fileToUpload')

// Check File Type
function checkFileType(file,cb){
     // Allowed ext
     const fileTypes = /jpeg|jpg|png|gif/;
     // Check Ext
     const extname = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());
     // Check Mime
     const mimeType = fileTypes.test(file.mimeType);
     if(mimeType || extname){
          return cb(null, true);
     }else{
          cb('Error: Images Only!');
     }
}

// Upload
app.post('/upload', (req, res) => {
     upload(req,res, (err)=> {
          if(err){
               res.render('write.ejs',{
                    msg: err
               });
          }else{
               console.log(req.file)
               res.send('test');
               // if(req.file === 'undefined'){
               //      res.redirect('/news');
               // }
          }
     });
});

// -------------------------------------------------------------------------------

//-------------------------------Other functions and arrays-----------------------
// Get Date 
getCurrentDate = function(currentDate) {
     let date = new Date(),
     curr_date = date.getDate(),
     curr_month = date.getMonth() + 1,
     curr_year = date.getFullYear(),
     curr_hour = date.getHours(),
     curr_minute = date.getMinutes();
     currentDate = `${curr_year}.${curr_month}.${curr_date} ${curr_hour}:${curr_minute}` ;
     return currentDate;
};


let  
     posts = [
     { title: "Lorem Ipsum", content:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus itaque harum debitis saepe, nobis incidunt, optio in repellendus omnis dignissimos nam doloremque at veritatis fugiat nesciunt, tempore deleniti recusandae enim dolores sit labore alias? Maxime ea blanditiis animi sed deleniti, saepe consectetur cumque nemo dicta in ex, eveniet labore debitis iste optio alias repellat eius maiores accusamus. Voluptates veniam quisquam quos, numquam et voluptatibus fugit reiciendis. Corporis qui, totam, provident illum possimus tenetur dolores inventore molestiae, laudantium eveniet beatae impedit nostrum maiores modi libero. Officia asperiores quo impedit nulla possimus odit nobis nostrum veritatis, obcaecati tempora exercitationem neque ipsa porro!" },
     { title: "Lorem Ipsum", content:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus itaque harum debitis saepe, nobis incidunt, optio in repellendus omnis dignissimos nam doloremque at veritatis fugiat nesciunt, tempore deleniti recusandae enim dolores sit labore alias? Maxime ea blanditiis animi sed deleniti, saepe consectetur cumque nemo dicta in ex, eveniet labore debitis iste optio alias repellat eius maiores accusamus. Voluptates veniam quisquam quos, numquam et voluptatibus fugit reiciendis. Corporis qui, totam, provident illum possimus tenetur dolores inventore molestiae, laudantium eveniet beatae impedit nostrum maiores modi libero. Officia asperiores quo impedit nulla possimus odit nobis nostrum veritatis, obcaecati tempora exercitationem neque ipsa porro!" },
     { title: "Lorem Ipsum", content:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus itaque harum debitis saepe, nobis incidunt, optio in repellendus omnis dignissimos nam doloremque at veritatis fugiat nesciunt, tempore deleniti recusandae enim dolores sit labore alias? Maxime ea blanditiis animi sed deleniti, saepe consectetur cumque nemo dicta in ex, eveniet labore debitis iste optio alias repellat eius maiores accusamus. Voluptates veniam quisquam quos, numquam et voluptatibus fugit reiciendis. Corporis qui, totam, provident illum possimus tenetur dolores inventore molestiae, laudantium eveniet beatae impedit nostrum maiores modi libero. Officia asperiores quo impedit nulla possimus odit nobis nostrum veritatis, obcaecati tempora exercitationem neque ipsa porro!" }
],
     newss = [
     { title: "Lorem Ipsum", date: scripts.getCurrentDate() , content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus itaque harum debitis saepe, nobis incidunt, optio in repellendus omnis dignissimos nam doloremque at veritatis fugiat nesciunt, tempore deleniti recusandae enim dolores sit labore alias? Maxime ea blanditiis animi sed deleniti, saepe consectetur cumque nemo dicta in ex, eveniet labore debitis iste optio alias repellat eius maiores accusamus. Voluptates veniam quisquam quos, numquam et voluptatibus fugit reiciendis. Corporis qui, totam, provident illum possimus tenetur dolores inventore molestiae, laudantium eveniet beatae impedit nostrum maiores modi libero. Officia asperiores quo impedit nulla possimus odit nobis nostrum veritatis, obcaecati tempora exercitationem neque ipsa porro!" }
];
//-------------------------------------------------------------------------------------


// ------------------------------Pages Rander------------------------------------------

app.get("/main",(req,res)=>{
     res.render('main.ejs',
     {
          posts: posts
     });
});
app.get('/news', function(req,res){
     res.render('news.ejs',
     { 
          newss: newss
     });
});
app.get('/competition', function(req,res){
     res.render('competition.ejs');
});
app.get('/about', function(req,res){
     res.render('about.ejs');
});
app.get('/media', function(req,res){
     res.render('media.ejs');
});
app.get('/application', function(req,res){
     res.render('application.ejs');
});


// News Render
app.get("/newsTitle/:id", function(req,res){
     let id = req.params.id;
     res.render('newsTitle.ejs', { newss: newss[id - 1] })
});


// Admin Panel
app.get('/write', function(req,res){
     res.render('write.ejs');
});

// -------------------------------------------------------------------------------------------------


// ------------------------------Content gernerator-------------------------------------------------
// Main Content Generator Handler
app.post('/writeMain', function (req, res){
     let  
          title=req.body.title,
          content=req.body.content;
          
     posts.push({title: title, content: content});

     res.redirect('/main');
});

// News Content Generator Handler
app.post('/writeNews', function ( req, res){
     let  
          title=req.body.title,
          date = getCurrentDate(),
          content=req.body.content;


     newss.push({title: title, date: date, content: content});

     res.redirect('/news');
});
// -------------------------------------------------------------------------------

start();
























