const React = require('react')

function Edit(props) {
    const { name, _id, readyToEat, color} = props.fruit

    return (
        <div>
            <h1>{name} Edit Page</h1>
            <a href='/fruits'>Go back to the Index Page</a>
            <form action={`/fruits /${_id}?_method = PUT`} method='POST'>
                Name: <input type="text" name="name" defaultValue={name}/><br/>
                Color: <input type="text" name="color" defaultValue={color}/><br/>
                Is Ready To Eat: <input type="checkbox" name="readyToEat" defaultChecked/><br/>
                <input type="submit" value="Update Fruit" />
            </form>  
        </div>
    )
}

module.exports = Edit