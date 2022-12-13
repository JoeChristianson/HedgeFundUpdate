import "./index.css"

const Button=({text,handleClick,additionalClasses})=>{


    return(
        <button className={additionalClasses} onClick={handleClick}>
            {text}
        </button>
    )
}

export default Button