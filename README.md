> [!NOTE]  
> RECRUITERS: if you want to see deployed any part of this project, don't hesitate in call me.

# Introduction
<div style=»padding: 10px; float: left; width: 45%; text-align: justify;»> 
  <img src="./utils/descarga.svg" alt="Logo del proyecto" width="200" />
</div>
<div style=»padding: 10px; float: right; width: 45%; text-align: justify;»>
 <p>
    This repository contains the solution of the exercise of the FULLSACKOPEN course.
    I hope it helps you in the process of create your own solution.
    Read carefully every exercise and try to undestand the objective.
  </p>
</div>

**Resources:**
How to create a new project with vite.

```bash
npm create vite@latest blogsApp -- --template react
```

## Icons

How to set icons.
Vscode install Material Icon theme

## [Part 0](https://fullstackopen.com/es/part0)


This section contains some diagram created with Markdown tags that show how to a request is carried out by the browser to the server.

[Link to Part 1 Documentation](https://fullstackopen.com/es/part1)
## [Part1 anecdotes](part1/anecdotes/README.md)

## [Part 2](https://fullstackopen.com/es/part2)

## [Part 3](https://fullstackopen.com/es/part3)

## [Part 4](https://fullstackopen.com/es/part4)

## [Part 5](https://fullstackopen.com/es/part5)

## [Part6 - Redux](https://fullstackopen.com/es/part6)

### unicafe-redux

## [Part 7 - React Router, Custom hooks](https://fullstackopen.com/es/part7)

### Routed anecdotes
Evolution of the Anecdote Project. 

Reset button, clean the form. change destructuring the custom hook that we have created and assign to reset the name of all the field of the form 

```javascript 
const { reset: resetContet, ...content } = useField('text')
```

Now we can reset the form calling the custom hook cleaning the every state.
### Country Hook
Evolution of previos project. 
The home page has an input in which you introduce a country. Service returns the info of the country including flag, capital and other information.

Two custom hooks has been created:
1. useField: Get a type and return type, value and onChange event. 
```javascript
const nameInput = useField('text')
```
These input has declared their atributes using spread syntax. 

```HTML
<input {...nameInput} />
```
2. useCountry: Get a country name and return the info requested to the back end. The info is passed to a component that render the information of the country

> [!TIP]
> It is not a crime use promise with async/await. in this case is much better than try/catch to control the error in case the country doesn't exist or the user has not introduce the country name correctly

### Ultimate Hooks.
New project focus in the creation of a custom hook.

useResource is a hook that get a URL and returns one state and one service with two request to the backend. 

In App.jsx the hook useEffect get the list of notes and person calling the services returned by the hook useResources. The notes and the person are loaded in their own state returned also by the hook useResource. Notes and persons are render later.

There are two input forms, that allow create a new note or a new person. The custom hook useField get a type and return type, value and onChange event. 

```javascript
const content = useField('text')
```
These input has declared their atributes using spread syntax. 

```HTML
<input {...content} />
```
With the handleSubmit event, the value of the form is send to the service that post the info in the backend. The response is used to rerender the list with the setResources of the useResource custom hook.
