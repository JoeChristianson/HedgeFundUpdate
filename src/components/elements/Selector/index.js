 const Selector = ({label,options,onChange,selected})=>{
    return (
        <div className="select-cont">
        <label>{label} </label>
        <select value={selected?.value||""} onChange={onChange}>
          {options.map((o,key)=>{
            return (
                <option key={key} value={o.value}>{o.text}</option>
            )
          })}
        </select>
      </div>
    )
 }

export default Selector