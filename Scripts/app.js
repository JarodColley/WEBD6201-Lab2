/*
    Student Name  : Jarod Colley
    StudentID     : 100704994
    Date Completed: 2020-02-27
*/

class Contact
{
    constructor(contactName = "", emailAddress = "", contactNumber = "", contactMessage = "")
    {
        this.contactName = contactName;
        this.emailAddress = emailAddress;
        this.contactNumber = contactNumber;
        this.contactMessage = contactMessage;
    }
}
class User
{
    constructor(firstName = "", lastName = "", userName = "", email = "", password = "")
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
        this.password = password;
    }
}




"use strict";
//IIFE - Immediately Invoked Function Expression
// mean? -> anonymous self-executing function

let app;
(function(app){

    // Declare Function Variables here...
    console.log("%cDeclaring Variables", "color: red;")
    let contactObject = new Contact();
    let userObject = new User();

    /**
     * Variable initialization in this function
     *
     */
    function Start()
    {
       PageSwitcher();

        Main();
    }

    function PageSwitcher()
    {
        let name = window.location.pathname;

       let pageName = name.substring(1, name.length - 5);

       switch(pageName)
        {
            case "index":
               DisplayHomePageContent();
                break;
            case "products":
                DisplayProductsContent();
                break;
            case "services":
                DisplayServicesContent();
                break;
            case "about":
                DisplayAboutContent();
                break;
            case "contact":
                DisplayContactContent();
                break;
            case "projects":
                DisplayProjectsContent();
                break;
            case "login":
                DisplayLoginContent();
                break;
            case "register":
                DisplayRegisterContent();
                break;
            default:
                console.error("Landed in a page that is not defined");
                break;
        }

        // add a class of active to the active link
        $("#"+pageName).addClass("active");
    }

    function DisplayHomePageContent()
    {
        document.getElementById("home").className = "nav-item active";
        /* $("button").click(()=>{
            location.href = "projects.html";
        }); */

        document.title = "WEBD6201 - Home";

        let progressbar = $( "#progressBar" ).progressbar({
            value: 37
          });

        console.log(progressbar);

        $("#projectsButton").click(function(){
            $(this).fadeOut(3000, "linear", ()=>{
                $(this).fadeIn(1000, "linear", ()=>{
                    location.href = "projects.html";
                });
            });
        });
    }

    function DisplayProductsContent()
    {
        document.title = "WEBD6201 - Products";
    }

    function DisplayServicesContent()
    {
        document.title = "WEBD6201 - Services";
    }

    function DisplayAboutContent()
    {
        document.title = "WEBD6201 - About Us";
    }

    function DisplayContactContent()
    {
        document.title = "WEBD6201 - Contact Us";
        function clearForm()
        {
            //document.getElementById("contactForm").reset();
            $("#contactForm")[0].reset();
            $("#errorMessage").hide();
        }

        function validateInput(selector, condition, errorMessage)
        {
            if(condition)
            {
                $("#errorMessage").show();
                $("#errorMessage").text(errorMessage);
                $(selector).select();
                $(selector).css("border", "2px solid red");
            }
            else
            {
                $("#errorMessage").hide();
                $(selector).css("border", "1px solid #ced4da");
            }
        }

        $("#errorMessage").hide();
        $("#contactName").select();

        // Contact Name Events
        $("#contactName").blur((e)=>
        {
            validateInput("#contactName",( $("#contactName").val().length < 2),"Contact Name is Too Short");
        });

        $("#contactName").focus((e)=>
        {
            $("#contactName").select();
        });

        // Email Events
        $("#emailAddress").blur((e)=>
        {
            validateInput("#emailAddress",($("#emailAddress").val().length < 8) || (!$("#emailAddress").val().includes("@")),"Invalid Email Address");
        });

        $("#emailAddress").focus((e)=>
        {
            $("#emailAddress").select();
        });

        // Contact Number Events
        $("#contactNumber").blur((e)=>
        {
            let phonePattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
            let phoneNumber = $("#contactNumber").val();

            validateInput("#contactNumber",( !phonePattern.test(phoneNumber)),"Invalid Contact Number");
        });

        $("#contactNumber").focus((e)=>
        {
            $("#contactNumber").select();
        });

        // Contact Message Events
        $("#contactMessage").blur((e)=>
        {
            validateInput("#contactMessage",( $("#contactMessage").val().length < 2 ),"Contact Message Too Short");
        });

        $("#contactMessage").focus((e)=>
        {
            $("#contactMessage").select();
        });


        $("#contactForm").submit  ((e)=>
        {
            if(document.getElementById("contactForm").checkValidity() == false)
            {
                e.preventDefault();
                e.stopPropagation();
                console.log("form not valid");
            }

            
            let contactName = $("#contactName").val();
            let emailAddress = $("#emailAddress").val();
            let contactNumber = $("#contactNumber").val();
            let contactMessage = $("#contactMessage").val();

            console.log(`Contact Name: ${contactName}`);
            console.log(`Email Address: ${emailAddress}`);
            console.log(`Contact Number: ${contactNumber}`);
            console.log(`Contact Message: ${contactMessage}`);

            contactObject.contactName = contactName;
            contactObject.emailAddress = emailAddress;
            contactObject.contactNumber = contactNumber;
            contactObject.contactMessage = contactMessage;

            console.log(contactObject);

            clearForm();
        });

        $("#resetButton").click((e)=>
        {
            e.preventDefault();
            if(confirm("Are You Sure?"))
            {
                clearForm();
            }

            
        });
    }

    function DisplayProjectsContent()
    {
        document.title = "WEBD6201 - Projects";
    }

    function DisplayLoginContent()
    {
        document.title = "WEBD6201 - Login";

        //login button actions
        $("#loginForm").submit  ((e)=>
        {
           let userName = $("#userName").val();
           let login = document.getElementById("login");
           let span = document.createElement("span");
           span.className = "navbar-text";
           span.textContent = userName;
           login.parentNode.insertBefore(span,login);

            e.preventDefault();
            e.stopPropagation();
            $("#loginForm")[0].reset();
            $("#login").hide();
            $("#logout").show();

        });

    }

    function DisplayRegisterContent()
    {
        document.title = "WEBD6201 - Register";

        //creates and insertes the error div tag
        let errorMessage = document.createElement("div");
        let main = document.getElementById("contentArea");
        let form = document.getElementById("registerForm");
        errorMessage.className = "alert alert-danger";
        errorMessage.id = "ErrorMessage";
        errorMessage.textContent = "Errors go here";
        main.insertBefore(errorMessage,form);

        //method that clears the register form
        function clearForm()
        {
            //document.getElementById("contactForm").reset();
            $("#registerForm")[0].reset();
            $("#ErrorMessage").hide();
        }

        //method that validates input given to it 
        function validateInput(selector, condition, errorMessage)
        {
            if(condition)
            {
                $("#ErrorMessage").show();
                $("#ErrorMessage").text(errorMessage);
                $(selector).select();
                $(selector).css("border", "2px solid red");
            }
            else
            {
                $("#ErrorMessage").hide();
                $(selector).css("border", "1px solid #ced4da");
            }
        }

        //hides the error message at the start
        $("#ErrorMessage").hide();

        $("#FirstName").blur((e)=>
        {
            validateInput("#FirstName",( $("#FirstName").val().length < 2),"First Name is Too Short");
        });

        $("#FirstName").focus((e)=>
        {
            $("#FirstName").select();
        });
        $("#lastName").blur((e)=>
        {
            validateInput("#lastName",( $("#lastName").val().length < 2),"Last Name is Too Short");
        });

        $("#lastName").focus((e)=>
        {
            $("#lastName").select();
        });
        $("#emailAddress").blur((e)=>
        {
            validateInput("#emailAddress",($("#emailAddress").val().length < 8) || (!$("#emailAddress").val().includes("@")),"Invalid Email Address");
        });

        $("#emailAddress").focus((e)=>
        {
            $("#emailAddress").select();
        });
        $("#password").blur((e)=>
        {
            validateInput("#password",( $("#password").val().length < 6),"Password is Too Short");
        });

        $("#password").focus((e)=>
        {
            $("#password").select();
        });
        $("#confirmPassword").blur((e)=>
        {
            validateInput("#confirmPassword",( $("#confirmPassword").val() != $("#password").val()),"Passwords dont match");
        });

        $("#confirmPassword").focus((e)=>
        {
            $("#confirmPassword").select();
        });
        //submit button actions
        $("#registerForm").submit  ((e)=>
        {
            e.preventDefault();
            if(document.getElementById("registerForm").checkValidity() == false)
            {   
                e.stopPropagation();
                console.log("form not valid");
            }

            let firstName = $("#FirstName").val();
            let lastName = $("#lastName").val();
            let email = $("#emailAddress").val();
            let password = $("#confirmPassword").val();

            console.log(`First Name: ${firstName}`);
            console.log(`Last Name: ${lastName}`);
            console.log(`Email Address: ${email}`);
            console.log(`Password: ${password}`);

            userObject.firstName = firstName;
            userObject.lastName = lastName;
            userObject.email = email;
            userObject.password = password;
            userObject.userName = "";

            console.log(userObject);

            clearForm();

        });
    }

    /**
     * Main Program entry point is here
     *
     */
    function Main()
    {
       
    }
    
    

    window.addEventListener("load", Start);
})(app || (app = {}));

