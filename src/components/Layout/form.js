// this is a reusable form

const Form = ({ children, onSubmit }) => {
    return (
        <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            {children}
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-md-2"></div>
        </div>
    )
}

export default Form