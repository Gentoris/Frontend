import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


interface State {
  tarhelyek: Tarhelyek[];
  regName: string;
  regSize: number;
  regPrice: number;
}

interface Tarhelyek {
  id: number;
  name: string;
  size: number;
  price: number;
}

interface TarhelyListResponse {
  tarhelyek: Tarhelyek[];
}


class App extends Component<{}, State> {
  loadTarhelyek() {
    throw new Error('Method not implemented.');
  }

  constructor(props: {}) {
    super(props);

    this.state = {
      regName: '',
      regSize: '',
      regPrice: '',
      tarhelyek: [],
    }
  }

  async loadUsers() {
    let response = await fetch('http://localhost:3000/api/tarhelyek');
    let data = await response.json() as TarhelyListResponse;
    this.setState({
      tarhelyek: data.tarhelyek,
    })
  }

  componentDidMount() {
    this.loadUsers();
  }

  handleRegister = async () => {
    const { regName, regSize, regPrice } = this.state;
    if (regName.trim() === '' || regSize !== regPrice) {
      return;
    }

    const adat = {
      name: regName,
      size: regSize,
      price: regPrice,
    };

    let response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adat),
    });

    this.setState({
      regName: '',
      regSize: '',
      regPrice: '',
    })

    await this.loadTarhelyek();
  };

  render() {
    const { regName, regSize, regPrice } = this.state;

    return <div>
      <h2>Új tárhely</h2>
      Tárhely neve: <input type='text' value={regName} onChange={e => this.setState({ regName: e.currentTarget.value })} /><br/>
      Mérete: <input type='number' value={regSize} onChange={e => this.setState({ regSize: e.currentTarget.value })} /><br />
      Ára: <input type='number' value={regPrice} onChange={e => this.setState({ regPrice: e.currentTarget.value })} /><br />
      <button onClick={this.handleRegister}>Tárhely regisztrálása</button>
      <h2>Tárhelyek listája</h2>
      <ul>
        {
          this.state.tarhelyek.map(tarhely => <li>{tarhely.name}</li>)
        }
      </ul>
    </div>;
  }
}


export default App;
