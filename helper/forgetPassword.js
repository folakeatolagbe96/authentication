const forgot=(Link,firstName)=>{
    return `
    
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>The Curve Africa</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #2c2c2c; /* Dark background */
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: 20px auto; /* Add some top margin */
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            background-color: #f4f4f4; /* Light grey background */
        }
        .header {
            background: #333333;
            padding: 10px;
            text-align: center;
            border-bottom: 1px solid #ddd;
            color: #ffffff;
        }
        .content {
            padding: 20px;
            color: #333333;
        }
        .footer {
            background: #333333;
            padding: 10px;
            text-align: center;
            border-top: 1px solid #ddd;
            font-size: 0.9em;
            color: #cccccc;
        }
        .button {
            display: inline-block;
            background-color: #000000;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to THE CURVE AFRICA!</h1>
        </div>
        <div class="content">
            <p>Hello ${firstName},</p>
            <p>kindly click on link below to reset your password</p>
          
            <p>
                <a href="${Link}" class="button">Reset Password</a>
            </p>
            <p>If you did not initiate these process, kindly reach out to our customer support.</p>
            <p>Best regards,<br> THECURVE  AFRICA Team</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} . All rights reserved.</p>
            
        </div>
    </div>
</body>
</html>
    
    `
}

module.exports=forgot