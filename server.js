require('dotenv').config();
const express=require('express');
const app=express();
const path=require('path');
const bodyParser=require('body-parser');
const port=process.env.PORT || 8080;
const hbs=require('hbs');
const bcrypt=require('bcryptjs');
const cookieParser=require('cookie-parser');
const auth=require("./src/middleware/auth")

// javascript
// const logOutClick=require('./public/js/btn')


// console.log(process.env.SECRET_KEY);

// data Base
require('./src/database/database');
const student=require('./src/models/model');
const contact=require('./src/models/contact');
const courses=require('./src/models/course');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: false}));
app.use('/css',express.static(path.join(__dirname,"./public/css")));
app.use('/media',express.static(path.join(__dirname,"./public/media")));
app.use('/js',express.static(path.join(__dirname,"./public/js")));

app.set('view engine','hbs');
hbs.registerPartials(path.join(__dirname,"./views/tamplate"));

var userName,userEmail,userCourse,userMobile,userId;
var logIn=true;
var logOut=false;
var course=false;

// Create Token
// const createToken=async()=>{
//     const token=await jwt.sign({id:""},"secreykey");
// }
// createToken();
// _____________


app.get('/',(req,res)=>{
    res.render('index',{
        userId: userId,
        islogin: logIn,
        islogout: logOut,
        isCourse: course
    });
})

app.get('/index',(req,res)=>{
    res.render('index',{
        userId: userId,
        islogin: logIn,
        islogout: logOut,
        isCourse: course
    });
})

app.get('/singUp',(req,res)=>{
    res.render("singUp",{
        userId: userId,
        islogin: logIn,
        islogout: logOut,
        isCourse: course
    });
})

// app.get('/profile',(req,res)=>{
//     student.find({})
//     .then((x)=>{
//         res.render("profile",{
//             userName: userName,
//             userId: userId,
//             mobileNo: userMobile,
//             emailId: userEmail,
//             course: userCourse,
//             islogin: logIn,
//             islogout: logOut,
//             isCourse: course
//         });
//         console.log(x);
//     }).catch((err)=>{
//         res.status(400).send(err);
//     })
// }) 

app.get('/profile',(req,res)=>{
    res.render("profile",{
        userName: userName,
        userId: userId,
        mobileNo: userMobile,
        emailId: userEmail,
        course: userCourse,
        islogin: logIn,
        islogout: logOut,
        isCourse: course
    });
})

//update profile
app.post('/profile', async(req, res)=>{
    try {
        var updateData=await student.findOneAndUpdate({email: userData.email},{$set:{
            name: req.body.name,
            userid: req.body.userid,
            mobile: req.body.mobile,
            email: req.body.email,
            course: req.body.course,
            password: userData.password,
            Cpassword: userData.Cpassword
        }},{new: true})
        userData=null;
        userData=updateData;
        console.log(userData);
        res.status(200).render('profile',{
            userName: userData.name,
            userId: userData.userid,
            mobileNo: userData.mobile,
            emailId: userData.email,
            course: userData.course,
            islogin: logIn,
            islogout: logOut,
            isCourse: course
        });

    } catch (error) {
        res.status(400).send(error);
    }
})

app.get('/java',async(req, res)=>{
    const courseData=await courses.findOne({name: "java+dsa"})
    try{
        res.render("java",{
            name: courseData.name,
            link: courseData.link,
            userName: userName,
            userId: userId,
            mobileNo: userMobile,
            emailId: userEmail,
            course: userCourse,
            islogin: logIn,
            islogout: logOut,
            isCourse: course
        })
        console.log(courseData);
    }catch(error){
        res.status(400).send(error);
    }
})

app.get('/python',async(req, res)=>{
    const courseData=await courses.findOne({name: "Python"})
    try{
        res.render("python",{
            name: courseData.name,
            link: courseData.link,
            userName: userName,
            userId: userId,
            mobileNo: userMobile,
            emailId: userEmail,
            course: userCourse,
            islogin: logIn,
            islogout: logOut,
            isCourse: course
        })
        console.log(courseData);
    }catch(error){
        res.status(400).send(error);
    }
})

app.get('/javascript',async(req, res)=>{
    const courseData=await courses.findOne({name: "javascript"})
    try{
        res.render("javascript",{
            name: courseData.name,
            link: courseData.link,
            userName: userName,
            userId: userId,
            mobileNo: userMobile,
            emailId: userEmail,
            course: userCourse,
            islogin: logIn,
            islogout: logOut,
            isCourse: course
        })
        console.log(courseData);
    }catch(error){
        res.status(400).send(error);
    }
})

app.get('/about',(req,res)=>{
    res.render("about",{
        userId: userId,
        islogin: logIn,
        islogout: logOut,
        isCourse: course
    });
})

// app.get('/mycourse',(req,res)=>{
//     res.render("mycourse",{
//         userId: userId,
//         islogin: logIn,
//         islogout: logOut,
//         isCourse: course
//     });
// })

app.get('/mycourse',(req,res)=>{
    courses.find({})
    .then((x)=>{
        res.render("mycourse",{
            x: x,
            userId: userId,
            islogin: logIn,
            islogout: logOut,
            isCourse: course
        });
        // console.log(x);
    }).catch((err)=>{
        res.status(400).send(err);
    })
}) 

app.get('/contact',(req,res)=>{
    res.render("contact",{
        userId: userId,
        islogin: logIn,
        islogout: logOut,
        isCourse: course
    });
})

app.post('/contact',async(req,res)=>{
    try{
        const contactL=new contact({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            message: req.body.message
        })
        await contactL.save();
        res.status(201).render("index",{
            userId: userId,
            islogin: logIn,
            islogout: logOut,
            isCourse: course
        });
    }catch(err){
        res.status(400).send(err);
    }
})

app.post('/singUp',async(req,res)=>{
    try{
        const pass=req.body.password;
        const Cpass=req.body.Cpassword;
        // console.log("h---------")
        if(pass===Cpass){
            const studentRegister=new student({
                name: req.body.name,
                userid: req.body.userid,
                mobile: req.body.mobile,
                email: req.body.email,
                course: req.body.course,
                password: req.body.password,
                Cpassword: req.body.Cpassword
            })

        const token=await studentRegister.generateToken();

        res.cookie("jwt", token,{
            // expires: new Date(Date.now()+500000),
            httpOnly: true
        });

        await studentRegister.save();
        userName=req.body.name;
        userId=req.body.userid;
        userEmail=req.body.email;
        userMobile=req.body.mobile;
        userCourse=req.body.course;
        logIn=false;
        logOut=true;
        course=true;
        // console.log("h---------")
        userData=await student.findOne({email: userEmail})
        res.status(201).render("index",{
            userId: userId,
            islogin: logIn,
            islogout: logOut,
            isCourse: course
        });
        }else{
            res.send("password are not mathing");
        }
    }catch(err){
        res.status(400).send(err);
    }
})

app.get('/logIn',(req,res)=>{
    res.render('logIn');
})

app.post('/logIn',async(req,res)=>{
    try{
        const enterEmail=req.body.email;
        const enterPass=req.body.password;

        userData=await student.findOne({email:enterEmail});

        const isMatch=await bcrypt.compare(enterPass, userData.password);

        const token=await userData.generateToken();

        res.cookie("jwt", token,{
            // expires: new Date(Date.now()+500000),
            httpOnly: true
        });

        // console.log(token);

        if(isMatch){
            userName=userData.name;
            userId=userData.userid;
            userEmail=userData.email;
            userMobile=userData.mobile;
            userCourse=userData.course;
            logIn=false;
            logOut=true;
            course=true;
            res.status(201).render("index",{
                userId: userId,
                islogin: logIn,
                islogout: logOut,
                isCourse: course
            });
        }else{
            res.send("Invilide Password");
        }

    }catch{
        res.status(400).send("Invilide Email Id");
    }
})

app.get('/courses', auth, (req,res)=>{
    // console.log(req.cookies.jwt);
    res.render("courses",{
        userId: userId,
        islogin: logIn,
        islogout: logOut,
        isCourse: course
    });
})

app.get('/logOut', auth, async(req, res)=>{
    try {
        req.user.tokens=req.user.tokens.filter((currentEle)=>{
            return currentEle.token!==req.token
        })
        res.clearCookie('jwt');
        await req.user.save();
        userId=null;
        logIn=true;
        logOut=false;
        course=false;
        res.render("index",{
            userId: userId,
            islogin: logIn,
            islogout: logOut,
            isCourse: course
        });
    } catch (error) {
        res.status(500).send(error);
    }
})

app.listen(port,(err)=>{
    console.log(`server is running on http://localhost:${port}`);
})