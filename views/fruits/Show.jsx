const React = require('react')

function Show(props) {
return(
    <div>
        <h1>{props.fruit.name}</h1>
        <a href="/fruits">Go Back to Index</a>
        <p>
            The {props.fruit.name} is {props.fruit.color} and {props.fruit.readyToEat? 'It is ready to eat': 'It is not ready to eat'}
        </p>
        <form action= {`/fruits/${props.fruit._id}?_method=DELETE`} method ='POST'>
            <input type='submit' value ={`Delete this ${props.fruit.name}`}></input>
        </form>

        <div>
            <a href={`/fruits/${props.fruit._id}/edit`}>
                <button>{`Edit this ${props.fruit.name}`}</button>
            </a>
        </div>
    </div>
    )
}

module.exports = Show