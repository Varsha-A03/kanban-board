import Header from './components/Header';
import Board from './pages/Board';
import Column from './components/Column'
import './styles/Global.css';
function App() {
  return (
    <div style = {{ minHeight:'100vh'}}>
      <Board />
    </div>
    

  );
}

export default App;
