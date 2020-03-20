# Chitr App 

this is a front end React native App for the chittr back end for which already exists. chiitr is a platform for microblogging. this front end app gives users the abillty to connect to all API end points logged in and loged out

---
## installation and setup 

make sure you have node installed on your computer and android studio. 

download the repo from github, navigate to a folder for which you wish to install the code into and then run:  

```bash
git clone https://github.com/ProfPringles/assingment
```

if you wish to download the project without using git comands you can download a zip of the project by pressing the "clone or download" button on git

once the project is downloaded run:

```bash 
npm install 
```

open android studio and open the project by going to folder in which it is contained within and then selcting the "android" folder wthin the project and wait for android studio to build the project

I now recommend you use API 27 as this seems to be the most stable build of all the phones but you can use any build and the app should still work.

make a new phone by following the steps below:

0. press the small phone looking icon in the corner: 

    ![alt text](PhoneButtonNew.JPG)

 

 

start by making a new emulator in android studio this can be done easily by pressing the small buttn found right hand top corner on the action bar.

1. press the create new device button   

   ![alt text](createDevice.JPG)

2. choose phone

    ![alt text](phone.JPG)

3. download the API you want to use (again 27 seems to be the best)
![alt text]( API27.jpg)
 
4. press finish to create the phone

    ![alt text](finish.JPG)

now go back to the node CMD and run: 

```bash 
npx react-native run-android
```
 and then wait for the project to install and build. you shoud now be ready to use the project and play with the code! have fun :)


## table of contents
---
* updates

* availble scripts  
  * npx react-native run-anroid
  * npm start

* trouble shooting 

* usage
  * GET requets 
  * POST requests
  * PATCH requests
  * DELETE requests


* screens

* testing 

* style

* contributating
---


## updates 

this project will not longer be receiveing futher updates as it is now complete however the current update has all features implemented except scheduling. As if now a user can: 

* get all chits logged and logged out 
* serach for user logged in and out 
* sign into an existing account 
* sign up for a new account 
* post a new chit 
* add a photo to the chit
* save a chit to be deleted and edited for later 
* change their photo if all other user info 

---
## trouble shooting

If you try to build the app and it fails make sure it buils in android studio first! Also make sure the emulator is open before trying to build the project as the project relies on the phone. 

make sure that you are CMD in admin mode as sometimes the project fails as its trying to access the internet 

there should be no other problems, if there are just make sure to follow the error messages inside android studio. 

if you wish to clean the gradle it can be done by navigating to the android folder in the project and running 

```bash
gradlew cleanBuildCache
```
---
## useage

the project should be fairly self explanatory as its desgined this way, I have tried to keep to the AirBNB code style guide but in places I have not been to include the "this.state" object and one or two if statements

the screens can found within the project in the screens folder along with all the images used for icons. in the project each icon an image as I could not get icons to work at all. 


in each file for each screen you will find a this.state object which basicly contains all the global varibles for that page 

### GET requests

most GET requests in the project work very simply just by asking for something from the server and returning okay, some will set some varibles but most do not. 

all requests in the project use the featch API. and promises, as you can see below  the fetch api chains promises togther.

example of a get request:

```javascript
 getchits() {
        return fetch(URL)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    chitData: responseJson,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }    
```

### POST requests

as you can see below the body of a request id sent using the this.state object to set strings from user inputs. 

the eoror is prtined to the console if something goes wrong. 

example: 

```javascript
 PostChit(timestamp, longitude, latitude) {
  return  fetch(URL ,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': this.state.token
      },
      body: JSON.stringify({
        chit_id: this.state.chit_id, 
        timestamp: timestamp, 
        chit_content: this.state.chit_content,
        user_id: this.state.UserData.user_id,
        given_name: this.state.UserData.given_name, 
        family_name: this.state.UserData.family_name,
        email: this.state.UserData.email,
        longitude: longitude , 
        latitude: latitude,
    })
    }).then((response) => response.json())
      .then((responseJson)=> {
        console.log("here", responseJson.chit_id)
        this.savechitID(responseJson.chit_id)
        this.setState({
          chit_id: responseJson.chit_id
        })
    })
    .catch((error) => {
      console.log("error", error)
    });
  }
} 
```

### patch request 

a patch request is only used onnce in this project to edit a users account details 

example: 

```javascript
    postChange(){
        return  fetch(URL+this.state.user_id,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': this.state.token
                },
                body: JSON.stringify({
                    given_name:  this.state.given_name,
                    family_name: this.state.family_name ,
                    email: this.state.email,
                    password: this.state.password
                })
            }).then((response) => response.json())
            .then((responseJson)=> {
                console.log("here", responseJson)
            })
            .catch((error) => {
                console.log("error", error)
            });
    }
```

### DELETE request

the delete quest is also only used one the unfollow a user. 

the ```'accept': 'application/json',``` is for the client side, this tells the clinet what is coming back.

example: 

```javascript
 unfollow(){
        console.log("un follow start")
           return fetch(URL+"/"+this.state.user_id+"/follow",
            {
                method: 'DELETE',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Authorization': this.state.token,
                },
                body: JSON.stringify({
                    user_id: this.state.user_id
                })
            })
            .then((response) => {
                if(response.ok){
                    Alert.alert("unfollowed");
                }else{
                    Alert.alert("oh dear you cannnot unfollow this person D: maybe you are not logged in?");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

```
---

the screens are contained within the screens folder as mentioned. The Screens all in java script and use a custom style, which stays contistant through out.

logged out the user can only accsses some of the end points that being getitng the last ten chits made ever. searching for suer and looking at their following and followers. And of course the user can sign up and sign into an account.

after a user has made an account or thy can do all of the above but they can now follow a person, look at all account infomation for them, change that account add a photo to the last chit they made, make drafts and make chits.

---


## testing 

testing has been very has to achive as whenever I have tried to test anything I have found that it alway seems to error through unit testing but I have of course tested all the code in one way or another this, normally being throuh ```console.log()``` statements that allows me to see reponses from the server. 

I have added unit testing where it does not error. 


## style 

I have used react base for some of the things in the project but mostly I have used my own style sheets, but for things like buttons and scrollviews I have used a libary. 

the colours in the project are also used as they are meant to be accessable for colour blind users as they low light colours that are easy on the eyes. 

fonts through out are all the same. 

each style sheet can be found at the bottom of page. 

## contributating

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

