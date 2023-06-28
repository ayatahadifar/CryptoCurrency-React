import { useState } from 'react';
import './App.css'; 
import axios from 'axios';

function App() { 
  const [crypto,setCrypto] = useState(''); 
  const [img,setImg] = useState('');  
  const [name,setName] = useState('');  
  const [symbol,setSymbol] = useState('');  
  const [link,setLink] = useState('');  
  const [usd,setUsd] = useState('');  
  const [eur,setEur] = useState('');  
  const [des,setDes] = useState(''); 
  const[flag,setFlag] = useState(false);   

  const handleSubmit = () => {
    const url = `https://api.coingecko.com/api/v3/coins/${crypto}`; 
    axios.get(url).then(res => { 
      setFlag(true);
      setImg(res.data.image.large); 
      setName(res.data.name); 
      setSymbol(res.data.symbol); 
      setLink(res.data.links.homepage[0]); 
      setUsd(res.data.market_data.current_price.usd) 
      setEur(res.data.market_data.current_price.eur) 
      setDes(JSON.stringify(res.data.description.en));
    })   
  }

  const createMarkup = () => {
    return {__html:des}
  }
  return (
    <div className="App">
      <h1 className='title'>CryotoCurrency Search</h1> 
      <div className='search'>
        <input type="text"
          value={crypto}
          onChange={(e) => setCrypto(e.target.value)}
          placeholder='Enter a name of crypto' 
          required />
      </div> 
      <button onClick={handleSubmit}
        type='submit'
        className='btn'>Submit
      </button> 
      {flag && <div className='container'> 
        <div className='crypto-info'>
          <img src={img} alt="Crypto" width='150' /> 
          <br /> 
          <h1 className='crypto-title'>{name}</h1> 
          <h2 className='symbol'>{symbol}</h2> 
          <h2><a className='link' href={link}>{link}</a></h2>
          <br /> 
          <h2>Euro Price: <i className="fa-solid fa-euro-sign"></i> {eur} </h2> 
          <h2>USD Price: <i className="fa-solid fa-dollar-sign"></i>{usd}</h2>
        </div> 
        <div className='des'>
          <div dangerouslySetInnerHTML={createMarkup()}> 
          </div>
        </div>
      </div>} 
        
    </div>
  );
}

export default App;
