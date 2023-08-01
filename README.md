# FreshBuy

![MainPage](readmeImages/mainpage.jpg)                                                                                                                               

**in order to set up the app you will also need to set up the front-end part of the project**
you can do that here: https://github.com/BakalMode/supermarket-back-JB-Final-Project

## What is included

- A django admin panel for easy customazation:
 adding/removing products, removing accounts, creating more categories, and much more (at the backend link above)

- The FreshBuy app is your ultimate solution for effortless online shopping. Our user-friendly
 platform is designed with one soul purpose: to make your life easier.
  Experience the convenience of shopping from the comfort of your home with just a few taps.
  Enjoy a seamless and hassle-free shopping experience with Fresh, where simplicity meets efficiency.                             
 
## Features

- Payment integration with Paypal and Credit card using Paypal Developer tools
- Email integration for password reset (works only with gmail) using EmailJS
- Ability to provide reviews on products you bought before if you are a registered user
- Products categories and a functioning search-bar for finding the product you want with ease
- A easy to use fully customizable profile page, were you can change your personal information 



## Screenshots

|                     Signin Page                       |                  Signup Page                          |
| :---------------------------------------------------: | :---------------------------------------------------: |
| ![](readmeImages/signinPage.jpg)                      | ![](readmeImages/signupPage.jpg)                      |

|             Items Details Page                     |                Customer Profile Page               |
| :------------------------------------------------: | :------------------------------------------------: | 
| ![](readmeImages/moreinfopage.jpg)                 | ![](readmeImages/fixedProfilePage.jpg)             | 

|                 Checkout (customer info)       |                   Checkout (order info)          |
| :--------------------------------------------: | :--------------------------------------------:   |
| ![](readmeImages/checkoutpro1.jpg)             | ![](readmeImages/checkoutpro2.jpg)               |

|                    Categories and Search-bar          |                     Email for reseting password         |  
| :------------------------------------------------:    | :------------------------------------------------:      |
| ![](readmeImages/caregiresAndSearchbar.jpg)           |![](readmeImages/forgotpasswordMail.jpg)                 |

|                      Admin panel                      | 
| :------------------------------------------------:    |
|![](readmeImages/adminPanel.jpg)                       |

## Setting up instructaions (without using docker)
                                                                                          
run this commad to install all the packedges:
-      npm install

run this commad to start the server:
-      npm start                                                                                                                  

if started correctly your terminal should see this prompt:                                                                                                                                       
<p>
  <img src="readmeImages/reactServerUpPrompt.jpg" width="300" alt="EnvCheck">
</p>                                                                                                                                               

and change the MY_SERVER to the ip of your back-end server:
-      MY_SERVER = "https//:yourserver.com:ddd"

[**dont forget to set up the backend aswell**](https://github.com/BakalMode/supermarket-back-JB-Final-Project)


## Setting up services
- Paypal Checkout                                   
 go to [Paypal Developer](https://developer.paypal.com/home) sign up and implement your clientId so the fake money will be wired to your account.       
 if you want to connect it to a real paypal account for real transactions go to [Paypal](https://www.paypal.com/il/home) create an account implement the clientId
 for changing the client id go here:                                                                                                                                                
![Paypal](readmeImages/paypalsettingup.jpg) 

- EmailLS       
 when runing the project if you use my EmailJS keys the forgot password feature should in theory work just fine but if you want to further customize it to your likings you can!        
 go to [EmailJS](https://www.emailjs.com/) sign up after that watch [this video](https://www.youtube.com/watch?v=dgcYOm8n8ME&ab_channel=CodewithVoran) explaining how to use EmailJS        
 afterwards if you saw the video just go to forgotPasswordSlicer.ts and change the keys:
 ![EmailJS](readmeImages/emailJSexplain.jpg) 


## Technologies

- [Django](https://www.djangoproject.com/) (at the back end part of the project)
- [Sqlite3](https://www.sqlite.org/about.html) (at the back end part of the project)
- [Python](https://www.python.org/about/) (at the back end part of the project)
- [ReactJS](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [ReactRedux](https://react-redux.js.org/)
- [MUI(Material-UI)](https://mui.com/about/) 
- [Docker](https://www.docker.com/company/)
- [EmailJS](https://www.emailjs.com/)
- [Paypal-Checkout](https://developer.paypal.com/home)
- [React-Router](https://reactrouter.com/en/main)

