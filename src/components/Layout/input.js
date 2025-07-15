// form inputs 
//  this will be passed as children to the form component

const Input = ({ label, type, name, id, required, onChange, value }) => {
    return (
        <div className="row mb-3">
            <label for={name} className="col-sm-3 col-form-label">{label}</label>
            <div className="col-sm-9">
                <input type={type} className="form-control" id={id} name={name} required={required} onChange={onChange} value={value}/>
            </div>
        </div>
    )
}

