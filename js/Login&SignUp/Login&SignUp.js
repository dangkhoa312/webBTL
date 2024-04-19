//Data storing into localstorage
function validateForm(){

    let data=localStorage.getItem('details') ? JSON.parse(localStorage.getItem('details')) : [];
    let formData ={
            "email":document.getElementById("REmail").value,
            "password":document.getElementById("Rpassword").value,
            "confirmpassword":document.getElementById("confirmPassword").value,
            "trangThai": false
        }
        data.push(formData);
        if(localStorage){
            localStorage.setItem("details", JSON.stringify(data));
            
        }
        console.log(data); 
}





function verifyPassword(input){
    if(input.value != document.getElementById("Rpassword").value){
        input.setCustomValidity("Password không trùng");
    }else{
        input.setCustomValidity("");
    }
}

//check already registered users
function emailExist(value){
    let existemail = JSON.parse(localStorage.getItem("details"));
    
    let emailid = existemail.map((email,i,existemail) =>{
        return existemail[i].email;
    });

     let getexistemail = emailid.filter((email)=>{
        if(email == value.value){
            value.setCustomValidity('Email đã đăng ký. Hãy thử email khác');
            
        }else{
            value.setCustomValidity("");
        }
    });
}

// //Handling bubbling
    const form = document.getElementById("registerForm");
  
    form.addEventListener("submit", function(e){
        e.preventDefault();
        form.reset();
        form.style.display="none";
        $("#mymodal").modal("hide");
    });

    function showHide(show, hide){
        let showEle = document.getElementById(show);
        let hideEle = document.getElementById(hide);
        showEle.style.display="block";
        hideEle.style.display="none";
    }


 

  


    var tenDangNhap ="";
    function loginUser(){
        let loginEmail = document.getElementById("LEmail").value;
        let loginPass =  document.getElementById("Lpassword").value;
        let matchEmail = JSON.parse(localStorage.getItem("details"));
        let emailArray =[];
        let passArray=[];

        
        // const show = document.getElementById("info-user");
        // const hide = document.getElementById("LoginBtt");
        
        let result = matchEmail.map((item, i) => {
            emailArray.push(item.email);
            passArray.push(item.password);
        });
    
        if(emailArray.indexOf(loginEmail) > -1 && passArray.indexOf(loginPass) > -1){

            localStorage.setItem('isLoggedIn', 'true');
            
            showHide("info-user", "LoginBtt");

            let data = localStorage.getItem('details');
            let parsedData = JSON.parse(data);
            let emailDangNhap ="";
            tenDangNhap= loginEmail;
            for(let i = 0; i < parsedData.length; i++) {
                if(parsedData[i].email ==loginEmail){
                    parsedData[i].trangThai = true; 
                    emailDangNhap =parsedData[i].email;
                    break;
                }
            }
            if (emailDangNhap !== "") {
                localStorage.setItem("details", JSON.stringify(parsedData));
                // console.log(parsedData);
            }
            
            document.getElementById('show_info_user').style.display = "block";
            document.getElementById('info-user').innerHTML = '<span class="icon icon-user"></span>' + emailDangNhap + '<i class="pl-2 fa fa-angle-down cursor-pointer" aria-hidden="true"></i> <div class="show_info_user" style="display: none;"><a href="/edit.html">Tài khoản</a><a href="/logout">Đăng xuất</a></div>';
            //document.getElementById('tenLogin').innerHTML = emailDangNhap;
            $("#mymodal").modal("hide");
            console.log("Login thành công");
            
        } else {
            console.log("Tài khoản chưa đăng ký");
            
        }
    }
    
    const loginForm = document.getElementById("logIn");
    loginForm.addEventListener("submit", function(e){
        e.preventDefault();
    });

    function logOut(){
        let data = localStorage.getItem('details');

        let parsedData = JSON.parse(data);
        let emailDangXuat = tenDangNhap;
        for(let i = 0; i < parsedData.length; i++) {
            if(parsedData[i].email == emailDangXuat){
                parsedData[i].trangThai = false;
                console.log(parsedData[i].trangThai); 
                break;
            }
        }
        localStorage.setItem("details", JSON.stringify(parsedData));
        showHide("LoginBtt","info-user");
        document.getElementById('show_info_user').style.display = "none";
        localStorage.setItem('isLoggedIn', 'false');
    }
    
   

    window.onload = function() {
        var isLoggedIn = localStorage.getItem('isLoggedIn');
        let data = localStorage.getItem('details');
        if (isLoggedIn === 'true') {
            let loginEmail = "";
            let loginPass ="";
            let parsedData = JSON.parse(data);
            for(let i = 0; i < parsedData.length; i++) {
                if(parsedData[i].trangThai ==true){
                    loginEmail=parsedData[i].email; 
                    loginPass=parsedData[i].password; 
                    break;
                }
            }

            showHide("info-user", "LoginBtt");
            document.getElementById('show_info_user').style.display = "block";
            document.getElementById('info-user').innerHTML = '<span class="icon icon-user"></span>' + loginEmail + '<i class="pl-2 fa fa-angle-down cursor-pointer" aria-hidden="true"></i> <div class="show_info_user" style="display: none;"><a href="/edit.html">Tài khoản</a><a href="/logout">Đăng xuất</a></div>';
            
              
            if (document.body.id === "TaiKhoanUI") {
                let inputElement = ""; // Khai báo biến để lưu giá trị email
                inputElement = loginEmail; // Gán giá trị email vào biến
                document.getElementById('ThongTinEmail').value = inputElement; // Thiết lập giá trị cho input
                let passElement = ""; // Khai báo biến để lưu giá trị email
                passElement = loginPass; // Gán giá trị email vào biến
                document.getElementById('ThongTinPass').value = passElement;
            }
        }
        // } else {
        //     // Người dùng chưa đăng ký
        //     // Redirect hoặc hiển thị thông báo
        // }
    };

    var leavingPage = false;
    document.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function(event) {
            
            leavingPage = true;
        });
    });

    window.addEventListener('beforeunload', function(event) {
        // Đặt leavingPage thành true khi trang được làm mới
        leavingPage = true;
    })

    window.addEventListener('unload', function(event) {  
        if (leavingPage == false) {
            // Nếu không, đặt biến isLoggedIn thành false khi cửa sổ được đóng
            localStorage.setItem('isLoggedIn', 'false');
        }
    });

    

    


  
       