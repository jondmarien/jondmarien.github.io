#tryhackme 
![](how%20websites%20work.png)
## HTML Structure
The basic HTML structure has the following components:
- The `<!DOCTYPE html>` defines that the page is a HTML5 document. This helps with standardization across different browsers and tells the browser to use HTML5 to interpret the page.
- The `<html>` element is the root element of the HTML page - all other elements come after this element.
- The `<head>` element contains information about the page (such as the page title)
- The `<body>` element defines the HTML document's body; only content inside of the body is shown in the browser.
- The `<h1>` element defines a large heading
- The `<p>` element defines a paragraph
- There are many other elements (tags) used for different purposes. For example, there are tags for buttons (`<button>`), images (`<img>`), lists, and much more.

Tags can include attributes like the _class_ attribute, which is useful for styling an element, such as changing its color, as in `<p class="bold-text">`. 
	The _src_ attribute is used with images to specify their location, for example: `<img src="img/cat.jpg">`. An element can have multiple attributes, each serving a distinct purpose, such as `<p attribute1="value1" attribute2="value2">`.
	Elements may also have an _id_ attribute, like `<p id="example">`, which is unique to each element. Unlike the _class_ attribute that can be shared by multiple elements, each element must have a distinct _id_ for unique identification. Element *ids* are used for styling and for identification by JavaScript. 
To view the HTML of any website, you can right-click and choose "View Page Source" in Chrome or "Show Page Source" in Safari.

### HTML Injection
![](html%20injection.png)

HTML Injection is a vulnerability that occurs when unfiltered user input is displayed on the page. If a website fails to sanitise user input (filter any "malicious" text that a user inputs into a website), and that input is used on the page, an attacker can inject HTML code into a vulnerable website.

Input sanitisation is very important in keeping a website secure, as information a user inputs into a website is often used in other frontend and backend functionality. A vulnerability you'll explore in another lab is database injection, where you can manipulate a database lookup query to log in as another user by controlling the input that's directly used in the query - but for now, let's focus on HTML injection (which is client-side).
## Javascript
JavaScript is used to control the functionality of web pages. JS can dynamically update the page in real-time, giving functionality to change the style of a button when a particular event on the page occurs (such as when a user clicks a button) or to display moving animations.

JavaScript is added within the page source code and can be either loaded within `<script>` tags or can be included remotely with the src attribute: 

```js
<script src="/location/of/javascript_file.js"></script>
```

The following JavaScript code finds a HTML element on the page with the id of "demo" and changes the element's contents to "Hack the Planet" : 

```js
document.getElementById("demo").innerHTML = "Hack the Planet";
```

HTML elements can also have events, such as "onclick" or "onhover" that execute JavaScript when the event occurs. The following code changes the text of the element with the demo ID to Button Clicked: 
```js
<button onclick='document.getElementById("demo").innerHTML = "Button Clicked";'>Click Me</button>
```
`onclick` events can also be defined inside the JavaScript script tags, and not on elements directly.
\

## Putting it all Together
![](how%20it%20works%20together.png)


