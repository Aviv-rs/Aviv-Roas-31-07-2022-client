import { Dictionary } from 'models/dictionary.model'

function Form(fields: Dictionary) {
  return (
    <form>
      {Object.entries(fields).map((keyval: any[]) => {
        return <div className="form-group"></div>
      })}
    </form>
  )
}

export default Form
