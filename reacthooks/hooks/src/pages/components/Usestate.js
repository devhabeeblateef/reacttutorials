import React, {useState} from 'react'

function Usestate() {

    // Use Case One
    const [counter, setCounter] = useState(0);

    const addCounter = () => {
        setCounter(counter+1)
    }

    const minusCounter = () => {
        counter!=0 ? setCounter(counter-1) : null
    }

    // Use Case Two
    const [usernames, setusernames] = useState([]);
    const [username, setUsername] = useState('');
    
    const formHandler = (e) => {
        e.preventDefault();
        setusernames([...usernames, username]);
        setUsername('')
    }
  return (
    <div>
    <section role='useCaseOne'>
        {counter}
        <button onClick={addCounter}>Increment</button>
        <button onClick={minusCounter}>Decrement</button>
    </section>

    <section role='useCaseTwo'>
        <form onSubmit={formHandler}>
            <label htmlFor='username'>Username: </label>
            <input autoComplete='off' onChange={(e) => setUsername(e.target.value)} name="username" id="username" type='text' value={username}/>
            <button>Submit</button>
        </form>

        {usernames.map((username) => {
            return (
                <p>{username}</p>
            )
        })}
    </section>
    </div>
  )
}

export default Usestate