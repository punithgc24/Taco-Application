# taco-cloud-parent
---------

## Technology

    Server side stack
      
        Spring Boot 2.4.2
        lombok - 1.18.16
        Spring Rest
        Spring JPA
        Spring Security
        Spring Data Rest
          
    Build/Compile
       
        JDK 1.8
            
    Database
      
        h2 database
           
    Build Tool
      
        Apache Maven 3.6.3
      
      
## Project Structure

    taco-cloud-parent
        |__ taco-cloud -> Main class and development config class
        |__ tacocloud-api -> Controller classes
        |__ tacocloud-data -> DB Interaction classes
        |__ tacocloud-domain -> POJO classes
        |__ tacocloud-security ->  Security config classes

## IDE Support

    Eclipse 4.16

## Run Project

Run TacoCloudApplication.java class as a java application.
It loads the app in development mode
Open [http://localhost:8080/api](http://localhost:8080/api) to view generated api's in your browser.
